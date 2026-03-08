"use client";
import React, { createContext, useContext, useState, useCallback, useEffect } from "react"
import type { Product } from "@/services/tebex/products"
import { toast } from "sonner"
import {
    getBasketOrNull,
    addPackageToBasket,
    removePackageFromBasket,
    clearBasket,
    createBasket,
    getAuthUrl,
    type TebexBasket
} from "@/services/tebex/baskets"


interface CartContextType {
    basket: TebexBasket | null
    addItem: (productId: number) => Promise<void>
    removeItem: (productId: number) => Promise<void>
    clearCart: () => Promise<void>
    totalItems: number
    subtotal: number
    isCartOpen: boolean
    setCartOpen: (open: boolean) => void
    checkout: () => void
}

const CartContext = createContext<CartContextType | null>(null)

export function CartProvider({
    children,
    initialBasket = null
}: {
    children: React.ReactNode,
    initialBasket: TebexBasket | null
}) {
    const [basket, setBasket] = useState<TebexBasket | null>(initialBasket)
    const [isCartOpen, setCartOpen] = useState(false)


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

    const checkout = useCallback(async () => {
        if (basket?.ident) {
            if (typeof window !== "undefined" && window.Tebex?.checkout) {
                window.Tebex.checkout.init({
                    ident: basket.ident,
                    theme: "dark",
                    colors: [
                        { name: "primary", color: "#101010" },
                        { name: "secondary", color: "#6464e6" }
                    ]
                });
                window.Tebex.checkout.on("payment_complete", async () => {
                    console.log("Purchase complete! Previous basket:", basket);
                    const wasLoggedIn = !!basket?.username_id;

                    await clearCart();
                    const newBasket = await createBasket();
                    setBasket(newBasket);

                    if (wasLoggedIn) {
                        try {
                            const authUrl = await getAuthUrl(window.location.href);
                            if (authUrl) {
                                window.location.href = authUrl;
                            }
                        } catch (error) {
                            console.error("Failed to re-authenticate:", error);
                        }
                    }

                    toast.success("Purchase successful!");
                });

                window.Tebex.checkout.launch();
            } else {
                window.open(basket.links?.checkout, "_blank");
            }
        }
    }, [basket, clearCart])

    const totalItems = basket?.packages?.reduce((sum, p) => sum + p.in_basket.quantity, 0) || 0
    const subtotal = basket?.base_price || 0

    return (
        <CartContext.Provider
            value={{
                basket,
                addItem,
                removeItem,
                clearCart,
                totalItems,
                subtotal,
                isCartOpen,
                setCartOpen,
                checkout
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
