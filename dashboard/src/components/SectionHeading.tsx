export function SectionHeading({
  step,
  title,
  description,
}: {
  step: string;
  title: string;
  description: string;
}) {
  return (
    <div className="mt-10 border-l-2 border-rose-500 pl-4">
      <h2 className="text-xl font-semibold">{step}</h2>
      <p className="mt-0.5 text-[11px] font-semibold uppercase tracking-widest text-rose-600 dark:text-rose-400">
        {title}
      </p>
      <p className="mt-1 max-w-3xl text-sm text-zinc-600 dark:text-zinc-400">
        {description}
      </p>
    </div>
  );
}
