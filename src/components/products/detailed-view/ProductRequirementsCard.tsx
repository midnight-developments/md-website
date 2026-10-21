"use client";

import { LayoutGrid, Infinity, TriangleAlert, Folder, ArrowUpRight } from "lucide-react";
import bg from "@/assets/bg.png";
import Grain from "@/components/ui/grain";
import type { Product } from "@/types/tebex";

interface ProductRequirementsCardProps {
    product: Product;
    className?: string;
}

export default function ProductRequirementsCard({ product, className }: ProductRequirementsCardProps) {
    const requirements = product.creator_meta_data?.requirements;

    const frameworkText = requirements?.framework?.join(" / ");
    const hasOneSync = Boolean(requirements?.onesync_infinity);
    const serverVersion = requirements?.server_version;
    const resources = requirements?.resources ? Object.entries(requirements.resources) : [];

    if (!frameworkText && !hasOneSync && !serverVersion && resources.length === 0) {
        return null;
    }

    return (
        <div
            className={`relative overflow-hidden flex flex-col p-4 rounded-lg bg-card-bg border border-border transition-colors duration-300 ${className || ""}`}
        >
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    backgroundImage: `url(${bg.src})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    opacity: 0.7,
                    filter: "blur(60px) hue-rotate(45deg)",
                }}
            />
            <Grain size="50px" opacity={0.1} />

            <div className="relative z-10 flex flex-col gap-3.5">
                <h4 className="text-sm font-semibold uppercase tracking-normal text-muted-foreground  leading-none">
                    REQUIREMENTS
                </h4>

                <div className="flex flex-col gap-1.5 text-[15px] text-foreground">
                    {frameworkText && (
                        <div className="flex items-center gap-2">
                            <LayoutGrid className="size-4.5 shrink-0 text-muted-foreground" />
                            <span>{frameworkText}</span>
                        </div>
                    )}

                    {hasOneSync && (
                        <div className="flex items-center gap-2">
                            <Infinity className="size-4.5 shrink-0 text-muted-foreground" />
                            <span>OneSync Infinity</span>
                        </div>
                    )}

                    {serverVersion && (
                        <div className="flex items-center gap-2">
                            <TriangleAlert className="size-4.5 shrink-0 text-muted-foreground" />
                            <span>{serverVersion}</span>
                        </div>
                    )}

                    {resources.map(([name, url]) => (
                        <div key={name} className="flex items-center gap-2">
                            <Folder className="size-4.5 shrink-0 text-muted-foreground" />
                            <a
                                href={url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="underline underline-offset-3 hover:text-accent transition-colors inline-flex items-center gap-1"
                            >
                                <span>{name}</span>
                                <ArrowUpRight className="size-3.5 shrink-0" />
                            </a>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
