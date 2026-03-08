"use client";
import React, { createContext, useContext, useState, useCallback, useEffect } from "react"
import { useCart } from "@/context/CartContext"
import { getAuthUrl, migrateBasketWithDiscord } from "@/services/tebex/baskets"
import { exchangeDiscordCode } from "@/services/discord"
import { toast } from "sonner";
import { useRouter, useSearchParams } from "next/navigation"

interface AuthContextType {
    isLoggedIn: boolean
    username: string
    avatar: string
    isDiscordConnected: boolean
    discordUser: { id: string, username: string, avatar: string | null } | null
    isDiscordModalOpen: boolean
    setDiscordModalOpen: (open: boolean) => void
    login: () => void
    logout: () => void
    connectDiscord: () => void
    disconnectDiscord: () => void
}

const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const { basket, clearCart } = useCart()
    const router = useRouter()
    const searchParams = useSearchParams()

    const [discordUser, setDiscordUser] = useState<{ id: string, username: string, avatar: string | null } | null>(null)
    const [isDiscordModalOpen, setDiscordModalOpenState] = useState(false)
    const [hasAttemptedModal, setHasAttemptedModal] = useState(false)

    // Load discord user from localStorage on mount
    useEffect(() => {
        const id = localStorage.getItem("discordID")
        const username = localStorage.getItem("discordUsername")
        const avatar = localStorage.getItem("discordAvatar")

        if (id && username) {
            setDiscordUser({ id, username, avatar })
        }
    }, [])

    // Catch Discord OAuth code in URL
    useEffect(() => {
        const code = searchParams.get("code")
        if (code) {
            const handleDiscordAuth = async () => {
                const toastId = toast.loading("Connecting Discord...")
                try {
                    const data = await exchangeDiscordCode(
                        code,
                        window.location.origin + window.location.pathname
                    )

                    if (data.id && data.username) {
                        localStorage.setItem("discordID", data.id)
                        localStorage.setItem("discordUsername", data.username)
                        if (data.avatar) localStorage.setItem("discordAvatar", data.avatar)

                        setDiscordUser({ id: data.id, username: data.username, avatar: data.avatar })

                        // Re-create basket with discord ID
                        try {
                            await migrateBasketWithDiscord(data.id)
                            router.refresh()
                        } catch (e) {
                            console.error("Failed to migrate basket with discord id:", e)
                        }

                        toast.success(`Connected as ${data.username}`, { id: toastId })

                        // Clean up URL
                        const cleanUrl = window.location.origin + window.location.pathname
                        window.history.replaceState(null, "", cleanUrl)
                    }
                } catch (error: any) {
                    console.error("Discord Auth Error:", error)
                    toast.error(error.message || "Failed to connect Discord", { id: toastId })
                }
            }
            handleDiscordAuth()
        }
    }, [searchParams])

    const setDiscordModalOpen = useCallback((open: boolean) => {
        if (open) {
            if (hasAttemptedModal) return
            setHasAttemptedModal(true)
        }
        setDiscordModalOpenState(open)
    }, [hasAttemptedModal])

    const isLoggedIn = !!basket?.username_id
    const isDiscordConnected = !!discordUser
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
        const clientId = process.env.NEXT_PUBLIC_DISCORD_CLIENT_ID || '1410523462585548894'
        const currentUrl = window.location.origin + window.location.pathname
        const encodedRedirectUrl = encodeURIComponent(currentUrl)
        const oauthUrl = `https://discord.com/oauth2/authorize?client_id=${clientId}&response_type=code&redirect_uri=${encodedRedirectUrl}&scope=identify`
        window.location.href = oauthUrl
    }, [])

    const disconnectDiscord = useCallback(() => {
        localStorage.removeItem("discordID")
        localStorage.removeItem("discordUsername")
        localStorage.removeItem("discordAvatar")
        setDiscordUser(null)
        toast.success("Discord disconnected")
    }, [])

    return (
        <AuthContext.Provider value={{
            isLoggedIn,
            username,
            avatar,
            isDiscordConnected,
            discordUser,
            isDiscordModalOpen,
            setDiscordModalOpen,
            login,
            logout,
            connectDiscord,
            disconnectDiscord
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
