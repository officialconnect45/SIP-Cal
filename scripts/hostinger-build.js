const fs = require("fs");
const path = require("path");

/**
 * Hostinger runs `npm run build` on every deploy.
 * Full `next build` can hang for a long time there (GLIBC → WASM SWC).
 * We commit a prebuilt `out/` folder and only verify it exists on Hostinger.
 * Run `npm run build:app` locally whenever you change the UI, then commit `out/`.
 */
const indexHtml = path.join(__dirname, "..", "out", "index.html");

if (!fs.existsSync(indexHtml)) {
  console.error(
    "Missing out/index.html. Run `npm run build:app` locally, commit the out/ folder, then push."
  );
  process.exit(1);
}

console.log("Using prebuilt static export in out/ (Hostinger fast deploy).");
