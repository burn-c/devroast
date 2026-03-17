# Padrões de Componentes UI

## Estrutura de Arquivos

```
src/components/ui/
├── index.ts            # Exporta todos os componentes
└── [component].tsx    # Cada componente em seu próprio arquivo
```

## Regras

### 1. Exports
- Sempre usar **named exports**, nunca default exports
- Exportar o componente e seu tipo de props separadamente
- Criar `index.ts` barrel export

```tsx
// button.tsx
export interface ButtonProps { ... }
export const Button = ...

// index.ts
export type { ButtonProps } from "./button";
export { Button } from "./button";
```

### 2. Estender Props Nativas
- Componentes devem estender as props nativas do elemento HTML correspondente
- Usar `forwardRef` para permitir ref forwarding

```tsx
import { type HTMLAttributes, forwardRef } from "react";

export interface ButtonProps extends HTMLAttributes<HTMLButtonElement> { }
```

### 3. Tailwind Variants
- Usar `tailwind-variants` (tv) para criar variantes
- **NÃO** usar `twMerge` com tv - o tv já faz merge automaticamente
- Passar `className` diretamente como parâmetro

```tsx
const button = tv({
  base: "...",
  variants: { variant: { ... } }
});

// Uso correto - className é mesclado automaticamente
<Button className="custom-class" variant="primary" />

// Não precisa de clsxMerge/twMerge
className={button({ variant, size, className })}
```

### 4. Estrutura do Componente

```tsx
import { type HTMLAttributes, forwardRef } from "react";
import { tv, type VariantProps } from "tailwind-variants";

const component = tv({
  base: "classes base",
  variants: {
    variant: { ... },
    size: { ... },
  },
  defaultVariants: {
    variant: "default",
    size: "md",
  },
});

export interface ComponentProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof component> {}

export const Component = forwardRef<HTMLDivElement, ComponentProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <div
        className={component({ variant, size, className })}
        ref={ref}
        {...props}
      />
    );
  },
);

Component.displayName = "Component";
```

### 5. Design System
- Toda vez que criar um novo componente, adicionar exemplos em `/design-system`
- Criar seções organizadas por componente
- Testar todas as variantes e estados
