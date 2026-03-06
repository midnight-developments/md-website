"use client";
import { useParams } from "next/navigation"
import { getProductBySlug } from "@/data/products"
import Link from "next/link";
import { Button } from "@/components/ui/button"
import ProductDetailLayout from "@/components/product/ProductDetailLayout"

export default function ProductDetailPage() {
    const { slug } = useParams<{ slug: string }>()
    const product = getProductBySlug(slug || "")

    if (!product) {
        return (
            <div className="pt-24 pb-16 min-h-[60vh] flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-bold mb-2">Product Not Found</h1>
                    <p className="text-muted-foreground mb-6">The product you're looking for doesn't exist.</p>
                    <Button variant="outline" asChild>
                        <Link href="/scripts">Back to Scripts</Link>
                    </Button>
                </div>
            </div>
        )
    }

    return <ProductDetailLayout product={product} />
}
