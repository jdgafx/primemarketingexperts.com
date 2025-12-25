const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');
const readline = require('readline');

// Configuration
const SITEMAP_FILE = 'sitemap_urls.txt';
const OUTPUT_DIR = path.join(__dirname, 'src/visual_scrapes');
const CONCURRENCY = 1; // Run sequentially to avoid rate limiting
const DELAY_MS = 2000; // 2 second delay between requests

async function ensureDirectoryExists(dir) {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
}

function getFilenameFromUrl(url) {
    try {
        const urlObj = new URL(url);
        let pathname = urlObj.pathname;

        if (pathname === '/' || pathname === '') {
            return 'home.png';
        }

        // Remove leading/trailing slashes and replace others with underscores
        let filename = pathname.replace(/^\/+|\/+$/g, '').replace(/\//g, '_');

        // Handle excessively long filenames
        if (filename.length > 200) {
            filename = filename.substring(0, 200); // Truncate
        }

        return `${filename}.png`;
    } catch (e) {
        console.error(`Error parsing URL ${url}:`, e);
        return `unknown_${Date.now()}.png`;
    }
}

async function scrapeUrl(browser, url, index, total) {
    const page = await browser.newPage();
    try {
        console.log(`[${index + 1}/${total}] Navigating to: ${url}`);

        // Set viewport to a standard desktop size
        await page.setViewport({ width: 1440, height: 1080 });

        // Configure timeouts and navigation
        await page.setDefaultNavigationTimeout(60000);

        // Go to URL
        const response = await page.goto(url, { waitUntil: 'networkidle2' });

        if (!response.ok()) {
            console.error(`❌ Failed to load ${url}: ${response.status()} ${response.statusText()}`);
            return;
        }

        const filename = getFilenameFromUrl(url);
        const filepath = path.join(OUTPUT_DIR, filename);

        // Take full page screenshot
        await page.screenshot({ path: filepath, fullPage: true });
        console.log(`✅ Saved screenshot: ${filename}`);

    } catch (error) {
        console.error(`❌ Error capturing ${url}:`, error.message);
    } finally {
        await page.close();
    }

    // Scraper politeness delay
    await new Promise(resolve => setTimeout(resolve, DELAY_MS));
}

async function main() {
    await ensureDirectoryExists(OUTPUT_DIR);

    const fileStream = fs.createReadStream(SITEMAP_FILE);
    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity
    });

    const urls = [];
    for await (const line of rl) {
        if (line.trim()) {
            urls.push(line.trim());
        }
    }

    console.log(`Found ${urls.length} URLs to scrape.`);

    const browser = await puppeteer.launch({
        headless: 'new',
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    try {
        for (let i = 0; i < urls.length; i++) {
            await scrapeUrl(browser, urls[i], i, urls.length);
        }
    } finally {
        await browser.close();
        console.log('🏁 Visual scraping complete.');
    }
}

main().catch(console.error);
