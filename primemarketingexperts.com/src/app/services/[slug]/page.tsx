import { Navbar, Footer } from '@/components/Layout';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { aiServices, type AIService } from '@/lib/ai-services';
import { services } from '@/lib/services';

// Generate static params for all services
export async function generateStaticParams() {
    const aiSlugs = aiServices.map((service) => ({
        slug: service.slug,
    }));

    const regularSlugs = services.map((service) => ({
        slug: service.slug,
    }));

    return [...aiSlugs, ...regularSlugs];
}

// Generate metadata
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const aiService = aiServices.find(s => s.slug === slug);
    const regularService = services.find(s => s.slug === slug);
    const service = aiService || regularService;

    if (!service) {
        return { title: 'Service Not Found' };
    }

    return {
        title: `${service.title} | Prime Marketing Experts`,
        description: service.description,
    };
}

function AIServicePage({ service }: { service: AIService }) {
    return (
        <main className="min-h-screen bg-white">
            <Navbar />

            {/* Hero Section - AI Style */}
            <section className="relative bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white py-24 overflow-hidden">
                <div className="absolute inset-0">
                    <div className="absolute inset-0 opacity-30" style={{
                        backgroundImage: 'radial-gradient(circle at 30% 40%, rgba(168,85,247,0.4) 0%, transparent 40%), radial-gradient(circle at 70% 60%, rgba(234,88,12,0.3) 0%, transparent 40%)'
                    }}></div>
                    {/* Animated grid */}
                    <div className="absolute inset-0 opacity-10" style={{
                        backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
                        backgroundSize: '50px 50px'
                    }}></div>
                </div>
                <div className="container mx-auto px-4 relative z-10">
                    <div className="max-w-4xl mx-auto">
                        <div className="flex items-center gap-3 mb-6">
                            <span className="bg-purple-500/20 text-purple-300 px-4 py-2 rounded-full text-sm font-semibold uppercase tracking-wider">
                                AI-Powered
                            </span>
                            <span className="bg-orange-500/20 text-orange-300 px-4 py-2 rounded-full text-sm font-semibold uppercase tracking-wider">
                                {service.category}
                            </span>
                        </div>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                            {service.title}
                        </h1>
                        <p className="text-xl text-gray-300 mb-8 max-w-3xl">
                            {service.tagline}
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <Link href="/free-strategy-session" className="bg-gradient-to-r from-purple-500 to-orange-500 text-white px-8 py-4 rounded-full font-bold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all text-center">
                                Get Started with AI
                            </Link>
                            <Link href="/contact" className="bg-white/10 backdrop-blur text-white px-8 py-4 rounded-full font-bold text-lg border border-white/20 hover:bg-white/20 transition-all text-center">
                                Schedule Demo
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Description Section */}
            <section className="py-20">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto">
                        <div className="text-6xl mb-8">{service.icon}</div>
                        <div className="prose prose-lg max-w-none">
                            <p className="text-xl text-gray-700 leading-relaxed">
                                {service.description}
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Benefits Section */}
            <section className="py-20 bg-gray-50">
                <div className="container mx-auto px-4">
                    <div className="max-w-6xl mx-auto">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12 text-center">Key Benefits</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {service.benefits.map((benefit, idx) => (
                                <div key={idx} className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
                                    <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-orange-500 rounded-xl flex items-center justify-center text-white font-bold text-xl mb-6">
                                        {idx + 1}
                                    </div>
                                    <p className="text-gray-700 text-lg">{benefit}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Integrations Section */}
            {service.integrations && service.integrations.length > 0 && (
                <section className="py-20">
                    <div className="container mx-auto px-4">
                        <div className="max-w-4xl mx-auto text-center">
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">Seamless Integrations</h2>
                            <p className="text-gray-600 mb-12">Works with your existing tools and platforms</p>
                            <div className="flex flex-wrap justify-center gap-4">
                                {service.integrations.map((integration, idx) => (
                                    <span key={idx} className="bg-gray-100 text-gray-800 px-6 py-3 rounded-full font-medium">
                                        {integration}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>
            )}

            {/* Deep Content Section */}
            {service.fullContent && service.fullContent.length > 0 && (
                <section className="py-24 bg-white">
                    <div className="container mx-auto px-4">
                        <div className="max-w-4xl mx-auto">
                            <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-12 tracking-tight">
                                Strategic <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-purple-600">Impact</span>
                            </h2>
                            <div className="space-y-8">
                                {service.fullContent.map((paragraph, idx) => (
                                    <p key={idx} className="text-xl text-slate-700 leading-relaxed font-light first-letter:text-5xl first-letter:font-bold first-letter:mr-3 first-letter:float-left first-letter:text-orange-600">
                                        {paragraph}
                                    </p>
                                ))}
                            </div>
                            
                            <div className="mt-16 p-8 rounded-3xl bg-slate-50 border border-slate-100 flex flex-col md:flex-row items-center justify-between gap-8">
                                <div>
                                    <h3 className="text-2xl font-bold text-slate-900 mb-2">Ready to implement {service.shortTitle}?</h3>
                                    <p className="text-slate-600">Our architects are ready to design your environment-specific deployment.</p>
                                </div>
                                <Link href="/contact" className="whitespace-nowrap bg-slate-900 text-white px-8 py-4 rounded-full font-bold hover:bg-slate-800 transition-all">
                                    Speak with an Architect
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>
            )}



            <Footer />
        </main>
    );
}

function RegularServicePage({ service }: { service: typeof services[0] }) {
    return (
        <main className="min-h-screen bg-white">
            <Navbar />

            {/* Hero Section */}
            <section className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white py-24 overflow-hidden">
                <div className="absolute inset-0 opacity-20">
                    <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 30% 40%, rgba(234,88,12,0.4) 0%, transparent 40%)' }}></div>
                </div>
                <div className="container mx-auto px-4 relative z-10">
                    <div className="max-w-4xl mx-auto">
                        <span className="inline-block bg-orange-500/20 text-orange-400 px-4 py-2 rounded-full text-sm font-semibold mb-6 uppercase tracking-wider">
                            {service.category}
                        </span>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                            {service.title}
                        </h1>
                        <p className="text-xl text-gray-300 mb-8 max-w-3xl">
                            {service.tagline || service.description}
                        </p>
                        <Link href="/free-strategy-session" className="inline-block bg-gradient-to-r from-orange-500 to-orange-600 text-white px-8 py-4 rounded-full font-bold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all">
                            Get Started Today
                        </Link>
                    </div>
                </div>
            </section>

            {/* Description Section */}
            <section className="py-20">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto">
                        <div className="text-6xl mb-8">{service.icon}</div>
                        <div className="prose prose-lg max-w-none">
                            <p className="text-xl text-gray-700 leading-relaxed">
                                {service.description}
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Content Section */}
            {service.fullContent && (
                <section className="py-20 bg-gray-50">
                    <div className="container mx-auto px-4">
                        <div className="max-w-4xl mx-auto prose prose-lg">
                            <div dangerouslySetInnerHTML={{ __html: service.fullContent }} />
                        </div>
                    </div>
                </section>
            )}



            <Footer />
        </main>
    );
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;

    // Check if it's an AI service first
    const aiService = aiServices.find(s => s.slug === slug);
    if (aiService) {
        return <AIServicePage service={aiService} />;
    }

    // Check regular services
    const regularService = services.find(s => s.slug === slug);
    if (regularService) {
        return <RegularServicePage service={regularService} />;
    }

    notFound();
}
