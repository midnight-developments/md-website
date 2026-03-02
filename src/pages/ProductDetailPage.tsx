import { useParams, Link } from "react-router"
import { ShoppingCart, BookOpen, ChevronRight, Home } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useAuth } from "@/context/AuthContext"
import { useCart } from "@/context/CartContext"
import { getProductBySlug } from "@/data/products"
import { useState } from "react"

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
                        <Link to="/scripts">Back to Scripts</Link>
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

    // Mock thumbnails (just numbered placeholders)
    const thumbnails = [0, 1, 2, 3]

    return (
        <div className="max-w-screen-2xl mx-auto px-6 lg:px-12 pt-12">
            {/* Breadcrumbs */}
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
                <Link to="/" className="hover:text-primary-foreground transition-colors flex items-center gap-1">
                    <Home className="h-3.5 w-3.5" /> Home
                </Link>
                <ChevronRight className="h-3 w-3" />
                <Link to={categoryPath} className="hover:text-primary-foreground transition-colors">
                    {categoryLabel}
                </Link>
                <ChevronRight className="h-3 w-3" />
                <span className="text-primary-foreground">{product.name}</span>
            </div>

            {/* Top Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Left: Image Gallery */}
                <div>
                    {/* Main Image */}
                    <div className="aspect-video bg-white/[0.03] border-2 border-border rounded-xl flex items-center justify-center text-muted-foreground mb-3">
                        <span className="text-sm opacity-40 tracking-widest uppercase">
                            Preview Image {selectedImage + 1}
                        </span>
                    </div>

                    {/* Thumbnails */}
                    <div className="flex gap-2">
                        {thumbnails.map((i) => (
                            <button
                                key={i}
                                onClick={() => setSelectedImage(i)}
                                className={`flex-1 aspect-video rounded-lg border-2 transition-colors flex items-center justify-center text-xs text-muted-foreground cursor-pointer ${selectedImage === i
                                    ? "border-accent bg-accent/5"
                                    : "border-border bg-white/[0.02] hover:border-white/15"
                                    }`}
                            >
                                {i + 1}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Right: Product Info */}
                <div className="flex flex-col gap-4">
                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5">
                        {product.tags.map((tag) => (
                            <Badge
                                key={tag}
                                size="sm"
                                variant={tag.toLowerCase() as any}
                            >
                                {tag.toUpperCase()}
                            </Badge>
                        ))}
                    </div>

                    {/* Name */}
                    <h1 className="text-3xl sm:text-4xl font-bold">{product.name}</h1>

                    {/* Price */}
                    <p className="text-2xl font-bold text-accent">${product.price.toFixed(2)}</p>

                    {/* Actions */}
                    <div className="flex flex-wrap gap-3">
                        <Button variant="primary" size="lg" onClick={handleAddToCart}>
                            <ShoppingCart className="h-4 w-4" />
                            Add to Cart
                        </Button>
                        <Button variant="outline" size="lg">
                            <BookOpen className="h-4 w-4" />
                            Documentation
                        </Button>
                    </div>

                    {/* Requirements */}
                    {product.requirements.length > 0 && (
                        <div>
                            <p className="text-sm font-semibold text-primary-foreground mb-2">Requirements</p>
                            <div className="flex flex-wrap gap-2">
                                {product.requirements.map((req) => (
                                    <Badge key={req} variant="outline" >
                                        {req}
                                    </Badge>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Description */}
                    <div className="border-t-2 border-border pt-4">
                        <p className="text-sm text-muted-foreground leading-relaxed">{product.description}</p>
                    </div>
                </div>
            </div>

            {/* Bottom: Feature Rows */}
            {product.features.length > 0 && (
                <div className="mt-20 space-y-16">
                    <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8">Features</h2>
                    {product.features.map((feature, i) => {
                        const isImageLeft = i % 2 === 0
                        return (
                            <div
                                key={feature.title}
                                className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center"
                            >
                                {/* Image placeholder */}
                                <div
                                    className={`aspect-video bg-white/[0.03] border-2 border-border rounded-xl flex items-center justify-center text-muted-foreground ${!isImageLeft ? "lg:order-2" : ""
                                        }`}
                                >
                                    <span className="text-sm opacity-40 tracking-widest uppercase">Feature Image</span>
                                </div>

                                {/* Text */}
                                <div className={!isImageLeft ? "lg:order-1" : ""}>
                                    <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                                    <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                                </div>
                            </div>
                        )
                    })}
                </div>
            )}
        </div>
    )
}
