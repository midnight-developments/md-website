import ProductCard from "@/components/products/ProductCard"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
} from "@/components/ui/carousel"
import { getFeaturedProducts } from "@/services/tebex/products"

export default async function FeaturedProducts() {
    const featured = await getFeaturedProducts();

    return (
        <Carousel
            opts={{ align: "start", loop: true }}
            className="w-full"
        >
            <CarouselContent>
                {featured.map((product) => (
                    <CarouselItem key={product.id} className="md:basis-1/2 lg:basis-1/3">
                        <ProductCard product={product} />
                    </CarouselItem>
                ))}
            </CarouselContent>
        </Carousel>
    )
}
