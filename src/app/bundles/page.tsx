"use client";
import ProductsLayout from "@/components/products/ProductsLayout"
import { bundles } from "@/data/products"

export default function BundlesPage() {
    return (
        <ProductsLayout
            title="Bundles"
            products={bundles}
            searchPlaceholder="Search bundles..."
            emptyStateTitle="No bundles found"
        />
    )
}
