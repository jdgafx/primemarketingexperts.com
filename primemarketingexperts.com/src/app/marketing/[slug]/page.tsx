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
        <main className="min-h-screen bg-[#fafaf8] font-montserrat">
            <Navbar />

            {/* Hero Section - Refined Beige Layout */}
            <section className="bg-[#f2f1ec] py-24 border-b border-gray-100">
                <div className="container mx-auto px-4 text-center">
                    <div className="max-w-4xl mx-auto">
                        <div className="w-20 h-20 bg-orange-100 rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-sm group-hover:scale-110 transition-transform">
                            <svg className="w-10 h-10 text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                        </div>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-[#1a1a1a] mb-6 leading-tight uppercase tracking-tight">
                            {content.title}
                        </h1>
                        <p className="text-xl md:text-2xl text-gray-700 font-medium max-w-2xl mx-auto leading-relaxed">
                            {content.subtitle}
                        </p>
                    </div>
                </div>
            </section>

            {/* Z-Pattern Content Sections */}
            <section className="py-24 space-y-24">
                {/* Section 1: Main Content (Text Left | Image Right) */}
                <div className="container mx-auto px-4">
                    <div className="flex flex-col lg:flex-row items-center gap-16">
                        <div className="lg:w-1/2 space-y-8 bg-white p-10 md:p-14 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-gray-50">
                            <h2 className="text-3xl md:text-4xl font-extrabold text-[#1a1a1a] leading-tight">
                                {content.mainHeading}
                            </h2>
                            <div className="space-y-6 text-lg text-gray-600 leading-relaxed font-medium">
                                {content.paragraphs.map((paragraph, index) => {
                                    if (content.relatedLinks && index === content.paragraphs.length - 1) {
                                        const linkInfo = content.relatedLinks[0];
                                        if (linkInfo && paragraph.includes(linkInfo.text)) {
                                            const parts = paragraph.split(linkInfo.text);
                                            return (
                                                <p key={index}>
                                                    {parts[0]}
                                                    <Link href={linkInfo.href} className="text-orange-600 hover:underline font-bold">
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
                            <Link href="/free-strategy-session" className="inline-block bg-gradient-to-r from-orange-500 to-orange-600 text-white px-10 py-4 rounded-xl font-bold uppercase tracking-wider hover:shadow-2xl transition-all active:scale-95">
                                Book Strategy Session
                            </Link>
                        </div>
                        <div className="lg:w-1/2">
                            <div className="relative group">
                                <div className="absolute -inset-4 bg-orange-500/10 rounded-[40px] blur-2xl group-hover:bg-orange-500/20 transition-all"></div>
                                <div className="relative aspect-video rounded-3xl overflow-hidden shadow-2xl">
                                    <Image
                                        src={content.image || '/marketing-general.jpg'}
                                        alt={content.title}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer CTA Bar */}
            <section className="bg-orange-500 py-6">
                <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-6">
                    <span className="text-white font-black text-2xl uppercase tracking-widest italic">Drive higher ROI with Prime.</span>
                    <Link href="/contact" className="bg-white text-orange-600 px-10 py-3 rounded-xl font-black uppercase hover:bg-gray-100 transition-colors shadow-xl">
                        Contact Now
                    </Link>
                </div>
            </section>

            <Footer />
        </main>
    );
}

