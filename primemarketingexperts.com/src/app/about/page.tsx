import { Navbar, Footer } from '@/components/Layout';
import Image from 'next/image';
import Link from 'next/link';

export const metadata = {
    title: 'About Us | Prime Marketing Experts',
    description: 'Learn about Prime Marketing Experts - a digital marketing and website services company helping businesses grow since 2017. Discover our mission, team, and innovative marketing solutions.',
};

export default function AboutPage() {
    return (
        <main className="min-h-screen bg-[#fafaf8] font-montserrat">
            <Navbar />

            {/* Hero Section - Refined Beige Layout */}
            <section className="bg-[#f2f1ec] py-24 border-b border-gray-100">
                <div className="container mx-auto px-4 text-center">
                    <div className="max-w-4xl mx-auto">
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-[#1a1a1a] mb-6 leading-tight uppercase tracking-tight">
                            About Us
                        </h1>
                        <p className="text-xl md:text-2xl text-gray-700 font-medium max-w-2xl mx-auto leading-relaxed italic">
                            Learn more about Prime Marketing Experts and our mission to help businesses grow through innovative digital marketing solutions.
                        </p>
                    </div>
                </div>
            </section>

            {/* Main Content Section */}
            <section className="py-24 space-y-24">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col lg:flex-row items-center gap-16">
                        {/* Founder Image Card */}
                        <div className="lg:w-1/2">
                            <div className="relative group">
                                <div className="absolute -inset-4 bg-orange-500/10 rounded-[40px] blur-2xl group-hover:bg-orange-500/20 transition-all"></div>
                                <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl grayscale hover:grayscale-0 transition-all duration-700">
                                    <Image
                                        src="/images/michael-krieger-section.jpg"
                                        alt="Michael Krieger"
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Story Content Card */}
                        <div className="lg:w-1/2 space-y-8 bg-white p-10 md:p-14 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-gray-50">
                            <h2 className="text-3xl md:text-4xl font-extrabold text-[#1a1a1a] leading-tight">
                                Our Foundation
                            </h2>
                            <p className="text-lg text-gray-600 leading-relaxed font-medium">
                                Prime Marketing Experts was founded in 2017 by Michael Krieger, a native Bostonian. As an entrepreneur himself, he is dedicated to helping small businesses grow their online presence.
                            </p>
                            <blockquote className="text-xl text-[#333] border-l-8 border-orange-500 pl-8 py-4 italic font-semibold leading-relaxed bg-orange-50 rounded-r-2xl">
                                &quot;The foundation of all successful online businesses is one&apos;s website. Without a strong message and brand... maintaining an online presence is almost impossible.&quot;
                            </blockquote>
                        </div>
                    </div>
                </div>

                {/* Second Section: Vision */}
                <div className="container mx-auto px-4">
                    <div className="bg-white p-10 md:p-20 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-gray-50 max-w-5xl mx-auto space-y-12">
                        <div className="text-center space-y-4">
                            <h3 className="text-3xl md:text-4xl font-black text-[#1a1a1a] uppercase tracking-wider">Meet Michael</h3>
                            <div className="w-24 h-1.5 bg-orange-500 mx-auto"></div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                            <p className="text-lg text-gray-700 leading-relaxed font-medium">
                                After earning his Master of Science at the University of Massachusetts, Lowell, Michael built a company that has become a one-stop marketing shop. PME excels at creating robust websites, social media campaigns, email sequences, and high-performance search advertising.
                            </p>
                            <blockquote className="text-lg text-gray-600 italic border-l-4 border-orange-500 pl-6 py-2">
                                &quot;Being a relationship-driven marketing firm means always prioritizing long-term, meaningful connections over traditional transactional approaches.&quot;
                            </blockquote>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer CTA Bar */}
            <section className="bg-orange-500 py-6">
                <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-6">
                    <span className="text-white font-black text-2xl uppercase tracking-widest italic">Join our journey to excellence.</span>
                    <Link href="/contact" className="bg-white text-orange-600 px-10 py-3 rounded-xl font-black uppercase hover:bg-gray-100 transition-colors shadow-xl">
                        Work With Us
                    </Link>
                </div>
            </section>

            <Footer />
        </main>
    );
}

