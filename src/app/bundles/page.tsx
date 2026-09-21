import ProductCatalog from "@/components/products/ProductCatalog"
import { getBundles } from "@/services/tebex/products"

export default async function BundlesPage() {
    const bundles = await getBundles();

    return <ProductCatalog title="Bundles" products={bundles} />
}
