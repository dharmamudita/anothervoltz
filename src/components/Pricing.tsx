"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Check, X } from "lucide-react";
import MagneticButton from "./ui/MagneticButton";

const pricingPlans = [
    {
        name: "Basic",
        price: "Start 100k",
        desc: "Untuk tugas ringan & makalah sederhana",
        features: ["Pengerjaan 1-14 Hari", "Revisi Minor 1x", "Format Standar", "Admin Support"],
        popular: false,
        gradient: "from-blue-500 to-cyan-500"
    },
    {
        name: "Pro",
        price: "Start 200k",
        desc: "Best for Skripsi & Coding Projects",
        features: ["Pengerjaan 1-7 Hari", "Revisi Major 2x", "Turnitin Checker", "Priority Support", "Source Code + Logika"],
        popular: true,
        gradient: "from-purple-500 to-pink-500"
    },
    {
        name: "Urgent",
        price: "Custom",
        desc: "Deadline mepet? Kami siap bantu!",
        features: ["Pengerjaan 1-3 Hari", "Unlimited Revisi", "Direct Consultant", "VIP Handling", "Garansi Uang Kembali"],
        popular: false,
        gradient: "from-orange-500 to-red-500"
    }
];

export default function Pricing() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <section id="pricing" className="relative py-32 bg-[#030014]">
            <div className="container mx-auto px-6 relative z-10" ref={ref}>
                <div className="text-center max-w-2xl mx-auto mb-20">
                    <span className="text-cyan-400 font-mono text-sm tracking-widest uppercase mb-4 block">Pricing Plans</span>
                    <h2 className="text-4xl md:text-5xl font-black text-white font-space mb-6">Invest in Your Grades</h2>
                    <p className="text-gray-400">Harga transparan sesuai tingkat kesulitan. Konsultasi gratis untuk estimasi biaya.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {pricingPlans.map((plan, idx) => (
                        <motion.div
                            key={plan.name}
                            initial={{ opacity: 0, y: 50 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ delay: idx * 0.2, duration: 0.5 }}
                            className={`relative p-8 rounded-3xl border ${plan.popular ? 'border-cyan-500/50 bg-gradient-to-b from-cyan-900/10 to-transparent' : 'border-white/10 bg-white/5'} backdrop-blur-xl group hover:-translate-y-2 transition-transform duration-300`}
                        >
                            {plan.popular && (
                                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full text-xs font-bold text-white uppercase tracking-widest shadow-lg shadow-cyan-500/20">Most Popular</div>
                            )}

                            <h3 className="text-xl font-bold text-white mb-2">{plan.name}</h3>
                            <div className="text-3xl font-black text-white mb-1 font-space">{plan.price}</div>
                            <p className="text-sm text-gray-500 mb-8">{plan.desc}</p>

                            <ul className="space-y-4 mb-8">
                                {plan.features.map((feature) => (
                                    <li key={feature} className="flex items-center gap-3 text-sm text-gray-300">
                                        <div className={`w-5 h-5 rounded-full flex items-center justify-center ${plan.popular ? 'bg-cyan-500/20 text-cyan-400' : 'bg-white/10 text-gray-400'}`}>
                                            <Check size={12} />
                                        </div>
                                        {feature}
                                    </li>
                                ))}
                            </ul>

                            <a
                                href={`https://wa.me/628973207214?text=Halo%20Admin%20Another%20Voltz%2C%20saya%20tertarik%20dengan%20paket%20${plan.name}%20(${plan.price}).%20Boleh%20konsultasi%3F`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block w-full"
                            >
                                <div className={`w-full py-4 rounded-xl font-bold text-sm tracking-widest uppercase text-center transition-all ${plan.popular ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/20 hover:scale-105' : 'bg-white/10 text-white hover:bg-white/20'}`}>
                                    Choose Plan
                                </div>
                            </a>
                        </motion.div>
                    ))}
                </div>

                {/* Disclaimer */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    className="mt-10 text-center"
                >
                    <p className="text-gray-500 text-xs md:text-sm font-mono tracking-wide max-w-2xl mx-auto flex items-center justify-center gap-2 bg-white/5 py-3 px-6 rounded-full border border-white/10">
                        <span className="text-cyan-400 font-bold"></span>
                        Harga dan estimasi waktu dapat berubah sewaktu-waktu tergantung tingkat kesulitan.
                    </p>
                </motion.div>
            </div>
        </section>
    );
}
