"use client";
import * as React from "react"
import * as DialogPrimitive from "@radix-ui/react-dialog"
import { X } from "lucide-react"
import { motion } from "framer-motion"

import { cn } from "@/lib/utils"

const Dialog = DialogPrimitive.Root

const DialogTrigger = DialogPrimitive.Trigger

const DialogPortal = DialogPrimitive.Portal

const DialogClose = DialogPrimitive.Close

const DialogOverlay = React.forwardRef<
    React.ComponentRef<typeof DialogPrimitive.Overlay>,
    React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay> & { forceMount?: true }
>(({ className, forceMount, onDrag: _, onDragEnd: _a, onDragStart: _b, onDragOver: _c, onAnimationStart: _d, ...props }, ref) => (
    <DialogPrimitive.Overlay forceMount={forceMount} asChild>
        <motion.div
            ref={ref}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className={cn(
                `fixed inset-0 z-50
                bg-black/30 backdrop-blur-lg`,
                className
            )}
            {...props}
        />
    </DialogPrimitive.Overlay>
))
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName

const DialogContent = React.forwardRef<
    React.ComponentRef<typeof DialogPrimitive.Content>,
    React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content> & { forceMount?: true }
>(({ className, children, forceMount, onDrag: _, onDragEnd: _a, onDragStart: _b, onDragOver: _c, onAnimationStart: _d, ...props }, ref) => (
    <DialogPortal forceMount={forceMount}>
        <DialogOverlay forceMount={forceMount} />
        <DialogPrimitive.Content forceMount={forceMount} asChild>
            <motion.div
                ref={ref}
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                transition={{ type: "spring", damping: 22, stiffness: 400 }}
                className={cn(
                    `fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 rounded-lg
                    w-full max-w-lg p-6
                    grid gap-6
                    bg-modal-bg border-2 border-modal
                    shadow-lg backdrop-blur-3xl`,
                    className
                )}
                {...props}
            >
                {children}

                <DialogPrimitive.Close className={cn(
                    `absolute right-4 top-4 rounded-sm
                    text-muted-foreground
                    transition-opacity opacity-70
                    hover:opacity-100
                    focus:border-primary-foreground
                    disabled:pointer-events-none`,
                )}>
                    <X className="h-4 w-4" />
                    <span className="sr-only">Close</span>
                </DialogPrimitive.Close>
            </motion.div>
        </DialogPrimitive.Content>
    </DialogPortal>
))
DialogContent.displayName = DialogPrimitive.Content.displayName

const DialogHeader = ({
    className,
    ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
    <div
        className={cn(
            `flex flex-col space-y-1.5
            text-center
            sm:text-left`,
            className
        )}
        {...props}
    />
)
DialogHeader.displayName = "DialogHeader"

const DialogFooter = ({
    className,
    ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
    <div
        className={cn(
            `flex flex-col-reverse
            sm:flex-row sm:justify-end sm:space-x-2`,
            className
        )}
        {...props}
    />
)
DialogFooter.displayName = "DialogFooter"

const DialogTitle = React.forwardRef<
    React.ComponentRef<typeof DialogPrimitive.Title>,
    React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
    <DialogPrimitive.Title
        ref={ref}
        className={cn(
            `text-xl font-semibold leading-none tracking-tight mb-3`,
            className
        )}
        {...props}
    />
))
DialogTitle.displayName = DialogPrimitive.Title.displayName

const DialogDescription = React.forwardRef<
    React.ComponentRef<typeof DialogPrimitive.Description>,
    React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
    <DialogPrimitive.Description
        ref={ref}
        className={cn(
            `text-base text-muted-foreground leading-tight`,
            className
        )}
        {...props}
    />
))
DialogDescription.displayName = DialogPrimitive.Description.displayName

export {
    Dialog,
    DialogPortal,
    DialogOverlay,
    DialogTrigger,
    DialogClose,
    DialogContent,
    DialogHeader,
    DialogFooter,
    DialogTitle,
    DialogDescription,
}
