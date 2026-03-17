import { type ButtonHTMLAttributes, forwardRef } from "react";
import { tv, type VariantProps } from "tailwind-variants";

const button = tv({
	base: "inline-flex items-center justify-center whitespace-nowrap font-mono transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
	variants: {
		variant: {
			primary:
				"bg-emerald-500 text-[#0A0A0A] hover:bg-emerald-600 py-[10px] px-6 text-[13px] font-medium",
			secondary:
				"border border-[#2A2A2A] text-[#E5E5E5] hover:bg-[#171717] hover:border-[#404040] py-2 px-4 text-[12px]",
			link: "border border-[#2A2A2A] text-[#A3A3A3] hover:text-[#D4D4D4] hover:border-[#525252] py-[6px] px-3 text-[12px]",
		},
	},
	defaultVariants: {
		variant: "primary",
	},
});

export interface ButtonProps
	extends ButtonHTMLAttributes<HTMLButtonElement>,
		VariantProps<typeof button> {}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
	({ className, variant, ...props }, ref) => {
		return (
			<button className={button({ variant, className })} ref={ref} {...props} />
		);
	},
);

Button.displayName = "Button";
