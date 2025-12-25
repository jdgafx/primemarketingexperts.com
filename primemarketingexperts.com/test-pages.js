// Page tester - tests all pages on the clone site
const http = require('http');

const pages = [
    // Core pages
    '/',
    '/about',
    '/contact',
    '/blog',
    '/services',
    '/case-studies',
    '/marketing-services',
    '/free-strategy-session',

    // Industry pages
    '/industry/tourism',
    '/industry/automotive',
    '/industry/restaurant',
    '/industry/retail',
    '/industry/cleaning-companies',
    '/industry/gyms',
    '/industry/construction',
    '/industry/real-estate',
    '/industry/healthcare',

    // Marketing pages
    '/marketing/marketing-automation',
    '/marketing/seo-services',
    '/marketing/local-seo',
    '/marketing/video-seo',
    '/marketing/seo-web-design',
    '/marketing/content-marketing',
    '/marketing/social-media-marketing',
    '/marketing/email-marketing',
    '/marketing/text-message-marketing',
    '/marketing/inbound-marketing-services',
    '/marketing/marketing-plans',
    '/marketing/google-shopping-campaigns',
    '/marketing/search-engine-advertising',
    '/marketing/branding',
    '/marketing/google-grant-management',
    '/marketing/e-commerce-services',

    // Business pages
    '/business/market-research',
    '/business/operational-assessment',
    '/business/professional-business-plans',
    '/business/business-model-transformation',
    '/business/event-management',

    // Technology pages
    '/Technology/web-development',
    '/Technology/chatbot-development',
    '/Technology/mobile-app-development',
    '/Technology/website-accessibility',

    // AI Service pages
    '/services/ai-chatbot-assistant',
    '/services/ai-voice-receptionist',
    '/services/predictive-analytics',
    '/services/ai-content-generation',
    '/services/ai-lead-scoring',
    '/services/ai-ad-optimization',
    '/services/ai-email-personalization',
    '/services/ai-social-listening',
    '/services/ai-seo-assistant',
    '/services/ai-customer-journey',
];

const PORT = 3060;
const HOST = 'localhost';

async function testPage(path) {
    return new Promise((resolve) => {
        const req = http.get(`http://${HOST}:${PORT}${path}`, (res) => {
            resolve({ path, status: res.statusCode });
        });
        req.on('error', (err) => {
            resolve({ path, status: 'ERROR', error: err.message });
        });
        req.setTimeout(5000, () => {
            req.destroy();
            resolve({ path, status: 'TIMEOUT' });
        });
    });
}

async function runTests() {
    console.log(`\n🧪 Testing ${pages.length} pages on http://${HOST}:${PORT}\n`);
    console.log('='.repeat(70));

    const results = { pass: [], fail: [] };

    for (const page of pages) {
        const result = await testPage(page);
        const icon = result.status === 200 ? '✅' : '❌';
        console.log(`${icon} [${result.status}] ${result.path}`);

        if (result.status === 200) {
            results.pass.push(result.path);
        } else {
            results.fail.push({ path: result.path, status: result.status, error: result.error });
        }
    }

    console.log('\n' + '='.repeat(70));
    console.log(`\n📊 RESULTS: ${results.pass.length}/${pages.length} pages passed\n`);

    if (results.fail.length > 0) {
        console.log('❌ FAILED PAGES:');
        results.fail.forEach(f => {
            console.log(`   - ${f.path} (${f.status})${f.error ? ': ' + f.error : ''}`);
        });
    }

    console.log('\n');
}

runTests();
