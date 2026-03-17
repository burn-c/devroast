"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

import { Button, Card, CodeBlock, DiffLine, ScoreRing } from "@/components/ui";
import type {
	Analysis,
	DiffLine as DiffLineType,
	Problem,
	Submission,
} from "@/db/schema";

interface RoastData {
	submission: Submission;
	analysis: Analysis;
	problems: Problem[];
	diffLines: DiffLineType[];
}

const verdictColors: Record<string, "critical" | "warning" | "good"> = {
	needs_serious_help: "critical",
	rough_around_edges: "warning",
	decent_code: "warning",
	solid_work: "good",
	exceptional: "good",
};

export default function ResultsPage() {
	const params = useParams();
	const id = params?.id as string;
	const [data, setData] = useState<RoastData | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		if (!id) return;

		const fetchData = async () => {
			try {
				const response = await fetch(`/api/roast/${id}`);
				if (!response.ok) {
					throw new Error("Failed to fetch roast data");
				}
				const result = await response.json();
				setData(result);
			} catch (err) {
				setError(err instanceof Error ? err.message : "Unknown error");
			} finally {
				setLoading(false);
			}
		};

		fetchData();
	}, [id]);

	if (loading) {
		return (
			<div className="flex flex-col items-center justify-center min-h-[60vh]">
				<div className="text-[#737373] font-mono text-[14px]">loading...</div>
			</div>
		);
	}

	if (error || !data) {
		return (
			<div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
				<div className="text-red-500 font-mono text-[14px]">
					{error || "Not found"}
				</div>
				<Link href="/">
					<Button variant="ghost">← back to home</Button>
				</Link>
			</div>
		);
	}

	const { submission, analysis, problems, diffLines } = data;
	const color = verdictColors[analysis.verdict] || "warning";
	const lines = submission.code.split("\n").length;

	return (
		<div className="flex flex-col items-center">
			<div className="w-full max-w-[960px] flex flex-col gap-10 px-10 py-8">
				{/* Score Hero */}
				<section className="flex items-center gap-12">
					<ScoreRing score={Number(analysis.score)} maxScore={10} />

					<div className="flex flex-col gap-4 flex-1">
						<div className="flex items-center gap-2">
							<span
								className={`inline-flex items-center gap-2 px-3 py-1 rounded-full font-mono text-[13px] font-medium ${
									color === "critical"
										? "bg-red-500/10 text-red-500"
										: color === "warning"
											? "bg-amber-500/10 text-amber-500"
											: "bg-emerald-500/10 text-emerald-500"
								}`}
							>
								<span
									className={`w-2 h-2 rounded-full ${
										color === "critical"
											? "bg-red-500"
											: color === "warning"
												? "bg-amber-500"
												: "bg-emerald-500"
									}`}
								/>
								verdict: {analysis.verdict}
							</span>
						</div>

						<p className="font-['IBM_Plex_Mono'] text-[20px] text-[#FAFAFA] leading-relaxed">
							&quot;{analysis.summary}&quot;
						</p>

						<div className="flex items-center gap-4 text-[12px] text-[#737373] font-mono">
							<span>lang: {submission.language}</span>
							<span>·</span>
							<span>{lines} lines</span>
						</div>
					</div>
				</section>

				{/* Divider */}
				<div className="h-[1px] bg-[#2A2A2A]" />

				{/* Submitted Code */}
				<section className="flex flex-col gap-4">
					<h2 className="flex items-center gap-2 font-mono text-[14px] font-bold text-[#FAFAFA]">
						<span className="text-[#10B981]">//</span>
						<span>your_submission</span>
					</h2>

					<div className="rounded-[6px] border border-[#2A2A2A] overflow-hidden bg-[#111111]">
						<CodeBlock code={submission.code} />
					</div>
				</section>

				{/* Divider */}
				<div className="h-[1px] bg-[#2A2A2A]" />

				{/* Analysis */}
				<section className="flex flex-col gap-6">
					<h2 className="flex items-center gap-2 font-mono text-[14px] font-bold text-[#FAFAFA]">
						<span className="text-[#10B981]">//</span>
						<span>detailed_analysis</span>
					</h2>

					<div className="grid grid-cols-2 gap-5">
						{problems.length > 0 ? (
							problems.map((problem) => (
								<Card
									key={problem.id}
									variant={
										problem.severity === "critical" ||
										problem.severity === "error"
											? "critical"
											: problem.severity === "warning"
												? "warning"
												: "good"
									}
									label={problem.severity}
									title={problem.title}
									description={problem.description}
								/>
							))
						) : (
							<Card
								variant="good"
								label="success"
								title="No issues found"
								description="Your code looks clean!"
							/>
						)}
					</div>
				</section>

				{/* Divider */}
				<div className="h-[1px] bg-[#2A2A2A]" />

				{/* Suggested Fix */}
				<section className="flex flex-col gap-6">
					<h2 className="flex items-center gap-2 font-mono text-[14px] font-bold text-[#FAFAFA]">
						<span className="text-[#10B981]">//</span>
						<span>suggested_fix</span>
					</h2>

					<div className="rounded-[6px] border border-[#2A2A2A] overflow-hidden bg-[#111111]">
						<div className="flex items-center h-10 px-4 border-b border-[#2A2A2A]">
							<span className="text-[12px] text-[#737373] font-mono">
								improved_code.
								{submission.language === "typescript"
									? "ts"
									: submission.language === "javascript"
										? "js"
										: "txt"}
							</span>
						</div>

						<div className="flex">
							<div className="flex flex-col items-end gap-1.5 py-3 px-3 min-w-[48px] border-r border-[#2A2A2A] text-[12px] text-[#737373] font-mono">
								{diffLines.map((_, i) => (
									<span key={i}>{i + 1}</span>
								))}
							</div>

							<div className="flex-1">
								{diffLines.length > 0 ? (
									diffLines.map((line, i) => (
										<DiffLine
											key={line.id || i}
											type={
												line.lineType === "addition"
													? "added"
													: line.lineType === "deletion"
														? "removed"
														: "context"
											}
											content={line.suggestedCode || line.originalCode || " "}
										/>
									))
								) : (
									<div className="p-4 text-[13px] text-[#737373] font-mono">
										No diff suggestions available
									</div>
								)}
							</div>
						</div>
					</div>
				</section>

				{/* Back Button */}
				<div className="flex justify-center pt-4">
					<Link href="/">
						<Button variant="ghost">← roast another one</Button>
					</Link>
				</div>
			</div>
		</div>
	);
}
