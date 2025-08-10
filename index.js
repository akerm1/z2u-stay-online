const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {
    const browser = await puppeteer.launch({
        headless: false, // run with browser visible
        executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe', // your Chrome path
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    const page = await browser.newPage();

    // Load cookies
    const cookies = JSON.parse(fs.readFileSync('cookies.json', 'utf8'));
    await page.setCookie(...cookies);

    // Go to Z2U logged in
    await page.goto('https://www.z2u.com', { waitUntil: 'networkidle2' });

    console.log("✅ Logged in using saved cookies");

    // Keep running
    await new Promise(() => {}); // Keeps the browser open forever
    console.log("✅ Logged in using saved cookies");
// Keep alive forever
await new Promise(() => {});

})();

