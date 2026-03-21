import { relations } from "drizzle-orm/relations";
import { submissions, analyses, diffLines, problems } from "./schema";

export const analysesRelations = relations(analyses, ({one, many}) => ({
	submission: one(submissions, {
		fields: [analyses.submissionId],
		references: [submissions.id]
	}),
	diffLines: many(diffLines),
	problems: many(problems),
}));

export const submissionsRelations = relations(submissions, ({many}) => ({
	analyses: many(analyses),
}));

export const diffLinesRelations = relations(diffLines, ({one}) => ({
	analysis: one(analyses, {
		fields: [diffLines.analysisId],
		references: [analyses.id]
	}),
}));

export const problemsRelations = relations(problems, ({one}) => ({
	analysis: one(analyses, {
		fields: [problems.analysisId],
		references: [analyses.id]
	}),
}));