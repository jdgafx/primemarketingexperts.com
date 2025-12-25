// Exact content from PME's scraped pages - marketing services
export interface MarketingPageContent {
    slug: string;
    title: string;
    subtitle: string;
    mainHeading: string;
    paragraphs: string[];
    relatedLinks?: { href: string; text: string }[];
    image?: string;
}

export const marketingContent: MarketingPageContent[] = [
    {
        slug: 'seo-web-design',
        title: 'SEO Web Design',
        subtitle: 'Discover the latest insights, trends, and strategies in SEO web design, digital visibility, and business growth.',
        mainHeading: 'Web Design That Strengthens Search Engine Ranking',
        paragraphs: [
            'We offer SEO Web Design as a means to optimize your website structure to further strengthen search engine ranking improvements and increase customer lifetime value. In addition, this helps your company streamline lead nurturing and reduce customer acquisition costs. In turn, an exceptional SEO web design helps the search engines efficiently crawl your website. We analyze and optimize the following factors in this service: menu navigation, meta tags, keyword-targeted URL structure, and mobile usability.',
            'Our team pays particular attention to improving your website speed, which helps your business rank better on Google and Bing. We can also create visual content that resonates with the target clientele of your business and increase the time spent on your website.',
            'Our team integrates the best SEO web design practices when we develop a new website, and we can in many cases perform these services on your current website.'
        ],
        relatedLinks: [
            { href: '/Technology/web-development', text: 'develop a new website' }
        ]
    },
    {
        slug: 'social-media-marketing',
        title: 'Social Media Marketing',
        subtitle: 'Engage your audience and grow your brand with strategic social media marketing services.',
        mainHeading: 'Strategic Social Media Marketing Services',
        paragraphs: [
            'We provide social media posting and sponsored ad management services. Our AI-assisted system ensures that we post the right content at the right time!',
            'Our team creates engaging content tailored to your target audience across all major platforms including Facebook, Instagram, LinkedIn, and Twitter. We develop comprehensive social media strategies that align with your business goals.',
            'We handle everything from content creation and scheduling to community management and paid advertising campaigns, helping you build a strong online presence and connect with your customers.'
        ]
    },
    {
        slug: 'marketing-automation',
        title: 'Marketing Automation',
        subtitle: 'Streamline your marketing and sales processes with powerful automation solutions.',
        mainHeading: 'Marketing Automation That Drives Results',
        paragraphs: [
            'We increase your sales productivity by using an integrated technology platform with synergistic marketing initiatives to spark your sales growth.',
            'Our marketing automation services help you nurture leads automatically, score prospects based on their engagement, and deliver personalized content at the right time in the buyer\'s journey.',
            'We implement and configure leading marketing automation platforms to help you streamline repetitive tasks, improve lead management, and gain valuable insights into your marketing performance.'
        ]
    },
    {
        slug: 'text-message-marketing',
        title: 'Text Message Marketing',
        subtitle: 'Reach your customers instantly with high-engagement text message campaigns.',
        mainHeading: 'Text Message Marketing Services',
        paragraphs: [
            'Our full-service text message marketing solution efficiently reaches your customers, as an average of 98% of them are read.',
            'Text message marketing provides one of the highest engagement rates of any marketing channel. We help you build subscriber lists, create compelling messages, and automate campaigns.',
            'From promotional offers to appointment reminders and customer service updates, our SMS marketing solutions help you stay connected with your audience in real-time.'
        ]
    },
    {
        slug: 'video-seo',
        title: 'Video SEO',
        subtitle: 'Optimize your video content for search engines and maximize visibility.',
        mainHeading: 'Video SEO Services',
        paragraphs: [
            'We deploy an integrated, comprehensive strategy to help you raise your search engine rankings for your targeted keywords through video content optimization.',
            'Video content is increasingly important for SEO. We optimize your videos for YouTube, Google, and other platforms to help you reach a wider audience.',
            'Our video SEO services include keyword research, title and description optimization, thumbnail creation, and video schema markup implementation.'
        ]
    },
    {
        slug: 'google-shopping-campaigns',
        title: 'Google Shopping Campaigns',
        subtitle: 'Drive product sales with optimized Google Shopping advertising campaigns.',
        mainHeading: 'Google Shopping Campaign Services',
        paragraphs: [
            'We deploy ROI-maximizing processes to strategically implement and manage your Search Engine Advertising Campaigns.',
            'Google Shopping campaigns put your products in front of customers who are actively searching to buy. We optimize your product feeds, bid strategies, and campaign structure for maximum return.',
            'Our team continuously monitors and adjusts your campaigns based on performance data to ensure you\'re getting the best possible results from your advertising budget.'
        ]
    },
    {
        slug: 'content-marketing',
        title: 'Content Marketing',
        subtitle: 'Build authority and attract customers with strategic content marketing.',
        mainHeading: 'Content Marketing Services',
        paragraphs: [
            'Content marketing is the foundation of a successful digital marketing strategy. We create valuable, relevant content that attracts and engages your target audience.',
            'From blog posts and articles to whitepapers, case studies, and infographics, we develop content that positions your business as an industry authority.',
            'Our content marketing approach focuses on creating material that addresses your audience\'s pain points and guides them through the buyer\'s journey.'
        ]
    },
    {
        slug: 'email-marketing',
        title: 'Email Marketing',
        subtitle: 'Build relationships and drive conversions with effective email campaigns.',
        mainHeading: 'Email Marketing Services',
        paragraphs: [
            'Email marketing remains one of the most effective channels for nurturing leads and driving conversions. We help you build and segment your email lists for maximum impact.',
            'Our email marketing services include campaign strategy, template design, copywriting, automation setup, and performance analysis.',
            'We create email sequences that guide prospects through your sales funnel while maintaining strong relationships with existing customers.'
        ]
    },
    {
        slug: 'local-seo',
        title: 'Local SEO',
        subtitle: 'Dominate local search results and attract nearby customers.',
        mainHeading: 'Local SEO Services',
        paragraphs: [
            'Local SEO is essential for businesses serving specific geographic areas. We optimize your online presence to appear prominently in local search results.',
            'Our local SEO services include Google Business Profile optimization, local citation building, review management, and location-specific content creation.',
            'We help you appear in Google\'s local pack, Maps results, and organic listings when potential customers search for businesses like yours in their area.'
        ]
    },
    {
        slug: 'inbound-marketing-services',
        title: 'Inbound Marketing Services',
        subtitle: 'Attract, engage, and delight customers with inbound marketing methodology.',
        mainHeading: 'Inbound Marketing Services',
        paragraphs: [
            'Inbound marketing focuses on attracting customers through valuable content and experiences tailored to them, rather than interrupting them with unwanted messages.',
            'We develop comprehensive inbound strategies that combine content marketing, SEO, social media, and marketing automation to attract qualified leads.',
            'Our approach helps you build trust with your audience and establish your business as a helpful resource in your industry.'
        ]
    },
    {
        slug: 'marketing-plans',
        title: 'Marketing Plans',
        subtitle: 'Develop a comprehensive marketing strategy aligned with your business goals.',
        mainHeading: 'Marketing Plan Services',
        paragraphs: [
            'A well-crafted marketing plan is essential for achieving your business objectives. We develop customized marketing strategies based on your unique goals and market position.',
            'Our marketing planning process includes market research, competitive analysis, audience identification, channel selection, and budget allocation.',
            'We deliver actionable marketing plans with clear timelines, KPIs, and implementation guidelines to help you execute effectively.'
        ]
    },
    {
        slug: 'branding',
        title: 'Branding',
        subtitle: 'Build a strong brand identity that resonates with your target audience.',
        mainHeading: 'Branding Services',
        paragraphs: [
            'Your brand is more than just a logo – it\'s the complete experience customers have with your business. We help you develop a cohesive brand identity.',
            'Our branding services include brand strategy, visual identity design, messaging development, and brand guidelines creation.',
            'We ensure your brand communicates your values, differentiates you from competitors, and connects emotionally with your target audience.'
        ]
    },
    {
        slug: 'google-grant-management',
        title: 'Google Grant Management',
        subtitle: 'Maximize your nonprofit\'s Google Ad Grant to reach more people.',
        mainHeading: 'Google Ad Grant Management Services',
        paragraphs: [
            'The Google Ad Grant program provides eligible nonprofits with up to $10,000 per month in free Google Ads advertising. We help you maximize this valuable resource.',
            'Our team manages your grant account to ensure compliance with Google\'s requirements while optimizing campaigns for maximum impact.',
            'We handle everything from account setup and campaign creation to ongoing optimization and reporting.'
        ]
    },
    {
        slug: 'e-commerce-services',
        title: 'E-Commerce Services',
        subtitle: 'Grow your online store with comprehensive e-commerce marketing solutions.',
        mainHeading: 'E-Commerce Marketing Services',
        paragraphs: [
            'E-commerce success requires a multi-faceted approach to digital marketing. We help online retailers attract more customers and increase sales.',
            'Our e-commerce services include product page optimization, shopping feed management, email marketing automation, and conversion rate optimization.',
            'We understand the unique challenges of selling online and tailor our strategies to help you compete effectively in the digital marketplace.'
        ]
    }
];

export function getMarketingContent(slug: string): MarketingPageContent | undefined {
    return marketingContent.find(content => content.slug === slug);
}
