import { SectionNav } from "@/components/SectionNav";
import { SectionHeading } from "@/components/SectionHeading";
import { Panel } from "@/components/Panel";
import { CandidateExperience } from "@/components/CandidateExperience";
import { OfferDecline } from "@/components/OfferDecline";
import { AiInsight } from "@/components/AiInsight";
import { RelatedAnalyses } from "@/components/RelatedAnalyses";
import {
  candidateExperience,
  offerDeclineReasons,
} from "@/data/frameworks";
import { loadAiInsights } from "@/lib/ai-insights";

export const metadata = {
  title: "④ 候補者体験とクロージング | Flaretech 採用ダッシュボード",
};

export default async function ExperiencePage() {
  const ai = await loadAiInsights();
  const insight = ai?.insights.experience;

  return (
    <main className="mx-auto max-w-7xl px-6 py-8 sm:py-10">
      <SectionNav current="experience" />

      <SectionHeading
        step="④ 候補者体験とクロージング"
        title="Candidate experience & closing"
        description="応募から内定承諾までの候補者体験を 2 つの枠組みで点検する。③の棚卸し結果がここで効いてくる（例: コンテンツ不足 → フィット感の欠如 → 内定辞退）。"
      />

      <section className="mt-4 mb-4">
        <Panel
          title="候補者エクスペリエンス スコアカード ― Candidate Experience scorecard"
          subtitle="応募プロセス・コミュニケーション・面接・オファー・オンボーディング・技術活用・社内文化紹介・フィードバック の 8 ステージで、良い候補者体験にどれだけ近づけているかを 0-5 で採点。未計測は自分で応募してみる／候補者ヒアリング／社員インタビューで埋めていく。"
        >
          <CandidateExperience categories={candidateExperience} />
        </Panel>
      </section>

      <section className="mb-6">
        <Panel
          title="内定辞退へのアプローチ法 ― Offer decline risk factors"
          subtitle="内定辞退を引き起こす 4 つのドライバー (競合オファー / フィット感欠如 / オンボーディング不透明 / プロセス中のコミュ不足) に対する Flaretech のリスクと仮説。文化フィットのリスクはワナ②『社員不在』と直結し high と評価済み。"
        >
          <OfferDecline reasons={offerDeclineReasons} />
        </Panel>
        <AiInsight insight={insight} />
      </section>

      <section className="mb-6">
        <RelatedAnalyses section="experience" />
      </section>
    </main>
  );
}
