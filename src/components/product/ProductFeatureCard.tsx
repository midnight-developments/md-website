"use client";
import { motion } from "framer-motion"
import { containerVariants, itemVariants } from "@/components/animation-variants"


interface ParsedHighlight {
    name: string;
    icon?: string;
    content: string;
}

interface ProductFeatureCardProps {
    feature: ParsedHighlight;
    index: number;
}

export default function ProductFeatureCard({ feature, index }: ProductFeatureCardProps) {
    const isImageLeft = index % 2 === 0
    return (
        <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants as any}
            className={`grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-10 lg:gap-14 items-center bg-white/5 p-6 md:p-8 rounded-xl ${isImageLeft ? "lg:pr-12" : "lg:pl-12"}`}
        >
            <motion.div
                variants={itemVariants as any}
                className={`aspect-video bg-white/[0.03] border-2 border-border rounded-md flex items-center justify-center text-muted-foreground ${!isImageLeft ? "lg:order-2" : ""
                    }`}
            >
                <span className="text-sm opacity-40 tracking-widest uppercase">Feature Image</span>
            </motion.div>

            {/* Text */}
            <motion.div variants={itemVariants as any} className={!isImageLeft ? "lg:order-1" : ""}>
                <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-3">{feature.name}</h3>
                <p className="text-xl text-muted-foreground leading-normal md:leading-relaxed">{feature.content}</p>
            </motion.div>
        </motion.div>
    )
}
