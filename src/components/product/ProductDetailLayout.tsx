import { Product } from "@/services/tebex/products";
import ProductGallery from "./ProductGallery";
import ProductInformation from "./ProductInformation";
import ProductFeatureCard from "./ProductFeatureCard";
import AccentSeparator from "@/components/ui/accent-seperator";
import { parseTebexDescription } from "@/lib/utils";

export default function ProductDetailLayout({ product }: { product: Product }) {
    const parsedData = parseTebexDescription(product.description);
    const features = parsedData?.highlights || [];
    return (
        <div className="max-w-screen-2xl mx-auto px-6 lg:px-12 pt-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 ">
                <ProductGallery />
                <ProductInformation product={product} />
            </div>

            <AccentSeparator className="mt-20 mb-16 " />

            <h2 className="text-3xl sm:text-4xl font-bold text-center mb-8">
                The Cool Stuff
            </h2>

            {features.length > 0 && (
                <div className="flex flex-col gap-16">
                    {features.map((feature: any, i: number) => (
                        <ProductFeatureCard key={feature.name} feature={feature} index={i} />
                    ))}
                </div>
            )}
        </div>
    )
}
