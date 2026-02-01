"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import MagneticButton from "./ui/MagneticButton";

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [hidden, setHidden] = useState(false);
    const { scrollY } = useScroll();

    useMotionValueEvent(scrollY, "change", (latest) => {
        const previous = scrollY.getPrevious() ?? 0;
        setHidden(latest > previous && latest > 150);
        setScrolled(latest > 50);
    });

    const navLinks = [
        { name: "SERVICES", href: "#services" },
        { name: "PRICING", href: "#pricing" },
        { name: "ABOUT", href: "#about" },
        { name: "CONTACT", href: "#contact" },
    ];

    return (
        <>
            <motion.nav
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: hidden ? -100 : 0, opacity: hidden ? 0 : 1 }}
                transition={{ duration: 0.3 }}
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? "py-4 bg-[#030014]/80 backdrop-blur-md border-b border-white/5" : "py-6 bg-transparent"}`}
            >
                <div className="container mx-auto px-6 md:px-12 flex items-center justify-between">
                    {/* Logo Section */}
                    <Link href="/" className="flex items-center gap-2 md:gap-3 group z-50 relative">
                        <motion.div
                            whileHover={{ rotate: 180, scale: 1.1 }}
                            transition={{ duration: 0.5 }}
                            className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-br from-cyan-400 to-cyan-600 rounded-lg flex items-center justify-center text-black font-bold text-lg md:text-xl shadow-[0_0_20px_rgba(6,182,212,0.5)]"
                        >
                            A
                        </motion.div>
                        <span className="text-lg md:text-xl font-bold tracking-tighter font-mono flex items-baseline">
                            <span className="text-white transition-colors group-hover:text-cyan-400">VOLTZ</span>
                        </span>
                    </Link>

                    {/* Desktop Menu - STRICTLY HIDDEN ON MOBILE & TABLET */}
                    <div className="hidden lg:flex items-center gap-2">
                        {navLinks.map((link) => (
                            <MagneticButton key={link.name} className="px-4 py-2">
                                <Link
                                    href={link.href}
                                    className="text-xs font-bold text-gray-400 hover:text-white tracking-widest transition-colors font-mono"
                                >
                                    [{link.name}]
                                </Link>
                            </MagneticButton>
                        ))}
                        <motion.button
                            whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(6,182,212,0.6)" }}
                            whileTap={{ scale: 0.95 }}
                            className="ml-4 px-6 py-3 bg-gradient-to-r from-cyan-500 to-cyan-400 text-black text-xs font-bold tracking-widest font-mono rounded-lg shadow-[0_0_20px_rgba(6,182,212,0.4)]"
                        >
                            START_PROJECT
                        </motion.button>
                    </div>

                    {/* Mobile Menu Button - Visible up to Large Screens */}
                    <button
                        className="lg:hidden relative z-50 w-10 h-10 flex items-center justify-center focus:outline-none"
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        <div className="space-y-1.5 w-6">
                            <motion.div
                                animate={{ rotate: isOpen ? 45 : 0, y: isOpen ? 6 : 0, backgroundColor: isOpen ? "#ffffff" : "#22d3ee" }}
                                className="w-full h-0.5 rounded-full origin-center transition-colors"
                            />
                            <motion.div
                                animate={{ opacity: isOpen ? 0 : 1 }}
                                className="w-3/4 h-0.5 bg-white rounded-full ml-auto"
                            />
                            <motion.div
                                animate={{ rotate: isOpen ? -45 : 0, y: isOpen ? -6 : 0, backgroundColor: isOpen ? "#ffffff" : "#22d3ee" }}
                                className="w-full h-0.5 rounded-full origin-center transition-colors"
                            />
                        </div>
                    </button>
                </div>
            </motion.nav>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="fixed inset-0 z-40 bg-[#030014] flex flex-col justify-center items-center lg:hidden"
                    >
                        {/* Background Effects */}
                        <div className="absolute inset-0 overflow-hidden pointer-events-none">
                            <div className="absolute top-1/4 -left-10 w-64 h-64 bg-cyan-500/20 rounded-full blur-[100px]" />
                            <div className="absolute bottom-1/4 -right-10 w-64 h-64 bg-purple-500/20 rounded-full blur-[100px]" />
                        </div>

                        <nav className="relative z-10 flex flex-col gap-8 text-center w-full px-8">
                            {navLinks.map((link, i) => (
                                <motion.div
                                    key={link.name}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.1 + i * 0.1 }}
                                >
                                    <Link
                                        href={link.href}
                                        onClick={() => setIsOpen(false)}
                                        className="text-3xl font-bold font-space text-white hover:text-cyan-400 transition-colors block"
                                    >
                                        {link.name}
                                    </Link>
                                </motion.div>
                            ))}

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5 }}
                                className="mt-4"
                            >
                                <button className="w-full py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold font-mono tracking-widest rounded-xl shadow-lg shadow-cyan-500/20">
                                    START PROJECT
                                </button>
                            </motion.div>
                        </nav>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
