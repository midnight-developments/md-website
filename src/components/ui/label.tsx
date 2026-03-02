import { cva } from "class-variance-authority"
import { cn } from "@/lib/utils"

const labelVariants = cva(
    `transition-colors duration-200`,
    {
        variants: {
            variant: {
                input: `text-[0.92rem] font-medium text-primary-foreground cursor-pointer group-data-[disabled=true]/field:opacity-50`,
                primary: `text-base font-medium leading-normal text-primary-foreground`,
                secondary: `text-base font-normal leading-normal text-secondary-foreground`,
                tertiary: `text-sm font-normal leading-tight text-muted-foreground`,
                price: `text-lg font-semibold text-accent-foreground whitespace-nowrap text-shadow-accent`,
            },
        },
        defaultVariants: {
            variant: "primary",
        },
    }
)

const Label = ({
    className,
    variant = "primary",
    htmlFor = "",
    ...props
}: {
    className?: string
    variant?: "input" | "primary" | "secondary" | "tertiary"
    htmlFor?: string
    [key: string]: any
}) => {
    const Tag = htmlFor ? "label" : "p";
    return (
        <Tag
            className={cn(labelVariants({ variant }), className)}
            htmlFor={htmlFor}
            {...props}
        />
    )
}

export { Label, labelVariants }