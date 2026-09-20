import { notFound } from "next/navigation"
import { getProductByIdOrSlug, getScripts } from "@/services/tebex/products"
import ProductDetailLayout from "@/components/product/ProductDetailLayout"

interface PageProps {
    params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
    try {
        const scripts = await getScripts();
        return scripts.map((script) => ({
            slug: script.slug,
        }));
    } catch {
        return [];
    }
}

export default async function ProductDetailPage({ params }: PageProps) {
    const { slug } = await params;
    const product = await getProductByIdOrSlug(slug);

    if (!product) {
        notFound();
    }

    return <ProductDetailLayout product={product} />
}