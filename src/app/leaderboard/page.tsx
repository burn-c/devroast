"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui";

interface Submission {
	submissionId: string;
	code: string;
	language: string;
	createdAt: string;
	analysisId: string;
	score: string;
	verdict: string;
}

interface LeaderboardData {
	submissions: Submission[];
	stats: {
		total: number;
		avgScore: string;
	};
}

const verdictColors: Record<string, string> = {
	needs_serious_help: "#EF4444",
	rough_around_edges: "#F97316",
	decent_code: "#F59E0B",
	solid_work: "#3B82F6",
	exceptional: "#10B981",
};

const formatDate = (dateString: string): string => {
	const date = new Date(dateString);
	return date.toLocaleDateString("en-US", {
		month: "short",
		day: "numeric",
	});
};

const getCodePreview = (code: string, maxLines = 3): string => {
	const lines = code.split("\n").slice(0, maxLines);
	return lines.join("\n");
};

export default function LeaderboardPage() {
	const [data, setData] = useState<LeaderboardData | null>(null);
	const [loading, setLoading] = useState(true);
	const [sort, setSort] = useState<"worst" | "best" | "recent">("worst");

	useEffect(() => {
		const fetchData = async () => {
			setLoading(true);
			try {
				const response = await fetch(`/api/submissions?sort=${sort}&limit=10`);
				const result = await response.json();
				setData(result);
			} catch (error) {
				console.error("Error fetching leaderboard:", error);
			} finally {
				setLoading(false);
			}
		};
		fetchData();
	}, [sort]);

	const getRankColor = (index: number): string => {
		if (index === 0) return "#EF4444"; // Red - worst
		if (index === 1) return "#F97316"; // Orange
		if (index === 2) return "#F59E0B"; // Amber
		return "#737373"; // Gray
	};

	return (
		<div className="flex flex-col items-center px-10 py-8">
			<div className="w-full max-w-[960px] flex flex-col gap-10">
				{/* Hero Section */}
				<section className="flex flex-col gap-4">
					<h1 className="flex items-center gap-3 text-[28px] font-bold font-mono text-[#FAFAFA]">
						<span className="text-[#10B981]">&gt;</span>
						<span>shame_leaderboard</span>
					</h1>
					<p className="font-['IBM_Plex_Mono'] text-[14px] text-[#A3A3A3]">
						// the most roasted code on the internet
					</p>

					{data && (
						<div className="flex items-center gap-2 text-[12px] text-[#737373] font-['IBM_Plex_Mono']">
							<span>{data.stats.total.toLocaleString()} submissions</span>
							<span>·</span>
							<span>avg score: {data.stats.avgScore}/10</span>
						</div>
					)}
				</section>

				{/* Sort Controls */}
				<div className="flex gap-2">
					<Button
						variant={sort === "worst" ? "primary" : "ghost"}
						size="sm"
						onClick={() => setSort("worst")}
					>
						😢 Worst
					</Button>
					<Button
						variant={sort === "best" ? "primary" : "ghost"}
						size="sm"
						onClick={() => setSort("best")}
					>
						🏆 Best
					</Button>
					<Button
						variant={sort === "recent" ? "primary" : "ghost"}
						size="sm"
						onClick={() => setSort("recent")}
					>
						🕐 Recent
					</Button>
				</div>

				{/* Leaderboard Entries */}
				{loading ? (
					<div className="flex justify-center py-10">
						<span className="text-[#737373] font-mono">loading...</span>
					</div>
				) : (
					<div className="flex flex-col gap-5">
						{data?.submissions.map((submission, index) => (
							<Link
								key={submission.analysisId}
								href={`/results/${submission.analysisId}`}
								className="block"
							>
								<div className="flex flex-col rounded-[6px] border border-[#2A2A2A] overflow-hidden hover:border-[#3A3A3A] transition-colors">
									{/* Meta Row */}
									<div className="flex items-center justify-between h-12 px-5 border-b border-[#2A2A2A]">
										<div className="flex items-center gap-4">
											<span
												className="font-mono text-[14px] font-bold"
												style={{ color: getRankColor(index) }}
											>
												#{index + 1}
											</span>
											<span
												className="font-mono text-[13px]"
												style={{ color: verdictColors[submission.verdict] }}
											>
												{submission.score}/10
											</span>
											<span className="text-[#737373] font-mono text-[12px]">
												{submission.language}
											</span>
										</div>
										<span className="text-[#737373] font-mono text-[12px]">
											{formatDate(submission.createdAt)}
										</span>
									</div>

									{/* Code Preview */}
									<div className="flex bg-[#111111]">
										<div className="flex flex-col items-end gap-1.5 py-3 px-2.5 min-w-[40px] border-r border-[#2A2A2A] text-[#737373] text-[13px] font-mono">
											{submission.code.split("\n").slice(0, 3).map((_, i) => (
												<span key={i}>{i + 1}</span>
											))}
										</div>
										<pre className="flex-1 p-3 text-[13px] font-mono text-[#A3A3A3] overflow-hidden">
											{getCodePreview(submission.code)}
										</pre>
									</div>
								</div>
							</Link>
						))}
					</div>
				)}

				{/* Back Link */}
				<div className="flex justify-center pt-4">
					<Link href="/">
						<Button variant="ghost">← back to home</Button>
					</Link>
				</div>
			</div>
		</div>
	);
}
