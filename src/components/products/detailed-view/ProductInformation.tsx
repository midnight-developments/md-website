"use client";
import { BookOpen } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import type { Product } from "@/types/tebex"
import { useFormatPrice } from "@/stores/useCurrencyStore"
import AddToCartButton from "@/components/products/AddToCartButton"

export default function ProductInformation({ product }: { product: Product }) {
    const formatPrice = useFormatPrice()

    return (
        <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-3">
                {product.category?.name && (
                    <div className="flex flex-wrap gap-1.5">
                        <Badge variant="secondary" size="md">
                            {product.category.name}
                        </Badge>
                    </div>
                )}

                <div className="flex flex-col gap-1">
                    <h1 className="text-4xl sm:text-[2.625rem] font-semibold uppercase tracking-[-0.02em]">
                        {product.name}
                    </h1>
                    <p className="text-3xl sm:text-[2rem] font-bold text-accent">
                        {formatPrice(product.base_price)}
                    </p>
                </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
                <AddToCartButton
                    product={product}
                    className="py-3 text-lg gap-4 font-normal flex-1"
                />
                <Button variant="outline" className="py-3 text-lg gap-4 font-normal flex-1" asChild>
                    <a href="https://midnight-dev.gitbook.io/midnight-dev/" target="_blank" rel="noopener noreferrer">
                        <BookOpen className="size-5!" />
                        Documentation
                    </a>
                </Button>
            </div>


        </div>
    )
}
