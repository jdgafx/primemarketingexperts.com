const fs = require('fs');
const axios = require('axios');
const cheerio = require('cheerio');

async function scrape() {
    const urls = fs.readFileSync('sitemap_urls.txt', 'utf-8').split('\n').filter(Boolean);
    const services = [];
    const blogs = [];
    const caseStudies = [];

    // Limit concurrency to avoid 429s, maybe process sequentially with delay
    for (const url of urls) {
        try {
            console.log(`Scraping ${url}...`);
            const { data } = await axios.get(url, {
                headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36' }
            });
            const $ = cheerio.load(data);

            const title = $('h1').text().trim() || $('title').text().trim();
            const description = $('meta[name="description"]').attr('content') || '';
            const content = [];

            // Heuristic to find main content: typically in <main>, <article>, or just paragraphs after h1
            $('main p, article p, .prose p').each((i, el) => {
                const text = $(el).text().trim();
                if (text.length > 50) content.push(text);
            });

            // Fallback if content is empty (common in some react sites if not fully hydrated or in weird divs)
            if (content.length === 0) {
                $('div p').each((i, el) => {
                    const text = $(el).text().trim();
                    if (text.length > 50 && !content.includes(text)) content.push(text);
                });
            }

            const slug = url.split('/').pop();
            const category = url.includes('/marketing/') ? 'Marketing' :
                url.includes('/business/') ? 'Business' :
                    url.includes('/Technology/') ? 'Technology' :
                        url.includes('/industry/') ? 'Industry' : 'Other';

            const item = {
                slug,
                title: title.replace(' | Prime Marketing Experts', ''),
                description,
                category,
                content: content.slice(0, 10), // Limit checks
                image: '/hero-bg-2.png' // Default placeholder, maybe scrape og:image later
            };

            if (url.includes('/blog/')) {
                blogs.push(item);
            } else if (url.includes('/case-studies/')) {
                caseStudies.push(item);
            } else if (['Marketing', 'Business', 'Technology'].includes(category)) {
                services.push(item);
            }

            await new Promise(r => setTimeout(r, 200)); // 200ms delay

        } catch (e) {
            console.error(`Failed to scrape ${url}: ${e.message}`);
        }
    }

    // Output Services TS
    const servicesContent = `import { Service } from './types';

export const services: Service[] = ${JSON.stringify(services, null, 2)};`;

    fs.writeFileSync('src/lib/services_scraped.ts', servicesContent);

    // Output Blog TS
    // Blog usually needs date, author, etc. We'll stub them.
    const blogContent = `export const blogPosts = ${JSON.stringify(blogs.map(b => ({
        ...b,
        publishedAt: new Date().toISOString(),
        author: 'Prime Marketing Experts',
        fullContent: b.content
    })), null, 2)};`;

    fs.writeFileSync('src/lib/blog_scraped.ts', blogContent);

    console.log(`Scraped ${services.length} services and ${blogs.length} blogs.`);
}

scrape();
