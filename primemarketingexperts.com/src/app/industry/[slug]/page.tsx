import { Navbar, Footer } from '@/components/Layout';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { whoWeServeItems } from '@/lib/navigation';

// Industry data with full content
const industries = [
    {
        slug: 'tourism',
        title: 'Tourism & Hospitality Marketing',
        tagline: 'Attract more travelers and boost bookings with targeted digital marketing',
        description: 'The tourism industry is highly competitive, and standing out requires a strategic marketing approach. Our tourism marketing services help hotels, resorts, tour operators, and travel agencies reach more travelers and convert them into bookings.',
        icon: '✈️',
        benefits: [
            'Increase direct bookings and reduce OTA dependency',
            'Build a strong online presence across review platforms',
            'Engage travelers with compelling visual content',
            'Leverage seasonal marketing campaigns',
            'Optimize for local and destination-based searches'
        ]
    },
    {
        slug: 'automotive',
        title: 'Automotive Marketing',
        tagline: 'Drive more leads and sales for your dealership or auto service business',
        description: 'The automotive industry requires specialized marketing strategies to reach car buyers and service customers. We help dealerships, auto repair shops, and automotive businesses attract more customers and increase sales.',
        icon: '🚗',
        benefits: [
            'Generate high-quality leads for vehicle sales',
            'Build trust with customer reviews and testimonials',
            'Dominate local search results',
            'Create compelling inventory showcases',
            'Implement retargeting campaigns for interested buyers'
        ]
    },
    {
        slug: 'restaurant',
        title: 'Restaurant Marketing',
        tagline: 'Fill more seats and grow your restaurant with strategic marketing',
        description: 'Restaurants face unique marketing challenges in today\'s digital-first world. We help restaurants, cafes, and food service businesses attract more diners, increase orders, and build lasting customer relationships.',
        icon: '🍽️',
        benefits: [
            'Increase online reservations and orders',
            'Manage and improve online reviews',
            'Create mouth-watering visual content',
            'Build loyalty programs that work',
            'Optimize for food delivery platforms'
        ]
    },
    {
        slug: 'retail',
        title: 'Retail Marketing',
        tagline: 'Increase foot traffic and online sales with omnichannel marketing',
        description: 'Retail businesses need to compete both in-store and online. Our retail marketing services help brick-and-mortar stores and e-commerce businesses attract customers, drive sales, and build brand loyalty.',
        icon: '🛍️',
        benefits: [
            'Drive both foot traffic and online sales',
            'Create seamless omnichannel experiences',
            'Implement effective seasonal campaigns',
            'Build customer loyalty programs',
            'Optimize product listings and catalogs'
        ]
    },
    {
        slug: 'cleaning-companies',
        title: 'Cleaning Company Marketing',
        tagline: 'Grow your cleaning business with proven marketing strategies',
        description: 'Cleaning companies need consistent lead generation to maintain steady growth. We help residential and commercial cleaning businesses attract more clients and build a reputation for excellence.',
        icon: '🧹',
        benefits: [
            'Generate consistent leads for cleaning services',
            'Build trust through reviews and testimonials',
            'Dominate local search results',
            'Create effective referral programs',
            'Develop recurring customer relationships'
        ]
    },
    {
        slug: 'gyms',
        title: 'Gym & Fitness Marketing',
        tagline: 'Attract more members and reduce churn with targeted fitness marketing',
        description: 'Gyms and fitness centers need effective marketing to attract new members and retain existing ones. We help fitness businesses build their brand, increase memberships, and create engaged communities.',
        icon: '💪',
        benefits: [
            'Increase new member sign-ups',
            'Reduce member churn and improve retention',
            'Build an engaged fitness community',
            'Promote classes, trainers, and programs',
            'Leverage social proof and transformations'
        ]
    },
    {
        slug: 'construction',
        title: 'Construction Marketing',
        tagline: 'Build your reputation and generate quality leads for construction projects',
        description: 'Construction companies need to showcase their expertise and build trust with potential clients. We help contractors, builders, and construction firms generate leads and establish themselves as industry leaders.',
        icon: '🏗️',
        benefits: [
            'Generate high-value project leads',
            'Showcase completed projects effectively',
            'Build trust with safety and quality messaging',
            'Establish expertise through content marketing',
            'Dominate local search for construction services'
        ]
    },
    {
        slug: 'real-estate',
        title: 'Real Estate Marketing',
        tagline: 'Close more deals with strategic real estate marketing',
        description: 'Real estate professionals need to stand out in a competitive market. We help realtors, brokers, and property developers attract more buyers and sellers, close more deals, and build lasting relationships.',
        icon: '🏠',
        benefits: [
            'Generate quality buyer and seller leads',
            'Create compelling property listings',
            'Build your personal or agency brand',
            'Leverage virtual tours and video marketing',
            'Dominate local real estate searches'
        ]
    },
    {
        slug: 'healthcare',
        title: 'Healthcare Marketing',
        tagline: 'Attract more patients with HIPAA-compliant healthcare marketing',
        description: 'Healthcare providers face unique marketing challenges, including regulatory compliance and building patient trust. We help medical practices, clinics, and healthcare organizations attract patients while maintaining compliance.',
        icon: '🏥',
        benefits: [
            'Attract more patients through digital channels',
            'Maintain HIPAA compliance in all marketing',
            'Build trust through patient testimonials',
            'Improve online reputation management',
            'Optimize for healthcare-specific searches'
        ]
    }
];

