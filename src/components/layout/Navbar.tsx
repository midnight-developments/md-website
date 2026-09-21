"use client";
import { useState, useEffect } from "react"
import Link from "next/link";
import { usePathname as useLocation } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { ShoppingCart, ChevronDown, LogOut, Menu, X } from "lucide-react"
import PromoBadge from "@/components/layout/PromoBadge"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { useAuth } from "@/context/AuthContext"
import { useCart } from "@/context/CartContext"
import { useCurrency, CURRENCIES, type Currency } from "@/context/CurrencyContext"
import fivemLogo from "@/assets/fivem-logo.png"
import discordLogo from "@/assets/discord.svg"

const navLinks = [
    { label: "Home", href: "/" },
    { label: "Scripts", href: "/scripts" },
    { label: "Bundles", href: "/bundles" },
    { label: "Subscriptions", href: "/subscriptions" },
    { label: "Documentation", href: "https://midnight-dev.gitbook.io/midnight-dev/", isExternal: true },
]

export default function Navbar() {
    const { currency, setCurrency } = useCurrency()
    const { isLoggedIn, username, avatar, login, logout, connectDiscord, disconnectDiscord, isDiscordConnected, discordUser } = useAuth()
    const { totalItems, setCartOpen } = useCart()
    const location = useLocation()

    const toggleDiscord = () => {
        if (isDiscordConnected) {
            disconnectDiscord()
        } else {
            connectDiscord()
        }
    }

    const [scrolled, setScrolled] = useState(false)
    const [mobileOpen, setMobileOpen] = useState(false)

    useEffect(() => {
        const onScroll = () => {
            setScrolled(window.scrollY > 20)
        }
        window.addEventListener("scroll", onScroll, { passive: true })
        onScroll()
        return () => window.removeEventListener("scroll", onScroll)
    }, [])

    useEffect(() => {
        setMobileOpen(false)
    }, [location])

    return (
        <header
            role="banner"
            className={cn(
                "fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b-2",
                scrolled ? "bg-black/50" : "bg-transparent",
                (scrolled || mobileOpen) ? "backdrop-blur-3xl border-border" : "backdrop-blur-none border-transparent"
            )}
        >
            <div className="max-w-screen-2xl mx-auto px-6 lg:px-12 h-16 flex items-center justify-between">
                {/* Left */}
                <div className="flex items-center gap-2 lg:gap-8 h-full">
                    {/* Mobile Menu Toggle */}
                    <Button
                        variant="ghost"
                        className="lg:hidden p-2 -ml-2"
                        onClick={() => setMobileOpen(!mobileOpen)}
                        aria-label="Toggle navigation menu"
                    >
                        {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                    </Button>

                    <Link href="/" className="text-xl font-bold text-foreground tracking-tight flex items-center gap-0.25 shrink-0">
                        <img src="/logo.webp" alt="Midnight Dev Logo" className="h-8 mr-1" />
                        Midnight<span className="text-accent-foreground">Dev</span>
                    </Link>

                    <nav aria-label="Main navigation" className="hidden lg:flex items-center gap-1 h-full">
                        {navLinks.map((link) => {
                            if ('isExternal' in link) {
                                return (
                                    <a
                                        key={link.label}
                                        href={link.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="py-1.75 px-4 flex items-center text-sm font-medium transition-all border-b-2 text-muted-foreground border-transparent hover:text-foreground"
                                    >
                                        {link.label === "Documentation" ? (
                                            <>
                                                <span className="lg:hidden xl:inline">Documentation</span>
                                                <span className="hidden lg:inline xl:hidden">Docs</span>
                                            </>
                                        ) : link.label}
                                    </a>
                                )
                            }

                            const isActive = location === link.href
                            return (
                                <Link
                                    key={link.href}
                                    href={link.href!}
                                    onClick={(e) => {
                                        if (isActive) {
                                            e.preventDefault()
                                        }
                                    }}
                                    className={`py-1.75 px-4 flex items-center text-sm font-medium transition-all border-b-2 hover:text-foreground ${isActive
                                        ? "text-foreground border-white"
                                        : "text-muted-foreground border-transparent"
                                        }`}
                                >
                                    {link.label}
                                </Link>
                            )
                        })}
                    </nav>

                    <PromoBadge className="hidden xl:block ml-0 xl:-ml-4 mt-0.5" />
                </div>

                {/* Right */}
                <div className="flex items-center gap-0 xl:gap-2">
                    <Select
                        value={currency}
                        onValueChange={(v) => setCurrency(v as Currency)}
                    >
                        <SelectTrigger className="hidden sm:flex justify-center w-18 gap-1 text-foreground backdrop-blur-none! shadow-none! bg-transparent border-none p-0 outline-none!">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="max-h-48 overflow-y-auto">
                            {CURRENCIES.map((c) => (
                                <SelectItem key={c} value={c}>
                                    {c}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>

                    {isLoggedIn ? (
                        <>
                            <Button
                                variant="ghost"
                                className="relative p-2 xl:p-4 outline-none! shadow-none!"
                                onClick={() => setCartOpen(true)}
                                aria-label="Open Shopping Cart"
                            >
                                <ShoppingCart className="h-5 w-5" />
                                {totalItems > 0 && (
                                    <span className="absolute top-1 right-1 h-4 w-4 rounded-full bg-accent text-[10px] font-bold flex items-center justify-center text-foreground">
                                        {totalItems}
                                    </span>
                                )}
                            </Button>

                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" className="gap-2 p-4 outline-none! shadow-none!">
                                        <img src={avatar} alt={username} className="size-6 rounded-full" />
                                        <span className="hidden sm:inline text-sm">{username}</span>
                                        <ChevronDown className="h-3 w-3" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" className="w-56">
                                    <DropdownMenuItem onClick={toggleDiscord} className="group">
                                        <div className="flex items-center gap-1.5 flex-1">
                                            <img
                                                src={discordLogo.src}
                                                alt=""
                                                className={cn(
                                                    "size-5 mr-1.5",
                                                    isDiscordConnected ? "opacity-100" : "opacity-50 grayscale group-focus:grayscale-0 group-focus:opacity-100"
                                                )}
                                            />
                                            <span className="flex-1">
                                                {isDiscordConnected ? `${discordUser?.username} - Disconnect` : "Connect Discord"}
                                            </span>
                                        </div>
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem onClick={logout}>
                                        <LogOut className="size-4 mr-1.5 ml-0.5" strokeWidth={2} /> Log Out
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </>
                    ) : (
                        <Button variant="primary" onClick={login}>
                            <img src={fivemLogo.src} alt="" className="h-3 w-3" />
                            Login with FiveM
                        </Button>
                    )}

                </div>
            </div>

            <AnimatePresence>
                {mobileOpen && (
                    <motion.div
                        key="mobile-menu"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2, ease: "easeInOut" }}
                        className="overflow-hidden lg:hidden border-t-2 border-border bg-transparent backdrop-blur-lg"
                    >
                        <nav aria-label="Mobile navigation" className="px-6 py-4 flex flex-col gap-3">
                            {navLinks.map((link) => {
                                if ('isExternal' in link) {
                                    return (
                                        <a
                                            key={link.label}
                                            href={link.href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-lg font-medium py-1.5 transition-colors text-muted-foreground"
                                        >
                                            {link.label === "Documentation" ? (
                                                <>
                                                    <span className="lg:hidden xl:inline">Documentation</span>
                                                    <span className="hidden lg:inline xl:hidden">Docs</span>
                                                </>
                                            ) : link.label}
                                        </a>
                                    )
                                }
                                const isActive = location === link.href
                                return (
                                    <Link
                                        key={link.href}
                                        href={link.href!}
                                        onClick={(e) => {
                                            if (isActive) {
                                                e.preventDefault()
                                            }
                                            setMobileOpen(false)
                                        }}
                                        className={`text-lg font-medium py-1.5 transition-colors ${isActive ? "text-foreground" : "text-muted-foreground"}`}
                                    >
                                        {link.label}
                                    </Link>
                                )
                            })}
                        </nav>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    )
}
