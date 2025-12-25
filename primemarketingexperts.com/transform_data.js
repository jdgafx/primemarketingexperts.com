const fs = require('fs');

// We need to read the file content as text because it's a TS file, not pure JSON.
// simplified approach: read the file, extract the array part, or just require it if we can compile it.
// Since it is TS, we can't require it directly in Node.js without ts-node.
// We will manually parse the file content assuming standard format from earlier scraper.

const scrapedContent = fs.readFileSync('src/lib/services_scraped.ts', 'utf-8');
// Extract the array using regex or simple matching
const match = scrapedContent.match(/export const services: Service\[\] = (\[[\s\S]*?\]);/);

if (!match) {
    console.error("Could not find services array in scraped file");
    process.exit(1);
}

const servicesRaw = JSON.parse(match[1]);

function getIcon(slug) {
    if (slug.includes('web')) return 'globe';
    if (slug.includes('seo')) return 'search';
    if (slug.includes('social')) return 'share-2';
    if (slug.includes('mail')) return 'mail';
    if (slug.includes('content')) return 'file-text';
    if (slug.includes('branding')) return 'pen-tool';
    if (slug.includes('video')) return 'video';
    if (slug.includes('shop')) return 'shopping-cart';
    if (slug.includes('bot')) return 'message-circle';
    if (slug.includes('market-research')) return 'bar-chart-2';
    if (slug.includes('event')) return 'calendar';
    return 'check-circle'; // default
}

const cleanedServices = servicesRaw.map(s => ({
    slug: s.slug,
    title: s.title.split('ServicesContact')[0].trim(), // Clean up title artifact
    tagline: s.category + " Excellence",
    description: s.description || s.content[0] || "Professional services.",
    icon: getIcon(s.slug),
    category: s.category,
    fullContent: s.content
}));

// ADD AI SERVICES
cleanedServices.push(
    {
        slug: 'ai-chatbot',
        title: 'AI Chatbot Assistant',
        tagline: '24/7 Customer Engagement',
        description: 'Intelligent chatbots that handle customer inquiries, book appointments, and qualify leads automatically.',
        icon: 'message-circle',
        category: 'Technology',
        fullContent: [
            "Our AI Chatbot Assistant provides 24/7 intelligent customer support. It learns from interactions to provide increasingly accurate responses and can handle complex booking and qualification tasks.",
            "Stop losing leads after hours. Our AI assistants work around the clock to ensure every visitor gets immediate attention."
        ]
    },
    {
        slug: 'ai-voice',
        title: 'AI Voice Receptionist',
        tagline: 'Never Miss a Call',
        description: 'Natural-sounding AI voice agents that handle inbound calls, routing, and basic inquiries with human-like conversation.',
        icon: 'mic',
        category: 'Technology',
        fullContent: [
            "Our AI Voice Receptionist ensures you never miss a business opportunity. It handles high call volumes, routes calls to the right departments, and provides answers to common questions with a natural, human-like voice.",
            "Seamlessly integrate with your existing CRM and calendar systems."
        ]
    }
);

const fileContent = `import { Service } from './types';

export const services: Service[] = ${JSON.stringify(cleanedServices, null, 2)};`;

fs.writeFileSync('src/lib/services.ts', fileContent);
console.log(`Successfully wrote ${cleanedServices.length} services to src/lib/services.ts`);

// Handle Blog
const blogScrapedContent = fs.readFileSync('src/lib/blog_scraped.ts', 'utf-8');
fs.writeFileSync('src/lib/blog.ts', blogScrapedContent.replace('export const blogPosts =', `import { BlogPost } from './types';\n\nexport const blogPosts: BlogPost[] =`));
console.log('Successfully updated src/lib/blog.ts');
