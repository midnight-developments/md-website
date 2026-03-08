"use client";
import React, { createContext, useContext, useState, useCallback, useEffect } from "react"
import type { Product } from "@/services/tebex/products"
import { toast } from "sonner"
import {
    getBasketOrNull,
    addPackageToBasket,
    removePackageFromBasket,
    clearBasket,
    type TebexBasket
} from "@/services/tebex/baskets"

interface CartContextType {
    basket: TebexBasket | null
    isLoading: boolean
    addItem: (productId: number) => Promise<void>
    removeItem: (productId: number) => Promise<void>
    clearCart: () => Promise<void>
    totalItems: number
    subtotal: number
    isCartOpen: boolean
    setCartOpen: (open: boolean) => void
}

const CartContext = createContext<CartContextType | null>(null)

export function CartProvider({ children }: { children: React.ReactNode }) {
    const [basket, setBasket] = useState<TebexBasket | null>(null)
    const [isLoading, setIsLoading] = useState(true)
    const [isCartOpen, setCartOpen] = useState(false)

    useEffect(() => {
        getBasketOrNull().then((b) => {
            setBasket(b)
            setIsLoading(false)
        }).catch((e) => {
            console.error("Failed to load basket", e)
            setIsLoading(false)
        })
    }, [])

    const addItem = useCallback(async (productId: number) => {
        try {
            const updated = await addPackageToBasket(productId, 1)
            setBasket(updated)
            setCartOpen(true)
            toast.success("Added to cart!")
        } catch (error: any) {
            toast.error("Failed to add item to cart", {
                description: error instanceof Error ? error.message : String(error)
            })
            throw error;
        }
    }, [])

    const removeItem = useCallback(async (productId: number) => {
        try {
            const updated = await removePackageFromBasket(productId)
            setBasket(updated)
            toast.success("Removed from cart")
        } catch (error: any) {
            toast.error("Failed to remove item from cart", {
                description: error instanceof Error ? error.message : String(error)
            })
        }
    }, [])

    const clearCart = useCallback(async () => {
        await clearBasket()
        setBasket(null)
    }, [])

    const totalItems = basket?.packages?.reduce((sum, p) => sum + p.in_basket.quantity, 0) || 0
    const subtotal = basket?.base_price || 0

    return (
        <CartContext.Provider
            value={{
                basket,
                isLoading,
                addItem,
                removeItem,
                clearCart,
                totalItems,
                subtotal,
                isCartOpen,
                setCartOpen,
            }}
        >
            {children}
        </CartContext.Provider>
    )
}

export function useCart() {
    const ctx = useContext(CartContext)
    if (!ctx) throw new Error("useCart must be used within CartProvider")
    return ctx
}
