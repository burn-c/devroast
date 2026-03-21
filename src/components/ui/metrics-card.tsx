"use client";

import { useEffect, useRef, useState } from "react";

export interface MetricsCardProps {
	label: string;
	value: number | string;
	isDecimal?: boolean;
}

export function MetricsCard({
	label,
	value,
	isDecimal = false,
}: MetricsCardProps) {
	const [displayValue, setDisplayValue] = useState(0);
	const [hasAnimated, setHasAnimated] = useState(false);
	const animationRef = useRef<number>();
	const numericValue = typeof value === "string" ? parseFloat(value) : value;

	useEffect(() => {
		if (hasAnimated) return;

		const duration = 500;
		const startTime = performance.now();
		const startValue = 0;

		const animate = (currentTime: number) => {
			const elapsed = currentTime - startTime;
			const progress = Math.min(elapsed / duration, 1);

			const easeOutQuart = 1 - (1 - progress) ** 4;
			const currentValue =
				startValue + (numericValue - startValue) * easeOutQuart;

			setDisplayValue(currentValue);

			if (progress < 1) {
				animationRef.current = requestAnimationFrame(animate);
			} else {
				setHasAnimated(true);
			}
		};

		animationRef.current = requestAnimationFrame(animate);

		return () => {
			if (animationRef.current) {
				cancelAnimationFrame(animationRef.current);
			}
		};
	}, [numericValue, hasAnimated]);

	const formattedValue = isDecimal
		? displayValue.toFixed(1)
		: Math.round(displayValue).toLocaleString();

	return (
		<div className="flex flex-col gap-1 pr-16">
			<span className="text-[12px] font-mono text-[#737373] uppercase tracking-wider">
				{label}
			</span>
			<span className="h-8 font-mono text-[28px] font-bold text-[#FAFAFA] tabular-nums">
				{formattedValue}
			</span>
		</div>
	);
}
