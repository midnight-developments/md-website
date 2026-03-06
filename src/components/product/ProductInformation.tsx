"use client";
import { ShoppingCart, BookOpen, Code, Server, Infinity, Folder } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useAuth } from "@/context/AuthContext"
import { useCart } from "@/context/CartContext"
import { Product } from "@/data/products"

export default function ProductInformation({ product }: { product: Product }) {
    const { isLoggedIn, isDiscordConnected } = useAuth()
    const { addItem, setDiscordModalOpen } = useCart()

    const handleAddToCart = () => {
        if (!isLoggedIn) return
        if (!isDiscordConnected) {
            setDiscordModalOpen(true)
            return
        }
        addItem(product)
    }

    return (
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
                    <h1 className="text-4xl sm:text-[2.825rem] font-semibold">{product.name}</h1>
                    <p className="text-3xl sm:text-[2rem] font-bold text-accent">${product.price.toFixed(2)}</p>
                </div>
            </div>

            <p className="text-[1.05rem] text-muted-foreground leading-normal">{product.description}</p>


            {product.requirements.length > 0 && (
                <div className="flex flex-col gap-2 mt-2">
                    <p className="uppercase tracking-wide text-muted-foreground text-sm font-bold ">REQUIREMENTS</p>
                    <div className="flex flex-wrap gap-2">
                        {product.requirements.map((req: any, index: number) => {
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
    )
}
