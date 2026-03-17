import { type ButtonHTMLAttributes, forwardRef } from "react";
import { tv, type VariantProps } from "tailwind-variants";

const button = tv({
	base: "inline-flex items-center justify-center whitespace-nowrap font-mono transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
	variants: {
		variant: {
			primary: "bg-emerald-500 text-neutral-950 hover:bg-emerald-600",
			secondary:
				"border border-[#2A2A2A] text-[#E5E5E5] hover:bg-[#171717] hover:border-[#404040]",
			link: "border border-[#2A2A2A] text-[#A3A3A3] hover:text-[#D4D4D4] hover:border-[#525252]",
		},
		size: {
			sm: "h-8 px-3 text-xs",
			md: "py-2.5 px-6 text-[13px]",
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
