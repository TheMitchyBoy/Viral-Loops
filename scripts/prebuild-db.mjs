import { run } from "./db-env.mjs";

run("npx", ["prisma", "db", "push"]);
run("npx", ["tsx", "prisma/seed.ts"]);
run("npx", ["next", "build"]);
