"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Heart, Instagram, MessageCircle, Send, Mail } from "lucide-react";
import { useState } from "react";
import Modal from "./ui/Modal";

const footerContent: Record<string, { title: string; content: React.ReactNode }> = {
    // Services
    "Tugas Kuliah": {
        title: "Jasa Tugas Kuliah Premium",
        content: (
            <div className="space-y-4">
                <p>Solusi lengkap untuk segala jenis tugas akademik Anda. Mulai dari makalah, resume jurnal, PPT presentasi, hingga essay kritis.</p>
                <ul className="list-disc pl-5 space-y-2 text-sm text-gray-400">
                    <li>Pengerjaan cepat (bisa hitungan jam)</li>
                    <li>Referensi kredibel (Jurnal Internasional/Nasional)</li>
                    <li>Format penulisan rapi sesuai pedoman kampus</li>
                    <li>Garansi bebas plagiasi (Turnitin &lt; 20%)</li>
                </ul>
            </div>
        )
    },
    "Skripsi & Thesis": {
        title: "Bimbingan Skripsi & Thesis Eksklusif",
        content: (
            <div className="space-y-4">
                <p>Mitra strategis Anda dalam menaklukkan tugas akhir. Kami mendampingi dari penentuan judul hingga revisi pasca-sidang.</p>
                <div className="bg-white/5 p-4 rounded-lg">
                    <h4 className="text-cyan-400 font-bold text-sm mb-2">Cakupan Layanan:</h4>
                    <p className="text-sm text-gray-400">Proposal (Bab 1-3), Analisis Data (Bab 4), Pembahasan (Bab 5), hingga Pembuatan Program/Prototype pendukung.</p>
                </div>
            </div>
        )
    },
    "Web Development": {
        title: "Pembuatan Website Profesional",
        content: (
            <div className="space-y-4">
                <p>Jasa pembuatan website modern untuk kebutuhan tugas akhir atau portofolio pribadi. Menggunakan teknologi terbaru seperti React, Next.js, dan Tailwind CSS.</p>
                <p className="text-sm text-gray-400">Fitur: Responsif di semua device, Desain UI/UX Premium, SEO Friendly, dan Integrasi Database.</p>
            </div>
        )
    },
    "Mobile Apps": {
        title: "Pengembangan Aplikasi Mobile",
        content: (
            <div className="space-y-4">
                <p>Realisasikan ide aplikasi Android/iOS Anda. Cocok untuk Skripsi Teknik Informatika atau Sistem Informasi.</p>
                <p className="text-sm text-gray-400">Tech Stack: Flutter, React Native, atau Kotlin. Termasuk source code lengkap dan panduan instalasi.</p>
            </div>
        )
    },
    "Data Analysis": {
        title: "Analisis Statistik & Data",
        content: (
            <div className="space-y-4">
                <p>Bantuan pengolahan data statistik menggunakan SPSS, SmartPLS, EViews, atau Python/R. Hasil akurat dan interpretasi mudah dipahami.</p>
                <p className="text-sm text-gray-400">Kami bantu cara membaca hasil olah data agar Anda siap menghadapi pertanyaan dosen penguji.</p>
            </div>
        )
    },

    // Company
    "About Us": {
        title: "Tentang All In Joki / Another Voltz",
        content: (
            <div className="space-y-4">
                <p>Berdiri sejak 2019, kami adalah platform edukasi dan asistensi akademik nomor 1 di Indonesia. Misi kami adalah membantu mahasiswa mencapai potensi terbaik mereka tanpa terbebani teknis pengerjaan yang rumit.</p>
                <p className="text-sm text-gray-400">Didukung oleh 50+ tim ahli dari lulusan universitas ternama.</p>
            </div>
        )
    },
    "Pricing": {
        title: "Transparansi Harga",
        content: (
            <div className="space-y-4">
                <p>Harga kami dinamis menyesuaikan tingkat kesulitan, deadline, dan jenjang pendidikan. Tidak ada biaya tersembunyi.</p>
                <p className="text-sm text-gray-400">Konsultasikan kebutuhan Anda via WhatsApp sekarang untuk mendapatkan penawaran harga terbaik (Quote).</p>
            </div>
        )
    },
    "Testimonials": {
        title: "Kata Mereka",
        content: (
            <div className="space-y-4">
                <p>Lebih dari 1500 project terselesaikan dengan rating kepuasan rata-rata 4.9/5. Kepercayaan klien adalah aset utama kami.</p>
            </div>
        )
    },
    "FAQ": {
        title: "Frequently Asked Questions",
        content: (
            <ul className="space-y-4 text-sm">
                <li>
                    <strong>Q: Apakah data saya aman?</strong><br />
                    <span className="text-gray-400">A: 100% Aman. Kami menerapkan sistem enkripsi dan kerahasiaan ketat. Identitas klien tidak pernah dipublikasikan.</span>
                </li>
                <li>
                    <strong>Q: Bagaimana jika ada revisi?</strong><br />
                    <span className="text-gray-400">A: Kami memberikan garansi revisi sesuai paket yang diambil. Kepuasan Anda adalah prioritas.</span>
                </li>
            </ul>
        )
    },
    "Contact": {
        title: "Hubungi Kami",
        content: (
            <div className="space-y-4">
                <p>Siap untuk memulai project atau sekadar tanya-tanya? Tim admin kami online 24/7.</p>
                <div className="flex gap-4 items-center justify-center py-4">
                    <a href="https://wa.me/628973207214" target="_blank" rel="noopener noreferrer" className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-full font-bold transition-colors inline-block">WhatsApp</a>
                    <a href="https://t.me/anothervolt" target="_blank" rel="noopener noreferrer" className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-full font-bold transition-colors inline-block">Telegram</a>
                </div>
            </div>
        )
    },

    // Legal
    "Privacy": {
        title: "Privacy Policy",
        content: (
            <div className="text-sm space-y-4">
                <p className="text-xs uppercase tracking-widest text-cyan-400 font-bold mb-2">LAST UPDATED: OCTOBER 2024</p>
                <p>Di Another Voltz, kami sangat menghargai privasi Anda. Dokumen ini menjelaskan bagaimana kami mengumpulkan, menggunakan, dan melindungi informasi pribadi Anda.</p>
                <h4 className="font-bold text-white">1. Pengumpulan Data</h4>
                <p className="text-gray-400">Kami hanya mengumpulkan data yang diperlukan untuk pengerjaan tugas (seperti bahan materi, panduan tugas). Data pribadi (Nama, Kampus) hanya digunakan untuk keperluan komunikasi internal.</p>
                <h4 className="font-bold text-white">2. Keamanan Data</h4>
                <p className="text-gray-400">Semua file tugas dan data klien disimpan dalam server terenkripsi dan akan dihapus secara berkala setelah project selesai dan masa garansi habis.</p>
                <h4 className="font-bold text-white">3. Non-Disclosure</h4>
                <p className="text-gray-400">Kami menjamin TIDAK AKAN PERNAH membagikan data atau hasil tugas Anda kepada pihak ketiga manapun, termasuk dosen atau institusi pendidikan.</p>
            </div>
        )
    },
    "Terms": {
        title: "Terms of Service",
        content: (
            <div className="text-sm space-y-4">
                <p className="text-xs uppercase tracking-widest text-cyan-400 font-bold mb-2">SYARAT & KETENTUAN PENGGUNAAN</p>
                <p>Dengan menggunakan layanan Another Voltz, Anda menyetujui ketentuan berikut:</p>
                <ul className="list-decimal pl-5 space-y-2 text-gray-400">
                    <li>Pembayaran DP minimal 50% wajib dilakukan sebelum pengerjaan dimulai.</li>
                    <li>Pelunasan wajib dilakukan sebelum file hasil akhir dikirimkan (kami akan mengirimkan preview/bukti pengerjaan terlebih dahulu).</li>
                    <li>Revisi berlaku untuk materi yang sudah disepakati di awal. Penambahan fitur/bab baru di tengah jalan akan dikenakan biaya tambahan.</li>
                    <li>Kami tidak bertanggung jawab atas penggunaan hasil pengerjaan di luar konteks akademik atau pelanggaran kode etik institusi Anda. Layanan ini dimaksudkan sebagai referensi dan bimbingan belajar.</li>
                    <li>Refund hanya dapat dilakukan jika kami gagal menyelesaikan tugas sesuai deadline yang disepakati (S&K berlaku).</li>
                </ul>
            </div>
        )
    }
};

