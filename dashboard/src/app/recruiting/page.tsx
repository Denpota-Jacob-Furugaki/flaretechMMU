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
import { SectionCard } from "@/components/SectionCard";
import { MissionHero } from "@/components/MissionHero";
import { listAnalyses } from "@/lib/analyses";
import { loadAiInsights } from "@/lib/ai-insights";
import {
  hiringFunnelStages,
  hiringStrategyPhases,
} from "@/data/frameworks";
import Link from "next/link";

const d = data as DashboardData;

export const metadata = {
  title: "🎯 Recruiting | Flaretech ダッシュボード",
};

export default async function RecruitingHome() {
  const [analyses, marketA, diagA, expA, retA, ai] = await Promise.all([
    listAnalyses(),
    listAnalyses({ section: "market" }),
    listAnalyses({ section: "diagnosis" }),
    listAnalyses({ section: "experience" }),
    listAnalyses({ section: "retention" }),
    loadAiInsights(),
  ]);
  const insights = ai?.insights;

  return (
    <main className="mx-auto max-w-7xl px-6 py-8 sm:py-10">
      <nav className="mb-6 flex flex-wrap items-center gap-2 border-b border-zinc-200 pb-4 text-xs text-zinc-600 dark:border-zinc-800 dark:text-zinc-400">
        <Link
          href="/"
          className="rounded-md border border-zinc-200 bg-white px-2.5 py-1 font-medium shadow-sm hover:border-zinc-300 hover:text-zinc-900 dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-zinc-700 dark:hover:text-zinc-100"
        >
          ← ホーム
        </Link>
        <span className="text-zinc-400">/</span>
        <span className="font-medium text-zinc-700 dark:text-zinc-300">
          🎯 Recruiting — 採用マーケティング ダッシュボード
        </span>
      </nav>

      <header className="mb-6">
        <div className="text-xs font-medium tracking-wider text-zinc-500">
          Flaretech ・ メディアマーケティングユニット
        </div>
        <h1 className="mt-1 text-2xl font-semibold sm:text-3xl">
          採用マーケティング ― 状況ダッシュボード
        </h1>
        <p className="mt-2 max-w-3xl text-sm text-zinc-600 dark:text-zinc-400">
          Flaretech の採用マーケを「マーケティング × 顧客リテンション」の視点で整理した社内ワークスペース。
          このページは ① 現状の数字。上部ナビまたは下部カードから ② 市場の地図、③ 自社診断、④ 候補者体験、⑤ リテンション、分析レポート一覧 へ。
        </p>
      </header>

      {/* ═══════════════════════════════════════════════════════════════════
          Mission (クライアントから受け取ったブリーフ)
          ═══════════════════════════════════════════════════════════════ */}
      <MissionHero />

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
        <WeeklyTrend data={d.weekly} dataLong={d.weeklyLong} />
        <AiInsight insight={insights?.trend} />
      </section>

      <section className="mb-4">
        <h3 className="mb-3 text-sm font-semibold tracking-wide text-zinc-600 dark:text-zinc-400">
          媒体別 3週比較
        </h3>
        <PlatformTable platforms={d.platforms} total={d.total} />
        <AiInsight insight={insights?.platforms_insight} />
      </section>

      <section className="mb-10">
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
          次のセクションへの導線
          ═══════════════════════════════════════════════════════════════ */}
      <section className="mb-8 border-t border-zinc-200 pt-8 dark:border-zinc-800">
        <div className="mb-4">
          <p className="text-[11px] font-semibold uppercase tracking-widest text-rose-600 dark:text-rose-400">
            Next: deeper views
          </p>
          <h2 className="mt-0.5 text-xl font-semibold">
            数字の背後を読み解くフレームワーク
          </h2>
          <p className="mt-1 max-w-3xl text-sm text-zinc-600 dark:text-zinc-400">
            ①の数字を「なぜそうなっているのか」「次に何を動かすのか」で理解するための 4 セクション。
            各セクションは独立したページで、関連する分析レポートも同じページにインラインで並びます。
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          <SectionCard
            href="/market"
            number="②"
            titleEn="Know the landscape"
            title="市場の地図"
            description="2030 採用チャネル地図 + 評判×認知度バブル。競合とチャネル動向の中で Flaretech の立ち位置を相対的に見る。"
            preview={insights?.market?.next_move}
            analysisCount={marketA.length}
          />
          <SectionCard
            href="/diagnosis"
            number="③"
            titleEn="Diagnose our positioning"
            title="自社の位置づけ診断"
            description="採用の 7 つのワナ + 4 つの価値観スタイル + 企業イメージ 8 カテゴリチェック。価値観をどう伝え損ねているかを棚卸し。"
            preview={insights?.diagnosis?.next_move}
            analysisCount={diagA.length}
          />
          <SectionCard
            href="/experience"
            number="④"
            titleEn="Candidate experience & closing"
            title="候補者体験とクロージング"
            description="応募から内定承諾までの 8 ステージ CX スコアカード + 内定辞退 4 ドライバー。③の棚卸し結果がここで効く。"
            preview={insights?.experience?.next_move}
            analysisCount={expA.length}
          />
          <SectionCard
            href="/retention"
            number="⑤"
            titleEn="Retention lens"
            title="リテンションの視点"
            description="採用広報が育成・配置・評価・報酬・代謝 の 5 HR 課題に間接的に効く枠組み。企業イメージが解決の鍵。"
            preview={insights?.retention?.next_move}
            analysisCount={retA.length}
          />
          <SectionCard
            href="/analyses"
            number="🔍"
            titleEn="Deep-dive analyses"
            title="分析レポート一覧"
            description="日付ごとの詳細分析。特定の問いへの独立した回答集。各レポートは所属するセクションにも紐づきます。"
            analysisCount={analyses.length}
          />
        </div>
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
