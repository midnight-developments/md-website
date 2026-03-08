"use client";

import { AuthProvider } from '@/context/AuthContext'
import { CartProvider } from '@/context/CartContext'
import { ReactLenis } from "lenis/react"
import Layout from "@/components/layout/AppLayout"
import { Toaster } from "@/components/ui/sonner"
import type { TebexBasket } from "@/services/tebex/baskets"

export function Providers({ children, initialBasket }: { children: React.ReactNode, initialBasket: TebexBasket | null }) {
    return (
        <CartProvider initialBasket={initialBasket}>
            <AuthProvider>
                <ReactLenis root options={{ lerp: 0.15, wheelMultiplier: 1.2, smoothWheel: true }}>
                    <Layout>
                        {children}
                    </Layout>
                    <Toaster />
                </ReactLenis>
            </AuthProvider>
        </CartProvider>
    )
}
