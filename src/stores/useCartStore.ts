"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { useEffect, useRef } from "react";
import { toast } from "sonner";
import {
    addPackageToBasket,
    removePackageFromBasket,
    clearBasket,
    createBasket,
    getAuthUrl,
    applyCouponToBasket,
    removeCouponFromBasket,
    applyCreatorCodeToBasket,
    removeCreatorCodeFromBasket,
    updatePackageQuantity,
} from "@/actions/baskets";
import type { TebexBasket } from "@/types/tebex";
import { useDiscordStore } from "@/stores/useDiscordStore";

interface CartState {
    basket: TebexBasket | null;
    isCartOpen: boolean;
    totalItems: number;
    subtotal: number;
    taxes: number;
    totalPrice: number;
    isLoggedIn: boolean;
    username: string;
    avatar: string;
    pendingItems: { id: number; qty: number }[];

    setBasket: (basket: TebexBasket | null) => void;
    setCartOpen: (open: boolean) => void;
    setPendingItems: (items: { id: number; qty: number }[]) => void;
    addItem: (productId: number) => Promise<void>;
    removeItem: (productId: number) => Promise<void>;
    updateQuantity: (productId: number, quantity: number) => Promise<void>;
    applyCoupon: (code: string) => Promise<void>;
    removeCoupon: (couponId: number) => Promise<void>;
    applyCreatorCode: (code: string) => Promise<void>;
    removeCreatorCode: () => Promise<void>;
    clearCart: () => Promise<void>;
    checkout: () => void;
    login: () => Promise<void>;
    logout: () => Promise<void>;
}

