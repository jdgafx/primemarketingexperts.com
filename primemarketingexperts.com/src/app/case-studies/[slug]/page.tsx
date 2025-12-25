import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { caseStudies } from '@/lib/case-studies';
import { Navbar, Footer } from '@/components/Layout';

interface PageProps {
    params: {
        slug: string;
    };
}

export function generateStaticParams() {
    return caseStudies.map((study) => ({
        slug: study.slug,
    }));
}

export default function CaseStudyPage({ params }: PageProps) {
    const study = caseStudies.find((s) => s.slug === params.slug);

    if (!study) {
        notFound();
    }

    return (
        <div className="bg-white min-h-screen font-poppins">
            <Navbar />

            {/* Hero Section */}
            <div className="bg-gray-900 text-white py-20 px-4">
                <div className="container mx-auto text-center max-w-4xl">
                    <h1 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
                        {study.title}
                    </h1>
                    <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                        {study.excerpt}
                    </p>
                </div>
            </div>

            {/* Content Section */}
            <div className="container mx-auto px-4 py-16 max-w-4xl">
                <div className="mb-12 rounded-xl overflow-hidden shadow-2xl relative h-[400px] w-full">
                    <Image
                        src={study.image}
                        alt={study.title}
                        fill
                        className="object-cover"
                        priority
                    />
                </div>

                <article className="prose prose-lg max-w-none text-gray-700">
                    {study.content.map((paragraph, index) => (
                        <p key={index} className="mb-6 leading-relaxed">
                            {paragraph.split('\n').map((line, i) => (
                                <span key={i}>
                                    {line}
                                    <br />
                                </span>
                            ))}
                        </p>
                    ))}
                </article>

                <div className="mt-16 pt-8 border-t border-gray-200">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                        <Link href="/#case-studies" className="text-orange-600 hover:text-orange-700 font-semibold flex items-center group">
                            <svg className="w-5 h-5 mr-2 transform group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                            </svg>
                            Back to Case Studies
                        </Link>

                        <Link href="/contact" className="bg-orange-600 text-white px-8 py-3 rounded-full hover:bg-orange-700 transition duration-300 shadow-lg hover:shadow-xl font-semibold">
                            Start Your Success Story
                        </Link>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
}
