import Link from "next/link"
import { Zap, Mail, Phone, MapPin } from "lucide-react"

export function Footer() {
    return (
        <footer className="bg-black border-t border-white/10">
            <div className="container-apple py-16">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
                    {/* Brand */}
                    <div className="md:col-span-2">
                        <Link href="/" className="flex items-center gap-2 text-white font-semibold text-xl mb-4">
                            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                                <Zap className="h-6 w-6 text-white" />
                            </div>
                            <span>Amp Marketing</span>
                        </Link>
                        <p className="text-white/50 max-w-sm mb-6 font-light">
                            AI enabled marketing solutions designed for best conversion and exponential growth.
                            Built on the strategic legacy of Prime Marketing Experts.
                        </p>
                        <div className="flex items-center gap-4 text-white/40 text-sm">
                            <span>A Prime Marketing Experts Company</span>
                        </div>
                    </div>

                    {/* Services */}
                    <div>
                        <h4 className="text-white font-semibold mb-4">Services</h4>
                        <ul className="space-y-3">
                            <li><Link href="/services/ai-chatbot" className="text-white/50 hover:text-white text-sm transition-colors">AI Chatbot</Link></li>
                            <li><Link href="/services/ai-voice" className="text-white/50 hover:text-white text-sm transition-colors">AI Voice</Link></li>
                            <li><Link href="/services/predictive-analytics" className="text-white/50 hover:text-white text-sm transition-colors">Predictive Analytics</Link></li>
                            <li><Link href="/services/content-generation" className="text-white/50 hover:text-white text-sm transition-colors">Content Generation</Link></li>
                            <li><Link href="/services" className="text-blue-400 hover:text-blue-300 text-sm transition-colors">View All →</Link></li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className="text-white font-semibold mb-4">Contact</h4>
                        <ul className="space-y-3">
                            <li className="flex items-center gap-2 text-white/50 text-sm">
                                <MapPin className="h-4 w-4" />
                                Boston, MA
                            </li>
                            <li className="flex items-center gap-2 text-white/50 text-sm">
                                <Mail className="h-4 w-4" />
                                hello@ampmarketing.ai
                            </li>
                            <li className="flex items-center gap-2 text-white/50 text-sm">
                                <Phone className="h-4 w-4" />
                                (617) 555-0123
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom */}
                <div className="section-divider my-10" />
                <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-white/40 text-sm">
                    <p>© 2024 Amp Marketing. All rights reserved.</p>
                    <div className="flex gap-6">
                        <Link href="/privacy" className="hover:text-white transition-colors">Privacy</Link>
                        <Link href="/terms" className="hover:text-white transition-colors">Terms</Link>
                        <Link href="https://primemarketingexperts.com" target="_blank" className="hover:text-white transition-colors">Prime Marketing Experts</Link>
                    </div>
                </div>
            </div>
        </footer>
    )
}
