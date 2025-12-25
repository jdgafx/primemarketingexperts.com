import { Navbar, Footer } from '@/components/Layout';
import Link from 'next/link';
import Image from 'next/image';
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
        <main className="min-h-screen bg-[#fafaf8] font-montserrat">
            <Navbar />

            {/* Hero Section - Refined Beige Layout */}
            <section className="bg-[#f2f1ec] py-24 border-b border-gray-100">
                <div className="container mx-auto px-4 text-center">
                    <div className="max-w-4xl mx-auto">
                        <div className="text-6xl mb-8 animate-bounce-slow">{industry.icon}</div>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-[#1a1a1a] mb-6 leading-tight uppercase tracking-tight">
                            {industry.title}
                        </h1>
                        <p className="text-xl md:text-2xl text-gray-700 font-medium max-w-2xl mx-auto leading-relaxed">
                            {industry.tagline}
                        </p>
                    </div>
                </div>
            </section>

            {/* Z-Pattern Content Sections */}
            <section className="py-24 space-y-24">
                {/* Section 1: Introduction (Text Left | Image Right) */}
                <div className="container mx-auto px-4">
                    <div className="flex flex-col lg:flex-row items-center gap-16">
                        <div className="lg:w-1/2 space-y-8 bg-white p-10 md:p-14 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-gray-50">
                            <h2 className="text-3xl md:text-4xl font-extrabold text-[#1a1a1a] leading-tight">
                                Strategic approach to {industry.slug} growth
                            </h2>
                            <p className="text-lg text-gray-600 leading-relaxed font-medium">
                                {industry.description}
                            </p>
                            <Link href="/free-strategy-session" className="inline-block bg-gradient-to-r from-orange-500 to-orange-600 text-white px-10 py-4 rounded-xl font-bold uppercase tracking-wider hover:shadow-2xl transition-all active:scale-95">
                                Contact Now
                            </Link>
                        </div>
                        <div className="lg:w-1/2">
                            <div className="relative group">
                                <div className="absolute -inset-4 bg-orange-500/10 rounded-[40px] blur-2xl group-hover:bg-orange-500/20 transition-all"></div>
                                <div className="relative aspect-video rounded-3xl overflow-hidden shadow-2xl grayscale hover:grayscale-0 transition-all duration-700">
                                    <Image
                                        src={`/industry-${industry.slug}-1.jpg`}
                                        alt={industry.title}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Section 2: Benefits (Image Left | Text Right) */}
                <div className="container mx-auto px-4">
                    <div className="flex flex-col lg:flex-row-reverse items-center gap-16">
                        <div className="lg:w-1/2 space-y-8 bg-white p-10 md:p-14 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-gray-50">
                            <h2 className="text-3xl md:text-4xl font-extrabold text-[#1a1a1a] leading-tight">
                                How We Transform Results
                            </h2>
                            <ul className="grid grid-cols-1 gap-4">
                                {industry.benefits.map((benefit, idx) => (
                                    <li key={idx} className="flex items-start gap-4 py-3 border-b border-gray-50 last:border-0 group">
                                        <div className="shrink-0 w-6 h-6 bg-orange-100 rounded-full flex items-center justify-center mt-1 group-hover:bg-orange-500 transition-colors">
                                            <svg className="w-3.5 h-3.5 text-orange-600 group-hover:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                            </svg>
                                        </div>
                                        <span className="text-gray-700 font-semibold group-hover:text-orange-600 transition-colors">{benefit}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="lg:w-1/2">
                            <div className="relative group">
                                <div className="absolute -inset-4 bg-blue-500/10 rounded-[40px] blur-2xl group-hover:bg-blue-500/20 transition-all"></div>
                                <div className="relative aspect-video rounded-3xl overflow-hidden shadow-2xl">
                                    <Image
                                        src={`/industry-${industry.slug}-2.jpg`}
                                        alt="Success Outcomes"
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 3-Column Specific Benefits Grid */}
            <section className="py-24 bg-white border-y border-gray-100">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl md:text-4xl font-black text-center mb-16 uppercase tracking-wider">Services Focused on {industry.title}</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            { title: 'Digital Strategy', icon: '🎯', desc: 'Custom roadmaps tailored to your industry positioning.' },
                            { title: 'Brand Visibility', icon: '✨', desc: 'Enhanced search authority and social dominance.' },
                            { title: 'Conversion Focus', icon: '💰', desc: 'Turning traffic into measurable business growth.' }
                        ].map((item, idx) => (
                            <div key={idx} className="p-8 rounded-2xl bg-[#f9f9f7] hover:bg-orange-50 transition-all border border-transparent hover:border-orange-100 group">
                                <div className="text-4xl mb-6 group-hover:scale-110 transition-transform duration-300">{item.icon}</div>
                                <h3 className="text-xl font-extrabold mb-4 text-[#1a1a1a]">{item.title}</h3>
                                <p className="text-gray-600 font-medium">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Footer CTA Bar */}
            <section className="bg-orange-500 py-6">
                <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-6">
                    <span className="text-white font-black text-2xl uppercase tracking-widest italic">Ready to transform your marketing?</span>
                    <Link href="/contact" className="bg-white text-orange-600 px-10 py-3 rounded-xl font-black uppercase hover:bg-gray-100 transition-colors shadow-xl">
                        Contact Now
                    </Link>
                </div>
            </section>

            <Footer />
        </main>
    );
}

