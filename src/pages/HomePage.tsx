import { Link } from "react-router"
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

export default function HomePage() {
    return (
        <div className="max-w-screen-2xl mx-auto px-4 lg:px-12 pt-10 lg:pt-24">
            {/* Hero Section */}
            <section className="flex flex-col gap-16 items-center justify-center">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    {/* Left */}
                    <div className="flex flex-col gap-6">
                        <h1 className=" text-5xl lg:text-6xl font-bold leading-14 lg:leading-17">
                            Where Premium Scripts Meet{" "}
                            <span
                                className="text-transparent bg-clip-text bg-[image:var(--background-image-accent-gradient)]"
                                style={{ filter: "drop-shadow(0 0 24px color-mix(in srgb, var(--brand-base), transparent 70%))" }}
                            >
                                Flawless Aesthetics
                            </span>
                        </h1>

                        <p className="text-lg text-secondary-foreground max-w-xl">
                            Midnight Dev offers premium FiveM scripts built around modern UI design,
                            reliable functionality and seamless integration for QBCore, QBox and ESX.
                        </p>

                        <div className="flex flex-wrap gap-4 mt-4  ">
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
                        </div>
                    </div>

                    <div className="hidden lg:flex items-center justify-center">
                        <div className="w-full h-80 border-2 border-dashed border-border rounded-xl flex items-center justify-center text-muted-foreground text-sm">
                            <span className="opacity-40 tracking-widest uppercase text-xs">3D Visual Placeholder</span>
                        </div>
                    </div>
                </div>

                <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {features.map((feature) => (
                        <div
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
                        </div>
                    ))}
                </div>
            </section>

            <AccentSeparator />

            {/* Featured Products */}
            <section>
                <div className="flex flex-col gap-10 items-center justify-center">
                    <div className="text-center">
                        <Badge className="gap-2 px-4 py-1.5 mb-4">
                            <Sparkles className="h-3.5 w-3.5" />
                            Our most popular products
                        </Badge>
                        <h2 className="text-3xl sm:text-4xl font-bold">Featured Products</h2>
                    </div>

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

                    <div className="flex justify-center">
                        <Button variant="outline" asChild>
                            <Link to="/scripts">
                                View all products
                                <ArrowRight className="h-4 w-4" />
                            </Link>
                        </Button>
                    </div>
                </div>
            </section>
        </div>
    )
}
