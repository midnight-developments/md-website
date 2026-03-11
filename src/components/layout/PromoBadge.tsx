import React from "react"
import { Badge } from "@/components/ui/badge"
import discordLogo from "@/assets/discord.svg"
import { cn } from "@/lib/utils"

interface PromoBadgeProps {
    className?: string;
}

export default function PromoBadge({ className }: PromoBadgeProps) {
    return (
        <a href="https://discord.gg/midnightdev" target="_blank" rel="noopener noreferrer" className={cn("group", className)}>
            <Badge size="md" className="w-fit group-hover:underline cursor-pointer">
                <span
                    className="h-4 w-4 bg-accent-foreground inline-block shrink-0"
                    style={{
                        WebkitMask: `url(${discordLogo.src}) no-repeat center`,
                        mask: `url(${discordLogo.src}) no-repeat center`,
                        WebkitMaskSize: 'contain',
                        maskSize: 'contain'
                    }}
                />
                Get 40% off ALL products in our discord!
            </Badge>
        </a>
    )
}
