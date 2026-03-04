import * as React from "react"
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu"
import { cn } from "@/lib/utils"

import { BASE_INPUT_STYLES } from "@/lib/style-constants"
import { ChevronDownIcon } from "lucide-react"

const DropdownMenu = DropdownMenuPrimitive.Root

const DropdownMenuTrigger = React.forwardRef<
    React.ComponentRef<typeof DropdownMenuPrimitive.Trigger>,
    React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Trigger> & {
        size?: "sm" | "default"
    }
>(({ className, children, size = "default", ...props }, ref) => (
    <DropdownMenuPrimitive.Trigger
        ref={ref}
        data-size={size}
        className={cn(
            !props.asChild && BASE_INPUT_STYLES,
            !props.asChild && "flex items-center justify-between text-left",
            className
        )}
        {...props}
    >
        {props.asChild ? (
            children
        ) : (
            <>
                {children}
                <ChevronDownIcon className="size-4 opacity-50 shrink-0 mt-0.25" />
            </>
        )}
    </DropdownMenuPrimitive.Trigger>
))
DropdownMenuTrigger.displayName = "DropdownMenuTrigger"
const DropdownMenuGroup = DropdownMenuPrimitive.Group

const DropdownMenuContent = React.forwardRef<
    React.ComponentRef<typeof DropdownMenuPrimitive.Content>,
    React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Content>
>(({ className, sideOffset = 4, ...props }, ref) => (
    <DropdownMenuPrimitive.Portal>
        <DropdownMenuPrimitive.Content
            ref={ref}
            sideOffset={sideOffset}
            className={cn(`
                z-50 overflow-hidden rounded-sm
                min-w-(--radix-dropdown-menu-trigger-width)
                bg-popover-bg border-2 border-popover
                text-primary-foreground
                data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 data-[state=open]:slide-in-from-top-2
                data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95
                shadow-lg backdrop-blur-3xl p-1
            `, className)}
            {...props}
        />
    </DropdownMenuPrimitive.Portal>
))
DropdownMenuContent.displayName = "DropdownMenuContent"

const DropdownMenuItem = React.forwardRef<
    React.ComponentRef<typeof DropdownMenuPrimitive.Item>,
    React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Item>
>(({ className, ...props }, ref) => (
    <DropdownMenuPrimitive.Item
        ref={ref}
        className={cn(`
            relative rounded-xs
            w-auto py-1.5  px-2
            flex items-center gap-2
            bg-transparent outline-none
            text-sm text-muted-foreground select-none
            focus:bg-accent-gradient focus:text-primary-foreground
            data-disabled:pointer-events-none data-disabled:opacity-40
            cursor-pointer [&>svg]:size-4 [&>svg]:shrink-0
        `, className)}
        {...props}
    />
))
DropdownMenuItem.displayName = "DropdownMenuItem"

const DropdownMenuSeparator = React.forwardRef<
    React.ComponentRef<typeof DropdownMenuPrimitive.Separator>,
    React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Separator>
>(({ className, ...props }, ref) => (
    <DropdownMenuPrimitive.Separator
        ref={ref}
        className={cn("-mx-1 my-1 h-px bg-border", className)}
        {...props}
    />
))
DropdownMenuSeparator.displayName = "DropdownMenuSeparator"

const DropdownMenuLabel = React.forwardRef<
    React.ComponentRef<typeof DropdownMenuPrimitive.Label>,
    React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Label>
>(({ className, ...props }, ref) => (
    <DropdownMenuPrimitive.Label
        ref={ref}
        className={cn("px-3 py-1.5 text-xs font-semibold text-muted-foreground", className)}
        {...props}
    />
))
DropdownMenuLabel.displayName = "DropdownMenuLabel"

export {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuLabel,
    DropdownMenuGroup,
}
