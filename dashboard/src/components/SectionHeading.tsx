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
      <p className="text-[11px] font-semibold uppercase tracking-widest text-rose-600 dark:text-rose-400">
        {step}
      </p>
      <h2 className="mt-0.5 text-xl font-semibold">{title}</h2>
      <p className="mt-1 max-w-3xl text-sm text-zinc-600 dark:text-zinc-400">
        {description}
      </p>
    </div>
  );
}
