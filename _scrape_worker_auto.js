const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
puppeteer.use(StealthPlugin());

const fs = require('fs');
const path = require('path');

// Configuration
const CONFIG = {
    width: 1920,
    height: 1080,
    fullPage: true,
    scaleFactor: 1,
    outputDir: 'scraped_full_sitemap',
    baseDelay: 2000,
    headless: 'new',
    urlFile: 'target_urls.txt',
    startDelay: 1000
};

const USER_AGENTS = [
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
];

const sleep = (ms) => new Promise(r => setTimeout(r, ms));

(async () => {
    // Load URLs from file
    if (!fs.existsSync(CONFIG.urlFile)) {
        console.error('❌ URL list file not found!');
        process.exit(1);
    }
    const rawUrls = fs.readFileSync(CONFIG.urlFile, 'utf-8');
    const urls = rawUrls.split('\n').map(u => u.trim()).filter(Boolean);

    // Ensure output dir
    if (!fs.existsSync(CONFIG.outputDir)) {
        fs.mkdirSync(CONFIG.outputDir, { recursive: true });
    }

    console.log(`\n🚀 Queueing ${urls.length} pages...`);

    let successCount = 0;
    let failCount = 0;

    for (let i = 0; i < urls.length; i++) {
        const targetUrl = urls[i];
        const progress = `[${i + 1}/${urls.length}]`;

        // Sanitize filename
        let filename;
        try {
            const urlObj = new URL(targetUrl);
            filename = urlObj.pathname.replace(/^\/|\/$/g, '').replace(/\//g, '_');
            if (filename === '' || filename === '_') filename = 'homepage';
        } catch (e) {
            filename = `scraped_${Date.now()}`;
        }

        const screenshotPath = path.join(CONFIG.outputDir, filename + '.png');
        const htmlPath = path.join(CONFIG.outputDir, filename + '.html');

        process.stdout.write(`${progress} Scraping: ${targetUrl} `);

        let browser = null;
        try {
            browser = await puppeteer.launch({
                headless: CONFIG.headless,
                args: [
                    '--no-sandbox',
                    '--disable-setuid-sandbox',
                    '--disable-web-security',
                    '--window-size=' + (CONFIG.width + 50) + ',' + (CONFIG.height + 150)
                ]
            });

            const page = await browser.newPage();

            await page.setViewport({
                width: CONFIG.width,
                height: CONFIG.height,
                deviceScaleFactor: CONFIG.scaleFactor
            });

            const randomUA = USER_AGENTS[Math.floor(Math.random() * USER_AGENTS.length)];
            await page.setUserAgent(randomUA);

            await page.goto(targetUrl, {
                waitUntil: 'domcontentloaded',
                timeout: 60000
            });

            // Small movement to simulate human
            try {
                await page.mouse.move(100, 100);
            } catch (e) { }

            await sleep(CONFIG.baseDelay);

            // Hide scrollbars for screenshot
            await page.evaluate(() => {
                document.body.style.overflow = 'hidden';
            });

            // Save Screenshot
            await page.screenshot({
                path: screenshotPath,
                fullPage: CONFIG.fullPage,
                omitBackground: false
            });

            // Save HTML
            const html = await page.content();
            fs.writeFileSync(htmlPath, html);

            console.log('✅');
            successCount++;

        } catch (err) {
            console.log('❌');
            console.error(`       Error: ${err.message.split('\n')[0]}`);
            failCount++;
        } finally {
            if (browser) await browser.close();
        }
    }

    console.log(`\nDone! Success: ${successCount}, Failed: ${failCount}`);
})();
