import { Metadata } from 'next';
import { services } from '@/lib/services';

export const metadata: Metadata = {
    title: 'Sitemap | Prime Marketing Experts',
    description: 'Sitemap for Prime Marketing Experts',
};

export default function Sitemap() {
    const baseUrl = 'https://primemarketingexperts.com';

    const staticRoutes = [
        '',
        '/services',
        '/services/ai-voice',
        '/services/ai-chatbot',
    ].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date().toISOString(),
        changeFrequency: 'monthly' as const,
        priority: route === '' ? 1 : 0.8,
    }));

    const serviceRoutes = services
        .filter(s => s.slug !== 'ai-voice' && s.slug !== 'ai-chatbot')
        .map((service) => ({
            url: `${baseUrl}/services/${service.slug}`,
            lastModified: new Date().toISOString(),
            changeFrequency: 'monthly' as const,
            priority: 0.8,
        }));

    return [...staticRoutes, ...serviceRoutes];
}
