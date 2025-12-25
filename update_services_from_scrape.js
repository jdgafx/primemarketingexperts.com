const fs = require('fs');
const path = require('path');

const servicesPath = './primemarketingexperts.com/src/lib/services.ts';
const contentPath = './scraped_content/extracted_content_full.json';

const servicesContent = fs.readFileSync(servicesPath, 'utf8');
const scrapedContent = JSON.parse(fs.readFileSync(contentPath, 'utf8'));

// Mapping from slug (in services.ts) to key (in json)
const mapping = {
    'web-development': 'Technology_web-development',
    'marketing-automation': 'marketing_marketing-automation',
    'google-shopping-campaigns': 'marketing_google-shopping-campaigns',
    'video-seo': 'marketing_video-seo',
    'social-media-marketing': 'marketing_social-media-marketing',
    'text-message-marketing': 'marketing_text-message-marketing',
    'content-marketing': 'marketing_content-marketing',
    'seo-web-design': 'marketing_seo-web-design'
};

let newServiceFile = servicesContent;
let updatedCount = 0;

for (const [slug, scrapeKey] of Object.entries(mapping)) {
    const data = scrapedContent[scrapeKey];
    if (!data) {
        console.warn(`No scraped content found for key: ${scrapeKey} (slug: ${slug})`);
        continue;
    }

    const newParagraphs = data.paragraphs; // Array of strings

    // Create the string representation of the new fullContent
    const formattedContent = newParagraphs.map(p => `      "${p.replace(/"/g, '\\"')}"`).join(',\n');

    // Regex to find the object with this slug.
    // We look for: "slug": "slug" ... fullContent: [ ... ]
    // matches lazily.
    // Note the quotes around "slug" key.

    const slugPattern = `"slug":\\s*"${slug}"`;
    // Regex Breakdown:
    // 1. Group 1: ("slug": "slug" ... fullContent: [)  -> captures everything up to the start of the array
    // 2. Group 2: ( ... ) -> captures the array content inside brackets (lazyily)
    // 3. Group 3: (]) -> captures the closing bracket

    const regex = new RegExp(`(${slugPattern}[\\s\\S]*?"fullContent":\\s*\\[)([\\s\\S]*?)(\\])`, 'm');

    if (regex.test(newServiceFile)) {
        newServiceFile = newServiceFile.replace(regex, `$1\n${formattedContent}\n    $3`);
        console.log(`Updated content for ${slug}`);
        updatedCount++;
    } else {
        console.warn(`Could not match structure for ${slug} in services.ts`);
        // Debug advice: print snippet
        const snippetIndex = newServiceFile.indexOf(`"${slug}"`);
        if (snippetIndex !== -1) {
            console.log(`Debug: Found slug at index ${snippetIndex}, extracting context...`);
            console.log(newServiceFile.substring(snippetIndex - 20, snippetIndex + 200).replace(/\n/g, '\\n'));
        }
    }
}

if (updatedCount > 0) {
    fs.writeFileSync(servicesPath, newServiceFile);
    console.log(`Successfully updated ${updatedCount} services in ${servicesPath}`);
} else {
    console.log("No updates were made.");
}
