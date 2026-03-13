const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch({ headless: "new" });
    const page = await browser.newPage();

    // Capture console errors
    page.on('console', msg => {
        if (msg.type() === 'error') console.log('BROWSER ERROR:', msg.text());
        else console.log('BROWSER LOG:', msg.text());
    });
    page.on('pageerror', err => {
        console.log('PAGE ERROR:', err.message);
    });

    try {
        console.log("Navigating to localhost:5173...");
        await page.goto('http://localhost:5173', { waitUntil: 'networkidle2' });

        console.log("Waiting for fab...");
        await page.waitForSelector('.pathpilot-fab');

        console.log("Found fab. Clicking...");
        await page.click('.pathpilot-fab');

        console.log("Waiting a bit to see if error occurs...");
        await new Promise(resolve => setTimeout(resolve, 3000));

    } catch (err) {
        console.error("SCRIPT ERROR:", err);
    } finally {
        await browser.close();
    }
})();
