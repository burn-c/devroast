import { forwardRef, type HTMLAttributes } from "react";
import { tv, type VariantProps } from "tailwind-variants";

const badge = tv({
	base: "inline-flex items-center gap-2 font-mono text-[13px] font-medium",
	variants: {
		variant: {
			critical: "bg-red-500/10 text-red-500",
			warning: "bg-amber-500/10 text-amber-500",
			info: "bg-blue-500/10 text-blue-500",
			success: "bg-emerald-500/10 text-emerald-500",
			good: "bg-emerald-500/10 text-emerald-500",
			needs_serious_help: "bg-red-500/10 text-red-500",
			rough_around_edges: "bg-orange-500/10 text-orange-500",
			decent_code: "bg-amber-500/10 text-amber-500",
			solid_work: "bg-blue-500/10 text-blue-500",
			exceptional: "bg-emerald-500/10 text-emerald-500",
		},
	},
	defaultVariants: {
		variant: "success",
	},
});

const badgeDot = tv({
	base: "w-2 h-2 rounded-full",
	variants: {
		variant: {
			critical: "bg-red-500",
			warning: "bg-amber-500",
			info: "bg-blue-500",
			success: "bg-emerald-500",
			good: "bg-emerald-500",
			needs_serious_help: "bg-red-500",
			rough_around_edges: "bg-orange-500",
			decent_code: "bg-amber-500",
			solid_work: "bg-blue-500",
			exceptional: "bg-emerald-500",
		},
	},
	defaultVariants: {
		variant: "success",
	},
});

export interface BadgeProps
	extends HTMLAttributes<HTMLDivElement>,
		VariantProps<typeof badge> {
	showDot?: boolean;
	rounded?: boolean;
}

export const Badge = forwardRef<HTMLDivElement, BadgeProps>(
	({ className, variant, showDot = true, rounded = false, children, ...props }, ref) => {
		return (
			<div
				ref={ref}
				className={badge({ variant, className })}
				{...props}
			>
				{showDot && <span className={badgeDot({ variant })} />}
				<span>{children}</span>
			</div>
		);
	},
);

Badge.displayName = "Badge";
