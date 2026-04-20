// Marketing-perspective frameworks for interpreting Flaretech's recruitment data.
// Ported from the earlier Flaretech_Recruitment dashboard (client deck).
// Diagnostic values (severity, scores, flaretechUse, etc.) are from the
// prior-iteration assessment; refresh as new evidence comes in.

// ── 7 採用のワナ ────────────────────────────────────────────────────

export type PitfallSeverity = "unknown" | "low" | "medium" | "high";

export interface Pitfall {
  id: number;
  label: string;
  gloss: string;
  severity: PitfallSeverity;
  note?: string;
}

export interface PitfallCause {
  id: 1 | 2;
  label: string;
  gloss: string;
  pitfalls: Pitfall[];
}

export const pitfallCauses: PitfallCause[] = [
  {
    id: 1,
    label: "会社と個人の視点の幅を説明できない",
    gloss: "Cannot articulate the gap between company and individual perspectives",
    pitfalls: [
      { id: 1, label: "スペック依存症", gloss: "Spec-dependence", severity: "unknown" },
      {
        id: 2,
        label: "「社員不在」の採用広報",
        gloss: "Employee-absent recruitment PR",
        severity: "high",
        note: "元デッキで high と明記。Flaretech の優先課題 — 社員の声が採用広報に存在しない。",
      },
      {
        id: 3,
        label: "求職者には刺さらない「よいことをいっている風」の表現",
        gloss: "Vague feel-good messaging that doesn't land with candidates",
        severity: "unknown",
      },
    ],
  },
  {
    id: 2,
    label: "自社以外の競合やターゲットについて全然知らない",
    gloss: "No knowledge of competitors or target candidates outside the company",
    pitfalls: [
      {
        id: 4,
        label: "すごすぎて求職者にはピンとこない会社の魅力発信",
        gloss: "Company appeal pitched too high to resonate with candidates",
        severity: "unknown",
      },
      {
        id: 5,
        label: "独り（自社）よがりで「差が伝わらない」会社説明",
        gloss: "Self-centred company description that fails to convey differentiation",
        severity: "unknown",
      },
      { id: 6, label: "「優秀人材」という幻想", gloss: "The \"top talent\" illusion", severity: "unknown" },
      {
        id: 7,
        label: "昭和・平成型の採用コミュニケーション",
        gloss: "Showa/Heisei-era recruitment communication",
        severity: "unknown",
      },
    ],
  },
];

// ── 4 つの価値観表現スタイル ─────────────────────────────────────────

export type StyleAxis = "会社" | "個人";

export interface ValueStyle {
  key: "business" | "culture" | "job" | "action";
  english: string;
  japanese: string;
  styleLabel: string;
  axis: StyleAxis;
  prompts: string[];
  evidence?: string;
}

export const valueStyles: ValueStyle[] = [
  {
    key: "business",
    english: "Business",
    japanese: "事業",
    styleLabel: "事業のスタイル",
    axis: "会社",
    prompts: ["経営者の想い", "事業への向き合い方"],
  },
  {
    key: "culture",
    english: "Culture",
    japanese: "関係性",
    styleLabel: "関係性のスタイル",
    axis: "会社",
    prompts: ["社内でよく使われる言葉", "人と人との関係性"],
  },
  {
    key: "job",
    english: "Job",
    japanese: "仕事",
    styleLabel: "仕事のスタイル",
    axis: "個人",
    prompts: ["職種ごとのこだわり", "活躍する人の特徴"],
  },
  {
    key: "action",
    english: "Action",
    japanese: "行動",
    styleLabel: "行動のスタイル",
    axis: "個人",
    prompts: ["社員の言動・働き方", "個人の裁量や判断軸"],
  },
];

// ── 2030 採用チャネル地図 ───────────────────────────────────────────

export type ChannelTier = "traditional" | "tech-augmented" | "emerging";
export type ChannelUsage = "unknown" | "active" | "gap" | "not-applicable";

export interface RecruitmentChannel2030 {
  key: string;
  label: string;
  gloss: string;
  tier: ChannelTier;
  flaretechUse: ChannelUsage;
  note?: string;
}

