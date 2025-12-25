import Link from 'next/link';
import Image from 'next/image';
import {
    mainNavigation,
    footerServices,
    isDropdown,
    type NavElement,
    type NavItem,
    type NavDropdown
} from '@/lib/navigation';

function NavDropdownMenu({ item }: { item: NavDropdown }) {
    const isAI = item.isHighlighted;

    return (
        <li className="relative group/item">
            <button className={`px-3 py-2 text-[15px] font-semibold transition-colors flex items-center ${isAI
                    ? 'text-[rgb(234,88,12)] hover:text-orange-600 font-extrabold'
                    : 'text-gray-800 hover:text-[rgb(234,88,12)]'
                }`}>
                {item.label}
                {isAI && <span className="ml-1 text-xs bg-orange-100 text-orange-600 px-1.5 py-0.5 rounded-full font-bold">NEW</span>}
                <svg className="ml-1 h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
            </button>
            <div className="absolute left-0 mt-0 w-72 pt-4 invisible group-hover/item:visible opacity-0 group-hover/item:opacity-100 transition-all duration-200 z-50">
                <div className={`bg-white shadow-[0_10px_30px_rgba(0,0,0,0.1)] py-2 border-t-2 ${isAI ? 'border-orange-500' : 'border-[rgb(234,88,12)]'
                    } max-h-[400px] overflow-y-auto`}>
                    {item.items.map((subItem) => (
                        <Link
                            key={subItem.href}
                            href={subItem.href}
                            className={`block px-6 py-2 text-sm hover:bg-gray-50 ${subItem.isHighlighted
                                    ? 'text-orange-600 font-semibold hover:text-orange-700'
                                    : 'text-gray-700 hover:text-[rgb(234,88,12)]'
                                }`}
                        >
                            {subItem.label}
                        </Link>
                    ))}
                </div>
            </div>
        </li>
    );
}

function NavLink({ item }: { item: NavItem }) {
    return (
        <li>
            <Link
                className="px-3 py-2 text-[15px] font-semibold text-gray-800 hover:text-[rgb(234,88,12)] transition-colors"
                href={item.href}
            >
                {item.label}
            </Link>
        </li>
    );
}

export function Navbar() {
    return (
        <nav className="bg-white w-full h-auto shadow-sm sticky top-0 z-[100]">
            {/* Main Container - Desktop */}
            <div className="hidden xl:flex flex-col xl:flex-row items-center justify-between py-4 xl:h-24 container mx-auto px-4">
                {/* Logo Section */}
                <div className="flex items-center">
                    <Link href="/" className="text-2xl font-bold">
                        <Image
                            src="/pme-logo.png"
                            alt="Prime Marketing Experts"
                            width={280}
                            height={80}
                            className="w-auto h-16"
                            priority
                        />
                    </Link>
                </div>

                {/* Navigation Links */}
                <div className="flex items-center">
                    <nav aria-label="Main" className="relative z-[100] flex items-center">
                        <ul className="flex list-none items-center space-x-1">
                            {mainNavigation.map((item, index) => (
                                isDropdown(item)
                                    ? <NavDropdownMenu key={index} item={item} />
                                    : <NavLink key={index} item={item} />
                            ))}
                        </ul>
                    </nav>
                </div>

                {/* CTA Button */}
                <div className="flex items-center">
                    <Link href="/free-strategy-session" className="inline-block">
                        <button className="bg-gradient-to-r from-[rgb(249,115,22)] to-[rgb(234,88,12)] text-white font-bold py-3 px-8 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 text-sm uppercase tracking-wider">
                            Free Strategy Session
                        </button>
                    </Link>
                </div>
            </div>

            {/* Mobile Menu Button */}
            <div className="xl:hidden flex items-center justify-between px-4 py-4 border-b">
                <Link href="/">
                    <Image src="/pme-logo.png" alt="PME" width={150} height={40} className="w-auto h-10" />
                </Link>
                <button className="text-gray-900 p-2">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </button>
            </div>
        </nav>
    );
}

export function Footer() {
    return (
        <footer className="bg-[#0f172a] text-white">
            <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-16">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                    {/* Column 1: Logo & Info */}
                    <div>
                        <Image
                            src="/pme-logo.png"
                            alt="Prime Marketing Experts"
                            width={220}
                            height={70}
                            className="bg-white p-2 rounded mb-6 h-14 w-auto"
                        />
                        <p className="text-gray-400 text-sm leading-relaxed mb-6">
                            Prime Marketing Experts is a full service relationship-driven marketing firm. We craft connections, to drive results with integrated, customized solutions that maximize ROI for our clients.
                        </p>
                        <div className="flex space-x-4">
                            {[
                                { name: 'Facebook', href: 'https://www.facebook.com/primemarketingexperts', icon: 'M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z' },
                                { name: 'Twitter', href: 'https://twitter.com/primeexperts', icon: 'M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z' },
                                { name: 'LinkedIn', href: 'https://www.linkedin.com/company/prime-marketing-experts', icon: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z' },
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
        </footer>
    );
}
