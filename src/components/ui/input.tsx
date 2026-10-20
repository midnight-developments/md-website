import * as React from "react"
import { Input as InputPrimitive } from "@base-ui/react/input"
import { Lock, Eye, EyeOff } from "lucide-react"

import { cn } from "@/lib/utils"
import { InputShell } from "./input-shell"
import { InputGroup, InputGroupAddon } from "./input-group"

export interface InputProps extends React.ComponentProps<"input"> {
  "data-invalid"?: boolean | string
}

function PasswordInput({ className, id, ref, disabled, ...props }: InputProps) {
  const inputId = id || React.useId()
  const [showPassword, setShowPassword] = React.useState(false)

  return (
    <InputGroup
      data-disabled={disabled ? "" : undefined}
      data-invalid={props["data-invalid"]}
      className={cn("relative cursor-text", className)}
      onClick={(e) => {
        const target = e.target as HTMLElement
        if (target.tagName !== "INPUT" && !target.closest("[data-align='inline-end']")) {
          const input = e.currentTarget.querySelector("input")
          input?.focus()
        }
      }}
    >
      <InputGroupAddon align="inline-start">
        <Lock className="size-4 text-muted" />
      </InputGroupAddon>
      <InputPrimitive
        ref={ref}
        id={inputId}
        type={showPassword ? "text" : "password"}
        disabled={disabled}
        data-slot="input"
        className="h-full w-full flex-1 rounded-none px-0 bg-transparent border-none outline-none ring-0 shadow-none text-base text-foreground placeholder:text-muted disabled:cursor-not-allowed"
        {...props}
      />
      <InputGroupAddon
        align="inline-end"
        className="cursor-pointer hover:text-white"
        onClick={() => setShowPassword(!showPassword)}
      >
        {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
      </InputGroupAddon>
    </InputGroup>
  )
}

function Input({ className, type, id, ref, disabled, ...props }: InputProps) {
  if (type === "password") {
    return (
      <PasswordInput
        ref={ref}
        id={id}
        disabled={disabled}
        className={className}
        {...props}
      />
    )
  }

  const inputId = id || React.useId()

  return (
    <InputShell
      data-disabled={disabled ? "" : undefined}
      data-invalid={props["data-invalid"]}
      className={cn("relative cursor-text", className)}
      onClick={(e) => {
        const target = e.target as HTMLElement
        if (target.tagName !== "INPUT") {
          const input = e.currentTarget.querySelector("input")
          input?.focus()
        }
      }}
    >
      <InputPrimitive
        ref={ref}
        id={inputId}
        type={type}
        disabled={disabled}
        data-slot="input"
        className="h-full w-full bg-transparent border-none outline-none ring-0 shadow-none text-base text-foreground placeholder:text-muted disabled:cursor-not-allowed"
        {...props}
      />
    </InputShell>
  )
}

export { Input, PasswordInput }