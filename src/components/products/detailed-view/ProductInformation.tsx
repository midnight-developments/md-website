"use client";
import { BookOpen } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import type { Product } from "@/types/tebex"
import { useCurrency } from "@/context/CurrencyContext"
import AddToCartButton from "@/components/products/AddToCartButton"

export default function ProductInformation({ product }: { product: Product }) {
    const { formatPrice } = useCurrency()

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

            {product.description && (
                <div className="flex flex-col gap-2 pt-2 border-t border-border/50">
                    <h2 className="text-sm uppercase tracking-wider font-semibold text-muted-foreground">
                        Description
                    </h2>
                    <div
                        className="text-[1.05rem] text-muted-foreground leading-relaxed [&_p]:mb-3 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:mb-3 [&_ol]:list-decimal [&_ol]:pl-5 [&_ol]:mb-3 [&_li]:mb-1 [&_a]:text-accent [&_a]:underline [&_strong]:text-foreground [&_h1]:text-2xl [&_h1]:font-bold [&_h1]:text-foreground [&_h1]:mt-5 [&_h1]:mb-2 [&_h2]:text-xl [&_h2]:font-bold [&_h2]:text-foreground [&_h2]:mt-4 [&_h2]:mb-2 [&_h3]:text-lg [&_h3]:font-semibold [&_h3]:text-foreground [&_h3]:mt-3 [&_h3]:mb-1"
                        dangerouslySetInnerHTML={{ __html: product.description }}
                    />
                </div>
            )}
        </div>
    )
}
