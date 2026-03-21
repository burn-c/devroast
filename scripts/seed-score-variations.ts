import "dotenv/config";
import { db } from "../src/db/index";
import { analyses, submissions, verdictEnum } from "../src/db/schema";
import { sql } from "drizzle-orm";
import type { InferInsertModel } from "drizzle-orm";

type AnalysisInsert = InferInsertModel<typeof analyses>;

const sampleCode = `function calculateTotal(items) {
  var total = 0;
  for (var i = 0; i < items.length; i++) {
    if (total > 100) {
      total = total * 0.9;
    }
  }
  return total;
}`;

const verdictKeys = verdictEnum.enumValues;

const summaries: Record<typeof verdictKeys[number], string[]> = {
	needs_serious_help: [
		"This code is a disaster.",
		"I've seen better code in a garbage disposal.",
		"Please, for the love of all that is holy, refactor this.",
	],
	rough_around_edges: [
		"Functional but needs work.",
		"Not terrible, but there's room for improvement.",
		"It works, but we could do better.",
	],
	decent_code: [
		"Pretty solid code. Nothing exciting.",
		"Good baseline. Could be worse, could be better.",
	],
	solid_work: [
		"Nice work! Clean and maintainable.",
		"Great job! I'd hire you for this.",
		"Well structured and easy to follow.",
	],
	exceptional: [
		"Wow! This is production-ready code.",
		"Beautiful! The code is elegant and performant.",
		"Outstanding work! This is reference material.",
	],
};

function getVerdict(score: number): typeof verdictEnum.enumValues[number] {
	if (score <= 4) return "needs_serious_help";
	if (score <= 6) return "rough_around_edges";
	if (score <= 7.5) return "decent_code";
	if (score <= 8.5) return "solid_work";
	return "exceptional";
}

async function seed() {
	console.log("🌱 Starting score variations seed...\n");

	await db.execute(sql`DELETE FROM diff_lines`);
	await db.execute(sql`DELETE FROM problems`);
	await db.execute(sql`DELETE FROM analyses`);
	await db.execute(sql`DELETE FROM submissions`);
	console.log("🗑️  Cleared existing data\n");

	const languages = [
		"javascript",
		"typescript",
		"python",
		"java",
		"go",
		"rust",
	] as const;

	const scores: number[] = [];
	for (let i = 0; i <= 100; i++) {
		scores.push(i / 10);
	}

	const total = scores.length;
	let count = 0;

	for (const score of scores) {
		const verdict = getVerdict(score);
		const language = languages[count % languages.length];
		const summary = summaries[verdict][count % summaries[verdict].length];

		const submissionId = crypto.randomUUID();
		const analysisId = crypto.randomUUID();

		await db.insert(submissions).values({
			id: submissionId,
			code: sampleCode,
			language,
			roastMode: "roast",
			createdAt: new Date(Date.now() - count * 60 * 60 * 1000),
		});

		await db.insert(analyses).values({
			id: analysisId,
			submissionId,
			score: score.toFixed(1),
			verdict,
			summary,
			createdAt: new Date(Date.now() - count * 60 * 60 * 1000),
		});

		count++;
		const percentage = ((count / total) * 100).toFixed(0);
		const verdictLabel = verdict.replace(/_/g, " ").padEnd(20);
		console.log(`[${percentage.padStart(3)}%] Score: ${score.toFixed(1).padStart(4)} | ${verdictLabel} | ${language}`);
	}

	console.log(`\n✅ Seed completed! Created ${count} submissions with scores from 0.0 to 10.0\n`);
}

seed().catch(console.error);
