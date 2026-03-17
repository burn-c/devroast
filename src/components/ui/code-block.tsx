"use client";

import { useEffect, useState } from "react";

export interface CodeBlockProps {
	code: string;
	filename?: string;
	lang?: string;
}

export function CodeBlock({ code, filename, lang = "javascript" }: CodeBlockProps) {
	const [html, setHtml] = useState<string>("");
	const lines = code.split("\n");

	useEffect(() => {
		const highlight = async () => {
			try {
				const { codeToHtml } = await import("shiki");
				const result = await codeToHtml(code, {
					lang,
					theme: "vesper",
				});
				setHtml(result);
			} catch {
				setHtml(code);
			}
		};
		highlight();
	}, [code, lang]);

	return (
		<div className="w-full rounded-[6px] border border-[#2A2A2A] overflow-hidden bg-[#111111]">
			<div className="flex items-center gap-3 h-10 px-4 border-b border-[#2A2A2A]">
				<span className="w-2.5 h-2.5 rounded-full bg-red-500" />
				<span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
				<span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
				{filename && (
					<span className="ml-auto text-[#737373] text-[12px]">{filename}</span>
				)}
			</div>
			<div className="flex">
				<div className="flex flex-col items-end gap-1.5 py-3 px-2.5 min-w-[40px] border-r border-[#2A2A2A] text-[#737373] text-[13px]">
					{lines.map((_, i) => (
						<span key={`line-${i}`}>{i + 1}</span>
					))}
				</div>
				<div
					dangerouslySetInnerHTML={{ __html: html }}
					className="flex-1 p-3 [&>pre]:!bg-transparent [&>pre]:!m-0 [&>pre]:!p-0 [&>pre]:!text-[13px] [&>pre]:!font-mono [&>.shiki]:!bg-transparent"
				/>
			</div>
		</div>
	);
}