export const useCartStore = create<CartState>()(
    persist(
        (set, get) => ({
            basket: null,
            isCartOpen: false,
            totalItems: 0,
            subtotal: 0,
            taxes: 0,
            totalPrice: 0,
            isLoggedIn: false,
            username: "",
            avatar: "",
            pendingItems: [],

            setBasket: (basket) =>
                set({
                    basket,
                    totalItems: basket?.packages?.reduce((sum, p) => sum + p.in_basket.quantity, 0) || 0,
                    subtotal: basket?.base_price || 0,
                    taxes: basket?.sales_tax || 0,
                    totalPrice: basket?.total_price ?? (basket?.base_price || 0),
                    isLoggedIn: Boolean(basket?.username_id),
                    username: basket?.username || "",
                    avatar: basket?.username ? `https://forum.cfx.re/user_avatar/forum.cfx.re/${basket.username}/288/5708323_2.png` : "",
                }),
            setCartOpen: (isCartOpen) => set({ isCartOpen }),
            setPendingItems: (pendingItems) => set({ pendingItems }),

            addItem: async (productId: number) => {
                try {
                    const updated = await addPackageToBasket(productId, 1);
                    get().setBasket(updated);
                    get().setCartOpen(true);
                    toast.success("Added to cart!");
                } catch (error: unknown) {
                    const message = error instanceof Error ? error.message : "Failed to add item to cart";
                    toast.error("Failed to add item to cart", { description: message });
                    throw error;
                }
            },

            removeItem: async (productId: number) => {
                try {
                    const updated = await removePackageFromBasket(productId);
                    get().setBasket(updated);
                    toast.success("Removed from cart");
                } catch (error: unknown) {
                    const message = error instanceof Error ? error.message : "Failed to remove item from cart";
                    toast.error("Failed to remove item from cart", { description: message });
                }
            },

            updateQuantity: async (productId: number, quantity: number) => {
                try {
                    const updated = await updatePackageQuantity(productId, quantity);
                    get().setBasket(updated);
                } catch (error: unknown) {
                    const message = error instanceof Error ? error.message : "Failed to update quantity";
                    toast.error("Failed to update item quantity", { description: message });
                }
            },

            applyCoupon: async (code: string) => {
                try {
                    const updated = await applyCouponToBasket(code);
                    get().setBasket(updated);
                    toast.success("Coupon applied!");
                } catch (error: unknown) {
                    const message = error instanceof Error ? error.message : "Failed to apply coupon";
                    toast.error("Invalid coupon", { description: message });
                    throw error;
                }
            },

            removeCoupon: async (couponId: number) => {
                try {
                    const updated = await removeCouponFromBasket(couponId);
                    get().setBasket(updated);
                    toast.success("Coupon removed");
                } catch (error: unknown) {
                    const message = error instanceof Error ? error.message : "Failed to remove coupon";
                    toast.error("Failed to remove coupon", { description: message });
                }
            },

            applyCreatorCode: async (code: string) => {
                try {
                    const updated = await applyCreatorCodeToBasket(code);
                    get().setBasket(updated);
                    toast.success("Creator code applied!");
                } catch (error: unknown) {
                    const message = error instanceof Error ? error.message : "Failed to apply creator code";
                    toast.error("Invalid creator code", { description: message });
                    throw error;
                }
            },

            removeCreatorCode: async () => {
                try {
                    const updated = await removeCreatorCodeFromBasket();
                    get().setBasket(updated);
                    toast.success("Creator code removed");
                } catch (error: unknown) {
                    const message = error instanceof Error ? error.message : "Failed to remove creator code";
                    toast.error("Failed to remove creator code", { description: message });
                }
            },

            clearCart: async () => {
                await clearBasket();
                get().setBasket(null);
            },

            checkout: () => {
                const basket = get().basket;
                if (!basket?.ident) return;

                if (typeof window !== "undefined" && window.Tebex?.checkout) {
                    window.Tebex.checkout.init({
                        ident: basket.ident,
                        theme: "dark",
                        colors: [
                            { name: "primary", color: "#101010" },
                            { name: "secondary", color: "#6464e6" },
                        ],
                    });

                    window.Tebex.checkout.on("payment_complete", async () => {
                        const wasLoggedIn = Boolean(basket?.username_id);

                        await get().clearCart();
                        const discordId = useDiscordStore.getState().discordUser?.id;
                        let newBasket: TebexBasket;
                        if (discordId) {
                            newBasket = await createBasket(window.location.href, window.location.href, { discord_id: discordId });
                        } else {
                            newBasket = await createBasket();
                        }
                        get().setBasket(newBasket);

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
                } else if (basket.links?.checkout) {
                    window.open(basket.links.checkout, "_blank");
                } else {
                    toast.error("Checkout unavailable. Please refresh and try again.");
                }
            },

            login: async () => {
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
            },

            logout: async () => {
                await get().clearCart();
                toast.success("Logged out successfully");
                window.location.reload();
            },
        }),
        {
            name: "cart_store",
            partialize: (state) => ({ pendingItems: state.pendingItems }),
        }
    )
);

export function useHydrateCart(initialBasket: TebexBasket | null) {
    const initialized = useRef(false);
    const setBasket = useCartStore((state) => state.setBasket);

    useEffect(() => {
        if (!initialBasket) return;

        setBasket(initialBasket);

        if (!initialized.current) {
            initialized.current = true;

            const hasAuth = Boolean(initialBasket.username_id || initialBasket.customer);
            if (hasAuth) {
                const pendingItems = useCartStore.getState().pendingItems;
                if (pendingItems.length > 0) {
                    const restoreCart = async () => {
                        let localBasket = initialBasket;
                        for (const item of pendingItems) {
                            try {
                                const updated = await addPackageToBasket(item.id, item.qty, localBasket.ident);
                                localBasket = updated;
                            } catch (e) {
                                console.error("Failed restoring item to cart:", e);
                            }
                        }
                        setBasket(localBasket);
                        useCartStore.getState().setPendingItems([]);
                        const discordName = useDiscordStore.getState().discordUser?.username;
                        if (discordName) {
                            toast.success(`Successfully connected as ${discordName}`);
                        }
                    };
                    restoreCart();
                } else {
                    useCartStore.getState().setPendingItems([]);
                }
            }
        }
    }, [initialBasket, setBasket]);
}
