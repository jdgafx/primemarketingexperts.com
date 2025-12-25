export interface Service {
    slug: string;
    title: string;
    tagline: string;
    description: string;
    icon: string;
    features: string[];
    benefits: string[];
    useCases: string[];
    deepContent: {
        intro: string;
        facts: string[];
        businessValue: string;
        technicalEdge: string;
    };
}

export const services: Service[] = [
    {
        slug: "ai-chatbot",
        title: "AI Chatbot Assistant",
        tagline: "Your 24/7 Digital Agent",
        description: "Seamlessly integrated chatbot that delivers exceptional customer service, reduces wait times, and handles routine tasks instantly.",
        icon: "MessageSquare",
        features: [
            "Natural language processing for human-like conversations",
            "Multi-channel deployment (website, Facebook, WhatsApp)",
            "Seamless handoff to human agents when needed",
            "Custom training on your business knowledge base",
            "Real-time analytics and conversation insights",
            "Multilingual support for global reach"
        ],
        benefits: [
            "Reduce support costs by up to 60%",
            "Instant response times, 24/7 availability",
            "Consistent brand voice across all interactions",
            "Scale customer service without scaling headcount"
        ],
        useCases: [
            "Customer support automation",
            "Lead qualification and capture",
            "Appointment scheduling",
            "FAQ and knowledge base assistance"
        ],
        deepContent: {
            intro: "The modern consumer expects instant engagement. Our AI Chatbot Assistants move beyond simple rigid logic, utilizing Large Language Models (LLMs) to understand context, intent, and sentiment.",
            facts: [
                "64% of internet users say 24-hour service is the best feature of chatbots.",
                "Chatbots can handle up to 80% of routine customer inquiries without human intervention.",
                "Businesses that use chatbots can see a 30% reduction in customer service costs."
            ],
            businessValue: "By deploying an Amp AI Assistant, your business gains a tireless employee that never sleeps, never gets tired, and maintains a perfect professional demeanor. This translates directly to higher customer satisfaction scores and a significantly lower cost-per-ticket.",
            technicalEdge: "Unlike basic 'button-based' bots, our systems are fine-tuned on your specific company data using RAG (Retrieval-Augmented Generation), ensuring they only provide accurate information directly from your authorized sources."
        }
    },
    {
        slug: "ai-voice",
        title: "AI Voice Receptionist",
        tagline: "Revolutionizing Business Communication",
        description: "Advanced voice AI that handles inbound calls professionally and executes outbound campaigns with human-like capability.",
        icon: "Phone",
        features: [
            "Natural-sounding voice with emotion recognition",
            "Intelligent call routing and prioritization",
            "Appointment booking and calendar integration",
            "Outbound calling campaigns at scale",
            "Call recording and transcription",
            "CRM integration for personalized interactions"
        ],
        benefits: [
            "Handle 100% of calls without hold times",
            "Reduce missed opportunities from unanswered calls",
            "Free up staff for high-value tasks",
            "Consistent, professional brand representation"
        ],
        useCases: [
            "After-hours call handling",
            "Appointment confirmations and reminders",
            "Lead follow-up sequences",
            "Customer survey collection"
        ],
        deepContent: {
            intro: "Voice is still the most personal way to do business, but human teams have limits. Our AI Voice Receptionist provides a warm, ultra-low latency conversational experience that is indistinguishable from a human professional.",
            facts: [
                "85% of people whose calls aren't answered will not call back.",
                "Companies lose an estimated $75 billion annually due to poor customer service interactions.",
                "Voice AI can handle thousands of concurrent calls, a feat impossible for human call centers."
            ],
            businessValue: "Every missed call is a missed revenue opportunity. Amp's Voice AI ensures your business is always 'on', capturing leads and providing support while your competitors are closed for the weekend.",
            technicalEdge: "We utilize cutting-edge text-to-speech (TTS) and voice cloning technology to create a brand-specific voice manual that perfectly matches your company's tone and regional accent."
        }
    },
    {
        slug: "predictive-analytics",
        title: "Predictive Analytics",
        tagline: "Forecast Your Future Success",
        description: "Leverage historical data to predict market trends, customer behavior, and sales outcomes with high accuracy.",
        icon: "BarChart",
        features: [
            "Machine learning models trained on your data",
            "Sales forecasting with 90%+ accuracy",
            "Customer churn prediction and prevention",
            "Market trend analysis and alerts",
            "Custom dashboards and reporting",
            "Integration with existing business tools"
        ],
        benefits: [
            "Reduce uncertainty in business planning",
            "Identify at-risk customers before they leave",
            "Optimize inventory and resource allocation",
            "Spot opportunities before competitors"
        ],
        useCases: [
            "Revenue forecasting",
            "Customer lifetime value prediction",
            "Demand planning",
            "Risk assessment"
        ],
        deepContent: {
            intro: "Stop looking in the rearview mirror to drive your business forward. Our Predictive Analytics engine transforms your historical data into a crystal ball for your marketing and sales efforts.",
            facts: [
                "Predictive analytics can increase marketing ROI by more than 25%.",
                "Highly data-driven organizations are 3x more likely to report significant improvement in decision-making.",
                "Predicting customer churn 1 month in advance allows for intervention that saves up to 40% of at-risk revenue."
            ],
            businessValue: "Instead of reacting to market shifts, you can anticipate them. This allows for proactive budget allocation, moving spend away from failing channels and into high-growth areas before the shift is obvious to others.",
            technicalEdge: "Our models utilize ensemble learning, combining multiple algorithms to ensure that specific data anomalies don't skew your overall business forecast."
        }
    },
    {
        slug: "content-generation",
        title: "Content Generation Suite",
        tagline: "Scale Your Content Effortlessly",
        description: "Create high-quality, SEO-optimized content for blogs, social media, and ad copy in seconds.",
        icon: "PenTool",
        features: [
            "Blog posts, articles, and long-form content",
            "Social media posts optimized per platform",
            "Ad copy for Google, Facebook, and more",
            "Product descriptions and email campaigns",
            "SEO optimization built-in",
            "Brand voice and style customization"
        ],
        benefits: [
            "10x content production speed",
            "Consistent quality and brand voice",
            "Reduce content creation costs by 70%",
            "Never face writer's block again"
        ],
        useCases: [
            "Blog content calendar execution",
            "Social media management",
            "E-commerce product descriptions",
            "Email marketing campaigns"
        ],
        deepContent: {
            intro: "Search engines and social algorithms demand constant high-quality content. Our Content Generation Suite provides your team with an 'AI-Copilot' that helps draft, optimize, and distribute content at a pace that was previously impossible.",
            facts: [
                "Content marketing costs 62% less than traditional marketing and generates about 3x as many leads.",
                "Companies that publish 16+ blog posts per month get almost 3.5x more traffic than those that publish 0-4.",
                "AI-assisted writing can reduce the first-draft time of a 1,000-word article by 80%."
            ],
            businessValue: "You can finally maintain the presence your brand deserves. Instead of having one blog post per month, you can have four high-quality, researched, and SEO-aligned pieces that drive consistent organic traffic growth.",
            technicalEdge: "We use more than just GPT-4; we layer branding 'lenses' over the AI to ensure the syntax, tone, and prohibited terminology are strictly adhered to, protecting your brand integrity."
        }
    },
    {
        slug: "social-media-sentinel",
        title: "Social Media Sentinel",
        tagline: "Intelligent Brand Protection",
        description: "Real-time monitoring and engagement tool that manages your brand reputation across all social channels.",
        icon: "Share2",
        features: [
            "Real-time brand mention monitoring",
            "Sentiment analysis and alerts",
            "Automated response suggestions",
            "Competitor monitoring and benchmarking",
            "Crisis detection and escalation",
            "Influencer identification and tracking"
        ],
        benefits: [
            "Protect brand reputation proactively",
            "Respond to issues before they escalate",
            "Understand public perception in real-time",
            "Identify brand advocates and detractors"
        ],
        useCases: [
            "Brand reputation management",
            "Social listening and insights",
            "Customer service via social",
            "Competitive intelligence"
        ],
        deepContent: {
            intro: "A brand's reputation is built over years but can be damaged in minutes on social media. The Sentinel acts as an always-on watchman, detecting sentiment shifts and brand mentions instantly across the entire social web.",
            facts: [
                "71% of consumers who have had a positive experience with a brand on social media are likely to recommend the brand to others.",
                "A wait longer than 60 minutes for a response on social media can see a 50% drop in customer loyalty.",
                "Sentiment analysis can detect a public relations crisis up to 4 hours before it trends."
            ],
            businessValue: "This isn't just about avoiding disaster; it's about seizing opportunity. When someone mentions a 'problem' your product solves, Sentinel alerts you so you can engage and win a customer in real-time.",
            technicalEdge: "Our proprietary NLP models distinguish between sarcasm, frustration, and genuine inquiry, providing a 'threat level' score for every interaction to help your team prioritize."
        }
    },
    {
        slug: "email-automator",
        title: "Email Marketing Automator",
        tagline: "Hyper-Personalized Campaigns",
        description: "AI-driven email marketing that dynamically personalizes content and send times for maximum open rates.",
        icon: "Mail",
        features: [
            "Dynamic content personalization",
            "Optimal send time prediction per recipient",
            "Subject line A/B testing and optimization",
            "Automated drip campaigns and sequences",
            "Behavioral trigger emails",
            "Advanced segmentation and targeting"
        ],
        benefits: [
            "Increase open rates by 40%+",
            "Higher click-through and conversion rates",
            "Save hours on campaign management",
            "Deliver relevant content to every subscriber"
        ],
        useCases: [
            "Welcome and onboarding sequences",
            "Abandoned cart recovery",
            "Re-engagement campaigns",
            "Newsletter personalization"
        ],
        deepContent: {
            intro: "Generic email blasts are dead. Our Email Marketing Automator treats every subscriber as an individual, learning their reading habits to deliver the right message at the exact moment they are most likely to open it.",
            facts: [
                "Personalized emails deliver 6x higher transaction rates.",
                "AI-optimized send times can improve open rates by an average of 15% without changing the subject line.",
                "Segmented campaigns drive a 760% increase in revenue."
            ],
            businessValue: "Turn your email list from a static asset into a recurring revenue engine. By automating the 'perfect time' to send, your emails land at the top of the inbox, not buried in the morning rush.",
            technicalEdge: "We implement 'Per-User Retention Modeling' that predicts when a user is becoming disengaged, triggering a special re-engagement sequence automatically."
        }
    },
    {
        slug: "lead-scoring",
        title: "Lead Scoring Intelligence",
        tagline: "Focus on High-Value Prospects",
        description: "Automatically qualify and rank leads based on behavioral data and conversion probability.",
        icon: "Target",
        features: [
            "Machine learning-based scoring models",
            "Real-time score updates based on behavior",
            "Integration with CRM and marketing tools",
            "Custom scoring criteria and weights",
            "Lead prioritization dashboards",
            "Predictive conversion probability"
        ],
        benefits: [
            "Increase sales efficiency by 50%+",
            "Focus on leads most likely to convert",
            "Reduce time wasted on unqualified leads",
            "Align sales and marketing efforts"
        ],
        useCases: [
            "Sales prioritization",
            "Marketing qualified lead identification",
            "Account-based marketing targeting",
            "Pipeline forecasting"
        ],
        deepContent: {
            intro: "Not all leads are created equal. Our Lead Scoring Intelligence analyzes thousands of data points—from website clicks to firmographic data—to give your sales team a ranked list of who to call first.",
            facts: [
                "Only 25% of leads are legitimate and should advance to sales.",
                "Companies that use lead scoring experience a 77% increase in lead generation ROI.",
                "Sales reps spend about 2/3 of their time on non-selling activities, including chasing bad leads."
            ],
            businessValue: "Stop wasting your most expensive resources (your sales reps) on window shoppers. Ensure they spent every hour of their day talking to prospects that have a high statistical probability of closing.",
            technicalEdge: "We utilize multi-dimensional scoring, which looks at both demographic fit (who they are) and behavioral intent (what they did), providing a holistic 'buyer readiness' score."
        }
    },
    {
        slug: "dynamic-pricing",
        title: "Dynamic Pricing Optimizer",
        tagline: "Maximize Margins in Real-Time",
        description: "Adjust pricing strategies instantly based on demand, competition, and user behavior.",
        icon: "DollarSign",
        features: [
            "Real-time competitive price monitoring",
            "Demand-based pricing adjustments",
            "Customer segment pricing strategies",
            "A/B price testing automation",
            "Revenue and margin optimization",
            "Price elasticity analysis"
        ],
        benefits: [
            "Increase revenue by 10-25%",
            "Stay competitive without racing to the bottom",
            "Optimize margins dynamically",
            "Respond to market changes instantly"
        ],
        useCases: [
            "E-commerce pricing optimization",
            "Service pricing strategies",
            "Promotional pricing automation",
            "Competitive positioning"
        ],
        deepContent: {
            intro: "Fixed pricing is a relic of a slower era. In a digital economy, price elasticity changes by the hour. Our Optimizer ensures you are capturing maximum value from every transaction without pricing yourself out of the market.",
            facts: [
                "Dynamic pricing can grow gross profit margins by up to 25%.",
                "Amazon changes prices on its site up to 2.5 million times a day.",
                "A 1% price increase can result in an 8.7% increase in operating profits."
            ],
            businessValue: "When demand is high, capture the extra margin. When demand is low, entice customers with optimized discounts that protect your baseline. This intelligence ensures you remain the 'smartest money' in your niche.",
            technicalEdge: "Our algorithm includes 'competitor behavior tracking', allowing the system to anticipate when a competitor is likely to run a sale and adjust your positioning accordingly."
        }
    },
    {
        slug: "customer-sentiment",
        title: "Customer Sentiment Analyzer",
        tagline: "Understand How They Feel",
        description: "Deep dive into customer feedback across surveys, reviews, and support tickets to uncover hidden insights.",
        icon: "Heart",
        features: [
            "Multi-source feedback aggregation",
            "Advanced NLP sentiment analysis",
            "Trend detection and pattern recognition",
            "Automated insight reports",
            "Department-specific feedback routing",
            "Real-time sentiment dashboards"
        ],
        benefits: [
            "Understand customer feelings at scale",
            "Identify product and service improvements",
            "Measure impact of changes over time",
            "Reduce churn through early warning signals"
        ],
        useCases: [
            "Customer experience optimization",
            "Product feedback analysis",
            "Support quality monitoring",
            "Brand health tracking"
        ],
        deepContent: {
            intro: "Surveys are often too little, too late. Our Sentiment Analyzer parses customer feedback as it happens, turning raw text from reviews and emails into structured data that tells you exactly where your business is winning and losing.",
            facts: [
                "80% of companies believe they deliver 'superior' experience, but only 8% of customers agree.",
                "Resolving a customer complaint in their favor can result in a 70% retention rate.",
                "It is 5-25x more expensive to acquire a new customer than to keep an existing one."
            ],
            businessValue: "Know exactly why customers are leaving before they actually go. The analyzer spots the subtle language cues of dissatisfaction, allowing you to intercept a churn event and turn a critic into an advocate.",
            technicalEdge: "We move beyond 'Positive/Negative' binary scoring. Our AI detects specific emotions like 'Confused', 'Urgent', or 'Impressed', allowing for much more nuanced business responses."
        }
    },
    {
        slug: "competitor-scout",
        title: "Competitor Intelligence Scout",
        tagline: "Stay Two Steps Ahead",
        description: "Continuous monitoring of competitor strategies, pricing, and content changes.",
        icon: "Eye",
        features: [
            "Automated competitor website monitoring",
            "Pricing and product change alerts",
            "Content and SEO strategy tracking",
            "Social media activity monitoring",
            "Ad spend and creative tracking",
            "Market positioning analysis"
        ],
        benefits: [
            "Never be caught off guard by competitors",
            "Identify market opportunities early",
            "Benchmark your performance accurately",
            "Inform strategy with real data"
        ],
        useCases: [
            "Strategic planning",
            "Product development prioritization",
            "Marketing campaign optimization",
            "Pricing strategy refinement"
        ],
        deepContent: {
            intro: "In a digital-first world, your competitors are constantly testing new tactics. The Scout works as your unseen agent, reporting back on every move they make—so you can respond before their new strategy even gains traction.",
            facts: [
                "Businesses that engage in competitive intelligence are 2x more likely to experience revenue growth.",
                "94% of business professionals say that competitor intelligence is important for their company's success.",
                "Companies lose an average of 40% of their marketing effectiveness by not tracking competitor ad-spend shifts."
            ],
            businessValue: "Turn competitive pressure into a strategic asset. By knowing exactly when a competitor changes their messaging, you can launch a counter-campaign that neutralizes their effort and highlights your unique strengths.",
            technicalEdge: "Our tool doesn't just 'scrape' sites; it tracks 'invisible' changes like metadata updates, schema shifts, and ad platform pixel deployments that signal a change in their digital strategy."
        }
    }
];

export function getServiceBySlug(slug: string): Service | undefined {
    return services.find(s => s.slug === slug);
}
