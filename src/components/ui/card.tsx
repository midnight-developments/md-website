import * as React from "react"

import { cn } from "@/lib/utils"

function Card({
  className,
  size = "default",
  ...props
}: React.ComponentProps<"div"> & { size?: "default" | "sm" }) {
  return (
    <div
      data-slot="card"
      data-size={size}
      className={cn(
        "group/card flex flex-col gap-4 p-4 rounded-md bg-card border border-border overflow-hidden",
        className
      )}
      {...props}
    />
  )
}

function CardHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-header"
      className={cn(
        "group/card-header flex flex-col gap-0.5",
        className
      )}
      {...props}
    />
  )
}

function CardTitle({ className, ...props }: React.ComponentProps<"h3">) {
  return (
    <h3
      data-slot="card-title"
      className={cn(
        "text-xl text-foreground",
        className
      )}
      {...props}
    />
  )
}

function CardTitleIcon({
  className,
  icon: Icon,
  ...props
}: React.ComponentProps<"div"> & {
  icon: React.ComponentType<{ className?: string }>
}) {
  return (
    <div
      data-slot="card-title-icon"
      aria-hidden="true"
      className={cn(
        "flex p-1.5 items-center justify-center rounded-md bg-white/10",
        className
      )}
      {...props}
    >
      <Icon className="size-4" />
    </div>
  )
}

function CardDescription({ className, ...props }: React.ComponentProps<"p">) {
  return (
    <p
      data-slot="card-description"
      className={cn(
        "text-base text-muted",
        className
      )}
      {...props}
    />
  )
}



function CardContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-content"
      className={cn(
        "flex flex-col",
        className
      )}
      {...props}
    />
  )
}



function CardFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-footer"
      className={cn(
        "flex items-center",
        className
      )}
      {...props}
    />
  )
}

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardTitleIcon,
  CardDescription,
  CardContent,
}
