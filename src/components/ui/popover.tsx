"use client"

import * as React from "react"
import { Popover as PopoverPrimitive } from "@base-ui/react/popover"

import { cn } from "@/lib/utils"
import { PopupShell } from "@/components/ui/popup-shell"

const Popover = PopoverPrimitive.Root

function PopoverTrigger({
    onMouseDown,
    onClick,
    ...props
}: PopoverPrimitive.Trigger.Props) {
    const triggeredOnMouseDownRef = React.useRef(false)
    return (
        <PopoverPrimitive.Trigger
            onMouseDown={(event) => {
                onMouseDown?.(event)
                if (event.defaultPrevented) return

                if (event.button === 0) {
                    const isExpanded = event.currentTarget.getAttribute("aria-expanded") === "true"
                    if (!isExpanded) {
                        triggeredOnMouseDownRef.current = true

                        const handleWindowMouseUp = () => {
                            window.removeEventListener("mouseup", handleWindowMouseUp)
                            setTimeout(() => {
                                triggeredOnMouseDownRef.current = false
                            }, 0)
                        }
                        window.addEventListener("mouseup", handleWindowMouseUp)

                        event.currentTarget.click()
                    }
                }
            }}
            onClick={(event) => {
                if (triggeredOnMouseDownRef.current && event.isTrusted) {
                    triggeredOnMouseDownRef.current = false
                        ; (event as any).preventBaseUIHandler?.()
                    event.preventDefault()
                    return
                }
                onClick?.(event)
            }}
            {...props}
        />
    )
}

function PopoverContent({
    className,
    align = "start",
    alignOffset = 0,
    side = "bottom",
    sideOffset = 4,
    ...props
}: PopoverPrimitive.Popup.Props &
    Pick<
        PopoverPrimitive.Positioner.Props,
        "align" | "alignOffset" | "side" | "sideOffset"
    >) {
    return (
        <PopoverPrimitive.Portal>
            <PopoverPrimitive.Positioner
                align={align}
                alignOffset={alignOffset}
                side={side}
                sideOffset={sideOffset}
                className="isolate z-50"
            >
                <PopoverPrimitive.Popup
                    data-slot="popover-content"
                    data-align={align}
                    data-side={side}
                    render={
                        <PopupShell
                            className={cn(
                                "flex w-72 flex-col gap-2.5 p-2.5 text-base",
                                className
                            )}
                        />
                    }
                    {...props}
                />
            </PopoverPrimitive.Positioner>
        </PopoverPrimitive.Portal>
    )
}

function PopoverHeader({ className, ...props }: React.ComponentProps<"div">) {
    return (
        <div
            data-slot="popover-header"
            className={cn("flex flex-col gap-0.5 text-base", className)}
            {...props}
        />
    )
}

function PopoverTitle({ className, ...props }: PopoverPrimitive.Title.Props) {
    return (
        <PopoverPrimitive.Title
            data-slot="popover-title"
            className={cn(className)}
            {...props}
        />
    )
}

function PopoverDescription({
    className,
    ...props
}: PopoverPrimitive.Description.Props) {
    return (
        <PopoverPrimitive.Description
            data-slot="popover-description"
            className={cn("text-muted-foreground", className)}
            {...props}
        />
    )
}

export {
    Popover,
    PopoverContent,
    PopoverDescription,
    PopoverHeader,
    PopoverTitle,
    PopoverTrigger,
}
