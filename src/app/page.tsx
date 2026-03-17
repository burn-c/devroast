"use client";

import Link from "next/link";
import { useState } from "react";

import {
	Button,
	CodeEditor,
	type SupportedLanguage,
	TableRow,
	Toggle,
} from "@/components/ui";

const sampleCode = `function calculateTotal(items) {
  var total = 0;
  for (var i = 0; i < items.length; i++) {
    if (total > 100) {
      console.log("discount applied");
      total = total * 0.9;
    }
  }
  // TODO: handle tax calculation
  // TODO: handle currency conversion
  return total;
}`;

const sampleAnalysisId = "a6489bba-41ca-47fd-9eef-fbfd40d697a3"; // Go code example

const leaderboardData = [
	{
		rank: "1",
		score: "1.2",
		code: [
			"eval(prompt('enter code'))",
			"document.write(response)",
			"// trust the user lol",
		],
		language: "javascript",
	},
	{
		rank: "2",
		score: "1.8",
		code: [
			"if (x == true) { return true; }",
			"else if (x == false) { return false; }",
			"else { return !false; }",
		],
		language: "typescript",
	},
	{
		rank: "3",
		score: "2.1",
		code: ["SELECT * FROM users WHERE 1=1", "-- TODO: add authentication"],
		language: "sql",
	},
];

export default function Home() {
	const [code, setCode] = useState(sampleCode);
	const [language, setLanguage] = useState<SupportedLanguage>("javascript");
	const [roastMode, setRoastMode] = useState(true);

	const handleRoast = () => {
		console.log("Roasting code:", { code, language, roastMode });
	};

	return (
		<div className="flex flex-col items-center px-10 py-8">
			<div className="w-full max-w-[960px] flex flex-col gap-8">
				{/* Hero Section */}
				<section className="flex flex-col gap-3">
					<h1 className="flex items-center gap-3 text-[36px] font-bold font-mono text-[#FAFAFA]">
						<span className="text-[#10B981]">$</span>
						<span>paste your code. get roasted.</span>
					</h1>
					<p className="font-['IBM_Plex_Mono'] text-[14px] text-[#A3A3A3]">
						<span className="text-[#737373]">//</span> drop your code below and
						we&apos;ll rate it — brutally honest or full roast mode
					</p>
				</section>

				{/* Code Editor */}
				<CodeEditor
					value={code}
					onChange={setCode}
					language={language}
					onLanguageChange={setLanguage}
				/>

				{/* Actions Bar */}
				<section className="flex items-center justify-between">
					<div className="flex items-center gap-4">
						<div className="flex items-center gap-2.5">
							<Toggle pressed={roastMode} onPressedChange={setRoastMode}>
								roast mode
							</Toggle>
							<span className="text-[12px] text-[#737373] font-['IBM_Plex_Mono']">
								<span className="text-[#737373]">//</span> maximum sarcasm{" "}
								{roastMode ? "enabled" : "disabled"}
							</span>
						</div>
					</div>
					<Link href={`/results/${sampleAnalysisId}`}>
						<Button variant="primary" onClick={handleRoast}>
							$ roast_my_code
						</Button>
					</Link>
				</section>

				{/* Footer Stats */}
				<section className="flex justify-center gap-6 text-[12px] text-[#737373] font-['IBM_Plex_Mono']">
					<span>2,847 codes roasted</span>
					<span>·</span>
					<span>avg score: 4.2/10</span>
				</section>

				{/* Spacer */}
				<div className="h-[60px]" />

				{/* Leaderboard Preview */}
				<section className="flex flex-col gap-4 w-full">
					<div className="flex items-center justify-between">
						<h2 className="flex items-center gap-2 text-[14px] font-bold font-mono text-[#FAFAFA]">
							<span className="text-[#10B981]">&#47;&#47;</span>
							<span>shame_leaderboard</span>
						</h2>
						<Button variant="ghost">$ view_all &gt;&gt;</Button>
					</div>

					<p className="text-[13px] text-[#737373] font-['IBM_Plex_Mono']">
						<span className="text-[#737373]">//</span> the worst code on the
						internet, ranked by shame
					</p>

					{/* Table Header */}
					<div className="flex items-center h-10 px-5 bg-[#171717] border-b border-[#2A2A2A] text-[12px] font-mono text-[#737373] font-medium">
						<div className="w-12">rank</div>
						<div className="w-[70px]">score</div>
						<div className="flex-1">code</div>
						<div className="w-[100px]">lang</div>
					</div>

					{/* Table Rows */}
					<div className="flex flex-col border border-[#2A2A2A] rounded-[6px] overflow-hidden">
						{leaderboardData.map((row) => (
							<TableRow
								key={row.rank}
								rank={`#${row.rank}`}
								score={row.score}
								codePreview={row.code[0]}
								language={row.language}
							/>
						))}
					</div>

					{/* Fade Hint */}
					<p className="text-center py-4 text-[12px] text-[#737373] font-['IBM_Plex_Mono']">
						showing top 3 of 2,847 ·{" "}
						<Link
							className="text-[#A3A3A3] hover:text-[#FAFAFA]"
							href="/leaderboard"
						>
							view full leaderboard &gt;&gt;
						</Link>
					</p>
				</section>

				{/* Bottom Spacer */}
				<div className="h-[60px]" />
			</div>
		</div>
	);
}
