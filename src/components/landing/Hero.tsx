"use client";
import { useState, useEffect } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import discord from "@/assets/discord.svg"
import { containerVariants, itemVariants } from "../animation-variants"
import VisualPlaceholder from "./VisualPlaceholder"
import Features from "./Features"


export default function Hero() {
    const [typedText, setTypedText] = useState("")
    const [showCursor, setShowCursor] = useState(true)
    const fullText = "Flawless Aesthetics"

    useEffect(() => {
        let i = 0
        let typingTimeout: ReturnType<typeof setTimeout>

        const typeNextLetter = () => {
            setTypedText(fullText.slice(0, i + 1))
            i++

            if (i < fullText.length) {
                const delay = Math.floor(Math.random() * (100 - 60 + 1)) + 60
                typingTimeout = setTimeout(typeNextLetter, delay)
            } else {
                typingTimeout = setTimeout(() => setShowCursor(false), 1500)
            }
        }

        const initialTimeout = setTimeout(typeNextLetter, 1250)

        return () => {
            clearTimeout(initialTimeout)
            clearTimeout(typingTimeout)
        }
    }, [])

    return (
        <motion.section
            className="flex flex-col gap-16 items-center justify-center"
            initial="hidden"
            animate="show"
            variants={containerVariants}
        >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center w-full">
                <div className="flex flex-col gap-4">
                    <motion.h1 variants={itemVariants} className=" text-5xl lg:text-6xl font-bold leading-14 lg:leading-17">
                        Where Premium Scripts Meet{" "}
                        <span className="relative inline-block">
                            <span className="opacity-0">{fullText}</span>
                            <span
                                className="absolute inset-0 z-10 text-transparent bg-clip-text bg-accent-gradient text-shadow-accent/40 whitespace-nowrap"
                            >
                                {typedText}
                            </span>
                            <span className="absolute inset-0 z-20 whitespace-nowrap text-transparent pointer-events-none">
                                {typedText}
                                {showCursor && (
                                    <motion.span
                                        className="inline-block relative w-[4px] h-[0.8em] bg-accent ml-1 align-middle -mt-1.5"
                                        animate={{ opacity: [1, 0, 1] }}
                                        transition={{ repeat: Infinity, duration: 0.8 }}
                                    />
                                )}
                            </span>
                        </span>
                    </motion.h1>

                    <motion.p variants={itemVariants} className="text-lg text-secondary-foreground max-w-xl">
                        Midnight Dev offers premium FiveM scripts built around modern UI design,
                        reliable functionality and seamless integration for QBCore, QBox and ESX.
                    </motion.p>

                    <motion.div variants={itemVariants} className="flex flex-wrap gap-4 mt-4  ">
                        <Button variant="primary" asChild className="px-6! py-3!">
                            <Link href="/scripts">
                                Explore Scripts
                                <ArrowRight className="h-4 w-4" />
                            </Link>
                        </Button>
                        <Button variant="outline" asChild className="px-6! py-3! mt-[-0.05rem]!">
                            <a href="https://discord.gg/" target="_blank" rel="noopener noreferrer">
                                <img src={discord.src} alt="Discord" className="h-5 w-5" />
                                Join Discord
                            </a>
                        </Button>
                    </motion.div>
                </div>
                <VisualPlaceholder />
            </div>
            <Features />
        </motion.section>
    )
}
