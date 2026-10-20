import * as React from "react"
import { cn } from "@/lib/utils"
import advancedDialogStyles from "./dialog.module.css"

export interface DialogSurfaceProps extends React.ComponentProps<"div"> { }

export function DialogSurface({ className, ...props }: DialogSurfaceProps) {
    return (
        <div
            data-slot="dialog-surface"
            className={cn(
                "relative w-md flex flex-col gap-10 p-6 rounded-xl outline-none",
                advancedDialogStyles.content,
                className
            )}
            {...props}
        />
    )
}
