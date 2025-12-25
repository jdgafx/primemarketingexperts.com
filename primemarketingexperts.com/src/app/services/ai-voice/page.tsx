import { Navbar, Footer } from '@/components/Layout';

export default function AiVoicePage() {
    return (
        <main className="min-h-screen flex flex-col">
            <Navbar />

            {/* Hero */}
            <div className="bg-gray-900 py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-3xl font-extrabold text-white sm:text-4xl">
                        AI Voice Receptionist & Cold Calling Service
                    </h1>
                    <p className="mt-4 text-xl text-gray-300">
                        Revolutionizing business communication
                    </p>
                </div>
            </div>

            {/* Content */}
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="prose prose-lg mx-auto text-gray-700">
                    <p className="lead text-xl">
                        From automated call handling to efficient warm transfers, our service ensures every phone interaction is professional, efficient, and valued.
                    </p>

                    <h2 className="text-2xl font-bold mt-8 mb-4">Automated Call Handling</h2>
                    <p>Say goodbye to busy lines and lost calls. Our AI receptionist greets every caller professionally, routes calls intelligently, and handles frequent questions instantly.</p>

                    <h2 className="text-2xl font-bold mt-8 mb-4">Cold Calling and Lead Engagement</h2>
                    <p>More than just a receptionist—it’s an outbound sales assistant too! Make high-quality, pre-scripted cold calls, qualify leads, and seamlessly hand off to your sales team.</p>

                    <h2 className="text-2xl font-bold mt-8 mb-4">Targeted Benefits</h2>
                    <ul className="list-disc pl-5 space-y-2">
                        <li>✅ Increased Efficiency: Automate repetitive tasks.</li>
                        <li>✅ Scalable Operations: Handle thousands of calls without compromising quality.</li>
                        <li>✅ Cost Savings: Save on staffing resources.</li>
                        <li>✅ Enhanced Customer Experience: No one is left waiting.</li>
                    </ul>

                    <div className="bg-orange-50 p-8 rounded-lg mt-12 text-center">
                        <h3 className="text-xl font-bold text-gray-900 mb-4">Take the Next Step Towards Smarter Communication</h3>
                        <p className="mb-6">Contact us today to schedule a demo.</p>
                        <a href="#" className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-8 py-3 rounded-md font-bold hover:opacity-90 inline-block">
                            Schedule Demo
                        </a>
                    </div>
                </div>
            </div>

            <Footer />
        </main>
    );
}
