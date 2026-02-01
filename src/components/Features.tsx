"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import AnimatedText from "./ui/AnimatedText";
import ParallaxTilt from "@/components/ui/ParallaxTilt";
import { FileText, Code2, GraduationCap, Smartphone, BarChart2, Globe } from "lucide-react";
import Modal from "./ui/Modal";

const services = [
    { title: "Tugas Kuliah", desc: "Makalah, Essay, Jurnal, PPT. Semua dikerjakan dengan standar akademik tinggi.", icon: FileText, gradient: "from-cyan-500 to-blue-600" },
    { title: "Skripsi & Thesis", desc: "Penelitian mendalam dan penulisan ilmiah dengan metodologi yang tepat.", icon: GraduationCap, gradient: "from-purple-500 to-pink-600" },
    { title: "Coding & Programming", desc: "Web app, mobile app, ML/AI, database. Menggunakan teknologi terkini.", icon: Code2, gradient: "from-emerald-500 to-teal-600" },
    { title: "Mobile Development", desc: "Aplikasi Android & iOS native atau cross-platform dengan Flutter & RN.", icon: Smartphone, gradient: "from-orange-500 to-red-600" },
    { title: "Data Analysis", desc: "SPSS, Excel, R, Python. Analisis statistik dan visualisasi data profesional.", icon: BarChart2, gradient: "from-yellow-500 to-amber-600" },
    { title: "Web Development", desc: "Website modern, responsif, dan SEO-friendly dengan stack terbaru.", icon: Globe, gradient: "from-indigo-500 to-violet-600" },
];

export default function Features() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });
    const [selectedService, setSelectedService] = React.useState<typeof services[0] | null>(null);

    return (
        <section id="services" className="relative py-32 md:py-40 bg-gradient-to-b from-[#030014] to-[#050520] overflow-hidden">
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(6,182,212,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(6,182,212,0.02)_1px,transparent_1px)] bg-[size:60px_60px]" />
                <div className="absolute top-1/4 -right-40 w-96 h-96 rounded-full bg-cyan-500/5 blur-3xl" />
                <div className="absolute bottom-1/4 -left-40 w-96 h-96 rounded-full bg-purple-500/5 blur-3xl" />
            </div>

            <div className="container mx-auto px-6 relative z-10" ref={ref}>
                <div className="text-center max-w-3xl mx-auto mb-20">
                    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }} className="flex items-center justify-center gap-3 mb-6">
                        <div className="h-px w-16 bg-gradient-to-r from-transparent to-cyan-500/50" />
                        <span className="px-4 py-1.5 bg-cyan-500/10 border border-cyan-500/20 rounded-full text-cyan-400 text-xs font-mono uppercase tracking-widest">Our Services</span>
                        <div className="h-px w-16 bg-gradient-to-l from-transparent to-cyan-500/50" />
                    </motion.div>
                    <AnimatedText text="CAPABILITIES" className="text-4xl md:text-5xl lg:text-6xl font-black font-space tracking-tighter text-white mb-6" type="chars" animation="fadeUp" />
                    <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }} viewport={{ once: true }} className="text-lg text-gray-400">
                        Upgrade nilai akademikmu dengan layanan premium kami. Dikerjakan oleh tim profesional berpengalaman.
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {services.map((service, idx) => (
                        <motion.div
                            key={service.title}
                            initial={{ opacity: 0, y: 50 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.5, delay: idx * 0.1 }}
                            onClick={() => setSelectedService(service)}
                            className="cursor-pointer"
                        >
                            <ParallaxTilt className="h-full">
                                <div className="group relative h-full p-8 bg-gradient-to-br from-[#0a0a0a]/80 to-[#141414]/80 backdrop-blur-xl border border-white/5 rounded-2xl hover:border-white/20 transition-all duration-500 overflow-hidden">
                                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-cyan-500/5 via-purple-500/5 to-pink-500/5" />
                                    <div className="relative z-10">
                                        <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${service.gradient} flex items-center justify-center mb-6 shadow-lg`}>
                                            <service.icon className="w-7 h-7 text-white" />
                                        </div>
                                        <h3 className="text-xl font-bold text-white mb-3 font-space flex items-center gap-2">
                                            {service.title}
                                            <span className="text-xs px-2 py-0.5 rounded-full bg-white/10 text-gray-400 group-hover:bg-cyan-500/20 group-hover:text-cyan-400 transition-colors">Details &rarr;</span>
                                        </h3>
                                        <p className="text-gray-400 text-sm leading-relaxed">{service.desc}</p>
                                    </div>
                                    <div className={`absolute -bottom-20 -right-20 w-40 h-40 rounded-full bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-20 blur-3xl transition-opacity duration-500`} />
                                </div>
                            </ParallaxTilt>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Modal */}
            <Modal isOpen={!!selectedService} onClose={() => setSelectedService(null)} title={selectedService?.title || ""}>
                <div className="space-y-4">
                    <p className="text-lg text-white font-medium">{selectedService?.desc}</p>
                    <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                        <h4 className="font-bold text-cyan-400 mb-2 uppercase text-xs tracking-widest">Why Choose Us?</h4>
                        <ul className="space-y-2">
                            {["Garansi Revisi", "Pengerjaan Cepat", "Kerahasiaan Terjamin", "Konsultasi Gratis"].map(item => (
                                <li key={item} className="flex items-center gap-2 text-sm">
                                    <div className="w-1.5 h-1.5 rounded-full bg-cyan-500" />
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <p className="text-sm">
                        Kami menggunakan tools dan metode terbaru untuk memastikan hasil {selectedService?.title} Anda maksimal. Tim kami terdiri dari praktisi yang ahli di bidang ini.
                    </p>
                    <button className="w-full py-3 mt-4 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg text-white font-bold tracking-wide hover:opacity-90 transition-opacity">
                        Order Now via WhatsApp
                    </button>
                </div>
            </Modal>
        </section>
    );
}
