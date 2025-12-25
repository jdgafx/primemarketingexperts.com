import Link from "next/link"
import { ArrowRight, Zap, Brain, Users, Target, ShieldCheck } from "lucide-react"

export const metadata = {
    title: "About | Amp Marketing",
    description: "Learn about Amp Marketing - providers of AI enabled marketing solutions designed for best conversion.",
}

export default function AboutPage() {
    return (
        <main className="min-h-screen bg-black pt-24">
            {/* Hero */}
            <section className="py-16 md:py-24 relative overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-gradient-to-b from-blue-600/5 to-transparent pointer-events-none" />

                <div className="container-apple text-center relative z-10">
                    {/* New higher placement of the attribution */}
                    <Link href="https://primemarketingexperts.com" target="_blank" className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border-blue-500/20 mb-8 hover:bg-blue-500/10 transition-colors group">
                        <ShieldCheck className="h-4 w-4 text-blue-400" />
                        <span className="text-sm font-medium text-white/60 group-hover:text-blue-400 transition-colors">
                            Powered by <span className="text-white">Prime Marketing Experts</span>
                        </span>
                    </Link>

                    <h1 className="text-hero gradient-text mb-6">
                        About Amp
                    </h1>
                    <p className="text-subheadline max-w-2xl mx-auto">
                        Conversion-first intelligence. We build AI enabled marketing solutions designed to amplify ROI and rethink business scale.
                    </p>
                </div>
            </section>

            {/* Story with integrated attribution */}
            <section className="pb-24">
                <div className="container-apple">
                    <div className="max-w-3xl mx-auto">
                        <div className="card-apple p-8 md:p-12 mb-12 relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-4 opacity-10">
                                <Zap className="h-24 w-24 text-blue-500" />
                            </div>

                            <h2 className="text-3xl font-bold text-white mb-8 tracking-tight">Our Story</h2>
                            <div className="space-y-6 text-white/70 text-lg leading-relaxed">
                                <p>
                                    <strong className="text-white font-semibold">Amp Marketing</strong> was born from a simple observation: the digital marketing landscape is shifting from manual execution to intelligent automation.
                                </p>
                                <p>
                                    As the dedicated AI-focused division of <strong className="text-blue-400 font-semibold">Prime Marketing Experts</strong>, we leverage over 7 years of deep industry experience in Boston and beyond to deliver solutions that are technically superior and commercially viable.
                                </p>
                                <p>
                                    While others follow trends, we build tools that set them. Our team of data scientists and marketing strategists work in unison to ensure that every AI system we deploy moves the needle for your business.
                                </p>
                            </div>
                        </div>

                        {/* Values */}
                        <div className="grid md:grid-cols-2 gap-6">
                            {[
                                {
                                    icon: <Brain className="h-6 w-6" />,
                                    title: "Intelligence First",
                                    desc: "Every solution we build is designed to learn, adapt, and improve from every interaction."
                                },
                                {
                                    icon: <Target className="h-6 w-6" />,
                                    title: "Results-Driven",
                                    desc: "We prioritize actual ROI and revenue growth over vanity metrics and buzzwords."
                                },
                                {
                                    icon: <Users className="h-6 w-6" />,
                                    title: "Human-Centered",
                                    desc: "Our AI is designed to augment human teams, not replace the essential creativity of your brand."
                                },
                                {
                                    icon: <Zap className="h-6 w-6" />,
                                    title: "Always Innovating",
                                    desc: "The AI landscape moves weekly; our team ensures you're always on the leading edge."
                                },
                            ].map((value, i) => (
                                <div key={i} className="card-apple p-8 group hover:border-blue-500/30 transition-all">
                                    <div className="w-14 h-14 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-400 mb-6 group-hover:scale-110 transition-transform">
                                        {value.icon}
                                    </div>
                                    <h3 className="text-xl font-bold text-white mb-3 tracking-tight">{value.title}</h3>
                                    <p className="text-white/50 leading-relaxed">{value.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Detailed Prime Marketing Section - Enhanced */}
            <section className="py-24 border-t border-white/10 relative">
                <div className="container-apple">
                    <div className="card-apple p-12 md:p-16 border-blue-500/10">
                        <div className="grid md:grid-cols-2 gap-12 items-center">
                            <div>
                                <p className="text-blue-400 text-sm font-bold uppercase tracking-widest mb-4">Strategic Foundation</p>
                                <h2 className="text-4xl font-bold text-white mb-6">Built on a Legacy of Success</h2>
                                <p className="text-white/60 text-lg mb-8 leading-relaxed">
                                    Amp Marketing isn't just a startup; it's the culmination of years of dedicated service under Prime Marketing Experts. Our parent agency has been a cornerstone of digital strategy since 2017, providing the stability and marketing depth required to build truly effective AI.
                                </p>
                                <div className="flex flex-wrap gap-4">
                                    <Link href="https://primemarketingexperts.com" target="_blank">
                                        <button className="btn-apple-primary">
                                            Visit Parent Agency
                                        </button>
                                    </Link>
                                    <Link href="/contact">
                                        <button className="btn-apple-secondary text-white inline-flex items-center gap-2">
                                            Partner With Us <ArrowRight className="h-4 w-4" />
                                        </button>
                                    </Link>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                {[
                                    { label: "Founded", value: "2017" },
                                    { label: "Location", value: "Boston, MA" },
                                    { label: "Expertise", value: "Digital Strategy" },
                                    { label: "Staff", value: "AI & Marketing" }
                                ].map((stat, i) => (
                                    <div key={i} className="glass p-6 rounded-2xl border-white/5">
                                        <p className="text-white/40 text-xs font-bold uppercase tracking-widest mb-1">{stat.label}</p>
                                        <p className="text-xl font-bold text-white">{stat.value}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Large CTA */}
            <section className="py-32 relative overflow-hidden">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-blue-600/15 blur-[150px] rounded-full" />

                <div className="container-apple relative z-10 text-center">
                    <h2 className="text-5xl md:text-6xl font-black text-white mb-8 tracking-tight">
                        Ready to <span className="gradient-text">Amplify</span>?
                    </h2>
                    <p className="text-xl text-white/50 max-w-2xl mx-auto mb-12">
                        Combine the power of AI with a strategic marketing foundation that has been proven for nearly a decade.
                    </p>
                    <Link href="/contact">
                        <button className="px-10 py-5 bg-blue-600 hover:bg-blue-500 text-white rounded-full font-bold text-lg transition-all hover:scale-105 shadow-2xl shadow-blue-500/20">
                            Scale Your Conversion Strategy
                        </button>
                    </Link>
                </div>
            </section>
        </main>
    )
}
