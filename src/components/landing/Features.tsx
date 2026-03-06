"use client";
import { motion } from "framer-motion"
import { Palette, RefreshCw, Puzzle, Headphones } from "lucide-react"
import bg from "@/assets/bg.png"
import { itemVariants, containerVariants } from "../animation-variants"

const featuresData = [
    {
        icon: Palette,
        title: "Clean, Aesthetic Design",
        description: "We put a strong focus on delivering modern, sleek dark-themed UIs that feel both stylish and easy to use",
    },
    {
        icon: RefreshCw,
        title: "Free Updates Forever",
        description: "From tiny tweaks to major version overhauls, every update is free — giving you the best version forever",
    },
    {
        icon: Puzzle,
        title: "Modular Code",
        description: "We always provide open source functions to make integration with any other resource as easy asf",
    },
    {
        icon: Headphones,
        title: "Active Support",
        description: "Whether you're setting things up, running into issues, or looking for customization ideas, we gotchu",
    },
]

export default function Features() {
    return (
        <motion.div variants={containerVariants} className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
            {featuresData.map((feature) => (
                <motion.div
                    variants={itemVariants}
                    key={feature.title}
                    className="relative overflow-hidden flex gap-4 p-5 rounded-md bg-card-bg border-2 border-card hover:border-accent/20 transition-colors duration-300"
                >
                    <div
                        className="absolute inset-0 pointer-events-none"
                        style={{
                            backgroundImage: `url(${bg.src})`,
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                            backgroundRepeat: "no-repeat",
                            opacity: 0.8,
                            filter: "blur(80px) hue-rotate(45deg)",
                        }}
                    />
                    <div className="relative shrink-0 p-2.5 h-fit rounded-lg bg-accent/10">
                        <feature.icon className="h-10 w-10 text-accent" strokeWidth={1.5} />
                    </div>
                    <div className="relative">
                        <h4 className="font-semibold text-primary-foreground text-[0.95rem]">{feature.title}</h4>
                        <p className="text-[0.875rem] font-normal text-secondary-foreground mt-0.75 leading-[1.4]">{feature.description}</p>
                    </div>
                </motion.div>
            ))}
        </motion.div>
    )
}
