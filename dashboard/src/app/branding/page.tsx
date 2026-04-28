import Link from "next/link";
import { Panel } from "@/components/Panel";
import { SectionHeading } from "@/components/SectionHeading";

export const metadata = {
  title: "ブランディング戦略 | Flaretech 採用ダッシュボード",
};

export default function BrandingPage() {
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
          ✨ ブランディング戦略 — AI時代の再設計メモ
        </span>
      </nav>

      <header className="mb-2">
        <div className="text-xs font-medium tracking-wider text-zinc-500">
          Flaretech ・ ブランディング思考メモ
        </div>
        <h1 className="mt-1 text-2xl font-semibold sm:text-3xl">
          AI時代のFLARETECHブランド ― 「サバイブからコバイブへ」の再設計
        </h1>
        <p className="mt-2 max-w-3xl text-sm text-zinc-600 dark:text-zinc-400">
          2026-04-27 高木さんMTG ／ 既存ブランディング戦略エクセル ／ AI時代の市場動向。
          この3つを突き合わせて、FLARETECHのブランド方向性を再設計するための壁打ちメモ。
          まだ「決定」ではなく「議論用たたき台」。次回MTGまでに高木さんと擦り合わせる前段階の整理。
        </p>
      </header>

      <SectionHeading
        step="① インプット整理"
        title="3 sources of truth"
        description="今回のブランド再設計は、3つの独立した情報源を突き合わせることで成立する。"
      />

      <section className="mt-4 mb-4 grid gap-4 md:grid-cols-3">
        <SourceCard
          tag="MTG"
          tagColor="rose"
          title="高木さんMTG（2026-04-27）"
          bullets={[
            "媒体選定の前にブランド軸×ペルソナを1〜2ヶ月で固めたい",
            "差別化軸＝「エンジニアのキャリア構築」（過去6年で300〜400人を未経験〜半人前から年収400〜500万のPGへ。アクセンチュア・アビーム・価格.comへの転出実績）",
            "今の追い風＝AIでマークアッパー／Web制作壊滅 → キャリア迷子市場が拡大",
            "直近の採用優先＝AIエンジニア（今日決まったばかり）",
            "順番指示＝① FLARETECH 100%理解 → ② ペルソナ → ③ 媒体",
          ]}
        />
        <SourceCard
          tag="DOC"
          tagColor="indigo"
          title="既存ブランディング戦略エクセル（47シート・2026-03作成）"
          bullets={[
            "核メッセージ＝「SES企業というラベルを剥がす」",
            "Phase1（1-3年）SES最大化 / Phase2（3-7年）エンジニア経済圏 / Phase3（10年〜）HR×AI PF",
            "26軸＋4横串。Tier S（即並列着手）に10項目",
            "[採用企画]シートに既に3層ペルソナ済み — 全部「PM／上流／AI」が共通キーワード",
            "資産シート＝[課題・ペイン]102件 ／ [エンジニアインタビュー]30+件 ／ [エンジニア目標]30+人分の生声",
          ]}
        />
        <SourceCard
          tag="EXT"
          tagColor="amber"
          title="AI時代の市場動向（外部知見の集約）"
          bullets={[
            "コーディングタスクは年内に大半が自動化方向。エントリージョブのエンジニア職は構造的に縮小",
            "コーディング生産性は数十倍化進行中。1人で全機能を作る個人開発者層（1人ユニコーン）が急増",
            "AI＝能力の再分配（誰でもサービス作れる）／ ただし『使い倒せる人』と『消費する人』のレバレッジ格差は拡大",
            "組織モデル：サバイブ型（管理・命令）→ コバイブ型（環境設計と縁の超立）",
            "求められるリーダー像＝鑑識者／場が分かる人（コーダーではない）",
            "個人の競争力＝『ご縁』（深い関係性）と『独自性』。匿名で代替可能な労働は値崩れ",
          ]}
        />
      </section>

      <SectionHeading
        step="② 3視点を突き合わせて見えた論点"
        title="The collision of three views"
        description="高木さんは未来を見ているが言葉は過去5年の成功体験に縛られている。エクセル作成者は無意識に未来を向いている。AI時代の市場動向が両者の中間を埋める。"
      />

      <section className="mt-4 mb-4">
        <Panel
          title="Takagi路線が失効するポイント（厳しめ）"
          subtitle="高木さんが口頭で語った戦略を、AI時代の前提で疑う。否定ではなく『未来形にアップデートする必要』の指摘。"
        >
          <CompareTable
            rows={[
              {
                left: "「500→1000→1万人」のスケール目標",
                right:
                  "コーディング職が今年消える前提だと、頭数戦略は時代逆行。SHIFT/Sky型の1万人サバイブ組織を真似るのは20世紀モデル。",
              },
              {
                left: "「未経験PGを年収500万に育てた成功事例」",
                right:
                  "その職種自体がAI自動化で構造的に縮小していく。過去5年の物語は未来5年では再現できない。",
              },
              {
                left: "「AIエンジニア採用したい」（月15→20名育成）",
                right:
                  "意図は正しいが、月15→20名を育成する量的モデルは崩壊する。1人ユニコーン化できる人は会社に縛られない。",
              },
              {
                left: "「キャリア構築の会社」という看板",
                right:
                  "看板はOK。ただし『何への構築か』の中身が、HTML→Java から PG→目利き／PM／AI指揮官 へ書き換え必要。",
              },
            ]}
            leftHeader="高木さんの主張"
            rightHeader="AI時代視点での問題"
            tone="warning"
          />
        </Panel>
      </section>

      <section className="mb-6">
        <Panel
          title="一方で、FLARETECHの既存資産がAI時代視点で輝き出すポイント"
          subtitle="同じ会社・同じ事実が、フレームを変えると一気に唯一無二の差別化資産になる。"
        >
          <CompareTable
            rows={[
              {
                left: "14ヶ国・47都道府県・フルリモート",
                right:
                  "コバイブ型組織のロールモデル。SHIFT/Skyの集中型・管理型と真逆＝唯一無二の差別化。",
              },
              {
                left:
                  "畠山さんのテックブログ／社内ブログ／ハッカソン／AI駆動開発勉強会（阿久根さん談）",
                right:
                  "「ご縁が生まれる場」そのもの。意味は活動の後から生まれるという原則の実例。",
              },
              {
                left: "営業がエンジニアのキャリアを誇りに思う文化",
                right:
                  "「目利き」型営業組織。『案件アサイン』でなく『縁を見立てる』役割に再定義可能。",
              },
              {
                left: "高木さんの「シングルマザーが涙ぐんだ」エピソード",
                right:
                  "まさに『ご縁』の物語。高木さん自身が無意識に新時代の言葉を持っている。",
              },
              {
                left: "エンジニアDB戦略（Phase2: 10万人）",
                right:
                  "1人ユニコーン化する人を最初に支え、独立後もご縁が続くプラットフォーム＝完全に新時代モデル。",
              },
            ]}
            leftHeader="既存資産"
            rightHeader="AI時代視点での再評価"
            tone="positive"
          />
        </Panel>
      </section>

      <SectionHeading
        step="③ ブランドコンセプト3案"
        title="Three candidate brand concepts"
        description="Takagiさんの言葉「キャリア構築」「500人体制」は残しつつ、中身を全部書き換える。製品ポジショニングはそのままに、ターゲットとプロミスを再定義する。"
      />

      <section className="mt-4 mb-4 grid gap-4 lg:grid-cols-3">
        <ConceptCard
          letter="A"
          headline="サバイブからコバイブへ"
          subtitle="組織思想で勝負"
          recommended={false}
          body={[
            "1万人のサバイブ型SES（Sky/SHIFT）ではなく、200人のコバイブ型テックカンパニー。",
            "ターゲット：管理されたくない・けど一人でやりたくない・ご縁を求めるエンジニア。",
            "数値目標は変わってOK（500人でも、その500人が『コバイブ型』なら独自）。",
          ]}
        />
        <ConceptCard
          letter="B"
          headline="AI時代の、最初の安全基地"
          subtitle="個人成長で勝負（推奨）"
          recommended={true}
          body={[
            "1人ユニコーン化を目指す人の最初の停泊地・伴走者。",
            "「FLARETECHを卒業して独立する人」もブランドの一部にする（アルムナイをDB戦略の中核に）。",
            "高木さんの『アクセンチュアに転出した卒業生』の物語が、まさにこの形。",
            "500人スケール目標も「500人のコア＋5000人のアルムナイDB」に再解釈可能。",
          ]}
        />
        <ConceptCard
          letter="C"
          headline="コーダーから、目利きへ"
          subtitle="キャリア定義で勝負"
          recommended={false}
          body={[
            "AIに殺されないキャリア＝目利き力・場の感覚・ご縁を作る力（味が分かる・場が分かる・人を見立てられる）。",
            "Takagiさんが言う「キャリア構築」の新しい中身として提案できる。",
            "エクセルの3ペルソナ（PM軸）と整合的に拡張可能。",
          ]}
        />
      </section>

      {/* Link to detailed persona research */}
      <section className="mb-8">
        <Link
          href="/branding/personas"
          className="group flex flex-col items-start gap-3 rounded-xl border-2 border-dashed border-rose-300 bg-rose-50/30 p-5 transition hover:border-rose-500 hover:bg-rose-50 dark:border-rose-800 dark:bg-rose-950/10 dark:hover:border-rose-600 dark:hover:bg-rose-950/20 sm:flex-row sm:items-center"
        >
          <span className="text-3xl">🧭</span>
          <div className="flex-1">
            <div className="text-[11px] font-semibold uppercase tracking-widest text-rose-600 dark:text-rose-400">
              関連リサーチ
            </div>
            <div className="mt-0.5 text-base font-semibold text-zinc-900 dark:text-zinc-100">
              ペルソナ市場調査 — AI時代の中途採用ターゲット予測
            </div>
            <div className="mt-1 text-xs text-zinc-600 dark:text-zinc-400">
              ③のコンセプトを誰に当てるかの一次調査。職業変動マップ・人口動態・時間軸予測（現在/+2/+6/+12年）・6 ペルソナ・媒体マトリクスを公的統計と業界レポートから構造化（出典40+件）。
            </div>
          </div>
          <span className="shrink-0 text-sm font-medium text-rose-600 transition group-hover:translate-x-0.5 dark:text-rose-400">
            開く →
          </span>
        </Link>
      </section>

      <footer className="border-t border-zinc-200 pt-6 text-xs text-zinc-500 dark:border-zinc-800">
        参照：
        <code className="rounded bg-zinc-100 px-1.5 py-0.5 dark:bg-zinc-800">
          Branding/02.ブランド・マーケ.xlsx
        </code>
        {" / "}
        <code className="rounded bg-zinc-100 px-1.5 py-0.5 dark:bg-zinc-800">
          src/Meeting Transcript/20260427.txt
        </code>
        {" / "}
        <code className="rounded bg-zinc-100 px-1.5 py-0.5 dark:bg-zinc-800">
          AI時代の市場動向に関する外部知見
        </code>
        {" ・ 議論用たたき台（決定事項ではない）"}
      </footer>
    </main>
  );
}

