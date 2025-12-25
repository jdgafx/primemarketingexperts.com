import { services, getServiceBySlug } from "@/lib/services"
import { notFound } from "next/navigation"
import Link from "next/link"
import {
    ArrowLeft,
    ArrowRight,
    Check,
    Sparkles,
    TrendingUp,
    Lightbulb,
    ShieldCheck,
    Cpu,
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
    Zap
} from "lucide-react"

const iconMap: { [key: string]: React.ReactNode } = {
    MessageSquare: <MessageSquare className="h-10 w-10" />,
    Phone: <Phone className="h-10 w-10" />,
    BarChart: <BarChart className="h-10 w-10" />,
    PenTool: <PenTool className="h-10 w-10" />,
    Share2: <Share2 className="h-10 w-10" />,
    Mail: <Mail className="h-10 w-10" />,
    Target: <Target className="h-10 w-10" />,
    DollarSign: <DollarSign className="h-10 w-10" />,
    Heart: <Heart className="h-10 w-10" />,
    Eye: <Eye className="h-10 w-10" />,
}

interface PageProps {
    params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
    return services.map((service) => ({
        slug: service.slug,
    }))
}

export async function generateMetadata({ params }: PageProps) {
    const resolvedParams = await params
    const service = getServiceBySlug(resolvedParams.slug)

    if (!service) {
        return { title: "Service Not Found" }
    }

    return {
        title: `${service.title} | Amp Marketing`,
        description: service.description,
    }
}

