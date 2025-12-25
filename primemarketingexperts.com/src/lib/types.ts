export interface Service {
    slug: string;
    title: string;
    tagline: string;
    description: string;
    icon: string;
    category: string; // 'Technology' | 'Marketing' | 'Business'
    fullContent: string[];
}

export interface BlogPost {
    slug: string;
    title: string;
    description: string;
    category: string;
    content: string[];
    image: string;
    publishedAt: string; // ISO date string
    author: string;
    fullContent?: string[]; // Optional if sometimes missing, but scraped data has it
}
