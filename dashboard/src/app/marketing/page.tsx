import Link from "next/link";

export const metadata = {
  title: "📣 Marketing | Flaretech ダッシュボード",
};

export default function MarketingPage() {
  return (
    <main className="mx-auto max-w-5xl px-6 py-8 sm:py-10">
      <nav className="mb-6 flex flex-wrap items-center gap-2 border-b border-zinc-200 pb-4 text-xs text-zinc-600 dark:border-zinc-800 dark:text-zinc-400">
        <Link
          href="/"
          className="rounded-md border border-zinc-200 bg-white px-2.5 py-1 font-medium shadow-sm hover:border-zinc-300 hover:text-zinc-900 dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-zinc-700 dark:hover:text-zinc-100"
        >
          ← ホーム
        </Link>
        <span className="text-zinc-400">/</span>
        <span className="font-medium text-zinc-700 dark:text-zinc-300">
          📣 Marketing — マーケティング戦略ワークスペース
        </span>
      </nav>

      <header className="mb-8">
        <div className="text-xs font-medium tracking-wider text-zinc-500">
          Flaretech ・ Media Marketing Unit
        </div>
        <h1 className="mt-1 text-2xl font-semibold sm:text-3xl">
          マーケティング戦略ワークスペース
        </h1>
        <p className="mt-2 max-w-3xl text-sm text-zinc-600 dark:text-zinc-400">
          受託営業・AI 事業の市場開拓、メッセージング、媒体設計を扱う領域。
          現時点では枠だけ用意した状態。中身はこれから順次追加していく。
        </p>
      </header>

      <section className="mb-6 rounded-xl border border-amber-200 bg-amber-50/50 p-5 text-sm dark:border-amber-900/50 dark:bg-amber-950/20">
        <div className="flex items-start gap-3">
          <span className="text-2xl">🚧</span>
          <div>
            <div className="font-semibold text-amber-900 dark:text-amber-200">
              準備中
            </div>
            <p className="mt-1 text-xs text-amber-800 dark:text-amber-300">
              冨澤さんMTG（受託・AI事業）の壁打ちメモ、ReadyCrew 比率縮小プラン、
              LensAI のポジショニング案などを順次追加予定。
            </p>
          </div>
        </div>
      </section>

      <section className="mb-6">
        <h2 className="mb-3 text-sm font-semibold uppercase tracking-widest text-zinc-500">
          想定スコープ
        </h2>
        <ul className="space-y-3 text-sm text-zinc-700 dark:text-zinc-300">
          <ScopeItem
            title="受託営業のチャネル多様化"
            body="ReadyCrew 一辺倒からの脱却。直請け比率 50% 化を経営 KPI へ。冨澤さんからのオーダー。"
          />
          <ScopeItem
            title="AI 事業（LensAI 等）の市場ポジショニング"
            body="エンジニア評価 AI のブランド独立化判断。Phase2-3 の PF 化の核。"
          />
          <ScopeItem
            title="ブランディングと連携したメッセージ設計"
            body="ブランド領域で固めたコンセプトを、各チャネル（営業資料・展示会・ウェビナー・ホワイトペーパー）に翻訳する作業。"
          />
        </ul>
      </section>

      <footer className="border-t border-zinc-200 pt-6 text-xs text-zinc-500 dark:border-zinc-800">
        この領域の参照資料：
        <code className="ml-1 rounded bg-zinc-100 px-1.5 py-0.5 dark:bg-zinc-800">
          src/Meeting Transcript/
        </code>
        {" ・ MMU 関連シート"}
      </footer>
    </main>
  );
}

function ScopeItem({ title, body }: { title: string; body: string }) {
  return (
    <li className="rounded-lg border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900">
      <div className="font-medium text-zinc-900 dark:text-zinc-100">{title}</div>
      <div className="mt-1 text-xs text-zinc-600 dark:text-zinc-400">{body}</div>
    </li>
  );
}
