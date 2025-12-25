// Complete PME Navigation Structure - EXACT match to original site
// Plus slipstreamed AI Services

export interface NavItem {
    label: string;
    href: string;
    isHighlighted?: boolean;
}

export interface NavDropdown {
    label: string;
    items: NavItem[];
    isHighlighted?: boolean;
}

export type NavElement = NavItem | NavDropdown;

export function isDropdown(item: NavElement): item is NavDropdown {
    return 'items' in item;
}

// WHO WE SERVE - Industry pages
export const whoWeServeItems: NavItem[] = [
    { label: "Tourism", href: "/industry/tourism" },
    { label: "Automotive", href: "/industry/automotive" },
    { label: "Restaurants", href: "/industry/restaurant" },
    { label: "Retail", href: "/industry/retail" },
    { label: "Cleaning Companies", href: "/industry/cleaning-companies" },
    { label: "Gyms", href: "/industry/gyms" },
    { label: "Construction", href: "/industry/construction" },
    { label: "Real Estate", href: "/industry/real-estate" },
    { label: "Healthcare", href: "/industry/healthcare" },
];

// BUSINESS - Business services
export const businessItems: NavItem[] = [
    { label: "Market Research", href: "/business/market-research" },
    { label: "Operational Assessment", href: "/business/operational-assessment" },
    { label: "Professional Business Plans", href: "/business/professional-business-plans" },
    { label: "Business Model Transformation", href: "/business/business-model-transformation" },
    { label: "Event Management", href: "/business/event-management" },
];

// MARKETING - Marketing services (EXACT match to PME)
export const marketingItems: NavItem[] = [
    { label: "Marketing Automation", href: "/marketing/marketing-automation" },
    { label: "SEO Services", href: "/marketing/seo-services" },
    { label: "Local SEO", href: "/marketing/local-seo" },
    { label: "Video SEO", href: "/marketing/video-seo" },
    { label: "SEO Web Design", href: "/marketing/seo-web-design" },
    { label: "Content Marketing", href: "/marketing/content-marketing" },
    { label: "Social Media Marketing", href: "/marketing/social-media-marketing" },
    { label: "Email Marketing", href: "/marketing/email-marketing" },
    { label: "Text Message Marketing", href: "/marketing/text-message-marketing" },
    { label: "Inbound Marketing", href: "/marketing/inbound-marketing-services" },
    { label: "Marketing Plans", href: "/marketing/marketing-plans" },
    { label: "Google Shopping Campaigns", href: "/marketing/google-shopping-campaigns" },
    { label: "Search Engine Advertising", href: "/marketing/search-engine-advertising" },
    { label: "Branding", href: "/marketing/branding" },
    { label: "Google Grant Management", href: "/marketing/google-grant-management" },
    { label: "E-Commerce Services", href: "/marketing/e-commerce-services" },
];

// TECHNOLOGY - Technology services
export const technologyItems: NavItem[] = [
    { label: "Web Development", href: "/Technology/web-development" },
    { label: "Chatbot Development", href: "/Technology/chatbot-development" },
    { label: "Mobile App Development", href: "/Technology/mobile-app-development" },
    { label: "Website Accessibility", href: "/Technology/website-accessibility" },
];

// AI SERVICES - NEW (Top 10 - Slipstreamed)
export const aiServicesItems: NavItem[] = [
    { label: "AI Chatbot Assistant", href: "/services/ai-chatbot-assistant", isHighlighted: true },
    { label: "AI Voice Receptionist", href: "/services/ai-voice-receptionist", isHighlighted: true },
    { label: "Predictive Analytics", href: "/services/predictive-analytics", isHighlighted: true },
    { label: "AI Content Generation", href: "/services/ai-content-generation", isHighlighted: true },
    { label: "AI Lead Scoring", href: "/services/ai-lead-scoring", isHighlighted: true },
    { label: "AI Ad Optimization", href: "/services/ai-ad-optimization", isHighlighted: true },
    { label: "AI Email Personalization", href: "/services/ai-email-personalization", isHighlighted: true },
    { label: "AI Social Listening", href: "/services/ai-social-listening", isHighlighted: true },
    { label: "AI SEO Assistant", href: "/services/ai-seo-assistant", isHighlighted: true },
    { label: "AI Customer Journey", href: "/services/ai-customer-journey", isHighlighted: true },
];

// Main navigation structure (EXACT to PME + AI)
export const mainNavigation: NavElement[] = [
    { label: "About", href: "/about" },
    { label: "Who We Serve", items: whoWeServeItems },
    { label: "Business", items: businessItems },
    { label: "Marketing", items: marketingItems },
    { label: "Technology", items: technologyItems },
    { label: "AI Services", items: aiServicesItems, isHighlighted: true },
    { label: "Blog", href: "/blog" },
    { label: "Contact", href: "/contact" },
];

// Footer services list
export const footerServices: NavItem[] = [
    { label: "Marketing Automation", href: "/marketing/marketing-automation" },
    { label: "Search Engine Optimization – SEO", href: "/marketing/local-seo" },
    { label: "Search Engine Advertising", href: "/marketing/google-shopping-campaigns" },
    { label: "Inbound Marketing Services", href: "/marketing/inbound-marketing-services" },
    { label: "Marketing Plan Services", href: "/marketing/marketing-plans" },
    { label: "Social Media Marketing", href: "/marketing/social-media-marketing" },
    { label: "Content Marketing Services", href: "/marketing/content-marketing" },
    { label: "Email Marketing Services", href: "/marketing/email-marketing" },
    { label: "Event Management Services", href: "/business/event-management" },
    { label: "Text Message Marketing", href: "/marketing/text-message-marketing" },
    { label: "Chatbot Development Services", href: "/Technology/chatbot-development" },
    // AI slipstream
    { label: "AI Chatbot Assistant", href: "/services/ai-chatbot-assistant", isHighlighted: true },
];

// All pages that need to exist (for sitemap and route generation)
export const allPages = [
    // Core pages
    "/",
    "/about",
    "/contact",
    "/blog",
    "/services",
    "/case-studies",
    "/marketing-services",
    "/free-strategy-session",

    // Industry pages
    ...whoWeServeItems.map(i => i.href),

    // Business pages
    ...businessItems.map(i => i.href),

    // Marketing pages
    ...marketingItems.map(i => i.href),

    // Technology pages
    ...technologyItems.map(i => i.href),

    // AI Services pages
    ...aiServicesItems.map(i => i.href),
];
