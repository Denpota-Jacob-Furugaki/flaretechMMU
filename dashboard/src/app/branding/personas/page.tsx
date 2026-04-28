import Link from "next/link";
import { Panel } from "@/components/Panel";
import { SectionHeading } from "@/components/SectionHeading";

export const metadata = {
  title: "ペルソナ市場調査 | Flaretech ブランディング",
};

export default function PersonasPage() {
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
        <Link
          href="/branding"
          className="rounded-md border border-zinc-200 bg-white px-2.5 py-1 font-medium shadow-sm hover:border-zinc-300 hover:text-zinc-900 dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-zinc-700 dark:hover:text-zinc-100"
        >
          ✨ Branding
        </Link>
        <span className="text-zinc-400">/</span>
        <span className="font-medium text-zinc-700 dark:text-zinc-300">
          🧭 ペルソナ市場調査 — AI時代の中途採用ターゲット予測
        </span>
      </nav>

      <header className="mb-2">
        <div className="text-xs font-medium tracking-wider text-zinc-500">
          Flaretech ・ ペルソナ調査メモ（2026-04-28）
        </div>
        <h1 className="mt-1 text-2xl font-semibold sm:text-3xl">
          AI時代の日本労働市場・職業変動マップから導く採用ターゲット再設計
        </h1>
        <p className="mt-2 max-w-3xl text-sm text-zinc-600 dark:text-zinc-400">
          FLARETECH が 現在 / +2年 / +6年 / +12年 の各時点で狙うべき中途人材プールを、
          公的統計（経産省・IPA・JEITA・JILPT）／業界レポート（TDB・パーソル・リクルートワークス）／
          国際機関（WEF・OECD）の一次資料から構造化。6 ペルソナと媒体マトリクスを提示。
        </p>
      </header>

      {/* Executive Summary */}
      <section className="mt-6 mb-8 rounded-xl border border-rose-200 bg-rose-50/50 p-5 dark:border-rose-900/50 dark:bg-rose-950/20">
        <div className="text-[11px] font-semibold uppercase tracking-widest text-rose-600 dark:text-rose-400">
          Executive Summary
        </div>
        <p className="mt-2 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
          日本のIT人材市場は<strong>「全体としては慢性的な不足」と「従来型は余剰」</strong>の二極化が進行中。
          経産省試算で2030年に最大 <strong>79万人不足</strong>、内訳は<strong>先端IT 55万人不足／従来型 10万人余剰</strong>。
          一方で2024年度ソフトウェア業倒産は <strong>220件・過去10年最多</strong>、サービス業（広告・調査・情報サービス含む）は
          <strong> 871件・2000年度以降最多</strong>。Web制作・コーダー・WordPress屋・基礎事務といった
          <strong>「デジタル下流工程」の職を失う人</strong>が今後数年で大量に転職市場へ流れてくる。
          FLARETECHの「未経験を年収400〜500万PG／PMに育てる」モデルは、
          <strong>+2〜6年のスパンで好機</strong>。ただし<strong>+12年では新卒が直接AI人材化する</strong>ことで
          中途育成モデルの相対価値が低下する構造変化が控える。
        </p>
      </section>

      {/* Section 2 */}
      <SectionHeading
        step="① AI時代の職業変動マップ（日本市場）"
        title="Job market reshaping under AI"
        description="どの職種が縮小し、どの職種が拡大しているか。FLARETECH ペルソナの上流（流入元）と下流（育成先キャリア）を定義する。"
      />

      <section className="mt-4 mb-4 grid gap-4 lg:grid-cols-2">
        <Panel
          title="縮小・消滅していく職種（流入元）"
          subtitle="生成AI／ノーコード／RPA で代替が進む。FLARETECH が中途人材を吸い上げる主要プール。"
        >
          <ul className="space-y-3 text-sm">
            <JobItem
              name="WordPress構築・基礎コーダー・マークアップエンジニア"
              detail="平均年収 300〜500万円、IT通信業界平均 600万円との乖離が拡大。「将来的に職種そのものがなくなる」と複数業界媒体が言及。"
              tone="down"
            />
            <JobItem
              name="Webデザイナー（バナー・LP・SNS制作中心の中堅層）"
              detail="女性比率 約60%。生成AI利用経験率は 2023年3月3.4% → 2025年3月 27.0% へ急増。AI活用組と非活用組で二極化。"
              tone="down"
            />
            <JobItem
              name="一般事務・経理事務・データ入力"
              detail="2025年は『AIエージェント元年』。先行導入企業で業務処理速度3.8倍・エラー削減92.4%。経理AI導入企業は16%が純減、84%が配置転換 → ジリジリと希望退職へ。"
              tone="down"
            />
            <JobItem
              name="Web制作会社の営業・ディレクター層"
              detail="クライアント側がAIで内製化。2024年度サービス業倒産2,638件・最多のうち、広告・調査・情報サービス871件。"
              tone="down"
            />
            <JobItem
              name="基礎ライター・SEO量産記事執筆者"
              detail="LLMで量産可能。クラウドソーシング単価が大幅下落。"
              tone="down"
            />
            <JobItem
              name="ソフトウェア下請け（10人未満）"
              detail="2024年度ソフトウェア業倒産220件・過去10年最多。従業員10人未満が8割超。"
              tone="down"
            />
          </ul>
        </Panel>

        <Panel
          title="拡大していく職種（育成先・キャリアゴール）"
          subtitle="生成AI実装・DX推進・AI×ドメインの三本柱。FLARETECHのキャリア構築の出口。"
        >
          <ul className="space-y-3 text-sm">
            <JobItem
              name="AI／MLエンジニア・AIアプリ実装者"
              detail="経産省試算で先端IT人材は2030年に約55万人不足。AIスキル保有者は平均56%の賃金プレミアム（PwC）。"
              tone="up"
            />
            <JobItem
              name="データサイエンティスト／ビジネスアーキテクト"
              detail="IPA『DX動向2025』で85.1%の日本企業がDX人材不足、米独より顕著。"
              tone="up"
            />
            <JobItem
              name="プロジェクトマネージャー（PM）／プロダクトマネージャー（PdM）"
              detail="AIで実装コストが下がる分、要件定義・調整の価値が相対的に上昇。SES業界PM平均年収 約891万円。"
              tone="up"
            />
            <JobItem
              name="セキュリティ・クラウドアーキテクト"
              detail="WEF『Future of Jobs 2025』でセキュリティ管理スペシャリストがトップ5。"
              tone="up"
            />
            <JobItem
              name="AI×ドメイン人材（医療・金融・物流・建設）"
              detail="リクルートワークス研究所『未来予測2040』：物流・建設・介護で2030年に341万人、2040年に1,100万人の労働供給不足。"
              tone="up"
            />
          </ul>
        </Panel>
      </section>

      <section className="mb-8">
        <Panel
          title="マクロ需給ギャップ（2030年）"
          subtitle="数字の不足ではなく、質的ミスマッチが本質。FLARETECH は『従来型 → 先端型』へのブリッジ供給に位置取るべき。"
        >
          <div className="grid gap-4 md:grid-cols-3">
            <StatBox
              label="経産省試算（高位）"
              value="79万人"
              sub="IT人材不足（2030年）"
            />
            <StatBox
              label="うち先端IT人材"
              value="55万人不足"
              sub="生成AI／クラウド／データ"
            />
            <StatBox
              label="うち従来型IT人材"
              value="10万人余剰"
              sub="基礎コーダー・運用保守"
            />
          </div>
        </Panel>
      </section>

      {/* Section 3 — Demographics */}
      <SectionHeading
        step="② 縮小職種の人口動態：誰が職を失うのか"
        title="Who is being displaced"
        description="年齢・性別・地域・前職年収で見た、FLARETECHが採用しうる人材プールの輪郭。"
      />

      <section className="mt-4 mb-4 grid gap-4 lg:grid-cols-2">
        <Panel
          title="Web制作・コーダー・WordPress領域"
          subtitle="女性比率約60%・地方分散・育児中比率が高い。FLARETECHの最有力プール。"
        >
          <DemographicTable
            rows={[
              { k: "年齢層", v: "中核28〜45歳。20代後半フリーランス層と30代ママ復帰層の二大群" },
              { k: "性別比", v: "女性比率約60%（男 38.6% / 女 61.4%）" },
              { k: "地域", v: "東京23区＋関東郊外＋地方都市の3層。フルリモート化で地方人材増加" },
              { k: "前職年収", v: "300〜500万円帯。コーダー・WordPress 屋ともに約350万円中心" },
              { k: "子育て・介護", v: "子育て世代女性の比率が高い。シングルマザー層も顕著" },
              { k: "学歴・資格", v: "専門学校・美大・文系大卒が多い。情報系大卒は少数" },
              { k: "AI耐性", v: "PHP・JS基礎はあるがロジック構築力／英語力は限定的" },
            ]}
          />
        </Panel>

        <Panel
          title="事務職・経理事務 ／ ソフトウェア下請け"
          subtitle="即失業より「ジリジリと配置転換 → 希望退職」のパターン。下請けPGは30代男性が中心。"
        >
          <div className="space-y-4 text-sm">
            <div>
              <div className="font-medium text-zinc-900 dark:text-zinc-100">
                事務職・経理事務（女性中心）
              </div>
              <ul className="mt-2 space-y-1 text-xs text-zinc-600 dark:text-zinc-400">
                <li>▸ 経理AI／RPA導入企業の <strong>16%が純減・84%が配置転換</strong>（即失業より緩やかな希望退職パターン）</li>
                <li>▸ 一般事務は20代女性で代替リスク最大。<strong>20〜24歳若年失業率 9.3%（2025年8月）</strong>に上昇</li>
                <li>▸ 地域分布は全国均等（事務職は都市部に偏らない）</li>
              </ul>
            </div>
            <div className="border-t border-zinc-200 pt-3 dark:border-zinc-800">
              <div className="font-medium text-zinc-900 dark:text-zinc-100">
                ソフトウェア下請け・SES下層
              </div>
              <ul className="mt-2 space-y-1 text-xs text-zinc-600 dark:text-zinc-400">
                <li>▸ 2024年度ソフトウェア業倒産 <strong>220件</strong>、従業員10人未満が <strong>8割超</strong></li>
                <li>▸ 情報サービス業の正社員不足感 <strong>72.2%（全業種トップ）</strong>。月所定内給与 37.4万円 vs 全業種 26.2万円</li>
                <li>▸ 倒産企業からの離職エンジニア＝<strong>「実務経験はあるが下請けPGどまり」の30代層</strong>が FLARETECH の主要候補</li>
              </ul>
            </div>
            <div className="border-t border-zinc-200 pt-3 dark:border-zinc-800">
              <div className="font-medium text-zinc-900 dark:text-zinc-100">
                Web制作会社（情報サービス業全体）
              </div>
              <ul className="mt-2 space-y-1 text-xs text-zinc-600 dark:text-zinc-400">
                <li>▸ 2024年度サービス業倒産 <strong>2,638件・2000年度以降最多</strong></li>
                <li>▸ うち広告・調査・情報サービスが <strong>871件・最多</strong></li>
                <li>▸ 流出人材プール：Web制作会社の元社員（コーダー／デザイナー／ディレクター／営業）<strong>数千人規模</strong>が市場へ</li>
              </ul>
            </div>
          </div>
        </Panel>
      </section>

      {/* Section 4 — Time horizons */}
      <SectionHeading
        step="③ 時間軸予測（現在 / +2年 / +6年 / +12年）"
        title="Talent pool over time"
        description="各時点で『中途プール』『FLARETECHが育成可能な比率』『競合度』『新卒との重なり』『地方人材優位性』がどう変わるか。"
      />

      <section className="mt-4 mb-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <TimeHorizonCard
          when="現在 (2026)"
          headline="プール形成期"
          highlight={false}
          rows={[
            { k: "中途プール", v: "数十万人オーダー（Web制作倒産＋RPA代替＋廃業の累積）" },
            { k: "育成可能率", v: "プールの 5〜15%（基礎・継続学習・客先常駐受容のフィルタ後）" },
            { k: "競合度", v: "SHIFT年2,500人・テクノプロ2.5万人規模・メイテック8千人規模が同じ層を狙う" },
            { k: "新卒との重なり", v: "26卒の66.6%が就活でAI使用。AI志向新卒は外資・自社開発・スタートアップへ" },
            { k: "地方人材優位性", v: "フルリモート求人微減で『地方在住前提でフルリモート可』企業の希少性UP" },
          ]}
        />
        <TimeHorizonCard
          when="+2年 (2028)"
          headline="競合激化期"
          highlight={true}
          rows={[
            { k: "中途プール", v: "更に拡大。Web制作倒産トレンド継続＋大手SIer下請けPG層リストラ本格化" },
            { k: "育成可能率", v: "横ばい〜微減。『AIで自走できる人』と『置いていかれる人』の二極化が個人レベルで顕在化" },
            { k: "競合度", v: "SHIFT・SCSK・NTTデータ群がジョブ型・リスキル採用を強化。主婦・地方市場で競合激化" },
            { k: "新卒との重なり", v: "新卒AI人材は引き続き上位企業集中。FLARETECHの中途モデルは『育成できないところを担う』ポジ" },
            { k: "地方人材優位性", v: "継続して優位（オフィス回帰あるが、地方の絶対供給力で東京賃金が取れる）" },
          ]}
        />
        <TimeHorizonCard
          when="+6年 (2032)"
          headline="構造変化ピーク"
          highlight={false}
          rows={[
            { k: "中途プール", v: "事務職・コーダー削減が累積。『不足職種（介護・物流・建設）』と『過剰職種（事務・基礎IT）』のミスマッチ鮮明" },
            { k: "育成可能率", v: "プログラミングそのものより『AIエージェントを指揮するPM／PdM／プロンプトアーキテクト』育成にシフト必須" },
            { k: "競合度", v: "教育系・リスキル系も同層を狙う。FLARETECH の差別化＝『就業先までの動線』" },
            { k: "新卒との重なり", v: "26〜30卒がプロパー化、『AIネイティブ新卒 vs 中途リスキル組』の評価軸ぶつかり" },
            { k: "地方人材優位性", v: "地方が『主』になる可能性。フルリモート堅持企業の希少化 → FLARETECH の最大の差別化資産に" },
          ]}
        />
        <TimeHorizonCard
          when="+12年 (2038)"
          headline="業態転換期"
          highlight={false}
          rows={[
            { k: "中途プール", v: "IT領域は『AIに指示を出せる人＋AIで代替できないドメイン専門家』のみ生き残る" },
            { k: "育成可能率", v: "『育てる』モデル自体が陳腐化リスク。FLARETECH は『AI×ドメイン人材プラットフォーム』へ業態転換が必要" },
            { k: "競合度", v: "大手SIer解体・SES業界再編。残るのは『育成資産＋ドメイン特化＋多国籍人材ネットワーク』を持つ企業" },
            { k: "新卒との重なり", v: "中途と新卒の境界が消失（リスキル前提社会）。年齢ではなく『AI習熟度×ドメイン専門度』で評価" },
            { k: "地方人材優位性", v: "全国＝1つの労働市場。FLARETECH の『47都道府県・14ヶ国』資産がブランド化" },
          ]}
        />
      </section>

      {/* Section 5 — Personas */}
      <SectionHeading
        step="④ FLARETECH ペルソナ示唆（6タイプ）"
        title="Six target personas"
        description="既存の『ポテンシャル／一般／優秀』3層を、AI時代の『前職の構造と動機』で再分類。"
      />

      <section className="mt-4 mb-4 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <PersonaCard
          n={1}
          color="rose"
          name="佐藤 美咲（仮名）"
          tag="Web制作難民・ママコーダー"
          demo="34歳・女性・神奈川県郊外（横浜市緑区）"
          prev="元Web制作会社マークアップエンジニア → 2022年から在宅フリーランス"
          fear="単価が半年で3割減。案件激減。2歳の子供がいて保育園送迎＋4時間集中作業が限界"
          want="会社員に戻りたい。だがフルリモートは譲れない。年収400〜500万でいい"
          hook="フルリモート堅持＋PG→PM育成パス＋14ヶ国多様性（女性が浮かない文化）"
          goal="3〜5年でフロントエンド→React/Next.js→PMアシスタント→PM"
          media="SHElikes・Famm卒業生・mog career・Wantedly『フルリモート』『主婦歓迎』・Re:mama"
        />
        <PersonaCard
          n={2}
          color="indigo"
          name="田中 健太（仮名）"
          tag="倒産Web制作会社のディレクター→PM転身"
          demo="38歳・男性・東京23区"
          prev="元中堅Web制作会社ディレクター（クライアント対応＋WordPress運用）。2024年に会社が倒産し失業"
          fear="年齢・PMスキルはあるがコードは書けない。SES下層に行きたくない"
          want="上流PMポジションがほしい。年収500〜700万"
          hook="PM中心の育成パス＋直請け案件比率（AI実装支援等）"
          goal="PMアシスタント→PM→AI実装プロジェクトのPdM"
          media="Green・Findy（ハイクラス）・転職会議／OpenWork経由スカウト・LinkedIn"
        />
        <PersonaCard
          n={3}
          color="amber"
          name="山田 花子（仮名）"
          tag="事務職RPA難民"
          demo="31歳・女性・福岡市"
          prev="中堅商社の経理事務（年収380万・5年勤続）。経理AI導入で業務縮小、退職勧奨気味の配置転換を経て退職検討中"
          fear="このままだと事務職の道が細る。AIに置き換えられない仕事に行きたい"
          want="未経験からエンジニアへ。地方在住のままがいい"
          hook="フルリモート＋未経験育成6年実績＋年収維持（400万スタート）"
          goal="QAエンジニア→テスト自動化（Pythonスキル）→DevOps補助"
          media="主婦・ママ向けスクール提携（Famm／Re:mama／SHElikes）・Wantedly・地元エージェント（パーソル福岡支店等）"
        />
        <PersonaCard
          n={4}
          color="emerald"
          name="鈴木 翔（仮名）"
          tag="下請けPGからの脱出組"
          demo="29歳・男性・埼玉県"
          prev="中堅SIer3次請けで5年PG経験（Java／PHP）。倒産はしていないが将来性に不安"
          fear="PGの自分はAIに勝てない。生成AIで自分の仕事が消える恐怖"
          want="上流工程＋AI領域へジャンプアップ"
          hook="多国籍環境（英語学習機会）・PM／AI実装PdMへのキャリア梯子"
          goal="AI実装エンジニア→AI PdM→海外案件PM"
          media="Findy（GitHub解析でスキル可視化）・Forkwell・QiitaJobs・X（旧Twitter）スカウト"
        />
        <PersonaCard
          n={5}
          color="cyan"
          name="李 麗（仮名）"
          tag="在留外国人リスキル組"
          demo="27歳・女性・中国出身・東京23区"
          prev="日本語学校卒→Web制作会社1.5年（コーダー）→倒産で失業"
          fear="日本語ビジネスレベル、英語ネイティブ近、技術は中位。日本企業の閉鎖性に疲れている"
          want="多国籍チームで働きたい、技術を伸ばしたい"
          hook="14ヶ国出身者在籍は強烈な訴求。日本企業の中で『日本語ネイティブ前提』でない数少ない選択肢"
          goal="海外クライアント担当→グローバルAI実装PM"
          media="Daijob・GaijinPot・Wantedly英語版・留学生向けエージェント（ASIA to JAPAN等）・LinkedIn日本支社"
        />
        <PersonaCard
          n={6}
          color="violet"
          name="高橋 雄一（仮名）"
          tag="45歳・キャリアチェンジャー（地方版）"
          demo="45歳・男性・鹿児島県"
          prev="元地銀のシステム企画（業務系COBOL／パッケージSE的経験15年）。早期退職募集に応募し失業"
          fear="45歳で年収400万に下げてでもエンジニアを続けたい。地方でフルリモートできる先がない"
          want="地方在住でAI×金融ドメインを活かせる場"
          hook="47都道府県在籍＋フルリモート堅持＋ドメイン経験を生かすPM／BAポジション"
          goal="金融AI実装PM／業務アーキテクト"
          media="ミドル特化（FROM40・ミドルの転職）・地方特化（リジョブ・地方創生系）・地銀OB／OGネットワーク・リファラル"
        />
      </section>

      {/* Section 6 — Media matrix */}
      <SectionHeading
        step="⑤ 媒体・チャネル示唆"
        title="Media x persona matrix"
        description="6 ペルソナ × 9 媒体カテゴリのマッチング。投資の優先順位は『第一波：Wantedly＋主婦/ママ系』『第二波：Findy/Green＋外国人系』『第三波：地方UI ターン＋リファラル』。"
      />

      <section className="mt-4 mb-4">
        <Panel
          title="ペルソナ別 推奨媒体マトリクス"
          subtitle="◎=最優先 ／ ○=有効 ／ △=補助 ／ ×=合わない"
        >
          <div className="overflow-x-auto">
            <table className="w-full border-separate border-spacing-0 text-xs">
              <thead>
                <tr className="text-left text-[10px] font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                  <th className="border-b border-zinc-200 pb-2 pr-3 text-left dark:border-zinc-800">媒体</th>
                  <th className="border-b border-zinc-200 px-2 pb-2 text-center dark:border-zinc-800">P1<br/>ママ</th>
                  <th className="border-b border-zinc-200 px-2 pb-2 text-center dark:border-zinc-800">P2<br/>ディレクター</th>
                  <th className="border-b border-zinc-200 px-2 pb-2 text-center dark:border-zinc-800">P3<br/>事務職</th>
                  <th className="border-b border-zinc-200 px-2 pb-2 text-center dark:border-zinc-800">P4<br/>下請PG</th>
                  <th className="border-b border-zinc-200 px-2 pb-2 text-center dark:border-zinc-800">P5<br/>外国人</th>
                  <th className="border-b border-zinc-200 px-2 pb-2 text-center dark:border-zinc-800">P6<br/>ミドル</th>
                </tr>
              </thead>
              <tbody>
                {MEDIA_MATRIX.map((row) => (
                  <tr key={row.media} className="align-middle">
                    <td className="border-b border-zinc-100 py-2 pr-3 font-medium text-zinc-700 dark:border-zinc-800 dark:text-zinc-300">
                      {row.media}
                    </td>
                    {row.scores.map((s, i) => (
                      <td
                        key={i}
                        className={`border-b border-zinc-100 px-2 py-2 text-center dark:border-zinc-800 ${SCORE_STYLES[s]}`}
                      >
                        {s}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Panel>
      </section>

      <section className="mb-8 grid gap-4 md:grid-cols-3">
        <WaveCard
          phase="第一波"
          period="〜6 ヶ月"
          color="rose"
          target="P1 ママ ／ P3 事務職"
          actions={[
            "Wantedly運用代行（SES企業がWantedly×運用代行で17名採用の事例）",
            "主婦・ママ向けスクール提携（Famm／SHElikes／Re:mama）",
            "『フルリモート』『主婦歓迎』タグの集中投資",
          ]}
        />
        <WaveCard
          phase="第二波"
          period="6〜18 ヶ月"
          color="indigo"
          target="P2 ディレクター ／ P4 下請PG ／ P5 外国人"
          actions={[
            "Findy・GreenでハイクラスPM／実装層獲得",
            "外国人特化媒体（Daijob・GaijinPot）への露出",
            "GitHub解析・OSS発信を伴うブランド露出",
          ]}
        />
        <WaveCard
          phase="第三波"
          period="18〜36 ヶ月"
          color="violet"
          target="P6 ミドル ／ リファラル比率拡大"
          actions={[
            "地方UI ターン提携（自治体・地銀OB／OGネットワーク）",
            "ミドル特化（FROM40・ミドルの転職）開拓",
            "リファラル制度強化（在籍社員からの紹介経路）",
          ]}
        />
      </section>

      {/* Section 7 — Uncertainty */}
      <SectionHeading
        step="⑥ 残された不確実性と次の調査トピック"
        title="What we still don't know"
        description="本リサーチで数値化できなかった項目。次回追加リサーチ時の優先順位。"
      />

      <section className="mt-4 mb-8">
        <Panel
          title="次に当たるべき一次データ"
          subtitle="現時点では推定／業界平均で代替している項目。一次取材／統計購入で精度を上げられる。"
        >
          <ul className="space-y-2 text-sm text-zinc-700 dark:text-zinc-300">
            <UncertaintyItem
              n={1}
              title="Web制作会社倒産による離職者の総人数"
              detail="TDB／TSR は件数のみ公表。平均従業員数 × 倒産件数の正確な推計が必要。次回TDB特別レポートまたは厚労省『雇用動向調査』を当たる"
            />
            <UncertaintyItem
              n={2}
              title="シングルマザー × IT職移行の実数"
              detail="日本シングルマザー支援協会、Famm卒業生統計など一次データが必要"
            />
            <UncertaintyItem
              n={3}
              title="47都道府県別フルリモートエンジニア分布"
              detail="テレリモ総研の地域別データを購入／取材"
            />
            <UncertaintyItem
              n={4}
              title="競合の『非IT人材採用比率』推移"
              detail="SHIFT・テクノプロ・メイテック・SCSK の有価証券報告書／統合報告書から中途採用数・職種・育成投資額を年次でフォロー"
            />
            <UncertaintyItem
              n={5}
              title="生成AIによる Web制作・事務職の年あたり離職者数推計"
              detail="野村総研／三菱総研／大和総研の最新レポートを継続追跡"
            />
          </ul>
        </Panel>
      </section>

      <footer className="border-t border-zinc-200 pt-6 text-xs text-zinc-500 dark:border-zinc-800">
        出典40+件（経産省／IPA／JEITA／JILPT／TDB／TSR／パーソル／リクルートワークス／WEF／OECD／PwC 等）。
        全文・脚注リンクは:
        <code className="ml-1 rounded bg-zinc-100 px-1.5 py-0.5 dark:bg-zinc-800">
          src/research/2026-04-28_persona-market-research.md
        </code>
        {" ・ 議論用たたき台（決定事項ではない）"}
      </footer>
    </main>
  );
}

// ─────────────────────────────────────────────────────────────────
// Sub-components
// ─────────────────────────────────────────────────────────────────

function JobItem({
  name,
  detail,
  tone,
}: {
  name: string;
  detail: string;
  tone: "up" | "down";
}) {
  const arrowColor =
    tone === "down"
      ? "text-rose-500 dark:text-rose-400"
      : "text-emerald-500 dark:text-emerald-400";
  return (
    <li className="flex gap-2.5">
      <span className={`mt-0.5 shrink-0 text-base ${arrowColor}`}>
        {tone === "down" ? "↓" : "↑"}
      </span>
      <div className="min-w-0">
        <div className="font-medium text-zinc-900 dark:text-zinc-100">
          {name}
        </div>
        <div className="mt-0.5 text-xs leading-relaxed text-zinc-600 dark:text-zinc-400">
          {detail}
        </div>
      </div>
    </li>
  );
}

function StatBox({
  label,
  value,
  sub,
}: {
  label: string;
  value: string;
  sub: string;
}) {
  return (
    <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 text-center dark:border-zinc-800 dark:bg-zinc-900/40">
      <div className="text-[10px] font-semibold uppercase tracking-wider text-zinc-500">
        {label}
      </div>
      <div className="mt-1 text-2xl font-bold text-rose-600 dark:text-rose-400">
        {value}
      </div>
      <div className="mt-1 text-xs text-zinc-600 dark:text-zinc-400">{sub}</div>
    </div>
  );
}

function DemographicTable({ rows }: { rows: { k: string; v: string }[] }) {
  return (
    <table className="w-full border-separate border-spacing-0 text-xs">
      <tbody>
        {rows.map((r, i) => (
          <tr key={i} className="align-top">
            <td className="w-24 shrink-0 border-b border-zinc-100 py-2 pr-3 font-medium text-zinc-600 dark:border-zinc-800 dark:text-zinc-400">
              {r.k}
            </td>
            <td className="border-b border-zinc-100 py-2 leading-relaxed text-zinc-700 dark:border-zinc-800 dark:text-zinc-300">
              {r.v}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function TimeHorizonCard({
  when,
  headline,
  highlight,
  rows,
}: {
  when: string;
  headline: string;
  highlight: boolean;
  rows: { k: string; v: string }[];
}) {
  return (
    <div
      className={`flex flex-col rounded-xl border p-4 shadow-sm ${
        highlight
          ? "border-rose-300 bg-rose-50/50 dark:border-rose-700 dark:bg-rose-950/20"
          : "border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900"
      }`}
    >
      <div className="text-[10px] font-semibold uppercase tracking-widest text-zinc-500">
        {when}
      </div>
      <div
        className={`mt-1 text-base font-semibold ${
          highlight
            ? "text-rose-700 dark:text-rose-300"
            : "text-zinc-900 dark:text-zinc-100"
        }`}
      >
        {headline}
      </div>
      <ul className="mt-3 space-y-2 text-xs">
        {rows.map((r, i) => (
          <li key={i}>
            <div className="font-semibold text-zinc-700 dark:text-zinc-300">
              {r.k}
            </div>
            <div className="mt-0.5 leading-relaxed text-zinc-600 dark:text-zinc-400">
              {r.v}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

function PersonaCard({
  n,
  color,
  name,
  tag,
  demo,
  prev,
  fear,
  want,
  hook,
  goal,
  media,
}: {
  n: number;
  color: "rose" | "indigo" | "amber" | "emerald" | "cyan" | "violet";
  name: string;
  tag: string;
  demo: string;
  prev: string;
  fear: string;
  want: string;
  hook: string;
  goal: string;
  media: string;
}) {
  const colorMap: Record<typeof color, string> = {
    rose: "border-rose-200 bg-rose-50/40 dark:border-rose-900/50 dark:bg-rose-950/10",
    indigo:
      "border-indigo-200 bg-indigo-50/40 dark:border-indigo-900/50 dark:bg-indigo-950/10",
    amber:
      "border-amber-200 bg-amber-50/40 dark:border-amber-900/50 dark:bg-amber-950/10",
    emerald:
      "border-emerald-200 bg-emerald-50/40 dark:border-emerald-900/50 dark:bg-emerald-950/10",
    cyan: "border-cyan-200 bg-cyan-50/40 dark:border-cyan-900/50 dark:bg-cyan-950/10",
    violet:
      "border-violet-200 bg-violet-50/40 dark:border-violet-900/50 dark:bg-violet-950/10",
  };
  const numColor: Record<typeof color, string> = {
    rose: "bg-rose-600 text-white",
    indigo: "bg-indigo-600 text-white",
    amber: "bg-amber-600 text-white",
    emerald: "bg-emerald-600 text-white",
    cyan: "bg-cyan-600 text-white",
    violet: "bg-violet-600 text-white",
  };
  return (
    <div className={`flex flex-col rounded-xl border p-5 shadow-sm ${colorMap[color]}`}>
      <div className="flex items-baseline gap-3">
        <span
          className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold ${numColor[color]}`}
        >
          P{n}
        </span>
        <div className="min-w-0 flex-1">
          <div className="text-base font-semibold text-zinc-900 dark:text-zinc-100">
            {name}
          </div>
          <div className="mt-0.5 text-xs font-medium text-zinc-600 dark:text-zinc-400">
            {tag}
          </div>
        </div>
      </div>
      <div className="mt-3 text-xs text-zinc-600 dark:text-zinc-400">{demo}</div>
      <div className="mt-1 text-xs italic text-zinc-500 dark:text-zinc-500">
        {prev}
      </div>
      <div className="mt-3 space-y-2 text-xs">
        <Field label="不安" value={fear} />
        <Field label="期待" value={want} />
        <Field label="FLARETECHへの動機" value={hook} highlight />
        <Field label="育成後ゴール" value={goal} />
        <Field label="出会える媒体" value={media} />
      </div>
    </div>
  );
}

function Field({
  label,
  value,
  highlight = false,
}: {
  label: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <div>
      <div
        className={`text-[10px] font-semibold uppercase tracking-wider ${
          highlight
            ? "text-rose-600 dark:text-rose-400"
            : "text-zinc-500 dark:text-zinc-400"
        }`}
      >
        {label}
      </div>
      <div className="mt-0.5 leading-relaxed text-zinc-700 dark:text-zinc-300">
        {value}
      </div>
    </div>
  );
}

function WaveCard({
  phase,
  period,
  color,
  target,
  actions,
}: {
  phase: string;
  period: string;
  color: "rose" | "indigo" | "violet";
  target: string;
  actions: string[];
}) {
  const tone: Record<typeof color, string> = {
    rose: "border-rose-300 bg-rose-50/30 dark:border-rose-800 dark:bg-rose-950/10",
    indigo:
      "border-indigo-300 bg-indigo-50/30 dark:border-indigo-800 dark:bg-indigo-950/10",
    violet:
      "border-violet-300 bg-violet-50/30 dark:border-violet-800 dark:bg-violet-950/10",
  };
  return (
    <div className={`rounded-xl border p-5 ${tone[color]}`}>
      <div className="flex items-baseline justify-between">
        <span className="text-base font-bold text-zinc-900 dark:text-zinc-100">
          {phase}
        </span>
        <span className="text-xs text-zinc-500">{period}</span>
      </div>
      <div className="mt-2 text-xs font-semibold uppercase tracking-wider text-zinc-600 dark:text-zinc-400">
        ターゲット
      </div>
      <div className="mt-1 text-sm text-zinc-800 dark:text-zinc-200">
        {target}
      </div>
      <div className="mt-3 text-xs font-semibold uppercase tracking-wider text-zinc-600 dark:text-zinc-400">
        アクション
      </div>
      <ul className="mt-1 space-y-1 text-xs text-zinc-700 dark:text-zinc-300">
        {actions.map((a, i) => (
          <li key={i} className="flex gap-1.5">
            <span className="text-zinc-400">▸</span>
            <span>{a}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function UncertaintyItem({
  n,
  title,
  detail,
}: {
  n: number;
  title: string;
  detail: string;
}) {
  return (
    <li className="flex gap-3">
      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-zinc-200 text-xs font-semibold text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300">
        {n}
      </span>
      <div>
        <div className="font-medium text-zinc-900 dark:text-zinc-100">
          {title}
        </div>
        <div className="mt-0.5 text-xs text-zinc-600 dark:text-zinc-400">
          {detail}
        </div>
      </div>
    </li>
  );
}

// ─────────────────────────────────────────────────────────────────
// Data
// ─────────────────────────────────────────────────────────────────

type Score = "◎" | "○" | "△" | "×";

const MEDIA_MATRIX: { media: string; scores: Score[] }[] = [
  { media: "Wantedly", scores: ["◎", "○", "○", "○", "○", "△"] },
  { media: "Findy", scores: ["△", "◎", "×", "◎", "○", "△"] },
  { media: "Green", scores: ["○", "◎", "△", "◎", "△", "○"] },
  {
    media: "主婦・ママ特化（Famm/SHElikes/Re:mama）",
    scores: ["◎", "×", "◎", "×", "×", "×"],
  },
  { media: "ミドル特化（FROM40等）", scores: ["×", "○", "△", "×", "×", "◎"] },
  {
    media: "外国人特化（Daijob/GaijinPot）",
    scores: ["×", "×", "×", "×", "◎", "×"],
  },
  {
    media: "地方特化（地銀OB／自治体UIターン）",
    scores: ["○", "×", "◎", "△", "×", "◎"],
  },
  { media: "SNS（X／LinkedIn）", scores: ["△", "○", "×", "◎", "◎", "△"] },
  { media: "リファラル", scores: ["○", "○", "○", "○", "◎", "◎"] },
];

const SCORE_STYLES: Record<Score, string> = {
  "◎": "font-bold text-rose-600 dark:text-rose-400",
  "○": "text-zinc-700 dark:text-zinc-300",
  "△": "text-zinc-400 dark:text-zinc-600",
  "×": "text-zinc-300 dark:text-zinc-700",
};