export default function Footer() {
    const [email, setEmail] = useState("");
    const [subscribeStatus, setSubscribeStatus] = useState<"idle" | "loading" | "success">("idle");
    const [selectedItem, setSelectedItem] = useState<string | null>(null);

    const handleItemClick = (key: string) => {
        setSelectedItem(key);
    };

    const socialLinks = [
        { icon: Instagram, href: "https://www.instagram.com/anothervoltz" },
        { icon: MessageCircle, href: "https://wa.me/628973207214" },
        { icon: Send, href: "https://t.me/anothervolt" },
        { icon: Mail, href: "https://mail.google.com/mail/?view=cm&fs=1&to=anothervoltz@gmail.com" },
    ];

    const handleSubscribe = (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) return;

        setSubscribeStatus("loading");

        // Simulate API call
        setTimeout(() => {
            setSubscribeStatus("success");
            setEmail("");

            // Reset status after 3 seconds
            setTimeout(() => setSubscribeStatus("idle"), 3000);
        }, 1500);
    };

    return (
        <footer className="relative bg-[#020010] pt-20 pb-10 overflow-hidden">
            {/* ... (backgrounds remain same) ... */}
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent" />
            <div className="absolute -top-40 -right-40 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-cyan-600/10 rounded-full blur-3xl pointer-events-none" />

            <div className="container mx-auto px-6 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
                    {/* ... (Brand, Services, Company sections remain same) ... */}

                    {/* Brand */}
                    <div className="space-y-6">
                        <Link href="/" className="flex items-center gap-3 mb-6">
                            <motion.div whileHover={{ rotate: 180 }} transition={{ duration: 0.5 }} className="w-12 h-12 bg-gradient-to-br from-cyan-400 to-cyan-600 rounded-xl flex items-center justify-center text-black font-bold text-2xl shadow-[0_0_30px_rgba(6,182,212,0.4)]">A</motion.div>
                            <div>
                                <span className="text-2xl font-bold font-space tracking-tight">ANOTHER <span className="gradient-text">VOLTZ</span></span>
                                <p className="text-xs text-gray-500 font-mono">Premium Academic Services</p>
                            </div>
                        </Link>
                        <p className="text-gray-400 text-sm leading-relaxed">
                            Platform joki tugas akademik #1 dengan standar kualitas premium. Menggabungkan keahlian profesional dengan teknologi modern.
                        </p>
                        <div className="flex gap-4">
                            {socialLinks.map((social, idx) => (
                                <motion.a
                                    key={idx}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    whileHover={{ y: -3, color: "#22d3ee" }}
                                    className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center text-gray-400 border border-white/10 hover:border-cyan-500/50 transition-colors"
                                >
                                    <social.icon size={18} />
                                </motion.a>
                            ))}
                        </div>
                    </div>

                    {/* Links Column 1: Services */}
                    <div>
                        <h4 className="text-white font-bold font-space mb-6">Services</h4>
                        <ul className="space-y-4 text-sm text-gray-400">
                            {["Tugas Kuliah", "Skripsi & Thesis", "Web Development", "Mobile Apps", "Data Analysis"].map((item) => (
                                <li key={item}>
                                    <button onClick={() => handleItemClick(item)} className="hover:text-cyan-400 transition-colors text-left w-full">
                                        {item}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Links Column 2: Company */}
                    <div>
                        <h4 className="text-white font-bold font-space mb-6">Company</h4>
                        <ul className="space-y-4 text-sm text-gray-400">
                            {["About Us", "Pricing", "Testimonials", "FAQ", "Contact"].map((item) => (
                                <li key={item}>
                                    <button onClick={() => handleItemClick(item)} className="hover:text-cyan-400 transition-colors text-left w-full">
                                        {item}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Links Column 3: Newsletter */}
                    <div>
                        <h4 className="text-white font-bold font-space mb-6">Stay Updated</h4>
                        <p className="text-sm text-gray-400 mb-4">Dapatkan promo khusus dan tips akademik langsung ke inbox Anda.</p>
                        <form onSubmit={handleSubscribe} className="flex bg-white/5 rounded-lg border border-white/10 p-1 relative overflow-hidden">
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter your email"
                                className="bg-transparent w-full px-4 py-2 text-sm text-white outline-none placeholder:text-gray-600"
                                required
                            />
                            <button
                                type="submit"
                                disabled={subscribeStatus === "loading" || subscribeStatus === "success"}
                                className={`p-2 rounded-md transition-all duration-300 ${subscribeStatus === 'success' ? 'bg-green-500 text-white' : 'bg-cyan-500 hover:bg-cyan-600 text-black'}`}
                            >
                                {subscribeStatus === "loading" ? (
                                    <div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                                ) : subscribeStatus === "success" ? (
                                    <span className="font-bold text-xs">OK</span>
                                ) : (
                                    <Send size={16} />
                                )}
                            </button>
                        </form>
                        {subscribeStatus === "success" && (
                            <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-green-400 text-xs mt-2">
                                Terima kasih! Anda telah terdaftar.
                            </motion.p>
                        )}
                    </div>
                </div>

                <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
                    <p className="flex items-center gap-2">© 2024 Another Voltz. Made in Indonesia</p>
                    <div className="flex gap-6">
                        {["Privacy", "Terms"].map(item => (
                            <button key={item} onClick={() => handleItemClick(item)} className="hover:text-white transition-colors">
                                {item}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Content Modal */}
            <Modal
                isOpen={!!selectedItem}
                onClose={() => setSelectedItem(null)}
                title={selectedItem && footerContent[selectedItem] ? footerContent[selectedItem].title : ""}
            >
                {selectedItem && footerContent[selectedItem] ? footerContent[selectedItem].content : null}
            </Modal>
        </footer>
    );
}
