"use client"

import * as React from "react"
import { Dialog as DialogPrimitive } from "@base-ui/react/dialog"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"
import advancedDialogStyles from "./dialog.module.css"
import { DialogSurface } from "./dialog-surface"

interface DialogContextValue {
    open: boolean
    inDialog: boolean
}

const DialogContext = React.createContext<DialogContextValue>({
    open: false,
    inDialog: false,
})

function Dialog({ open = false, onOpenChange, ...props }: DialogPrimitive.Root.Props) {
    return (
        <DialogContext.Provider value={{ open, inDialog: true }}>
            <DialogPrimitive.Root open={open} onOpenChange={onOpenChange} {...props} />
        </DialogContext.Provider>
    )
}

function DialogTrigger(props: DialogPrimitive.Trigger.Props) {
    return <DialogPrimitive.Trigger data-slot="dialog-trigger" {...props} />
}

function DialogPortal({ keepMounted = true, ...props }: DialogPrimitive.Portal.Props) {
    return <DialogPrimitive.Portal data-slot="dialog-portal" keepMounted={keepMounted} {...props} />
}

function DialogClose(props: DialogPrimitive.Close.Props) {
    return <DialogPrimitive.Close data-slot="dialog-close" {...props} />
}

const overlayVariants = {
    initial: { opacity: 0 },
    animate: {
        opacity: 1,
        transition: { duration: 0.2, ease: [0.16, 1, 0.3, 1] as const },
    },
    exit: {
        opacity: 0,
        transition: { duration: 0.15, ease: [0.16, 1, 0.3, 1] as const },
    },
}

const contentVariants = {
    initial: { opacity: 0, scale: 0.95 },
    animate: {
        opacity: 1,
        scale: 1,
        transition: { duration: 0.2, ease: [0.16, 1, 0.3, 1] as const },
    },
    exit: {
        opacity: 0,
        scale: 0.95,
        transition: { duration: 0.15, ease: [0.16, 1, 0.3, 1] as const },
    },
}

function DialogOverlay({
    className,
    ...props
}: DialogPrimitive.Backdrop.Props) {
    return (
        <DialogPrimitive.Backdrop
            data-slot="dialog-overlay"
            render={
                <motion.div
                    variants={overlayVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    className={cn(
                        "fixed inset-0 z-50 bg-black/50 pointer-events-auto",
                        className
                    )}
                />
            }
            {...props}
        />
    )
}

function DialogContent({
    className,
    children,
    ...props
}: DialogPrimitive.Popup.Props) {
    const { open } = React.useContext(DialogContext)

    return (
        <DialogPortal keepMounted>
            <AnimatePresence>
                {open && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
                        <DialogOverlay />
                        <DialogPrimitive.Popup
                            data-slot="dialog-content"
                            render={
                                <motion.div
                                    variants={contentVariants}
                                    initial="initial"
                                    animate="animate"
                                    exit="exit"
                                    className={cn(
                                        "relative z-50 w-md flex flex-col gap-6 p-6 rounded-lg pointer-events-auto outline-none",
                                        advancedDialogStyles.content,
                                        className
                                    )}
                                />
                            }
                            {...props}
                        >
                            {children}
                        </DialogPrimitive.Popup>
                    </div>
                )}
            </AnimatePresence>
        </DialogPortal>
    )
}

function DialogHeader({ className, ...props }: React.ComponentProps<"div">) {
    return (
        <div
            data-slot="dialog-header"
            className={cn("flex flex-col gap-2", className)}
            {...props}
        />
    )
}

function DialogBody({ className, ...props }: React.ComponentProps<"div">) {
    return (
        <div
            data-slot="dialog-body"
            className={cn("flex flex-col flex-1", className)}
            {...props}
        />
    )
}

function DialogFooter({ className, ...props }: React.ComponentProps<"div">) {
    return (
        <div
            data-slot="dialog-footer"
            className={cn(
                "flex flex-col-reverse sm:flex-row sm:justify-end gap-2",
                className
            )}
            {...props}
        />
    )
}

function DialogTitle({ className, ...props }: DialogPrimitive.Title.Props) {
    const { inDialog } = React.useContext(DialogContext)
    if (inDialog) {
        return (
            <DialogPrimitive.Title
                data-slot="dialog-title"
                className={cn("text-2xl text-foreground  font-normal", className)}
                {...props}
            />
        )
    }

    return (
        <h2
            data-slot="dialog-title"
            className={cn("text-2xl text-foreground font-medium", className)}
            {...(props as React.ComponentProps<"h2">)}
        />
    )
}

function DialogDescription({
    className,
    ...props
}: DialogPrimitive.Description.Props) {
    const { inDialog } = React.useContext(DialogContext)
    if (inDialog) {
        return (
            <DialogPrimitive.Description
                data-slot="dialog-description"
                className={cn("text-muted text-[0.95rem] leading-normal", className)}
                {...props}
            />
        )
    }

    return (
        <p
            data-slot="dialog-description"
            className={cn("text-muted text-[0.95rem] leading-normal", className)}
            {...(props as React.ComponentProps<"p">)}
        />
    )
}

export {
    Dialog,
    DialogBody,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogOverlay,
    DialogPortal,
    DialogSurface,
    DialogTitle,
    DialogTrigger,
}
