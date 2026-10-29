import "server-only";
import { tebexFetch, getTebexToken } from "./client";
import { TEBEX_CONFIG } from "@/config/tebex";
import type { Product } from "@/types/tebex";

export async function getAllProducts(): Promise<Product[]> {
    const token = getTebexToken();
    try {
        const products = await tebexFetch<Product[]>(
            `/accounts/${token}/packages`,
            {
                next: {
                    revalidate: TEBEX_CONFIG.cache.revalidate,
                    tags: ["tebex-packages"],
                },
            },
            "Failed to fetch packages from Tebex"
        );
        return products || [];
    } catch (error) {
        console.error("Error fetching Tebex packages:", error);
        return [];
    }
}

export async function getProductByIdOrSlug(idOrSlug: number | string): Promise<Product | undefined> {
    const token = getTebexToken();
    try {
        return await tebexFetch<Product>(
            `/accounts/${token}/packages/${idOrSlug}`,
            {
                next: {
                    revalidate: TEBEX_CONFIG.cache.revalidate,
                    tags: [`tebex-package-${idOrSlug}`, "tebex-packages"],
                },
            },
            `Failed to fetch package ${idOrSlug}`
        );
    } catch (error) {
        console.error(`Error fetching package ${idOrSlug}:`, error);
        return undefined;
    }
}

export async function getProductsByCategory(categoryId: number | string): Promise<Product[]> {
    const token = getTebexToken();
    try {
        const categoryData = await tebexFetch<{ packages?: Product[] }>(
            `/accounts/${token}/categories/${categoryId}?includePackages=1`,
            {
                next: {
                    revalidate: TEBEX_CONFIG.cache.revalidate,
                    tags: [`tebex-category-${categoryId}`, "tebex-packages"],
                },
            },
            `Failed to fetch category ${categoryId}`
        );
        return categoryData?.packages || [];
    } catch (error) {
        console.error(`Error fetching category ${categoryId}:`, error);
        return [];
    }
}

export async function getBundles(): Promise<Product[]> {
    return getProductsByCategory(TEBEX_CONFIG.categoryIds.bundles);
}

export async function getScripts(): Promise<Product[]> {
    return getProductsByCategory(TEBEX_CONFIG.categoryIds.scripts);
}

export async function getFeaturedProducts(): Promise<Product[]> {
    const allProducts = await getAllProducts();
    const idSet = new Set<number>(TEBEX_CONFIG.featuredProductIds);
    const featured = allProducts.filter((p) => idSet.has(p.id));

    // Fallback to direct ID fetches only if getAllProducts() did not contain all featured IDs
    if (featured.length === TEBEX_CONFIG.featuredProductIds.length) {
        return featured;
    }

    const promises = TEBEX_CONFIG.featuredProductIds.map((id) => getProductByIdOrSlug(id));
    const results = await Promise.all(promises);
    return results.filter((p): p is Product => p !== undefined);
}
