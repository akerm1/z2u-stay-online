const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
const fs = require('fs');

puppeteer.use(StealthPlugin());

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe', // your Chrome path
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.goto('https://www.z2u.com', { waitUntil: 'networkidle2' });

  console.log("Please log in to Z2U manually in the browser...");
  console.log("After logging in, go back to VS Code and press Enter.");

  process.stdin.resume();
  process.stdin.on('data', async () => {
    const cookies = await page.cookies();
    fs.writeFileSync('cookies.json', JSON.stringify(cookies, null, 2));
    console.log("✅ Cookies saved to cookies.json");
    await browser.close();
    process.exit();
  });
})();
