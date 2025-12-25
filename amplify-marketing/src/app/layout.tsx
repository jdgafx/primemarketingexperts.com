import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Amp Marketing | AI Enabled Marketing Solutions",
  description: "Transform your brand with AI enabled marketing solutions. From intelligent agents to predictive analytics, Amp Marketing delivers results that amplify your business growth.",
  keywords: ["AI Marketing", "Marketing Automation", "Predictive Analytics", "AI Chatbots", "Digital Intelligence"],
  openGraph: {
    title: "Amp Marketing | AI Enabled Marketing Solutions",
    description: "Transform your brand with AI enabled marketing solutions.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-black text-white antialiased">
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
