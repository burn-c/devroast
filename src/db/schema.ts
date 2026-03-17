import {
	pgEnum,
	pgTable,
	uuid,
	text,
	decimal,
	integer,
	timestamp,
	inet,
} from "drizzle-orm/postgres-core";

// Enums
export const languageEnum = pgEnum("language", [
	"javascript",
	"typescript",
	"python",
	"java",
	"csharp",
	"go",
	"rust",
	"ruby",
	"php",
	"sql",
	"html",
	"css",
	"json",
	"yaml",
	"markdown",
	"bash",
	"plaintext",
]);

export const roastModeEnum = pgEnum("roast_mode", ["normal", "roast"]);

export const verdictEnum = pgEnum("verdict", [
	"needs_serious_help",
	"rough_around_edges",
	"decent_code",
	"solid_work",
	"exceptional",
]);

export const problemSeverityEnum = pgEnum("problem_severity", [
	"info",
	"warning",
	"error",
	"critical",
]);

export const diffLineTypeEnum = pgEnum("diff_line_type", [
	"unchanged",
	"addition",
	"deletion",
]);

// Tables
export const submissions = pgTable("submissions", {
	id: uuid("id").primaryKey().defaultRandom(),
	code: text("code").notNull(),
	language: languageEnum("language").notNull(),
	roastMode: roastModeEnum("roast_mode").notNull().default("roast"),
	ipAddress: inet("ip_address"),
	createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const analyses = pgTable("analyses", {
	id: uuid("id").primaryKey().defaultRandom(),
	submissionId: uuid("submission_id")
		.notNull()
		.references(() => submissions.id),
	score: decimal("score", { precision: 3, scale: 1 }).notNull(),
	verdict: verdictEnum("verdict").notNull(),
	summary: text("summary"),
	createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const problems = pgTable("problems", {
	id: uuid("id").primaryKey().defaultRandom(),
	analysisId: uuid("analysis_id")
		.notNull()
		.references(() => analyses.id),
	title: text("title").notNull(),
	description: text("description").notNull(),
	severity: problemSeverityEnum("severity").notNull(),
	lineStart: integer("line_start"),
	lineEnd: integer("line_end"),
	codeSnippet: text("code_snippet"),
	createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const diffLines = pgTable("diff_lines", {
	id: uuid("id").primaryKey().defaultRandom(),
	analysisId: uuid("analysis_id")
		.notNull()
		.references(() => analyses.id),
	lineNumber: integer("line_number").notNull(),
	lineType: diffLineTypeEnum("line_type").notNull(),
	originalCode: text("original_code"),
	suggestedCode: text("suggested_code"),
	explanation: text("explanation"),
	createdAt: timestamp("created_at").notNull().defaultNow(),
});

// Type exports
export type Submission = typeof submissions.$inferSelect;
export type NewSubmission = typeof submissions.$inferInsert;
export type Analysis = typeof analyses.$inferSelect;
export type NewAnalysis = typeof analyses.$inferInsert;
export type Problem = typeof problems.$inferSelect;
export type NewProblem = typeof problems.$inferInsert;
export type DiffLine = typeof diffLines.$inferSelect;
export type NewDiffLine = typeof diffLines.$inferInsert;
