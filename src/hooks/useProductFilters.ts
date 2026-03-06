import { useState, useMemo } from "react"
import type { Product } from "@/data/products"

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

    const processedProducts = useMemo(() => {
        let result = products.filter((p) => {
            const matchSearch =
                p.name.toLowerCase().includes(search.toLowerCase()) ||
                p.shortDescription.toLowerCase().includes(search.toLowerCase())
            return matchSearch
        })

        if (sortBy === SortType.NameAsc) {
            result.sort((a, b) => a.name.localeCompare(b.name))
        } else if (sortBy === SortType.NameDesc) {
            result.sort((a, b) => b.name.localeCompare(a.name))
        } else if (sortBy === SortType.PriceAsc) {
            result.sort((a, b) => a.price - b.price)
        } else if (sortBy === SortType.PriceDesc) {
            result.sort((a, b) => b.price - a.price)
        }

        return result
    }, [products, search, sortBy])

    return {
        search,
        setSearch,
        sortBy,
        setSortBy,
        processedProducts,
    }
}
