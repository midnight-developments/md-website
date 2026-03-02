import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva } from "class-variance-authority"

import { cn } from "@/lib/utils"
import { BASE_INPUT_STYLES } from "@/lib/style-constants"

const buttonVariants = cva(
    `relative  rounded
  px-4 py-1.75
  inline-flex items-center justify-center gap-3
  text-sm font-medium antialiased 
  backdrop-blur-md cursor-pointer
  disabled:pointer-events-none disabled:opacity-50 
  transform-gpu transition-all duration-300 ease-in-out
  [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0`,
    {
        variants: {
            variant: {
                outline:
                    `bg-black/10 border-2 border-input shadow-none
          text-primary-foreground
          hover:bg-black/30`,
                destructive:
                    `bg-error/20 border-2 border-error/30
          text-error-foreground
          hover:scale-[1.02] hover:drop-shadow-[0_0_8px_rgba(244,63,94,0.4)] active:scale-95`,
                primary:
                    `bg-accent-gradient border-2 border-white/5
          text-primary-foreground
          hover:scale-[1.02] hover:shadow-accent active:scale-95`,
                input: cn(`
          mt-0 h-auto
          justify-start gap-3
          text-left
          backdrop-blur-none !px-3
        `, BASE_INPUT_STYLES),
                ghost: `p-0 backdrop-blur-none`,
                link: `text-primary underline-offset-4 hover:underline`,
            },
        },
        defaultVariants: {
            variant: "outline",
        },
    }
)

const Button = React.forwardRef(({ className, variant, children, asChild = false, ...props }: React.ComponentProps<"button"> & { asChild?: boolean }) => {
    const Comp = asChild ? Slot : "button"
    return (
        <Comp
            className={cn(buttonVariants({ variant, className }))}
            {...props}
        >
            {children}
        </Comp>
    )
})
Button.displayName = "Button"

export { Button, buttonVariants }