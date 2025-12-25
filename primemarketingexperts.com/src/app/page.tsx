'use client';

import { Navbar, Footer } from '@/components/Layout';
import Link from 'next/link';
import Image from 'next/image';
import { services } from '@/lib/services';
import { useState, useEffect } from 'react';
import ServiceIcon from '@/components/ServiceIcon';

export default function Home() {
  const [showAllServices, setShowAllServices] = useState(false);
  const [currentHeroSlide, setCurrentHeroSlide] = useState(0);
  const [activeExploreTab, setActiveExploreTab] = useState('philosophy');

  // Hero Slider Logic
  const heroSlides = [
    '/images/hero-slide-1.jpg',
    '/images/hero-slide-2.jpg',
    '/images/hero-slide-3.jpg'
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHeroSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const displayedServices = showAllServices ? services : services.slice(0, 6);

  // Explore Section Data
  const exploreData = {
    philosophy: {
      title: "Our philosophy",
      text: "We envision a world where every brand has the opportunity to thrive. We do not care if you are a small e-commerce store or a medium-sized real estate firm. Our solutions are based on your needs and requirements. Nor on anyone else's. We use digital marketing to connect businesses and customers, building lasting relationships based on trust and engagement.",
      image: "/images/hero-slide-3.png",
      link: "/about"
    },
    values: {
      title: "Our Values",
      text: "Integrity: We believe in transparency and honesty in all our dealings. Innovation: We continuously seek new ideas and approaches to stay ahead in the ever-evolving marketing landscape. Collaboration: We work closely with our clients, valuing their input and insights to achieve common goals.",
      image: "/images/hero-slide-2.png",
      link: "/about"
    },
    team: {
      title: "Our Team",
      text: "Our team is composed of passionate professionals with diverse backgrounds in marketing, design, and technology. Each member brings unique skills and perspectives, allowing us to craft comprehensive strategies that cater to our clients' specific needs.",
      image: "/images/hero-slide-1.png",
      link: "/about"
    },
    careers: {
      title: "Careers",
      text: "We're always looking for great web developers and marketers. To apply, please send your resume and work samples to hello@primemarketingexperts.com and we'll be in touch.",
      image: "/images/hero-slide-2.png",
      link: "/contact"
    }
  };

  return (
    <main className="min-h-screen flex flex-col font-poppins">
      <Navbar />

      {/* Hero Section - Horizontal Sliding Carousel */}
      <div className="flex flex-col items-center justify-center w-full h-[100vh] relative -mt-20">
        {/* Hero Content Overlay */}
        <div className="flex w-full h-full absolute top-0 left-0 z-50 items-center bg-black/40">
          <div className="container mx-auto px-6 xl:px-0">
            <div className="max-w-[700px]">
              <h1 className="font-bold text-4xl md:text-5xl leading-[45px] md:leading-[60px] uppercase text-white">
                Driving Excellence With Superior Marketing Solutions
              </h1>
              <div className="mt-5 text-gray-200 text-lg">
                We are a full service relationship-driven marketing firm. We craft connections, to drive results with integrated, customized solutions that maximize ROI for our clients. We are focused on serving Small and Medium size businesses that need quality and affordable marketing solutions to help them grow and compete effectively in today`s complex digital landscape.
              </div>
              <Link href="/marketing-services">
                <div className="py-4 px-8 bg-gradient-to-r from-[rgb(249,115,22)] to-[rgb(234,88,12)] inline-block rounded-lg text-white font-medium mt-10 hover:shadow-lg transition-all">
                  Learn More
                </div>
              </Link>
            </div>
          </div>
        </div>

        {/* Horizontal Sliding Carousel */}
        <div className="relative w-full h-full overflow-hidden">
          <div
            className="flex h-full transition-transform duration-700 ease-in-out"
            style={{ transform: `translateX(-${currentHeroSlide * 100}%)` }}
          >
            {heroSlides.map((slide, index) => (
              <div
                key={index}
                className="min-w-full h-full relative flex-shrink-0"
              >
                <Image
                  src={slide}
                  alt={`Hero Slide ${index + 1}`}
                  fill
                  className="object-cover object-center"
                  priority={index === 0}
                />
              </div>
            ))}
          </div>

          {/* Carousel Indicators */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-[60] flex gap-3">
            {heroSlides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentHeroSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentHeroSlide
                  ? 'bg-orange-500 w-8'
                  : 'bg-white/60 hover:bg-white'
                  }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={() => setCurrentHeroSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length)}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-[60] bg-black/30 hover:bg-black/50 text-white p-3 rounded-full transition-all"
            aria-label="Previous slide"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={() => setCurrentHeroSlide((prev) => (prev + 1) % heroSlides.length)}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-[60] bg-black/30 hover:bg-black/50 text-white p-3 rounded-full transition-all"
            aria-label="Next slide"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      {/* Our Services Section */}
      <section className="py-10 md:py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-start md:text-center mb-2 text-gray-900">Our Services</h2>
          <p className="text-base text-gray-500 max-w-96 md:max-w-4xl w-[100%] md:text-center mx-auto mb-8 mt-5">
            Prime Marketing Experts is a digital marketing and website services company focused on helping small and medium-sized businesses in the Boston area prosper. Since 2017, we’ve served hundreds of companies and thousands of clients, offering a wide range of marketing, branding, and advertising solutions.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pt-5">
            {displayedServices.map((service, i) => (
              <div key={i} className="bg-white cursor-pointer hover:text-black p-6 rounded-lg shadow-md border border-gray-200 hover:shadow-lg transform transition duration-500 hover:scale-105 flex flex-col h-full">
                <div className="flex items-center justify-center mb-4">
                  <ServiceIcon iconName={service.icon} className="text-orange-600 w-[60px] h-[60px]" />
                </div>
                <h4 className="text-xl font-semibold mb-2 text-center text-gray-900">{service.title}</h4>
                <p className="text-gray-700 text-sm text-center mb-4 flex-grow">{service.description}</p>
                <div className="flex justify-center mt-auto">
                  <Link href={`/services/${service.slug}`}>
                    <button className="relative inline-flex items-center justify-center px-4 py-2 text-orange-600 font-medium group">
                      <span className="absolute inset-0 w-full h-full border-b-2 border-orange-600 transform scale-x-0 transition-transform duration-200 ease-out group-hover:scale-x-100"></span>
                      <span className="relative">Read More</span>
                    </button>
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {!showAllServices && (
            <div className="flex justify-center mt-14">
              <button
                onClick={() => setShowAllServices(true)}
                className="px-6 py-2 bg-gradient-to-r from-[rgb(249,115,22)] to-[rgb(234,88,12)] text-white font-medium rounded-md hover:bg-orange-700 transition duration-300"
              >
                Show More
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Solving Bottlenecks Section */}
      <section className="container py-10 md:py-12 mx-auto px-4">
        <div className="flex justify-center items-center">
          <div className="text-2xl md:text-4xl font-bold mb-5 md:mb-12 text-center max-w-[600px] text-gray-900">
            Solving your Digital Marketing and E-commerce Bottlenecks
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Card 1 */}
          <div className="rounded-lg border bg-card text-card-foreground shadow-sm flex flex-col h-full bg-white">
            <div className="flex flex-col space-y-1.5 p-6 pb-4">
              <h3 className="tracking-tight text-xl font-bold text-gray-900">Generate More Sales-Qualified Leads</h3>
              <p className="text-sm text-gray-500">Lead Generation</p>
            </div>
            <div className="p-4 pt-0 flex-grow">
              <p className="mb-6 text-sm text-gray-500">Boost your revenue with our customized marketing tactics designed to generate high-quality sales leads and increase overall sales performance.</p>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <svg className="h-5 w-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                  <span className="text-sm text-gray-700">Increase qualified leads</span>
                </div>
                <div className="flex items-center space-x-3">
                  <svg className="h-5 w-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                  <span className="text-sm text-gray-700">Enhance sales team productivity</span>
                </div>
                <div className="flex items-center space-x-3">
                  <svg className="h-5 w-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
                  <span className="text-sm text-gray-700">Grow online market revenue</span>
                </div>
              </div>
            </div>
          </div>

          {/* Card 2 */}
          <div className="rounded-lg border bg-card text-card-foreground shadow-sm flex flex-col h-full bg-white">
            <div className="flex flex-col space-y-1.5 p-6 pb-4">
              <h3 className="tracking-tight text-xl font-bold text-gray-900">Attract More Website Visitors</h3>
              <p className="text-sm text-gray-500">Web Traffic</p>
            </div>
            <div className="p-4 pt-0 flex-grow">
              <p className="mb-6 text-sm text-gray-500">Transform your website into a lead-generating powerhouse with our tailored digital marketing strategies and cutting-edge web development services.</p>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <svg className="h-5 w-5 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" /></svg>
                  <span className="text-sm text-gray-700">Optimize your sales pipeline</span>
                </div>
                <div className="flex items-center space-x-3">
                  <svg className="h-5 w-5 text-teal-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                  <span className="text-sm text-gray-700">Connect with your ideal audience</span>
                </div>
                <div className="flex items-center space-x-3">
                  <svg className="h-5 w-5 text-pink-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" /></svg>
                  <span className="text-sm text-gray-700">Increase meaningful conversations</span>
                </div>
              </div>
            </div>
          </div>

          {/* Card 3 */}
          <div className="rounded-lg border bg-card text-card-foreground shadow-sm flex flex-col h-full bg-white">
            <div className="flex flex-col space-y-1.5 p-6 pb-4">
              <h3 className="tracking-tight text-xl font-bold text-gray-900">Streamline Marketing and Sales Data</h3>
              <p className="text-sm text-gray-500">Data Integration</p>
            </div>
            <div className="p-4 pt-0 flex-grow">
              <p className="mb-6 text-sm text-gray-500">Harness the power of integrated marketing automation and CRM technology to align your sales and marketing efforts, maximizing ROI for each qualified lead.</p>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <svg className="h-5 w-5 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
                  <span className="text-sm text-gray-700">Synchronize sales and marketing data</span>
                </div>
                <div className="flex items-center space-x-3">
                  <svg className="h-5 w-5 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" /></svg>
                  <span className="text-sm text-gray-700">Leverage real-time data</span>
                </div>
                <div className="flex items-center space-x-3">
                  <svg className="h-5 w-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                  <span className="text-sm text-gray-700">Enhance conversion rates</span>
                </div>
              </div>
            </div>
          </div>

          {/* Card 4 */}
          <div className="rounded-lg border bg-card text-card-foreground shadow-sm flex flex-col h-full bg-white">
            <div className="flex flex-col space-y-1.5 p-6 pb-4">
              <h3 className="tracking-tight text-xl font-bold text-gray-900">Boost Your Online Presence</h3>
              <p className="text-sm text-gray-500">Digital Presence</p>
            </div>
            <div className="p-4 pt-0 flex-grow">
              <p className="mb-6 text-sm text-gray-500">Elevate your website's visibility and attract more visitors with our customized SEO services and targeted social media and search engine advertising strategies.</p>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <svg className="h-5 w-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" /></svg>
                  <span className="text-sm text-gray-700">Improve search engine rankings</span>
                </div>
                <div className="flex items-center space-x-3">
                  <svg className="h-5 w-5 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                  <span className="text-sm text-gray-700">Develop thought leadership</span>
                </div>
                <div className="flex items-center space-x-3">
                  <svg className="h-5 w-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354l1.107 3.183h3.351l-2.711 1.967 1.036 3.183-2.783-2.022-2.783 2.022 1.036-3.183-2.711-1.967h3.351L12 4.354z" /></svg>
                  <span className="text-sm text-gray-700">Expand your online audience</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Meet Michael Section */}
      <section className="bg-gray-100 py-10 md:py-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="flex-shrink-0">
              <div className="relative w-full h-72 md:w-80 lg:w-96 overflow-hidden rounded-lg shadow-lg transition-all duration-500 transform hover:scale-105">
                <Image src="/images/michael-krieger-section.jpg" alt="Michael Krieger" width={800} height={800} className="object-cover w-full h-full" />
              </div>
            </div>
            <div>
              <p className="text-lg text-gray-700 mb-6">Prime Marketing Experts was founded in 2017 by Michael Krieger, a native Bostonian.</p>
              <blockquote className="text-gray-600 italic border-l-4 border-orange-500 pl-4">
                “As an entrepreneur myself, I am dedicated to helping small businesses grow their business and online presence. We have many tools to choose from to help SMBs grow, BUT one thing is for certain, the foundation of all successful online businesses is one’s website. Without a strong website that has a clear message and brand that is built to attract the targeted audience... maintaining an online presence in this ever-competitive marketplace is almost impossible.”
              </blockquote>
            </div>
          </div>
          <div className="mt-12">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">Meet Michael</h3>
            <p className="text-gray-700 mb-6">
              Prime Marketing Experts has served for over 7 years, helping hundreds of companies in the Boston area. After earning his Master of Science at the University of Massachusetts, Lowell, Michael built a company that has become a one-stop marketing shop for small to medium-sized companies and their marketing needs. PME excels at creating robust websites, social media campaigns, email campaigns, LinkedIn partnerships, Bing and Google Ads, and more.
            </p>
            <blockquote className="text-gray-600 italic border-l-4 border-orange-500 pl-4">
              “Every day, I see that what truly separates us from other marketing firms is our dedication to effectively building relationships with key potential clients over time. For us, being a relationship-driven marketing firm means always prioritizing long-term, meaningful connections over traditional transactional approaches.”
            </blockquote>
          </div>
        </div>
      </section>

      {/* Who We Serve Section */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Who We Serve</h2>
          <p className="text-gray-600 mb-12 text-center max-w-4xl mx-auto">
            In today`s competitive business landscape, a one-size-fits-all approach to marketing is no longer sufficient. Successful marketing strategies must be tailored to the specific needs, challenges, and goals of each industry. That is why we empower diverse industries with customized, results-driven marketing solutions tailored to their unique needs and goals.
          </p>

          <div className="rounded-lg border bg-white shadow-sm mb-8 md:p-5">
            <div className="flex flex-col space-y-1.5 p-6">
              <h3 className="font-semibold tracking-tight text-2xl text-orange-600">Marketing for Small to Medium Business Owners</h3>
            </div>
            <div className="p-4 pt-0">
              <p className="text-gray-600">PM is dedicated to helping SMBs achieve their marketing goals with top-notch, industry-specific strategies. We focus on providing exceptional service that fits within their budget.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: "✈️", title: "Tourism", href: "/industry/tourism" },
              { icon: "🚗", title: "Automotive", href: "/industry/automotive" },
              { icon: "🍽️", title: "Restaurants", href: "/industry/restaurant" },
              { icon: "🛍️", title: "Retail", href: "/industry/retail" },
              { icon: "🧹", title: "Cleaning Companies", href: "/industry/cleaning-companies" },
              { icon: "💪", title: "Gyms", href: "/industry/gyms" },
              { icon: "🏗️", title: "Construction", href: "/industry/construction" },
              { icon: "🏠", title: "Real Estate", href: "/industry/real-estate" },
              { icon: "🏥", title: "Healthcare", href: "/industry/healthcare" },
            ].map((industry, i) => (
              <Link key={i} href={industry.href} className="no-underline">
                <div className="rounded-lg border bg-white shadow-sm hover:shadow-md transition-shadow duration-300 cursor-pointer h-full">
                  <div className="flex items-center p-6">
                    <span className="text-4xl mr-4" aria-hidden="true">{industry.icon}</span>
                    <h4 className="text-lg font-semibold text-gray-900">{industry.title}</h4>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Explore Prime Marketing Experts Section */}
      <div className="w-full overflow-hidden py-10 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 text-gray-900">Explore Prime Marketing Experts</h2>
          <div className="hidden md:flex items-center justify-center mb-8 flex-wrap">
            {Object.keys(exploreData).map((key) => (
              <button
                key={key}
                onClick={() => setActiveExploreTab(key)}
                className={`inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium px-5 py-3 m-2 transition-all duration-300 border ${activeExploreTab === key
                  ? 'bg-gradient-to-r from-orange-400 to-pink-600 text-white'
                  : 'bg-white hover:bg-gray-100 hover:text-orange-600'
                  }`}
              >
                {exploreData[key as keyof typeof exploreData].title}
              </button>
            ))}
          </div>

          <div className="flex justify-center">
            <div className="text-card-foreground shadow-sm border max-w-5xl rounded-2xl overflow-hidden bg-white">
              <div className="p-0">
                <div className="flex flex-col lg:flex-row">
                  <div className="lg:w-1/2 p-6 lg:p-12 flex flex-col justify-center items-start">
                    <h3 className="text-3xl font-bold mb-4 text-gray-900">{exploreData[activeExploreTab as keyof typeof exploreData].title}</h3>
                    <p className="text-gray-600 mb-4">
                      {exploreData[activeExploreTab as keyof typeof exploreData].text}
                    </p>
                    <Link href={exploreData[activeExploreTab as keyof typeof exploreData].link} className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium px-5 py-3 mt-4 bg-gradient-to-r from-orange-400 to-pink-600 text-white hover:from-orange-500 hover:to-pink-700 transition-colors">
                      Learn More
                    </Link>
                  </div>
                  <div className="lg:w-1/2 min-h-[300px] relative">
                    <Image
                      src={exploreData[activeExploreTab as keyof typeof exploreData].image}
                      alt={exploreData[activeExploreTab as keyof typeof exploreData].title}
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Our Case Studies Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 uppercase">Our Case Studies</h2>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[
              { title: "The 6 Most Effective Methods to Differentiate Your Business", img: "/images/case-study-6-methods.webp", excerpt: "Successful business owners differentiate their companies to effectively grow sales profitably, while improving client loyalty within a...", slug: "the-6-most-effective-methods-to-differentiate-your-business" },
              { title: "How To Grow Your Business By Planning & Hosting Events", img: "/images/case-study-grow-business.webp", excerpt: "Event hosting is a great way of promote your business as it helps you build trust with your targeted customers. Businesses should plan...", slug: "how-to-grow-your-business-by-planning-and-hosting-events" },
              { title: "The 7 Key Attributes That Your Business Needs In Its Next Salesperson", img: "/images/case-study-7-attributes.webp", excerpt: "Hiring salespeople that are passionate about your business is no easy feat, which means that you crucially need to...", slug: "the-7-key-attributes-that-your-business-needs-in-its-next-salesperson" }
            ].map((study, i) => (
              <Link key={i} href={`/case-studies/${study.slug}`}>
                <article className="overflow-hidden rounded-lg border transition-all duration-300 bg-white hover:scale-105 group h-full flex flex-col">
                  <div className="relative aspect-[16/9]">
                    <Image src={study.img} alt={study.title} fill className="object-cover transition duration-300" />
                    {/* Added onError Fallback just in case */}
                  </div>
                  <div className="p-6 flex flex-col flex-grow">
                    <h3 className="text-xl font-bold mb-4 text-gray-900 line-clamp-2 leading-[32px]">{study.title}</h3>
                    <p className="text-gray-600 line-clamp-3 text-sm leading-[24px] mb-4 flex-grow">{study.excerpt}</p>
                    <div className="text-sm font-semibold w-full text-orange-600 flex justify-end items-center gap-3 group-hover:underline">
                      Read More <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-right w-4 h-4"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>

          <div className="text-center mt-16">
            <Link href="/blog">
              <div className="inline-block bg-[rgb(234,88,12)] text-white px-12 py-4 rounded-full font-bold shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-1 uppercase tracking-widest">
                View All Case Studies
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Trending Articles Section */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 uppercase">Trending Articles</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {[
              { title: "Improving Content Marketing Strategy Through Consolidation To...", img: "/images/blog-improving-content.webp", excerpt: "Every year, marketers and business owners generate massive amounts of content to reach their prospects...", slug: "improving-content-marketing-strategy-through-consolidation-to-drive-roi" },
              { title: "The Top Benefits of Search Engine Advertising: Boosting Your Online...", img: "/images/blog-search-ads.webp", excerpt: "Search engine advertising is an effective way to grow your business's online presence...", slug: "the-top-benefits-of-search-engine-advertising-boosting-your-online-presence" },
              { title: "A Salute To Female Entrepreneurs", img: "/images/blog-female-entrepreneurs.webp", excerpt: "We're saluting all current and aspirational female entrepreneurs who are building companies from the ground up...", slug: "a-salute-to-female-entrepreneurs" }
            ].map((article, i) => (
              <Link key={i} href={`/blog/${article.slug}`}>
                <article className="overflow-hidden rounded-lg border transition-all duration-300 bg-white hover:scale-105 group h-full flex flex-col">
                  <div className="relative aspect-[16/9]">
                    <Image src={article.img} alt={article.title} fill className="object-cover transition duration-300" />
                  </div>
                  <div className="p-6 flex flex-col flex-grow">
                    <h3 className="text-xl font-bold mb-4 text-gray-900 line-clamp-2 leading-[32px]">{article.title}</h3>
                    <p className="text-gray-600 line-clamp-3 text-sm leading-[24px] mb-4 flex-grow">{article.excerpt}</p>
                    <div className="text-sm font-semibold w-full text-orange-600 flex justify-end items-center gap-3 group-hover:underline">
                      Read More <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-right w-4 h-4"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>

          <div className="text-center mt-16">
            <Link href="/blog">
              <div className="inline-block bg-[rgb(234,88,12)] text-white px-12 py-4 rounded-full font-bold shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-1 uppercase tracking-widest">
                View All Articles
              </div>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
