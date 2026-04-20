export function Panel({
  title,
  subtitle,
  children,
  className = "",
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section
      className={`rounded-xl border border-zinc-200 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-900 ${className}`}
    >
      <header className="mb-4">
        <h3 className="text-base font-semibold">{title}</h3>
        {subtitle && (
          <p className="mt-1 text-xs leading-relaxed text-zinc-500 dark:text-zinc-400">
            {subtitle}
          </p>
        )}
      </header>
      {children}
    </section>
  );
}