export const recruitmentChannels2030: RecruitmentChannel2030[] = [
  { key: "headhunting", label: "ヘッドハンティング", gloss: "Executive headhunting", tier: "traditional", flaretechUse: "unknown" },
  { key: "agency", label: "人材紹介", gloss: "Staffing agency", tier: "traditional", flaretechUse: "unknown" },
  { key: "agency-ats", label: "人材紹介 + 検索エンジン / ATS", gloss: "Agency augmented with search engine + ATS", tier: "tech-augmented", flaretechUse: "unknown" },
  { key: "always-on", label: "通年求人サイト", gloss: "Always-on job sites", tier: "traditional", flaretechUse: "unknown" },
  { key: "media", label: "求人媒体・サイト", gloss: "Job boards / media", tier: "traditional", flaretechUse: "active", note: "Indeed / doda / type / エン転職 / Wantedly / レバテック など主要媒体は稼働中。" },
  { key: "media-ats", label: "求人媒体・サイト + 検索エンジン / ATS", gloss: "Job boards augmented with search engine + ATS", tier: "tech-augmented", flaretechUse: "active", note: "HERP 連携あり。" },
  { key: "direct-ai", label: "ダイレクトリクルーティング + RPO / AIレコメンド", gloss: "Direct recruiting with RPO and AI recommendations", tier: "emerging", flaretechUse: "gap", note: "2030年の主戦場。スカウトデータはあるが AIレコメンド型は未導入。" },
  { key: "spot-work", label: "スポットワークマッチング", gloss: "Spot-work / gig matching", tier: "emerging", flaretechUse: "not-applicable" },
  { key: "side-gig", label: "副業マッチング", gloss: "Side-gig / moonlighting matching", tier: "emerging", flaretechUse: "unknown" },
  { key: "entre-net", label: "アントレNet", gloss: "Entrepreneur network (independent / founder channels)", tier: "traditional", flaretechUse: "unknown" },
];

// ── 評判 × 認知度 バブル ────────────────────────────────────────────

export interface ReputationCompany {
  name: string;
  awareness: number;
  reputation: number;
  reviewCount: number;
  isSelf?: boolean;
  unknown?: boolean;
  note?: string;
}

export const reputationCompanies: ReputationCompany[] = [
  { name: "Flaretech (自社)", awareness: 1500, reputation: 3.2, reviewCount: 15, isSelf: true, unknown: true, note: "出発点。クチコミ件数・評価ともに未計測。OpenWork / ライトハウスで実値を取る。" },
  { name: "競合A (大手SIer)", awareness: 45000, reputation: 3.6, reviewCount: 1200, unknown: true, note: "認知率は高いが評判はそこそこ。" },
  { name: "競合B (中堅SIer)", awareness: 22000, reputation: 3.4, reviewCount: 650, unknown: true },
  { name: "競合C (スタートアップ)", awareness: 8000, reputation: 4.3, reviewCount: 180, unknown: true, note: "認知率は低いが評判は高い。「評判」を上げるルートの先行事例。" },
  { name: "競合D (外資IT)", awareness: 60000, reputation: 4.5, reviewCount: 2100, unknown: true, note: "目標エリア: 評判が良く認知率も高い。" },
  { name: "競合E (RPA/DX系)", awareness: 18000, reputation: 3.8, reviewCount: 520, unknown: true },
];

// ── 候補者エクスペリエンス スコアカード ─────────────────────────────

export type CxScore = -1 | 0 | 1 | 2 | 3 | 4 | 5;

export interface CandidateExperienceCategory {
  key: string;
  category: string;
  good: string;
  bad: string;
  flaretechScore: CxScore;
  unknown?: boolean;
  note?: string;
}

