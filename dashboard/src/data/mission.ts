// クライアント (Flaretech) から受け取ったミッション・現状認識・提案領域。
// 数字が更新されたらここを書き換えるだけで全画面に反映される。

export interface ScopeItem {
  key: "A" | "B" | "C";
  title: string;
  headline: string;
  bullets: string[];
}

export interface Mission {
  eyebrow: string;
  headline: string;
  sub: string;
  cumulative: {
    weeks: number;
    applications: number;
    docPass: number;
    offers: number;
  };
  target: {
    monthlyHires: number;
    currentMonthlyAvg: number;
    gapMultiplier: number; // e.g. 12 (= 12倍)
  };
  scopes: ScopeItem[];
  outOfScope: string;
  brandConstraint: string;
}

export const mission: Mission = {
  eyebrow: "MISSION",
  headline: "月 25 名以上の採用達成",
  sub: "FLARETECH のブランドを維持しつつ、応募の「量」と「質」を同時に動かす。",
  cumulative: {
    weeks: 16,
    applications: 2_392,
    docPass: 479,
    offers: 8,
  },
  target: {
    monthlyHires: 25,
    currentMonthlyAvg: 2,
    gapMultiplier: 12,
  },
  scopes: [
    {
      key: "A",
      title: "応募の「量」を増やす",
      headline: "月 600 件 → 2,000〜3,000 件",
      bullets: [
        "媒体ミックスと予算の再配分案",
        "新規媒体の開拓提案",
      ],
    },
    {
      key: "B",
      title: "応募の「質」を高める",
      headline: "通過率の低い求人をリライト",
      bullets: [
        "Indeed 専門職求人（COBOL / SAP / AWS / RPA）の原稿リライト",
        "type の勝ちパターン（通過率 56.9%）を言語化し他媒体へ展開",
      ],
    },
    {
      key: "C",
      title: "AI 活用の知見提供",
      headline: "応募者分析・原稿生成・スカウト自動化",
      bullets: [
        "採用オペレーションでの AI 活用事例",
        "書類選考以降のプロセスでの AI 適用余地",
      ],
    },
  ],
  outOfScope: "書類通過以降の選考プロセスは社内主導で対応（本スコープ外）",
  brandConstraint: "FLARETECH のブランドを維持しつつ応募者を上げる訴求",
};
