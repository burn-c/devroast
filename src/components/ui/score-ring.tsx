import { forwardRef, type HTMLAttributes } from "react";
import { tv, type VariantProps } from "tailwind-variants";

export interface ScoreRingProps extends HTMLAttributes<HTMLDivElement> {
	score: number;
	maxScore?: number;
	variant?: "needs_serious_help" | "rough_around_edges" | "decent_code" | "solid_work" | "exceptional";
}

const scoreColor = tv({
	base: "font-mono text-[48px] font-bold",
	variants: {
		variant: {
			needs_serious_help: "text-red-500",
			rough_around_edges: "text-orange-500",
			decent_code: "text-amber-500",
			solid_work: "text-blue-500",
			exceptional: "text-emerald-500",
		},
	},
	defaultVariants: {
		variant: "needs_serious_help",
	},
});

const getScoreColor = (score: number, maxScore: number): string => {
	const percentage = (score / maxScore) * 100;
	if (percentage <= 40) return "#EF4444"; // red - needs_serious_help (0-4)
	if (percentage <= 60) return "#F97316"; // orange - rough_around_edges (4.1-6)
	if (percentage <= 70) return "#F59E0B"; // amber - decent_code (6.1-7)
	if (percentage <= 85) return "#3B82F6"; // blue - solid_work (7.1-8.5)
	return "#10B981"; // emerald - exceptional (8.6-10)
};

const getVerdictVariant = (score: number, maxScore: number): ScoreRingProps["variant"] => {
	const percentage = (score / maxScore) * 100;
	if (percentage <= 40) return "needs_serious_help";
	if (percentage <= 60) return "rough_around_edges";
	if (percentage <= 70) return "decent_code";
	if (percentage <= 85) return "solid_work";
	return "exceptional";
};

export const ScoreRing = forwardRef<HTMLDivElement, ScoreRingProps>(
	({ className, score, maxScore = 10, variant, ...props }, ref) => {
		const percentage = Math.min(Math.max(score / maxScore, 0), 1);
		const circumference = 2 * Math.PI * 80;
		const strokeDashoffset = circumference * (1 - percentage);
		const color = getScoreColor(score, maxScore);
		const verdictVariant = variant || getVerdictVariant(score, maxScore);

		return (
			<div
				ref={ref}
				className={className ?? "relative w-[180px] h-[180px]"}
				{...props}
			>
				<svg
					aria-label={`Score: ${score} out of ${maxScore}`}
					className="w-full h-full -rotate-90"
					role="img"
					viewBox="0 0 180 180"
				>
					<ellipse
						cx="90"
						cy="90"
						rx="80"
						ry="80"
						fill="none"
						stroke="#2A2A2A"
						strokeWidth="8"
					/>
					<ellipse
						cx="90"
						cy="90"
						rx="80"
						ry="80"
						fill="none"
						stroke={color}
						strokeWidth="8"
						strokeDasharray={circumference}
						strokeDashoffset={strokeDashoffset}
						strokeLinecap="round"
					/>
				</svg>
				<div className="absolute inset-0 flex items-center justify-center">
					<span className={scoreColor({ variant: verdictVariant })}>
						{score}
					</span>
					<span className="text-[#737373] font-mono text-[16px]">
						/{maxScore}
					</span>
				</div>
			</div>
		);
	},
);

ScoreRing.displayName = "ScoreRing";
