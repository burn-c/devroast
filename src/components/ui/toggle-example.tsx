"use client";

import { useState } from "react";
import { Toggle } from "@/components/ui";

export function ToggleExample() {
	const [pressed, setPressed] = useState(false);

	return (
		<div className="flex items-center gap-8">
			<Toggle pressed={pressed} onPressedChange={setPressed}>
				roast mode
			</Toggle>
			<Toggle>roast mode (uncontrolled)</Toggle>
		</div>
	);
}
