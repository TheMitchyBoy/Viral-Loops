import { spawnSync } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dbPath = path.join(root, "prisma", "dev.db");

export function getDbEnv() {
  const url = process.env.DATABASE_URL?.trim();
  return {
    ...process.env,
    DATABASE_URL: url && url.startsWith("file:") ? url : `file:${dbPath}`,
  };
}

export function run(command, args, env = getDbEnv()) {
  const result = spawnSync(command, args, {
    cwd: root,
    env,
    stdio: "inherit",
  });

  if (result.status !== 0) {
    process.exit(result.status ?? 1);
  }
}

export { root, dbPath };
