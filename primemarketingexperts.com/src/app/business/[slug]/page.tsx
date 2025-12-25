import { Navbar, Footer } from '@/components/Layout';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { businessItems } from '@/lib/navigation';

// Business services data
const businessServices = [
    { slug: 'market-research', title: 'Market Research', description: 'Gain valuable insights into your market, competitors, and customers with comprehensive research and analysis.', icon: '📊' },
    { slug: 'operational-assessment', title: 'Operational Assessment', description: 'Identify inefficiencies and opportunities for improvement in your business operations.', icon: '⚡' },
    { slug: 'professional-business-plans', title: 'Professional Business Plans', description: 'Develop compelling business plans that attract investors and guide your strategic growth.', icon: '📑' },
    { slug: 'business-model-transformation', title: 'Business Model Transformation', description: 'Adapt and evolve your business model to thrive in changing market conditions.', icon: '🔄' },
    { slug: 'event-management', title: 'Event Management', description: 'Plan and execute memorable events that engage your audience and achieve your objectives.', icon: '🎉' },
];

export async function generateStaticParams() {
    return businessServices.map((service) => ({
        slug: service.slug,
    }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const service = businessServices.find(s => s.slug === slug);

    if (!service) {
        return { title: 'Service Not Found' };
    }

    return {
        title: `${service.title} | Prime Marketing Experts`,
        description: service.description,
    };
}

export default async function BusinessServicePage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const service = businessServices.find(s => s.slug === slug);

    if (!service) {
        notFound();
    }

    return (
        <main className="min-h-screen bg-white">
            <Navbar />

            {/* Hero Section */}
            <section className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white py-24 overflow-hidden">
                <div className="absolute inset-0 opacity-20">
                    <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 30% 40%, rgba(59,130,246,0.4) 0%, transparent 40%)' }}></div>
                </div>
                <div className="container mx-auto px-4 relative z-10">
                    <div className="max-w-4xl mx-auto">
                        <div className="text-7xl mb-6">{service.icon}</div>
                        <span className="inline-block bg-blue-500/20 text-blue-400 px-4 py-2 rounded-full text-sm font-semibold mb-6 uppercase tracking-wider">
                            Business Services
                        </span>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                            {service.title}
                        </h1>
                        <p className="text-xl text-gray-300 mb-8 max-w-3xl">
                            {service.description}
                        </p>
                        <Link href="/free-strategy-session" className="inline-block bg-gradient-to-r from-blue-500 to-blue-600 text-white px-8 py-4 rounded-full font-bold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all">
                            Get Started Today
                        </Link>
                    </div>
                </div>
            </section>

            {/* Content Section */}
            <section className="py-20">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-3xl font-bold text-gray-900 mb-8">About {service.title}</h2>
                        <div className="prose prose-lg max-w-none text-gray-700">
                            <p className="text-xl leading-relaxed mb-6">
                                {service.description}
                            </p>
                            <p className="leading-relaxed">
                                At Prime Marketing Experts, we provide strategic business consulting services to help you achieve sustainable growth. Our {service.title.toLowerCase()} services combine industry expertise with data-driven insights to deliver actionable recommendations.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Other Business Services */}
            <section className="py-20 bg-gray-50">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Other Business Services</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
                        {businessItems.filter(i => !i.href.includes(slug)).map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className="flex items-center p-4 bg-white rounded-xl shadow hover:shadow-lg transition-all border border-gray-100 hover:border-blue-200 group"
                            >
                                <span className="w-3 h-3 bg-blue-500 rounded-full mr-3 group-hover:scale-125 transition-transform flex-shrink-0"></span>
                                <span className="font-medium text-gray-800 group-hover:text-blue-600 transition-colors text-sm">{item.label}</span>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>



            <Footer />
        </main>
    );
}
