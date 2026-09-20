"use client";
import { useState } from "react"
import Image from "next/image"
import { Trash2, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetDescription,
} from "@/components/ui/sheet"
import { useCart } from "@/context/CartContext"
import { useAuth } from "@/context/AuthContext"
import { useCurrency } from "@/context/CurrencyContext"
import tebexLogo from "@/assets/tebex-logo.png"
import { stripHtml } from "@/lib/utils"

import paypalLogo from "@/assets/paypal.svg"
import gpayLogo from "@/assets/google-pay.svg"
import mastercardLogo from "@/assets/mastercard.svg"
import visaLogo from "@/assets/visa.svg"
import amexLogo from "@/assets/amex.svg"



export default function CartSidebar() {
    const { basket, removeItem, subtotal, totalPrice, totalItems, isCartOpen, setCartOpen, checkout } = useCart()
    const { isDiscordConnected, setDiscordModalOpen } = useAuth()
    const { formatPrice } = useCurrency()
    const [removingIds, setRemovingIds] = useState<Set<number>>(new Set())

    const taxes = basket?.sales_tax || 0
    const total = totalPrice
    const items = basket?.packages || []

    const handleRemove = async (id: number) => {
        setRemovingIds(prev => new Set(prev).add(id))
        try {
            await removeItem(id)
        } finally {
            setRemovingIds(prev => {
                const next = new Set(prev)
                next.delete(id)
                return next
            })
        }
    }

    const handleCheckout = () => {
        if (!isDiscordConnected) {
            setDiscordModalOpen(true)
        } else {
            checkout()
        }
    }

    return (
        <Sheet open={isCartOpen} onOpenChange={setCartOpen}>
            <SheetContent className="flex flex-col" open={isCartOpen}>
                <SheetHeader>
                    <SheetTitle>Your cart</SheetTitle>
                    <SheetDescription>{totalItems} item{totalItems !== 1 ? "s" : ""}</SheetDescription>
                </SheetHeader>

                <div className="flex-1 overflow-y-auto -mx-6 px-6">
                    {items.length === 0 ? (
                        <p className="transition-colors duration-200 text-sm font-normal leading-tight text-muted-foreground flex items-center justify-center h-32">
                            Your cart is empty
                        </p>
                    ) : (
                        <div className="flex flex-col gap-3.5">
                            {items.map((item) => {
                                return (
                                    <div
                                        key={item.id}
                                        className={`flex items-stretch gap-3 p-3 rounded-md bg-card-bg border-2 border-card transition-opacity duration-200 ${removingIds.has(item.id) ? "opacity-30 pointer-events-none" : ""
                                            }`}
                                    >
                                        <div className="relative w-40 aspect-video rounded bg-white/5 border-2 border-black/1 shrink-0 flex items-center justify-center overflow-hidden text-muted-foreground text-xs">
                                            {item.image ? (
                                                <Image src={item.image} alt={item.name} fill sizes="160px" className="object-cover" />
                                            ) : (
                                                "IMG"
                                            )}
                                        </div>
                                        <div className="flex flex-col gap-1 justify-between  ">
                                            <div className="flex items-start justify-between">
                                                <p className="transition-colors duration-200 font-medium text-primary-foreground text-lg uppercase truncate pr-2 leading-tight">
                                                    {item.name || "Unknown Item"}
                                                    {item.in_basket.quantity > 1 && <span className="ml-2 text-sm text-muted-foreground">x{item.in_basket.quantity}</span>}
                                                </p>
                                                <button
                                                    onClick={() => handleRemove(item.id)}
                                                    className="text-muted-foreground hover:text-error-foreground transition-colors shrink-0 cursor-pointer disabled:opacity-50"
                                                    aria-label="Remove item"
                                                    disabled={removingIds.has(item.id)}
                                                >
                                                    {removingIds.has(item.id) ? (
                                                        <Loader2 className="size-4.5 animate-spin" />
                                                    ) : (
                                                        <Trash2 className="size-4.5" />
                                                    )}
                                                </button>
                                            </div>

                                            <p className="transition-colors duration-200 text-sm font-normal leading-tight text-muted-foreground line-clamp-2 pr-12">
                                                {stripHtml(item.description)}
                                            </p>

                                            <div className="flex justify-start ">
                                                <p className="transition-colors duration-200 text-lg font-semibold text-accent-foreground whitespace-nowrap text-shadow-accent">
                                                    {formatPrice(item.in_basket.price)}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="border-t-2 border-border -mx-6 px-6 pt-4 flex flex-col gap-5 ">
                    {/* Summary */}
                    <div className="flex flex-col gap-1.5 ">
                        <p className="transition-colors duration-200 text-base font-normal leading-normal text-secondary-foreground flex justify-between ">
                            <span>Subtotal</span>
                            <span>{formatPrice(subtotal || 0)}</span>
                        </p>
                        <p className="transition-colors duration-200 text-base font-normal leading-normal text-secondary-foreground flex justify-between ">
                            <span>Taxes</span>
                            <span>{formatPrice(taxes || 0)}</span>
                        </p>
                        <p className="transition-colors duration-200 font-medium leading-normal flex justify-between text-xl text-primary-foreground border-border">
                            <span>Total</span>
                            <span>{formatPrice(total || 0)}</span>
                        </p>
                    </div>

                    <Button
                        variant="primary"
                        className="w-full py-3.5 text-xl"
                        onClick={handleCheckout}
                    >
                        <img src={tebexLogo.src} alt="Tebex" className="w-3! " />
                        CHECKOUT
                    </Button>

                    <div className="max-w-85 mx-auto flex justify-center gap-5.5">
                        <div className="h-8  rounded flex items-center justify-center">
                            <img src={paypalLogo.src} alt="PayPal" className="h-full object-contain" />
                        </div>
                        <div className="h-8 rounded flex items-center justify-center">
                            <img src={gpayLogo.src} alt="GPay" className="h-full object-contain" />
                        </div>
                        <div className="h-7.5 rounded flex items-center justify-center">
                            <img src={mastercardLogo.src} alt="Mastercard" className="h-full object-contain" />
                        </div>
                        <div className="h-7 rounded flex items-center justify-center">
                            <img src={visaLogo.src} alt="Visa" className="h-full object-contain" />
                        </div>
                        <div className="h-7 rounded flex items-center justify-center">
                            <img src={amexLogo.src} alt="Amex" className="h-full object-contain" />
                        </div>
                    </div>

                    <p className="transition-colors duration-200 text-sm font-normal leading-tight text-muted-foreground text-center -mt-2">
                        All payments are processed in USD. Prices shown in other currencies are estimates based on weekly-updated exchange rates. Final charges may vary depending on your bank's exchange rate and fees.
                    </p>
                </div>
            </SheetContent>
        </Sheet>
    )
}
