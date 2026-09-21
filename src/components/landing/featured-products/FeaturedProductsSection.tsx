import { Suspense } from "react"
import Link from "next/link"
import { Sparkles, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import FeaturedProducts from "./FeaturedProducts"

export default function FeaturedProductsSection() {
    return (
        <section>
            <div className="flex flex-col gap-10 items-center justify-center">
                <div className="text-center">
                    <Badge className="mb-4">
                        <Sparkles className="h-3.5 w-3.5" />
                        Our community's top picks
                    </Badge>
                    <h2 className="text-3xl sm:text-4xl font-bold">Featured Products</h2>
                </div>

                <Suspense fallback={null}>
                    <FeaturedProducts />
                </Suspense>

                <div className="flex justify-center">
                    <Button variant="outline" asChild>
                        <Link href="/scripts">
                            View all products
                            <ArrowRight className="h-4 w-4" />
                        </Link>
                    </Button>
                </div>
            </div>
        </section>
    )
}
