import { Navbar, Footer } from '@/components/Layout';
import Link from 'next/link';
import { marketingItems } from '@/lib/navigation';

export const metadata = {
    title: 'Marketing Services | Prime Marketing Experts',
    description: 'Full-service digital marketing solutions including SEO, social media, content marketing, email marketing, and more. Drive growth with Prime Marketing Experts.',
};

export default function MarketingServicesPage() {
    const heroServices = [
        { icon: '📈', title: 'SEO Services', description: 'Boost your search rankings and organic traffic with proven SEO strategies.' },
        { icon: '📱', title: 'Social Media', description: 'Engage your audience across all major social platforms with compelling content.' },
        { icon: '✉️', title: 'Email Marketing', description: 'Nurture leads and drive conversions with targeted email campaigns.' },
        { icon: '📝', title: 'Content Marketing', description: 'Tell your brand story with content that resonates and converts.' },
        { icon: '🎯', title: 'PPC Advertising', description: 'Maximize ROI with data-driven paid advertising campaigns.' },
        { icon: '🤖', title: 'Marketing Automation', description: 'Streamline your marketing with intelligent automation solutions.' },
    ];

    return (
        <main className="min-h-screen bg-white">
            <Navbar />

            {/* Hero Section */}
            <section className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white py-24 overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 25% 25%, rgba(234,88,12,0.3) 0%, transparent 50%), radial-gradient(circle at 75% 75%, rgba(249,115,22,0.2) 0%, transparent 50%)' }}></div>
                </div>
                <div className="container mx-auto px-4 relative z-10">
                    <div className="max-w-4xl mx-auto text-center">
                        <span className="inline-block bg-orange-500/20 text-orange-400 px-4 py-2 rounded-full text-sm font-semibold mb-6 uppercase tracking-wider">
                            Full-Service Marketing
                        </span>
                        <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                            Marketing Services That <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600">Drive Results</span>
                        </h1>
                        <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
                            From SEO to social media, our comprehensive marketing solutions help Boston-area businesses grow their online presence and revenue.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link href="/free-strategy-session" className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-8 py-4 rounded-full font-bold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all">
                                Get Free Strategy Session
                            </Link>
                            <Link href="/contact" className="bg-white/10 backdrop-blur text-white px-8 py-4 rounded-full font-bold text-lg border border-white/20 hover:bg-white/20 transition-all">
                                Contact Us
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Quick Services Grid */}
            <section className="py-20 bg-gray-50">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Marketing Expertise</h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">Comprehensive solutions tailored to your business needs</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {heroServices.map((service, idx) => (
                            <div key={idx} className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 group">
                                <div className="text-5xl mb-6">{service.icon}</div>
                                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-orange-600 transition-colors">{service.title}</h3>
                                <p className="text-gray-600">{service.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* All Marketing Services List */}
            <section className="py-20">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">All Marketing Services</h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">Explore our complete range of marketing solutions</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
                        {marketingItems.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className="flex items-center p-4 bg-white rounded-xl shadow hover:shadow-lg transition-all border border-gray-100 hover:border-orange-200 group"
                            >
                                <span className="w-3 h-3 bg-orange-500 rounded-full mr-4 group-hover:scale-125 transition-transform"></span>
                                <span className="font-medium text-gray-800 group-hover:text-orange-600 transition-colors">{item.label}</span>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>



            <Footer />
        </main>
    );
}