function SourceCard({
  tag,
  tagColor,
  title,
  bullets,
}: {
  tag: string;
  tagColor: "rose" | "indigo" | "amber";
  title: string;
  bullets: string[];
}) {
  const colorMap = {
    rose: "bg-rose-50 text-rose-700 dark:bg-rose-950 dark:text-rose-300",
    indigo:
      "bg-indigo-50 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300",
    amber: "bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-300",
  };
  return (
    <div className="flex flex-col rounded-xl border border-zinc-200 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
      <span
        className={`mb-2 inline-flex w-fit rounded-full px-2 py-0.5 text-[10px] font-semibold tracking-wider ${colorMap[tagColor]}`}
      >
        {tag}
      </span>
      <h3 className="text-sm font-semibold leading-snug">{title}</h3>
      <ul className="mt-3 space-y-1.5 text-xs leading-relaxed text-zinc-600 dark:text-zinc-400">
        {bullets.map((b, i) => (
          <li key={i} className="flex gap-2">
            <span className="mt-0.5 text-zinc-400">▸</span>
            <span>{b}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function CompareTable({
  rows,
  leftHeader,
  rightHeader,
  tone,
}: {
  rows: { left: string; right: string }[];
  leftHeader: string;
  rightHeader: string;
  tone: "warning" | "positive";
}) {
  const rightColor =
    tone === "warning"
      ? "bg-rose-50/40 dark:bg-rose-950/20"
      : "bg-emerald-50/40 dark:bg-emerald-950/20";
  const rightHeaderColor =
    tone === "warning"
      ? "text-rose-700 dark:text-rose-300"
      : "text-emerald-700 dark:text-emerald-300";

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-separate border-spacing-0 text-sm">
        <thead>
          <tr className="text-left text-[11px] font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
            <th className="border-b border-zinc-200 pb-2 pr-4 align-bottom dark:border-zinc-800">
              {leftHeader}
            </th>
            <th
              className={`border-b border-zinc-200 pb-2 pl-4 align-bottom dark:border-zinc-800 ${rightHeaderColor}`}
            >
              {rightHeader}
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i} className="align-top">
              <td className="border-b border-zinc-100 py-3 pr-4 text-zinc-700 dark:border-zinc-800 dark:text-zinc-300">
                {r.left}
              </td>
              <td
                className={`border-b border-zinc-100 py-3 pl-4 text-zinc-700 dark:border-zinc-800 dark:text-zinc-300 ${rightColor}`}
              >
                {r.right}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function ConceptCard({
  letter,
  headline,
  subtitle,
  recommended,
  body,
}: {
  letter: string;
  headline: string;
  subtitle: string;
  recommended: boolean;
  body: string[];
}) {
  return (
    <div
      className={`relative flex flex-col rounded-xl border p-5 shadow-sm ${
        recommended
          ? "border-rose-300 bg-rose-50/40 dark:border-rose-700 dark:bg-rose-950/20"
          : "border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900"
      }`}
    >
      {recommended && (
        <span className="absolute right-4 top-4 rounded-full bg-rose-600 px-2 py-0.5 text-[10px] font-semibold tracking-wider text-white">
          PICK
        </span>
      )}
      <div className="flex items-baseline gap-3">
        <span
          className={`text-3xl font-bold ${
            recommended
              ? "text-rose-600 dark:text-rose-400"
              : "text-zinc-300 dark:text-zinc-700"
          }`}
        >
          案{letter}
        </span>
      </div>
      <h3 className="mt-2 text-base font-semibold leading-snug">{headline}</h3>
      <p className="mt-1 text-[11px] font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
        {subtitle}
      </p>
      <ul className="mt-3 space-y-2 text-xs leading-relaxed text-zinc-700 dark:text-zinc-300">
        {body.map((b, i) => (
          <li key={i} className="flex gap-2">
            <span className="mt-0.5 text-zinc-400">▸</span>
            <span>{b}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

