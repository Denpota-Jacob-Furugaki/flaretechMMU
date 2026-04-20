import { readFile, readdir } from "node:fs/promises";
import path from "node:path";

const ANALYSES_DIR = path.join(process.cwd(), "content", "analyses");

export interface AnalysisMeta {
  slug: string;
  title: string;
  date: string | null;
  summary: string | null;
}

function extractTitle(md: string): string {
  const m = md.match(/^#\s+(.+?)\s*$/m);
  return m ? m[1].trim() : "Untitled";
}

function extractDate(md: string): string | null {
  const m = md.match(/\*\*Date:\*\*\s*(\S+)/);
  return m ? m[1].trim() : null;
}

function extractSummary(md: string): string | null {
  // First paragraph under "## Question" (one level deep) — otherwise fall back
  // to the first body paragraph that isn't metadata.
  const q = md.match(/##\s*Question\s*\n\n([^\n][\s\S]*?)(?:\n\n|$)/);
  if (q) return q[1].replace(/\s+/g, " ").trim();
  return null;
}

export async function listAnalyses(): Promise<AnalysisMeta[]> {
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
    out.push({
      slug,
      title: extractTitle(body),
      date: extractDate(body),
      summary: extractSummary(body),
    });
  }
  out.sort((a, b) => (b.date ?? "").localeCompare(a.date ?? ""));
  return out;
}

export async function readAnalysis(slug: string): Promise<{
  meta: AnalysisMeta;
  body: string;
} | null> {
  try {
    const body = await readFile(path.join(ANALYSES_DIR, `${slug}.md`), "utf-8");
    return {
      meta: {
        slug,
        title: extractTitle(body),
        date: extractDate(body),
        summary: extractSummary(body),
      },
      body,
    };
  } catch {
    return null;
  }
}

export async function analysisSlugs(): Promise<string[]> {
  const items = await listAnalyses();
  return items.map((a) => a.slug);
}
