import { asc, desc, eq, sql } from "drizzle-orm";
import { NextResponse } from "next/server";
import { db } from "@/db";
import { analyses, submissions } from "@/db/schema";

export async function GET(request: Request) {
	const { searchParams } = new URL(request.url);
	const sort = searchParams.get("sort") || "worst"; // "worst" | "best" | "recent"
	const limit = parseInt(searchParams.get("limit") || "10");

	try {
		let orderBy;
		switch (sort) {
			case "best":
				orderBy = desc(analyses.score);
				break;
			case "recent":
				orderBy = desc(analyses.createdAt);
				break;
			case "worst":
			default:
				orderBy = asc(analyses.score);
				break;
		}

		const leaderboardData = await db
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
			.orderBy(orderBy)
			.limit(limit);

		const totalResult = await db
			.select({ count: sql<number>`count(*)` })
			.from(submissions)
			.innerJoin(analyses, eq(submissions.id, analyses.submissionId));

		const total = totalResult[0]?.count || 0;

		const avgScoreResult = await db
			.select({ avg: sql<string>`avg(${analyses.score})` })
			.from(analyses);

		const avgScore = avgScoreResult[0]?.avg || "0";

		return NextResponse.json({
			submissions: leaderboardData,
			stats: {
				total,
				avgScore: parseFloat(avgScore).toFixed(1),
			},
		});
	} catch (error) {
		console.error("Error fetching submissions:", error);
		return NextResponse.json(
			{ error: "Failed to fetch submissions" },
			{ status: 500 },
		);
	}
}
