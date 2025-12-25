import { Navbar, Footer } from '@/components/Layout';
import Link from 'next/link';
import { services } from '@/lib/services';
import { aiServices } from '@/lib/ai-services';

export const metadata = {
    title: 'All Services | Prime Marketing Experts',
    description: 'Explore our complete range of marketing, business, technology, and AI services designed to help your business grow.',
};

export default function ServicesPage() {
    // Group services by category
    const categories = {
        'AI Services': aiServices.map(s => ({ ...s, isAI: true })),
        'Marketing': services.filter(s => s.category === 'Marketing'),
        'Business': services.filter(s => s.category === 'Business'),
        'Technology': services.filter(s => s.category === 'Technology'),
        'Other': services.filter(s => !['Marketing', 'Business', 'Technology'].includes(s.category || '')),
    };

    return (
        <main className="min-h-screen bg-white">
            <Navbar />

            {/* Hero Section */}
            <section className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white py-24 overflow-hidden">
                <div className="absolute inset-0 opacity-20">
                    <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 25% 25%, rgba(234,88,12,0.3) 0%, transparent 50%), radial-gradient(circle at 75% 75%, rgba(168,85,247,0.2) 0%, transparent 50%)' }}></div>
                </div>
                <div className="container mx-auto px-4 relative z-10">
                    <div className="max-w-4xl mx-auto text-center">
                        <span className="inline-block bg-orange-500/20 text-orange-400 px-4 py-2 rounded-full text-sm font-semibold mb-6 uppercase tracking-wider">
                            Complete Solutions
                        </span>
                        <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                            Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-purple-400">Services</span>
                        </h1>
                        <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                            Comprehensive marketing, business, and technology solutions to help your business thrive in the digital age.
                        </p>
                    </div>
                </div>
            </section>

            {/* AI Services - Featured */}
            <section className="py-20 bg-gradient-to-b from-slate-900 to-slate-800">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <span className="inline-block bg-purple-500/20 text-purple-300 px-4 py-2 rounded-full text-sm font-semibold mb-4 uppercase tracking-wider">
                            ✨ New AI-Powered
                        </span>
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">AI Services</h2>
                        <p className="text-gray-400 max-w-2xl mx-auto">Transform your business with cutting-edge artificial intelligence solutions</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
                        {aiServices.slice(0, 10).map((service) => (
                            <Link
                                key={service.slug}
                                href={`/services/${service.slug}`}
                                className="group bg-gradient-to-br from-slate-800 to-slate-700 rounded-2xl p-6 border border-purple-500/20 hover:border-purple-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/10"
                            >
                                <div className="text-4xl mb-4">{service.icon}</div>
                                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-purple-300 transition-colors">{service.title}</h3>
                                <p className="text-gray-400 text-sm line-clamp-2">{service.tagline}</p>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* Other Categories */}
            {Object.entries(categories).filter(([key]) => key !== 'AI Services').map(([category, categoryServices]) => (
                categoryServices.length > 0 && (
                    <section key={category} className="py-20 even:bg-gray-50">
                        <div className="container mx-auto px-4">
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 text-center">{category}</h2>
                            <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
                                {category === 'Marketing' && 'Strategic marketing solutions to grow your online presence'}
                                {category === 'Business' && 'Business consulting and operational services'}
                                {category === 'Technology' && 'Custom technology solutions for modern businesses'}
                                {category === 'Other' && 'Additional services to support your growth'}
                            </p>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                {categoryServices.map((service) => (
                                    <Link
                                        key={service.slug}
                                        href={`/services/${service.slug}`}
                                        className="group bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:border-orange-200 hover:shadow-xl transition-all duration-300"
                                    >
                                        <div className="text-4xl mb-4">{service.icon}</div>
                                        <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-orange-600 transition-colors">{service.title}</h3>
                                        <p className="text-gray-600 text-sm line-clamp-2">{service.description}</p>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </section>
                )
            ))}

            {/* CTA Section */}
            <section className="py-20 bg-gradient-to-r from-orange-500 to-orange-600">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Not Sure Which Service You Need?</h2>
                    <p className="text-white/90 text-xl mb-10 max-w-2xl mx-auto">
                        Let's discuss your goals and create a custom solution for your business.
                    </p>
                    <Link href="/free-strategy-session" className="inline-block bg-white text-orange-600 px-10 py-4 rounded-full font-bold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all">
                        Get Your Free Strategy Session
                    </Link>
                </div>
            </section>

            <Footer />
        </main>
    );
}
