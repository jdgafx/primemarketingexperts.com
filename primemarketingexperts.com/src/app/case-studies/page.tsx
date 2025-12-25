import { Navbar, Footer } from '@/components/Layout';
import Link from 'next/link';
import Image from 'next/image';
import { caseStudies } from '@/lib/case-studies';

export const metadata = {
    title: 'Case Studies | Prime Marketing Experts',
    description: 'See how Prime Marketing Experts has helped Boston-area businesses achieve remarkable growth through strategic marketing solutions.',
};

export default function CaseStudiesPage() {
    return (
        <main className="min-h-screen bg-white">
            <Navbar />

            {/* Hero Section */}
            <section className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white py-24 overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(234,88,12,0.4) 0%, transparent 40%)' }}></div>
                </div>
                <div className="container mx-auto px-4 relative z-10">
                    <div className="max-w-4xl mx-auto text-center">
                        <span className="inline-block bg-orange-500/20 text-orange-400 px-4 py-2 rounded-full text-sm font-semibold mb-6 uppercase tracking-wider">
                            Success Stories
                        </span>
                        <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                            Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600">Case Studies</span>
                        </h1>
                        <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                            Discover how we've helped businesses like yours achieve extraordinary results through strategic marketing and innovative solutions.
                        </p>
                    </div>
                </div>
            </section>

            {/* Stats Bar */}
            <section className="py-12 bg-gray-50 border-b">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                        {[
                            { value: '500+', label: 'Clients Served' },
                            { value: '150%', label: 'Avg. Traffic Increase' },
                            { value: '3x', label: 'Lead Generation' },
                            { value: '95%', label: 'Client Retention' },
                        ].map((stat, idx) => (
                            <div key={idx}>
                                <div className="text-3xl md:text-4xl font-bold text-orange-600">{stat.value}</div>
                                <div className="text-gray-600 text-sm mt-1">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Case Studies Grid */}
            <section className="py-20">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {caseStudies.map((study) => (
                            <Link
                                key={study.slug}
                                href={`/case-studies/${study.slug}`}
                                className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100"
                            >
                                <div className="relative h-56 overflow-hidden">
                                    <Image
                                        src={study.image || '/case-study-placeholder.jpg'}
                                        alt={study.title}
                                        fill
                                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                                    <div className="absolute bottom-4 left-4">
                                        <span className="bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full uppercase">
                                            {study.industry}
                                        </span>
                                    </div>
                                </div>
                                <div className="p-6">
                                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-orange-600 transition-colors line-clamp-2">
                                        {study.title}
                                    </h3>
                                    <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                                        {study.excerpt}
                                    </p>
                                    {study.results && (
                                        <div className="flex flex-wrap gap-2 mb-4">
                                            {study.results.slice(0, 2).map((result, idx) => (
                                                <span key={idx} className="bg-green-50 text-green-700 text-xs font-semibold px-2 py-1 rounded">
                                                    {result}
                                                </span>
                                            ))}
                                        </div>
                                    )}
                                    <div className="flex items-center text-orange-600 font-semibold text-sm group-hover:translate-x-2 transition-transform">
                                        Read Case Study
                                        <svg className="w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                        </svg>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>



            <Footer />
        </main>
    );
}
