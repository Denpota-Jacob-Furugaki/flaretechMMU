import { readFile, readdir } from "node:fs/promises";
import path from "node:path";

const ANALYSES_DIR = path.join(process.cwd(), "content", "analyses");

export type SectionKey =
  | "status"
  | "market"
  | "diagnosis"
  | "experience"
  | "retention";

export const SECTION_LABELS: Record<SectionKey, string> = {
  status: "現状の数字",
  market: "市場の地図",
  diagnosis: "自社の位置づけ診断",
  experience: "候補者体験とクロージング",
  retention: "リテンションの視点",
};

const VALID_SECTIONS: SectionKey[] = [
  "status",
  "market",
  "diagnosis",
  "experience",
  "retention",
];

export interface AnalysisMeta {
  slug: string;
  title: string;
  date: string | null;
  summary: string | null;
  relatesTo: SectionKey | null;
}

function extractTitle(md: string): string {
  const m = md.match(/^#\s+(.+?)\s*$/m);
  return m ? m[1].trim() : "Untitled";
}

function extractDate(md: string): string | null {
  const m = md.match(/\*\*(?:日付|Date)[:：]\*\*\s*(\S+)/);
  return m ? m[1].trim() : null;
}

function extractSummary(md: string): string | null {
  const q = md.match(/^##\s+.+\n+([^\n#][\s\S]*?)(?:\n\n|$)/m);
  if (q) return q[1].replace(/\s+/g, " ").trim();
  return null;
}

function extractRelatesTo(md: string): SectionKey | null {
  const m = md.match(/\*\*(?:関連セクション|Relates to)[:：]\*\*\s*(\S+)/);
  if (!m) return null;
  const raw = m[1].trim().toLowerCase();
  return (VALID_SECTIONS as string[]).includes(raw) ? (raw as SectionKey) : null;
}

function buildMeta(slug: string, body: string): AnalysisMeta {
  return {
    slug,
    title: extractTitle(body),
    date: extractDate(body),
    summary: extractSummary(body),
    relatesTo: extractRelatesTo(body),
  };
}

export async function listAnalyses(
  options: { section?: SectionKey } = {},
): Promise<AnalysisMeta[]> {
  let files: string[];
  try {
    files = await readdir(ANALYSES_DIR);
  } catch {
    return [];
  }
  const mds = files.filter((f) => f.endsWith(".md"));
  const out: AnalysisMeta[] = [];
  for (const name of mds) {
    const slug = name.replace(/\.md$/, "");
    const body = await readFile(path.join(ANALYSES_DIR, name), "utf-8");
    out.push(buildMeta(slug, body));
  }
  const filtered = options.section
    ? out.filter((a) => a.relatesTo === options.section)
    : out;
  filtered.sort((a, b) => (b.date ?? "").localeCompare(a.date ?? ""));
  return filtered;
}

export async function readAnalysis(slug: string): Promise<{
  meta: AnalysisMeta;
  body: string;
} | null> {
  try {
    const body = await readFile(path.join(ANALYSES_DIR, `${slug}.md`), "utf-8");
    return { meta: buildMeta(slug, body), body };
  } catch {
    return null;
  }
}

export async function analysisSlugs(): Promise<string[]> {
  const items = await listAnalyses();
  return items.map((a) => a.slug);
}
