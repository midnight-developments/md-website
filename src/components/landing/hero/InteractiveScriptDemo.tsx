"use client";
import { useState } from "react"
import { motion } from "framer-motion"
import { Slider } from "@/components/ui/slider"
import Link from "next/link"

import bg from "@/assets/bg.png"
import Grain from "@/components/ui/grain"

const lightingEffects = [
    { id: "Rainbow", name: "Rainbow", desc: "Breathing", gradient: "from-red-500 via-yellow-400 to-purple-500", shadow: "shadow-[0_0_10px_rgba(236,72,153,0.4)]" },
    { id: "Police", name: "Police", desc: "Flashing", gradient: "from-red-500 to-blue-500", shadow: "shadow-[0_0_10px_rgba(59,130,246,0.4)]" },
    { id: "UFO", name: "UFO", desc: "Rotating", gradient: "from-green-400 to-emerald-600", shadow: "shadow-[0_0_10px_rgba(16,185,129,0.2)]" }
]

export default function InteractiveScriptDemo() {
    const [speed, setSpeed] = useState(45)
    const [activeEffect, setActiveEffect] = useState("Rainbow")

    return (
        <div className="hidden lg:flex items-center justify-center w-full lg:w-1/2 lg:-mr-20 relative mt-15">
            <div className="absolute inset-0 bg-accent/20 blur-[120px] rounded-full scale-[1.2] transform -translate-y-4 opacity-50 pointer-events-none" />

            <div className="max-w-[600px] flex items-center justify-center relative z-10 w-full h-full">

                {/* Panel Behind */}
                <motion.div
                    animate={{ y: [-5, 5, -5], rotate: [-2, 2, -2] }}
                    transition={{ repeat: Infinity, duration: 10, ease: "easeInOut" }}
                    className="absolute top-[-35%] left-[-5%] w-80 backdrop-blur-3xl bg-card-bg border border-border rounded-md z-9 shadow-2xl flex flex-col p-3 gap-3.25"
                >
                    <div
                        className="absolute inset-0 pointer-events-none"
                        style={{
                            backgroundImage: `url(${bg.src})`,
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                            backgroundRepeat: "no-repeat",
                            opacity: 0.6,
                            filter: "blur(60px) hue-rotate(45deg)",
                        }}
                    />
                    <Grain size="50px" opacity={0.075} />

                    <div className="relative flex items-center justify-between w-full">
                        <p className="font-medium text-foreground flex gap-2 items-center leading-none">
                            <span>Lighting Effect</span>
                        </p>
                    </div>
                    <div className="relative grid grid-cols-2 gap-1.5">
                        {lightingEffects.map((effect) => {
                            const isActive = activeEffect === effect.id;
                            return (
                                <button
                                    key={effect.id}
                                    type="button"
                                    onClick={() => setActiveEffect(effect.id)}
                                    className={`flex items-center gap-2 rounded border p-2 cursor-pointer transition-all duration-300 text-left ${isActive
                                        ? "bg-accent/10 border-2 border-accent/80 shadow-md shadow-accent/20"
                                        : "bg-white/5 border-border hover:bg-white/8"
                                        }`}
                                >
                                    <div className={`w-1 h-8 rounded-[1px] bg-gradient-to-b ${effect.gradient} ${effect.shadow}`} />
                                    <div className="flex flex-col gap-1">
                                        <p className="text-foreground text-sm leading-none">{effect.name}</p>
                                        <p className="text-muted-foreground text-xs leading-none">{effect.desc}</p>
                                    </div>
                                </button>
                            )
                        })}
                    </div>
                </motion.div>

                {/* Car Showcase */}
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

                {/* Active Interactive Speed Panel */}
                <motion.div
                    animate={{ y: [-4, 4, -4], x: [2, -2, 2], rotate: [-2, 2, -2] }}
                    transition={{ repeat: Infinity, duration: 12, ease: "easeInOut", delay: 1 }}
                    className="overflow-hidden absolute bottom-[5%] -right-[10%] w-80 backdrop-blur-3xl bg-card-bg border border-border rounded-md z-11 shadow-2xl flex flex-col p-3 pb-4 gap-3.25"
                >
                    <div
                        className="absolute inset-0 pointer-events-none"
                        style={{
                            backgroundImage: `url(${bg.src})`,
                            backgroundSize: "cover",
                            backgroundPosition: "top right",
                            backgroundRepeat: "no-repeat",
                            opacity: 0.5,
                            filter: "blur(60px) hue-rotate(45deg)",
                        }}
                    />
                    <Grain size="40px" opacity={0.1} />

                    <div className="relative flex items-center justify-between w-full">
                        <p className="font-medium text-foreground flex gap-0.5 items-center leading-none">
                            <span>Animation Speed</span>
                        </p>
                        <span className="font-bold rounded-xs text-foreground leading-none">
                            {speed}
                        </span>
                    </div>
                    <Slider value={[speed]} onValueChange={(v) => setSpeed(v[0])} max={100} step={1} />
                </motion.div>

                {/* Doodly Arrow CTA */}
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
