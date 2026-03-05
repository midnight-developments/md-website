import { useState, useEffect } from "react"
import { Link } from "react-router"
import { motion } from "framer-motion"
import { Sparkles, ArrowRight, Palette, RefreshCw, Puzzle, Headphones } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import ProductCard from "@/components/ProductCard"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
} from "@/components/ui/carousel"
import { featuredProducts } from "@/data/products"
import bg from "@/assets/bg.png"
import AccentSeparator from "@/components/ui/accent-seperator"
import discord from "@/assets/discord.svg"


const features = [
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

const containerVariants = {
    show: {
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.25
        },
    },
}

const itemVariants: any = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } },
}

export default function HomePage() {
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
        <div className="max-w-screen-2xl mx-auto px-6 lg:px-12 pt-10 lg:pt-24">
            <motion.section
                className="flex flex-col gap-16 items-center justify-center"
                initial="hidden"
                animate="show"
                variants={containerVariants}
            >
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
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
                                <Link to="/scripts">
                                    Explore Scripts
                                    <ArrowRight className="h-4 w-4" />
                                </Link>
                            </Button>
                            <Button variant="outline" asChild className="px-6! py-3! mt-[-0.05rem]!">
                                <a href="https://discord.gg/" target="_blank" rel="noopener noreferrer">
                                    <img src={discord} alt="Discord" className="h-5 w-5" />
                                    Join Discord
                                </a>
                            </Button>
                        </motion.div>
                    </div>

                    <motion.div variants={itemVariants} className="hidden lg:flex items-center justify-center">
                        <div className="w-full h-80 border-2 border-dashed border-border rounded-xl flex items-center justify-center text-muted-foreground text-sm">
                            <span className="opacity-40 tracking-widest uppercase text-xs">3D Visual Placeholder</span>
                        </div>
                    </motion.div>
                </div>

                <motion.div variants={containerVariants} className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {features.map((feature) => (
                        <motion.div
                            variants={itemVariants}
                            key={feature.title}
                            className="relative overflow-hidden flex gap-4 p-5 rounded-md bg-card-bg border-2 border-card hover:border-accent/20 transition-colors duration-300"
                        >
                            <div
                                className="absolute inset-0 pointer-events-none"
                                style={{
                                    backgroundImage: `url(${bg})`,
                                    backgroundSize: "cover",
                                    backgroundPosition: "center",
                                    backgroundRepeat: "no-repeat",
                                    opacity: 0.15,
                                    filter: "blur(30px)",
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
            </motion.section>

            <AccentSeparator className="my-24" />

            {/* Featured Products */}
            <motion.section
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-100px" }}
                variants={containerVariants}
            >
                <div className="flex flex-col gap-10 items-center justify-center">
                    <motion.div variants={itemVariants} className="text-center">
                        <Badge className="gap-2 px-4 py-1.5 mb-4">
                            <Sparkles className="h-3.5 w-3.5" />
                            Our most popular products
                        </Badge>
                        <h2 className="text-3xl sm:text-4xl font-bold">Featured Products</h2>
                    </motion.div>

                    <Carousel
                        opts={{ align: "start", loop: true }}
                        className="w-full"
                    >
                        <CarouselContent>
                            {featuredProducts.map((product) => (
                                <CarouselItem key={product.id} className="md:basis-1/2 lg:basis-1/3">
                                    <ProductCard product={product} />
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                    </Carousel>

                    <motion.div variants={itemVariants} className="flex justify-center">
                        <Button variant="outline" asChild>
                            <Link to="/scripts">
                                View all products
                                <ArrowRight className="h-4 w-4" />
                            </Link>
                        </Button>
                    </motion.div>
                </div>
            </motion.section>
        </div>
    )
}
