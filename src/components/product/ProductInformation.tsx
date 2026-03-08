"use client";
import { BookOpen } from "lucide-react"
import * as LucideIcons from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Product } from "@/services/tebex/products"
import { parseTebexDescription, cn } from "@/lib/utils"
import AddToCartButton from "@/components/products/AddToCartButton"

export default function ProductInformation({ product }: { product: Product }) {
    const parsedData = parseTebexDescription(product.description)

    return (
        <div className=" flex flex-col gap-4 relative">
            <div className="flex flex-col gap-3">
                <div className="flex flex-wrap gap-1.5">
                    {(parsedData?.tags || []).map((tag: string) => (
                        <Badge
                            key={tag}
                            size="md"
                            variant={tag.toLowerCase() as any}
                        >
                            {tag.toUpperCase()}
                        </Badge>
                    ))}
                </div>

                <div className="flex flex-col gap-0.75">
                    <h1 className="text-4xl sm:text-[2.625rem] font-semibold">{product.name}</h1>
                    <p className="text-3xl sm:text-[2rem] font-bold text-accent">${product.base_price.toFixed(2)}</p>
                </div>
            </div>

            <p className="text-[1.05rem] text-muted-foreground leading-normal">{parsedData?.about || ""}</p>

            {(parsedData?.requirements && parsedData.requirements.length > 0) && (
                <div className="flex flex-col gap-2 mt-2">
                    <p className="uppercase tracking-wide text-muted-foreground text-sm font-bold ">REQUIREMENTS</p>
                    <div className="flex flex-wrap gap-2">
                        {parsedData.requirements.map((req: any, index: number) => {
                            const IconComponent = (LucideIcons as any)[req.icon]

                            const badgeContent = (
                                <>
                                    {IconComponent && <IconComponent className="w-3.5 h-3.5 mr-1.5" />}
                                    {req.label}
                                </>
                            )

                            if (req.link) {
                                return (
                                    <a
                                        key={index}
                                        href={req.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="group"
                                    >
                                        <Badge variant="outline" className="flex items-center group-hover:underline underline-offset-2">
                                            {badgeContent}
                                        </Badge>
                                    </a>
                                )
                            }

                            return (
                                <Badge key={index} variant="outline" className="flex items-center">
                                    {badgeContent}
                                </Badge>
                            )
                        })}
                    </div>
                </div>
            )}

            <div className="flex flex-wrap gap-3 lg:absolute lg:bottom-0 lg:w-full mt-4 lg:mt-0">
                <AddToCartButton
                    product={product}
                    className="py-3 text-lg gap-4 font-normal"
                />
                <Button variant="outline" className="w-full py-3 text-lg gap-4 font-normal" asChild>
                    <a href="https://midnight-dev.gitbook.io/midnight-dev/" target="_blank" rel="noopener noreferrer">
                        <BookOpen className="size-5!" />
                        Documentation
                    </a>
                </Button>
            </div>
        </div>
    )
}
