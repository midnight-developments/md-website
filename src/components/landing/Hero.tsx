"use client";
import { useState, useEffect } from "react"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import discord from "@/assets/discord.svg"
import VisualPlaceholder from "./VisualPlaceholder"
import Features from "./Features"
import PromoBadge from "@/components/layout/PromoBadge"

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
        <section className="flex flex-col gap-22 items-center justify-center">
            <div className="flex flex-col lg:flex-row gap-8 items-center w-full">
                <div className="flex flex-col gap-4 w-full lg:w-[55%]">
                    <div>
                        <PromoBadge className="flex xl:hidden" />
                    </div>

                    <h1 className="text-5xl sm:text-6xl lg:text-6xl font-[650] leading-[1.025] tracking-tight">
                        <span className="bg-gradient-to-r from-white to-white/90 text-transparent bg-clip-text">Where Premium Scripts Meet</span>{" "}
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
                                    <span
                                        className="inline-block relative w-[4px] h-[0.8em] bg-accent ml-1 align-middle -mt-1.5 animate-pulse"
                                    />
                                )}
                            </span>
                        </span>
                    </h1>

                    <p className="text-lg text-secondary-foreground max-w-xl">
                        Midnight Dev offers premium FiveM scripts built around modern UI design,
                        reliable functionality and seamless integration for QBCore, QBox and ESX.
                    </p>

                    <div className="flex flex-wrap gap-4 mt-4">
                        <Button variant="primary" asChild className="px-6! py-2.5!">
                            <Link href="/scripts">
                                Explore Scripts
                                <ArrowRight className="h-4 w-4" />
                            </Link>
                        </Button>
                        <Button variant="outline" asChild className="px-6! py-2.5! mt-[-0.05rem]!">
                            <a href="https://discord.gg/midnightdev" target="_blank" rel="noopener noreferrer">
                                <img src={discord.src} alt="Discord" className="h-5 w-5" />
                                Join Discord
                            </a>
                        </Button>
                    </div>
                </div>
                <VisualPlaceholder />
            </div>
            <Features />
        </section>
    )
}
