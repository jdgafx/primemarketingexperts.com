import { Navbar, Footer } from '@/components/Layout';
import Image from 'next/image';

export const metadata = {
    title: 'About Us | Prime Marketing Experts',
    description: 'Learn about Prime Marketing Experts - a digital marketing and website services company helping businesses grow since 2017. Discover our mission, team, and innovative marketing solutions.',
};

export default function AboutPage() {
    return (
        <main className="min-h-screen flex flex-col">
            <Navbar />

            {/* Hero Section - exact match */}
            <div className="bg-gradient-to-r from-orange-50 to-red-50 py-10 md:py-16">
                <div className="container mx-auto px-4">
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 md:!leading-[68px] text-center">
                        About Us
                    </h1>
                    <p className="md:text-lg text-gray-600 mb-6 mx-auto md:!leading-[36px] text-center">
                        Learn more about Prime Marketing Experts and our mission to help businesses grow through innovative digital marketing solutions.
                    </p>
                </div>
            </div>

            {/* Main Content Section - gray background like PME */}
            <section className="bg-gray-100 py-10 md:py-20">
                <div className="container mx-auto px-4">
                    {/* Founder section with image and quote */}
                    <div className="flex flex-col md:flex-row items-center gap-8">
                        <div className="flex-shrink-0">
                            <div className="relative w-full h-72 md:w-80 md:h-72 lg:w-96 lg:h-80 overflow-hidden rounded-lg shadow-lg transition-all duration-500 transform hover:scale-105">
                                <Image
                                    src="/michael-krieger.jpg"
                                    alt="Michael Krieger"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                        </div>
                        <div className="flex-1">
                            <p className="text-lg text-gray-700 mb-6">
                                Prime Marketing Experts was founded in 2017 by Michael Krieger, a native Bostonian.
                            </p>
                            <blockquote className="text-gray-600 italic border-l-4 border-orange-500 pl-4">
                                "As an entrepreneur myself, I am dedicated to helping small businesses grow their business and online presence. We have many tools to choose from to help SMBs grow, BUT one thing is for certain, the foundation of all successful online businesses is one's website. Without a strong website that has a clear message and brand that is built to attract the targeted audience... maintaining an online presence in this ever-competitive marketplace is almost impossible."
                            </blockquote>
                        </div>
                    </div>

                    {/* Meet Michael Section */}
                    <div className="mt-12">
                        <h3 className="text-2xl font-semibold text-gray-800 mb-4">Meet Michael</h3>
                        <p className="text-gray-700 mb-6">
                            Prime Marketing Experts has served for over 7 years, helping hundreds of companies in the Boston area. After earning his Master of Science at the University of Massachusetts, Lowell, Michael built a company that has become a one-stop marketing shop for small to medium-sized companies and their marketing needs. PME excels at creating robust websites, social media campaigns, email campaigns, LinkedIn partnerships, Bing and Google Ads, and more.
                        </p>
                        <blockquote className="text-gray-600 italic border-l-4 border-orange-500 pl-4">
                            "Every day, I see that what truly separates us from other marketing firms is our dedication to effectively building relationships with key potential clients over time. For us, being a relationship-driven marketing firm means always prioritizing long-term, meaningful connections over traditional transactional approaches."
                        </blockquote>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
