import { forwardRef, type HTMLAttributes } from "react";
import { tv, type VariantProps } from "tailwind-variants";

const card = tv({
	base: "w-full rounded-[6px] border border-[#2A2A2A] p-5",
	variants: {
		variant: {
			critical: "border-l-4 border-l-red-500",
			warning: "border-l-4 border-l-amber-500",
			good: "border-l-4 border-l-emerald-500",
		},
	},
	defaultVariants: {
		variant: "critical",
	},
});

const cardDot = tv({
	base: "w-2 h-2 rounded-full",
	variants: {
		variant: {
			critical: "bg-red-500",
			warning: "bg-amber-500",
			good: "bg-emerald-500",
		},
	},
	defaultVariants: {
		variant: "critical",
	},
});

const cardLabel = tv({
	base: "font-mono text-[12px]",
	variants: {
		variant: {
			critical: "text-red-500",
			warning: "text-amber-500",
			good: "text-emerald-500",
		},
	},
	defaultVariants: {
		variant: "critical",
	},
});

export interface CardProps
	extends HTMLAttributes<HTMLDivElement>,
		VariantProps<typeof card> {
	label?: string;
	title: string;
	description: string;
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
	({ className, variant, label, title, description, ...props }, ref) => {
		return (
			<div ref={ref} className={card({ variant, className })} {...props}>
				{label && (
					<div className="flex items-center gap-2 mb-3">
						<span className={cardDot({ variant })} />
						<span className={cardLabel({ variant })}>{label}</span>
					</div>
				)}
				<p className="font-mono text-[13px] text-[#FAFAFA] mb-2">{title}</p>
				<p className="font-['IBM_Plex_Mono'] text-[12px] text-[#A3A3A3] leading-relaxed">
					{description}
				</p>
			</div>
		);
	},
);

Card.displayName = "Card";
