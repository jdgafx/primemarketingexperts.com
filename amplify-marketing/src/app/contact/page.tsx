'use client';

import { useState } from "react"
import Link from "next/link"
import { ArrowRight, Mail, Phone, MapPin, Send, MessageSquare, ShieldCheck, Zap } from "lucide-react"

export default function ContactPage() {
    const [formStatus, setFormStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        solution: 'AI Chatbot Assistant',
        message: '',
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setFormStatus('sending');

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                setFormStatus('sent');
                setFormData({ name: '', email: '', solution: 'AI Chatbot Assistant', message: '' });
            } else {
                throw new Error('Failed to submit');
            }
        } catch (error) {
            setFormStatus('error');
            setTimeout(() => setFormStatus('idle'), 3000);
        }
    }

    return (
        <main className="min-h-screen bg-black pt-24 relative overflow-hidden">
            {/* BACKGROUND DECOR */}
            <div className="fixed inset-0 bg-noise pointer-events-none z-[1]" />
            <div className="fixed inset-0 bg-grid-white mask-radial-faded pointer-events-none opacity-20 z-0" />
            <div className="absolute top-1/4 left-0 w-[40%] h-[500px] bg-blue-600/5 blur-[150px] pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-[40%] h-[500px] bg-purple-600/5 blur-[150px] pointer-events-none" />

            <section className="py-24 relative z-10">
                <div className="container-apple">
                    <div className="grid lg:grid-cols-2 gap-20 items-start">
                        {/* Info Column */}
                        <div className="space-y-12">
                            <div>
                                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 mb-8 font-bold tracking-[0.2em] text-[10px] text-blue-400 uppercase">
                                    <MessageSquare className="h-3 w-3" /> Get in Touch
                                </div>
                                <h1 className="text-6xl md:text-7xl font-black text-white mb-8 tracking-tighter leading-none">
                                    Start the <br /> <span className="gradient-text">Conversation</span>.
                                </h1>
                                <p className="text-2xl text-white/50 font-light leading-relaxed max-w-lg">
                                    Our architects are ready to help you rethink what's possible with AI marketing systems uniquely configured for your performance data.
                                </p>
                            </div>

                            <div className="grid gap-8">
                                {[
                                    {
                                        icon: <Mail className="h-6 w-6" />,
                                        label: "Project Inquiries",
                                        value: "hello@ampmarketing.ai",
                                        href: "mailto:hello@ampmarketing.ai"
                                    },
                                    {
                                        icon: <Phone className="h-6 w-6" />,
                                        label: "Voice Intelligence",
                                        value: "+1 (617) 555-0123",
                                        href: "tel:+16175550123"
                                    },
                                    {
                                        icon: <MapPin className="h-6 w-6" />,
                                        label: "Innovation Hub",
                                        value: "Boston, Massachusetts",
                                        href: "#"
                                    },
                                ].map((item, i) => (
                                    <Link key={i} href={item.href} className="flex items-start gap-6 group">
                                        <div className="w-14 h-14 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center justify-center text-blue-400 group-hover:bg-blue-600/10 transition-all font-bold">
                                            {item.icon}
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-black text-white/20 uppercase tracking-[0.2em] mb-1">{item.label}</p>
                                            <p className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors">{item.value}</p>
                                        </div>
                                    </Link>
                                ))}
                            </div>

                            <div className="card-apple p-10 bg-white/[0.01]">
                                <p className="text-white/40 text-sm italic font-light">
                                    "As a division of <strong className="text-white">Prime Marketing Experts</strong>, we bring 7+ years of proven marketing excellence to every AI implementation."
                                </p>
                            </div>
                        </div>

                        {/* Form Column */}
                        <div className="relative">
                            <div className="absolute -inset-4 bg-gradient-to-br from-blue-500/10 to-purple-500/10 blur-[50px] rounded-[3rem] opacity-50" />
                            <div className="card-apple p-10 md:p-14 relative z-10 border-white/10 shadow-2xl">
                                {formStatus === 'sent' ? (
                                    <div className="text-center py-20 animate-in fade-in zoom-in duration-500">
                                        <div className="w-24 h-24 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400 mx-auto mb-8">
                                            <Send className="h-10 w-10 animate-bounce" />
                                        </div>
                                        <h2 className="text-4xl font-bold text-white mb-4 tracking-tighter">Transmission Received</h2>
                                        <p className="text-white/50 text-xl font-light">One of our AI architects will contact you shortly.</p>
                                        <button
                                            onClick={() => setFormStatus('idle')}
                                            className="mt-12 text-blue-400 font-bold border-b border-blue-400/20 pb-1"
                                        >
                                            Send another message
                                        </button>
                                    </div>
                                ) : (
                                    <form onSubmit={handleSubmit} className="space-y-8">
                                        <div className="grid md:grid-cols-2 gap-8">
                                            <div className="space-y-3">
                                                <label className="text-[10px] font-black text-white/30 uppercase tracking-[0.2em] ml-2">Your Name</label>
                                                <input
                                                    required
                                                    type="text"
                                                    value={formData.name}
                                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                    className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all font-light text-lg"
                                                    placeholder="John Doe"
                                                />
                                            </div>
                                            <div className="space-y-3">
                                                <label className="text-[10px] font-black text-white/30 uppercase tracking-[0.2em] ml-2">Email Identity</label>
                                                <input
                                                    required
                                                    type="email"
                                                    value={formData.email}
                                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                                    className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all font-light text-lg"
                                                    placeholder="john@company.com"
                                                />
                                            </div>
                                        </div>
                                        <div className="space-y-3">
                                            <label className="text-[10px] font-black text-white/30 uppercase tracking-[0.2em] ml-2">Target Solution</label>
                                            <select
                                                value={formData.solution}
                                                onChange={(e) => setFormData({ ...formData, solution: e.target.value })}
                                                className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all font-light text-lg appearance-none"
                                            >
                                                <option value="AI Chatbot Assistant">AI Chatbot Assistant</option>
                                                <option value="Predictive Analytics">Predictive Analytics</option>
                                                <option value="Voice Intelligence">Voice Intelligence</option>
                                                <option value="Custom AI Strategy">Custom AI Strategy</option>
                                            </select>
                                        </div>
                                        <div className="space-y-3">
                                            <label className="text-[10px] font-black text-white/30 uppercase tracking-[0.2em] ml-2">Your Vision</label>
                                            <textarea
                                                required
                                                rows={4}
                                                value={formData.message}
                                                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                                className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all font-light text-lg resize-none"
                                                placeholder="Tell us about your business goals..."
                                            />
                                        </div>
                                        <button
                                            type="submit"
                                            disabled={formStatus === 'sending'}
                                            className="w-full py-6 bg-blue-600 hover:bg-blue-500 text-white rounded-2xl font-black text-xl transition-all shadow-2xl shadow-blue-500/20 flex items-center justify-center gap-3 active:scale-[0.98]"
                                        >
                                            {formStatus === 'sending' ? 'Initiating...' : 'Secure Transmission'}
                                            <Send className="h-6 w-6" />
                                        </button>
                                        <div className="flex justify-center gap-6 mt-8">
                                            <div className="flex items-center gap-2 text-white/20 text-[10px] font-bold uppercase tracking-widest">
                                                <ShieldCheck className="h-4 w-4" /> SSL Encrypted
                                            </div>
                                            <div className="flex items-center gap-2 text-white/20 text-[10px] font-bold uppercase tracking-widest">
                                                <Zap className="h-4 w-4" /> High Priority
                                            </div>
                                        </div>
                                    </form>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    )
}
