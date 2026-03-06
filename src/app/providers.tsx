"use client";

import { AuthProvider } from '@/context/AuthContext'
import { CartProvider } from '@/context/CartContext'
import { ReactLenis, useLenis } from "lenis/react"
import Layout from "@/components/layout/AppLayout"
import { Toaster } from "@/components/ui/sonner"
import { usePathname } from 'next/navigation'
import { useEffect } from 'react'

export function Providers({ children }: { children: React.ReactNode }) {
    const pathname = usePathname()
    const lenis = useLenis()

    useEffect(() => {
        if (lenis) {
            lenis.scrollTo(0, { immediate: true })
        } else {
            window.scrollTo(0, 0)
        }
    }, [pathname, lenis])

    return (
        <AuthProvider>
            <CartProvider>
                <ReactLenis root options={{ lerp: 0.15, wheelMultiplier: 1.2, smoothWheel: true }}>
                    <Layout>
                        {children}
                    </Layout>
                    <Toaster />
                </ReactLenis>
            </CartProvider>
        </AuthProvider>
    )
}
