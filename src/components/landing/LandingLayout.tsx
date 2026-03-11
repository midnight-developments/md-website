import { motion } from "framer-motion"
import AccentSeparator from "@/components/ui/accent-seperator"
import Hero from "./Hero"
import { containerVariants } from "../animation-variants"
import FeaturedProducts from "./FeaturedProducts"
import { Product } from "@/services/tebex/products"

export default function LandingLayout({ featuredProducts }: { featuredProducts: Product[] }) {
    return (
        <div className="max-w-screen-2xl mx-auto px-6 lg:px-12 pt-10 md:pt-12 2xl:pt-16">
            <Hero />
            <AccentSeparator className="my-24" />
            <FeaturedProducts products={featuredProducts} />
        </div>
    )
}
