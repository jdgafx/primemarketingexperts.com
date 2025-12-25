import { Hero } from "@/components/Hero"
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
  TrendingUp,
  ShieldCheck
} from "lucide-react"

const iconMap: { [key: string]: React.ReactNode } = {
  MessageSquare: <MessageSquare className="h-6 w-6" />,
  Phone: <Phone className="h-6 w-6" />,
  BarChart: <BarChart className="h-6 w-6" />,
  PenTool: <PenTool className="h-6 w-6" />,
  Share2: <Share2 className="h-6 w-6" />,
  Mail: <Mail className="h-6 w-6" />,
  Target: <Target className="h-6 w-6" />,
  DollarSign: <DollarSign className="h-6 w-6" />,
  Heart: <Heart className="h-6 w-6" />,
  Eye: <Eye className="h-6 w-6" />,
}

export default function Home() {
  const featuredServices = services.slice(0, 4);

  return (
    <main className="min-h-screen bg-black relative overflow-hidden">
      {/* GLOBAL BACKGROUND GRAIN/GRID */}
      <div className="fixed inset-0 bg-noise pointer-events-none z-[1]" />
      <div className="fixed inset-0 bg-grid-white mask-radial-faded pointer-events-none opacity-20 z-0" />

      <Hero />

      {/* Featured Services Section - High Contrast Apple Style */}
      <section className="py-32 relative z-10">
        <div className="container-apple">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 mb-6 font-bold tracking-widest text-[10px] text-blue-400 uppercase">
                <Sparkles className="h-3 w-3" /> Conversion-Optimized
              </div>
              <h2 className="text-headline text-white mb-6 tracking-tighter leading-none">
                AI enabled technologies <br /> for <span className="gradient-text">maximum conversion</span>.
              </h2>
              <p className="text-xl text-white/40 font-light max-w-xl">
                Marketing solutions engineered with deep machine learning to optimize every customer touchpoint for the best possible outcome.
              </p>
            </div>
            <Link href="/services" className="group flex items-center gap-3 text-white font-bold hover:text-blue-400 transition-colors pb-2 border-b border-white/10 hover:border-blue-500/40">
              View Entire Catalog <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {featuredServices.map((service, index) => (
              <Link href={`/services/${service.slug}`} key={service.slug}>
                <div className="card-apple p-10 h-full hover-lift cursor-pointer group border-glow">
                  <div className="w-14 h-14 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center justify-center mb-8 text-blue-400 group-hover:scale-110 transition-transform duration-500 shadow-2xl">
                    {iconMap[service.icon]}
                  </div>
                  <div className="space-y-4">
                    <h3 className="text-2xl font-bold text-white tracking-tight group-hover:text-blue-400 transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-sm font-black text-blue-500/40 uppercase tracking-[0.2em]">
                      {service.tagline}
                    </p>
                    <p className="text-white/40 text-lg leading-relaxed font-light">
                      {service.description}
                    </p>
                  </div>
                  <div className="mt-10 flex items-center text-white/20 text-xs font-bold tracking-widest uppercase group-hover:text-blue-400 transition-colors">
                    Technical Specifications <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Deep Metrics Strip */}
      <section className="py-24 relative z-10 overflow-hidden border-y border-white/5 bg-white/[0.01]">
        <div className="container-apple relative">
          {/* Metrics Background Decoration */}
          <div className="absolute -top-24 -left-24 w-64 h-64 bg-blue-500/5 blur-[80px] rounded-full pointer-events-none" />
          <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-purple-500/5 blur-[80px] rounded-full pointer-events-none" />

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 relative z-10">
            {[
              { value: "98.4%", label: "Accuracy Rate", desc: "Based on LLM benchmarks" },
              { value: "24/7", label: "Runtime", desc: "Global edge deployment" },
              { value: "100+", label: "Integrations", desc: "CRM, ERP & Social Apps" },
              { value: "0ms", label: "Downtime", desc: "High availability cluster" },
            ].map((stat, i) => (
              <div key={i} className="text-center md:text-left group relative">
                <div className="absolute -inset-4 bg-white/[0.02] rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />
                <div className="text-4xl md:text-5xl font-black text-white mb-2 tracking-tighter group-hover:gradient-text-blue transition-all">
                  {stat.value}
                </div>
                <div className="text-white font-bold text-xs uppercase tracking-widest mb-1 shadow-glow-blue">
                  {stat.label}
                </div>
                <div className="text-white/30 text-[10px] uppercase font-medium">
                  {stat.desc}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Strategic Integration Section */}
      <section className="py-32 relative z-10 bg-dot-white">
        <div className="container-apple">
          <div className="card-apple p-12 md:p-20 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-12 opacity-[0.02] group-hover:opacity-[0.05] transition-opacity">
              <ShieldCheck className="w-64 h-64" />
            </div>

            <div className="grid md:grid-cols-2 gap-16 items-center">
              <div>
                <div className="w-12 h-12 rounded-xl bg-blue-600/20 flex items-center justify-center text-blue-400 mb-8">
                  <TrendingUp className="h-6 w-6" />
                </div>
                <h2 className="text-5xl font-bold text-white mb-8 tracking-tighter">Strategic Intelligence.</h2>
                <p className="text-xl text-white/50 leading-relaxed font-light mb-10">
                  We don't just sell software. We architect intelligence. Every Amp deployment is backed by the strategic marketing legacy of Prime Marketing Experts—ensuring your tech works for your bottom line.
                </p>
                <Link href="/about">
                  <button className="btn-apple-secondary text-white font-bold px-8">
                    Our Strategic Legacy
                  </button>
                </Link>
              </div>
              <div className="space-y-4 relative">
                {/* Visual Connector Lines */}
                <div className="absolute -left-8 top-10 bottom-10 w-[1px] bg-gradient-to-b from-transparent via-blue-500/20 to-transparent hidden md:block" />

                {[
                  "Secure-By-Design Infrastructure",
                  "Environmental Performance Optimization",
                  "Real-Time ROI Dashboards",
                  "Omnichannel Deployment"
                ].map((item, i) => (
                  <div key={i} className="glass p-6 rounded-2xl flex items-center justify-between group/item hover:bg-white/[0.05] transition-all border-white/5 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-blue-500/5 to-transparent -translate-x-full group-hover/item:translate-x-full transition-transform duration-1000" />
                    <span className="text-white font-bold tracking-tight relative z-10">{item}</span>
                    <CheckCircle className="h-5 w-5 text-blue-500 opacity-20 group-hover/item:opacity-100 transition-opacity relative z-10" />
                  </div>
                ))}

                {/* Decorative floating nodes */}
                <div className="absolute -bottom-10 -right-10 w-24 h-24 bg-blue-500/10 blur-[40px] rounded-full animate-pulse" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* High-Impact CTA */}
      <section className="py-40 relative z-10">
        <div className="container-apple text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-6xl md:text-8xl font-black text-white mb-12 tracking-tighter leading-none">
              Ready to <span className="gradient-text">evolve</span>?
            </h2>
            <p className="text-2xl md:text-3xl text-white/40 font-light mb-16 leading-tight">
              Join the exclusive group of businesses utilizing Amp AI to drive 10x marketing efficiency.
            </p>
            <div className="flex flex-col sm:flex-row gap-8 justify-center items-center relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full blur opacity-20 group-hover:opacity-40 animate-pulse-slow pointer-events-none" />
              <Link href="/contact" className="relative group">
                <button className="px-12 py-6 bg-blue-600 hover:bg-blue-500 text-white rounded-full font-black text-lg transition-all hover:scale-105 shadow-[0_20px_50px_rgba(37,99,235,0.4)] flex items-center gap-3">
                  Consult an AI Architect <ArrowRight className="h-6 w-6" />
                </button>
              </Link>
              <Link href="/services" className="text-white font-bold border-b border-white/20 hover:border-blue-400 hover:text-blue-400 transition-all pb-1 text-lg">
                Explore the Catalog
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

function CheckCircle({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  )
}
