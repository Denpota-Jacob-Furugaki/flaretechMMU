import { SectionNav } from "@/components/SectionNav";
import { SectionHeading } from "@/components/SectionHeading";
import { Panel } from "@/components/Panel";
import { PitfallsFramework } from "@/components/PitfallsFramework";
import { ValueStyles } from "@/components/ValueStyles";
import { BrandChecklist } from "@/components/BrandChecklist";
import { AiInsight } from "@/components/AiInsight";
import { RelatedAnalyses } from "@/components/RelatedAnalyses";
import {
  brandChecklist,
  pitfallCauses,
  valueStyles,
} from "@/data/frameworks";
import { loadAiInsights } from "@/lib/ai-insights";

export const metadata = {
  title: "③ 自社の位置づけ診断 | Flaretech 採用ダッシュボード",
};

export default async function DiagnosisPage() {
  const ai = await loadAiInsights();
  const insight = ai?.insights.diagnosis;

  return (
    <main className="mx-auto max-w-7xl px-6 py-8 sm:py-10">
      <SectionNav current="diagnosis" />

      <SectionHeading
        step="③ 自社の位置づけ診断"
        title="Diagnose our positioning"
        description="価値観をどう伝えているか／何を伝え損ねているかを 3 つの枠組みで棚卸しする。診断結果が候補者体験 (④) と定着 (⑤) に直接つながる。"
      />

      <section className="mt-4 mb-4">
        <Panel
          title="採用の 7 つのワナ ― 7 recruitment-marketing pitfalls"
          subtitle="ありがちな採用広報の失敗パターン 7 つを 2 つの原因 (視点幅の説明不足 / 外部知識の欠如) に分類。各ワナに severity を付けて、Flaretech が今どこを踏んでいるかを議論する。ワナ②『社員不在』は現時点で high。"
        >
          <PitfallsFramework causes={pitfallCauses} />
        </Panel>
      </section>

      <section className="mb-4">
        <Panel
          title="企業の価値観を正しく伝えるための 4 つのスタイル ― 4 styles for expressing company values"
          subtitle="中央の Style（価値観）を、会社サイド (Business / Culture) と個人サイド (Job / Action) の 4 象限で分解。各象限にヒアリング項目 (例: 経営者の想い、社内でよく使われる言葉、活躍人材の特徴) を入れて、インタビューで何を聞くかを定義する。"
        >
          <ValueStyles styles={valueStyles} />
        </Panel>
      </section>

      <section className="mb-6">
        <Panel
          title="企業イメージづくり チェックシート ― Employer brand content checklist"
          subtitle="候補者が会社を理解するのに必要な 8 カテゴリのコンテンツ（企業・事業・社員/社風・職種・キャリア・経営・業界・選考プロセス）について、「存在するか」「情報は最新か」を可視化。Flaretech の現状評価を各行に入力済み。"
        >
          <BrandChecklist categories={brandChecklist} />
        </Panel>
        <AiInsight insight={insight} />
      </section>

      <section className="mb-6">
        <RelatedAnalyses section="diagnosis" />
      </section>
    </main>
  );
}
