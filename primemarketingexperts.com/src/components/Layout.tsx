'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react'; // Added useState for Navbar
import {
    mainNavigation,
    footerServices,
    // isDropdown, // Removed as it's no longer used by the new Navbar
    // type NavElement, // Removed as it's no longer used by the new Navbar
    // type NavItem, // Removed as it's no longer used by the new Navbar
    // type NavDropdown // Removed as it's no longer used by the new Navbar
} from '@/lib/navigation';

// NavDropdownMenu and NavLink components are removed as they are replaced by the new Navbar implementation.

export function Navbar() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    return (
        <nav className="bg-white w-full h-auto shadow-sm sticky top-0 z-[100] font-poppins">
            {/* Main Container - Desktop */}
            <div className="hidden xl:flex flex-row items-center justify-between py-4 h-24 container mx-auto px-4 font-poppins">
                {/* Logo Section */}
                <div className="flex items-center">
                    <Link href="/" className="transition-opacity hover:opacity-90">
                        <Image
                            src="/pme-logo.png"
                            alt="Prime Marketing Experts"
                            width={247}
                            height={80}
                            className="object-contain"
                            priority
                        />
                    </Link>
                </div>

                {/* Navigation Links */}
                <div className="flex items-center gap-2">
                    {mainNavigation.map((item) => (
                        <div key={item.label} className="relative group px-2">
                            {'items' in item ? (
                                <div className="flex items-center gap-1 py-4 px-2 cursor-pointer group">
                                    <span className="text-[15px] font-bold text-gray-800 hover:text-orange-600 transition-colors">
                                        {item.label}
                                    </span>
                                    {item.label === 'AI Services' && (
                                        <span className="relative flex h-2 w-2 -mt-2 -ml-1">
                                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                                            <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
                                        </span>
                                    )}
                                    <svg className="w-3 h-3 text-gray-400 group-hover:text-orange-600 transition-transform group-hover:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </svg>

                                    {/* Dropdown Menu */}
                                    <div className="absolute top-full left-0 mt-0 w-64 bg-white shadow-xl rounded-b-lg overflow-hidden opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 border-t-4 border-orange-500 z-[110]">
                                        <div className="py-2">
                                            {(item as any).items.map((subItem: any) => (
                                                <Link
                                                    key={subItem.label}
                                                    href={subItem.href}
                                                    className="block px-6 py-3 text-[14px] text-gray-600 hover:bg-gray-50 hover:text-orange-600 font-medium transition-colors"
                                                >
                                                    {subItem.label}
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <Link
                                    href={(item as any).href}
                                    className="block py-4 px-2 text-[15px] font-bold text-gray-800 hover:text-orange-600 transition-colors"
                                >
                                    {item.label}
                                </Link>
                            )}
                        </div>
                    ))}
                </div>

                {/* CTA Button */}
                <Link href="/free-strategy-session">
                    <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-8 py-3 rounded-full font-bold text-[15px] hover:shadow-lg transition-all transform hover:-translate-y-0.5 flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        Free Strategy Session
                    </div>
                </Link>
            </div>

            {/* Mobile Header */}
            <div className="xl:hidden flex items-center justify-between px-4 py-4 border-b bg-white relative z-50">
                <Link href="/">
                    <Image src="/pme-logo.png" alt="PME" width={150} height={45} className="object-contain" />
                </Link>
                <button
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    className="p-2 text-gray-600 hover:text-orange-600 transition-colors"
                >
                    {isMobileMenuOpen ? (
                        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l18 18" /></svg>
                    ) : (
                        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
                    )}
                </button>
            </div>

            {/* Mobile Menu Overlay */}
            {isMobileMenuOpen && (
                <div className="xl:hidden bg-white border-t border-gray-100 overflow-y-auto max-h-[calc(100vh-80px)] shadow-inner">
                    <div className="px-4 py-6 space-y-4">
                        {mainNavigation.map((item) => (
                            <div key={item.label} className="border-b border-gray-50 pb-4 last:border-0">
                                <div className="text-lg font-bold text-gray-900 mb-3 flex items-center justify-between">
                                    {item.label}
                                    {item.label === 'AI Services' && <span className="text-[10px] bg-orange-100 text-orange-600 px-2 py-0.5 rounded-full ring-1 ring-orange-200 uppercase tracking-widest">New</span>}
                                </div>
                                {'items' in item ? (
                                    <div className="grid grid-cols-1 gap-2 pl-4">
                                        {(item as any).items.map((subItem: any) => (
                                            <Link
                                                key={subItem.label}
                                                href={subItem.href}
                                                className="text-gray-600 hover:text-orange-600 py-1 transition-colors"
                                                onClick={() => setIsMobileMenuOpen(false)}
                                            >
                                                {subItem.label}
                                            </Link>
                                        ))}
                                    </div>
                                ) : (
                                    <Link
                                        href={(item as any).href}
                                        className="text-gray-600 hover:text-orange-600 transition-colors"
                                        onClick={() => setIsMobileMenuOpen(false)}
                                    >
                                        Visit Page
                                    </Link>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </nav>
    );
}

export function Footer() {
    return (
        <footer className="bg-[#1a1a1a] text-white pt-20 pb-10 font-poppins">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
                    {/* Brand Column */}
                    <div className="space-y-8">
                        <Link href="/">
                            <Image
                                src="/logo-footer.png"
                                alt="Prime Marketing Experts"
                                width={200}
                                height={60}
                                className="object-contain"
                            />
                        </Link>
                        <p className="text-gray-400 text-[15px] leading-relaxed pr-6">
                            Driving excellence with superior marketing solutions. We empower SMBs to thrive in the digital landscape through relationship-driven strategies.
                        </p>
                        <div className="flex gap-4 mt-6">
                            {[
                                { name: 'Instagram', href: 'https://www.instagram.com/primemarketingexperts/', icon: 'M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.757-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z' },
                                { name: 'Pinterest', href: 'https://www.pinterest.com/primemarketingexperts', icon: 'M12 0C5.373 0 0 5.372 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z' }
                            ].map(social => (
                                <Link key={social.name} href={social.href} className="w-10 h-10 flex items-center justify-center bg-gray-800 rounded-full hover:bg-[rgb(234,88,12)] transition-colors" target="_blank" rel="noopener noreferrer">
                                    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d={social.icon} /></svg>
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Column 2: Services */}
                    <div>
                        <h4 className="text-lg font-bold uppercase tracking-wider mb-8 text-white">Our Services</h4>
                        <ul className="grid grid-cols-1 gap-3 text-gray-400 text-sm">
                            {footerServices.map((service) => (
                                <li key={service.href}>
                                    <Link
                                        href={service.href}
                                        className={`hover:text-white transition-colors ${service.isHighlighted
                                            ? 'text-[rgb(234,88,12)] font-bold hover:text-orange-400'
                                            : ''
                                            }`}
                                    >
                                        {service.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Column 3: Contact */}
                    <div>
                        <h4 className="text-lg font-bold uppercase tracking-wider mb-8 text-white">Contact Us</h4>
                        <ul className="space-y-6 text-gray-400 text-sm">
                            <li className="flex items-start">
                                <span className="text-[rgb(234,88,12)] mr-4 text-xl">📍</span>
                                <span>74 Northeastern Blvd #12a Ste 101<br />Nashua, NH 03062</span>
                            </li>
                            <li className="flex items-center">
                                <span className="text-[rgb(234,88,12)] mr-4 text-xl">📧</span>
                                <a href="mailto:hello@primemarketingexperts.com" className="hover:text-white transition-colors">hello@primemarketingexperts.com</a>
                            </li>
                            <li className="flex items-center">
                                <span className="text-[rgb(234,88,12)] mr-4 text-xl">📞</span>
                                <a href="tel:617-651-1457" className="text-xl font-bold text-white hover:text-[rgb(234,88,12)] transition-colors italic">617-651-1457</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="bg-[#0b111f] py-8">
                <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center text-gray-500 text-xs tracking-widest uppercase">
                    <p>© {new Date().getFullYear()} Prime Marketing Experts. All rights reserved.</p>
                    <div className="flex space-x-8 mt-6 md:mt-0">
                        <Link href="#" className="hover:text-white transition-colors">Terms of use</Link>
                        <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
                        <Link href="#" className="hover:text-white transition-colors">Environmental Policy</Link>
                    </div>
                </div>
            </div>
        </footer >
    );
}
