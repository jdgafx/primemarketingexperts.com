const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
puppeteer.use(StealthPlugin());

const fs = require('fs');
const path = require('path');

// Read config from environment variables
const CONFIG = {
    width: parseInt(process.env.VIEWPORT_WIDTH) || 1920,
    height: parseInt(process.env.VIEWPORT_HEIGHT) || 1080,
    fullPage: process.env.FULL_PAGE === 'true',
    scaleFactor: parseFloat(process.env.SCALE_FACTOR) || 1,
    outputDir: process.env.OUTPUT_DIR || 'scraped_images',
    baseDelay: parseInt(process.env.DELAY_MS) || 2000,
    headless: process.env.HEADLESS !== 'false',
    urlFile: process.env.URL_FILE || 'target_urls.txt',
    // Consistent User Agent
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
};

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

    console.log(`\n🚀 Queueing ${urls.length} pages (Stealth Mode: Fresh Instance per URL)...`);

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
            filename += '.png';
        } catch (e) {
            filename = `scraped_${Date.now()}.png`;
        }
        
        const outputPath = path.join(CONFIG.outputDir, filename);

        process.stdout.write(`${progress} Scraping: ${targetUrl.substring(0, 50).padEnd(50)} `);
        
        let browser = null;
        try {
            // --- NUCLEAR ISOLATION START ---
            browser = await puppeteer.launch({
                headless: CONFIG.headless ? 'new' : false,
                args: [
                    '--no-sandbox', 
                    '--disable-setuid-sandbox',
                    '--disable-web-security',
                    '--disable-features=IsolateOrigins,site-per-process',
                    '--window-size=' + (CONFIG.width + 50) + ',' + (CONFIG.height + 150)
                ]
            });
            
            const page = await browser.newPage();
            
            await page.setViewport({
                width: CONFIG.width,
                height: CONFIG.height,
                deviceScaleFactor: CONFIG.scaleFactor
            });
            
            await page.setUserAgent(CONFIG.userAgent);
            await page.setExtraHTTPHeaders({
                'Accept-Language': 'en-US,en;q=0.9',
                'Upgrade-Insecure-Requests': '1'
            });
            
            await page.emulateMediaType('screen');
            // --- NUCLEAR ISOLATION END ---

            // Randomize delay
            const jitter = Math.floor(Math.random() * (CONFIG.baseDelay * 0.3)) - (CONFIG.baseDelay * 0.15);
            const pauseTime = Math.max(1000, CONFIG.baseDelay + jitter);
            
            await page.goto(targetUrl, { 
                waitUntil: 'domcontentloaded', 
                timeout: 60000 
            });

            // Simulate human behavior
            try {
                await page.mouse.move(100, 100);
                await page.mouse.move(200, 200, { steps: 10 });
            } catch (e) {}

            await sleep(pauseTime);

            await page.evaluate(() => {
                document.body.style.overflow = 'hidden';
            });
            
            await page.screenshot({
                path: outputPath,
                fullPage: CONFIG.fullPage,
                omitBackground: false
            });

            console.log('✅');
            successCount++;
            
            // Short cool-down between browser launches
            if (i < urls.length - 1) {
                 await sleep(1000 + Math.random() * 1000);
            }

        } catch (err) {
            console.log('❌');
            console.error(`       Error: ${err.message.split('\n')[0]}`);
            failCount++;
        } finally {
            if (browser) await browser.close();
        }
    }

    // Done loop - summary is next in file
    // Removing the outer browser close since we close inside loop

    
    // Summary JSON
    const summary = {
        total: urls.length,
        success: successCount,
        failed: failCount,
        outputDir: CONFIG.outputDir
    };
    fs.writeFileSync('scrape_summary.json', JSON.stringify(summary, null, 2));
})();
