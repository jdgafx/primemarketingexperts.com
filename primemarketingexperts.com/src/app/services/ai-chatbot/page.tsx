import { Navbar, Footer } from '@/components/Layout';

export default function AiChatbotPage() {
    return (
        <main className="min-h-screen flex flex-col">
            <Navbar />

            {/* Hero */}
            <div className="bg-gray-900 py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-3xl font-extrabold text-white sm:text-4xl">
                        AI Chatbot Customer Service Assistant
                    </h1>
                    <p className="mt-4 text-xl text-gray-300">
                        Your 24/7 Digital Agent
                    </p>
                </div>
            </div>

            {/* Content */}
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="prose prose-lg mx-auto text-gray-700">
                    <p className="lead text-xl">
                        Welcome to the future of customer interaction! With our advanced AI Chatbot Customer Service Assistant, you can transform how you engage with your customers.
                    </p>

                    <h2 className="text-2xl font-bold mt-8 mb-4">What Our AI Chatbot Offers</h2>
                    <p>Our chatbot delivers exceptional customer service experiences by providing instant responses, reducing waiting times, and streamlining inquiries.</p>

                    <ul className="list-disc pl-5 space-y-2 mt-4">
                        <li><strong>Answering Customer FAQs:</strong> Effortlessly handle queries about products, pricing, shipping, and more.</li>
                        <li><strong>Personalized Experiences:</strong> Understanding customer intent and preferences via Natural Language Processing (NLP).</li>
                        <li><strong>Intelligent Redirection:</strong> Seamless transfer to live support agents when human empathy is needed.</li>
                        <li><strong>24/7 Support Availability:</strong> Quick and responsive service, no matter the time zone or holidays.</li>
                        <li><strong>Easy Integration:</strong> Works with Website Live Chat, Facebook Messenger, Instagram, WhatsApp, and CRMs.</li>
                    </ul>

                    <h2 className="text-2xl font-bold mt-8 mb-4">Our Key Benefits</h2>
                    <ul className="list-disc pl-5 space-y-2">
                        <li>✅ Enhanced Customer Satisfaction</li>
                        <li>✅ Cost Efficiency</li>
                        <li>✅ Scalability</li>
                        <li>✅ Data-Driven Insights</li>
                    </ul>


                </div>
            </div>

            <Footer />
        </main>
    );
}
