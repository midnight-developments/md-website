import ProductsLayout from "@/components/products/ProductsLayout"
import { getScripts } from "@/services/tebex/products"

export default async function ScriptsPage() {
    const scripts = await getScripts();

    return (
        <ProductsLayout
            title="Scripts"
            products={scripts}
            searchPlaceholder="Search scripts..."
            emptyStateTitle="No scripts found in this category"
        />
    )
}
