"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Quote, Star } from "lucide-react";
import GlowCard from "./ui/GlowCard";
import AnimatedText from "./ui/AnimatedText";

const testimonials = [
    {
        name: "Sarah Dewi",
        role: "Mahasiswa S1 Manajemen",
        university: "UI Jakarta",
        avatar: "S",
        rating: 5,
        text: "Skripsi saya selesai dalam waktu 2 minggu dengan kualitas yang sangat memuaskan. Revisi juga cepat dan responsif. Highly recommended!",
        gradient: "from-cyan-500 to-blue-600",
    },
    {
        name: "Ahmad Rizki",
        role: "Mahasiswa S1 Informatika",
        university: "ITB Bandung",
        avatar: "A",
        rating: 5,
        text: "Project web app yang kompleks dikerjakan dengan sangat profesional. Source code bersih dan dokumentasi lengkap. Worth every penny!",
        gradient: "from-purple-500 to-pink-600",
    },
    {
        name: "Michelle Tan",
        role: "Mahasiswa S2 Akuntansi",
        university: "UGM Yogyakarta",
        avatar: "M",
        rating: 5,
        text: "Olah data SPSS untuk thesis saya dikerjakan dengan akurat. Penjelasan metodologi juga sangat membantu untuk sidang.",
        gradient: "from-emerald-500 to-teal-600",
    },
    {
        name: "Budi Santoso",
        role: "Mahasiswa D3 Sistem Informasi",
        university: "Poltek Surabaya",
        avatar: "B",
        rating: 5,
        text: "Tugas akhir mobile app React Native berjalan lancar. Deploy ke Play Store juga dibantu. Pelayanan mantap!",
        gradient: "from-orange-500 to-red-600",
    },
    {
        name: "Lisa Permata",
        role: "Mahasiswa S1 Ekonomi",
        university: "UNPAD Bandung",
        avatar: "L",
        rating: 5,
        text: "Sudah 3x pakai jasa ini untuk berbagai tugas. Selalu on time dan hasilnya konsisten bagus. Best service!",
        gradient: "from-pink-500 to-rose-600",
    },
    {
        name: "Kevin Wijaya",
        role: "Mahasiswa S1 Teknik",
        university: "ITS Surabaya",
        avatar: "K",
        rating: 5,
        text: "Simulasi MATLAB yang rumit dikerjakan dengan rapi. Bahkan dikasih bonus tutorial cara running programnya. Top!",
        gradient: "from-indigo-500 to-purple-600",
    },
];

export default function Testimonials() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <section id="testimonials" className="relative py-32 md:py-40 bg-gradient-to-b from-[#030014] to-[#050520] overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent" />
                <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(6,182,212,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(6,182,212,0.02)_1px,transparent_1px)] bg-[size:80px_80px]" />
            </div>

            <div className="container mx-auto px-6 relative z-10" ref={ref}>
                {/* Header */}
                <div className="text-center max-w-3xl mx-auto mb-20">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="flex items-center justify-center gap-3 mb-6"
                    >
                        <div className="h-px w-16 bg-gradient-to-r from-transparent to-purple-500/50" />
                        <span className="px-4 py-1.5 bg-purple-500/10 border border-purple-500/20 rounded-full text-purple-400 text-xs font-mono uppercase tracking-widest">
                            Testimonials
                        </span>
                        <div className="h-px w-16 bg-gradient-to-l from-transparent to-purple-500/50" />
                    </motion.div>

                    <AnimatedText
                        text="WHAT THEY SAY"
                        className="text-4xl md:text-5xl lg:text-6xl font-black font-space tracking-tighter text-white mb-6"
                        type="words"
                        animation="fadeUp"
                    />

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        viewport={{ once: true }}
                        className="text-lg text-gray-400"
                    >
                        Ribuan mahasiswa sudah mempercayakan tugas mereka kepada kami.
                    </motion.p>
                </div>

                {/* Testimonials Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {testimonials.map((testimonial, idx) => (
                        <motion.div
                            key={testimonial.name}
                            initial={{ opacity: 0, y: 50 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.6, delay: idx * 0.1 }}
                        >
                            <GlowCard className="h-full p-6 md:p-8" glowColor="rgba(168, 85, 247, 0.3)">
                                <div className="relative z-10">
                                    {/* Quote Icon */}
                                    <Quote className="w-8 h-8 text-white/10 mb-4" />

                                    {/* Rating */}
                                    <div className="flex gap-1 mb-4">
                                        {Array.from({ length: testimonial.rating }).map((_, i) => (
                                            <Star key={i} className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                                        ))}
                                    </div>

                                    {/* Text */}
                                    <p className="text-gray-300 leading-relaxed mb-6 text-sm md:text-base">
                                        "{testimonial.text}"
                                    </p>

                                    {/* Author */}
                                    <div className="flex items-center gap-4 pt-4 border-t border-white/5">
                                        <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${testimonial.gradient} flex items-center justify-center text-white font-bold text-lg`}>
                                            {testimonial.avatar}
                                        </div>
                                        <div>
                                            <p className="text-white font-medium">{testimonial.name}</p>
                                            <p className="text-gray-500 text-sm">{testimonial.role}</p>
                                            <p className="text-cyan-400 text-xs">{testimonial.university}</p>
                                        </div>
                                    </div>
                                </div>
                            </GlowCard>
                        </motion.div>
                    ))}
                </div>

                {/* Stats */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    viewport={{ once: true }}
                    className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 text-center"
                >
                    {[
                        { value: "98%", label: "Client Satisfaction" },
                        { value: "1,500+", label: "Projects Completed" },
                        { value: "4.9/5", label: "Average Rating" },
                        { value: "50+", label: "Universities" },
                    ].map((stat, idx) => (
                        <motion.div
                            key={stat.label}
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.1 * idx }}
                            viewport={{ once: true }}
                        >
                            <p className="text-3xl md:text-4xl font-black font-space gradient-text mb-2">
                                {stat.value}
                            </p>
                            <p className="text-gray-500 text-sm uppercase tracking-wider">
                                {stat.label}
                            </p>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
