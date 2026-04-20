import { readFile } from "node:fs/promises";
import path from "node:path";

export interface InsightBlock {
  body: string;
  next_move: string;
}

export interface AiInsights {
  generated_at: string;
  model: string;
  insights: {
    kpi: InsightBlock;
    trend: InsightBlock;
    platforms_insight: InsightBlock;
    movers: InsightBlock;
  };
}

const AI_INSIGHTS_PATH = path.join(
  process.cwd(),
  "src",
  "data",
  "ai_insights.json",
);

/**
 * Loads ai_insights.json at build time. Returns null if the file doesn't exist
 * — letting the dashboard degrade gracefully when the generator hasn't run.
 */
export async function loadAiInsights(): Promise<AiInsights | null> {
  try {
    const body = await readFile(AI_INSIGHTS_PATH, "utf-8");
    return JSON.parse(body) as AiInsights;
  } catch {
    return null;
  }
}
