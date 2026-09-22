"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { exchangeDiscordCode } from "@/actions/discord";
import { migrateBasketWithDiscord } from "@/actions/baskets";
import { useCartStore } from "@/stores/useCartStore";

export interface DiscordUser {
    id: string;
    username: string;
    avatar: string | null;
}

interface DiscordState {
    discordUser: DiscordUser | null;
    isDiscordConnected: boolean;
    isDiscordModalOpen: boolean;
    setDiscordUser: (user: DiscordUser | null) => void;
    setDiscordModalOpen: (open: boolean) => void;
    connectDiscord: () => void;
    disconnectDiscord: () => void;
}

export const useDiscordStore = create<DiscordState>()(
    persist(
        (set) => ({
            discordUser: null,
            isDiscordConnected: false,
            isDiscordModalOpen: false,
            setDiscordUser: (user) => set({ discordUser: user, isDiscordConnected: Boolean(user) }),
            setDiscordModalOpen: (open) => set({ isDiscordModalOpen: open }),
            connectDiscord: () => {
                const clientId = process.env.NEXT_PUBLIC_DISCORD_CLIENT_ID;
                if (!clientId) {
                    toast.error("Discord client ID is not configured");
                    return;
                }
                const currentUrl = window.location.origin + window.location.pathname;
                const encodedRedirectUrl = encodeURIComponent(currentUrl);
                const oauthUrl = `https://discord.com/oauth2/authorize?client_id=${clientId}&response_type=code&redirect_uri=${encodedRedirectUrl}&scope=identify&prompt=consent`;
                window.location.href = oauthUrl;
            },
            disconnectDiscord: () => {
                set({ discordUser: null, isDiscordConnected: false });
                toast.success("Discord disconnected");
            },
        }),
        {
            name: "discord_auth",
            partialize: (state) => ({
                discordUser: state.discordUser,
                isDiscordConnected: state.isDiscordConnected,
            }),
        }
    )
);

export function useDiscordOAuthListener() {
    const searchParams = useSearchParams();
    const hasCalled = useRef(false);
    const setDiscordUser = useDiscordStore((state) => state.setDiscordUser);

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
                        setDiscordUser({ id: data.id, username: data.username, avatar: data.avatar });

                        try {
                            const basket = useCartStore.getState().basket;
                            const oldItems = basket?.packages?.map((p) => ({ id: p.id, qty: p.in_basket.quantity })) || [];
                            if (oldItems.length > 0) {
                                useCartStore.getState().setPendingItems(oldItems);
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
    }, [searchParams, setDiscordUser]);
}