export async function generateStaticParams() {
    return industries.map((industry) => ({
        slug: industry.slug,
    }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const industry = industries.find(i => i.slug === slug);

    if (!industry) {
        return { title: 'Industry Not Found' };
    }

    return {
        title: `${industry.title} | Prime Marketing Experts`,
        description: industry.description,
    };
}

export default async function IndustryPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const industry = industries.find(i => i.slug === slug);

    if (!industry) {
        notFound();
    }

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
                        <div className="text-7xl mb-6">{industry.icon}</div>
                        <span className="inline-block bg-orange-500/20 text-orange-400 px-4 py-2 rounded-full text-sm font-semibold mb-6 uppercase tracking-wider">
                            Industry Expertise
                        </span>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                            {industry.title}
                        </h1>
                        <p className="text-xl text-gray-300 mb-8 max-w-3xl">
                            {industry.tagline}
                        </p>
                        <Link href="/free-strategy-session" className="inline-block bg-gradient-to-r from-orange-500 to-orange-600 text-white px-8 py-4 rounded-full font-bold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all">
                            Get Your Free Strategy Session
                        </Link>
                    </div>
                </div>
            </section>

            {/* Description Section */}
            <section className="py-20">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto">
                        <p className="text-xl text-gray-700 leading-relaxed">
                            {industry.description}
                        </p>
                    </div>
                </div>
            </section>

            {/* Benefits Section */}
            <section className="py-20 bg-gray-50">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12 text-center">How We Help</h2>
                        <div className="space-y-6">
                            {industry.benefits.map((benefit, idx) => (
                                <div key={idx} className="flex items-start bg-white rounded-xl p-6 shadow-lg border border-gray-100">
                                    <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0 mr-4">
                                        {idx + 1}
                                    </div>
                                    <p className="text-gray-700 text-lg">{benefit}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Other Industries */}
            <section className="py-20">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12 text-center">Other Industries We Serve</h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
                        {whoWeServeItems.filter(i => !i.href.includes(slug)).map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className="flex items-center justify-center p-4 bg-gray-100 rounded-xl hover:bg-orange-100 hover:text-orange-600 transition-all font-medium text-gray-700 text-center"
                            >
                                {item.label}
                            </Link>
                        ))}
                    </div>
                </div>
            </section>



            <Footer />
        </main>
    );
}
