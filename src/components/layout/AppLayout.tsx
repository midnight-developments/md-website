import type { ReactNode } from "react"
import bg from "@/assets/bg.png"

import Navbar from "@/components/layout/Navbar"
import Footer from "@/components/layout/Footer"
import CartSidebar from "@/components/layout/CartSidebar"
import DiscordGateModal from "@/components/layout/DiscordGateModal"
import CustomScrollbar from "@/components/layout/CustomScrollbar"

interface AppLayoutProps {
    children: ReactNode
}

export default function AppLayout({ children }: AppLayoutProps) {
    return (
        <div className="min-h-screen flex flex-col relative w-full overflow-x-hidden bg-black/80">
            <div className="fixed inset-0 pointer-events-none overflow-hidden opacity-40">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-indigo-900/10 to-transparent" />
                <div className="absolute bottom-0 left-1/8 w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[160px]" />
                <div className="absolute top-0 right-1/8 w-[600px] h-[600px] bg-indigo-600/10 rounded-full blur-[160px]" />
            </div>
            <div
                className="fixed inset-0 -z-10 pointer-events-none"
                style={{
                    backgroundImage: `url(${bg})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    opacity: 0.8,
                    filter: "blur(70px) hue-rotate(45deg) ",
                }}
            />
            <Navbar />
            <CartSidebar />
            <DiscordGateModal />
            <main className="mt-16 flex-grow">
                {children}
            </main>
            <Footer />
            <CustomScrollbar />
        </div>
    )
}
