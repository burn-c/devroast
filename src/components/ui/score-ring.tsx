import { forwardRef, type HTMLAttributes } from "react";

export interface ScoreRingProps extends HTMLAttributes<HTMLDivElement> {
	score: number;
	maxScore?: number;
}

export const ScoreRing = forwardRef<HTMLDivElement, ScoreRingProps>(
	({ className, score, maxScore = 10, ...props }, ref) => {
		const percentage = Math.min(score / maxScore, 1);
		const strokeDasharray = 2 * Math.PI * 80;
		const strokeDashoffset = strokeDasharray * (1 - percentage);

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
						strokeWidth="4"
					/>
					<defs>
						<linearGradient
							id="scoreGradient"
							x1="0%"
							y1="0%"
							x2="100%"
							y2="0%"
						>
							<stop offset="0%" stopColor="#10B981" />
							<stop offset="35%" stopColor="#F59E0B" />
							<stop offset="36%" stopColor="transparent" />
						</linearGradient>
					</defs>
					<ellipse
						cx="90"
						cy="90"
						rx="80"
						ry="80"
						fill="none"
						stroke="url(#scoreGradient)"
						strokeWidth="4"
						strokeDasharray={strokeDasharray}
						strokeDashoffset={strokeDashoffset}
						strokeLinecap="round"
					/>
				</svg>
				<div className="absolute inset-0 flex items-center justify-center">
					<span className="text-[#FAFAFA] font-mono text-[48px] font-bold">
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
