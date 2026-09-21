import type { Product } from "@/types/tebex";
import ProductGallery from "./ProductGallery";
import ProductInformation from "./ProductInformation";

export default function ProductDetailView({ product }: { product: Product }) {
    return (
        <div className="max-w-screen-2xl mx-auto px-6 lg:px-12 pt-12 pb-24">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                <ProductGallery image={product.image} media={product.media} />
                <ProductInformation product={product} />
            </div>
        </div>
    )
}
