import { Badge, type BadgeProps } from "@/components/ui/badge"
import type { Product } from "@/types/tebex"
import { cn } from "@/lib/utils"

export type FrameworkVariant = "destructive" | "warning" | "orange" | "success" | "secondary";

export function getFrameworkBadgeVariant(framework: string): FrameworkVariant {
    const lower = framework.toLowerCase().trim();
    if (lower.includes("qbox")) {
        return "warning";
    }
    if (lower.includes("qbcore") || lower.includes("qb-core") || lower === "qb") {
        return "destructive";
    }
    if (lower.includes("esx")) {
        return "orange";
    }
    if (lower.includes("standalone")) {
        return "success";
    }
    return "secondary";
}

interface FrameworkBadgesProps {
    product: Product;
    size?: BadgeProps["size"];
    className?: string;
}

export default function FrameworkBadges({ product, size = "sm", className }: FrameworkBadgesProps) {
    const rawFrameworks = product.creator_meta_data?.requirements?.framework;
    const frameworks = Array.isArray(rawFrameworks)
        ? rawFrameworks
        : typeof rawFrameworks === "string" && rawFrameworks
            ? [rawFrameworks]
            : [];

    if (frameworks.length > 0) {
        return (
            <div className={cn("flex flex-wrap gap-1.5", className)}>
                {frameworks.map((fw) => (
                    <Badge key={fw} variant={getFrameworkBadgeVariant(fw)} size={size}>
                        {fw}
                    </Badge>
                ))}
            </div>
        );
    }

    return null;
}
