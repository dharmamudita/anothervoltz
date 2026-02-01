"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import SplitType from "split-type";
import { cn } from "@/lib/utils";

interface AnimatedTextProps {
    text: string;
    className?: string;
    delay?: number;
    type?: "chars" | "words" | "lines";
    animation?: "fadeUp" | "fadeIn" | "blur" | "wave" | "bounce";
    stagger?: number;
    duration?: number;
}

export default function AnimatedText({
    text,
    className,
    delay = 0,
    type = "chars",
    animation = "fadeUp",
    stagger = 0.02,
    duration = 0.8,
}: AnimatedTextProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const splitRef = useRef<SplitType | null>(null);

    useEffect(() => {
        if (!containerRef.current) return;

        splitRef.current = new SplitType(containerRef.current, { types: type, tagName: "span" });
        const elements = splitRef.current[type] || [];

        gsap.set(elements, {
            opacity: 0,
            ...(animation === "fadeUp" && { y: 50 }),
            ...(animation === "blur" && { filter: "blur(10px)", y: 20 }),
            ...(animation === "wave" && { y: 30, rotateX: -90 }),
            ...(animation === "bounce" && { y: -100, opacity: 0 }),
        });

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        gsap.to(elements, {
                            opacity: 1,
                            y: 0,
                            x: 0,
                            filter: "blur(0px)",
                            rotateX: 0,
                            duration: animation === "bounce" ? 1.2 : duration,
                            stagger: stagger,
                            ease: animation === "bounce" ? "bounce.out" : "power4.out",
                            delay: delay,
                        });
                        observer.disconnect();
                    }
                });
            },
            { threshold: 0.1 }
        );

        observer.observe(containerRef.current);

        return () => {
            observer.disconnect();
            splitRef.current?.revert();
        };
    }, [text, type, animation, stagger, duration, delay]);

    return (
        <div ref={containerRef} className={cn("overflow-hidden", className)}>
            {text}
        </div>
    );
}
