"use client";

import { useRef, useState } from "react";
import { motion, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";

interface ParallaxTiltProps {
    children: React.ReactNode;
    className?: string;
    tiltMaxX?: number;
    tiltMaxY?: number;
    scale?: number;
}

export default function ParallaxTilt({
    children,
    className,
    tiltMaxX = 15,
    tiltMaxY = 15,
    scale = 1.05,
}: ParallaxTiltProps) {
    const ref = useRef<HTMLDivElement>(null);
    const [glarePosition, setGlarePosition] = useState({ x: 50, y: 50 });

    const rotateX = useSpring(0, { stiffness: 400, damping: 30 });
    const rotateY = useSpring(0, { stiffness: 400, damping: 30 });
    const scaleValue = useSpring(1, { stiffness: 400, damping: 30 });
    const glareOpacity = useSpring(0, { stiffness: 400, damping: 30 });

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        rotateX.set(((mouseY - rect.height / 2) / rect.height) * -tiltMaxX);
        rotateY.set(((mouseX - rect.width / 2) / rect.width) * tiltMaxY);
        setGlarePosition({ x: (mouseX / rect.width) * 100, y: (mouseY / rect.height) * 100 });
    };

    const handleMouseEnter = () => {
        scaleValue.set(scale);
        glareOpacity.set(0.3);
    };

    const handleMouseLeave = () => {
        rotateX.set(0);
        rotateY.set(0);
        scaleValue.set(1);
        glareOpacity.set(0);
    };

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            style={{ perspective: 1000, rotateX, rotateY, scale: scaleValue, transformStyle: "preserve-3d" }}
            className={cn("relative", className)}
        >
            {children}
            <motion.div
                className="pointer-events-none absolute inset-0 rounded-[inherit]"
                style={{
                    opacity: glareOpacity,
                    background: `radial-gradient(circle at ${glarePosition.x}% ${glarePosition.y}%, rgba(255,255,255,0.4) 0%, transparent 60%)`,
                }}
            />
        </motion.div>
    );
}
