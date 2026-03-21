import { avg, count } from "drizzle-orm";
import { db } from "@/db";
import { analyses } from "@/db/schema";
import { baseProcedure, createTRPCRouter } from "../init";

export const leaderboardRouter = createTRPCRouter({
	stats: baseProcedure.query(async () => {
		const [countResult, avgResult] = await Promise.all([
			db.select({ total: count() }).from(analyses),
			db.select({ average: avg(analyses.score) }).from(analyses),
		]);

		const total = countResult[0]?.total ?? 0;
		const avgScore = avgResult[0]?.average;

		return {
			total,
			avgScore: avgScore != null ? Number(avgScore).toFixed(1) : "0.0",
		};
	}),
});
