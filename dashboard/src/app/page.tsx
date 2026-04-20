import Link from "next/link";
import data from "@/data/dashboard.json";
import { DashboardData } from "@/lib/types";
import { KpiCard } from "@/components/KpiCard";
import { WeeklyTrend } from "@/components/WeeklyTrend";
import { PlatformTable } from "@/components/PlatformTable";
import { MoversCard } from "@/components/MoversCard";
import { AiInsight } from "@/components/AiInsight";
import { SectionHeading } from "@/components/SectionHeading";
import { Panel } from "@/components/Panel";
import { HiringStrategy } from "@/components/HiringStrategy";
import { ChannelMap2030 } from "@/components/ChannelMap2030";
import { ReputationBubble } from "@/components/ReputationBubble";
import { PitfallsFramework } from "@/components/PitfallsFramework";
import { ValueStyles } from "@/components/ValueStyles";
import { BrandChecklist } from "@/components/BrandChecklist";
import { CandidateExperience } from "@/components/CandidateExperience";
import { OfferDecline } from "@/components/OfferDecline";
import { RetentionFramework } from "@/components/RetentionFramework";
import { listAnalyses } from "@/lib/analyses";
import { loadAiInsights } from "@/lib/ai-insights";
import {
  brandChecklist,
  candidateExperience,
  hiringFunnelStages,
  hiringStrategyPhases,
  offerDeclineReasons,
  pitfallCauses,
  recruitmentChannels2030,
  reputationCompanies,
  retentionChallenges,
  valueStyles,
} from "@/data/frameworks";

const d = data as DashboardData;

