import { SectionNav } from "@/components/SectionNav";
import { MissionRibbon } from "@/components/MissionRibbon";
import { SectionHeading } from "@/components/SectionHeading";
import { Panel } from "@/components/Panel";
import { ReputationBubble } from "@/components/ReputationBubble";
import { ChannelMap2030 } from "@/components/ChannelMap2030";
import { AiInsight } from "@/components/AiInsight";
import { RelatedAnalyses } from "@/components/RelatedAnalyses";
import {
  recruitmentChannels2030,
  reputationCompanies,
} from "@/data/frameworks";
import { loadAiInsights } from "@/lib/ai-insights";

export const metadata = {
  title: "② 市場の地図 | Flaretech 採用ダッシュボード",
};

export default async function MarketPage() {
  const ai = await loadAiInsights();
  const insight = ai?.insights.market;

  return (
    <main className="mx-auto max-w-7xl px-6 py-8 sm:py-10">
      <SectionNav current="market" />
      <MissionRibbon />

      <SectionHeading
        step="② 市場の地図"
        title="Know the landscape"
        description="自社を絶対評価するのではなく、競合とチャネル動向の中で相対的にどこにいるかを見る。ワナ⑤『自社よがり』『差が伝わらない』を避けるための視点。"
      />

      <section className="mt-4 mb-4">
        <Panel
          title="評判 × 認知度 バブル分析 ― Reputation × Awareness map"
          subtitle="横軸=認知度 (クチコミ件数) · 縦軸=口コミ評価 (5点満点) · バブル径=クチコミ件数。赤=自社、緑=競合、スレート=プレースホルダー。目標は右上『評判が良く認知率も高い企業エリア』。破線『大きな壁 (評価 4.0)』を越えないと評判ドリブンの応募は生まれない。実数値は OpenWork / ライトハウス等から取得して差し替え予定。"
        >
          <ReputationBubble data={reputationCompanies} />
        </Panel>
      </section>

      <section className="mb-6">
        <Panel
          title="2030年の採用チャネル地図 ― Recruitment channel landscape toward 2030"
          subtitle="採用チャネルを Traditional / Tech-augmented (検索エンジン + ATS強化) / Emerging (ダイレクト・マッチング新興) の 3 層に分類。各チャネルで Flaretech が active (使えている) / gap (使えていない) / not-applicable のどれか。2030年に向けた投資判断のベース。"
        >
          <ChannelMap2030 channels={recruitmentChannels2030} />
        </Panel>
        <AiInsight insight={insight} />
      </section>

      <section className="mb-6">
        <RelatedAnalyses section="market" />
      </section>
    </main>
  );
}
