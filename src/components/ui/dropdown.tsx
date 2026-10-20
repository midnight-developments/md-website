"use client"

import * as React from "react"
import { Menu as MenuPrimitive } from "@base-ui/react/menu"
import { ChevronDownIcon, ChevronRightIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { InputShell } from "@/components/ui/input-shell"
import { PopupShell, PopupItem, PopupCheckIcon } from "@/components/ui/popup-shell"

const DropdownMenu = MenuPrimitive.Root

interface DropdownMenuTriggerProps extends MenuPrimitive.Trigger.Props {
    asChild?: boolean
}

function DropdownMenuTrigger({
    className,
    children,
    render,
    nativeButton,
    asChild,
    ...props
}: DropdownMenuTriggerProps) {
    if (asChild && React.isValidElement(children)) {
        return (
            <MenuPrimitive.Trigger
                data-slot="dropdown-menu-trigger"
                render={children as React.ReactElement}
                {...props}
            />
        )
    }

    return (
        <MenuPrimitive.Trigger
            data-slot="dropdown-menu-trigger"
            nativeButton={nativeButton ?? (render ? undefined : false)}
            render={
                render ?? (
                    <InputShell
                        className={cn(
                            "group/trigger justify-between cursor-pointer gap-2",
                            className
                        )}
                    />
                )
            }
            {...props}
        >
            {children}
            {!render && (
                <ChevronDownIcon
                    aria-hidden="true"
                    className="-mr-1 opacity-50 pointer-events-none size-4 text-muted-foreground transition-snappy group-hover/trigger:opacity-100 group-data-[popup-open]/trigger:rotate-180"
                />
            )}
        </MenuPrimitive.Trigger>
    )
}

function DropdownMenuContent({
    className,
    children,
    side = "bottom",
    sideOffset = 6,
    align = "center",
    alignOffset = 0,
    ...props
}: MenuPrimitive.Popup.Props &
    Pick<
        MenuPrimitive.Positioner.Props,
        "align" | "alignOffset" | "side" | "sideOffset"
    >) {
    return (
        <MenuPrimitive.Portal>
            <MenuPrimitive.Positioner
                side={side}
                sideOffset={sideOffset}
                align={align}
                alignOffset={alignOffset}
                className="isolate z-50"
            >
                <MenuPrimitive.Popup
                    data-slot="dropdown-menu-content"
                    className={className}
                    render={<PopupShell />}
                    {...props}
                >
                    {children}
                </MenuPrimitive.Popup>
            </MenuPrimitive.Positioner>
        </MenuPrimitive.Portal>
    )
}

function DropdownMenuGroup({ className, ...props }: MenuPrimitive.Group.Props) {
    return (
        <MenuPrimitive.Group
            data-slot="dropdown-menu-group"
            className={cn("scroll-my-1 px-1", className)}
            {...props}
        />
    )
}

function DropdownMenuLabel({
    className,
    inset,
    ...props
}: MenuPrimitive.GroupLabel.Props & {
    inset?: boolean
}) {
    return (
        <MenuPrimitive.GroupLabel
            data-slot="dropdown-menu-label"
            data-inset={inset}
            className={cn(
                "p-1 text-sm text-muted-foreground data-inset:pl-7",
                className
            )}
            {...props}
        />
    )
}

function DropdownMenuItem({
    className,
    inset,
    variant = "default",
    ...props
}: MenuPrimitive.Item.Props & {
    inset?: boolean
    variant?: "default" | "destructive"
}) {
    return (
        <MenuPrimitive.Item
            data-slot="dropdown-menu-item"
            data-inset={inset}
            data-variant={variant}
            className={className}
            render={<PopupItem variant={variant} className={cn(inset && "pl-7")} />}
            {...props}
        />
    )
}

function DropdownMenuSub({ ...props }: MenuPrimitive.SubmenuRoot.Props) {
    return <MenuPrimitive.SubmenuRoot data-slot="dropdown-menu-sub" {...props} />
}

function DropdownMenuSubTrigger({
    className,
    inset,
    children,
    ...props
}: MenuPrimitive.SubmenuTrigger.Props & {
    inset?: boolean
}) {
    return (
        <MenuPrimitive.SubmenuTrigger
            data-slot="dropdown-menu-sub-trigger"
            data-inset={inset}
            className={className}
            render={
                <PopupItem
                    className={cn(
                        "pl-1 justify-between data-[popup-open]:bg-white/5 data-[popup-open]:text-foreground",
                        inset && "pl-7"
                    )}
                />
            }
            {...props}
        >
            {children}
            <ChevronRightIcon aria-hidden="true" className="-mr-1 ml-auto size-4" />
        </MenuPrimitive.SubmenuTrigger>
    )
}

function DropdownMenuSubContent({
    align = "start",
    alignOffset = -3,
    side = "right",
    sideOffset = 0,
    className,
    ...props
}: React.ComponentProps<typeof DropdownMenuContent>) {
    return (
        <DropdownMenuContent
            data-slot="dropdown-menu-sub-content"
            className={cn("w-auto min-w-[96px]", className)}
            align={align}
            alignOffset={alignOffset}
            side={side}
            sideOffset={sideOffset}
            {...props}
        />
    )
}

function DropdownMenuCheckboxItem({
    className,
    children,
    checked,
    inset,
    ...props
}: MenuPrimitive.CheckboxItem.Props & {
    inset?: boolean
}) {
    return (
        <MenuPrimitive.CheckboxItem
            data-slot="dropdown-menu-checkbox-item"
            data-inset={inset}
            className={className}
            render={<PopupItem className={cn("pr-8", inset && "pl-7")} />}
            checked={checked}
            {...props}
        >
            <span
                className="pointer-events-none absolute right-2 flex items-center justify-center size-4.5 text-current"
                data-slot="dropdown-menu-checkbox-item-indicator"
            >
                <MenuPrimitive.CheckboxItemIndicator render={<PopupCheckIcon />} />
            </span>
            {children}
        </MenuPrimitive.CheckboxItem>
    )
}

function DropdownMenuRadioGroup({ ...props }: MenuPrimitive.RadioGroup.Props) {
    return (
        <MenuPrimitive.RadioGroup
            data-slot="dropdown-menu-radio-group"
            {...props}
        />
    )
}

function DropdownMenuRadioItem({
    className,
    children,
    inset,
    ...props
}: MenuPrimitive.RadioItem.Props & {
    inset?: boolean
}) {
    return (
        <MenuPrimitive.RadioItem
            data-slot="dropdown-menu-radio-item"
            data-inset={inset}
            className={className}
            render={<PopupItem className={cn("pr-8", inset && "pl-7")} />}
            {...props}
        >
            <span
                className="pointer-events-none absolute right-2 flex items-center justify-center size-4.5 text-current"
                data-slot="dropdown-menu-radio-item-indicator"
            >
                <MenuPrimitive.RadioItemIndicator render={<PopupCheckIcon />} />
            </span>
            {children}
        </MenuPrimitive.RadioItem>
    )
}

function DropdownMenuSeparator({
    className,
    ...props
}: MenuPrimitive.Separator.Props) {
    return (
        <MenuPrimitive.Separator
            data-slot="dropdown-menu-separator"
            className={cn("pointer-events-none -mx-1 my-1 h-px bg-border", className)}
            {...props}
        />
    )
}

export {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuLabel,
    DropdownMenuItem,
    DropdownMenuCheckboxItem,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuSeparator,
    DropdownMenuSub,
    DropdownMenuSubTrigger,
    DropdownMenuSubContent,
}
