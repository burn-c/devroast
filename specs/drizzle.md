# Especificação: Drizzle ORM + PostgreSQL

## Visão Geral

Este documento detalha a especificação para implementação do Drizzle ORM com PostgreSQL no projeto DevRoast.

## Stack

- **ORM**: Drizzle ORM
- **Banco**: PostgreSQL (via Docker Compose)
- **Migrations**: Drizzle Kit

---

## 1. Enums

### 1.1 `language`

Linguagens de programação suportadas pelo editor.

```typescript
export const languageEnum = pgEnum("language", [
  "javascript",
  "typescript",
  "python",
  "java",
  "csharp",
  "go",
  "rust",
  "ruby",
  "php",
  "sql",
  "html",
  "css",
  "json",
  "yaml",
  "markdown",
  "bash",
  "plaintext",
]);
```

### 1.2 `verdict`

Nível de verdict baseado no score (0-10).

```typescript
export const verdictEnum = pgEnum("verdict", [
  "needs_serious_help",   // score 0-2
  "rough_around_edges",    // score 2.1-4
  "decent_code",          // score 4.1-6
  "solid_work",           // score 6.1-8
  "exceptional",          // score 8.1-10
]);
```

#### Cores por verdict (Tailwind)

| Verdict | Score | Cor | Hex |
|---------|-------|-----|-----|
| needs_serious_help | 0-2 | red-500 | #EF4444 |
| rough_around_edges | 2.1-4 | orange-500 | #F97316 |
| decent_code | 4.1-6 | amber-500 | #F59E0B |
| solid_work | 6.1-8 | yellow-500 | #EAB308 |
| exceptional | 8.1-10 | emerald-500 | #10B981 |

**Nota**: O título é predefinido (igual ao valor do enum), mas a mensagem é gerada por IA no modo sarcástico e salva no banco.

### 1.3 `roast_mode`

Modo de análise do código.

```typescript
export const roastModeEnum = pgEnum("roast_mode", [
  "normal",   // Análise técnica neutra
  "roast",    // Modo sarcástico
]);
```

### 1.4 `problem_severity`

Nível de severidade do problema encontrado.

```typescript
export const problemSeverityEnum = pgEnum("problem_severity", [
  "info",     // Informação geral
  "warning",  // Aviso
  "error",    // Erro crítico
  "critical", // Problema gravíssimo
]);
```

### 1.5 `diff_line_type`

Tipo de linha no diff de código.

```typescript
export const diffLineTypeEnum = pgEnum("diff_line_type", [
  "unchanged",  // Linha inalterada
  "addition",   // Linha adicionada (sugestão)
  "deletion",  // Linha removida (código проблемático)
]);
```

---

## 2. Tabelas

### 2.1 `submissions`

Armazena os códigos submetidos pelos usuários.

| Coluna | Tipo | Descrição |
|--------|------|-----------|
| `id` | `uuid` | PK - Identificador único |
| `code` | `text` | Código fonte submetido |
| `language` | `language` | Linguagem do código |
| `roast_mode` | `roast_mode` | Modo de análise |
| `ip_address` | `inet` | IP do usuário (anônimo) |
| `created_at` | `timestamp` | Data de criação |

### 2.2 `analyses`

Armazena os resultados da análise de cada submissão.

| Coluna | Tipo | Descrição |
|--------|------|-----------|
| `id` | `uuid` | PK - Identificador único |
| `submission_id` | `uuid` | FK - Referência à submissão |
| `score` | `decimal(3,1)` | Score de 0-10 |
| `verdict` | `verdict` | Verdict baseado no score |
| `summary` | `text` | Resumo da análise |
| `created_at` | `timestamp` | Data de criação |

**Relacionamento**: `analyses.submission_id` → `submissions.id` (1:1)

### 2.3 `problems`

Armazena os problemas identificados na análise.

| Coluna | Tipo | Descrição |
|--------|------|-----------|
| `id` | `uuid` | PK - Identificador único |
| `analysis_id` | `uuid` | FK - Referência à análise |
| `title` | `text` | Título do problema |
| `description` | `text` | Descrição detalhada |
| `severity` | `problem_severity` | Severidade do problema |
| `line_start` | `integer` | Linha inicial (opcional) |
| `line_end` | `integer` | Linha final (opcional) |
| `code_snippet` | `text` | Trecho de código проблемático |
| `created_at` | `timestamp` | Data de criação |

**Relacionamento**: `problems.analysis_id` → `analyses.id` (N:1)

