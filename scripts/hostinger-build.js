const fs = require("fs");
const path = require("path");

/**
 * Hostinger runs `npm run build` on every deploy.
 * Full `next build` can hang for a long time there (GLIBC → WASM SWC).
 * We commit a prebuilt `out/` folder and verify/touch it here.
 *
 * hPanel MUST use:
 *   Output directory: out
 *   Entry file: (empty)
 *   Build script: build
 *
 * Locally after UI changes:
 *   npm run build:app && git add out && git commit && git push
 */
const root = path.join(__dirname, "..");
const outDir = path.join(root, "out");
const indexHtml = path.join(outDir, "index.html");

if (!fs.existsSync(indexHtml)) {
  console.error(
    "Missing out/index.html. Run `npm run build:app` locally, commit the out/ folder, then push."
  );
  process.exit(1);
}

// Prove the output directory to Hostinger's post-build checker.
const stampPath = path.join(outDir, ".hostinger-build");
fs.writeFileSync(
  stampPath,
  `ok ${new Date().toISOString()}\nstatic-export\n`
);

const files = fs.readdirSync(outDir);
console.log(`Using prebuilt static export in out/ (${files.length} entries).`);
console.log("Hostinger: set Output directory to exactly: out");
console.log("Hostinger: leave Entry file empty for static export.");
