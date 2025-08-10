const puppeteer = require('puppeteer');

(async () => {
  console.log("Starting browser...");

  const browser = await puppeteer.launch({
    headless: "new",  // Must be headless for cloud servers
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',
      '--disable-gpu',
      '--no-zygote',
      '--single-process'
    ]
  });

  const page = await browser.newPage();

  await page.goto('https://www.z2u.com', { waitUntil: 'networkidle2' });

  console.log("Z2U loaded. Keeping session alive...");

  setInterval(async () => {
    await page.reload({ waitUntil: 'networkidle2' });
    console.log("Refreshed at " + new Date().toLocaleTimeString());
  }, 5 * 60 * 1000);

})();
