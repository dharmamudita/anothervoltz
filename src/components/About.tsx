"use client";

import React, { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import AnimatedText from "./ui/AnimatedText";
import { CheckCircle2, Trophy, Users, Zap } from "lucide-react";
import Modal from "./ui/Modal";

const values = [
    { title: "Expert Team", desc: "Tim kami terdiri dari lulusan universitas top dengan IPK > 3.8", icon: Users },
    { title: "Premium Quality", desc: "Setiap tugas melalui 2x proses quality control sebelum dikirim", icon: Trophy },
    { title: "Fast Delivery", desc: "Pengerjaan kilat dengan tetap menjaga detail dan kualitas", icon: Zap },
    { title: "100% Confidential", desc: "Data dan privasi klien dijamin aman dan terenkripsi", icon: CheckCircle2 },
];

export default function About() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start end", "end start"] });
    const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
    const [selectedValue, setSelectedValue] = useState<typeof values[0] | null>(null);

    return (
        <section id="about" ref={containerRef} className="relative py-24 md:py-32 bg-[#030014] overflow-hidden">
            <div className="container mx-auto px-6 relative z-10">
                <div className="flex flex-col lg:flex-row items-center gap-16">
                    {/* Text Content */}
                    <div className="flex-1">
                        <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }}>
                            <div className="flex items-center gap-2 mb-4">
                                <span className="h-px w-10 bg-cyan-500"></span>
                                <span className="text-cyan-400 font-mono text-sm tracking-widest uppercase">About Us</span>
                            </div>
                            <AnimatedText text="WE DELIVER EXCELLENCE" className="text-4xl md:text-5xl font-black font-space text-white mb-6 leading-tight" type="words" />
                            <p className="text-gray-400 text-lg leading-relaxed mb-8">
                                Another Voltz bukan sekadar penyedia jasa tugas. Kami adalah mitra akademik strategis Anda. Berdiri sejak 2019, kami telah membantu lebih dari 1500+ mahasiswa mencapai potensi akademik terbaik mereka tanpa mengorbankan waktu berharga.
                            </p>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                {values.map((item, idx) => (
                                    <motion.div
                                        key={item.title}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        transition={{ delay: idx * 0.1, duration: 0.5 }}
                                        viewport={{ once: true }}
                                        onClick={() => setSelectedValue(item)}
                                        className="flex gap-4 p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors group cursor-pointer"
                                    >
                                        <div className="w-10 h-10 rounded-lg bg-cyan-500/10 flex items-center justify-center text-cyan-400 group-hover:bg-cyan-500 group-hover:text-black transition-all">
                                            <item.icon size={20} />
                                        </div>
                                        <div>
                                            <h4 className="text-white font-bold font-space uppercase text-sm mb-1 group-hover:text-cyan-400 transition-colors">{item.title}</h4>
                                            <p className="text-gray-500 text-xs leading-relaxed">{item.desc}</p>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    </div>

                    {/* Image / Visual */}
                    <div className="flex-1 relative w-full aspect-square md:aspect-video lg:aspect-square max-w-[500px]">
                        <motion.div style={{ y }} className="absolute inset-0">
                            {/* Decorative Elements replacing Image */}
                            <div className="relative w-full h-full">
                                <div className="absolute top-0 right-0 w-3/4 h-3/4 bg-gradient-to-bl from-cyan-500/20 to-purple-600/20 rounded-3xl border border-white/10 backdrop-blur-sm z-10" />
                                <div className="absolute bottom-0 left-0 w-3/4 h-3/4 bg-[#0a0a0a] rounded-3xl border border-white/10 z-20 overflow-hidden flex items-center justify-center group">
                                    <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(6,182,212,0.05)_50%,transparent_75%,transparent_100%)] bg-[length:250%_250%,100%_100%] animate-[shimmer_3s_infinite]" />
                                    <h3 className="text-6xl font-black text-white/5 group-hover:text-white/10 transition-colors">2024</h3>
                                </div>

                                {/* Floating Badge */}
                                <motion.div
                                    animate={{ y: [0, -20, 0] }}
                                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 bg-black/80 backdrop-blur-xl p-6 rounded-2xl border border-cyan-500/30 shadow-[0_0_30px_rgba(6,182,212,0.3)] text-center"
                                >
                                    <div className="text-4xl font-bold text-white mb-1">5+</div>
                                    <div className="text-xs text-cyan-400 uppercase tracking-widest font-mono">Years Experience</div>
                                </motion.div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* Modal */}
            <Modal isOpen={!!selectedValue} onClose={() => setSelectedValue(null)} title={selectedValue?.title || ""}>
                <div className="space-y-4">
                    <p className="text-lg text-white">{selectedValue?.desc}</p>
                    <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                        <p className="text-sm text-gray-400 leading-relaxed">
                            Kami berkomitmen penuh pada {selectedValue?.title.toLowerCase()}. Standar kami diatur untuk melebihi ekspektasi Anda dalam setiap aspek, mulai dari komunikasi hingga hasil akhir.
                        </p>
                    </div>
                </div>
            </Modal>
        </section>
    );
}
