import { Navbar, Footer } from '@/components/Layout';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { technologyItems } from '@/lib/navigation';

// Technology services data
const technologyServices = [
    { slug: 'web-development', title: 'Web Development', description: 'Build stunning, high-performance websites that drive conversions and deliver exceptional user experiences.', icon: '💻' },
    { slug: 'chatbot-development', title: 'Chatbot Development', description: 'Create intelligent chatbots that engage customers 24/7 and streamline your customer service operations.', icon: '🤖' },
    { slug: 'mobile-app-development', title: 'Mobile App Development', description: 'Develop custom mobile applications that delight users and drive business growth on iOS and Android.', icon: '📱' },
    { slug: 'website-accessibility', title: 'Website Accessibility', description: 'Ensure your website is accessible to all users and compliant with ADA and WCAG guidelines.', icon: '♿' },
];

export async function generateStaticParams() {
    return technologyServices.map((service) => ({
        slug: service.slug,
    }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const service = technologyServices.find(s => s.slug === slug);

    if (!service) {
        return { title: 'Service Not Found' };
    }

    return {
        title: `${service.title} | Prime Marketing Experts`,
        description: service.description,
    };
}

export default async function TechnologyServicePage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const service = technologyServices.find(s => s.slug === slug);

    if (!service) {
        notFound();
    }

    return (
        <main className="min-h-screen bg-white">
            <Navbar />

            {/* Hero Section */}
            <section className="relative bg-gradient-to-br from-slate-900 via-emerald-900 to-slate-900 text-white py-24 overflow-hidden">
                <div className="absolute inset-0 opacity-20">
                    <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 30% 40%, rgba(16,185,129,0.4) 0%, transparent 40%)' }}></div>
                    {/* Tech grid background */}
                    <div className="absolute inset-0 opacity-20" style={{
                        backgroundImage: 'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)',
                        backgroundSize: '40px 40px'
                    }}></div>
                </div>
                <div className="container mx-auto px-4 relative z-10">
                    <div className="max-w-4xl mx-auto">
                        <div className="text-7xl mb-6">{service.icon}</div>
                        <span className="inline-block bg-emerald-500/20 text-emerald-400 px-4 py-2 rounded-full text-sm font-semibold mb-6 uppercase tracking-wider">
                            Technology Services
                        </span>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                            {service.title}
                        </h1>
                        <p className="text-xl text-gray-300 mb-8 max-w-3xl">
                            {service.description}
                        </p>
                        <Link href="/free-strategy-session" className="inline-block bg-gradient-to-r from-emerald-500 to-emerald-600 text-white px-8 py-4 rounded-full font-bold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all">
                            Start Your Project
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
                                At Prime Marketing Experts, we leverage cutting-edge technology to build solutions that drive business results. Our {service.title.toLowerCase()} services combine technical excellence with user-centered design to create products your customers will love.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Other Technology Services */}
            <section className="py-20 bg-gray-50">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Other Technology Services</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
                        {technologyItems.filter(i => !i.href.includes(slug)).map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className="flex items-center p-4 bg-white rounded-xl shadow hover:shadow-lg transition-all border border-gray-100 hover:border-emerald-200 group"
                            >
                                <span className="w-3 h-3 bg-emerald-500 rounded-full mr-3 group-hover:scale-125 transition-transform flex-shrink-0"></span>
                                <span className="font-medium text-gray-800 group-hover:text-emerald-600 transition-colors text-sm">{item.label}</span>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>



            <Footer />
        </main>
    );
}
