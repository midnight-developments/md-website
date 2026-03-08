"use server";

import { cookies } from "next/headers";

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

export interface TebexAuthLink {
    name: string;
    url: string;
}

function getApiUrl(path: string) {
    const token = process.env.TEBEX_PUBLIC_KEY;
    if (!token) throw new Error("TEBEX_PUBLIC_KEY is not defined in environment variables");
    return `https://headless.tebex.io/api/accounts/${token}${path}`;
}

export async function createBasket(returnUrl?: string, cancelUrl?: string): Promise<TebexBasket> {
    const res = await fetch(getApiUrl("/baskets"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            complete_url: returnUrl || "http://localhost:3000",
            cancel_url: cancelUrl || "http://localhost:3000",
            complete_auto_redirect: true,
        }),
    });

    if (!res.ok) {
        throw new Error("Failed to create Tebex Basket");
    }

    const data = await res.json();
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
    const res = await fetch(getApiUrl(`/baskets/${basketId}`), {
        cache: "no-store",
    });

    if (!res.ok) {
        return null;
    }

    const data = await res.json();
    return data.data as TebexBasket;
}

export async function getBasketOrNull(): Promise<TebexBasket | null> {
    const cookieStore = await cookies();
    const existingId = cookieStore.get(BASKET_COOKIE_NAME)?.value;

    if (existingId) {
        return await getBasket(existingId);
    }

    return null;
}

export async function clearBasket() {
    const cookieStore = await cookies();
    cookieStore.delete(BASKET_COOKIE_NAME);
}

export async function addPackageToBasket(packageId: number, quantity: number = 1): Promise<TebexBasket> {
    let basket = await getBasketOrNull();
    if (!basket) {
        basket = await createBasket();
    }
    const res = await fetch(`https://headless.tebex.io/api/baskets/${basket.ident}/packages`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            package_id: packageId,
            quantity: quantity,
        }),
    });

    if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.detail);
    }

    const data = await res.json();
    return data.data as TebexBasket;
}

export async function removePackageFromBasket(packageId: number): Promise<TebexBasket> {
    const basket = await getBasketOrNull();
    if (!basket) throw new Error("No basket found to remove from");
    const res = await fetch(`https://headless.tebex.io/api/baskets/${basket.ident}/packages/remove`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            package_id: packageId,
        }),
    });

    if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.error_message || errorData.detail || "Failed to remove package from basket");
    }

    const data = await res.json();
    return data.data as TebexBasket;
}

export async function getAuthUrl(returnUrl: string): Promise<string> {
    let basket = await getBasketOrNull();
    if (!basket) {
        basket = await createBasket(returnUrl);
    }
    const res = await fetch(getApiUrl(`/baskets/${basket.ident}/auth?returnUrl=${encodeURIComponent(returnUrl)}`), {
        cache: "no-store",
    });

    if (!res.ok) {
        throw new Error("Failed to get auth URL");
    }

    const data = await res.json() as TebexAuthLink[];
    return data[0]?.url || "";
}


export async function refreshBasket(returnUrl: string = "http://localhost:3000"): Promise<{ basket: TebexBasket; authUrl: string | null }> {
    const oldBasket = await getBasketOrNull();
    const items = oldBasket?.packages.map(p => ({ id: p.id, qty: p.in_basket.quantity })) || [];

    let basket = await createBasket(returnUrl);

    for (const item of items) {
        await addPackageToBasket(item.id, item.qty);
    }

    const authUrl = await getAuthUrl(returnUrl);

    const finalBasketBeforeAuth = await getBasketOrNull() || basket;

    return { basket: finalBasketBeforeAuth, authUrl };
}