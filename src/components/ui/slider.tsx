"use client"

import * as React from "react"
import * as SliderPrimitive from "@radix-ui/react-slider"
import { ChevronsLeft, ChevronsRight } from "lucide-react"

import { cn } from "@/lib/utils"

const Slider = React.forwardRef<
    React.ElementRef<typeof SliderPrimitive.Root>,
    React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(({ className, ...props }, ref) => {
    const [localValues, setLocalValues] = React.useState(
        props.value || props.defaultValue || [0]
    )

    const handleValueChange = (value: number[]) => {
        setLocalValues(value)
        props.onValueChange?.(value)
    }

    return (
        <SliderPrimitive.Root
            ref={ref}
            className={cn(
                "relative flex w-full touch-none select-none items-center",
                className
            )}
            {...props}
            onValueChange={handleValueChange}
        >
            <SliderPrimitive.Track className="relative h-2 w-full grow overflow-hidden rounded-xs bg-white/10">
                <SliderPrimitive.Range className="absolute h-full bg-accent-gradient" />
            </SliderPrimitive.Track>
            {localValues.map((val, i) => (
                <SliderPrimitive.Thumb
                    key={i}
                    className="block h-5 w-5 rounded-full border-2 border-accent active:scale-90 bg-(--brand-light) shadow-lg shadow-black transition-colors focus:outline-none focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 cursor-pointer"
                />
            ))}
        </SliderPrimitive.Root>
    )
})
Slider.displayName = SliderPrimitive.Root.displayName

export { Slider }
