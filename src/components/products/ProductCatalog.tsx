"use client";
import ProductSearch from "@/components/products/ProductSearch"
import ProductSort from "@/components/products/ProductSort"
import ProductGrid from "@/components/products/ProductGrid"
import { useProductFilters } from "@/hooks/useProductFilters"
import type { Product } from "@/types/tebex"

interface ProductCatalogProps {
    title: string
    products: Product[]
    searchPlaceholder?: string
    emptyStateTitle?: string
}

export default function ProductCatalog({
    title,
    products,
    searchPlaceholder,
    emptyStateTitle,
}: ProductCatalogProps) {
    const defaultPlaceholder = searchPlaceholder ?? `Search ${title.toLowerCase()}...`
    const defaultEmptyTitle = emptyStateTitle ?? `No ${title.toLowerCase()} found in this category`

    const { search, setSearch, sortBy, setSortBy, processedProducts } = useProductFilters(products);

    return (
        <>
            <h1 className="text-3xl sm:text-4xl font-bold mb-6">{title}</h1>

            <div className="flex flex-col md:flex-row gap-3 mb-8">
                <ProductSearch
                    value={search}
                    onChange={setSearch}
                    placeholder={defaultPlaceholder}
                />
                <ProductSort value={sortBy} onChange={setSortBy} />
            </div>

            <ProductGrid
                products={processedProducts}
                emptyMessage={defaultEmptyTitle}
            />
        </>
    )
}
