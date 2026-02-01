"use client";
// Main Page Component

import dynamic from "next/dynamic";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Features from "@/components/Features";
import Pricing from "@/components/Pricing";
import Testimonials from "@/components/Testimonials";
import Footer from "@/components/Footer";

const CustomCursor = dynamic(() => import("@/components/ui/CustomCursor"), { ssr: false });
const LoadingScreen = dynamic(() => import("@/components/ui/LoadingScreen"), { ssr: false });

export default function Home() {
  return (
    <>
      <LoadingScreen />
      <CustomCursor />

      <main className="min-h-screen bg-[#030014] text-white selection:bg-cyan-500 selection:text-black overflow-x-hidden">
        <Navbar />

        <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
          <div className="orb orb-1" />
          <div className="orb orb-2" />
          <div className="orb orb-3" />
          <div className="matrix-bg" />
        </div>

        <div className="relative z-10">
          <Hero />
          <About />
          <Features />
          <Pricing />
          <Testimonials />
          <Footer />
        </div>
      </main>
    </>
  );
}
