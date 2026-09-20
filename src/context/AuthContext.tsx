"use client";
import React, { createContext, useContext, useState, useCallback, useEffect, useRef, useMemo } from "react";
import { useCart } from "@/context/CartContext";
import { getAuthUrl, migrateBasketWithDiscord } from "@/actions/baskets";
import { exchangeDiscordCode } from "@/actions/discord";
import { toast } from "sonner";
import { useRouter, useSearchParams } from "next/navigation";
import { storage, STORAGE_KEYS } from "@/lib/storage";

interface AuthContextType {
    isLoggedIn: boolean;
    username: string;
    avatar: string;
    isDiscordConnected: boolean;
    discordUser: { id: string; username: string; avatar: string | null } | null;
    isDiscordModalOpen: boolean;
    setDiscordModalOpen: (open: boolean) => void;
    login: () => void;
    logout: () => void;
    connectDiscord: () => void;
    disconnectDiscord: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const { basket, clearCart } = useCart();
    const router = useRouter();
    const searchParams = useSearchParams();
    const hasCalled = useRef(false);

    const [discordUser, setDiscordUser] = useState<{ id: string; username: string; avatar: string | null } | null>(null);
    const [isDiscordModalOpen, setDiscordModalOpen] = useState(false);

    useEffect(() => {
        const id = storage.getItem(STORAGE_KEYS.DISCORD_ID);
        const username = storage.getItem(STORAGE_KEYS.DISCORD_USERNAME);
        const avatar = storage.getItem(STORAGE_KEYS.DISCORD_AVATAR);

        if (id && username) {
            setDiscordUser({ id, username, avatar });
        }
    }, []);

    useEffect(() => {
        const code = searchParams.get("code");

        if (code && !hasCalled.current) {
            hasCalled.current = true;

            const cleanUrl = window.location.origin + window.location.pathname;
            window.history.replaceState({}, document.title, window.location.pathname);

            const handleDiscordAuth = async () => {
                const toastId = toast.loading("Connecting Discord...");

                try {
                    const data = await exchangeDiscordCode(code, cleanUrl);

                    if (data.id && data.username) {
                        storage.setItem(STORAGE_KEYS.DISCORD_ID, data.id);
                        storage.setItem(STORAGE_KEYS.DISCORD_USERNAME, data.username);
                        if (data.avatar) {
                            storage.setItem(STORAGE_KEYS.DISCORD_AVATAR, data.avatar);
                        }

                        setDiscordUser({ id: data.id, username: data.username, avatar: data.avatar });

                        try {
                            const oldItems = basket?.packages?.map((p) => ({ id: p.id, qty: p.in_basket.quantity })) || [];
                            if (oldItems.length > 0) {
                                storage.setJSON(STORAGE_KEYS.PENDING_ITEMS, oldItems);
                            }

                            const result = await migrateBasketWithDiscord(data.id, window.location.href);

                            if (result.authUrl) {
                                toast.loading("Refreshing basket data...", { id: toastId });
                                window.location.href = result.authUrl;
                            } else {
                                toast.error("Failed to update basket data with Discord", { id: toastId });
                            }
                        } catch (e) {
                            toast.error(e instanceof Error ? e.message : "Failed to update basket data with Discord", { id: toastId });
                        }
                    }
                } catch (error: unknown) {
                    const message = error instanceof Error ? error.message : "Failed to connect Discord";
                    toast.error(message, { id: toastId });
                }
            };
            handleDiscordAuth();
        }
    }, [searchParams, router, basket]);

    const isLoggedIn = Boolean(basket?.username_id);
    const isDiscordConnected = Boolean(discordUser);
    const username = basket?.username || "";
    const avatar = isLoggedIn ? `https://forum.cfx.re/user_avatar/forum.cfx.re/${username}/288/5708323_2.png` : "";

    const login = useCallback(async () => {
        storage.removeItem(STORAGE_KEYS.DISCORD_ID);
        storage.removeItem(STORAGE_KEYS.DISCORD_USERNAME);
        storage.removeItem(STORAGE_KEYS.DISCORD_AVATAR);
        setDiscordUser(null);

        const toastId = toast.loading("Redirecting to CFX.re...");
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
    }, []);

    const logout = useCallback(async () => {
        await clearCart();
        toast.success("Logged out successfully");
        router.refresh();
    }, [clearCart, router]);

    const connectDiscord = useCallback(() => {
        const clientId = process.env.NEXT_PUBLIC_DISCORD_CLIENT_ID;
        if (!clientId) {
            toast.error("Discord client ID is not configured");
            return;
        }
        const currentUrl = window.location.origin + window.location.pathname;
        const encodedRedirectUrl = encodeURIComponent(currentUrl);
        const oauthUrl = `https://discord.com/oauth2/authorize?client_id=${clientId}&response_type=code&redirect_uri=${encodedRedirectUrl}&scope=identify&prompt=consent`;
        window.location.href = oauthUrl;
    }, []);

    const disconnectDiscord = useCallback(() => {
        storage.removeItem(STORAGE_KEYS.DISCORD_ID);
        storage.removeItem(STORAGE_KEYS.DISCORD_USERNAME);
        storage.removeItem(STORAGE_KEYS.DISCORD_AVATAR);
        setDiscordUser(null);
        toast.success("Discord disconnected");
    }, []);

    const value = useMemo(
        () => ({
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
            disconnectDiscord,
        }),
        [
            isLoggedIn,
            username,
            avatar,
            isDiscordConnected,
            discordUser,
            isDiscordModalOpen,
            login,
            logout,
            connectDiscord,
            disconnectDiscord,
        ]
    );

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error("useAuth must be used within AuthProvider");
    return ctx;
}
