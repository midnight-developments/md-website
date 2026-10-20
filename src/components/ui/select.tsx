"use client"

import { Select as SelectPrimitive } from "@base-ui/react/select"
import { ChevronDownIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { InputShell } from "@/components/ui/input-shell"
import { PopupShell, PopupItem, PopupCheckIcon } from "@/components/ui/popup-shell"

const Select = SelectPrimitive.Root


function SelectGroup({ className, ...props }: SelectPrimitive.Group.Props) {
    return (
        <SelectPrimitive.Group
            data-slot="select-group"
            className={cn("scroll-my-1", className)}
            {...props}
        />
    )
}

function SelectValue({ className, ...props }: SelectPrimitive.Value.Props) {
    return (
        <SelectPrimitive.Value
            data-slot="select-value"
            className={cn("flex flex-1 text-left", className)}
            {...props}
        />
    )
}

function SelectTrigger({
    className,
    children,
    ...props
}: SelectPrimitive.Trigger.Props) {
    return (
        <SelectPrimitive.Trigger
            data-slot="select-trigger"
            nativeButton={false}
            render={
                <InputShell
                    className={cn(
                        "group/trigger justify-between cursor-pointer",
                        "*:data-[slot=select-value]:flex *:data-[slot=select-value]:items-center *:data-[slot=select-value]:gap-2 *:data-[slot=select-value]:line-clamp-1",
                        className
                    )}
                />
            }
            {...props}
        >
            {children}
            <SelectPrimitive.Icon
                render={<ChevronDownIcon className="-mr-1 opacity-50 pointer-events-none size-4 text-muted-foreground transition-snappy group-hover/trigger:opacity-100 group-data-[popup-open]/trigger:rotate-180" />}
            />
        </SelectPrimitive.Trigger>
    )
}

function SelectContent({
    className,
    children,
    side = "bottom",
    sideOffset = 6,
    align = "start",
    alignOffset = 0,
    alignItemWithTrigger = false,
    finalFocus = false,
    ...props
}: SelectPrimitive.Popup.Props &
    Pick<
        SelectPrimitive.Positioner.Props,
        "align" | "alignOffset" | "side" | "sideOffset" | "alignItemWithTrigger"
    >) {
    return (
        <SelectPrimitive.Portal>
            <SelectPrimitive.Positioner
                side={side}
                sideOffset={sideOffset}
                align={align}
                alignOffset={alignOffset}
                alignItemWithTrigger={alignItemWithTrigger}
                className="isolate z-50"
            >
                <SelectPrimitive.Popup
                    data-slot="select-content"
                    finalFocus={finalFocus}
                    className={cn("w-(--anchor-width)", className)}
                    render={<PopupShell />}
                    {...props}
                >
                    <SelectPrimitive.List data-slot="select-list" className="flex-1 flex flex-col has-[>[data-slot=select-group]]:gap-2">
                        {children}
                    </SelectPrimitive.List>
                </SelectPrimitive.Popup>
            </SelectPrimitive.Positioner>
        </SelectPrimitive.Portal>
    )
}

function SelectLabel({ className, ...props }: SelectPrimitive.GroupLabel.Props) {
    return (
        <SelectPrimitive.GroupLabel
            data-slot="select-label"
            className={cn("px-2 py-1.5 text-sm text-muted-foreground", className)}
            {...props}
        />
    )
}

function SelectItemIndicator({
    className,
    children,
    ...props
}: SelectPrimitive.ItemIndicator.Props) {
    return (
        <SelectPrimitive.ItemIndicator
            data-slot="select-item-indicator"
            className={cn("ml-auto flex items-center justify-center shrink-0 text-current", className)}
            {...props}
        >
            {children ?? <PopupCheckIcon />}
        </SelectPrimitive.ItemIndicator>
    )
}

function SelectItem({
    className,
    children,
    onClick,
    onKeyDown,
    ...props
}: SelectPrimitive.Item.Props) {
    return (
        <SelectPrimitive.Item
            data-slot="select-item"
            className={className}
            render={<PopupItem />}
            onClick={(e) => {
                onClick?.(e)
                requestAnimationFrame(() => {
                    (document.activeElement as HTMLElement)?.blur()
                })
            }}
            onKeyDown={(e) => {
                onKeyDown?.(e)
                if (e.key === "Enter" || e.key === " ") {
                    requestAnimationFrame(() => {
                        (document.activeElement as HTMLElement)?.blur()
                    })
                }
            }}
            {...props}
        >
            <SelectPrimitive.ItemText className="flex flex-1 shrink-0 items-center gap-2 whitespace-nowrap">
                {children}
            </SelectPrimitive.ItemText>
            <SelectItemIndicator />
        </SelectPrimitive.Item>
    )
}

function SelectSeparator({ className, ...props }: SelectPrimitive.Separator.Props) {
    return (
        <SelectPrimitive.Separator
            data-slot="select-separator"
            className={cn("pointer-events-none -mx-1 my-1 h-px bg-border", className)}
            {...props}
        />
    )
}

export {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectItemIndicator,
    SelectLabel,
    SelectSeparator,
    SelectTrigger,
    SelectValue,
}