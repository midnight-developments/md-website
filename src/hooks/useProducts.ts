import { useQuery } from "@tanstack/react-query"
import { scripts, bundles } from "@/data/products"
import type { Product } from "@/data/products"

const fetchProducts = async (): Promise<Product[]> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve([...scripts, ...bundles])
        }, 500)
    })
}

export function useProducts() {
    return useQuery({
        queryKey: ["products"],
        queryFn: fetchProducts,
    })
}
