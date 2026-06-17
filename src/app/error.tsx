"use client";

import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="max-w-xl mx-auto px-4 py-24 text-center">
      <p className="label-caps text-rose-400/80 mb-2">Something went wrong</p>
      <h1 className="font-display text-2xl font-bold mb-3">We couldn&apos;t load this page</h1>
      <p className="text-sm text-zinc-500 mb-6">
        The site hit a server error. This is often a temporary database or deploy issue.
        {error.digest ? ` (ref: ${error.digest})` : null}
      </p>
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <button type="button" onClick={reset} className="btn-primary">
          Try again
        </button>
        <Link href="/" className="btn-secondary">
          Back to home
        </Link>
      </div>
    </div>
  );
}