export default async function ServicePage({ params }: PageProps) {
    const resolvedParams = await params
    const service = getServiceBySlug(resolvedParams.slug)

    if (!service) {
        notFound()
    }

    const currentIndex = services.findIndex((s) => s.slug === resolvedParams.slug)
    const prevService = currentIndex > 0 ? services[currentIndex - 1] : null
    const nextService = currentIndex < services.length - 1 ? services[currentIndex + 1] : null

    return (
        <main className="min-h-screen bg-black pt-24 relative overflow-hidden">
            {/* BACKGROUND DECOR - Apple Aesthetic */}
            <div className="absolute inset-0 bg-grid-white mask-radial-faded pointer-events-none opacity-40" />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[800px] bg-gradient-to-b from-blue-600/10 via-purple-600/5 to-transparent blur-[120px] pointer-events-none" />
            <div className="absolute -top-[10%] -right-[10%] w-[40%] h-[40%] bg-blue-500/10 blur-[120px] rounded-full pointer-events-none animate-pulse-glow" />

            {/* Nav Header */}
            <div className="container-apple py-8 relative z-10">
                <Link href="/services" className="inline-flex items-center text-white/40 hover:text-blue-400 text-sm font-medium transition-colors group">
                    <ArrowLeft className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                    Back to AI Enabled Marketing
                </Link>
            </div>

            {/* Hero Section */}
            <section className="pb-24 relative z-10">
                <div className="container-apple">
                    <div className="flex flex-col lg:flex-row gap-16 items-center">
                        <div className="flex-1">
                            <div className="flex items-center gap-3 mb-6">
                                <span className="inline-block py-1.5 px-4 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-bold uppercase tracking-[0.2em]">
                                    Conversion Optimized AI
                                </span>
                                <div className="h-[1px] w-12 bg-white/10" />
                                <span className="text-white/30 text-[10px] uppercase tracking-[0.2em] font-bold">Protocol v2.4</span>
                            </div>
                            <h1 className="text-hero gradient-text mb-8">
                                {service.title}
                            </h1>
                            <p className="text-3xl text-white/95 font-light mb-10 leading-tight max-w-2xl">
                                {service.tagline}
                            </p>
                            <p className="text-xl text-white/70 max-w-3xl leading-relaxed font-light">
                                {service.deepContent.intro}
                            </p>
                        </div>

                        {/* ABSTRACT APPLE GRAPHIC */}
                        <div className="flex-1 w-full lg:w-auto relative group">
                            <div className="relative aspect-square max-w-[500px] mx-auto">
                                {/* Outer Glows */}
                                <div className="absolute inset-x-0 -inset-y-20 bg-blue-500/20 blur-[120px] rounded-full group-hover:bg-blue-500/30 transition-colors duration-1000 pointer-events-none" />
                                <div className="absolute inset-20 bg-purple-600/10 blur-[100px] rounded-full group-hover:bg-purple-600/20 transition-colors duration-1000 delay-100 pointer-events-none" />

                                {/* Glass Container */}
                                <div className="absolute inset-0 glass border-white/10 rounded-[48px] overflow-hidden flex items-center justify-center shadow-2xl">
                                    {/* Moving Grid Background */}
                                    <div className="absolute inset-0 bg-grid-white opacity-[0.03] group-hover:opacity-[0.08] transition-opacity duration-1000" />

                                    {/* Dynamic Content based on Service */}
                                    <div className="relative z-10 w-full h-full flex items-center justify-center p-12">
                                        <div className="w-full h-full relative flex items-center justify-center">
                                            {/* Core Sphere */}
                                            <div className="absolute w-48 h-48 rounded-full bg-gradient-to-br from-blue-400/20 to-purple-600/20 blur-3xl animate-pulse" />
                                            <div className="absolute w-40 h-40 rounded-full glass-strong border-white/20 flex items-center justify-center shadow-inner overflow-hidden">
                                                {/* Internal Glow */}
                                                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 via-transparent to-purple-600/20 animate-pulse" />
                                                <div className="text-blue-400 relative z-10 animate-float drop-shadow-[0_0_15px_rgba(96,165,250,0.5)]">
                                                    {iconMap[service.icon]}
                                                </div>
                                            </div>

                                            {/* Orbiting Elements */}
                                            <div className="absolute w-[80%] h-[80%] border border-white/5 rounded-full animate-[spin_30s_linear_infinite]" />
                                            <div className="absolute w-[100%] h-[100%] border border-white/5 rounded-full animate-[spin_40s_linear_infinite_reverse]" />

                                            {/* Floating Particles */}
                                            <div className="absolute top-[20%] left-[20%] w-2 h-2 rounded-full bg-blue-400/40 blur-[1px] animate-pulse" />
                                            <div className="absolute bottom-[30%] right-[20%] w-4 h-4 rounded-full bg-purple-500/30 blur-[2px] animate-pulse delay-700" />
                                            <div className="absolute top-[40%] right-[10%] w-1.5 h-1.5 rounded-full bg-white/20 blur-[1px] animate-pulse delay-500" />
                                        </div>
                                    </div>

                                    {/* Overlay Gradient for depth */}
                                    <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/5 via-transparent to-purple-500/5 pointer-events-none" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Facts and Stats Row - Glass Dark Mode */}
            <section className="py-24 relative z-10 overflow-hidden">
                <div className="absolute inset-0 bg-white/[0.01] border-y border-white/5" />
                <div className="container-apple relative">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
                        {service.deepContent.facts.map((fact, i) => (
                            <div key={i} className="flex flex-col gap-6 group">
                                <div className="flex items-center gap-4">
                                    <div className="h-[1px] flex-1 bg-gradient-to-r from-blue-500/50 to-transparent" />
                                    <Sparkles className="h-4 w-4 text-blue-400 animate-pulse" />
                                </div>
                                <p className="text-white/80 text-xl leading-relaxed font-light tracking-tight group-hover:text-white transition-colors">
                                    {fact}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Value Proposition Grid */}
            <section className="py-32 relative z-10">
                <div className="container-apple">
                    <div className="grid md:grid-cols-2 gap-8">
                        {/* Business Value */}
                        <div className="card-apple p-12 flex flex-col gap-8 relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-8 opacity-[0.03] group-hover:opacity-[0.07] transition-opacity">
                                <TrendingUp className="w-32 h-32" />
                            </div>
                            <div className="w-14 h-14 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-400 border border-blue-500/20">
                                <TrendingUp className="h-7 w-7" />
                            </div>
                            <div>
                                <h2 className="text-3xl font-bold text-white tracking-tight mb-6">Real Business Value</h2>
                                <p className="text-white/80 text-xl leading-relaxed font-light italic border-l-2 border-blue-500/30 pl-6">
                                    {service.deepContent.businessValue}
                                </p>
                            </div>
                            <div className="mt-4 space-y-5">
                                {service.benefits.map((benefit, i) => (
                                    <div key={i} className="flex items-start gap-4">
                                        <div className="mt-1.5 h-1.5 w-1.5 rounded-full bg-blue-500 shrink-0 shadow-[0_0_8px_rgba(59,130,246,0.8)]" />
                                        <span className="text-white/80 font-medium text-lg leading-tight">{benefit}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Technical Edge */}
                        <div className="card-apple p-12 flex flex-col gap-8 relative overflow-hidden group bg-gradient-to-br from-white/[0.05] to-transparent">
                            <div className="absolute top-0 right-0 p-8 opacity-[0.03] group-hover:opacity-[0.07] transition-opacity">
                                <Cpu className="w-32 h-32" />
                            </div>
                            <div className="w-14 h-14 rounded-2xl bg-purple-500/10 flex items-center justify-center text-purple-400 border border-purple-500/20">
                                <Cpu className="h-7 w-7" />
                            </div>
                            <div>
                                <h2 className="text-3xl font-bold text-white tracking-tight mb-6">The Technical Edge</h2>
                                <p className="text-white/80 text-xl leading-relaxed font-light italic border-l-2 border-purple-500/30 pl-6">
                                    {service.deepContent.technicalEdge}
                                </p>
                            </div>
                            <div className="mt-4">
                                <p className="text-[10px] font-black text-purple-400 uppercase tracking-[0.3em] mb-6">Optimized Logic Layer</p>
                                <div className="grid grid-cols-2 gap-4">
                                    {service.features.map((feat, i) => (
                                        <div key={i} className="px-4 py-3 rounded-xl bg-white/[0.03] border border-white/5 text-white/60 text-xs font-semibold hover:bg-white/[0.05] transition-colors">
                                            {feat}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Use Case Gallery - Dynamic Contrast */}
            <section className="py-32 relative z-10 bg-dot-white">
                <div className="container-apple">
                    <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
                        <div className="max-w-xl">
                            <h2 className="text-5xl font-bold text-white tracking-tighter mb-4">Functional Versatility</h2>
                            <p className="text-xl text-white/70 font-light italic">
                                Built to address real-world business challenges at scale.
                            </p>
                        </div>
                        <div className="hidden md:block h-[1px] flex-1 bg-white/5 mx-12 mb-6" />
                        <div className="flex items-center gap-2 text-blue-400 font-bold tracking-widest text-[10px] uppercase mb-6">
                            <ShieldCheck className="h-4 w-4" /> SECURE DEPLOYMENT
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {service.useCases.map((useCase, i) => (
                            <div key={i} className="glass p-10 group hover:border-blue-500/40 transition-all duration-500 relative overflow-hidden flex flex-col justify-end min-h-[280px]">
                                <div className="absolute top-0 right-0 p-6 text-7xl font-black text-white/[0.02] group-hover:text-blue-500/[0.05] transition-colors">
                                    {i + 1}
                                </div>
                                <div className="w-10 h-1 bg-blue-500/30 mb-8 group-hover:w-20 group-hover:bg-blue-500 transition-all duration-500" />
                                <h3 className="text-xl font-bold text-white leading-tight">
                                    {useCase}
                                </h3>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Large CTA Section - High Contrast */}
            <section className="py-40 relative z-10">
                <div className="container-apple">
                    <div className="relative rounded-[3rem] overflow-hidden bg-white/[0.02] border border-white/10 p-12 md:p-32 text-center group">
                        <div className="absolute inset-0 bg-grid-white opacity-20 pointer-events-none" />
                        <div className="absolute -bottom-1/2 -left-1/4 w-full h-full bg-blue-600/10 blur-[150px] rounded-full group-hover:bg-blue-600/20 transition-colors" />

                        <div className="relative z-10">
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border-white/10 mb-12 animate-bounce">
                                <Zap className="h-4 w-4 text-blue-400 fill-blue-400" />
                                <span className="text-xs font-bold text-white tracking-widest uppercase">Immediate Action Required</span>
                            </div>
                            <h2 className="text-6xl md:text-8xl font-black text-white mb-10 tracking-tighter leading-none">
                                Deploy <span className="gradient-text">Intelligence</span>.
                            </h2>
                            <p className="text-2xl text-white/70 max-w-2xl mx-auto mb-16 font-light">
                                Our implementation team can have your {service.title} configured for your specific environment in as little as 48 hours.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-8 justify-center items-center">
                                <Link href="/contact">
                                    <button className="px-12 py-6 bg-blue-600 hover:bg-blue-500 text-white rounded-full font-black text-lg transition-all hover:scale-105 shadow-[0_20px_50px_rgba(37,99,235,0.3)] flex items-center gap-3">
                                        Build Your POC <ArrowRight className="h-6 w-6" />
                                    </button>
                                </Link>
                                <Link href="/contact" className="text-white font-bold border-b border-white/20 hover:border-blue-400 hover:text-blue-400 transition-all pb-1 text-lg">
                                    Request Technical Specs
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Bottom Nav - Apple Style */}
            <section className="py-20 border-t border-white/5 relative z-10">
                <div className="container-apple">
                    <div className="flex justify-between items-center gap-8">
                        {prevService ? (
                            <Link href={`/services/${prevService.slug}`} className="group max-w-[45%]">
                                <div className="flex flex-col gap-2">
                                    <span className="text-white/20 text-[10px] font-black uppercase tracking-[0.3em] group-hover:text-blue-400 transition-colors">Previous</span>
                                    <span className="text-2xl text-white/60 group-hover:text-white transition-colors flex items-center gap-3 font-bold tracking-tighter">
                                        <ArrowLeft className="h-6 w-6 shrink-0 group-hover:-translate-x-1 transition-transform" />
                                        {prevService.title}
                                    </span>
                                </div>
                            </Link>
                        ) : <div />}

                        {nextService ? (
                            <Link href={`/services/${nextService.slug}`} className="group text-right max-w-[45%]">
                                <div className="flex flex-col gap-2 items-end">
                                    <span className="text-white/20 text-[10px] font-black uppercase tracking-[0.3em] group-hover:text-blue-400 transition-colors">Next Solution</span>
                                    <span className="text-2xl text-white/60 group-hover:text-white transition-colors flex items-center gap-3 font-bold tracking-tighter">
                                        {nextService.title}
                                        <ArrowRight className="h-6 w-6 shrink-0 group-hover:translate-x-1 transition-transform" />
                                    </span>
                                </div>
                            </Link>
                        ) : <div />}
                    </div>
                </div>
            </section>
        </main>
    )
}
