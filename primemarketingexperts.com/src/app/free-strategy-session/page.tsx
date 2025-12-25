'use client';

import { Navbar, Footer } from '@/components/Layout';
import { useState } from 'react';

export default function FreeStrategySessionPage() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        company: '',
        website: '',
        services: [] as string[],
        message: '',
    });

    const services = [
        'SEO Services',
        'Social Media Marketing',
        'Content Marketing',
        'Email Marketing',
        'PPC Advertising',
        'Web Design',
        'AI Solutions',
        'Marketing Automation',
    ];

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle form submission
        console.log(formData);
        alert('Thank you! We will contact you shortly to schedule your free strategy session.');
    };

    const benefits = [
        { icon: '🎯', title: 'Custom Strategy', description: 'Get a personalized marketing roadmap tailored to your business goals' },
        { icon: '📊', title: 'Competitor Analysis', description: 'Understand your competitive landscape and identify opportunities' },
        { icon: '💡', title: 'Expert Insights', description: 'Receive actionable recommendations from marketing professionals' },
        { icon: '🚀', title: 'Growth Plan', description: 'Leave with a clear plan to accelerate your business growth' },
    ];

    return (
        <main className="min-h-screen bg-white">
            <Navbar />

            {/* Hero Section */}
            <section className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white py-20 overflow-hidden">
                <div className="absolute inset-0 opacity-20">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-orange-500 rounded-full blur-3xl"></div>
                    <div className="absolute bottom-0 left-0 w-96 h-96 bg-orange-600 rounded-full blur-3xl"></div>
                </div>
                <div className="container mx-auto px-4 relative z-10">
                    <div className="max-w-3xl mx-auto text-center">
                        <span className="inline-block bg-orange-500/20 text-orange-400 px-4 py-2 rounded-full text-sm font-semibold mb-6 uppercase tracking-wider">
                            100% Free • No Obligation
                        </span>
                        <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                            Get Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600">Free Strategy Session</span>
                        </h1>
                        <p className="text-xl text-gray-300">
                            Discover how to grow your business with a personalized marketing strategy from our expert team.
                        </p>
                    </div>
                </div>
            </section>

            {/* Benefits Section */}
            <section className="py-16 bg-gray-50">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {benefits.map((benefit, idx) => (
                            <div key={idx} className="text-center">
                                <div className="text-5xl mb-4">{benefit.icon}</div>
                                <h3 className="text-lg font-bold text-gray-900 mb-2">{benefit.title}</h3>
                                <p className="text-gray-600 text-sm">{benefit.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Form Section */}
            <section className="py-20">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto">
                        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
                            {/* Form */}
                            <div className="lg:col-span-3">
                                <h2 className="text-2xl font-bold text-gray-900 mb-8">Schedule Your Session</h2>
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                                            <input
                                                type="text"
                                                required
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                                                placeholder="John Smith"
                                                value={formData.name}
                                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
                                            <input
                                                type="email"
                                                required
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                                                placeholder="john@company.com"
                                                value={formData.email}
                                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                            />
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                                            <input
                                                type="tel"
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                                                placeholder="(617) 555-0123"
                                                value={formData.phone}
                                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Company Name</label>
                                            <input
                                                type="text"
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                                                placeholder="Your Company"
                                                value={formData.company}
                                                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Website URL</label>
                                        <input
                                            type="url"
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                                            placeholder="https://yourwebsite.com"
                                            value={formData.website}
                                            onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-3">Services Interested In</label>
                                        <div className="grid grid-cols-2 gap-3">
                                            {services.map((service) => (
                                                <label key={service} className="flex items-center space-x-3 cursor-pointer">
                                                    <input
                                                        type="checkbox"
                                                        className="w-5 h-5 text-orange-500 border-gray-300 rounded focus:ring-orange-500"
                                                        checked={formData.services.includes(service)}
                                                        onChange={(e) => {
                                                            if (e.target.checked) {
                                                                setFormData({ ...formData, services: [...formData.services, service] });
                                                            } else {
                                                                setFormData({ ...formData, services: formData.services.filter(s => s !== service) });
                                                            }
                                                        }}
                                                    />
                                                    <span className="text-gray-700">{service}</span>
                                                </label>
                                            ))}
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Tell Us About Your Goals</label>
                                        <textarea
                                            rows={4}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all resize-none"
                                            placeholder="What are your main marketing challenges and goals?"
                                            value={formData.message}
                                            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                        ></textarea>
                                    </div>
                                    <button
                                        type="submit"
                                        className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white py-4 rounded-lg font-bold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all"
                                    >
                                        Request My Free Strategy Session
                                    </button>
                                    <p className="text-center text-gray-500 text-sm">
                                        By submitting, you agree to our Privacy Policy. We'll never share your information.
                                    </p>
                                </form>
                            </div>

                            {/* Sidebar */}
                            <div className="lg:col-span-2">
                                <div className="bg-slate-900 text-white rounded-2xl p-8 sticky top-32">
                                    <h3 className="text-xl font-bold mb-6">What You'll Get:</h3>
                                    <ul className="space-y-4">
                                        {[
                                            '30-minute consultation call',
                                            'Website & SEO audit',
                                            'Competitor analysis',
                                            'Custom marketing recommendations',
                                            'Clear action plan',
                                            'No obligation whatsoever',
                                        ].map((item, idx) => (
                                            <li key={idx} className="flex items-center">
                                                <svg className="w-5 h-5 text-orange-500 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                </svg>
                                                <span className="text-gray-300">{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                    <div className="mt-8 pt-8 border-t border-gray-700">
                                        <p className="text-gray-400 text-sm mb-2">Or call us directly:</p>
                                        <a href="tel:617-651-1457" className="text-2xl font-bold text-orange-400 hover:text-orange-300 transition-colors">
                                            617-651-1457
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
