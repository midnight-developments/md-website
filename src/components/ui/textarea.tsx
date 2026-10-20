import * as React from "react"
import { cn } from "@/lib/utils"
import { InputShell } from "@/components/ui/input-shell"

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
    return (
        <InputShell
            render={
                <textarea
                    data-slot="textarea"
                    className={cn(
                        "field-sizing-content min-h-16 py-2 h-auto cursor-text",
                        className
                    )}
                    {...props}
                />
            }
        />
    )
}

export { Textarea }
