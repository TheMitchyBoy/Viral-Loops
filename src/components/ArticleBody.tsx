"use client";

import ReactMarkdown from "react-markdown";

interface ArticleBodyProps {
  body: string;
}

export default function ArticleBody({ body }: ArticleBodyProps) {
  return (
    <div className="prose-news text-lg">
      <ReactMarkdown
        components={{
          h1: ({ children }) => (
            <h2 className="font-display text-2xl font-bold mt-10 mb-4 text-zinc-100">{children}</h2>
          ),
          h2: ({ children }) => (
            <h2 className="font-display text-xl font-bold mt-8 mb-4 text-zinc-100">{children}</h2>
          ),
          h3: ({ children }) => (
            <h3 className="font-display text-lg font-semibold mt-6 mb-3 text-zinc-200">{children}</h3>
          ),
          p: ({ children }) => <p>{children}</p>,
          ul: ({ children }) => <ul className="list-disc pl-6 mb-4 space-y-1">{children}</ul>,
          ol: ({ children }) => <ol className="list-decimal pl-6 mb-4 space-y-1">{children}</ol>,
          li: ({ children }) => <li>{children}</li>,
          a: ({ href, children }) => (
            <a href={href} className="text-cyan-400 hover:text-cyan-300 underline underline-offset-2" target="_blank" rel="noopener noreferrer">
              {children}
            </a>
          ),
          strong: ({ children }) => <strong>{children}</strong>,
          blockquote: ({ children }) => (
            <blockquote className="border-l-2 border-cyan-500/40 pl-4 my-6 text-zinc-400 italic">{children}</blockquote>
          ),
        }}
      >
        {body}
      </ReactMarkdown>
    </div>
  );
}
