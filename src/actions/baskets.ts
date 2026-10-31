"use server";

import { cookies } from "next/headers";
import { TEBEX_CONFIG } from "@/config/tebex";
import { sanitizeRedirectUrl } from "@/lib/utils";
import { getBaseUrl } from "@/lib/getBaseUrl";
import type {
    TebexBasket,
    TebexBasketCustomData,
} from "@/types/tebex";
import * as tebexBasketService from "@/services/tebex/baskets";

async function safeDeleteCookie(name: string): Promise<void> {
    try {
        const cookieStore = await cookies();
        cookieStore.delete(name);
    } catch {
    }
}

async function getRequiredBasket(): Promise<TebexBasket> {
    const basket = await getBasketOrNull();
    if (!basket) throw new Error("No active basket found");
    return basket;
}

export async function createBasket(
    returnUrl?: string,
    cancelUrl?: string,
    custom: TebexBasketCustomData = {}
): Promise<TebexBasket> {
    const baseUrl = await getBaseUrl();
    const completeUrl = sanitizeRedirectUrl(returnUrl, baseUrl);
    const fallbackCancelUrl = sanitizeRedirectUrl(cancelUrl, baseUrl);

    const basket = await tebexBasketService.createBasket(completeUrl, fallbackCancelUrl, custom);
    const isHttps = baseUrl.startsWith("https://");

    const cookieStore = await cookies();
    cookieStore.set(TEBEX_CONFIG.cookies.basketId, basket.ident, {
        httpOnly: true,
        secure: isHttps,
        sameSite: "lax",
        path: "/",
        maxAge: TEBEX_CONFIG.cookies.maxAge,
    });

    return basket;
}

export async function getBasketOrNull(): Promise<TebexBasket | null> {
    const cookieStore = await cookies();
    const existingId = cookieStore.get(TEBEX_CONFIG.cookies.basketId)?.value;

    if (!existingId) return null;

    try {
        const basket = await tebexBasketService.getBasket(existingId);
        if (!basket) {
            await safeDeleteCookie(TEBEX_CONFIG.cookies.basketId);
            return null;
        }
        return basket;
    } catch {
        await safeDeleteCookie(TEBEX_CONFIG.cookies.basketId);
        return null;
    }
}

export async function clearBasket(): Promise<void> {
    await safeDeleteCookie(TEBEX_CONFIG.cookies.basketId);
}

export async function addPackageToBasket(
    packageId: number,
    quantity = 1,
    basketIdent?: string
): Promise<TebexBasket> {
    const cookieStore = await cookies();
    const existingId = basketIdent || cookieStore.get(TEBEX_CONFIG.cookies.basketId)?.value;

    if (existingId) {
        try {
            return await tebexBasketService.addPackageToBasket(existingId, packageId, quantity);
        } catch {
            // If the basket expired or is invalid on Tebex, fall through to create a fresh one
        }
    }

    const newBasket = await createBasket();
    return tebexBasketService.addPackageToBasket(newBasket.ident, packageId, quantity);
}

export async function removePackageFromBasket(packageId: number): Promise<TebexBasket> {
    const basket = await getRequiredBasket();
    return tebexBasketService.removePackageFromBasket(basket.ident, packageId);
}

export async function updatePackageQuantity(packageId: number, quantity: number): Promise<TebexBasket> {
    const basket = await getRequiredBasket();

    if (quantity <= 0) {
        return tebexBasketService.removePackageFromBasket(basket.ident, packageId);
    }

    return tebexBasketService.updatePackageQuantity(basket.ident, packageId, quantity);
}

export async function applyCouponToBasket(code: string): Promise<TebexBasket> {
    const basket = await getRequiredBasket();
    return tebexBasketService.applyCoupon(basket.ident, code);
}

export async function removeCouponFromBasket(couponId: number): Promise<TebexBasket> {
    const basket = await getRequiredBasket();
    return tebexBasketService.removeCoupon(basket.ident, couponId);
}

export async function applyCreatorCodeToBasket(creatorCode: string): Promise<TebexBasket> {
    const basket = await getRequiredBasket();
    return tebexBasketService.applyCreatorCode(basket.ident, creatorCode);
}

export async function removeCreatorCodeFromBasket(): Promise<TebexBasket> {
    const basket = await getRequiredBasket();
    return tebexBasketService.removeCreatorCode(basket.ident);
}

export async function getAuthUrl(returnUrl: string): Promise<string> {
    const baseUrl = await getBaseUrl();
    const safeReturnUrl = sanitizeRedirectUrl(returnUrl, baseUrl);

    let basket = await getBasketOrNull();
    if (!basket) {
        basket = await createBasket(safeReturnUrl);
    }

    return tebexBasketService.getAuthUrl(basket.ident, safeReturnUrl);
}

export async function migrateBasketWithDiscord(
    discordId: string,
    returnUrl?: string
): Promise<{ success: boolean; basket?: TebexBasket; authUrl?: string | null; error?: string }> {
    try {
        const baseUrl = await getBaseUrl();
        const actualReturnUrl = sanitizeRedirectUrl(returnUrl, baseUrl);

        const basket = await createBasket(actualReturnUrl, undefined, { discord_id: discordId });
        const authUrl = await getAuthUrl(actualReturnUrl);

        return { success: true, basket, authUrl };
    } catch (err: unknown) {
        const errorMsg = err instanceof Error ? err.message : "Failed to update basket with Discord";
        console.error("Exception in migrateBasketWithDiscord:", err);
        return { success: false, error: errorMsg };
    }
}
