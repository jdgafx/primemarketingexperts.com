import { services } from "@/lib/services"
import Link from "next/link"
import {
    ArrowRight,
    MessageSquare,
    Phone,
    BarChart,
    PenTool,
    Share2,
    Mail,
    Target,
    DollarSign,
    Heart,
    Eye,
    Sparkles,
    Zap,
    Cpu,
    ShieldCheck
} from "lucide-react"

const iconMap: { [key: string]: React.ReactNode } = {
    MessageSquare: <MessageSquare className="h-8 w-8" />,
    Phone: <Phone className="h-8 w-8" />,
    BarChart: <BarChart className="h-8 w-8" />,
    PenTool: <PenTool className="h-8 w-8" />,
    Share2: <Share2 className="h-8 w-8" />,
    Mail: <Mail className="h-8 w-8" />,
    Target: <Target className="h-8 w-8" />,
    DollarSign: <DollarSign className="h-8 w-8" />,
    Heart: <Heart className="h-8 w-8" />,
    Eye: <Eye className="h-8 w-8" />,
}

export const metadata = {
    title: "AI Marketing Catalog | Amp Marketing",
    description: "Explore our full suite of AI-powered marketing solutions engineered for scale and precision.",
}

export default function ServicesPage() {
    return (
        <main className="min-h-screen bg-black pt-24 relative overflow-hidden">
            {/* BACKGROUND DECOR */}
            <div className="fixed inset-0 bg-noise pointer-events-none z-[1]" />
            <div className="fixed inset-0 bg-grid-white mask-radial-faded pointer-events-none opacity-20 z-0" />
            <div className="absolute top-0 right-0 w-[50%] h-[500px] bg-blue-600/5 blur-[150px] pointer-events-none" />

            {/* Hero */}
            <section className="py-24 relative z-10">
                <div className="container-apple">
                    <div className="max-w-4xl">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 mb-8 font-bold tracking-[0.2em] text-[10px] text-blue-400 uppercase">
                            <Cpu className="h-3 w-3" /> Conversion Logic
                        </div>
                        <h1 className="text-hero gradient-text mb-8 tracking-tighter">
                            AI Enabled <br /> Marketing.
                        </h1>
                        <p className="text-2xl text-white/50 max-w-2xl font-light leading-relaxed">
                            A modular suite of marketing solutions engineered for best conversion, designed to automate complex operations and deliver measurable ROI.
                        </p>
                    </div>
                </div>
            </section>

            {/* Services Grid */}
            <section className="pb-40 relative z-10">
                <div className="container-apple">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {services.map((service) => (
                            <Link href={`/services/${service.slug}`} key={service.slug}>
                                <div className="card-apple p-10 h-full hover-lift cursor-pointer group relative overflow-hidden">
                                    {/* Background Subtle Icon */}
                                    <div className="absolute -bottom-4 -right-4 opacity-[0.02] group-hover:opacity-[0.05] transition-opacity">
                                        {iconMap[service.icon]}
                                    </div>

                                    <div className="w-14 h-14 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center justify-center mb-8 text-blue-400 group-hover:bg-blue-600/10 group-hover:text-blue-300 transition-all duration-500">
                                        {iconMap[service.icon]}
                                    </div>
                                    <h3 className="text-2xl font-bold text-white mb-3 tracking-tight group-hover:text-blue-400 transition-colors">
                                        {service.title}
                                    </h3>
                                    <p className="text-[12px] font-black text-blue-400 uppercase tracking-[0.3em] mb-6">
                                        {service.tagline}
                                    </p>
                                    <p className="text-white/40 text-lg leading-relaxed font-light mb-8">
                                        {service.description}
                                    </p>
                                    <div className="flex items-center text-white/30 text-xs font-bold tracking-widest uppercase group-hover:text-blue-400 transition-all">
                                        Specifications <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-32 relative z-10">
                <div className="container-apple">
                    <div className="card-apple p-16 md:p-24 text-center border-white/10 bg-gradient-to-b from-white/[0.03] to-transparent">
                        <div className="max-w-3xl mx-auto">
                            <h2 className="text-5xl font-bold text-white mb-8 tracking-tighter">Custom Intelligence Architecture</h2>
                            <p className="text-xl text-white/40 font-light mb-12 italic">
                                "Our team will help you identify the perfect AI enabled marketing solutions for your business needs."
                            </p>
                            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                                <Link href="/contact">
                                    <button className="px-10 py-5 bg-blue-600 hover:bg-blue-500 text-white rounded-full font-bold text-lg transition-all hover:scale-105 shadow-2xl shadow-blue-500/20">
                                        Get a Free Consultation
                                    </button>
                                </Link>
                                <div className="text-white/30 font-bold flex items-center gap-2 text-xs tracking-widest uppercase">
                                    <ShieldCheck className="h-4 w-4" /> Enterprise Ready
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    )
}
