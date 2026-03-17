import { type ButtonHTMLAttributes, forwardRef } from "react";
import { tv, type VariantProps } from "tailwind-variants";

const button = tv({
	base: "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
	variants: {
		variant: {
			primary: "bg-green-500 text-neutral-950 hover:bg-green-600",
			secondary: "bg-neutral-100 text-neutral-900 hover:bg-neutral-200",
			ghost: "hover:bg-neutral-100 hover:text-neutral-900",
			link: "text-neutral-900 underline-offset-4 hover:underline",
			danger: "bg-red-500 text-white hover:bg-red-600",
		},
		size: {
			sm: "h-8 px-3 text-xs",
			md: "h-10 px-6 py-2.5",
			lg: "h-12 px-8 text-base",
			icon: "h-9 w-9",
		},
	},
	defaultVariants: {
		variant: "primary",
		size: "md",
	},
});

export interface ButtonProps
	extends ButtonHTMLAttributes<HTMLButtonElement>,
		VariantProps<typeof button> {}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
	({ className, variant, size, ...props }, ref) => {
		return (
			<button
				className={button({ variant, size, className })}
				ref={ref}
				{...props}
			/>
		);
	},
);

Button.displayName = "Button";
