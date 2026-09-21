"use client";

import { AuthProvider } from '@/context/AuthContext'
import { CartProvider } from '@/context/CartContext'
import { CurrencyProvider } from '@/context/CurrencyContext'
import { ReactLenis } from "lenis/react"
import { Toaster } from "@/components/ui/sonner"
import type { TebexBasket } from "@/types/tebex"

export function Providers({ children, initialBasket }: { children: React.ReactNode, initialBasket: TebexBasket | null }) {
    return (
        <CurrencyProvider>
            <CartProvider initialBasket={initialBasket}>
                <AuthProvider>
                    <ReactLenis root options={{ lerp: 0.15, wheelMultiplier: 1.2, smoothWheel: true }}>
                        {children}
                        <Toaster />
                    </ReactLenis>
                </AuthProvider>
            </CartProvider>
        </CurrencyProvider>
    )
}
