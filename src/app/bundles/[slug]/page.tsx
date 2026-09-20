import { notFound } from "next/navigation"
import { getProductByIdOrSlug, getBundles } from "@/services/tebex/products"
import ProductDetailLayout from "@/components/product/ProductDetailLayout"

interface PageProps {
    params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
    try {
        const bundles = await getBundles();
        return bundles.map((bundle) => ({
            slug: bundle.slug,
        }));
    } catch {
        return [];
    }
}

export default async function BundleDetailPage({ params }: PageProps) {
    const { slug } = await params;
    const product = await getProductByIdOrSlug(slug);

    if (!product) {
        notFound();
    }

    return <ProductDetailLayout product={product} />
}
