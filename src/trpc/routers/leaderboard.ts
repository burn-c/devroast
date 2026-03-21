import { db } from "@/db";
import { analyses } from "@/db/schema";
import { baseProcedure, createTRPCRouter } from "../init";

export const leaderboardRouter = createTRPCRouter({
	stats: baseProcedure.query(async () => {
		const allAnalyses = await db.select().from(analyses);

		const total = allAnalyses.length;

		if (total === 0) {
			return {
				total: 0,
				avgScore: "0.0",
			};
		}

		const sum = allAnalyses.reduce((acc, curr) => {
			const score = Number(curr.score);
			return acc + (Number.isNaN(score) ? 0 : score);
		}, 0);

		const avgScore = (sum / total).toFixed(1);

		return {
			total,
			avgScore,
		};
	}),
});
