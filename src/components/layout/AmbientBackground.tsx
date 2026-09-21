import bg from "@/assets/bg.png"
import Starfield from "@/components/layout/Starfield"

export default function AmbientBackground() {
    return (
        <div aria-hidden="true" className="pointer-events-none select-none">
            {/* Ambient colorful gradients & glowing orbs */}
            <div className="fixed inset-0 overflow-hidden opacity-60 z-0">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-900/15 via-indigo-900/10 to-transparent" />
                <div className="absolute bottom-0 left-[12.5%] w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[180px]" />
                <div className="absolute top-0 right-[12.5%] w-[600px] h-[600px] bg-indigo-600/10 rounded-full blur-[180px]" />
            </div>

            {/* Backdrop image */}
            <div
                className="fixed inset-0 -z-20"
                style={{
                    backgroundImage: `url(${bg.src})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    opacity: 0.25,
                    filter: "blur(10px) hue-rotate(45deg)",
                }}
            />

            {/* Dark overlay for contrast */}
            <div className="fixed inset-0 -z-10 bg-black/80" />

            {/* Interactive animated starfield canvas */}
            <Starfield />
        </div>
    )
}
