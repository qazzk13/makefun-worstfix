process.umask(0o022);
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// Worst Fix Ever — one commit message for a fix that backfired.
// Checkout felt slow at 2am, so the tired fix was to take the
// payment check out of the way. Orders loved it. Revenue did not.
const LINE =
  "fix: checkout felt slow so i removed the payment check, orders tripled overnight, money did not";

if (LINE.length < 1 || LINE.length > 100) {
  throw new Error(`entry must be 1-100 characters, got ${LINE.length}`);
}
if (LINE.trim().length === 0 || LINE.includes("\n")) {
  throw new Error("entry must be a single non-empty line");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), LINE + "\n");
