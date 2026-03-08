import ProductsLayout from "@/components/products/ProductsLayout"
import { getBundles } from "@/services/tebex/products"

export default async function BundlesPage() {
    const bundles = await getBundles();

    return (
        <ProductsLayout
            title="Bundles"
            products={bundles}
            searchPlaceholder="Search bundles..."
            emptyStateTitle="No bundles found in this category"
        />
    )
}
