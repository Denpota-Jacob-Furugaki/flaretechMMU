import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";

export function Markdown({ children }: { children: string }) {
  return (
    <div className="prose-md max-w-none">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeSlug]}
        components={{
          h1: (props) => (
            <h1 className="mb-2 mt-0 text-3xl font-semibold tracking-tight" {...props} />
          ),
          h2: (props) => (
            <h2 className="mb-3 mt-10 border-b border-zinc-200 pb-2 text-xl font-semibold dark:border-zinc-800" {...props} />
          ),
          h3: (props) => (
            <h3 className="mb-2 mt-6 text-base font-semibold text-zinc-700 dark:text-zinc-300" {...props} />
          ),
          p: (props) => (
            <p className="my-3 leading-7 text-zinc-700 dark:text-zinc-300" {...props} />
          ),
          ul: (props) => (
            <ul className="my-3 list-disc space-y-1 pl-6 text-zinc-700 dark:text-zinc-300" {...props} />
          ),
          ol: (props) => (
            <ol className="my-3 list-decimal space-y-1 pl-6 text-zinc-700 dark:text-zinc-300" {...props} />
          ),
          li: (props) => <li className="leading-7" {...props} />,
          a: (props) => (
            <a className="font-medium text-blue-600 underline underline-offset-2 hover:text-blue-700 dark:text-blue-400" {...props} />
          ),
          code: ({ className, children, ...rest }) => {
            const isBlock = /language-/.test(className ?? "");
            if (isBlock) {
              return (
                <code className={`${className ?? ""} block`} {...rest}>
                  {children}
                </code>
              );
            }
            return (
              <code className="rounded bg-zinc-100 px-1.5 py-0.5 text-[0.92em] text-zinc-800 dark:bg-zinc-800 dark:text-zinc-200" {...rest}>
                {children}
              </code>
            );
          },
          pre: (props) => (
            <pre className="my-4 overflow-x-auto rounded-lg bg-zinc-900 p-4 text-sm text-zinc-100" {...props} />
          ),
          blockquote: (props) => (
            <blockquote className="my-4 border-l-4 border-zinc-300 pl-4 italic text-zinc-600 dark:border-zinc-700 dark:text-zinc-400" {...props} />
          ),
          hr: () => <hr className="my-8 border-zinc-200 dark:border-zinc-800" />,
          table: (props) => (
            <div className="my-5 overflow-x-auto rounded-lg border border-zinc-200 dark:border-zinc-800">
              <table className="w-full text-sm" {...props} />
            </div>
          ),
          thead: (props) => (
            <thead className="border-b border-zinc-200 bg-zinc-50 text-left text-xs uppercase tracking-wide text-zinc-500 dark:border-zinc-800 dark:bg-zinc-800/40" {...props} />
          ),
          th: (props) => <th className="px-3 py-2 font-medium" {...props} />,
          td: (props) => (
            <td className="border-t border-zinc-100 px-3 py-2 align-top tabular-nums dark:border-zinc-800" {...props} />
          ),
          strong: (props) => (
            <strong className="font-semibold text-zinc-900 dark:text-zinc-100" {...props} />
          ),
        }}
      >
        {children}
      </ReactMarkdown>
    </div>
  );
}
