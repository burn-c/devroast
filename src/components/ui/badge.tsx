import { forwardRef, type HTMLAttributes } from "react";
import { tv, type VariantProps } from "tailwind-variants";

const badge = tv({
	base: "inline-flex items-center gap-2 font-mono text-[12px]",
	variants: {
		variant: {
			critical: "text-red-500",
			warning: "text-amber-500",
			good: "text-emerald-500",
		},
	},
	defaultVariants: {
		variant: "good",
	},
});

const badgeDot = tv({
	base: "w-2 h-2 rounded-full",
	variants: {
		variant: {
			critical: "bg-red-500",
			warning: "bg-amber-500",
			good: "bg-emerald-500",
		},
	},
	defaultVariants: {
		variant: "good",
	},
});

export interface BadgeProps
	extends HTMLAttributes<HTMLDivElement>,
		VariantProps<typeof badge> {
	showDot?: boolean;
}

export const Badge = forwardRef<HTMLDivElement, BadgeProps>(
	({ className, variant, showDot = true, children, ...props }, ref) => {
		return (
			<div ref={ref} className={badge({ variant, className })} {...props}>
				{showDot && <span className={badgeDot({ variant })} />}
				<span>{children}</span>
			</div>
		);
	},
);

Badge.displayName = "Badge";
