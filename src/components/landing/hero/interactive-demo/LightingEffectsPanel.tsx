import bg from "@/assets/bg.png"
import Grain from "@/components/ui/grain"

const lightingEffects = [
    { id: "Rainbow", name: "Rainbow", desc: "Breathing", gradient: "from-red-500 via-yellow-400 to-purple-500", shadow: "shadow-[0_0_10px_rgba(236,72,153,0.4)]" },
    { id: "Police", name: "Police", desc: "Flashing", gradient: "from-red-500 to-blue-500", shadow: "shadow-[0_0_10px_rgba(59,130,246,0.4)]" },
    { id: "UFO", name: "UFO", desc: "Rotating", gradient: "from-green-400 to-emerald-600", shadow: "shadow-[0_0_10px_rgba(16,185,129,0.2)]" }
]

interface LightingEffectsPanelProps {
    activeEffect: string
    setActiveEffect: (id: string) => void
    className?: string
}

export default function LightingEffectsPanel({ activeEffect, setActiveEffect, className = "" }: LightingEffectsPanelProps) {
    return (
        <div className={`relative overflow-hidden w-80 backdrop-blur-3xl bg-card-bg border border-border rounded-md shadow-2xl flex flex-col p-3 gap-3.25 ${className}`}>
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    backgroundImage: `url(${bg.src})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    opacity: 0.6,
                    filter: "blur(60px) hue-rotate(45deg)",
                }}
            />
            <Grain size="50px" opacity={0.075} />

            <div className="relative flex items-center justify-between w-full">
                <p className="font-medium text-foreground flex gap-2 items-center leading-none">
                    <span>Lighting Effect</span>
                </p>
            </div>
            <div className="relative grid grid-cols-2 gap-1.5">
                {lightingEffects.map((effect) => {
                    const isActive = activeEffect === effect.id;
                    return (
                        <button
                            key={effect.id}
                            type="button"
                            onClick={() => setActiveEffect(effect.id)}
                            className={`flex items-center gap-2 rounded border p-2 cursor-pointer transition-all duration-300 text-left ${isActive
                                ? "bg-accent/10 border-2 border-accent/80 shadow-md shadow-accent/20"
                                : "bg-white/5 border-border hover:bg-white/8"
                                }`}
                        >
                            <div className={`w-1 h-8 rounded-[1px] bg-gradient-to-b ${effect.gradient} ${effect.shadow}`} />
                            <div className="flex flex-col gap-1">
                                <p className="text-foreground text-sm leading-none">{effect.name}</p>
                                <p className="text-muted-foreground text-xs leading-none">{effect.desc}</p>
                            </div>
                        </button>
                    )
                })}
            </div>
        </div>
    )
}
