import { useState, useEffect } from "react"
import { Link, useLocation } from "react-router"
import { motion } from "framer-motion"
import { ShoppingCart, ChevronDown, User, LogOut, MessageCircle, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
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

const navLinks = [
    { label: "Home", to: "/" },
    { label: "Scripts", to: "/scripts" },
    { label: "Bundles", to: "/bundles" },
    { label: "Subscriptions", to: "/subscriptions" },
    { label: "Documentation", to: "/docs" },
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
        <motion.nav
            className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
            animate={{
                backgroundColor: scrolled ? "rgba(10, 10, 10, 0.6)" : "rgba(10, 10, 15, 0)",
                backdropFilter: scrolled ? "blur(40px)" : "blur(0px)",
                borderBottomWidth: "2px",
                borderBottomColor: scrolled ? "rgba(255,255,255,0.075)" : "rgba(255,255,255,0)",
            }}
            transition={{ duration: 0.3 }}
        >
            <div className="max-w-screen-2xl mx-auto px-6 lg:px-12 h-16 flex items-center justify-between">
                {/* Left */}
                <div className="flex items-center gap-8 h-full">
                    <Link to="/" className="text-xl font-bold text-primary-foreground tracking-tight">
                        Midnight<span className="text-accent">Dev</span>
                    </Link>
                    <div className="hidden lg:flex items-center gap-1 h-full">
                        {navLinks.map((link) => {
                            const isActive = location.pathname === link.to
                            return (
                                <Link
                                    key={link.to}
                                    to={link.to}
                                    className={`py-1.75 px-4 flex  items-center text-sm font-medium transition-all border-b-2 hover:text-primary-foreground ${isActive
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
                <div className="flex items-center gap-3">
                    {/* Currency Selector */}
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
                                className="relative"
                                onClick={() => setCartOpen(true)}
                            >
                                <ShoppingCart className="h-5 w-5" />
                                {totalItems > 0 && (
                                    <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-accent text-[10px] font-bold flex items-center justify-center text-primary-foreground">
                                        {totalItems}
                                    </span>
                                )}
                            </Button>

                            {/* User Dropdown */}
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" className="gap-2">
                                        <img src={avatar} alt="" className="h-6 w-6 rounded-full" />
                                        <span className="hidden sm:inline text-sm">{username}</span>
                                        <ChevronDown className="h-3 w-3" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" className="w-56">
                                    <DropdownMenuItem>
                                        <User className="mr-2 h-4 w-4" /> Manage Orders
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={connectDiscord}>
                                        <MessageCircle className="mr-2 h-4 w-4" /> Connect Discord
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem onClick={logout}>
                                        <LogOut className="mr-2 h-4 w-4" /> Log Out
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </>
                    ) : (
                        <Button variant="primary" onClick={login}>
                            <img src={fivemLogo} alt="" className="h-3 w-3" />
                            Login with FiveM
                        </Button>
                    )}

                    {/* Mobile Menu Toggle */}
                    <Button
                        variant="ghost"
                        className="lg:hidden"
                        onClick={() => setMobileOpen(!mobileOpen)}
                    >
                        {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                    </Button>
                </div>
            </div>

            {/* Mobile Menu */}
            {mobileOpen && (
                <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="lg:hidden border-t-2 border-border bg-background/95 backdrop-blur-md"
                >
                    <div className="px-6 py-4 flex flex-col gap-3">
                        {navLinks.map((link) => (
                            <Link
                                key={link.to}
                                to={link.to}
                                className={`text-sm font-medium py-2 transition-colors ${location.pathname === link.to ? "text-primary-foreground" : "text-muted-foreground"
                                    }`}
                            >
                                {link.label}
                            </Link>
                        ))}
                    </div>
                </motion.div>
            )}
        </motion.nav>
    )
}
