import { forwardRef, type HTMLAttributes } from "react";
import { tv, type VariantProps } from "tailwind-variants";

const diffLine = tv({
	base: "flex font-mono text-[13px] px-4 py-2 w-full",
	variants: {
		type: {
			removed: "bg-[#1A0A0A]",
			added: "bg-[#0A1A0F]",
			context: "",
		},
	},
	defaultVariants: {
		type: "context",
	},
});

const diffPrefix = tv({
	base: "w-4",
	variants: {
		type: {
			removed: "text-red-500",
			added: "text-emerald-500",
			context: "text-[#737373]",
		},
	},
	defaultVariants: {
		type: "context",
	},
});

export interface DiffLineProps
	extends HTMLAttributes<HTMLDivElement>,
		VariantProps<typeof diffLine> {
	content: string;
	prefix?: string;
}

export const DiffLine = forwardRef<HTMLDivElement, DiffLineProps>(
	({ className, type = "context", content, prefix, ...props }, ref) => {
		const displayPrefix =
			prefix ?? (type === "removed" ? "-" : type === "added" ? "+" : " ");

		return (
			<div ref={ref} className={diffLine({ type, className })} {...props}>
				<span className={diffPrefix({ type })}>{displayPrefix}</span>
				<span
					className={
						type === "removed"
							? "text-[#A3A3A3]"
							: type === "added"
								? "text-[#FAFAFA]"
								: "text-[#A3A3A3]"
					}
				>
					{content}
				</span>
			</div>
		);
	},
);

DiffLine.displayName = "DiffLine";
