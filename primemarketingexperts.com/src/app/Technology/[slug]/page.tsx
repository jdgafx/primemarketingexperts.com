import { Navbar, Footer } from '@/components/Layout';
import Link from 'next/link';
import Image from 'next/image';
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
        <main className="min-h-screen bg-[#fafaf8] font-poppins">
            <Navbar />

            {/* Hero Section - Refined Beige Layout */}
            <section className="bg-[#f2f1ec] py-24 border-b border-gray-100">
                <div className="container mx-auto px-4 text-center">
                    <div className="max-w-4xl mx-auto">
                        <div className="text-6xl mb-8 animate-bounce-slow">{service.icon}</div>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-[#1a1a1a] mb-6 leading-tight uppercase tracking-tight">
                            {service.title}
                        </h1>
                        <p className="text-xl md:text-2xl text-gray-700 font-medium max-w-2xl mx-auto leading-relaxed">
                            {service.description}
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
                                Innovative Technology for {service.title}
                            </h2>
                            <p className="text-lg text-gray-600 leading-relaxed font-medium">
                                At Prime Marketing Experts, we leverage cutting-edge technology to build solutions that drive business results. Our {service.title.toLowerCase()} services combine technical excellence with user-centered design to create products your customers will love.
                            </p>
                            <Link href="/free-strategy-session" className="inline-block bg-gradient-to-r from-emerald-500 to-emerald-600 text-white px-10 py-4 rounded-xl font-bold uppercase tracking-wider hover:shadow-2xl transition-all active:scale-95">
                                Start Your Project
                            </Link>
                        </div>
                        <div className="lg:w-1/2">
                            <div className="relative group">
                                <div className="absolute -inset-4 bg-emerald-500/10 rounded-[40px] blur-2xl group-hover:bg-emerald-500/20 transition-all"></div>
                                <div className="relative aspect-video rounded-3xl overflow-hidden shadow-2xl grayscale hover:grayscale-0 transition-all duration-700">
                                    <Image
                                        src={`/technology-${service.slug}-1.jpg`}
                                        alt={service.title}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Section 2: Why Choose Us (Image Left | Text Right) */}
                <div className="container mx-auto px-4">
                    <div className="flex flex-col lg:flex-row-reverse items-center gap-16">
                        <div className="lg:w-1/2 space-y-8 bg-white p-10 md:p-14 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-gray-50">
                            <h2 className="text-3xl md:text-4xl font-extrabold text-[#1a1a1a] leading-tight">
                                High-Performance Development
                            </h2>
                            <p className="text-lg text-gray-600 leading-relaxed font-medium">
                                We focus on scalability, security, and accessibility to ensure your digital presence is not only beautiful but also robust and compliant.
                            </p>
                            <ul className="grid grid-cols-1 gap-4">
                                {['Cutting-edge Stack', 'Responsive Design', 'ADA Compliance'].map((benefit, idx) => (
                                    <li key={idx} className="flex items-start gap-4 py-3 border-b border-gray-50 last:border-0 group">
                                        <div className="shrink-0 w-6 h-6 bg-emerald-100 rounded-full flex items-center justify-center mt-1 group-hover:bg-emerald-500 transition-colors">
                                            <svg className="w-3.5 h-3.5 text-emerald-600 group-hover:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                            </svg>
                                        </div>
                                        <span className="text-gray-700 font-semibold group-hover:text-emerald-600 transition-colors">{benefit}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="lg:w-1/2">
                            <div className="relative group">
                                <div className="absolute -inset-4 bg-blue-500/10 rounded-[40px] blur-2xl group-hover:bg-blue-500/20 transition-all"></div>
                                <div className="relative aspect-video rounded-3xl overflow-hidden shadow-2xl">
                                    <Image
                                        src={`/technology-${service.slug}-2.jpg`}
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

            {/* Footer CTA Bar */}
            <section className="bg-orange-500 py-6">
                <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-6">
                    <span className="text-white font-black text-2xl uppercase tracking-widest italic">Build the future with Prime.</span>
                    <Link href="/contact" className="bg-white text-orange-600 px-10 py-3 rounded-xl font-black uppercase hover:bg-gray-100 transition-colors shadow-xl">
                        Start Project
                    </Link>
                </div>
            </section>

            <Footer />
        </main>
    );
}

