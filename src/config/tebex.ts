export const TEBEX_CONFIG = {
    categoryIds: {
        scripts: 3450264,
        bundles: 2967560,
    },
    featuredProductIds: [7686314],
    cache: {
        revalidate: 3600, // 1 hour
    },
    cookies: {
        basketId: "tebex_basket_id",
        maxAge: 60 * 60 * 24 * 7, // 7 days
    },
} as const;
