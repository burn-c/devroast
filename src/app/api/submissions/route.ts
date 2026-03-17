import { desc, eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import { db } from "@/db";
import { analyses, submissions } from "@/db/schema";

export async function GET() {
	try {
		const recentSubmissions = await db
			.select({
				submissionId: submissions.id,
				code: submissions.code,
				language: submissions.language,
				createdAt: submissions.createdAt,
				analysisId: analyses.id,
				score: analyses.score,
				verdict: analyses.verdict,
			})
			.from(submissions)
			.innerJoin(analyses, eq(submissions.id, analyses.submissionId))
			.orderBy(desc(analyses.createdAt))
			.limit(10);

		return NextResponse.json(recentSubmissions);
	} catch (error) {
		console.error("Error fetching submissions:", error);
		return NextResponse.json(
			{ error: "Failed to fetch submissions" },
			{ status: 500 },
		);
	}
}
