import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import { db } from "@/db";
import { analyses, diffLines, problems, submissions } from "@/db/schema";

export async function GET(
	_request: Request,
	{ params }: { params: Promise<{ id: string }> },
) {
	const { id } = await params;

	try {
		const analysisList = await db
			.select({
				id: analyses.id,
				submissionId: analyses.submissionId,
				score: analyses.score,
				verdict: analyses.verdict,
				summary: analyses.summary,
				createdAt: analyses.createdAt,
			})
			.from(analyses)
			.where(eq(analyses.id, id))
			.limit(1);

		if (!analysisList.length) {
			return NextResponse.json(
				{ error: "Analysis not found" },
				{ status: 404 },
			);
		}

		const analysis = analysisList[0];

		const submissionList = await db
			.select({
				id: submissions.id,
				code: submissions.code,
				language: submissions.language,
				roastMode: submissions.roastMode,
				createdAt: submissions.createdAt,
			})
			.from(submissions)
			.where(eq(submissions.id, analysis.submissionId))
			.limit(1);

		const submission = submissionList[0];

		const problemsList = await db
			.select({
				id: problems.id,
				analysisId: problems.analysisId,
				title: problems.title,
				description: problems.description,
				severity: problems.severity,
				lineStart: problems.lineStart,
				lineEnd: problems.lineEnd,
				codeSnippet: problems.codeSnippet,
				createdAt: problems.createdAt,
			})
			.from(problems)
			.where(eq(problems.analysisId, id));

		const diffLinesList = await db
			.select({
				id: diffLines.id,
				analysisId: diffLines.analysisId,
				lineNumber: diffLines.lineNumber,
				lineType: diffLines.lineType,
				originalCode: diffLines.originalCode,
				suggestedCode: diffLines.suggestedCode,
				explanation: diffLines.explanation,
				createdAt: diffLines.createdAt,
			})
			.from(diffLines)
			.where(eq(diffLines.analysisId, id))
			.orderBy(diffLines.lineNumber);

		return NextResponse.json({
			submission,
			analysis,
			problems: problemsList,
			diffLines: diffLinesList,
		});
	} catch (error) {
		console.error("Error fetching roast data:", error);
		return NextResponse.json(
			{ error: "Failed to fetch roast data" },
			{ status: 500 },
		);
	}
}
