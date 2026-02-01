"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import AnimatedText from "./ui/AnimatedText";
import MagneticButton from "./ui/MagneticButton";
import { Zap, Users, Shield, Clock } from "lucide-react";

import dynamic from "next/dynamic";

const TechScene = dynamic(() => import("./3d/TechScene"), { ssr: false });

export default function Hero() {
    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#030014] pt-20">
            {/* Background Effects */}
            <div className="absolute inset-0 pointer-events-none">
                <TechScene />
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-[100px] animate-pulse" />
                <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-[100px] animate-pulse delay-1000" />
                <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#030014] to-transparent z-10" />
                <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(6,182,212,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(6,182,212,0.05)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
            </div>

            <div className="container mx-auto px-6 relative z-10 text-center">

                {/* Badge */}
                <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }} className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-8 backdrop-blur-sm">
                    <span className="flex h-2 w-2 relative">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                    </span>
                    <span className="text-xs font-mono text-gray-300 tracking-wider uppercase">Available for New Projects</span>
                </motion.div>

                {/* Title */}
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.4 }} className="mb-6 w-full">
                    <h1 className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter mb-6 font-space z-10 relative">
                        <div className="flex flex-wrap justify-center gap-2 sm:gap-4 overflow-hidden">
                            <AnimatedText text="ANOTHER" className="text-white drop-shadow-[0_0_30px_rgba(255,255,255,0.1)] inline-block" type="chars" animation="bounce" />
                        </div>
                        <div className="flex flex-wrap justify-center gap-2 sm:gap-4 mt-2 z-10">
                            <AnimatedText
                                text="VOLTZ"
                                className="text-cyan-400 drop-shadow-[0_0_35px_rgba(6,182,212,0.6)]"
                                type="chars"
                                animation="bounce"
                                delay={0.2}
                            />
                        </div>
                    </h1>
                </motion.div>

                {/* Subtitle */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="text-lg md:text-xl text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed z-10 relative"
                >
                    Jasa joki tugas kuliah & skripsi coding dengan kualitas premium. <br className="hidden md:block" />
                    <span className="text-cyan-400 font-semibold">Cepat, Aman, & Terpercaya.</span>
                </motion.p>

                {/* Buttons */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className="flex flex-wrap justify-center gap-4 z-10 relative"
                >
                    <a
                        href="https://wa.me/628973207214?text=Halo%20Admin%20Another%20Voltz%2C%20saya%20ingin%20konsultasi%20mengenai%20project%20tugas%20kuliah%2Fskripsi."
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <MagneticButton className="bg-cyan-500 hover:bg-cyan-400 text-black font-bold px-8 py-4 rounded-full text-lg shadow-[0_0_20px_rgba(6,182,212,0.5)] hover:shadow-[0_0_40px_rgba(6,182,212,0.7)] transition-all">
                            Start Project
                        </MagneticButton>
                    </a>

                    <div onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })} className="cursor-pointer">
                        <MagneticButton className="bg-white/5 hover:bg-white/10 text-white border border-white/10 px-8 py-4 rounded-full text-lg backdrop-blur-sm">
                            Watch Demo
                        </MagneticButton>
                    </div>
                </motion.div>

                {/* Stats Summary - Revised to Match Reference */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.8 }}
                    className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-4xl mx-auto relative z-10"
                >
                    {[
                        { icon: Zap, value: "1,500+", label: "PROJECTS DONE" },
                        { icon: Users, value: "500+", label: "HAPPY CLIENTS" },
                        { icon: Shield, value: "5+", label: "YEARS EXPERIENCE" },
                        { icon: Clock, value: "2 Days", label: "AVG DELIVERY" },
                    ].map((stat, idx) => (
                        <div key={idx} className="bg-white/5 border border-white/10 backdrop-blur-md rounded-2xl p-6 text-left hover:bg-white/10 transition-colors group">
                            <div className="text-cyan-400 mb-4 text-xl group-hover:scale-110 transition-transform origin-left">
                                <stat.icon size={24} />
                            </div>
                            <h3 className="text-3xl font-bold text-white font-space mb-1">{stat.value}</h3>
                            <p className="text-[10px] text-gray-400 uppercase tracking-widest font-mono">{stat.label}</p>
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
