"use client";
import ProductCard from "@/components/products/ProductCard"
import type { Product } from "@/types/tebex"

interface ProductGridProps {
    products: Product[]
    emptyMessage?: string
}

export default function ProductGrid({ products, emptyMessage = "No products found." }: ProductGridProps) {
    return (
        <div className="w-full">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>

            {products.length === 0 && (
                <div className="text-center py-20 text-muted-foreground">
                    <p className="text-lg">{emptyMessage}</p>
                </div>
            )}
        </div>
    )
}
