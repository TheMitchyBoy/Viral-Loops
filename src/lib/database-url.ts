/** SQLite path for local/dev builds when DATABASE_URL is unset in the environment. */
export function getDatabaseUrl(): string {
  const fromEnv = process.env.DATABASE_URL?.trim();
  if (fromEnv && fromEnv.startsWith("file:")) return fromEnv;
  return `file:${process.cwd()}/prisma/dev.db`;
}

export function ensureDatabaseUrl(): string {
  const url = getDatabaseUrl();
  process.env.DATABASE_URL = url;
  return url;
}
