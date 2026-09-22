import { notFound } from "next/navigation"
import { getProductByIdOrSlug, getScripts } from "@/services/tebex/products"
import ProductGallery from "@/components/products/detailed-view/ProductGallery"
import ProductInformation from "@/components/products/detailed-view/ProductInformation"

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

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <ProductGallery image={product.image} media={product.media} />
            <ProductInformation product={product} />
        </div>
    )
}