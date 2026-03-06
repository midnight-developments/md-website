"use client";
import { useState, useEffect } from "react"
import Link from "next/link";
import { usePathname as useLocation } from "next/navigation"
import { motion } from "framer-motion"
import { ShoppingCart, ChevronDown, LogOut, Menu, X, History } from "lucide-react"
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
import fivemLogo from "@/assets/fivem-logo.png"
import discordLogo from "@/assets/discord.svg"

const navLinks = [
    { label: "Home", href: "/" },
    { label: "Scripts", href: "/scripts" },
    { label: "Bundles", href: "/bundles" },
    { label: "Subscriptions", href: "/subscriptions" },
    { label: "Documentation", href: "https://midnight-dev.gitbook.io/midnight-dev/", isExternal: true },
]

const currencies = ["USD", "EUR", "GBP", "CAD", "AUD"]

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false)
    const [mobileOpen, setMobileOpen] = useState(false)
    const [currency, setCurrency] = useState("USD")
    const { isLoggedIn, username, avatar, login, logout, connectDiscord } = useAuth()
    const { totalItems, setCartOpen } = useCart()
    const location = useLocation()

    useEffect(() => {
        const onScroll = (e: any) => {
            const scrollY = e.target.scrollTop || window.scrollY
            setScrolled(scrollY > 20)
        }
        window.addEventListener("scroll", onScroll, true)
        return () => window.removeEventListener("scroll", onScroll, true)
    }, [])

    useEffect(() => {
        setMobileOpen(false)
    }, [location])

    return (
        <nav
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
                    >
                        {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                    </Button>

                    <Link href="/" className="text-xl font-bold text-primary-foreground tracking-tight">
                        Midnight<span className="text-accent">Dev</span>
                    </Link>
                    <div className="hidden lg:flex items-center gap-1 h-full">
                        {navLinks.map((link) => {
                            if ('isExternal' in link) {
                                return (
                                    <a
                                        key={link.label}
                                        href={link.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="py-1.75 px-4 flex items-center text-sm font-medium transition-all border-b-2 text-muted-foreground border-transparent hover:text-primary-foreground"
                                    >
                                        {link.label}
                                    </a>
                                )
                            }

                            const isActive = location === link.href
                            return (
                                <Link
                                    key={link.href}
                                    href={link.href!}
                                    className={`py-1.75 px-4 flex items-center text-sm font-medium transition-all border-b-2 hover:text-primary-foreground ${isActive
                                        ? "text-primary-foreground border-white"
                                        : "text-muted-foreground border-transparent"
                                        }`}
                                >
                                    {link.label}
                                </Link>
                            )
                        })}
                    </div>
                </div>

                {/* Right */}
                <div className="flex items-center gap-2">
                    <Select value={currency} onValueChange={setCurrency}>
                        <SelectTrigger className="hidden sm:flex justify-center w-18 gap-1 text-primary-foreground bg-transparent border-none p-0">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="mt-1">
                            {currencies.map((c) => (
                                <SelectItem key={c} value={c}>
                                    {c}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>

                    {isLoggedIn ? (
                        <>
                            {/* Cart */}
                            <Button
                                variant="ghost"
                                className="relative p-4"
                                onClick={() => setCartOpen(true)}
                            >
                                <ShoppingCart className="h-5 w-5" />
                                {totalItems > 0 && (
                                    <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-accent text-[10px] font-bold flex items-center justify-center text-primary-foreground">
                                        {totalItems}
                                    </span>
                                )}
                            </Button>

                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" className="gap-2 p-4">
                                        <img src={avatar} alt="" className="size-6 rounded-full" />
                                        <span className="hidden sm:inline text-sm">{username}</span>
                                        <ChevronDown className="h-3 w-3" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" className="w-56">
                                    <DropdownMenuItem>
                                        <History className="size-4 mr-1.5 ml-0.5" strokeWidth={2} /> View Purchase History
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={connectDiscord} className="group">
                                        <img src={discordLogo.src} alt="" className="size-5 mr-1 opacity-50 grayscale group-focus:grayscale-0 group-focus:opacity-100" /> Connect Discord
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

            {mobileOpen && (
                <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="lg:hidden border-t-2 border-border bg-transparent backdrop-blur-lg"
                >
                    <div className="px-6 py-4 flex flex-col gap-3">
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
                                        {link.label}
                                    </a>
                                )
                            }
                            return (
                                <Link
                                    key={link.href}
                                    href={link.href!}
                                    className={`text-lg font-medium py-1.5 transition-colors ${location === link.href ? "text-primary-foreground" : "text-muted-foreground"
                                        }`}
                                >
                                    {link.label}
                                </Link>
                            )
                        })}
                    </div>
                </motion.div>
            )}
        </nav>
    )
}
