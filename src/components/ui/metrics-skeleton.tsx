import { tv } from "tailwind-variants";

const skeleton = tv({
	base: "animate-pulse rounded bg-[#262626]",
});

export function MetricsSkeleton() {
	return (
		<div className="grid grid-cols-2 gap-4">
			<div className="flex flex-col gap-1 pr-16">
				<div className={skeleton({ class: "h-4 w-20" })} />
				<div className={skeleton({ class: "h-8 w-16" })} />
			</div>
			<div className="flex flex-col gap-1 pr-16">
				<div className={skeleton({ class: "h-4 w-24" })} />
				<div className={skeleton({ class: "h-8 w-16" })} />
			</div>
		</div>
	);
}
