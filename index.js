const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.goto('https://www.z2u.com/', { waitUntil: 'networkidle2' });

  console.log("🟢 Z2U opened. Please login manually (wait 3 mins)...");

  // Wait 3 minutes so you can manually login
  await page.waitForTimeout(3 * 60 * 1000);

  // Keep refreshing every 5 minutes to stay online
  setInterval(async () => {
    console.log("🔄 Refreshing to stay online...");
    await page.reload({ waitUntil: 'networkidle2' });
  }, 5 * 60 * 1000);
})();

