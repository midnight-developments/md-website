import 'server-only';

const TEBEX_TOKEN = process.env.TEBEX_PUBLIC_KEY;

const FEATURED_PRODUCT_IDS = [6803877, 6512955, 6553764];
const SCRIPTS_CATEGORY_ID = 2780998;
const BUNDLES_CATEGORY_ID = 2781001;

export interface TebexCategory {
    id: number;
    name: string;
}

export interface TebexMedia {
    type: string;
    name: string;
    url: string;
    primary: boolean;
}

export interface Product {
    id: number;
    name: string;
    slug: string;
    description: string;
    image: string;
    media: TebexMedia[];
    type: string;
    category: TebexCategory;
    base_price: number;
    sales_tax: number;
    total_price: number;
    currency: string;
    discount: number;
    disable_quantity: boolean;
    disable_gifting: boolean;
    expiration_date: string | null;
    user_limit: number | null;
    created_at: string;
    updated_at: string;
    order: number;
}

export interface ParsedDescription {
    about?: string;
    tags?: string[];
    video?: string;
    docs?: string;
    highlights?: Array<{
        name: string;
        content: string;
    }>;
    requirements?: Array<{
        icon: string;
        label: string;
        link?: string;
    }>;
}

export async function getProductBySlug(slug: string): Promise<Product | undefined> {
    const allProducts = await getAllProducts();
    return allProducts.find((p) => p.slug === slug);
}

export async function getProductById(id: number): Promise<Product | undefined> {
    const url = `https://headless.tebex.io/api/accounts/${TEBEX_TOKEN}/packages/${id}`;

    const res = await fetch(url, { next: { revalidate: 3600 } });
    if (res.ok) {
        const data = await res.json();
        return data.data;
    }
    return undefined;
}

export async function getProductsByCategory(categoryId: number | string): Promise<Product[]> {
    const url = `https://headless.tebex.io/api/accounts/${TEBEX_TOKEN}/categories/${categoryId}?includePackages=1`;

    const res = await fetch(url, { next: { revalidate: 3600 } });
    if (res.ok) {
        const data = await res.json();
        return data.data?.packages || [];
    }
    return [];
}

export async function getAllProducts(): Promise<Product[]> {
    const url = `https://headless.tebex.io/api/accounts/${TEBEX_TOKEN}/packages`;

    const res = await fetch(url, { next: { revalidate: 3600 } });
    if (res.ok) {
        const data = await res.json();
        return data.data || [];
    }
    return [];
}

export async function getBundles(): Promise<Product[]> {
    return getProductsByCategory(BUNDLES_CATEGORY_ID);
}

export async function getScripts(): Promise<Product[]> {
    return getProductsByCategory(SCRIPTS_CATEGORY_ID);
}

export async function getFeaturedProducts(): Promise<Product[]> {
    const promises = FEATURED_PRODUCT_IDS.map((id) => getProductById(id));
    const results = await Promise.all(promises);
    return results.filter((p): p is Product => p !== undefined);
}
