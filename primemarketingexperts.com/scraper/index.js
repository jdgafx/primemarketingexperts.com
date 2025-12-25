const fs = require('fs');
const path = require('path');
const axios = require('axios');
const cheerio = require('cheerio');

// Configuration
const CONFIG = {
    urlsFile: path.join(__dirname, 'sitemap_urls.txt'),
    outputDir: path.join(__dirname, '../src/lib'),
    headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
    },
    delayMs: 200,
    concurrency: 1 // Keep safe to avoid rate limits
};

// Helper for delays
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Helper to sanitize text
const cleanText = (text) => text.replace(/\s+/g, ' ').trim();

// Main Scraper Function
async function scrape() {
    console.log('🚀 Starting PME Scraper...');

    // 1. Load URLs
    if (!fs.existsSync(CONFIG.urlsFile)) {
        console.error(`❌ Error: URLs file not found at ${CONFIG.urlsFile}`);
        process.exit(1);
    }

    const urls = fs.readFileSync(CONFIG.urlsFile, 'utf-8')
        .split('\n')
        .map(u => u.trim())
        .filter(u => u && u.startsWith('http'));

    console.log(`📋 Found ${urls.length} URLs to scrape.`);

    const services = [];
    const blogs = [];
    const caseStudies = [];
    let successCount = 0;
    let failCount = 0;

    // 2. Process URLs
    for (const [index, url] of urls.entries()) {
        try {
            process.stdout.write(`[${index + 1}/${urls.length}] Scraping ${url}... `);

            const { data } = await axios.get(url, { headers: CONFIG.headers });
            const $ = cheerio.load(data);

            // Extract Metadata
            let title = $('h1').first().text().trim() || $('title').text().trim();
            title = title.replace(' | Prime Marketing Experts', '');

            const description = $('meta[name="description"]').attr('content') || '';
            const slug = url.split('/').pop();

            // Determine Category
            let category = 'Other';
            if (url.includes('/marketing/')) category = 'Marketing';
            else if (url.includes('/business/')) category = 'Business';
            else if (url.includes('/Technology/')) category = 'Technology'; // Note: Source URLs have capital T
            else if (url.includes('/industry/')) category = 'Industry';

            // Extract Content
            // Strategy: Look for the main article body. 
            // - Often in <article>, <main>, or .content divs.
            // - Fallback to just grabbing paragraphs.
            const content = [];
            const selector = 'article .prose p, main .prose p, article p, main p, .entry-content p';

            $(selector).each((i, el) => {
                const text = cleanText($(el).text());
                // Filter out short/navigational text
                if (text.length > 50 && !content.includes(text)) {
                    content.push(text);
                }
            });

            // Fallback content extraction if empty
            if (content.length === 0) {
                $('div p').each((i, el) => {
                    const text = cleanText($(el).text());
                    if (text.length > 60 && !content.includes(text)) {
                        content.push(text);
                    }
                });
            }

            const item = {
                slug,
                title,
                description,
                category,
                content: content.slice(0, 15), // Grab first 15 paragraphs to avoid huge payloads
                image: '/images/hero-bg-2.png', // Placeholder, ideally scrape og:image
                fullContent: content
            };

            // Scrape Image if available (og:image)
            const ogImage = $('meta[property="og:image"]').attr('content');
            if (ogImage) {
                // Determine if we need to download it or just link it. 
                // For now, let's keep the placeholder or use the remote URL?
                // Using remote URL might result in mixed content or hotlinking issues later.
                // Sticking to placeholder for safety, or check if it's a relative path.
                // item.image = ogImage; // Uncomment if you want to use the scraped image URL
            }

            // Categorize
            if (url.includes('/blog/')) {
                // Add Blog specific fields
                const dateStr = $('meta[property="article:published_time"]').attr('content') || new Date().toISOString();
                item.publishedAt = dateStr;
                item.author = 'Prime Marketing Experts'; // Default
                blogs.push(item);
            } else if (url.includes('/case-studies/')) {
                caseStudies.push(item);
            } else if (['Marketing', 'Business', 'Technology', 'Industry'].includes(category)) {
                services.push(item);
            }

            console.log('✅');
            successCount++;

            // Respectful Delay
            await delay(CONFIG.delayMs);

        } catch (e) {
            console.log(`❌ (${e.message})`);
            failCount++;
        }
    }

    // 3. Output Results
    // Helper to write TS files
    const writeTS = (filename, varName, data, typeImport = '') => {
        const filePath = path.join(CONFIG.outputDir, filename);
        const content = `${typeImport}
export const ${varName} = ${JSON.stringify(data, null, 2)};
`;
        fs.writeFileSync(filePath, content);
        console.log(`💾 Saved ${data.length} items to ${filename}`);
    };

    console.log('\n📦 Generarting Output Files...');

    // Services
    writeTS('services_scraped.ts', 'scrapedServices', services, "import { Service } from './types';");

    // Blogs
    // Align with BlogPost interface: slug, title, description, category, content, image, publishedAt, author
    writeTS('blog_scraped.ts', 'scrapedBlogPosts', blogs, "import { BlogPost } from './types';");

    // Case Studies (Optional, if we have a type for it)
    // writeTS('case_studies_scraped.ts', 'scrapedCaseStudies', caseStudies);

    console.log(`\n🎉 Scraper Finished!`);
    console.log(`   Success: ${successCount}`);
    console.log(`   Failed:  ${failCount}`);
    console.log(`   Services: ${services.length}`);
    console.log(`   Blogs:    ${blogs.length}`);
}

scrape().catch(err => {
    console.error('Fatal Error:', err);
    process.exit(1);
});
