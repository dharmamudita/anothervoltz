"use client";

import { motion } from "framer-motion";

export default function LoadingScreen() {
    return (
        <motion.div
            initial={{ y: 0 }}
            animate={{ y: "-100%" }}
            transition={{ duration: 0.8, delay: 2.8, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-[9999] bg-[#030014] flex items-center justify-center"
            style={{ pointerEvents: "none" }} // Ensure clicks create pass-through after visual exit
        >
            <div className="relative">
                <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="flex items-center gap-4"
                >
                    <motion.div
                        initial={{ rotate: -180, opacity: 0 }}
                        animate={{ rotate: 0, opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.2, ease: "backOut" }}
                        className="w-16 h-16 bg-gradient-to-br from-cyan-400 to-cyan-600 rounded-xl flex items-center justify-center text-black font-bold text-3xl shadow-[0_0_30px_rgba(6,182,212,0.5)]"
                    >
                        A
                    </motion.div>

                    <div className="overflow-hidden">
                        <motion.div
                            initial={{ x: -100, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ duration: 0.6, delay: 0.5, ease: "easeOut" }}
                        >
                            <span className="text-4xl font-bold font-mono tracking-tight text-white">
                                ANOTHER<span className="text-cyan-400">VOLTZ</span>
                            </span>
                        </motion.div>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1, opacity: 0 }}
                    transition={{
                        scaleX: { duration: 2, delay: 0.8, ease: "easeInOut" },
                        opacity: { duration: 0.3, delay: 2.5 }
                    }}
                    className="absolute -bottom-8 left-0 right-0 h-0.5 bg-gradient-to-r from-cyan-500 via-purple-500 to-cyan-500 origin-left"
                />
            </div>
        </motion.div>
    );
}
