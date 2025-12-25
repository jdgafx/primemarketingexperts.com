import { Navbar, Footer } from '@/components/Layout';
import Link from 'next/link';
import Image from 'next/image';
import { blogPosts } from '@/lib/blog';

export const metadata = {
    title: 'Blog | Prime Marketing Experts',
    description: 'Read the latest insights, trends, and strategies in digital marketing, technology, and business growth from Prime Marketing Experts.',
};

export default function BlogPage() {
    return (
        <main className="min-h-screen flex flex-col bg-white">
            <Navbar />

            {/* Hero Section */}
            <div className="bg-[#f9f6f3] py-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-4xl md:text-6xl font-extrabold text-[#1a1a1a] mb-6 font-montserrat tracking-tight">
                        Our Blog
                    </h1>
                    <p className="max-w-3xl mx-auto text-xl text-gray-600 leading-relaxed italic">
                        Discover the latest insights, trends, and strategies in digital marketing, technology, and business growth.
                    </p>
                </div>
            </div>

            {/* Blog List Grid */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {blogPosts.map((post) => (
                        <Link key={post.slug} href={`/blog/${post.slug}`} className="flex flex-col group cursor-pointer">
                            <div className="relative h-64 mb-6 rounded-lg overflow-hidden shadow-md">
                                <Image
                                    src={post.image}
                                    alt={post.title}
                                    fill
                                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                                />
                                <div className="absolute top-4 left-4 bg-[rgb(234,88,12)] text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                                    {post.category}
                                </div>
                            </div>
                            <h3 className="text-xl font-extrabold text-gray-900 mb-4 leading-tight group-hover:text-[rgb(234,88,12)] transition-colors">
                                {post.title}
                            </h3>
                            <p className="text-gray-500 text-sm mb-6 leading-relaxed flex-grow">
                                {post.excerpt}
                            </p>
                            <div className="text-[rgb(234,88,12)] font-bold text-sm uppercase tracking-widest flex items-center">
                                Read More <span className="ml-2 text-xl group-hover:translate-x-2 transition-transform">→</span>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>

            <Footer />
        </main>
    );
}
