import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import advancedBadgeStyles from "./badge.module.css"

const badgeVariants = cva(
  "group/badge inline-flex w-fit shrink-0 items-center justify-center gap-1 overflow-hidden rounded-full whitespace-nowrap transition-all has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 data-[invalid]:border-destructive [&>svg]:pointer-events-none [&>svg]:size-3!",
  {
    variants: {
      variant: {
        primary: advancedBadgeStyles.primary,
        default: advancedBadgeStyles.primary,
        secondary: advancedBadgeStyles.secondary,
        destructive: advancedBadgeStyles.destructive,
        success: advancedBadgeStyles.success,
        warning: advancedBadgeStyles.warning,
        orange: advancedBadgeStyles.orange,
        outline: "border border-border text-muted-foreground bg-transparent",
        flat: "border-transparent bg-white/10 text-foreground [a]:hover:bg-white/15 shadow-none",
        ghost: "hover:bg-muted/50 hover:text-muted-foreground",
        link: "text-foreground underline-offset-4 hover:underline",
        qbcore: advancedBadgeStyles.destructive,
        qbox: advancedBadgeStyles.warning,
        esx: advancedBadgeStyles.orange,
        standalone: advancedBadgeStyles.success,
      },
      size: {
        default: "px-3.5 py-1 text-[13px]",
        sm: "px-2.5 py-0.5 text-[13px]",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  }
)

export interface BadgeProps
  extends React.ComponentProps<"span">,
  VariantProps<typeof badgeVariants> { }

function Badge({
  className,
  variant = "primary",
  size = "default",
  ...props
}: BadgeProps) {
  return (
    <span
      data-slot="badge"
      className={cn(badgeVariants({ variant, size }), className)}
      {...props}
    />
  )
}

export { Badge, badgeVariants }
