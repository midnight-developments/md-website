import type { ReactNode } from "react"
import Navbar from "@/components/layout/Navbar"
import Footer from "@/components/layout/Footer"
import AmbientBackground from "@/components/layout/AmbientBackground"
import CartSidebar from "@/components/layout/CartSidebar"
import DiscordGateModal from "@/components/layout/DiscordGateModal"
import CustomScrollbar from "@/components/layout/CustomScrollbar"

interface AppLayoutProps {
    children: ReactNode
}

export default function AppLayout({ children }: AppLayoutProps) {
    return (
        <div className="min-h-screen flex flex-col relative w-full overflow-x-hidden isolate bg-black">
            <AmbientBackground />

            <Navbar />
            <main className="mt-20 py-10 md:py-12 flex-grow min-h-[calc(100dvh-5rem)] w-full max-w-screen-2xl mx-auto px-6 lg:px-12">
                {children}
            </main>
            <Footer />

            <CartSidebar />
            <DiscordGateModal />
            <CustomScrollbar />
        </div>
    )
}
