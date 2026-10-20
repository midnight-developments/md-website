"use client"

import * as React from "react"
import { Slider as SliderPrimitive } from "@base-ui/react/slider"

import { cn } from "@/lib/utils"

export interface SliderProps extends Omit<SliderPrimitive.Root.Props, "value" | "defaultValue" | "onValueChange"> {
    value?: number | number[]
    defaultValue?: number | number[]
    onValueChange?: (value: number[]) => void
    label?: string
    description?: string
    wrapperClassName?: string
}

function Slider({
    className,
    defaultValue,
    value,
    min = 0,
    max = 100,
    label,
    description,
    wrapperClassName,
    onValueChange,
    ...props
}: SliderProps) {
    const id = React.useId()
    const labelId = label ? `${id}-label` : undefined
    const descriptionId = description ? `${id}-desc` : undefined

    const _values = value !== undefined
        ? (Array.isArray(value) ? value : [value])
        : defaultValue !== undefined
            ? (Array.isArray(defaultValue) ? defaultValue : [defaultValue])
            : [min, max]

    const displayValue = _values.join(" - ")

    const handleValueChange = (val: number | number[]) => {
        if (onValueChange) {
            onValueChange(Array.isArray(val) ? val : [val])
        }
    }

    const sliderElement = (
        <SliderPrimitive.Root
            className={cn("data-horizontal:w-full data-vertical:h-full", className)}
            data-slot="slider"
            defaultValue={defaultValue}
            value={value}
            min={min}
            max={max}
            aria-labelledby={labelId}
            aria-describedby={descriptionId}
            thumbAlignment="edge"
            onValueChange={handleValueChange}
            {...props}
        >
            <SliderPrimitive.Control className="relative flex w-full touch-none items-center select-none data-disabled:opacity-50 data-vertical:h-full data-vertical:min-h-40 data-vertical:w-auto data-vertical:flex-col">
                <SliderPrimitive.Track
                    data-slot="slider-track"
                    className="relative grow overflow-hidden rounded-xs bg-white/10 select-none data-horizontal:h-2 data-horizontal:w-full data-vertical:h-full data-vertical:w-1"
                >
                    <SliderPrimitive.Indicator
                        data-slot="slider-range"
                        className="bg-accent-gradient-x select-none data-horizontal:h-full data-vertical:w-full"
                    />
                </SliderPrimitive.Track>
                {Array.from({ length: _values.length }, (_, index) => (
                    <SliderPrimitive.Thumb
                        data-slot="slider-thumb"
                        key={index}
                        aria-label={label ? (_values.length > 1 ? (index === 0 ? `${label} minimum` : `${label} maximum`) : label) : "Slider"}
                        className="relative block size-4 shrink-0 rounded-full bg-white cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-border-active active:scale-90 active:brightness-90 transition-[scale,filter] ease-in-out duration-200 select-none disabled:pointer-events-none disabled:opacity-50"
                    />
                ))}
            </SliderPrimitive.Control>
        </SliderPrimitive.Root>
    )

    if (!label) {
        return sliderElement
    }

    return (
        <div className={cn("flex flex-col gap-3 w-full", wrapperClassName)}>
            <div className="flex justify-between items-center w-full">
                <label id={labelId} className="text-lg font-normal text-foreground">
                    {label}
                </label>
                <span className="text-lg font-normal text-foreground">
                    {displayValue}
                </span>
            </div>
            {sliderElement}
            {description && (
                <p id={descriptionId} className="text-base text-secondary -mt-0.5">
                    {description}
                </p>
            )}
        </div>
    )
}

export { Slider }
