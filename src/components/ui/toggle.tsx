import * as TogglePrimitive from "@radix-ui/react-toggle";
import { type ButtonHTMLAttributes, forwardRef, type ReactNode } from "react";
import { tv, type VariantProps } from "tailwind-variants";

const toggle = tv({
	base: "inline-flex items-center gap-3 font-mono text-[12px]",
	variants: {
		variant: {
			default: "text-[#6B7280]",
			primary: "text-emerald-500",
		},
	},
	defaultVariants: {
		variant: "default",
	},
});

const toggleTrack = tv({
	base: "relative w-10 h-[22px] rounded-[11px] p-[3px] transition-colors",
	variants: {
		state: {
			on: "bg-emerald-500",
			off: "bg-[#2A2A2A]",
		},
	},
	defaultVariants: {
		state: "off",
	},
});

const toggleKnob = tv({
	base: "block w-4 h-4 rounded-full transition-transform",
	variants: {
		state: {
			on: "translate-x-[18px] bg-[#0A0A0A]",
			off: "translate-x-0 bg-[#6B7280]",
		},
	},
	defaultVariants: {
		state: "off",
	},
});

export interface ToggleProps
	extends ButtonHTMLAttributes<HTMLButtonElement>,
		VariantProps<typeof toggle> {
	pressed?: boolean;
	onPressedChange?: (pressed: boolean) => void;
	children?: ReactNode;
}

export const Toggle = forwardRef<HTMLButtonElement, ToggleProps>(
	(
		{ className, variant, pressed, onPressedChange, children, ...props },
		ref,
	) => {
		const state = pressed ? "on" : "off";

		return (
			<div className={toggle({ variant, className })}>
				<TogglePrimitive.Root
					ref={ref}
					pressed={pressed}
					onPressedChange={onPressedChange}
					className={toggleTrack({ state })}
					{...props}
				>
					<span className={toggleKnob({ state })} />
				</TogglePrimitive.Root>
				<span>{children}</span>
			</div>
		);
	},
);

Toggle.displayName = "Toggle";
