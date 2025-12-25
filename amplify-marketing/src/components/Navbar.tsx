'use client';

import Link from "next/link"
import { useState } from "react"
import { Menu, X, Zap } from "lucide-react"

const navLinks = [
    { name: "Services", href: "/services" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
]

export function Navbar() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <nav className="fixed top-0 left-0 right-0 z-[100] glass border-b border-white/5">
            <div className="container-apple">
                <div className="flex items-center justify-between h-20">
                    {/* Logo - Premium Apple Aesthetic */}
                    <Link href="/" className="flex items-center gap-2 text-white font-bold tracking-tighter text-2xl group shrink-0">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center group-hover:scale-110 transition-transform duration-500 shadow-lg shadow-blue-500/20">
                            <Zap className="h-6 w-6 text-white fill-white/20" />
                        </div>
                        <div className="flex items-baseline">
                            <span className="gradient-text-blue">Amp</span>
                            <span className="text-white/40 font-light hidden sm:inline ml-1">Marketing</span>
                        </div>
                    </Link>

                    {/* Centered Desktop Navigation - Larger Words */}
                    <div className="hidden md:flex items-center justify-center absolute left-1/2 -translate-x-1/2 gap-12">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className="text-lg text-white/90 hover:text-white transition-all tracking-tight font-medium hover:scale-105"
                            >
                                {link.name}
                            </Link>
                        ))}
                    </div>

                    {/* CTA Button */}
                    <div className="hidden md:block shrink-0">
                        <Link href="/contact">
                            <button className="px-6 py-2.5 text-sm font-bold tracking-tight text-white bg-blue-600 rounded-full hover:bg-blue-500 hover:shadow-[0_0_30px_rgba(37,99,235,0.4)] transition-all duration-300">
                                Get Started
                            </button>
                        </Link>
                    </div>

                    {/* Mobile menu button */}
                    <button
                        className="md:hidden text-white p-2"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    >
                        {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                    </button>
                </div>
            </div>

            {/* Mobile menu */}
            {mobileMenuOpen && (
                <div className="md:hidden glass border-t border-white/10 animate-in slide-in-from-top-4 duration-300">
                    <div className="container-apple py-10 space-y-6">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className="block text-2xl text-white/80 hover:text-white py-2 font-bold tracking-tight"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                {link.name}
                            </Link>
                        ))}
                        <Link href="/contact" onClick={() => setMobileMenuOpen(false)}>
                            <button className="w-full px-4 py-5 text-lg font-black text-white bg-blue-600 rounded-2xl hover:bg-blue-700 transition-colors shadow-2xl shadow-blue-900/40">
                                Start Scaling with AI
                            </button>
                        </Link>
                    </div>
                </div>
            )}
        </nav>
    )
}
