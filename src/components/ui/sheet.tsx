"use client"

import * as React from "react"
import { createPortal } from "react-dom"
import { motion, AnimatePresence, type Variants } from "framer-motion"
import { cn } from "@/lib/utils"
import { XIcon } from "lucide-react"

import { Button } from "@/components/ui/button"

interface SheetContextValue {
    open: boolean
    setOpen: (open: boolean) => void
}

const SheetContext = React.createContext<SheetContextValue>({
    open: false,
    setOpen: () => {},
})

interface SheetProps {
    open?: boolean
    defaultOpen?: boolean
    onOpenChange?: (open: boolean) => void
    children: React.ReactNode
}

function Sheet({
    open: openProp,
    defaultOpen = false,
    onOpenChange,
    children,
}: SheetProps) {
    const [uncontrolledOpen, setUncontrolledOpen] = React.useState(defaultOpen)
    const isControlled = openProp !== undefined
    const open = isControlled ? Boolean(openProp) : uncontrolledOpen

    const setOpen = React.useCallback(
        (nextOpen: boolean) => {
            if (!isControlled) {
                setUncontrolledOpen(nextOpen)
            }
            onOpenChange?.(nextOpen)
        },
        [isControlled, onOpenChange]
    )

    return (
        <SheetContext.Provider value={{ open, setOpen }}>
            {children}
        </SheetContext.Provider>
    )
}

interface SheetTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    render?: React.ReactElement<{ onClick?: React.MouseEventHandler<any> }>
}

function SheetTrigger({ className, children, render, onClick, ...props }: SheetTriggerProps) {
    const { setOpen } = React.useContext(SheetContext)
    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        onClick?.(e)
        if (!e.defaultPrevented) {
            setOpen(true)
        }
    }
    if (render) {
        return React.cloneElement(render, {
            onClick: (e: React.MouseEvent<HTMLButtonElement>) => {
                render.props.onClick?.(e)
                handleClick(e)
            },
        })
    }
    return (
        <button
            type="button"
            data-slot="sheet-trigger"
            className={className}
            onClick={handleClick}
            {...props}
        >
            {children}
        </button>
    )
}

interface SheetCloseProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    render?: React.ReactElement<{ onClick?: React.MouseEventHandler<any> }>
}

function SheetClose({ className, children, render, onClick, ...props }: SheetCloseProps) {
    const { setOpen } = React.useContext(SheetContext)
    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        onClick?.(e)
        if (!e.defaultPrevented) {
            setOpen(false)
        }
    }
    if (render) {
        return React.cloneElement(render, {
            onClick: (e: React.MouseEvent<HTMLButtonElement>) => {
                render.props.onClick?.(e)
                handleClick(e)
            },
        })
    }
    return (
        <button
            type="button"
            data-slot="sheet-close"
            className={className}
            onClick={handleClick}
            {...props}
        >
            {children}
        </button>
    )
}

function SheetPortal({ children }: { children: React.ReactNode }) {
    const [mounted, setMounted] = React.useState(false)

    React.useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) return null
    return createPortal(children, document.body)
}

const overlayVariants: Variants = {
    initial: { opacity: 0 },
    animate: {
        opacity: 1,
        transition: { duration: 0.25, ease: [0.16, 1, 0.3, 1] },
    },
    exit: {
        opacity: 0,
        transition: { duration: 0.2, ease: [0.16, 1, 0.3, 1] },
    },
}

const sheetVariants: Variants = {
    initial: { x: "100%" },
    animate: {
        x: 0,
        transition: { type: "spring", damping: 30, stiffness: 300, mass: 0.8 },
    },
    exit: {
        x: "100%",
        transition: { duration: 0.25, ease: [0.32, 0.72, 0, 1] },
    },
}

function SheetOverlay({
    className,
    ...props
}: React.ComponentPropsWithoutRef<typeof motion.div>) {
    const { setOpen } = React.useContext(SheetContext)
    return (
        <motion.div
            data-slot="sheet-overlay"
            variants={overlayVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            onClick={() => setOpen(false)}
            className={cn(
                "fixed inset-0 z-50 bg-black/60 backdrop-blur-sm pointer-events-auto",
                className
            )}
            {...props}
        />
    )
}

interface SheetContentProps {
    className?: string
    children?: React.ReactNode
    showCloseButton?: boolean
}

function SheetContent({
    className,
    children,
    showCloseButton = true,
}: SheetContentProps) {
    const { open, setOpen } = React.useContext(SheetContext)

    React.useEffect(() => {
        if (!open) return
        const onKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") setOpen(false)
        }
        window.addEventListener("keydown", onKeyDown)
        return () => window.removeEventListener("keydown", onKeyDown)
    }, [open, setOpen])

    React.useEffect(() => {
        if (!open) return
        const originalOverflow = document.body.style.overflow
        document.body.style.overflow = "hidden"
        return () => {
            document.body.style.overflow = originalOverflow
        }
    }, [open])

    return (
        <SheetPortal>
            <AnimatePresence>
                {open && <SheetOverlay key="sheet-overlay" />}
                {open && (
                    <motion.div
                        key="sheet-content"
                        role="dialog"
                        aria-modal="true"
                        data-slot="sheet-content"
                        variants={sheetVariants}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        className={cn(
                            "fixed inset-y-0 right-0 z-50 flex h-full w-full max-w-lg flex-col gap-4 border-l-2 border-border bg-card-bg p-6 text-sm text-foreground shadow-lg pointer-events-auto outline-none",
                            className
                        )}
                    >
                        {children}
                        {showCloseButton && (
                            <Button
                                variant="ghost"
                                className="absolute top-4 right-4 size-8 p-0"
                                size="icon"
                                onClick={() => setOpen(false)}
                                aria-label="Close"
                            >
                                <XIcon className="size-5" />
                                <span className="sr-only">Close</span>
                            </Button>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </SheetPortal>
    )
}

function SheetHeader({ className, ...props }: React.ComponentProps<"div">) {
    return (
        <div
            data-slot="sheet-header"
            className={cn("flex flex-col gap-1", className)}
            {...props}
        />
    )
}

function SheetFooter({ className, ...props }: React.ComponentProps<"div">) {
    return (
        <div
            data-slot="sheet-footer"
            className={cn("mt-auto flex flex-col gap-2 p-4", className)}
            {...props}
        />
    )
}

function SheetTitle({ className, ...props }: React.ComponentProps<"h2">) {
    return (
        <h2
            data-slot="sheet-title"
            className={cn(
                "cn-font-heading text-3xl font-medium text-foreground",
                className
            )}
            {...props}
        />
    )
}

function SheetDescription({
    className,
    ...props
}: React.ComponentProps<"p">) {
    return (
        <p
            data-slot="sheet-description"
            className={cn("text-xl text-muted-foreground", className)}
            {...props}
        />
    )
}

export {
    Sheet,
    SheetTrigger,
    SheetClose,
    SheetContent,
    SheetHeader,
    SheetFooter,
    SheetTitle,
    SheetDescription,
    SheetPortal,
    SheetOverlay,
}
