# tRPC Integration

## Goal
Adicionar tRPC como camada de API para substituir os endpoints manuais em `/api/`.

## Stack
- `@trpc/server`
- `@trpc/client`
- `@trpc/tanstack-react-query`
- `@tanstack/react-query`
- `zod` (validação)
- `server-only` / `client-only`

## Estrutura de arquivos

```
src/
├── trpc/
│   ├── init.ts           # initTRPC, createTRPCContext, baseProcedure
│   ├── query-client.ts   # makeQueryClient factory
│   ├── client.tsx        # Client Components (useTRPC, TRPCProvider)
│   ├── server.tsx        # Server Components (trpc proxy, caller)
│   └── routers/
│       ├── _app.ts       # AppRouter principal
│       ├── submission.ts # Router de submissions
│       ├── roast.ts      # Router de roast (análise de código)
│       └── leaderboard.ts # Router de leaderboard
└── app/
    └── api/trpc/[trpc]/route.ts  # Fetch adapter
```

## Fluxo de dados

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                              CLIENT LAYER                                   │
│  ┌─────────────────┐         ┌─────────────────┐                          │
│  │  Page (RSC)    │         │  Component      │                          │
│  │  prefetch()    │         │  useQuery()     │                          │
│  └────────┬────────┘         └────────┬────────┘                          │
│           │                           │                                    │
│           ▼                           ▼                                    │
│  ┌────────────────────────────────────────────────────────────────────┐   │
│  │                     HydrationBoundary                               │   │
│  │              (recebe dados pré-carregados do servidor)              │   │
│  └────────────────────────────────────────────────────────────────────┘   │
│                                   │                                        │
│                    ┌──────────────┴──────────────┐                        │
│                    ▼                              ▼                        │
│           ┌───────────────┐              ┌───────────────┐               │
│           │  TanStack     │              │  TanStack     │               │
│           │  Query Cache  │◄────────────►│  React Query │               │
│           │  (Server)     │   hydrate    │  (Client)    │               │
│           └───────────────┘              └───────────────┘               │
└─────────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                              SERVER LAYER                                    │
│                                                                             │
│  ┌─────────────┐     ┌─────────────┐     ┌─────────────┐                 │
│  │   Router    │────►│ Procedure   │────►│   Zod      │                 │
│  │  (appRouter)│     │  (query/    │     │  Schema     │                 │
│  │             │     │   mutation) │     │  (valida)   │                 │
│  └─────────────┘     └─────────────┘     └─────────────┘                 │
│          │                   │                                           │
│          │                   ▼                                           │
│          │           ┌─────────────┐                                     │
│          │           │   Service   │                                     │
│          │           │   Layer     │                                     │
│          │           └──────┬──────┘                                     │
│          │                  │                                              │
│          │                  ▼                                              │
│          │           ┌─────────────┐                                     │
│          │           │  Database   │                                     │
│          │           │  (Drizzle)  │                                     │
│          │           └─────────────┘                                     │
│          │                                                                  │
│          │           ┌─────────────┐                                     │
│          └─────────►│ API Route   │                                     │
│                      │ /api/trpc/* │                                     │
│                      └─────────────┘                                     │
└─────────────────────────────────────────────────────────────────────────────┘
```

## Cenários de uso

### 1. Listar submissions (Leaderboard)
```
Page (RSC)                    Client Component
     │                              │
     │ prefetch()                   │
     ▼                              │
HydrationBoundary ◄─── hydrate ────┘
     │                              │
     │                        useQuery()
     ▼                              ▼
  Query Cache ◄─────────────────────► TanStack Query (client)
     │
     ▼
 fetchRequestHandler
     │
     ▼
 appRouter.leaderboard.list.query()
     │
     ▼
 Zod validate → Service → Drizzle → PostgreSQL
```

### 2. Criar submission + roast
```
Client Component                Server
     │                           │
     │ useMutation()             │
     │ mutate()                  │
     ▼                           │
TanStack Query                   │
     │                           │
     │ POST /api/trpc/           │
     ▼                           │
appRouter.submission.create.mutation()
     │                           │
     ▼                           │
 Zod validate ───────────────────┤
     │                           │
     ▼                           │
 SubmissionService.create()      │
     │                           │
     ├── salvar code ────────────┼──► Drizzle → PostgreSQL
     │                           │
     ├── chamar IA roast ────────┼──► External API (OpenAI)
     │                           │
     └── salvar análise ─────────┘   Drizzle → PostgreSQL
     │                           │
     ▼                           │
Invalidate queries               │
     │                           │
     ▼                           │
Leaderboard atualiza             │
```

### 3. Obter resultado de roast
```
Page (RSC)                    Client Component
     │                              │
     │ prefetch()                   │
     │ queryClient.fetchQuery()     │
     ▼                              │
HydrationBoundary ◄─── hydrate ────┘
     │                              │
     │                        useQuery()
     ▼                              ▼
  Return data directly            TanStack Query
  (caller.hello.query())             │
                                         │
                                         ▼
                              TanStack Query (cache hit)
```

## Procedures (API endpoints)

### submission router
```typescript
// Listar submissions (com filtros)
submission.list(query({
  sort: 'worst' | 'best' | 'recent',
  limit: number
}))

// Obter uma submission
submission.get(query({
  id: string
}))

// Criar submission (inicia roast)
submission.create(mutation({
  code: string,
  language: SupportedLanguage
}))
```

### roast router
```typescript
// Obter resultado de roast
roast.get(query({
  analysisId: string
}))

// Atualizar/reexecutar roast
roast.reprocess(mutation({
  submissionId: string
}))
```

### leaderboard router
```typescript
// Estatísticas globais
leaderboard.stats(query({}))

// Top submissions
leaderboard.top(query({
  limit: number,
  sort: 'worst' | 'best'
}))
```

## Validação com Zod

```typescript
const submissionSchema = z.object({
  code: z.string().min(1).max(50000),
  language: z.enum([
    'javascript', 'typescript', 'python', 'java',
    'csharp', 'go', 'rust', 'ruby', 'php', 'sql',
    'html', 'css', 'json', 'yaml', 'markdown', 'bash'
  ])
});

const listSchema = z.object({
  sort: z.enum(['worst', 'best', 'recent']).default('worst'),
  limit: z.number().min(1).max(100).default(10),
  cursor: z.string().optional()
});
```

## Regras
- Usar Zod para validação de inputs
- Procedures: `query` (GET) e `mutation` (POST/PUT/DELETE)
- Não exportar `t` do init.ts - usar helpers `baseProcedure`, `createTRPCRouter`
- Service layer entre procedures e banco (não acessar Drizzle direto)
- Server Components: usar `trpc` proxy ou `caller`
- Client Components: usar `useTRPC()` hook

##Migração progressiva

1. Criar routers tRPC espelhando APIs existentes
2. Migrar pages uma por vez (Server Components primeiro)
3. Migrar mutations após queries
4. Remover rotas `/api/*` antigas após migração completa
