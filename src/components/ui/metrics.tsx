"use client";

import { useQuery } from "@tanstack/react-query";
import { useTRPC } from "@/trpc/client";
import { MetricsCard } from "./metrics-card";
import { MetricsSkeleton } from "./metrics-skeleton";

interface MetricsProps {
	total: number;
	avgScore: string;
}

function MetricsContent({ total, avgScore }: MetricsProps) {
	return (
		<div className="grid grid-cols-2 gap-4">
			<MetricsCard label="Roasted Codes" value={total} />
			<MetricsCard label="Avg Score" value={avgScore} isDecimal />
		</div>
	);
}

export function Metrics() {
	const trpc = useTRPC();
	const { data, isLoading } = useQuery(trpc.leaderboard.stats.queryOptions());

	if (isLoading || !data) {
		return <MetricsSkeleton />;
	}

	return <MetricsContent total={data.total} avgScore={data.avgScore} />;
}
