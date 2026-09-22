"use client";

import { ReactLenis } from "lenis/react";
import { Toaster } from "@/components/ui/sonner";
import { useHydrateCart } from "@/stores/useCartStore";
import { useDiscordOAuthListener } from "@/stores/useDiscordStore";
import type { TebexBasket } from "@/types/tebex";

export function Providers({
    children,
    initialBasket,
}: {
    children: React.ReactNode;
    initialBasket: TebexBasket | null;
}) {
    useHydrateCart(initialBasket);
    useDiscordOAuthListener();

    return (
        <ReactLenis root options={{ lerp: 0.15, wheelMultiplier: 1.2, smoothWheel: true }}>
            {children}
            <Toaster />
        </ReactLenis>
    );
}
