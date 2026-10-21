"use client";
import { BookOpen } from "lucide-react"
import { Button } from "@/components/ui/button"
import FrameworkBadges from "@/components/products/FrameworkBadges"
import type { Product } from "@/types/tebex"
import { useFormatPrice } from "@/stores/useCurrencyStore"
import AddToCartButton from "@/components/products/AddToCartButton"
import { stripHtml } from "@/lib/utils"
import ProductRequirementsCard from "./ProductRequirementsCard"

export default function ProductInformation({ product }: { product: Product }) {
    const formatPrice = useFormatPrice()

    return (
        <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-3">
                <FrameworkBadges product={product} />

                <div className="flex flex-col gap-1.5">
                    <h1 className="text-4xl sm:text-5xl font-bold  tracking-tight bg-foreground-gradient text-transparent bg-clip-text w-fit">
                        {product.name}
                    </h1>
                    <p className="text-3xl sm:text-4xl tracking-tight font-extrabold bg-accent-gradient text-transparent bg-clip-text">
                        {formatPrice(product.base_price)}
                    </p>
                </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
                <AddToCartButton
                    product={product}
                    className="h-12 text-lg gap-3 font-normal w-64"
                />
                <Button variant="outline" className="h-12 text-lg gap-3 font-normal w-64" asChild>
                    <a href="https://midnight-dev.gitbook.io/midnight-dev/" target="_blank" rel="noopener noreferrer">
                        <BookOpen className="size-5!" />
                        Documentation
                    </a>
                </Button>
            </div>

            {product.description && (
                <p className="pt-2 text-secondary-foreground text-base leading-relaxed whitespace-pre-line">
                    {stripHtml(product.description)}
                </p>
            )}

            <ProductRequirementsCard product={product} />
        </div>
    )
}
