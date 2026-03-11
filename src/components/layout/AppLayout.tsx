import type { ReactNode } from "react"
import bg from "@/assets/bg.png"

import Navbar from "@/components/layout/Navbar"
import Footer from "@/components/layout/Footer"
import Starfield from "@/components/layout/Starfield"
import CartSidebar from "@/components/layout/CartSidebar"
import DiscordGateModal from "@/components/layout/DiscordGateModal"
import CustomScrollbar from "@/components/layout/CustomScrollbar"

import { PageTransition } from "@/components/layout/PageTransition"

interface AppLayoutProps {
    children: ReactNode
}

export default function AppLayout({ children }: AppLayoutProps) {
    return (
        <div className="min-h-screen flex flex-col relative w-full overflow-x-hidden isolate bg-black">
            <div className="fixed inset-0 pointer-events-none overflow-hidden opacity-60 z-0">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-900/15 via-indigo-900/10 to-transparent" />
                <div className="absolute bottom-0 left-[12.5%] w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[180px]" />
                <div className="absolute top-0 right-[12.5%] w-[600px] h-[600px] bg-indigo-600/10 rounded-full blur-[180px]" />
            </div>
            <div
                className="fixed inset-0 -z-20 pointer-events-none"
                style={{
                    backgroundImage: `url(${bg.src})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    opacity: 0.2,
                    filter: "blur(10px) hue-rotate(45deg) ",
                }}
            />
            <div className="fixed inset-0 -z-10 bg-black/80 pointer-events-none" />
            <Starfield />
            <Navbar />
            <CartSidebar />
            <DiscordGateModal />
            <main className="mt-20 flex-grow ">
                <PageTransition>
                    {children}
                </PageTransition>
            </main>
            <Footer />
            <CustomScrollbar />
        </div>
    )
}
