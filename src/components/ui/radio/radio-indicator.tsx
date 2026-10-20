"use client"

import * as React from "react"
import { Radio as RadioPrimitive } from "@base-ui/react/radio"
import { cn } from "@/lib/utils"
import radioIndicatorStyles from "./radio-indicator.module.css"

export interface RadioIndicatorProps extends React.ComponentProps<"span"> {
    variant?: "dot" | "check"
    indicatorClassName?: string
}

export function RadioIndicator({
    className,
    variant = "dot",
    indicatorClassName,
    children,
    ...props
}: RadioIndicatorProps) {
    const isCheck = variant === "check"

    return (
        <span
            data-slot="radio-indicator"
            className={cn(radioIndicatorStyles.indicator, className)}
            {...props}
        >
            <RadioPrimitive.Indicator
                keepMounted
                data-slot="radio-indicator-active"
                className={cn(
                    radioIndicatorStyles.activeIndicator,
                    isCheck ? radioIndicatorStyles.check : radioIndicatorStyles.dot,
                    "transition-snappy data-unchecked:opacity-0 data-unchecked:scale-75 data-checked:opacity-100 data-checked:scale-100",
                    indicatorClassName
                )}
            >
                {children ?? (isCheck ? (
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                        className="size-3.5 text-white"
                    >
                        <path d="M5 13l4.5 4.5L19 7" />
                    </svg>
                ) : null)}
            </RadioPrimitive.Indicator>
        </span>
    )
}
