"use client";
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"

interface ProductSearchProps {
    value: string
    onChange: (value: string) => void
    placeholder?: string
}

export default function ProductSearch({ value, onChange, placeholder = "Search products..." }: ProductSearchProps) {
    return (
        <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground z-10" />
            <Input
                placeholder={placeholder}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="pl-10 py-2 w-full"
            />
        </div>
    )
}
