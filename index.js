const puppeteer = require('puppeteer');

(async () => {
  console.log("Starting browser...");

  const browser = await puppeteer.launch({
    headless: false,  // we keep it visible in cloud for stability
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();

  // Load Z2U homepage (change to your dashboard if needed)
  await page.goto('https://www.z2u.com', { waitUntil: 'networkidle2' });

  console.log("Z2U loaded. Keeping session alive...");

  // Refresh every 5 minutes to keep session active
  setInterval(async () => {
    await page.reload({ waitUntil: 'networkidle2' });
    console.log("Refreshed at " + new Date().toLocaleTimeString());
  }, 5 * 60 * 1000);

})();
