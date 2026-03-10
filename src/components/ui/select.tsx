"use client"

import * as React from "react"
import * as SelectPrimitive from "@radix-ui/react-select"
import { ChevronDownIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { BASE_INPUT_STYLES } from "@/lib/style-constants"

function Select({ ...props }: React.ComponentProps<typeof SelectPrimitive.Root>) {
    return <SelectPrimitive.Root data-slot="select" {...props} />
}

function SelectGroup({ ...props }: React.ComponentProps<typeof SelectPrimitive.Group>) {
    return <SelectPrimitive.Group data-slot="select-group" {...props} />
}

const SelectValue = React.forwardRef<
    React.ComponentRef<typeof SelectPrimitive.Value>,
    React.ComponentPropsWithoutRef<typeof SelectPrimitive.Value>
>(({ className, ...props }, ref) => (
    <SelectPrimitive.Value
        ref={ref}
        data-slot="select-value"
        className={cn("text-primary-foreground", className)}
        {...props}
    />
))
SelectValue.displayName = SelectPrimitive.Value.displayName

const SelectTrigger = React.forwardRef<
    React.ComponentRef<typeof SelectPrimitive.Trigger>,
    React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger> & {
        size?: "sm" | "default"
    }
>(({ className, size = "default", children, ...props }, ref) => (
    <SelectPrimitive.Trigger
        ref={ref}
        data-slot="select-trigger"
        data-size={size}
        className={cn(
            BASE_INPUT_STYLES,
            "flex items-center justify-between shadow-sm cursor-pointer",
            size === "sm" && "h-8 px-2 text-xs",
            className
        )}
        {...props}
    >
        {props.asChild ? (
            children
        ) : (
            <>
                {children}
                <SelectPrimitive.Icon asChild>
                    <ChevronDownIcon className="size-4 shrink-0 opacity-50" />
                </SelectPrimitive.Icon>
            </>
        )}
    </SelectPrimitive.Trigger>
))
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName

const SelectContent = React.forwardRef<
    React.ComponentRef<typeof SelectPrimitive.Content>,
    React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content>
>(({ className, children, position = "popper", sideOffset = 4, ...props }, ref) => (
    <SelectPrimitive.Portal>
        <SelectPrimitive.Content
            ref={ref}
            data-slot="select-content"
            sideOffset={sideOffset}
            className={cn(`
                relative z-50 overflow-hidden rounded-sm
                p-1
                bg-popover-bg border-2 border-popover
                text-primary-foreground
                data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 data-[state=open]:slide-in-from-top-2
                data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95
                shadow-lg backdrop-blur-3xl
            `,
                position === "popper" &&
                "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
                className)}
            position={position}
            {...props}
        >
            <SelectPrimitive.Viewport
                className={cn(
                    "overflow-y-auto scrollbar-none",
                    position === "popper" &&
                    "h-full w-full min-w-[var(--radix-select-trigger-width)]"
                )}
                // @ts-ignore - Prevent Lenis from hijacking the scroll
                data-lenis-prevent=""
            >
                {children}
            </SelectPrimitive.Viewport>
        </SelectPrimitive.Content>
    </SelectPrimitive.Portal>
))
SelectContent.displayName = SelectPrimitive.Content.displayName

const SelectItem = React.forwardRef<
    React.ComponentRef<typeof SelectPrimitive.Item>,
    React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item>
>(({ className, children, ...props }, ref) => (
    <SelectPrimitive.Item
        ref={ref}
        data-slot="select-item"
        className={cn(`
            relative rounded-xs
            w-auto py-1.5 px-2
            flex items-center gap-2
            bg-transparent outline-none
            text-sm text-muted-foreground select-none
            focus:bg-accent-gradient focus:text-primary-foreground
            data-[state=checked]:text-primary-foreground
            data-disabled:pointer-events-none data-disabled:opacity-40
            cursor-pointer
        `, className)}
        {...props}
    >
        <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
    </SelectPrimitive.Item>
))
SelectItem.displayName = SelectPrimitive.Item.displayName

export {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
}
