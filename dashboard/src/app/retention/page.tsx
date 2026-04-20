import { SectionNav } from "@/components/SectionNav";
import { MissionRibbon } from "@/components/MissionRibbon";
import { SectionHeading } from "@/components/SectionHeading";
import { Panel } from "@/components/Panel";
import { RetentionFramework } from "@/components/RetentionFramework";
import { AiInsight } from "@/components/AiInsight";
import { RelatedAnalyses } from "@/components/RelatedAnalyses";
import { retentionChallenges } from "@/data/frameworks";
import { loadAiInsights } from "@/lib/ai-insights";

export const metadata = {
  title: "⑤ リテンションの視点 | Flaretech 採用ダッシュボード",
};

export default async function RetentionPage() {
  const ai = await loadAiInsights();
  const insight = ai?.insights.retention;

  return (
    <main className="mx-auto max-w-7xl px-6 py-8 sm:py-10">
      <SectionNav current="retention" />
      <MissionRibbon />

      <SectionHeading
        step="⑤ リテンションの視点"
        title="Retention lens"
        description="採用広報は入社して終わりではなく、定着まで効くという考え方。採用フェーズのアウトプットが、育成・配置・評価・報酬・代謝 の 5 人事課題を間接的に下支えする。"
      />

      <section className="mt-4 mb-6">
        <Panel
          title="企業イメージがすべてを癒す ― How employer brand solves HR challenges"
          subtitle="企業イメージが強い／弱い でそれぞれ 5 つの人事課題にどう影響するかを並べた枠組み。「強いイメージ」列が採用広報の到達目標、「弱いイメージ」列が放置した場合のリスク。"
        >
          <RetentionFramework challenges={retentionChallenges} />
        </Panel>
        <AiInsight insight={insight} />
      </section>

      <section className="mb-6">
        <RelatedAnalyses section="retention" />
      </section>
    </main>
  );
}
