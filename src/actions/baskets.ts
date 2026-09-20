"use server";

import { cookies, headers } from "next/headers";
import { TEBEX_CONFIG } from "@/config/tebex";
import type {
    TebexBasket,
    TebexBasketCustomData,
} from "@/types/tebex";
import * as tebexBasketService from "@/services/tebex/baskets";

async function getBaseUrl(): Promise<string> {
    const host = (await headers()).get("host") || "localhost:3000";
    const protocol = process.env.NODE_ENV === "production" ? "https" : "http";
    return `${protocol}://${host}`;
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
    const completeUrl = returnUrl || baseUrl;
    const fallbackCancelUrl = cancelUrl || baseUrl;

    const basket = await tebexBasketService.createBasket(completeUrl, fallbackCancelUrl, custom);

    const cookieStore = await cookies();
    cookieStore.set(TEBEX_CONFIG.cookies.basketId, basket.ident, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
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
        return basket || null;
    } catch {
        return null;
    }
}

export async function clearBasket(): Promise<void> {
    const cookieStore = await cookies();
    cookieStore.delete(TEBEX_CONFIG.cookies.basketId);
}

export async function addPackageToBasket(
    packageId: number,
    quantity = 1,
    basketIdent?: string
): Promise<TebexBasket> {
    const cookieStore = await cookies();
    const existingId = basketIdent || cookieStore.get(TEBEX_CONFIG.cookies.basketId)?.value;
    let basket = existingId ? await tebexBasketService.getBasket(existingId) : null;

    if (!basket) {
        basket = await createBasket();
    }

    return tebexBasketService.addPackageToBasket(basket.ident, packageId, quantity);
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
    let basket = await getBasketOrNull();
    if (!basket) {
        basket = await createBasket(returnUrl);
    }

    return tebexBasketService.getAuthUrl(basket.ident, returnUrl);
}

export async function migrateBasketWithDiscord(
    discordId: string,
    returnUrl?: string
): Promise<{ basket: TebexBasket; authUrl: string | null }> {
    const baseUrl = await getBaseUrl();
    const actualReturnUrl = returnUrl || baseUrl;

    const basket = await createBasket(actualReturnUrl, undefined, { discord_id: discordId });
    const authUrl = await getAuthUrl(actualReturnUrl);
    const finalBasketBeforeAuth = (await tebexBasketService.getBasket(basket.ident)) || basket;

    return { basket: finalBasketBeforeAuth, authUrl };
}
