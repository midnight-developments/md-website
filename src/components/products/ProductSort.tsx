"use client";
import { ChevronsUpDown } from "lucide-react"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { SortType } from "@/hooks/useProductFilters"

interface ProductSortProps {
    value: SortType
    onChange: (value: SortType) => void
}

export default function ProductSort({ value, onChange }: ProductSortProps) {
    return (
        <Select
            value={value}
            onValueChange={(val) => onChange(val as SortType)}
        >
            <SelectTrigger className="w-full md:w-3xs gap-2.5 py-2">
                <div className="flex items-center gap-1.5">
                    <ChevronsUpDown className="h-4 w-4 shrink-0 text-muted-foreground" />
                    <span className="text-muted-foreground whitespace-nowrap">Sort by:</span>
                    <SelectValue />
                </div>
            </SelectTrigger>
            <SelectContent>
                <SelectItem value={SortType.Default}>Default</SelectItem>
                <SelectItem value={SortType.NameAsc}>Name (A - Z)</SelectItem>
                <SelectItem value={SortType.NameDesc}>Name (Z - A)</SelectItem>
                <SelectItem value={SortType.PriceDesc}>Price (High to Low)</SelectItem>
                <SelectItem value={SortType.PriceAsc}>Price (Low to High)</SelectItem>
            </SelectContent>
        </Select>
    )
}
