'use client';

import Link from "next/link"
import { Sparkles, ArrowRight, ShieldCheck, Zap } from "lucide-react"

export function Hero() {
    return (
        <section className="relative min-h-[100vh] flex items-center justify-center overflow-hidden bg-black">
            {/* NOISE OVERLAY */}
            <div className="absolute inset-0 bg-noise pointer-events-none z-[1]" />

            {/* GRID BACKGROUND */}
            <div className="absolute inset-0 bg-grid-white mask-radial-faded pointer-events-none opacity-40 z-0" />

            {/* DYNAMIC GLOWS */}
            <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full bg-blue-600/10 blur-[120px] animate-pulse-glow z-0" />
            <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-purple-600/10 blur-[100px] animate-pulse-glow z-0" style={{ animationDelay: '1.5s' }} />

            {/* EPIC HERO GRAPHIC - High Fidelity Abstract */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[1200px] pointer-events-none opacity-50 z-0">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(37,99,235,0.08)_0%,transparent_70%)]" />

                {/* Orbital Layers */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full border border-white/[0.03] animate-[spin_60s_linear_infinite]" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-white/[0.05] animate-[spin_40s_linear_infinite_reverse]" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full border border-white/[0.08] animate-[spin_20s_linear_infinite]" />

                {/* Data Nodes */}
                <div className="absolute top-[20%] left-[20%] w-1 h-1 bg-blue-400 rounded-full blur-[1px] animate-pulse" />
                <div className="absolute bottom-[30%] right-[25%] w-1.5 h-1.5 bg-purple-400 rounded-full blur-[1px] animate-pulse" style={{ animationDelay: '1s' }} />
                <div className="absolute top-[40%] right-[15%] w-1 h-1 bg-blue-300 rounded-full blur-[1px] animate-pulse" style={{ animationDelay: '2s' }} />
                <div className="absolute bottom-[10%] left-[40%] w-2 h-2 bg-blue-500/20 rounded-full blur-[4px] animate-pulse" />
            </div>

            <div className="container-apple relative z-10 flex flex-col items-center text-center py-20">
                {/* PROVENANCE BADGE */}
                <div className="mb-8 inline-flex items-center gap-2 rounded-full glass px-4 py-2 border border-white/10 animate-fade-in">
                    <div className="flex -space-x-2">
                        <div className="w-5 h-5 rounded-full bg-blue-500 border border-black flex items-center justify-center">
                            <Zap className="w-3 h-3 text-white fill-white" />
                        </div>
                    </div>
                    <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-white/60">
                        AI Enabled Marketing Solutions
                    </span>
                </div>

                {/* MAIN HEADLINE */}
                <h1 className="text-hero gradient-text mb-8 max-w-5xl tracking-tighter">
                    Amplify Your <br className="hidden md:block" /> Intelligence.
                </h1>

                <p className="text-2xl md:text-3xl font-light text-white/50 mb-12 max-w-3xl leading-snug">
                    Ready-to-deploy AI solutions with bespoke configuration for your unique environment, rethinking the boundaries of scale.
                </p>

                {/* ELITE CTAS */}
                <div className="flex flex-col sm:flex-row gap-8 items-center">
                    <Link href="/services">
                        <button className="px-10 py-5 bg-blue-600 hover:bg-blue-500 text-white rounded-full font-bold text-lg transition-all hover:scale-105 shadow-[0_20px_50px_rgba(37,99,235,0.3)] flex items-center gap-3 group">
                            Explore AI Ecosystem
                            <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                        </button>
                    </Link>
                    <Link href="/contact" className="text-white font-bold border-b border-white/20 hover:border-blue-400 hover:text-blue-400 transition-all pb-1 text-lg">
                        Talk to an Architect
                    </Link>
                </div>

                {/* METRICS STRIP */}
                <div className="mt-24 pt-12 border-t border-white/5 w-full max-w-4xl grid grid-cols-2 md:grid-cols-4 gap-8">
                    {[
                        { label: "LATENCY", value: "<150ms" },
                        { label: "UPTIME", value: "99.99%" },
                        { label: "DEPLOYMENT", value: "48 Hours" },
                        { label: "REGION", value: "Global" },
                    ].map((stat, i) => (
                        <div key={i} className="text-center md:text-left">
                            <p className="text-[10px] font-black text-white/30 tracking-widest mb-1">{stat.label}</p>
                            <p className="text-lg font-bold text-white tracking-tight">{stat.value}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* FADE TO CONTENT */}
            <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-black to-transparent z-[5]" />
        </section>
    )
}