export default async function Home() {
  const [analyses, ai] = await Promise.all([listAnalyses(), loadAiInsights()]);
  const insights = ai?.insights;

  return (
    <main className="mx-auto max-w-7xl px-6 py-8 sm:py-10">
      <header className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <div className="text-xs font-medium tracking-wider text-zinc-500">
            Flaretech ・ メディアマーケティングユニット
          </div>
          <h1 className="mt-1 text-2xl font-semibold sm:text-3xl">
            採用マーケティング ― 状況ダッシュボード
          </h1>
          <p className="mt-2 max-w-3xl text-sm text-zinc-600 dark:text-zinc-400">
            Flaretech の採用マーケを「マーケティング × 顧客リテンション」の視点で整理した社内ワークスペース。
            数字 → 市場 → 自社診断 → 体験 → 定着 の順に上から下へ読むとストーリーが繋がる構成です。
          </p>
        </div>
        <Link
          href="/analyses"
          className="inline-flex items-center gap-2 self-start rounded-lg border border-zinc-200 bg-white px-4 py-2 text-sm font-medium text-zinc-700 shadow-sm transition hover:border-zinc-300 hover:text-zinc-900 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:border-zinc-700 dark:hover:text-zinc-100"
        >
          分析一覧
          {analyses.length > 0 && (
            <span className="rounded-full bg-zinc-100 px-2 py-0.5 text-xs tabular-nums text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400">
              {analyses.length}
            </span>
          )}
          <span aria-hidden>→</span>
        </Link>
      </header>

      <nav className="mb-2 rounded-lg border border-zinc-200 bg-white/60 p-3 text-xs text-zinc-600 dark:border-zinc-800 dark:bg-zinc-900/60 dark:text-zinc-400">
        <p className="mb-1 text-[10px] uppercase tracking-widest text-zinc-500">
          このページの読み方
        </p>
        <ol className="list-decimal space-y-0.5 pl-5">
          <li>① 現状の数字 ― 今の採用ファネルを数値で把握する</li>
          <li>② 市場の地図 ― 競合・チャネルの中で自社がどこにいるか</li>
          <li>③ 自社の位置づけ診断 ― 価値観・ワナ・コンテンツ棚卸し</li>
          <li>④ 候補者体験とクロージング ― 応募〜内定承諾までの体験</li>
          <li>⑤ リテンションの視点 ― 採用広報が定着にどう効くか</li>
        </ol>
      </nav>

      {/* ═══════════════════════════════════════════════════════════════════
          ① 現状の数字
          ═══════════════════════════════════════════════════════════════ */}
      <SectionHeading
        step="① 現状の数字"
        title="Where we are today"
        description="今の採用活動を数値で把握。KPI → ファネル全体像 → 週次トレンド → 媒体別 → 動いた経路 の順に、実データで現状を捉える。"
      />

      <p className="mb-4 mt-2 text-xs text-zinc-500">{d.period}</p>

      <section className="mb-4">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {d.kpis.map((kpi) => (
            <KpiCard key={kpi.name} kpi={kpi} />
          ))}
        </div>
        <AiInsight insight={insights?.kpi} />
      </section>

      <section className="mb-4">
        <Panel
          title="採用活動 KPI × 打ち手 ― Hiring funnel × strategic levers"
          subtitle="認知 → エントリー → 選考 → 内定 → 入社 → 定着 の 6 段ファネルを、母集団形成 / クロージング / フォローアップ の 3 施策で打つ。左のファネル数値と右の施策カードを見比べて、今どの段階にどの打ち手を当てているかを議論する。"
        >
          <HiringStrategy stages={hiringFunnelStages} phases={hiringStrategyPhases} />
        </Panel>
      </section>

      <section className="mb-4">
        <WeeklyTrend data={d.weekly} />
        <AiInsight insight={insights?.trend} />
      </section>

      <section className="mb-4">
        <h3 className="mb-3 text-sm font-semibold tracking-wide text-zinc-600 dark:text-zinc-400">
          媒体別 3週比較
        </h3>
        <PlatformTable platforms={d.platforms} total={d.total} />
        <AiInsight insight={insights?.platforms_insight} />
      </section>

      <section className="mb-6">
        <h3 className="mb-3 text-sm font-semibold tracking-wide text-zinc-600 dark:text-zinc-400">
          今週のベスト / ワースト (応募数 前週比)
        </h3>
        <div className="grid gap-4 md:grid-cols-2">
          <MoversCard
            title="🟢 ベスト 3 (応募数 増加)"
            kind="best"
            movers={d.best}
          />
          <MoversCard
            title="🔴 ワースト 3 (応募数 減少)"
            kind="worst"
            movers={d.worst}
          />
        </div>
        <AiInsight insight={insights?.movers} />
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          ② 市場の地図
          ═══════════════════════════════════════════════════════════════ */}
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
        <AiInsight insight={insights?.market} />
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          ③ 自社の位置づけ診断
          ═══════════════════════════════════════════════════════════════ */}
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
        <AiInsight insight={insights?.diagnosis} />
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          ④ 候補者体験とクロージング
          ═══════════════════════════════════════════════════════════════ */}
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
        <AiInsight insight={insights?.experience} />
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          ⑤ リテンションの視点
          ═══════════════════════════════════════════════════════════════ */}
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
        <AiInsight insight={insights?.retention} />
      </section>

      <footer className="border-t border-zinc-200 pt-6 text-xs text-zinc-500 dark:border-zinc-800">
        出典：
        <code className="rounded bg-zinc-100 px-1.5 py-0.5 dark:bg-zinc-800">
          {d.sourceFile}
        </code>
        {" ・ "}
        静的スナップショット（最新化にはデータ取り込み＋再デプロイが必要）
        {ai && (
          <>
            {" ・ "}
            AI 考察:{" "}
            <code className="rounded bg-zinc-100 px-1.5 py-0.5 dark:bg-zinc-800">
              {ai.model}
            </code>
            {" ("}
            {new Date(ai.generated_at).toLocaleDateString("ja-JP")}
            {" 生成)"}
          </>
        )}
      </footer>
    </main>
  );
}
