"use server";

import { cookies, headers } from "next/headers";

const BASKET_COOKIE_NAME = "tebex_basket_id";

export interface TebexBasketPackage {
    id: number;
    name: string;
    slug: string;
    description: string;
    image: string | null;
    in_basket: {
        quantity: number;
        price: number;
        gift_username_id: number | string | null;
        gift_username: string | null;
    };
}

export interface TebexBasket {
    ident: string;
    complete: boolean;
    id: number;
    username_id: string | number;
    username: string;
    base_price: number;
    sales_tax: number;
    total_price: number;
    currency: string;
    packages: TebexBasketPackage[];
    links: {
        checkout: string;
    };
}

const TEBEX_TOKEN = process.env.TEBEX_PUBLIC_KEY;

export async function handleTebexError(response: Response, defaultMessage: string) {
    if (response.ok) return;
    const errorData = await response.json().catch(() => ({}));
    const message = errorData.error_message || errorData.detail || defaultMessage;
    throw new Error(message);
}

export interface TebexAuthLink {
    name: string;
    url: string;
}

async function getBaseUrl() {
    const host = (await headers()).get("host");
    const protocol = process.env.NODE_ENV === "production" ? "https" : "http";
    return `${protocol}://${host}`;
}

export async function createBasket(returnUrl?: string, cancelUrl?: string, custom: Record<string, any> = {}): Promise<TebexBasket> {
    const baseUrl = await getBaseUrl();
    const response = await fetch(`https://headless.tebex.io/api/accounts/${TEBEX_TOKEN}/baskets`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            complete_url: returnUrl || baseUrl,
            cancel_url: cancelUrl || baseUrl,
            complete_auto_redirect: true,
            custom: custom
        }),
    });

    await handleTebexError(response, "Failed to create Tebex Basket");

    const data = await response.json();
    const basket = data.data as TebexBasket;

    const cookieStore = await cookies();
    cookieStore.set(BASKET_COOKIE_NAME, basket.ident, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 24 * 7,
    });

    return basket;
}

export async function getBasket(basketId: string): Promise<TebexBasket | null> {
    const response = await fetch(`https://headless.tebex.io/api/accounts/${TEBEX_TOKEN}/baskets/${basketId}`, {
        cache: "no-store",
    });

    if (!response.ok) return null;

    const data = await response.json();
    return data.data as TebexBasket;
}

export async function getBasketOrNull(): Promise<TebexBasket | null> {
    const cookieStore = await cookies();
    const existingId = cookieStore.get(BASKET_COOKIE_NAME)?.value;
    return existingId ? await getBasket(existingId) : null;
}

export async function clearBasket() {
    (await cookies()).delete(BASKET_COOKIE_NAME);
}

export async function addPackageToBasket(packageId: number, quantity: number = 1, basketIdent?: string): Promise<TebexBasket> {
    const existingId = basketIdent || (await cookies()).get(BASKET_COOKIE_NAME)?.value;
    let basket = existingId ? await getBasket(existingId) : null;

    if (!basket) {
        basket = await createBasket();
    }

    const response = await fetch(`https://headless.tebex.io/api/baskets/${basket.ident}/packages`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            package_id: packageId,
            quantity: quantity,
        }),
    });

    await handleTebexError(response, "Failed to add package to basket");

    const data = await response.json();
    return data.data as TebexBasket;
}

export async function removePackageFromBasket(packageId: number): Promise<TebexBasket> {
    const basket = await getBasketOrNull();
    if (!basket) throw new Error("No basket found to remove from");

    const response = await fetch(`https://headless.tebex.io/api/baskets/${basket.ident}/packages/remove`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            package_id: packageId,
        }),
    });

    await handleTebexError(response, "Failed to remove package from basket");

    const data = await response.json();
    return data.data as TebexBasket;
}

export async function getAuthUrl(returnUrl: string): Promise<string> {
    let basket = await getBasketOrNull();
    if (!basket) {
        basket = await createBasket(returnUrl);
    }

    const response = await fetch(`https://headless.tebex.io/api/accounts/${TEBEX_TOKEN}/baskets/${basket.ident}/auth?returnUrl=${encodeURIComponent(returnUrl)}`, {
        cache: "no-store",
    });

    await handleTebexError(response, "Failed to get auth URL");

    const data = await response.json() as TebexAuthLink[];
    return data[0]?.url || "";
}

export async function refreshBasket(returnUrl?: string, custom: Record<string, any> = {}): Promise<{ basket: TebexBasket; authUrl: string | null }> {
    const baseUrl = await getBaseUrl();
    const actualReturnUrl = returnUrl || baseUrl;

    const basket = await createBasket(actualReturnUrl, undefined, custom);

    const authUrl = await getAuthUrl(actualReturnUrl);
    const finalBasketBeforeAuth = await getBasket(basket.ident) || basket;

    return { basket: finalBasketBeforeAuth, authUrl };
}

export async function migrateBasketWithDiscord(discordId: string, returnUrl?: string): Promise<{ basket: TebexBasket; authUrl: string | null }> {
    return refreshBasket(returnUrl, { discord_id: discordId });
}
