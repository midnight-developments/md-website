"use client";
import Link from "next/link"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { parseTebexDescription, cn } from "@/lib/utils"
import type { Product } from "@/services/tebex/products"
import AddToCartButton from "./AddToCartButton"

interface ProductCardProps {
    product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
    const parsedData = parseTebexDescription(product.description);

    const isBundle = product.category?.name?.toLowerCase().includes("bundle")
    const detailPath = isBundle
        ? `/bundles/${product.slug}`
        : `/scripts/${product.slug}`

    const primaryImage = product.media?.find((m) => m.primary)?.url || product.image;

    return (
        <div
            className="relative backdrop-blur-xl bg-card-bg border-2 border-card/50 rounded-md overflow-hidden group hover:border-accent transition-colors duration-300"
        >
            <Link href={detailPath}>
                <div className="aspect-video bg-white/[0.03] flex items-center justify-center text-muted-foreground text-sm cursor-pointer group-hover:bg-white/[0.05] transition-colors overflow-hidden">
                    {primaryImage ? (
                        <img
                            src={primaryImage}
                            alt={product.name}
                            className="w-full h-full object-cover transition-all duration-500 group-hover:scale-[1.03] hue-rotate-[230deg] "
                            loading="lazy"
                        />
                    ) : (
                        <span className="text-xs tracking-widest uppercase opacity-40">No Primary Image Found</span>
                    )}
                </div>

                <div className="p-4.5 flex flex-col gap-2.5">
                    <div className="flex flex-wrap gap-1.5 -ml-0.25">
                        {(parsedData?.tags || [])
                            .filter((tag: string) => ["qbcore", "qbox", "esx", "standalone"].includes(tag.toLowerCase()))
                            .map((tag: string) => (
                                <Badge
                                    key={tag}
                                    variant={tag.toLowerCase() as "qbcore" | "qbox" | "esx" | "standalone"}
                                    size="sm"
                                >
                                    {tag.toUpperCase()}
                                </Badge>
                            ))}
                    </div>

                    <div className="mb-2 flex flex-col gap-0.75 ">
                        <div className="flex items-center justify-between text-lg">
                            <p className="font-semibold text-primary-foreground uppercase transition-colors truncate">
                                {product.name}
                            </p>
                            <Label variant="price">
                                ${product.base_price.toFixed(2)}
                            </Label>
                        </div>
                        <p className="text-[0.9rem] font-light text-secondary-foreground max-w-2xs line-clamp-2 leading-[1.35]">
                            {parsedData?.about || ""}
                        </p>
                    </div>

                    <AddToCartButton product={product} />
                </div>
            </Link>

        </div>
    )
}
