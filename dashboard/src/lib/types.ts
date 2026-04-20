export interface KPI {
  name: string;
  isRate: boolean;
  current: number | null;
  lastWeek: number | null;
  twoWeeksAgo: number | null;
  deltaWoW: number | null;
}

export interface MetricTriplet {
  current: number | null;
  lastWeek: number | null;
  twoWeeksAgo: number | null;
  delta?: number | null;
}

export interface Platform {
  name: string;
  apps: MetricTriplet;
  passRate: MetricTriplet;
  offers: MetricTriplet;
}

export interface WeeklyPoint {
  week: string;
  applications: number;
  passRate: number | null;
  offers: number | null;
}

export interface WeeklyPointLong {
  weekStart: string; // ISO date "YYYY-MM-DD", Monday-starting
  applications: number;
  passRate: number | null;
  offers: number;
}

export interface Mover {
  name: string;
  current: number | null;
  lastWeek: number | null;
  delta: number | null;
}

export interface DashboardData {
  title: string;
  period: string;
  kpis: KPI[];
  platforms: Platform[];
  total: Platform | null;
  weekly: WeeklyPoint[];
  weeklyLong?: WeeklyPointLong[];
  best: Mover[];
  worst: Mover[];
  sourceFile: string;
}
