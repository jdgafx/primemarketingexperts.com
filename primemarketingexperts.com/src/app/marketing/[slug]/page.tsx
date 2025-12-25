import { Navbar, Footer } from '@/components/Layout';
import Link from 'next/link';
import Image from 'next/image';
import { getMarketingContent, marketingContent } from '@/lib/marketing-content';
import { notFound } from 'next/navigation';

// Generate static params for all marketing pages
export function generateStaticParams() {
    return marketingContent.map((content) => ({
        slug: content.slug,
    }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const content = getMarketingContent(slug);

    if (!content) {
        return { title: 'Marketing Service Not Found' };
    }

    return {
        title: `${content.title} | Prime Marketing Experts`,
        description: content.subtitle,
    };
}

export default async function MarketingServicePage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const content = getMarketingContent(slug);

    if (!content) {
        notFound();
    }

    return (
        <main className="min-h-screen flex flex-col font-sans">
            <Navbar />

            <section>
                {/* Hero Section - matching PME exactly */}
                <div className="bg-gradient-to-r from-orange-50 to-red-50 py-8 md:py-16">
                    <div className="container mx-auto px-4 max-w-4xl">
                        <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4 md:mb-6 leading-tight md:leading-tight text-center">
                            {content.title}
                        </h1>
                        <p className="text-base md:text-lg text-gray-600 leading-relaxed md:leading-relaxed text-center max-w-2xl mx-auto">
                            {content.subtitle}
                        </p>
                    </div>
                </div>

                {/* Main Content Section - blue background like PME */}
                <div className="mb-10 bg-blue-50 p-2 md:p-6 container mt-10">
                    <div className="flex flex-col">
                        <h2 className="font-bold text-4xl mb-6">
                            {content.mainHeading}
                        </h2>

                        <div className="flex flex-col lg:flex-row gap-8 lg:gap-20">
                            <div className="space-y-6 w-full lg:w-11/12 mt-4">
                                {content.paragraphs.map((paragraph, index) => {
                                    // Check if this paragraph contains a related link
                                    if (content.relatedLinks && index === content.paragraphs.length - 1) {
                                        // Parse the paragraph for link insertion
                                        const linkInfo = content.relatedLinks[0];
                                        if (linkInfo && paragraph.includes(linkInfo.text)) {
                                            const parts = paragraph.split(linkInfo.text);
                                            return (
                                                <p key={index}>
                                                    {parts[0]}
                                                    <Link href={linkInfo.href} className="text-blue-600 hover:underline">
                                                        {linkInfo.text}
                                                    </Link>
                                                    {parts[1]}
                                                </p>
                                            );
                                        }
                                    }
                                    return <p key={index}>{paragraph}</p>;
                                })}
                            </div>

                            {/* Optional image section */}
                            {content.image && (
                                <div className="w-full mt-10 h-full">
                                    <Image
                                        src={content.image}
                                        alt={content.title}
                                        width={1200}
                                        height={1000}
                                        className="w-full h-auto"
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
