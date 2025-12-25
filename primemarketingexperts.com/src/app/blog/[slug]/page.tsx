import { Navbar, Footer } from '@/components/Layout';
import { blogPosts } from '@/lib/blog';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';

export function generateStaticParams() {
    return blogPosts.map((post) => ({
        slug: post.slug,
    }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const post = blogPosts.find((p) => p.slug === slug)

    if (!post) {
        return {
            title: 'Post Not Found',
        }
    }

    return {
        title: `${post.title} | Prime Marketing Experts`,
        description: post.excerpt,
    }
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const post = blogPosts.find((p) => p.slug === slug)

    if (!post) {
        notFound()
    }

    return (
        <main className="min-h-screen flex flex-col bg-white">
            <Navbar />

            {/* Blog Hero */}
            <div className="bg-[#f9f6f3] py-20">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <div className="text-[rgb(234,88,12)] font-bold uppercase tracking-widest text-sm mb-4">
                        {post.category}
                    </div>
                    <h1 className="text-3xl md:text-5xl font-extrabold text-[#1a1a1a] mb-6 leading-tight">
                        {post.title}
                    </h1>
                </div>
            </div>

            {/* Featured Image */}
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 mb-16">
                <div className="relative h-[400px] md:h-[500px] rounded-2xl overflow-hidden shadow-2xl">
                    <Image src={post.image} alt={post.title} fill className="object-cover" priority />
                </div>
            </div>

            {/* Content */}
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pb-32">
                <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
                    {post.content.map((paragraph, idx) => (
                        <p key={idx} className="mb-8">{paragraph}</p>
                    ))}
                </div>

                {/* Share / Back Link */}
                <div className="mt-16 pt-8 border-t border-gray-100 flex justify-between items-center">
                    <Link href="/blog" className="text-[rgb(234,88,12)] font-bold flex items-center hover:underline">
                        ← Back to Blog
                    </Link>
                    <div className="flex space-x-4">
                        {/* Social Share Placeholders */}
                        <span className="text-gray-400 text-sm uppercase font-bold tracking-widest">Share This Article</span>
                    </div>
                </div>
            </div>

            {/* Suggested Posts */}
            <section className="bg-gray-50 py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-2xl font-extrabold text-gray-900 mb-10 uppercase tracking-tight">You might also like</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {blogPosts.filter(p => p.slug !== slug).slice(0, 3).map(p => (
                            <Link key={p.slug} href={`/blog/${p.slug}`} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden group">
                                <div className="relative h-48">
                                    <Image src={p.image} alt={p.title} fill className="object-cover group-hover:scale-105 transition-transform" />
                                </div>
                                <div className="p-6">
                                    <h3 className="font-bold text-gray-900 group-hover:text-[rgb(234,88,12)] transition-colors line-clamp-2">{p.title}</h3>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
