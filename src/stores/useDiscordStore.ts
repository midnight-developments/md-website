"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { useEffect, useRef } from "react";
import { useSearchParams, useRouter } from "next/navigation";
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

function getStaticDiscordRedirectUri(): string {
    if (typeof window === "undefined") return "";
    return `${window.location.origin}/`;
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
                const clientId = process.env.NEXT_PUBLIC_DISCORD_CLIENT_ID || "1410523462585548894";
                const staticRedirectUri = getStaticDiscordRedirectUri();
                const returnTo = window.location.pathname + window.location.search;

                try {
                    sessionStorage.setItem("discord_return_to", returnTo);
                } catch {
                    // Ignore storage errors in restrictive environments
                }

                const encodedRedirectUrl = encodeURIComponent(staticRedirectUri);
                const encodedState = encodeURIComponent(returnTo);
                const oauthUrl = `https://discord.com/oauth2/authorize?client_id=${clientId}&response_type=code&redirect_uri=${encodedRedirectUrl}&scope=identify&prompt=consent&state=${encodedState}`;
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
    const router = useRouter();
    const hasCalled = useRef(false);
    const setDiscordUser = useDiscordStore((state) => state.setDiscordUser);

    useEffect(() => {
        const code = searchParams.get("code");
        const stateParam = searchParams.get("state");

        if (code && !hasCalled.current) {
            hasCalled.current = true;

            const staticRedirectUri = getStaticDiscordRedirectUri();

            let returnTo = "/";
            if (stateParam) {
                try {
                    returnTo = decodeURIComponent(stateParam);
                } catch {
                    returnTo = stateParam;
                }
            } else {
                try {
                    returnTo = sessionStorage.getItem("discord_return_to") || "/";
                } catch {
                    returnTo = "/";
                }
            }

            try {
                sessionStorage.removeItem("discord_return_to");
            } catch {
            }

            window.history.replaceState({}, document.title, window.location.pathname);

            const handleDiscordAuth = async () => {
                const toastId = toast.loading("Connecting Discord...");

                try {
                    const authRes = await exchangeDiscordCode(code, staticRedirectUri);

                    if (!authRes.success || !authRes.user) {
                        toast.error(authRes.error || "Failed to exchange Discord code", { id: toastId });
                        if (returnTo !== window.location.pathname && returnTo !== "/") {
                            router.replace(returnTo);
                        }
                        return;
                    }

                    const data = authRes.user;
                    setDiscordUser({ id: data.id, username: data.username, avatar: data.avatar });

                    try {
                        const basket = useCartStore.getState().basket;
                        const oldItems = basket?.packages?.map((p) => ({ id: p.id, qty: p.in_basket.quantity })) || [];
                        if (oldItems.length > 0) {
                            useCartStore.getState().setPendingItems(oldItems);
                        }

                        const targetUrl = new URL(returnTo, window.location.origin).toString();
                        const result = await migrateBasketWithDiscord(data.id, targetUrl);

                        if (result.success && result.authUrl) {
                            toast.loading("Refreshing basket data...", { id: toastId });
                            window.location.href = result.authUrl;
                        } else if (result.success) {
                            toast.success(`Connected Discord as ${data.username}`, { id: toastId });
                            if (returnTo !== window.location.pathname) {
                                router.replace(returnTo);
                            }
                        } else {
                            toast.error(result.error || "Failed to update basket data with Discord", { id: toastId });
                            if (returnTo !== window.location.pathname) {
                                router.replace(returnTo);
                            }
                        }
                    } catch (e) {
                        toast.error(e instanceof Error ? e.message : "Failed to update basket data with Discord", { id: toastId });
                        if (returnTo !== window.location.pathname) {
                            router.replace(returnTo);
                        }
                    }
                } catch (error: unknown) {
                    const message = error instanceof Error ? error.message : "Failed to connect Discord";
                    toast.error(message, { id: toastId });
                    if (returnTo !== window.location.pathname && returnTo !== "/") {
                        router.replace(returnTo);
                    }
                }
            };
            handleDiscordAuth();
        }
    }, [searchParams, setDiscordUser, router]);
}

