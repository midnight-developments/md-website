import ProductCatalog from "@/components/products/ProductCatalog"
import { getScripts } from "@/services/tebex/products"

export default async function ScriptsPage() {
    const scripts = await getScripts();

    return <ProductCatalog title="Scripts" products={scripts} />
}
