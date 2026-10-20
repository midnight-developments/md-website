import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import { motion, AnimatePresence } from "framer-motion"

function FieldSet({ className, ...props }: React.ComponentProps<"fieldset">) {
    return (
        <fieldset
            data-slot="field-set"
            className={cn(
                "flex flex-col",
                "[&>[data-slot=radio-group]]:mt-4 [&>[data-slot=card-radio-group]]:mt-3",
                "[&>[data-slot=checkbox-group]]:mt-4 [&>[data-slot=card-checkbox-group]]:mt-3",
                className
            )}
            {...props}
        />
    )
}

function FieldGroup({ className, ...props }: React.ComponentProps<"div">) {
    return (
        <div
            data-slot="field-group"
            className={cn(
                "group/field-group @container/field-group flex w-full flex-col gap-8",
                className
            )}
            {...props}
        />
    )
}

const fieldVariants = cva(
    "group/field flex w-full gap-2",
    {
        variants: {
            orientation: {
                vertical: "flex-col *:w-full [&>.sr-only]:w-auto",
                horizontal:
                    "flex-row gap-2.5 items-center has-[>[data-slot=field-content]]:items-start *:data-[slot=field-label]:flex-auto has-[>[data-slot=field-content]]:[&>[role=checkbox],[role=radio]]:mt-px",
                responsive:
                    "flex-col *:w-full @md/field-group:flex-row @md/field-group:items-center @md/field-group:*:w-auto @md/field-group:has-[>[data-slot=field-content]]:items-start @md/field-group:*:data-[slot=field-label]:flex-auto [&>.sr-only]:w-auto @md/field-group:has-[>[data-slot=field-content]]:[&>[role=checkbox],[role=radio]]:mt-px",
            },
        },
        defaultVariants: {
            orientation: "vertical",
        },
    }
)

function Field({
    className,
    orientation = "vertical",
    ...props
}: React.ComponentProps<"div"> & VariantProps<typeof fieldVariants>) {
    return (
        <div
            data-slot="field"
            data-orientation={orientation}
            className={cn(fieldVariants({ orientation }), className)}
            {...props}
        />
    )
}

function FieldContent({ className, ...props }: React.ComponentProps<"div">) {
    return (
        <div
            data-slot="field-content"
            className={cn(
                "group/field-content flex flex-1 flex-col gap-2.5",
                "group-[]/card-radio:gap-1.25 group-[]/card-checkbox:gap-1.25",
                className
            )}
            {...props}
        />
    )
}

function FieldLabel({
    className,
    ...props
}: React.ComponentProps<"label">) {
    return (
        <label
            data-slot="field-label"
            className={cn(
                "group/field-label peer/field-label text-base font-normal leading-[1] text-foreground cursor-pointer transition-snappy",
                "peer-data-[unchecked]:text-muted peer-data-[checked]:text-foreground",
                className
            )}
            {...props}
        />
    )
}

function FieldTitle({ className, ...props }: React.ComponentProps<"div">) {
    return (
        <div
            data-slot="field-label"
            className={cn(
                "flex w-fit items-center gap-2 text-base group-data-[disabled=true]/field:opacity-50",
                className
            )}
            {...props}
        />
    )
}

function FieldLegend({ className, ...props }: React.ComponentProps<"legend">) {
    return (
        <legend
            data-slot="field-legend"
            className={cn(
                "text-base font-normal leading-[1] text-foreground",
                className
            )}
            {...props}
        />
    )
}

export interface FieldDescriptionProps extends React.ComponentProps<"p"> {
    description?: React.ReactNode
    error?: React.ReactNode
}

function FieldDescription({
    className,
    description,
    error,
    children,
    ...props
}: FieldDescriptionProps) {
    const isError = !!error
    const content = isError ? error : (description ?? children)

    return (
        <div className="w-full relative -mt-0.75">
            <AnimatePresence mode="popLayout" initial={false}>
                {content && (
                    <motion.p
                        key={isError ? "error" : "description"}
                        role={isError ? "alert" : undefined}
                        data-slot={isError ? "field-error" : "field-description"}
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] as any }}
                        className={cn(
                            "text-[0.9rem] leading-tight w-full will-change-transform ",
                            isError
                                ? "font-normal text-destructive"
                                : " text-secondary",
                            className
                        )}
                        {...props as any}
                    >
                        {content}
                    </motion.p>
                )}
            </AnimatePresence>
        </div>
    )
}

function FieldSeparator({ className, ...props }: React.ComponentProps<"hr">) {
    return (
        <hr
            data-slot="field-separator"
            className={cn("border-t border-white/5 my-3 w-full", className)}
            {...props}
        />
    )
}

export {
    Field,
    FieldLabel,
    FieldDescription,
    FieldGroup,
    FieldSet,
    FieldLegend,
    FieldContent,
    FieldTitle,
    FieldSeparator,
}
