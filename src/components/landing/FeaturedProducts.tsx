"use client";
import Link from "next/link"
import { motion } from "framer-motion"
import { Sparkles, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import ProductCard from "@/components/products/ProductCard"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
} from "@/components/ui/carousel"
import type { Product } from "@/types/tebex"
import { itemVariants, containerVariants } from "../animation-variants"

export default function FeaturedProducts({ products }: { products: Product[] }) {
    return (
        <motion.section
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
        >
            <div className="flex flex-col gap-10 items-center justify-center">
                <motion.div variants={itemVariants} className="text-center">
                    <Badge className="mb-4">
                        <Sparkles className="h-3.5 w-3.5    " />
                        Our community's top picks
                    </Badge>
                    <h2 className="text-3xl sm:text-4xl font-bold">Featured Products</h2>
                </motion.div>

                <Carousel
                    opts={{ align: "start", loop: true }}
                    className="w-full"
                >
                    <CarouselContent>
                        {products.map((product) => (
                            <CarouselItem key={product.id} className="md:basis-1/2 lg:basis-1/3">
                                <ProductCard product={product} />
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                </Carousel>

                <motion.div variants={itemVariants} className="flex justify-center">
                    <Button variant="outline" asChild>
                        <Link href="/scripts">
                            View all products
                            <ArrowRight className="h-4 w-4" />
                        </Link>
                    </Button>
                </motion.div>
            </div>
        </motion.section>
    )
}
