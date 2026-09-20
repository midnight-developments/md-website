"use client";
import ProductSearch from "@/components/products/ProductSearch"
import ProductSort from "@/components/products/ProductSort"
import ProductGrid from "@/components/products/ProductGrid"
import { useProductFilters } from "@/hooks/useProductFilters"
import type { Product } from "@/types/tebex"

interface ProductsLayoutProps {
    title: string
    products: Product[]
    searchPlaceholder: string
    emptyStateTitle: string
}

export default function ProductsLayout({
    title,
    products,
    searchPlaceholder,
    emptyStateTitle,
}: ProductsLayoutProps) {
    const { search, setSearch, sortBy, setSortBy, processedProducts } = useProductFilters(products);

    return (
        <div className="max-w-screen-2xl mx-auto px-6 lg:px-12 pt-8 lg:pt-12 min-h-[calc(100vh-16rem)]">
            <h1 className="text-3xl sm:text-4xl font-bold mb-6">{title}</h1>

            <div className="flex flex-col md:flex-row gap-3 mb-8">
                <ProductSearch
                    value={search}
                    onChange={setSearch}
                    placeholder={searchPlaceholder}
                />
                <ProductSort value={sortBy} onChange={setSortBy} />
            </div>

            <ProductGrid
                products={processedProducts}
                emptyMessage={emptyStateTitle}
            />
        </div>
    )
}
