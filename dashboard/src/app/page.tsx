import Link from "next/link";

export const metadata = {
  title: "Flaretech メディアマーケティングユニット",
};

const CATEGORIES = [
  {
    href: "/recruiting",
    icon: "🎯",
    label: "Recruiting",
    titleJa: "採用",
    description:
      "採用活動の状況ダッシュボード。KPI、ファネル、媒体別、市場の地図、自社診断、候補者体験、リテンション、分析レポート一覧。",
    bullets: [
      "週次の応募数・通過数・承諾数（前週比）",
      "5セクション構成（市場 / 診断 / 体験 / 定着 / 分析）",
      "AI考察と分析レポートを各セクションにインライン表示",
    ],
    status: "稼働中",
    statusColor: "emerald" as const,
  },
  {
    href: "/branding",
    icon: "✨",
    label: "Branding",
    titleJa: "ブランディング",
    description:
      "FLARETECH のブランド戦略再設計の壁打ちメモ。高木さん MTG・既存ブランド戦略エクセル・AI 時代の市場動向を突き合わせ、3 つのブランドコンセプト案を提示。",
    bullets: [
      "サバイブからコバイブへ（組織思想）",
      "AI時代の最初の安全基地（個人成長／推奨）",
      "コーダーから、目利きへ（キャリア定義）",
    ],
    status: "壁打ち中",
    statusColor: "amber" as const,
  },
  {
    href: "/marketing",
    icon: "📣",
    label: "Marketing",
    titleJa: "マーケティング",
    description:
      "FLARETECH のマーケティング戦略ワークスペース。受託営業・AI 事業の市場開拓、メッセージング、媒体設計を扱う予定。",
    bullets: [
      "受託営業のチャネル多様化（ReadyCrew比率縮小）",
      "AI事業（LensAI 等）の市場ポジショニング",
      "ブランディングと連携したメッセージ設計",
    ],
    status: "準備中",
    statusColor: "zinc" as const,
  },
];

const STATUS_STYLES: Record<"emerald" | "amber" | "zinc", string> = {
  emerald:
    "bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300",
  amber: "bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-300",
  zinc: "bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400",
};

export default function Home() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-12 sm:py-16">
      <header className="mb-10">
        <div className="text-xs font-medium tracking-wider text-zinc-500">
          FLARETECH ・ Media Marketing Unit
        </div>
        <h1 className="mt-2 text-3xl font-semibold sm:text-4xl">
          ホーム
        </h1>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
          MMU（メディアマーケティングユニット）の社内ワークスペース。
          現在は 3 つの領域が並行で動いています。下記カードから入ってください。
        </p>
      </header>

      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {CATEGORIES.map((c) => (
          <Link
            key={c.href}
            href={c.href}
            className="group flex flex-col rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:border-rose-300 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-rose-700"
          >
            <div className="flex items-center justify-between">
              <span className="text-3xl">{c.icon}</span>
              <span
                className={`rounded-full px-2 py-0.5 text-[10px] font-semibold tracking-wider ${STATUS_STYLES[c.statusColor]}`}
              >
                {c.status}
              </span>
            </div>
            <div className="mt-4">
              <div className="text-[11px] font-semibold uppercase tracking-widest text-rose-600 dark:text-rose-400">
                {c.label}
              </div>
              <h2 className="mt-1 text-xl font-semibold text-zinc-900 dark:text-zinc-100">
                {c.titleJa}
              </h2>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
              {c.description}
            </p>
            <ul className="mt-4 space-y-1.5 text-xs text-zinc-500 dark:text-zinc-400">
              {c.bullets.map((b, i) => (
                <li key={i} className="flex gap-2">
                  <span className="mt-0.5 text-zinc-400">▸</span>
                  <span>{b}</span>
                </li>
              ))}
            </ul>
            <div className="mt-5 flex items-center gap-1 text-xs font-medium text-rose-600 transition group-hover:gap-2 dark:text-rose-400">
              開く
              <span aria-hidden>→</span>
            </div>
          </Link>
        ))}
      </div>

      <footer className="mt-12 border-t border-zinc-200 pt-6 text-xs text-zinc-500 dark:border-zinc-800">
        FLARETECH 株式会社 ・ MMU 社内ツール ・ Basic 認証で保護
      </footer>
    </main>
  );
}
