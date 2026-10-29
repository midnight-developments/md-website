import { Slider } from "@/components/ui/slider"
import bg from "@/assets/bg.png"
import Grain from "@/components/ui/grain"

interface AnimationSpeedPanelProps {
    speed: number
    setSpeed: (speed: number) => void
    className?: string
}

export default function AnimationSpeedPanel({ speed, setSpeed, className = "" }: AnimationSpeedPanelProps) {
    return (
        <div className={`relative overflow-hidden w-80 backdrop-blur-3xl bg-card-bg border border-border rounded-md shadow-2xl flex flex-col p-3 pb-4 gap-3.25 ${className}`}>
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    backgroundImage: `url(${bg.src})`,
                    backgroundSize: "cover",
                    backgroundPosition: "top right",
                    backgroundRepeat: "no-repeat",
                    opacity: 0.5,
                    filter: "blur(60px) hue-rotate(45deg)",
                }}
            />
            <Grain size="40px" opacity={0.1} />

            <div className="relative flex items-center justify-between w-full">
                <p className="font-medium text-foreground flex gap-0.5 items-center leading-none">
                    <span>Animation Speed</span>
                </p>
                <span className="font-bold rounded-xs text-foreground leading-none">
                    {speed}
                </span>
            </div>
            <Slider value={[speed]} onValueChange={(v) => setSpeed(v[0])} max={100} step={1} />
        </div>
    )
}
