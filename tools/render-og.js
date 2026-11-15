// Renders tools/og-image.html to og-image.png (1200×630) using Playwright.
const { chromium } = require("playwright");
const path = require("path");
(async () => {
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: 1200, height: 630 } });
  await p.goto("file://" + path.join(__dirname, "og-image.html"));
  await p.evaluate(() => document.fonts.ready);
  await p.waitForTimeout(300);
  await p.screenshot({ path: path.join(__dirname, "..", "og-image.png") });
  await b.close();
})();
