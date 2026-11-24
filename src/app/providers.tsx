"use client";

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
        <>
            {children}
            <Toaster />
        </>
    );
}
