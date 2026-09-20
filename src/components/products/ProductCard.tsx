"use client";
import Link from "next/link"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { stripHtml } from "@/lib/utils"
import type { Product } from "@/types/tebex"
import { useCurrency } from "@/context/CurrencyContext"
import AddToCartButton from "./AddToCartButton"

interface ProductCardProps {
    product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
    const { formatPrice } = useCurrency();

    const isBundle = product.category?.name?.toLowerCase().includes("bundle")
    const detailPath = isBundle
        ? `/bundles/${product.slug}`
        : `/scripts/${product.slug}`

    const primaryImage = product.media?.find((m) => m.primary)?.url || product.image;

    return (
        <div
            className="relative flex flex-col h-full backdrop-blur-xl bg-card-bg border-2 border-card/50 rounded-md overflow-hidden group hover:border-accent transition-colors duration-300"
        >
            <Link href={detailPath} className="flex flex-col flex-1">
                <div className="relative aspect-video bg-white/[0.03] flex items-center justify-center text-muted-foreground text-sm cursor-pointer group-hover:bg-white/[0.05] transition-colors overflow-hidden">
                    {primaryImage ? (
                        <>
                            <Image
                                src={primaryImage}
                                alt={product.name}
                                fill
                                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                className="object-cover transition-all duration-500 ease-out group-hover:scale-[1.03]"
                            />
                            <div className="absolute top-0 bottom-0 left-0 w-[250%] -translate-x-[100%] bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 group-hover:translate-x-[150%] transition-transform duration-0 group-hover:duration-1000 group-hover:delay-150 ease-in-out z-10 pointer-events-none" />
                        </>
                    ) : (
                        <span className="text-xs tracking-widest uppercase opacity-40">No Primary Image Found</span>
                    )}
                </div>

                <div className="px-4.5 pt-4.5 pb-2.5 flex flex-col gap-2.5 flex-1">
                    {product.category?.name && (
                        <div className="flex flex-wrap gap-1.5 -ml-0.25">
                            <Badge variant="secondary" size="sm">
                                {product.category.name}
                            </Badge>
                        </div>
                    )}

                    <div className="mb-2 flex flex-col gap-0.75">
                        <div className="flex items-center justify-between text-lg">
                            <p className="font-semibold text-primary-foreground uppercase transition-colors truncate">
                                {product.name}
                            </p>
                            <p className="text-lg font-semibold text-accent-foreground whitespace-nowrap text-shadow-accent">
                                {formatPrice(product.base_price)}
                            </p>
                        </div>
                        <p className="text-[0.9rem] font-light text-secondary-foreground max-w-2xs line-clamp-2 leading-[1.35]">
                            {stripHtml(product.description)}
                        </p>
                    </div>
                </div>
            </Link>

            <div className="px-4.5 pb-4.5 mt-auto">
                <AddToCartButton product={product} />
            </div>
        </div>
    )
}
