// Top 10 AI-Enabled Services - Beefed up with "Meat on the bone" copy
// Indirectly suggestive benefits embedded in professional, high-fidelity copy.

export interface AIService {
    slug: string;
    title: string;
    shortTitle: string;
    tagline: string;
    description: string;
    icon: string;
    category: 'AI' | 'Automation' | 'Intelligence';
    benefits: string[];
    integrations: string[];
    fullContent: string[];
}

export const aiServices: AIService[] = [
    {
        slug: "ai-chatbot-assistant",
        title: "Cognitive AI Customer Experience Assistant",
        shortTitle: "AI Chatbot",
        tagline: "Synchronized Intelligence for Frictionless Customer Journeys",
        description: "Moving beyond basic logic trees, our Cognitive AI Assistants leverage proprietary natural language models to maintain thread-perfect context across every digital touchpoint.",
        icon: "MessageSquare",
        category: "AI",
        benefits: [
            "24/7 autonomous engagement without human overhead",
            "Instant resolution for up to 80% of routine inquiries",
            "Continuous learning loop from live customer interactions",
            "Sentiment-aware escalation to premium human support"
        ],
        integrations: ["Bespoke CRM Sync", "WhatsApp Enterprise", "Meta Social Suite", "Omnichannel Live Chat"],
        fullContent: [
            "Modern consumers no longer wait. Our Cognitive AI Assistants ensure that your brand is 'always on', providing instant, contextually relevant responses that move prospects through the funnel while your competitors are asleep. It’s not just a chat box; it’s a digital concierge that understands intent as well as a seasoned account manager.",
            "By integrating directly into your product inventory or scheduling software, the AI doesn't just 'talk'—it executes. Whether it's qualifying a $50k lead or resolving a complex shipping query, the system maintains a unified brand voice that builds trust through consistency.",
            "The indirect impact of the AI transformation is seen in reduced team burnout and higher morale. When your staff is freed from answering the same 'Where is my order?' questions 40 times a day, they can focus on high-value strategic growth and complex problem-solving where human intuition is most powerful."
        ]
    },
    {
        slug: "ai-voice-receptionist",
        title: "Autonomous Voice Intelligence & Outbound Scaling",
        shortTitle: "AI Voice Agent",
        tagline: "Natural Human-Parity Voice Interactions at Global Scale",
        description: "Our high-fidelity voice synthesis engine eliminates the 'robotic' disconnect, delivering low-latency, emotionally resonant conversations that feel like an extension of your elite sales team.",
        icon: "Phone",
        category: "AI",
        benefits: [
            "Zero-latency response for consistent inbound reception",
            "Outbound lead reactivation at 10x human capacity",
            "Deterministic compliance and perfect script adherence",
            "Seamless calendar synchronization for instant booking"
        ],
        integrations: ["Unified VoIP Bridges", "Microsoft Outlook", "Salesforce Apex", "Custom Lead DBs"],
        fullContent: [
            "In a world of ignored emails and saturated social feeds, the phone remains the highest-converting bridge to a new client. Our AI Voice agents handle thousand-call bursts without fatigue, ensuring that no lead ever hits a voicemail. The subtle benefit is the 'Halo Effect'—your business appears significantly larger and more established when every call is handled professionally on the first ring.",
            "For outbound growth, the AI acts as a tireless SDR. It navigates gatekeepers, handles common objections with pre-mapped logic, and only passes 'warm-transfer' calls to your closers when the prospect is ready to talk turkey. This ensures your most expensive human assets are only speaking to high-probability opportunities.",
            "Beyond the immediate efficiency, the data captured from these calls provides a goldmine of consumer sentiment. Every pause, tone shift, and objection is logged, allowing our predictive models to refine your messaging across all other marketing channels."
        ]
    },
    {
        slug: "predictive-analytics",
        title: "Predictive Market Intelligence & Revenue Forecasting",
        shortTitle: "Predictive Analytics",
        tagline: "Transitioning from Reactive Data to Proactive Strategy",
        description: "Harness the power of Bayesian modeling and deep learning to identify high-value consumer patterns before they manifest in your competitors' reports.",
        icon: "TrendingUp",
        category: "Intelligence",
        benefits: [
            "Forecast quarterly revenue with unprecedented precision",
            "Identify 'At-Risk' accounts before churn occurs",
            "Dynamic budget reallocation to high-performing segments",
            "Proprietary CLV (Customer Lifetime Value) modeling"
        ],
        integrations: ["BigQuery", "Snowflake", "Adobe Analytics", "ERP Financial Systems"],
        fullContent: [
            "Data is only as valuable as the decisions it informs. Our Predictive Intelligence suite doesn't just tell you what happened last month—it highlights what is likely to happen next. By identifying 'pioneer' indicators in your data, we enable you to intercept customer needs before they've even articulated them, creating a 'passive' loyalty that competitors find impossible to break.",
            "For organizations with large datasets, the biggest challenge is the 'Noise to Signal' ratio. Our AI sifts through millions of data points to find the 3-4 critical variables that actually drive growth. This indirect clarity allows C-suite executives to lead with confidence rather than intuition.",
            "Revenue forecasting becomes a science rather than a guess. When you can see a 15% dip in the market 45 days before it happens, you have the lead time to rotate your marketing strategy, safeguard your margins, and capitalize on the shift while others are reacting."
        ]
    },
    {
        slug: "ai-content-generation",
        title: "Generative Brand Authority Engine",
        shortTitle: "AI Content Engine",
        tagline: "Hyper-Scaling Authority without Diluting Brand Soul",
        description: "We deploy Fine-Tuned Large Language Models trained exclusively on your brand's historical 'winning' copy to generate high-converting assets at the speed of thought.",
        icon: "FileText",
        category: "AI",
        benefits: [
            "Scale organic reach with 30+ SEO-optimized assets weekly",
            "Automated creative versioning for multi-channel ads",
            "Strict brand-voice enclosure for zero-defect messaging",
            "Visual asset synthesis for cohesive digital identity"
        ],
        integrations: ["Headless CMS", "Canva API", "Discord Automation", "Grammarly Business"],
        fullContent: [
            "The biggest bottleneck to modern growth isn't strategy—it's production. Our Generative Authority engine removes the 'blank page' problem for your creative team. By providing a 90% finished draft that already incorporates your SEO requirements and brand positioning, we turn your marketing department into an elite group of 'editors' rather than 'writers'.",
            "This isn't generic 'AI content.' We use specific RAG (Retrieval-Augmented Generation) architectures that pull in your latest product specs, case studies, and testimonials. The result is a stream of content that feels deeply researched and authoritative, positioning your brand as the primary thought leader in your niche.",
            "The compound effect of this volume is massive. When you can dominate 100 long-tail keywords simultaneously, your cost-per-click from organic search drops toward zero, providing your business with a sustainable, multi-year competitive advantage that isn't dependent on ad spend."
        ]
    },
    {
        slug: "ai-lead-scoring",
        title: "Neural Lead Qualification & Optimization",
        shortTitle: "AI Lead Scoring",
        tagline: "Directing Precision Focus toward High-Intent Capital",
        description: "Eliminate sales fatigue by deploying machine learning models that score every prospect across 50+ behavioral variables in real-time.",
        icon: "Target",
        category: "Intelligence",
        benefits: [
            "Identify 'Sales-Ready' leads with 95% accuracy",
            "Reduce lead-to-close cycle by up to 40%",
            "Automated 'nurture' redirection for low-intent traffic",
            "Dynamic value-based bidding for paid acquisition sync"
        ],
        integrations: ["Salesforce CRM", "HubSpot Sales", "Segment.io", "LeadFeeder"],
        fullContent: [
            "Every minute your top salesperson spends on a 'window shopper' is a minute they aren't closing a deal. Our Neural Lead Scoring acts as a silent filter, ensuring that only the top 5% of high-intent prospects reach your sales floor. This indirect benefit leads to immediate increases in sales morale and a culture of winning.",
            "The system looks beyond surface-level data. It analyzes mouse movements, page engagement depth, and comparative behavior against your last 1,000 conversions. It knows the difference between a student doing research and a VP ready to sign a contract.",
            "By feeding this data back into your ad platforms, your marketing becomes self-healing. The AI instructs Google and Meta to stop finding 'clicks' and start finding 'conversions' based on the specific neural profiles of your most profitable customers."
        ]
    },
    {
        slug: "ai-ad-optimization",
        title: "Autonomous Media Buying & Yield Optimization",
        shortTitle: "AI Ad Optimizer",
        tagline: "Relentless Competition for Peak Return on Ad Spend (ROAS)",
        description: "Replace manual bidding with a high-frequency trading approach to digital media, optimizing for marginal gains 24 hours a day.",
        icon: "Zap",
        category: "Automation",
        benefits: [
            "Dynamic budget shifting toward 'Winning' micro-audiences",
            "AI-synthesized creative testing at 100x human scale",
            "Instant reaction to competitor bidding shifts",
            "Attribution modeling that solves the 'iOS 14 gap'"
        ],
        integrations: ["Meta Ads Manager", "Google Ads", "TikTok for Business", "Linear TV programmatic"],
        fullContent: [
            "In a flat auction environment, the player who can calculate the most variables wins. Our Autonomous Media Buying engine makes thousand of subtle bid adjustments every hour, capturing high-value traffic when costs are low and backing off when the market is saturated. It's the difference between a blunt instrument and a surgical laser.",
            "The real magic happens in 'Creative Synthesis.' The AI identifies that a blue button works for 25-year-olds in London, while a red one works for 45-year-olds in New York. It then automatically generates the variations and deploys them without you ever having to open Photoshop.",
            "This leads to an 'Unfair Advantage' in your market. As your customer acquisition cost (CAC) continues to drop, you can afford to outspend your rivals, effectively pricing them out of the best traffic sources and securing long-term market dominance."
        ]
    },
    {
        slug: "ai-email-personalization",
        title: "Cognitive Lifecycle & Retention Engine",
        shortTitle: "AI Email Engine",
        tagline: "Transforming 'Mass Blast' into Individual 1-to-1 Dialogues",
        description: "Move past tokens and templates. Our engine builds unique, dynamic emails for every subscriber based on their specific browsing and purchase history.",
        icon: "Mail",
        category: "Automation",
        benefits: [
            "Individualized 'Send-Time' optimization for 100% of users",
            "Dynamic product carousels based on predicted next-purchase",
            "AI-generated 'Human' subject lines for peak open rates",
            "Churn-prevention workflows triggered by behavior shifts"
        ],
        integrations: ["Klaviyo", "Adobe Campaign", "Shopify Plus", "Custom E-commerce"],
        fullContent: [
            "The future of retention isn't 'segments'; it's individuals. Our Cognitive Lifecycle engine ensures that a first-time buyer receives a different experience than a 5-year veteran of your brand. By personalizing the content, timing, and tone of every email, we increase the 'Mental Availability' of your brand, making you the first choice whenever they are ready to buy.",
            "This isn't just about sales; it's about reducing 'Communication Fatigue.' By only sending relevant content at the precise moment it's needed, you dramatically reduce unsubscribe rates and protect your sender reputation. Your emails stop being 'spam' and start being 'service'.",
            "The indirect ROI is staggering. A 5% increase in customer retention can lead to a 25% to 95% increase in profit. Our AI makes that retention automatic, building a moat around your existing customer base that no amount of competitor ad spend can breach."
        ]
    },
    {
        slug: "ai-social-listening",
        title: "Neural Sentiment & Crisis Intelligence",
        shortTitle: "AI Social Listening",
        tagline: "Hearing the 'Whisper' before it becomes a 'Storm'",
        description: "Deploy semantic analysis bots that monitor the entire social web, identifying trends and sentiment shifts in your industry before they hit the mainstream.",
        icon: "Radio",
        category: "Intelligence",
        benefits: [
            "Early-warning system for negative brand sentiment",
            "Identify viral 'pioneer' topics for content strategy",
            "Competitor performance benchmarking in real-time",
            "UGC (User Generated Content) discovery and curation"
        ],
        integrations: ["Twitter Enterprise API", "Reddit Pro", "TrustPilot", "Google My Business"],
        fullContent: [
            "What people say about you when you're not in the room determines your brand's future. Our Neural Sentiment engine sifts through millions of comments, reviews, and tweets to find the emotional truth of your brand. This allows you to address complaints before they go viral and amplify praise the moment it happens.",
            "Beyond defense, this is a powerful offensive tool. By listening to the 'Complaints' about your competitors, you can identify gap opportunities in your market. If customers are frustrated with a rival's shipping speed, our AI flags it, allowing you to launch a 'Fast Shipping' campaign the same afternoon.",
            "This creates a brand that feels 'Prescient'—one that is always in tune with the cultural zeitgeist. When your messaging aligns perfectly with what customers are already thinking but haven't said yet, you build an iron-clad emotional connection that transcends price."
        ]
    },
    {
        slug: "ai-seo-assistant",
        title: "Sematic SEO & Authority Architect",
        shortTitle: "AI SEO Assistant",
        tagline: "Dominating Search Intent Through Neural Correlation",
        description: "Our AI doesn't just look for keywords; it maps the entire semantic field of your industry to build 'Topical Authority' that search engines trust implicitly.",
        icon: "Search",
        category: "Intelligence",
        benefits: [
            "Automated 'Link-Worthy' content gap identification",
            "Real-time technical SEO health monitoring",
            "Predictive algorithm-update impact analysis",
            "Zero-click search optimization for AI summaries"
        ],
        integrations: ["Search Console", "Ahrefs API", "WordPress VIP", "Next.js Static Sites"],
        fullContent: [
            "Google has moved from 'Strings' to 'Things.' Our Semantic SEO Architect ensures your site is structured so that AI-driven search engines (like SGE and Perplexity) view you as the ultimate source of truth. We build 'Topical Moats' by identifying every related concept and ensuring your site covers them more deeply than anyone else.",
            "The indirect benefit is 'Longevity.' Sites built on semantic authority are far more resilient to algorithm updates than those built on traditional keyword stuffing. When you provide genuine, interconnected value, the search engines have no choice but to reward you with top-tier rankings.",
            "We also optimize for the 'AI-First' world. As search shifts toward AI summaries, we ensure your brand's data is formatted so that LLMs cite YOU as the primary source, capturing traffic from the next generation of search users."
        ]
    },
    {
        slug: "ai-customer-journey",
        title: "Autonomous Journey Orchestration Suite",
        shortTitle: "AI Journey Mapping",
        tagline: "Engineering the 'Perfect' Customer Path Across Every Channel",
        description: "We use reinforcement learning to constantly experiment with and optimize the thousands of unique paths a customer can take from 'awareness' to 'advocate'.",
        icon: "GitBranch",
        category: "Automation",
        benefits: [
            "Hyper-personalized landing page experiences",
            "Cross-channel consistency (Social -> Ad -> Email -> Chat)",
            "Automated 'Recovery' sequences for journey drop-offs",
            "LTV-based journey branching for VIP accounts"
        ],
        integrations: ["Segment.io CDP", "Marketing Cloud", "Zapier Enterprise", "Custom Data Hubs"],
        fullContent: [
            "A customer's path is rarely linear. They might see a TikTok, read a blog on a laptop, and then buy on a tablet. Our Journey Orchestration suite ties these disparate threads together into a single, cohesive narrative. By recognizing the user across devices, we provide a frictionless experience that feels like magic.",
            "The system is 'Self-Healing.' If the AI notices a 10% drop in conversions on the 'Pricing' page for mobile users, it automatically triggers a set of experiments to find a better layout or copy alternative. It's like having a team of 100 data scientists working on every single customer's experience simultaneously.",
            "The resulting 'Effortless' experience is the ultimate brand builder. When buying from you is twice as easy as buying from a competitor, you no longer need to compete on price. You are competing on time and psychological comfort—the two most valuable commodities in the modern world."
        ]
    }
];

export const getAIServiceSlugs = () => aiServices.map(s => s.slug);
export const getAIServiceBySlug = (slug: string) => aiServices.find(s => s.slug === slug);
