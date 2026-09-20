import "server-only";
import { tebexFetch, getTebexToken } from "./client";
import type {
    TebexBasket,
    TebexBasketCustomData,
    TebexAuthLink,
} from "@/types/tebex";

export async function createBasket(
    completeUrl: string,
    cancelUrl: string,
    custom: TebexBasketCustomData = {}
): Promise<TebexBasket> {
    const token = getTebexToken();
    return tebexFetch<TebexBasket>(
        `/accounts/${token}/baskets`,
        {
            method: "POST",
            body: JSON.stringify({
                complete_url: completeUrl,
                cancel_url: cancelUrl,
                complete_auto_redirect: true,
                custom,
            }),
        },
        "Failed to create Tebex basket"
    );
}

export async function getBasket(basketIdent: string): Promise<TebexBasket | null> {
    const token = getTebexToken();
    try {
        return await tebexFetch<TebexBasket>(
            `/accounts/${token}/baskets/${basketIdent}`,
            { cache: "no-store" },
            "Failed to fetch basket"
        );
    } catch {
        return null;
    }
}

export async function addPackageToBasket(
    basketIdent: string,
    packageId: number,
    quantity = 1
): Promise<TebexBasket> {
    return tebexFetch<TebexBasket>(
        `/baskets/${basketIdent}/packages`,
        {
            method: "POST",
            body: JSON.stringify({
                package_id: packageId,
                quantity,
            }),
        },
        "Failed to add package to basket"
    );
}

export async function removePackageFromBasket(
    basketIdent: string,
    packageId: number
): Promise<TebexBasket> {
    return tebexFetch<TebexBasket>(
        `/baskets/${basketIdent}/packages/remove`,
        {
            method: "POST",
            body: JSON.stringify({
                package_id: packageId,
            }),
        },
        "Failed to remove package from basket"
    );
}

export async function updatePackageQuantity(
    basketIdent: string,
    packageId: number,
    quantity: number
): Promise<TebexBasket> {
    return tebexFetch<TebexBasket>(
        `/baskets/${basketIdent}/packages/${packageId}`,
        {
            method: "PUT",
            body: JSON.stringify({ quantity }),
        },
        "Failed to update package quantity"
    );
}

export async function applyCoupon(
    basketIdent: string,
    code: string
): Promise<TebexBasket> {
    return tebexFetch<TebexBasket>(
        `/baskets/${basketIdent}/coupons`,
        {
            method: "POST",
            body: JSON.stringify({ coupon_code: code }),
        },
        "Failed to apply coupon"
    );
}

export async function removeCoupon(
    basketIdent: string,
    couponId: number
): Promise<TebexBasket> {
    return tebexFetch<TebexBasket>(
        `/baskets/${basketIdent}/coupons/remove`,
        {
            method: "POST",
            body: JSON.stringify({ coupon_id: couponId }),
        },
        "Failed to remove coupon"
    );
}

export async function applyCreatorCode(
    basketIdent: string,
    creatorCode: string
): Promise<TebexBasket> {
    return tebexFetch<TebexBasket>(
        `/baskets/${basketIdent}/creator-codes`,
        {
            method: "POST",
            body: JSON.stringify({ creator_code: creatorCode }),
        },
        "Failed to apply creator code"
    );
}

export async function removeCreatorCode(
    basketIdent: string
): Promise<TebexBasket> {
    return tebexFetch<TebexBasket>(
        `/baskets/${basketIdent}/creator-codes/remove`,
        {
            method: "POST",
        },
        "Failed to remove creator code"
    );
}

export async function getAuthUrl(
    basketIdent: string,
    returnUrl: string
): Promise<string> {
    const token = getTebexToken();
    const links = await tebexFetch<TebexAuthLink[]>(
        `/accounts/${token}/baskets/${basketIdent}/auth?returnUrl=${encodeURIComponent(returnUrl)}`,
        { cache: "no-store" },
        "Failed to get auth URL"
    );
    return links[0]?.url || "";
}
