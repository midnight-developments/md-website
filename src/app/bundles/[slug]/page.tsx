"use client";
import Link from "next/link";
import { useParams } from "next/navigation"
import { ShoppingCart, BookOpen, ChevronRight, Home, Code, Server, Infinity, Folder, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useAuth } from "@/context/AuthContext"
import { useCart } from "@/context/CartContext"
import { getProductBySlug } from "@/data/products"
import { useState } from "react"
import AccentSeparator from "@/components/ui/accent-seperator"
import { motion } from "framer-motion"

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

export default function ProductDetailPage() {
    const { slug } = useParams<{ slug: string }>()
    const product = getProductBySlug(slug || "")
    const { isLoggedIn, isDiscordConnected } = useAuth()
    const { addItem, setDiscordModalOpen } = useCart()
    const [selectedImage, setSelectedImage] = useState(0)

    if (!product) {
        return (
            <div className="pt-24 pb-16 min-h-[60vh] flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-bold mb-2">Product Not Found</h1>
                    <p className="text-muted-foreground mb-6">The product you're looking for doesn't exist.</p>
                    <Button variant="outline" asChild>
                        <Link href="/scripts">Back to Scripts</Link>
                    </Button>
                </div>
            </div>
        )
    }

    const handleAddToCart = () => {
        if (!isLoggedIn) return
        if (!isDiscordConnected) {
            setDiscordModalOpen(true)
            return
        }
        addItem(product)
    }

    const categoryPath = product.category === "bundle" ? "/bundles" : "/scripts"
    const categoryLabel = product.category === "bundle" ? "Bundles" : "Scripts"

    const thumbnails = [0, 1, 2, 3]

    return (
        <div className="max-w-screen-2xl mx-auto px-6 lg:px-12 pt-12">


            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 ">
                <div className="flex flex-col gap-3">
                    <div className="aspect-video bg-white/[0.03] border-2 border-border rounded-md flex items-center justify-center text-muted-foreground">
                        <span className="text-sm opacity-40 tracking-widest uppercase">
                            Preview Image {selectedImage + 1}
                        </span>
                    </div>

                    <div className="flex gap-2">
                        {thumbnails.map((i) => (
                            <button
                                key={i}
                                onClick={() => setSelectedImage(i)}
                                className={`flex-1 aspect-video rounded-md border-2 transition-colors flex items-center justify-center text-xs text-muted-foreground cursor-pointer ${selectedImage === i
                                    ? "border-accent bg-accent/5"
                                    : "border-border bg-white/[0.02] hover:border-white/15"
                                    }`}
                            >
                                {i + 1}
                            </button>
                        ))}
                    </div>
                </div>

                <div className=" flex flex-col gap-4 relative">
                    <div className="flex flex-col gap-3">
                        <div className="flex flex-wrap gap-1.5">
                            {product.tags.map((tag) => (
                                <Badge
                                    key={tag}
                                    size="md"
                                    variant={tag.toLowerCase() as any}
                                >
                                    {tag.toUpperCase()}
                                </Badge>
                            ))}
                        </div>

                        <div className="flex flex-col gap-0.75">
                            <h1 className="text-4xl sm:text-[2.825rem] font-bold">{product.name}</h1>
                            <p className="text-3xl font-bold text-accent">${product.price.toFixed(2)}</p>
                        </div>
                    </div>

                    <p className="text-[1.05rem] text-muted-foreground leading-relaxed">{product.description}</p>


                    {product.requirements.length > 0 && (
                        <div className="flex flex-col gap-2 mt-2">
                            <p className="uppercase tracking-wide text-muted-foreground text-sm font-bold ">REQUIREMENTS</p>
                            <div className="flex flex-wrap gap-2">
                                {product.requirements.map((req, index) => {
                                    const getIcon = () => {
                                        switch (req.type) {
                                            case "framework": return <Code className="w-3.5 h-3.5 mr-1.5" />
                                            case "server_version": return <Server className="w-3.5 h-3.5 mr-1.5" />
                                            case "onesync": return <Infinity className="w-3.5 h-3.5 mr-1.5" />
                                            case "resource": return <Folder className="w-3.5 h-3.5 mr-1.5" />
                                        }
                                    }

                                    if (req.link) {
                                        return (
                                            <a
                                                key={index}
                                                href={req.link}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="group"
                                            >
                                                <Badge variant="outline" className="flex items-center group-hover:underline underline-offset-2">
                                                    {getIcon()}
                                                    {req.name}
                                                </Badge>
                                            </a>
                                        )
                                    }

                                    return (
                                        <Badge key={index} variant="outline" className="flex items-center">
                                            {getIcon()}
                                            {req.name}
                                        </Badge>
                                    )
                                })}
                            </div>
                        </div>
                    )}
                    <div className="flex flex-wrap gap-3 lg:absolute lg:bottom-0 lg:w-full mt-4 lg:mt-0">
                        <Button variant="primary" className="w-full py-3 text-lg gap-4 font-semibold" onClick={handleAddToCart}>
                            <ShoppingCart className="size-5!" strokeWidth={2.5} />
                            ADD TO CART
                        </Button>
                        <Button variant="outline" className="w-full py-3 text-lg gap-4 font-semibold" asChild>
                            <a href="https://midnight-dev.gitbook.io/midnight-dev/" target="_blank" rel="noopener noreferrer">
                                <BookOpen className="size-5!" />
                                DOCUMENTATION
                            </a>
                        </Button>
                    </div>
                </div>
            </div >

            <AccentSeparator className="mt-24 mb-20 " />

            <h2 className="text-3xl sm:text-4xl font-bold text-center mb-8">
                The Cool Stuff
            </h2>

            {
                product.features.length > 0 && (
                    <div className="flex flex-col gap-16">
                        {product.features.map((feature, i) => {
                            const isImageLeft = i % 2 === 0
                            return (
                                <motion.div
                                    initial="hidden"
                                    whileInView="show"
                                    viewport={{ once: true, margin: "-100px" }}
                                    variants={containerVariants}
                                    key={feature.title}
                                    className={`grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-10 lg:gap-14 items-center bg-white/5 p-6 md:p-8 rounded-xl ${isImageLeft ? "lg:pr-12" : "lg:pl-12"}`}
                                >
                                    <motion.div
                                        variants={itemVariants}
                                        className={`aspect-video bg-white/[0.03] border-2 border-border rounded-md flex items-center justify-center text-muted-foreground ${!isImageLeft ? "lg:order-2" : ""
                                            }`}
                                    >
                                        <span className="text-sm opacity-40 tracking-widest uppercase">Feature Image</span>
                                    </motion.div>

                                    {/* Text */}
                                    <motion.div variants={itemVariants} className={!isImageLeft ? "lg:order-1" : ""}>
                                        <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-3">{feature.title}</h3>
                                        <p className="text-xl text-muted-foreground leading-normal md:leading-relaxed">{feature.description}</p>
                                    </motion.div>
                                </motion.div>
                            )
                        })}
                    </div>
                )
            }
        </div >
    )
}