export const candidateExperience: CandidateExperienceCategory[] = [
  {
    key: "application",
    category: "応募プロセス",
    good: "簡潔で直感的、モバイル対応済み",
    bad: "複雑で時間がかかり、モバイル非対応",
    flaretechScore: 2,
    unknown: true,
    note: "recruit.flaretech.co.jp は中身がほぼ空。外部サイトへ誘導する構造で、応募導線の実測が必要。",
  },
  {
    key: "communication",
    category: "コミュニケーション",
    good: "迅速なフィードバック、透明性のある情報提供",
    bad: "フィードバックが遅い、またはなし、情報が不明瞭",
    flaretechScore: -1,
    unknown: true,
  },
  {
    key: "interview",
    category: "面接プロセス",
    good: "パーソナライズされた質問、快適な環境",
    bad: "一方的な質問、不快な面接環境",
    flaretechScore: -1,
    unknown: true,
  },
  {
    key: "offer",
    category: "オファー手続き",
    good: "明確なオファーレター、柔軟な交渉可能性",
    bad: "曖昧な条件、交渉の余地なし",
    flaretechScore: -1,
    unknown: true,
  },
  {
    key: "onboarding",
    category: "オンボーディング",
    good: "カスタマイズされたプログラム、メンターシップの提供",
    bad: "一律のオンボーディング、サポート不足",
    flaretechScore: -1,
    unknown: true,
  },
  {
    key: "tech",
    category: "技術の活用",
    good: "テクノロジーを使った即時Q&Aサポート、最新で使いやすいデジタルツールの利用",
    bad: "古い技術の使用、デジタルツールの不足",
    flaretechScore: -1,
    unknown: true,
  },
  {
    key: "culture",
    category: "社内文化の紹介",
    good: "企業文化と価値観の積極的な紹介",
    bad: "企業文化や価値観の情報が不足",
    flaretechScore: 2,
    unknown: true,
    note: "コーポレートサイトに Challenge/Integrity/Co-creation のバリューは明記。ただし採用広報内での言及は薄い。",
  },
  {
    key: "feedback",
    category: "フィードバックとフォローアップ",
    good: "定期的な面談、建設的なフィードバック",
    bad: "フィードバックの欠如、フォローアップの不足",
    flaretechScore: -1,
    unknown: true,
  },
];

// ── 内定辞退 4 ドライバー ──────────────────────────────────────────

export type OfferDeclineRisk = "unknown" | "low" | "medium" | "high";

export interface OfferDeclineReason {
  key: string;
  label: string;
  gloss: string;
  flaretechRisk: OfferDeclineRisk;
  hypothesis?: string;
}

export const offerDeclineReasons: OfferDeclineReason[] = [
  {
    key: "competing-offer",
    label: "他社からのより魅力的なオファー",
    gloss: "More attractive competing offer",
    flaretechRisk: "unknown",
    hypothesis: "給与・事業規模で大手競合と比較されやすい。ブランド以外の武器（裁量・成長角度）を候補者が認識できているかが鍵。",
  },
  {
    key: "culture-fit",
    label: "企業文化やチームとのフィット感の欠如",
    gloss: "Lack of culture / team fit",
    flaretechRisk: "high",
    hypothesis: "採用広報に現場社員の声がほぼ無く、候補者がフィット感を判断する材料が乏しい（ワナ②『社員不在』と直結）。",
  },
  {
    key: "onboarding-opacity",
    label: "オンボーディングプロセスの不透明さ",
    gloss: "Opaque onboarding process",
    flaretechRisk: "unknown",
    hypothesis: "入社後の最初の30/60/90日が事前に見えていないと、比較対象に対して安心感で負けやすい。",
  },
  {
    key: "process-communication",
    label: "面接や選考プロセス中のコミュニケーションの欠如",
    gloss: "Poor communication during the process",
    flaretechRisk: "unknown",
    hypothesis: "フィードバック遅延・情報不明瞭は候補者体験スコアカードの『コミュニケーション』と同じ問題。選考中の接触頻度と質を計測する。",
  },
];

// ── リテンション 5 課題 ─────────────────────────────────────────────

export interface RetentionChallenge {
  key: "training" | "placement" | "evaluation" | "compensation" | "metabolism";
  jp: string;
  gloss: string;
  strongImage: string[];
  weakImage: string[];
  flaretechNote?: string;
  unknown?: boolean;
}

