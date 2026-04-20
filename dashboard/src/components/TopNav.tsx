"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const ROUTES = [
  { href: "/", label: "ホーム", number: "①", match: "exact" as const },
  { href: "/market", label: "市場", number: "②", match: "exact" as const },
  { href: "/diagnosis", label: "診断", number: "③", match: "exact" as const },
  { href: "/experience", label: "体験", number: "④", match: "exact" as const },
  { href: "/retention", label: "定着", number: "⑤", match: "exact" as const },
  { href: "/analyses", label: "分析", number: "🔍", match: "prefix" as const },
];

export function TopNav() {
  const pathname = usePathname();
  const isActive = (href: string, match: "exact" | "prefix") => {
    if (match === "exact") return pathname === href;
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <div className="sticky top-0 z-40 border-b border-zinc-200 bg-white/85 backdrop-blur dark:border-zinc-800 dark:bg-zinc-950/80">
      <div className="mx-auto flex max-w-7xl items-center gap-3 px-6 py-2.5">
        <Link
          href="/"
          className="shrink-0 text-[11px] font-semibold tracking-wider text-zinc-700 hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-zinc-100"
        >
          FLARETECH · MMU
        </Link>
        <div className="flex-1" />
        <nav
          aria-label="メインナビゲーション"
          className="flex gap-1 overflow-x-auto text-xs"
        >
          {ROUTES.map((r) => {
            const active = isActive(r.href, r.match);
            return (
              <Link
                key={r.href}
                href={r.href}
                aria-current={active ? "page" : undefined}
                className={`whitespace-nowrap rounded-full px-3 py-1.5 transition ${
                  active
                    ? "bg-rose-600 text-white shadow-sm"
                    : "text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-100"
                }`}
              >
                <span className="mr-1">{r.number}</span>
                {r.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
