"use client";
import { motion } from "framer-motion"
import { itemVariants } from "../animation-variants"

export default function VisualPlaceholder() {
    return (
        <motion.div variants={itemVariants} className="hidden lg:flex items-center justify-center">
            <div className="w-full h-80 border-2 border-dashed border-border rounded-xl flex items-center justify-center text-muted-foreground text-sm">
                <span className="opacity-40 tracking-widest uppercase text-xs">3D Visual Placeholder</span>
            </div>
        </motion.div>
    )
}
