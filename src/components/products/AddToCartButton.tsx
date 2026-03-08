"use client";
import { useState } from "react"
import { ShoppingCart, Loader2, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/context/AuthContext"
import { useCart } from "@/context/CartContext"
import { Product } from "@/services/tebex/products"
import { cn } from "@/lib/utils"

interface AddToCartButtonProps {
    product: Product
    className?: string
    showIcon?: boolean
}

export default function AddToCartButton({ product, className, showIcon = true }: AddToCartButtonProps) {
    const { isLoggedIn, isDiscordConnected, setDiscordModalOpen } = useAuth()
    const { addItem, basket } = useCart()
    const [isAdding, setIsAdding] = useState(false)

    const isInCart = basket?.packages?.some((p: any) => p.id === product.id)

    const handleAddToCart = async (e: React.MouseEvent) => {
        e.preventDefault()
        e.stopPropagation()

        if (!isLoggedIn) return

        setIsAdding(true)
        await addItem(product.id)
        setIsAdding(false)
    }

    return (
        <Button
            variant="primary"
            className={cn(
                "w-full transition-all duration-300",
                (!isLoggedIn || isInCart) && "opacity-50 cursor-not-allowed",
                className
            )}
            onClick={handleAddToCart}
            disabled={!isLoggedIn || isAdding || isInCart}
        >
            {isAdding ? (
                <Loader2 className="size-4.5 animate-spin" />
            ) : isInCart ? (
                <Check className="size-4.5" />
            ) : showIcon ? (
                <ShoppingCart className="size-4.5" />
            ) : null}

            {isLoggedIn
                ? (isAdding ? "Adding..." : isInCart ? "Item In Cart" : "Add to Cart")
                : "Login to Add"
            }
        </Button>
    )
}
