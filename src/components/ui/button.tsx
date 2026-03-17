import { type ButtonHTMLAttributes, forwardRef } from "react";
import { tv, type VariantProps } from "tailwind-variants";

const button = tv({
	base: "inline-flex items-center justify-center whitespace-nowrap font-mono transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
	variants: {
		variant: {
			primary:
				"bg-emerald-500 text-[#000000] hover:bg-emerald-600 rounded-[6px]",
			secondary:
				"bg-[#0C0C0C] text-[#E5E5E5] border border-[#2A2A2A] hover:bg-[#171717] hover:border-[#404040] rounded-[6px]",
			ghost:
				"bg-[#0C0C0C] text-[#E5E5E5] border border-[#2A2A2A] hover:bg-[#171717] hover:border-[#404040] rounded-[6px]",
			danger: "bg-red-500 text-white hover:bg-red-600 rounded-[6px]",
		},
		size: {
			sm: "py-2 px-4 text-[12px]",
			md: "py-2.5 px-5 text-[13px]",
			lg: "py-3 px-6 text-[13px]",
		},
	},
	compoundVariants: [
		{
			variant: "primary",
			size: "sm",
			class: "py-2 px-4",
		},
		{
			variant: "primary",
			size: "md",
			class: "py-[10px] px-6",
		},
		{
			variant: "primary",
			size: "lg",
			class: "py-3 px-6",
		},
	],
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
