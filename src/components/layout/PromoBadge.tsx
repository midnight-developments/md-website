import React from "react"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

interface PromoBadgeProps {
    className?: string;
}

export default function PromoBadge({ className }: PromoBadgeProps) {
    return (
        <a href="https://discord.gg/midnightdev" target="_blank" rel="noopener noreferrer" className={cn("group", className)}>
            <Badge className="w-fit group-hover:underline cursor-pointer">
                Get 40% off ALL products in our discord!
            </Badge>
        </a>
    )
}
