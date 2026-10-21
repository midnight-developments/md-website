"use client";
import Image from "next/image"
import { Button } from "@/components/ui/button"
import RemoveFromCartButton from "@/components/products/RemoveFromCartButton"
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetDescription,
} from "@/components/ui/sheet"
import { useCartStore } from "@/stores/useCartStore"
import { useDiscordStore } from "@/stores/useDiscordStore"
import { useFormatPrice } from "@/stores/useCurrencyStore"
import tebexLogo from "@/assets/tebex-logo.png"
import { stripHtml } from "@/lib/utils"

import paypalLogo from "@/assets/paypal.svg"
import gpayLogo from "@/assets/google-pay.svg"
import mastercardLogo from "@/assets/mastercard.svg"
import visaLogo from "@/assets/visa.svg"
import amexLogo from "@/assets/amex.svg"
import bg from "@/assets/bg.png"
import Grain from "@/components/ui/grain"



export default function CartSidebar() {
    const basket = useCartStore((state) => state.basket)
    const subtotal = useCartStore((state) => state.subtotal)
    const taxes = useCartStore((state) => state.taxes)
    const totalPrice = useCartStore((state) => state.totalPrice)
    const totalItems = useCartStore((state) => state.totalItems)
    const isCartOpen = useCartStore((state) => state.isCartOpen)
    const setCartOpen = useCartStore((state) => state.setCartOpen)
    const checkout = useCartStore((state) => state.checkout)
    const isDiscordConnected = useDiscordStore((state) => state.isDiscordConnected)
    const setDiscordModalOpen = useDiscordStore((state) => state.setDiscordModalOpen)
    const formatPrice = useFormatPrice()

    const items = basket?.packages || []

    const handleCheckout = () => {
        if (!isDiscordConnected) {
            setDiscordModalOpen(true)
        } else {
            checkout()
        }
    }

    return (
        <Sheet open={isCartOpen} onOpenChange={setCartOpen}>
            <SheetContent className="flex flex-col">
                <SheetHeader>
                    <SheetTitle>Your cart</SheetTitle>
                    <SheetDescription>{totalItems} item{totalItems !== 1 ? "s" : ""}</SheetDescription>
                </SheetHeader>

                <div className="flex-1 overflow-y-auto -mx-6 px-6">
                    {items.length === 0 ? (
                        <p className="transition-colors duration-200 text-md font-normal leading-tight text-muted-foreground flex items-center justify-center h-32">
                            Your cart is empty
                        </p>
                    ) : (
                        <div className="flex flex-col gap-3.5">
                            {items.map((item) => {
                                return (
                                    <div
                                        key={item.id}
                                        className="relative overflow-hidden flex items-stretch gap-3 p-3 rounded-lg bg-card-bg border border-border transition-all duration-300"
                                    >
                                        <div
                                            className="absolute inset-0 pointer-events-none"
                                            style={{
                                                backgroundImage: `url(${bg.src})`,
                                                backgroundSize: "cover",
                                                backgroundPosition: "center",
                                                backgroundRepeat: "no-repeat",
                                                opacity: 0.7,
                                                filter: "blur(60px) hue-rotate(45deg)",
                                            }}
                                        />
                                        <Grain size="50px" opacity={0.1} />

                                        <div className="relative z-10 w-40 aspect-video rounded bg-white/5 border-2 border-black/1 shrink-0 flex items-center justify-center overflow-hidden text-muted-foreground text-xs">
                                            {item.image ? (
                                                <Image src={item.image} alt={item.name} fill sizes="160px" className="object-cover" />
                                            ) : (
                                                "IMG"
                                            )}
                                        </div>
                                        <div className="relative z-10 flex flex-col gap-2 justify-between flex-1 min-w-0">
                                            <div className="flex flex-col gap-1">
                                                <p className="transition-colors duration-200 font-medium text-foreground text-lg uppercase truncate pr-2 leading-tight">
                                                    {item.name || "Unknown Item"}
                                                    {item.in_basket.quantity > 1 && <span className="ml-2 text-sm text-muted-foreground">x{item.in_basket.quantity}</span>}
                                                </p>
                                                <p className="transition-colors duration-200 text-lg font-bold bg-accent-gradient text-transparent bg-clip-text whitespace-nowrap leading-none">
                                                    {formatPrice(item.in_basket.price)}
                                                </p>

                                            </div>


                                            <RemoveFromCartButton
                                                product={item}
                                                className="h-8 text-sm w-45 gap-1"
                                            />
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    )}
                </div>

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
                        <p className="transition-colors duration-200 font-medium leading-normal flex justify-between text-xl text-foreground border-border">
                            <span>Total</span>
                            <span>{formatPrice(totalPrice || 0)}</span>
                        </p>
                    </div>

                    <Button
                        variant="primary"
                        className="w-full py-6 text-xl font-semibold gap-2"
                        onClick={handleCheckout}
                    >
                        <img src={tebexLogo.src} alt="Tebex" className="w-2.5! " />
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