export const retentionChallenges: RetentionChallenge[] = [
  {
    key: "training",
    jp: "育成の課題",
    gloss: "Training / development",
    strongImage: ["企業イメージが強いと、育成効率が良い人材（≒自主性が高く、成長角度が大きい人）を採用しやすい"],
    weakImage: ["イメージが弱いと、素材段階での差がつきにくく、育成コストが膨らむ"],
    unknown: true,
  },
  {
    key: "placement",
    jp: "配置の課題",
    gloss: "Placement / staffing flexibility",
    strongImage: ["企業のイメージが強いと、配属リスクがあったとしても、企業イメージに惹かれて人が採用・定着しやすい"],
    weakImage: ["イメージが弱いと、希望外の配属で即離脱しやすくなる"],
    unknown: true,
  },
  {
    key: "evaluation",
    jp: "評価の課題",
    gloss: "Evaluation / engagement",
    strongImage: ["企業イメージが強いと、評価や報酬面以外での満足度やアイデンティティが発生し、エンゲージメントが高まる"],
    weakImage: ["企業イメージが弱いと、評価や報酬で競合に負けると即時退職や転職につながる"],
    unknown: true,
  },
  {
    key: "compensation",
    jp: "報酬の課題",
    gloss: "Compensation resilience",
    strongImage: ["ブランドそのものが非金銭的報酬になり、賃金面の相対的劣位を吸収しやすい"],
    weakImage: ["金銭条件でしか勝負できず、他社のオファー一本で離脱が起きる"],
    unknown: true,
  },
  {
    key: "metabolism",
    jp: "代謝の課題",
    gloss: "Turnover / metabolism",
    strongImage: ["企業イメージが強いと、仮に退職しても補充がしやすい", "企業ブランド=転職力につながり、代謝を促しやすい"],
    weakImage: ["イメージが弱いと、欠員補充に時間がかかり事業スピードが落ちる"],
    unknown: true,
  },
];

// ── 企業イメージ 8 カテゴリチェック ─────────────────────────────────

export type BrandContentStatus = "unknown" | "missing" | "partial" | "present";
export type BrandFreshness = "unknown" | "stale" | "fresh" | "na";

export interface BrandChecklistCategory {
  key: string;
  number: number;
  category: string;
  overview: string;
  contentExamples: string[];
  exists: BrandContentStatus;
  fresh: BrandFreshness;
  note?: string;
}

