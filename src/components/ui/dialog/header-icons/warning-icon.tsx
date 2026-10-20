import * as React from "react"
import { cn } from "@/lib/utils"

export interface WarningIconProps extends React.SVGProps<SVGSVGElement> {
    className?: string
}

export function WarningIcon({ className, ...props }: WarningIconProps) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            className={cn(
                "size-14 shrink-0 overflow-visible",
                className
            )}
            {...props}
        >
            <path
                d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"
                fill="#FFD60A"
            />
            <line
                x1="12"
                y1="9"
                x2="12"
                y2="13.5"
                stroke="#0A0A0A"
                strokeWidth="2"
                strokeLinecap="round"
            />
            <circle
                cx="12"
                cy="16.75"
                r="1.1"
                fill="#0A0A0A"
            />
        </svg>
    )
}
