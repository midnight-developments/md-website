"use client"

import { Checkbox as CheckboxPrimitive } from "@base-ui/react/checkbox"
import { CheckboxGroup as CheckboxGroupPrimitive } from "@base-ui/react/checkbox-group"
import { cn } from "@/lib/utils"
import advancedCheckboxStyles from "./checkbox-group.module.css"

function CheckboxGroup({ className, ...props }: CheckboxGroupPrimitive.Props) {
    return (
        <CheckboxGroupPrimitive
            data-slot="checkbox-group"
            className={cn("grid w-full gap-3.5", className)}
            {...props}
        />
    )
}

function Checkbox({ className, ...props }: CheckboxPrimitive.Root.Props) {
    return (
        <CheckboxPrimitive.Root
            data-slot="checkbox"
            className={cn(
                "group/checkbox peer outline-none transition-snappy cursor-pointer select-none",
                "focus-visible:ring-2 focus-visible:ring-border-active",
                "disabled:cursor-not-allowed disabled:opacity-50",
                advancedCheckboxStyles.indicator,
                className
            )}
            {...props}
        >
            <CheckboxPrimitive.Indicator
                keepMounted
                data-slot="checkbox-indicator"
                className={cn(
                    advancedCheckboxStyles.activeIndicator,
                    "transition-snappy data-unchecked:opacity-0 data-unchecked:scale-75 data-checked:opacity-100 data-checked:scale-100"
                )}
            >
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
            </CheckboxPrimitive.Indicator>
        </CheckboxPrimitive.Root>
    )
}

export { Checkbox, CheckboxGroup }
