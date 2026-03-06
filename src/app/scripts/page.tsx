import ProductsLayout from "@/components/products/ProductsLayout"
import { scripts } from "@/data/products"

export default function ScriptsPage() {
    return (
        <ProductsLayout
            title="Scripts"
            products={scripts}
            searchPlaceholder="Search scripts..."
            emptyStateTitle="No scripts found"
        />
    )
}
