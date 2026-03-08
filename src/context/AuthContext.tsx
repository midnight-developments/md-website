"use client";
import React, { createContext, useContext, useState, useCallback, useEffect } from "react"
import { useCart } from "@/context/CartContext"
import { getAuthUrl } from "@/services/tebex/baskets"
import { toast } from "sonner";
import { useRouter } from "next/navigation"

interface AuthContextType {
    isLoggedIn: boolean
    username: string
    avatar: string
    isDiscordConnected: boolean
    isDiscordModalOpen: boolean
    setDiscordModalOpen: (open: boolean) => void
    login: () => void
    logout: () => void
    connectDiscord: () => void
}

const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const { basket, clearCart } = useCart()
    const router = useRouter()
    const [isDiscordConnected, setIsDiscordConnected] = useState(false)
    const [isDiscordModalOpen, setDiscordModalOpenState] = useState(false)
    const [hasAttemptedModal, setHasAttemptedModal] = useState(false)

    const setDiscordModalOpen = useCallback((open: boolean) => {
        if (open) {
            if (hasAttemptedModal) return
            setHasAttemptedModal(true)
        }
        setDiscordModalOpenState(open)
    }, [hasAttemptedModal])

    const isLoggedIn = !!basket?.username_id
    const username = basket?.username || ""
    const avatar = isLoggedIn ? `https://forum.cfx.re/user_avatar/forum.cfx.re/${username}/288/5708323_2.png` : ""

    const login = useCallback(async () => {
        const toastId = toast.info("Redirecting to CFX.re...")
        try {
            const currentUrl = window.location.href;
            const url = await getAuthUrl(currentUrl);
            if (url) {
                window.location.href = url;
            } else {
                toast.error("Failed to fetch Tebex Auth URL", { id: toastId });
            }
        } catch (error) {
            console.error("Failed to fetch Tebex Auth URL:", error);
            toast.error("Failed to fetch Tebex Auth URL", { id: toastId });
        }
    }, [])

    const logout = useCallback(async () => {
        await clearCart()
        toast.success("Logged out successfully")
        router.refresh()
    }, [clearCart, router])

    const connectDiscord = useCallback(() => {
        setIsDiscordConnected(true)
    }, [])

    return (
        <AuthContext.Provider value={{
            isLoggedIn,
            username,
            avatar,
            isDiscordConnected,
            isDiscordModalOpen,
            setDiscordModalOpen,
            login,
            logout,
            connectDiscord
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    const ctx = useContext(AuthContext)
    if (!ctx) throw new Error("useAuth must be used within AuthProvider")
    return ctx
}
