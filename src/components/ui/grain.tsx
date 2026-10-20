import noise from "@/assets/noise-pixel.png"
import { cn } from "@/lib/utils"

export interface GrainProps extends React.ComponentProps<"div"> {
    size?: number | string
    opacity?: number
}

export function Grain({
    size = "50px",
    opacity = 0.075,
    className,
    style,
    ...props
}: GrainProps) {
    const backgroundSize = typeof size === "number" ? `${size}px` : size

    return (
        <div
            aria-hidden="true"
            className={cn("absolute inset-0 pointer-events-none select-none", className)}
            style={{
                backgroundImage: `url(${noise.src})`,
                backgroundSize,
                backgroundRepeat: "repeat",
                opacity,
                ...style,
            }}
            {...props}
        />
    )
}

export default Grain
