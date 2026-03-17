# DevRoast

**Stack:** Next.js 14, TypeScript, Tailwind, Biome

**Pasta principal:** `src/app` (App Router)

## Padrões

### Componentes UI
- Local: `src/components/ui/`
- Usar `tailwind-variants` (tv) para variantes
- Passar `className` diretamente no tv (não usar twMerge)
- Sempre usar **named exports**
- Estender props nativas do HTML
- Usar forwardRef

### Estrutura de componente
```tsx
const component = tv({
  base: "classes base",
  variants: { variant: { ... } },
  defaultVariants: { variant: "default" },
});

export interface Props extends HTMLAttributes<HTMLDivElement>, VariantProps<typeof component> {}

export const Component = forwardRef<HTMLDivElement, Props>(
  ({ className, variant, ...props }, ref) => {
    return <div className={component({ variant, className })} ref={ref} {...props} />;
  }
);
Component.displayName = "Component";
```

### Página Design System
- Todas implementações de UI: `/design-system`
- Usar Client Components ("use client") quando necessário

### Commits
- Atômicos e descritivos
- Separar contextos diferentes
