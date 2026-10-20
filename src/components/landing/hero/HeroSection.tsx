import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import discord from "@/assets/discord.svg"
import InteractiveScriptDemo from "./InteractiveScriptDemo"
import HeroTypewriter from "./HeroTypewriter"
import PromoBadge from "@/components/layout/PromoBadge"

export default function HeroSection() {
    return (
        <section className="flex flex-col lg:flex-row gap-8 pb-4 items-center w-full">
            <div className="flex flex-col gap-4 w-full lg:w-[50%]">
                <div>
                    <PromoBadge className="flex xl:hidden" />
                </div>

                <h1 className="text-5xl sm:text-6xl lg:text-[4.25rem] font-[700] leading-[1.025] tracking-tighter">
                    <span className="bg-gradient-to-r from-[rgba(212,214,231)] to-[rgb(161,157,172)] text-transparent bg-clip-text">
                        Premium Scripts
                    </span>{" "}
                    <HeroTypewriter text="Flawless Aesthetics" />
                </h1>

                <p className="text-lg text-secondary-foreground max-w-xl">
                    Midnight Dev offers premium FiveM scripts built around modern UI design,
                    reliable functionality and seamless integration for QBCore, QBox and ESX.
                </p>

                <div className="flex flex-wrap gap-4 mt-4">
                    <Button variant="primary" asChild className="px-6">
                        <Link href="/scripts">
                            Explore Scripts
                            <ArrowRight className="h-4 w-4" />
                        </Link>
                    </Button>
                    <Button variant="outline" asChild className="px-6">
                        <a href="https://discord.gg/midnightdev" target="_blank" rel="noopener noreferrer">
                            <img src={discord.src} alt="Discord" className="h-5 w-5" />
                            Join Discord
                        </a>
                    </Button>
                </div>
            </div>
            <InteractiveScriptDemo />
        </section>
    )
}
