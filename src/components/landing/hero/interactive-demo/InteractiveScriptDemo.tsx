"use client";
import { useState } from "react"
import { motion } from "framer-motion"
import LightingEffectsPanel from "./LightingEffectsPanel"
import AnimationSpeedPanel from "./AnimationSpeedPanel"

export default function InteractiveScriptDemo() {
    const [speed, setSpeed] = useState(45)
    const [activeEffect, setActiveEffect] = useState("Rainbow")

    return (
        <div className="hidden lg:flex items-center justify-center w-full lg:w-1/2 lg:-mr-20 relative mt-15">
            <div className="absolute inset-0 bg-accent/20 blur-[120px] rounded-full scale-[1.2] transform -translate-y-4 opacity-50 pointer-events-none" />

            <div className="max-w-[600px] flex items-center justify-center relative z-10 w-full h-full">

                <motion.div
                    animate={{ y: [-5, 5, -5], rotate: [-2, 2, -2] }}
                    transition={{ repeat: Infinity, duration: 10, ease: "easeInOut" }}
                    className="absolute top-[-35%] left-[-5%] z-9"
                >
                    <LightingEffectsPanel activeEffect={activeEffect} setActiveEffect={setActiveEffect} />
                </motion.div>

                <motion.div
                    animate={{ y: [-2, 2, -2] }}
                    transition={{
                        repeat: Infinity,
                        duration: 10,
                        ease: "easeInOut"
                    }}
                    className="relative z-10 w-full pointer-events-none"
                >
                    <img
                        src="https://docs.fivem.net/vehicles/cheetah3.webp"
                        alt="FiveM Vehicle Showcase"
                        className="w-full scale-95 h-auto drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)] transition-transform duration-500 saturate-[125%]"
                    />
                </motion.div>

                <motion.div
                    animate={{ y: [-4, 4, -4], x: [2, -2, 2], rotate: [-2, 2, -2] }}
                    transition={{ repeat: Infinity, duration: 12, ease: "easeInOut", delay: 1 }}
                    className="absolute bottom-[5%] -right-[10%] z-11"
                >
                    <AnimationSpeedPanel speed={speed} setSpeed={setSpeed} />
                </motion.div>

                <motion.div
                    animate={{ rotate: [-2, 2, -2], y: [-2, 2, -2] }}
                    transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
                    className="absolute bottom-[-5%] left-[-30%] flex flex-col items-center z-30 text-brand-light"
                >
                    <p className="font-caveat text-[1.75rem] tracking-wider leading-none drop-shadow-md -rotate-[5deg] transition-transform duration-200">
                        script <br />coming soon!
                    </p>
                    <svg width="50" height="50" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="opacity-80 ml-40 -mt-4 -scale-y-100 -rotate-40 pointer-events-none">
                        <path d="M 20 80 C 20 40 40 20 80 20" />
                        <path d="M 60 10 L 80 20 L 70 40" />
                    </svg>
                </motion.div>

            </div>
        </div>
    )
}
