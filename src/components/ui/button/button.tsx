"use client"

import * as React from "react"
import { Button as ButtonPrimitive } from "@base-ui/react/button"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import advancedButtonStyles from "./button.module.css"

const buttonVariants = cva(
  [
    "group/button gap-1.5 inline-flex shrink-0 items-center justify-center rounded-md bg-clip-padding cursor-pointer active:scale-[0.98] transition-snappy whitespace-nowrap",
    "disabled:pointer-events-none disabled:opacity-50 select-none outline-none",
    "[&:is(:focus-visible,[data-popup-open],[data-state=open],[aria-expanded=true])]:ring-2",
    "[&:is(:focus-visible,[data-popup-open],[data-state=open],[aria-expanded=true])]:ring-border-active",
  ].join(" "),
  {
    variants: {
      variant: {
        primary: advancedButtonStyles.primary,
        secondary: advancedButtonStyles.secondary,
        outline: advancedButtonStyles.secondary,
        destructive: advancedButtonStyles.destructive,
        ghost:
          "bg-transparent hover:bg-white/10 text-foreground",
        link:
          "h-auto p-0 bg-transparent gap-1 active:scale-[1] text-foreground underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9.5 px-4 text-[0.95rem]",
        sm: "h-8 px-3 text-xs",
        lg: "h-11 px-6 text-lg",
        icon: "h-9 w-9 p-0",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
  VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "default", asChild = false, ...props }, ref) => {
    if (asChild) {
      return (
        <Slot
          ref={ref}
          data-slot="button"
          className={cn(buttonVariants({ variant, size, className }))}
          {...props}
        />
      )
    }

    return (
      <ButtonPrimitive
        ref={ref}
        data-slot="button"
        className={cn(buttonVariants({ variant, size, className }))}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
