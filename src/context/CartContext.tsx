"use client";
import React, { createContext, useContext, useState, useCallback } from "react"
import type { Product } from "@/data/products"

export interface CartItem {
    product: Product
    quantity: number
}

interface CartContextType {
    items: CartItem[]
    addItem: (product: Product) => void
    removeItem: (productId: string) => void
    clearCart: () => void
    totalItems: number
    subtotal: number
    isCartOpen: boolean
    setCartOpen: (open: boolean) => void
    isDiscordModalOpen: boolean
    setDiscordModalOpen: (open: boolean) => void
}

const CartContext = createContext<CartContextType | null>(null)

export function CartProvider({ children }: { children: React.ReactNode }) {
    const [items, setItems] = useState<CartItem[]>([])
    const [isCartOpen, setCartOpen] = useState(false)
    const [isDiscordModalOpen, setDiscordModalOpen] = useState(false)

    const addItem = useCallback((product: Product) => {
        setItems((prev) => {
            const existing = prev.find((i) => i.product.id === product.id)
            if (existing) return prev
            return [...prev, { product, quantity: 1 }]
        })
        setCartOpen(true)
    }, [])

    const removeItem = useCallback((productId: string) => {
        setItems((prev) => prev.filter((i) => i.product.id !== productId))
    }, [])

    const clearCart = useCallback(() => setItems([]), [])

    const totalItems = items.length
    const subtotal = items.reduce((sum, i) => sum + i.product.price * i.quantity, 0)

    return (
        <CartContext.Provider
            value={{
                items,
                addItem,
                removeItem,
                clearCart,
                totalItems,
                subtotal,
                isCartOpen,
                setCartOpen,
                isDiscordModalOpen,
                setDiscordModalOpen,
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
