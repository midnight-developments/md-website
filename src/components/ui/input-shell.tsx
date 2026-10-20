"use client"

import { useRender } from "@base-ui/react/use-render"
import { mergeProps } from "@base-ui/react/merge-props"
import { cn } from "@/lib/utils"

import advancedInputStyles from "./input-shell.module.css"

const inputShellClasses = [
    advancedInputStyles.shell,
    "flex h-9.5 w-full min-w-0 items-center rounded-md px-2.5 transition-snappy outline-none select-none",
    "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
    "has-disabled:pointer-events-none has-disabled:cursor-not-allowed has-disabled:opacity-50",
    "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
].join(" ")

export interface InputShellProps extends useRender.ComponentProps<"div"> {
    className?: any
}

export function InputShell({
    className,
    render,
    ...props
}: InputShellProps) {
    return useRender({
        defaultTagName: "div",
        props: mergeProps(
            {
                className: cn(inputShellClasses, className),
                "data-slot": "input-shell",
            },
            props
        ),
        render,
    })
}
