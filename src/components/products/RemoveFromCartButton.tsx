"use client";
import { useState } from "react"
import { ShoppingCart, Loader2, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCartStore } from "@/stores/useCartStore"
import type { Product, TebexBasketPackage } from "@/types/tebex"
import { cn } from "@/lib/utils"

interface RemoveFromCartButtonProps {
    product: Product | TebexBasketPackage
    className?: string
    showIcon?: boolean
}

export default function RemoveFromCartButton({
    product,
    className,
    showIcon = true,
}: RemoveFromCartButtonProps) {
    const isLoggedIn = useCartStore((state) => state.isLoggedIn)
    const login = useCartStore((state) => state.login)
    const removeItem = useCartStore((state) => state.removeItem)
    const isInCart = useCartStore((state) => state.basket?.packages?.some((p: TebexBasketPackage) => p.id === product.id) ?? false)
    const [isRemoving, setIsRemoving] = useState(false)

    const handleRemoveFromCart = async (e: React.MouseEvent) => {
        e.preventDefault()
        e.stopPropagation()

        if (!isLoggedIn) {
            login()
            return
        }

        if (!isInCart || isRemoving) return

        setIsRemoving(true)
        try {
            await removeItem(product.id)
        } finally {
            setIsRemoving(false)
        }
    }

    return (
        <Button
            variant="destructive"
            className={cn(
                "w-full transition-all duration-300 gap-2",
                (!isLoggedIn || !isInCart) && "opacity-60 cursor-not-allowed",
                className
            )}
            onClick={handleRemoveFromCart}
            disabled={isRemoving || !isInCart}
            aria-label={isLoggedIn ? (isInCart ? `Remove ${product.name} from Cart` : "Not in Cart") : "Login to Remove"}
        >
            {isRemoving ? (
                <Loader2 className="size-4.5 animate-spin" />
            ) : isInCart ? (
                <Trash2 className="size-4" />
            ) : showIcon ? (
                <ShoppingCart className="size-4.5" />
            ) : null}

            {isLoggedIn
                ? (isRemoving ? "Removing..." : "Remove from Cart")
                : "Login to Remove"
            }
        </Button>
    )
}

