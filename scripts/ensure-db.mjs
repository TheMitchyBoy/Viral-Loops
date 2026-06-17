import fs from "node:fs";
import path from "node:path";
import { run, dbPath } from "./db-env.mjs";

/** Ensure SQLite exists before the server accepts traffic (Railway runtime). */
fs.mkdirSync(path.dirname(dbPath), { recursive: true });

run("npx", ["prisma", "db", "push"]);
run("npx", ["tsx", "prisma/seed.ts"]);

console.log("Database ready.");
