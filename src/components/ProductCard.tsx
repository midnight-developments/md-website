import { ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useAuth } from "@/context/AuthContext"
import { useCart } from "@/context/CartContext"
import type { Product } from "@/data/products"
import { Link } from "react-router"
import { Label } from "./ui/label"

interface ProductCardProps {
    product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
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

    const detailPath = product.category === "bundle"
        ? `/bundles/${product.slug}`
        : `/scripts/${product.slug}`

    return (
        <div
            className="relative bg-card-bg border-2 border-card rounded-md overflow-hidden group hover:border-accent transition-colors duration-300"
        >
            {/* Image placeholder */}
            <Link to={detailPath}>
                <div className="aspect-video bg-white/[0.03] flex items-center justify-center text-muted-foreground text-sm cursor-pointer group-hover:bg-white/[0.05] transition-colors">
                    <span className="text-xs tracking-widest uppercase opacity-40">Preview Image</span>
                </div>
            </Link>

            {/* Info */}
            <div className="p-4.5 flex flex-col gap-2.5">


                <div className="flex flex-wrap gap-1.5 -ml-0.25">
                    {product.tags
                        .filter((tag) => ["QBCore", "QBox", "ESX", "Standalone"].includes(tag))
                        .map((tag) => (
                            <Badge
                                key={tag}
                                variant={tag.toLowerCase() as "qbcore" | "qbox" | "esx" | "standalone"}
                                size="sm"
                            >
                                {tag.toUpperCase()}
                            </Badge>
                        ))}
                </div>

                <div className="mb-2 flex flex-col gap-0.75 ">
                    <div className="flex items-center justify-between text-lg">
                        <Link to={detailPath} className="font-semibold text-primary-foreground uppercase transition-colorsp truncate">
                            {product.name}
                        </Link>
                        <Label variant="price">
                            ${product.price.toFixed(2)}
                        </Label>
                    </div>
                    <p className="text-[0.875rem] font-light text-muted-foreground max-w-2xs line-clamp-2 leading-[1.25]">
                        {product.shortDescription}
                    </p>
                </div>

                {/* Add to Cart */}
                <Button
                    variant="primary"
                    className="w-full"
                    onClick={handleAddToCart}
                >
                    <ShoppingCart className="h-4 w-4" />
                    Add to Cart
                </Button>
            </div>
        </div>
    )
}
