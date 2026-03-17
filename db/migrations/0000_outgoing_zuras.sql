CREATE TYPE "public"."diff_line_type" AS ENUM('unchanged', 'addition', 'deletion');--> statement-breakpoint
CREATE TYPE "public"."language" AS ENUM('javascript', 'typescript', 'python', 'java', 'csharp', 'go', 'rust', 'ruby', 'php', 'sql', 'html', 'css', 'json', 'yaml', 'markdown', 'bash', 'plaintext');--> statement-breakpoint
CREATE TYPE "public"."problem_severity" AS ENUM('info', 'warning', 'error', 'critical');--> statement-breakpoint
CREATE TYPE "public"."roast_mode" AS ENUM('normal', 'roast');--> statement-breakpoint
CREATE TYPE "public"."verdict" AS ENUM('needs_serious_help', 'rough_around_edges', 'decent_code', 'solid_work', 'exceptional');--> statement-breakpoint
CREATE TABLE "analyses" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"submission_id" uuid NOT NULL,
	"score" numeric(3, 1) NOT NULL,
	"verdict" "verdict" NOT NULL,
	"summary" text,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "diff_lines" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"analysis_id" uuid NOT NULL,
	"line_number" integer NOT NULL,
	"line_type" "diff_line_type" NOT NULL,
	"original_code" text,
	"suggested_code" text,
	"explanation" text,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "problems" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"analysis_id" uuid NOT NULL,
	"title" text NOT NULL,
	"description" text NOT NULL,
	"severity" "problem_severity" NOT NULL,
	"line_start" integer,
	"line_end" integer,
	"code_snippet" text,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "submissions" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"code" text NOT NULL,
	"language" "language" NOT NULL,
	"roast_mode" "roast_mode" DEFAULT 'roast' NOT NULL,
	"ip_address" "inet",
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "analyses" ADD CONSTRAINT "analyses_submission_id_submissions_id_fk" FOREIGN KEY ("submission_id") REFERENCES "public"."submissions"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "diff_lines" ADD CONSTRAINT "diff_lines_analysis_id_analyses_id_fk" FOREIGN KEY ("analysis_id") REFERENCES "public"."analyses"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "problems" ADD CONSTRAINT "problems_analysis_id_analyses_id_fk" FOREIGN KEY ("analysis_id") REFERENCES "public"."analyses"("id") ON DELETE no action ON UPDATE no action;