export const brandChecklist: BrandChecklistCategory[] = [
  {
    key: "company",
    number: 1,
    category: "企業理解",
    overview: "企業の基本的な理念（ミッション、ビジョン、コアバリュー）、成長ストーリー、社内の日常やイベント、社会貢献活動などを紹介",
    contentExamples: ["私たちのミッションとは？", "社内の福利厚生制度を紹介します", "成長の歴史：私たちのストーリー", "日々の業務風景", "企業の社会貢献活動"],
    exists: "partial",
    fresh: "unknown",
    note: "Challenge / Integrity / Co-creation は明記あり。ただし成長ストーリー・社内日常の発信は薄い。",
  },
  {
    key: "business",
    number: 2,
    category: "事業理解",
    overview: "事業内容やサービス内容、事業部の概要を紹介",
    contentExamples: ["私たちの主要な事業とは？", "新製品の紹介", "事業部紹介：マーケティングチーム"],
    exists: "present",
    fresh: "unknown",
    note: "システム開発・DX・RPO・AI など事業は明記。事業部別の深掘りは未整備。",
  },
  {
    key: "people",
    number: 3,
    category: "社員／社風理解",
    overview: "社員の背景、働く理由、転職理由、働き方などを紹介",
    contentExamples: ["社員インタビュー：〇〇さんの1日", "社員の声：なぜここで働くの？", "転職者インタビュー：〇〇さんの転職理由"],
    exists: "partial",
    fresh: "unknown",
    note: "Wantedly に営業インタビュー等あり。コーポレートサイト側には皆無。ワナ②『社員不在』の中核。",
  },
  {
    key: "role",
    number: 4,
    category: "職種理解",
    overview: "各職種の業務内容、目標、必要なスキル、提供されるトレーニングなどを紹介",
    contentExamples: ["職種紹介：エンジニアの日々", "エンジニアが必要とするスキルとは？", "トレーニングプログラムの紹介"],
    exists: "missing",
    fresh: "na",
    note: "採用ページに『エンジニア』の総称のみ。職種別の業務・スキル記述なし。",
  },
  {
    key: "career",
    number: 5,
    category: "キャリアパス・人事制度理解",
    overview: "キャリアパス、昇進制度、給与制度、異動・転職の事例などを紹介",
    contentExamples: ["キャリアパス紹介：エンジニアからマネジャーへ", "昇進制度の解説", "異動の事例紹介：〇〇さんのキャリア"],
    exists: "missing",
    fresh: "na",
    note: "『柔軟なキャリアパス』と書かれているのみ。制度の中身は未公開。",
  },
  {
    key: "executives",
    number: 6,
    category: "経営理解",
    overview: "経営陣のメンバー紹介とその思考法を紹介",
    contentExamples: ["CEOインタビュー：私たちのビジョン", "経営陣メンバーの紹介", "〇〇さんの仕事術"],
    exists: "partial",
    fresh: "unknown",
    note: "CEO / COO / 執行役員の顔写真と名前あり。インタビュー・思考法の深掘りは不足。",
  },
  {
    key: "industry",
    number: 7,
    category: "業界理解",
    overview: "その業界のビジネスモデル、構造、競合や、自社の立ち位置を紹介",
    contentExamples: ["業界解説：私たちのビジネスモデル", "業界構造と競合の解析", "私たちの立ち位置：市場での役割と特徴"],
    exists: "missing",
    fresh: "na",
    note: "業界の構造・競合解説は見当たらない。候補者に差分が伝わらない一因。",
  },
  {
    key: "process",
    number: 8,
    category: "選考プロセス理解",
    overview: "採用過程、面接、選考基準などについての一般的な疑問、各カテゴリーに関する具体的な疑問を紹介する",
    contentExamples: ["採用過程のQ&A", "面接についてのよくある質問", "選考基準について語ります"],
    exists: "missing",
    fresh: "na",
    note: "選考プロセス・面接回数・基準の記述なし。候補者の不安が最も残る領域。",
  },
];

// ── 採用ファネル × 施策 ─────────────────────────────────────────────

export interface HiringFunnelStage {
  key: "awareness" | "entry" | "screen" | "offer" | "join" | "retain";
  jp: string;
  gloss: string;
  current: number | null;
  target: number | null;
}

export const hiringFunnelStages: HiringFunnelStage[] = [
  { key: "awareness", jp: "認知", gloss: "Awareness", current: null, target: null },
  { key: "entry", jp: "エントリー", gloss: "Entry / applications", current: 178, target: null },
  { key: "screen", jp: "選考", gloss: "Screening", current: 24, target: null },
  { key: "offer", jp: "内定", gloss: "Offer", current: 0, target: null },
  { key: "join", jp: "入社", gloss: "Join / onboarding", current: null, target: null },
  { key: "retain", jp: "定着", gloss: "Retention", current: null, target: null },
];

export interface HiringStrategyPhase {
  key: "pool" | "closing" | "followup";
  jp: string;
  gloss: string;
  covers: HiringFunnelStage["key"][];
  fixed: string[];
  variable: string[];
}

export const hiringStrategyPhases: HiringStrategyPhase[] = [
  {
    key: "pool",
    jp: "母集団形成（施策）",
    gloss: "Pool formation",
    covers: ["awareness", "entry"],
    fixed: ["企業ブランド", "企業認知率"],
    variable: ["登壇数／掲載量", "接点効率"],
  },
  {
    key: "closing",
    jp: "クロージング（施策）",
    gloss: "Closing",
    covers: ["screen", "offer"],
    fixed: ["採用チームの魅力", "待遇（給与や報酬）"],
    variable: ["接触方法（頻度）", "訴求点"],
  },
  {
    key: "followup",
    jp: "フォローアップ（施策）",
    gloss: "Follow-up",
    covers: ["join", "retain"],
    fixed: ["競合の動き", "候補者の周辺環境"],
    variable: ["接触方法（頻度）", "コンテンツ（研修など）"],
  },
];
