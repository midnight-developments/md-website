"use client";

import { useEffect, useRef, memo } from "react";

interface Particle {
    x: number;
    y: number;
    vx: number;
    vy: number;
    size: number;
    opacity: number;
}

const Starfield = memo(function Starfield() {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let animationFrameId: number;
        let width = (canvas.width = window.innerWidth);
        let height = (canvas.height = window.innerHeight);

        const PARTICLE_COUNT = 80;
        const particles: Particle[] = [];

        for (let i = 0; i < PARTICLE_COUNT; i++) {
            particles.push({
                x: Math.random() * width,
                y: Math.random() * height,
                vx: (Math.random() - 0.5) * 0.6,
                vy: (Math.random() - 0.5) * 0.6,
                size: 0.5 + Math.random() * 1.0,
                opacity: 0.1 + Math.random() * 0.4,
            });
        }

        let targetParallaxX = 0;
        let targetParallaxY = 0;
        let currentParallaxX = 0;
        let currentParallaxY = 0;

        const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

        const handleMouseMove = (e: MouseEvent) => {
            const centerX = window.innerWidth / 2;
            const centerY = window.innerHeight / 2;
            targetParallaxX = ((e.clientX - centerX) / centerX) * 35;
            targetParallaxY = ((e.clientY - centerY) / centerY) * 35;
        };

        const handleResize = () => {
            if (!canvas) return;
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
            if (prefersReducedMotion) {
                render();
            }
        };

        if (!prefersReducedMotion) {
            window.addEventListener("mousemove", handleMouseMove, { passive: true });
        }
        window.addEventListener("resize", handleResize);

        const render = () => {
            // Smooth parallax interpolation
            currentParallaxX += (targetParallaxX - currentParallaxX) * 0.05;
            currentParallaxY += (targetParallaxY - currentParallaxY) * 0.05;

            ctx.clearRect(0, 0, width, height);

            for (let i = 0; i < PARTICLE_COUNT; i++) {
                const p = particles[i];

                if (!prefersReducedMotion) {
                    p.x += p.vx;
                    p.y += p.vy;

                    // Wrap around edges
                    if (p.x < 0) p.x = width;
                    if (p.x > width) p.x = 0;
                    if (p.y < 0) p.y = height;
                    if (p.y > height) p.y = 0;
                }

                // Position with parallax offset
                const drawX = p.x + currentParallaxX;
                const drawY = p.y + currentParallaxY;

                ctx.beginPath();
                ctx.arc(drawX, drawY, p.size, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(255, 255, 255, ${p.opacity})`;
                ctx.fill();
            }

            if (!prefersReducedMotion && !document.hidden) {
                animationFrameId = requestAnimationFrame(render);
            }
        };

        render();

        const handleVisibilityChange = () => {
            if (document.hidden) {
                cancelAnimationFrame(animationFrameId);
            } else if (!prefersReducedMotion) {
                animationFrameId = requestAnimationFrame(render);
            }
        };
        document.addEventListener("visibilitychange", handleVisibilityChange);

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("resize", handleResize);
            document.removeEventListener("visibilitychange", handleVisibilityChange);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden">
            <canvas
                ref={canvasRef}
                className="w-full h-full block"
            />
        </div>
    );
});

export default Starfield;

