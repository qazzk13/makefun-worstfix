process.umask(0o022);
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// Worst Fix Ever — one commit message for a fix that backfired.
// Checkout was slow at 2am, so the tired fix was to take the
// payment check out of the way. Orders tripled. Revenue didn't.
const LINE =
  "fix: checkout was slow, so i removed the payment check; orders tripled overnight, revenue didn't";

if (LINE.length < 1 || LINE.length > 100) {
  throw new Error(`entry must be 1-100 characters, got ${LINE.length}`);
}
if (LINE.trim().length === 0 || LINE.includes("\n") || LINE.includes("\r")) {
  throw new Error("entry must be a single non-empty line");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), LINE + "\n");
