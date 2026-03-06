"use client";
import * as React from "react"
import { cn } from "@/lib/utils"
import { BASE_INPUT_STYLES } from "@/lib/style-constants"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
    return (
        <input
            type={type}
            data-slot="input"
            className={cn(
                BASE_INPUT_STYLES,
                "input-field",
                className
            )}
            {...props}
        />
    )
}

export { Input }
