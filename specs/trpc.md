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
│       └── _app.ts       # AppRouter export
└── app/
    └── api/trpc/[trpc]/route.ts  # Fetch adapter
```

## Setup

1. **Dependências**: `pnpm add @trpc/server @trpc/client @trpc/tanstack-react-query @tanstack/react-query zod client-only server-only`

2. **API Route**: `/api/trpc/[trpc]` usando `fetchRequestHandler`

3. **Client Components**: Usar `useTRPC()` hook com `QueryClientProvider`

4. **Server Components**: Usar `trpc` proxy com `prefetchQuery` + `HydrationBoundary`

5. **Migrar APIs existentes**: Substituir `fetch('/api/...')` por hooks tRPC

## Regras
- Usar Zod para validação de inputs
- Procedures: `query` (GET) e `mutation` (POST/PUT/DELETE)
- Não exportar `t` do init.ts - usar helpers `baseProcedure`, `createTRPCRouter`
