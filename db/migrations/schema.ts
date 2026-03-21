import { pgTable, uuid, text, inet, timestamp, foreignKey, numeric, integer, pgEnum } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"

export const diffLineType = pgEnum("diff_line_type", ['unchanged', 'addition', 'deletion'])
export const language = pgEnum("language", ['javascript', 'typescript', 'python', 'java', 'csharp', 'go', 'rust', 'ruby', 'php', 'sql', 'html', 'css', 'json', 'yaml', 'markdown', 'bash', 'plaintext'])
export const problemSeverity = pgEnum("problem_severity", ['info', 'warning', 'error', 'critical'])
export const roastMode = pgEnum("roast_mode", ['normal', 'roast'])
export const verdict = pgEnum("verdict", ['needs_serious_help', 'rough_around_edges', 'decent_code', 'solid_work', 'exceptional'])


export const submissions = pgTable("submissions", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	code: text().notNull(),
	language: language().notNull(),
	roastMode: roastMode("roast_mode").default('roast').notNull(),
	ipAddress: inet("ip_address"),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
});

export const analyses = pgTable("analyses", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	submissionId: uuid("submission_id").notNull(),
	score: numeric({ precision: 3, scale:  1 }).notNull(),
	verdict: verdict().notNull(),
	summary: text(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
}, (table) => [
	foreignKey({
			columns: [table.submissionId],
			foreignColumns: [submissions.id],
			name: "analyses_submission_id_submissions_id_fk"
		}),
]);

export const diffLines = pgTable("diff_lines", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	analysisId: uuid("analysis_id").notNull(),
	lineNumber: integer("line_number").notNull(),
	lineType: diffLineType("line_type").notNull(),
	originalCode: text("original_code"),
	suggestedCode: text("suggested_code"),
	explanation: text(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
}, (table) => [
	foreignKey({
			columns: [table.analysisId],
			foreignColumns: [analyses.id],
			name: "diff_lines_analysis_id_analyses_id_fk"
		}),
]);

export const problems = pgTable("problems", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	analysisId: uuid("analysis_id").notNull(),
	title: text().notNull(),
	description: text().notNull(),
	severity: problemSeverity().notNull(),
	lineStart: integer("line_start"),
	lineEnd: integer("line_end"),
	codeSnippet: text("code_snippet"),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
}, (table) => [
	foreignKey({
			columns: [table.analysisId],
			foreignColumns: [analyses.id],
			name: "problems_analysis_id_analyses_id_fk"
		}),
]);
