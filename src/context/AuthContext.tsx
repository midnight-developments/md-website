"use client";
import React, { createContext, useContext, useState, useCallback } from "react"

interface AuthState {
    isLoggedIn: boolean
    username: string
    avatar: string
    isDiscordConnected: boolean
}

interface AuthContextType extends AuthState {
    login: () => void
    logout: () => void
    connectDiscord: () => void
}

const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [auth, setAuth] = useState<AuthState>({
        isLoggedIn: false,
        username: "",
        avatar: "",
        isDiscordConnected: false,
    })

    const login = useCallback(() => {
        setAuth({
            isLoggedIn: true,
            username: "Player_123",
            avatar: "https://i.pravatar.cc/40?u=fivem",
            isDiscordConnected: false,
        })
    }, [])

    const logout = useCallback(() => {
        setAuth({
            isLoggedIn: false,
            username: "",
            avatar: "",
            isDiscordConnected: false,
        })
    }, [])

    const connectDiscord = useCallback(() => {
        setAuth((prev) => ({ ...prev, isDiscordConnected: true }))
    }, [])

    return (
        <AuthContext.Provider value={{ ...auth, login, logout, connectDiscord }}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    const ctx = useContext(AuthContext)
    if (!ctx) throw new Error("useAuth must be used within AuthProvider")
    return ctx
}
