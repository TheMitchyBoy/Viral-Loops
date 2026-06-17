/**
 * Check Assembly-Scrape database connection from the shell (no curl/Python needed).
 * Usage: npm run assembly:status
 */

import { getAssemblyConnectionStatus } from "../src/lib/assembly/fetch";

async function main() {
  const status = await getAssemblyConnectionStatus();
  console.log(JSON.stringify(status, null, 2));
  process.exit(status.connected ? 0 : 1);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
