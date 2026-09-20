"use client";
import React, { createContext, useContext, useState, useCallback, useEffect, useMemo } from "react";
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
import { storage, STORAGE_KEYS } from "@/lib/storage";

interface CartContextType {
    basket: TebexBasket | null;
    addItem: (productId: number) => Promise<void>;
    removeItem: (productId: number) => Promise<void>;
    updateQuantity: (productId: number, quantity: number) => Promise<void>;
    applyCoupon: (code: string) => Promise<void>;
    removeCoupon: (couponId: number) => Promise<void>;
    applyCreatorCode: (code: string) => Promise<void>;
    removeCreatorCode: () => Promise<void>;
    clearCart: () => Promise<void>;
    totalItems: number;
    subtotal: number;
    totalPrice: number;
    isCartOpen: boolean;
    setCartOpen: (open: boolean) => void;
    checkout: () => void;
}

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({
    children,
    initialBasket = null,
}: {
    children: React.ReactNode;
    initialBasket: TebexBasket | null;
}) {
    const [basket, setBasket] = useState<TebexBasket | null>(initialBasket);
    const [isCartOpen, setCartOpen] = useState(false);

    useEffect(() => {
        if (initialBasket) {
            setBasket(initialBasket);

            const hasAuth = Boolean(initialBasket.username_id || initialBasket.customer);
            if (hasAuth) {
                const pendingItems = storage.getJSON<{ id: number; qty: number }[]>(STORAGE_KEYS.PENDING_ITEMS, []);
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
                        storage.removeItem(STORAGE_KEYS.PENDING_ITEMS);
                        const discordName = storage.getItem(STORAGE_KEYS.DISCORD_USERNAME);
                        if (discordName) {
                            toast.success(`Successfully connected as ${discordName}`);
                        }
                    };
                    restoreCart();
                } else {
                    storage.removeItem(STORAGE_KEYS.PENDING_ITEMS);
                }
            }
        }
    }, [initialBasket]);

    const addItem = useCallback(async (productId: number) => {
        try {
            const updated = await addPackageToBasket(productId, 1);
            setBasket(updated);
            setCartOpen(true);
            toast.success("Added to cart!");
        } catch (error: unknown) {
            const message = error instanceof Error ? error.message : "Failed to add item to cart";
            toast.error("Failed to add item to cart", { description: message });
            throw error;
        }
    }, []);

    const removeItem = useCallback(async (productId: number) => {
        try {
            const updated = await removePackageFromBasket(productId);
            setBasket(updated);
            toast.success("Removed from cart");
        } catch (error: unknown) {
            const message = error instanceof Error ? error.message : "Failed to remove item from cart";
            toast.error("Failed to remove item from cart", { description: message });
        }
    }, []);

    const updateQuantity = useCallback(async (productId: number, quantity: number) => {
        try {
            const updated = await updatePackageQuantity(productId, quantity);
            setBasket(updated);
        } catch (error: unknown) {
            const message = error instanceof Error ? error.message : "Failed to update quantity";
            toast.error("Failed to update item quantity", { description: message });
        }
    }, []);

    const applyCoupon = useCallback(async (code: string) => {
        try {
            const updated = await applyCouponToBasket(code);
            setBasket(updated);
            toast.success("Coupon applied!");
        } catch (error: unknown) {
            const message = error instanceof Error ? error.message : "Failed to apply coupon";
            toast.error("Invalid coupon", { description: message });
            throw error;
        }
    }, []);

    const removeCoupon = useCallback(async (couponId: number) => {
        try {
            const updated = await removeCouponFromBasket(couponId);
            setBasket(updated);
            toast.success("Coupon removed");
        } catch (error: unknown) {
            const message = error instanceof Error ? error.message : "Failed to remove coupon";
            toast.error("Failed to remove coupon", { description: message });
        }
    }, []);

    const applyCreatorCode = useCallback(async (code: string) => {
        try {
            const updated = await applyCreatorCodeToBasket(code);
            setBasket(updated);
            toast.success("Creator code applied!");
        } catch (error: unknown) {
            const message = error instanceof Error ? error.message : "Failed to apply creator code";
            toast.error("Invalid creator code", { description: message });
            throw error;
        }
    }, []);

    const removeCreatorCode = useCallback(async () => {
        try {
            const updated = await removeCreatorCodeFromBasket();
            setBasket(updated);
            toast.success("Creator code removed");
        } catch (error: unknown) {
            const message = error instanceof Error ? error.message : "Failed to remove creator code";
            toast.error("Failed to remove creator code", { description: message });
        }
    }, []);

    const clearCart = useCallback(async () => {
        await clearBasket();
        setBasket(null);
    }, []);

    const checkout = useCallback(async () => {
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

                await clearCart();
                const discordId = storage.getItem(STORAGE_KEYS.DISCORD_ID);
                let newBasket: TebexBasket;
                if (discordId) {
                    newBasket = await createBasket(window.location.href, window.location.href, { discord_id: discordId });
                } else {
                    newBasket = await createBasket();
                }
                setBasket(newBasket);

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
    }, [basket, clearCart]);

    const totalItems = useMemo(
        () => basket?.packages?.reduce((sum, p) => sum + p.in_basket.quantity, 0) || 0,
        [basket]
    );
    const subtotal = useMemo(() => basket?.base_price || 0, [basket]);
    const totalPrice = useMemo(() => basket?.total_price ?? subtotal, [basket, subtotal]);

    const value = useMemo(
        () => ({
            basket,
            addItem,
            removeItem,
            updateQuantity,
            applyCoupon,
            removeCoupon,
            applyCreatorCode,
            removeCreatorCode,
            clearCart,
            totalItems,
            subtotal,
            totalPrice,
            isCartOpen,
            setCartOpen,
            checkout,
        }),
        [
            basket,
            addItem,
            removeItem,
            updateQuantity,
            applyCoupon,
            removeCoupon,
            applyCreatorCode,
            removeCreatorCode,
            clearCart,
            totalItems,
            subtotal,
            totalPrice,
            isCartOpen,
            checkout,
        ]
    );

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
    const ctx = useContext(CartContext);
    if (!ctx) throw new Error("useCart must be used within CartProvider");
    return ctx;
}
