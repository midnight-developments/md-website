"use client";
import { useState } from "react"
import { ShoppingCart, Loader2, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCartStore } from "@/stores/useCartStore"
import type { Product, TebexBasketPackage } from "@/types/tebex"
import { cn } from "@/lib/utils"

interface AddToCartButtonProps {
    product: Product
    className?: string
    showIcon?: boolean
}

export default function AddToCartButton({ product, className, showIcon = true }: AddToCartButtonProps) {
    const isLoggedIn = useCartStore((state) => state.isLoggedIn)
    const login = useCartStore((state) => state.login)
    const addItem = useCartStore((state) => state.addItem)
    const isInCart = useCartStore((state) => state.basket?.packages?.some((p: TebexBasketPackage) => p.id === product.id) ?? false)
    const [isAdding, setIsAdding] = useState(false)

    const handleAddToCart = async (e: React.MouseEvent) => {
        e.preventDefault()
        e.stopPropagation()

        if (!isLoggedIn) {
            login()
            return
        }

        if (isInCart || isAdding) return

        setIsAdding(true)
        try {
            await addItem(product.id)
        } finally {
            setIsAdding(false)
        }
    }

    return (
        <Button
            variant="primary"
            className={cn(
                "w-full transition-all duration-300",
                (!isLoggedIn || isInCart) && "opacity-60 cursor-not-allowed",
                className
            )}
            onClick={handleAddToCart}
            disabled={isAdding || isInCart}
            aria-label={isLoggedIn ? (isInCart ? "Item in Cart" : `Add ${product.name} to Cart`) : "Login to Add to Cart"}
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
