import { useState, useMemo } from "react"
import type { Product } from "@/types/tebex"
import { stripHtml } from "@/lib/utils"

export const SortType = {
    Default: "default",
    NameAsc: "name-asc",
    NameDesc: "name-desc",
    PriceAsc: "price-asc",
    PriceDesc: "price-desc",
} as const

export type SortType = (typeof SortType)[keyof typeof SortType]

export function useProductFilters(products: Product[]) {
    const [search, setSearch] = useState("")
    const [sortBy, setSortBy] = useState<SortType>(SortType.Default)

    const indexedProducts = useMemo(() => {
        return products.map((product) => ({
            product,
            searchText: `${product.name} ${stripHtml(product.description)}`.toLowerCase(),
        }));
    }, [products]);

    const processedProducts = useMemo(() => {
        const query = search.trim().toLowerCase();

        const filtered = query
            ? indexedProducts
                .filter((item) => item.searchText.includes(query))
                .map((item) => item.product)
            : [...products];

        if (sortBy === SortType.NameAsc) {
            filtered.sort((a, b) => a.name.localeCompare(b.name));
        } else if (sortBy === SortType.NameDesc) {
            filtered.sort((a, b) => b.name.localeCompare(a.name));
        } else if (sortBy === SortType.PriceAsc) {
            filtered.sort((a, b) => a.base_price - b.base_price);
        } else if (sortBy === SortType.PriceDesc) {
            filtered.sort((a, b) => b.base_price - a.base_price);
        }

        return filtered;
    }, [products, indexedProducts, search, sortBy]);

    return {
        search,
        setSearch,
        sortBy,
        setSortBy,
        processedProducts,
    }
}
