"use client";

import { Suspense } from "react";
import { Metrics } from "./metrics";
import { MetricsSkeleton } from "./metrics-skeleton";

export function MetricsSection() {
	return (
		<Suspense fallback={<MetricsSkeleton />}>
			<Metrics />
		</Suspense>
	);
}
