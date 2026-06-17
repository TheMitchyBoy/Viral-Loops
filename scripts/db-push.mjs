import { run } from "./db-env.mjs";

run("npx", ["prisma", "db", "push"]);