### 2.4 `diff_lines`

Armazena as linhas do diff com sugestões de melhoria.

| Coluna | Tipo | Descrição |
|--------|------|-----------|
| `id` | `uuid` | PK - Identificador único |
| `analysis_id` | `uuid` | FK - Referência à análise |
| `line_number` | `integer` | Número da linha |
| `line_type` | `diff_line_type` | Tipo da linha |
| `original_code` | `text` | Código original |
| `suggested_code` | `text` | Código sugerido |
| `explanation` | `text` | Explicação da sugestão |
| `created_at` | `timestamp` | Data de criação |

**Relacionamento**: `diff_lines.analysis_id` → `analyses.id` (N:1)

### 2.5 `leaderboard_cache`

Cache do leaderboard para performance (opcional, pode ser query/view).

| Coluna | Tipo | Descrição |
|--------|------|-----------|
| `id` | `uuid` | PK - Identificador único |
| `submission_id` | `uuid` | FK - Referência à submissão |
| `rank` | `integer` | Posição no ranking |
| `score` | `decimal(3,1)` | Score da submissão |
| `updated_at` | `timestamp` |Última atualização |

---

## 3. Docker Compose

### 3.1 `docker-compose.yml`

```yaml
version: "3.8"

services:
  postgres:
    image: postgres:16-alpine
    container_name: devroast-db
    environment:
      POSTGRES_USER: devroast
      POSTGRES_PASSWORD: devroast_password
      POSTGRES_DB: devroast
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data
      - ./db/seed:/docker-entrypoint-initdb.d
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U devroast"]
      interval: 5s
      timeout: 5s
      retries: 5

volumes:
  postgres_data:
```

### 3.2 Variáveis de Ambiente

```env
# .env.local
DATABASE_URL=postgresql://devroast:devroast_password@localhost:5432/devroast
```

---

## 4. To-Dos para Implementação

### 4.1 Configuração Inicial

- [X] Instalar dependências: `drizzle-orm`, `drizzle-kit`, `postgres`
- [X] Criar arquivo `drizzle.config.ts`
- [X] Configurar variável de ambiente `DATABASE_URL`
- [X] Criar arquivo `src/db/index.ts` para conexão
- [X] Criar arquivo `src/db/schema.ts` com todas as tabelas e enums

### 4.2 Docker Compose

- [X] Criar arquivo `docker-compose.yml` na raiz
- [X] Criar script de seed em `db/seed/001-leaderboard.sql`
- [X] Adicionar comando no package.json: `docker:up`, `docker:down`

### 4.3 Migrations

- [X] Criar migration inicial com `npm run db:generate`
- [X] Executar migration com `npm run db:push`
- [X] Verificar tabelas criadas no banco

### 4.4 Seed Data

- [X] Popular tabela `submissions` com dados de exemplo (100 registros)
- [X] Popular tabela `analyses` com scores variados
- [X] Popular tabela `problems` com problemas de exemplo
- [X] Popular tabela `diff_lines` com sugestões de exemplo

### 4.5 Integração com App

- [ ] Criar utilitário de query em `src/db/queries.ts`
- [ ] Criar functions helpers para CRUD
- [ ] Integrar com página inicial (leaderboard)
- [ ] Integrar com página de resultados

---

## Progresso: 80% ████████░░░░░░░░░░░░░░ 16/20 tarefas

---

## 5. Estrutura de Arquivos

```
devroast/
├── db/
│   ├── seed/
│   │   └── 001-leaderboard.sql
│   └── migrations/
├── docker-compose.yml
├── drizzle.config.ts
├── .env.local
└── src/
    └── db/
        ├── index.ts      # Conexão
        ├── schema.ts     # Schema completo
        ├── queries.ts    # Queries helpers
        └── relations.ts  # Relations (se necessário)
```

---

## 6.seed Data Sugerido

O seed deve incluir:
- 10 submissões de exemplo com códigos "ruins" famosos
- Scores variando de 0.5 a 5.0
- Problemas identificados para cada análise
- Sugestões de diff para cada código

Exemplos de código para seed:
- `eval(prompt('entrada'))` - JavaScript
- `SELECT * FROM users` sem WHERE - SQL
- `var x = true; if (x == true) { return true; }` - TypeScript

---

## 7. Referências

- [Drizzle ORM Docs](https://orm.drizzle.team/)
- [Drizzle Kit](https://orm.drizzle.team/kit-docs/overview)
- [PostgreSQL Docker Image](https://hub.docker.com/_/postgres)
