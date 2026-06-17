/** Assembly-Scrape database URL (PostgreSQL or SQLite). */
export function getAssemblyDatabaseUrl(): string | undefined {
  const url = process.env.ASSEMBLY_DATABASE_URL?.trim();
  if (!url || looksLikePlaceholderUrl(url)) return undefined;
  return url;
}

/** Skip example/placeholder URLs copied from docs without a real host. */
export function looksLikePlaceholderUrl(url: string): boolean {
  if (/user:pass@host/i.test(url)) return true;
  if (/@host(?:[:/]|$)/i.test(url)) return true;
  if (/example\.com/i.test(url)) return true;

  try {
    const parsed = new URL(url.replace(/^postgres(ql)?:/, "postgresql:"));
    const hostname = parsed.hostname.toLowerCase();
    if (!hostname || hostname === "host" || hostname === "localhost.example") return true;
  } catch {
    return false;
  }

  return false;
}

export function isPostgresUrl(url: string): boolean {
  return url.startsWith("postgres://") || url.startsWith("postgresql://");
}
