import bg from "@/assets/bg.png"
import Grain from "@/components/ui/grain"
import Starfield from "@/components/layout/Starfield"

export default function AmbientBackground() {
    return (
        <div aria-hidden="true" className="pointer-events-none select-none">
            <Grain className="fixed -z-20" size="100px" opacity={0.2} />

            <div
                className="fixed inset-0 -z-20"
                style={{
                    backgroundImage: `url(${bg.src})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    opacity: 0.25,
                    filter: "blur(15px) hue-rotate(45deg) brightness(0.65)",
                }}
            />

            <div className="fixed inset-0 -z-10 bg-black/50" />

            <Starfield />
        </div>
    )
}
