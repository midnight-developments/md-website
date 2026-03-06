"use client";
import { Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetDescription,
} from "@/components/ui/sheet"
import { useCart } from "@/context/CartContext"
import tebexLogo from "@/assets/tebex-logo.png"

import paypalLogo from "@/assets/paypal.svg"
import gpayLogo from "@/assets/google-pay.svg"
import mastercardLogo from "@/assets/mastercard.svg"
import visaLogo from "@/assets/visa.svg"
import amexLogo from "@/assets/amex.svg"



export default function CartSidebar() {
    const { items, removeItem, subtotal, totalItems, isCartOpen, setCartOpen } = useCart()
    const taxes = subtotal * 0.0
    const total = subtotal + taxes

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
                            {items.map((item) => (
                                <div
                                    key={item.product.id}
                                    className="flex items-stretch gap-3 p-3 rounded-md bg-card-bg border-2 border-card"
                                >
                                    <div className="w-32 aspect-video rounded bg-white/5 shrink-0 flex items-center justify-center text-muted-foreground text-xs">
                                        IMG
                                    </div>
                                    <div className="flex flex-col gap-1 justify-between  ">
                                        <div className="flex items-start justify-between">
                                            <p className="transition-colors duration-200 font-medium text-primary-foreground text-lg uppercase truncate pr-2 leading-tight">
                                                {item.product.name}
                                            </p>
                                            <button
                                                onClick={() => removeItem(item.product.id)}
                                                className="text-muted-foreground hover:text-error-foreground transition-colors shrink-0 cursor-pointer"
                                                aria-label="Remove item"
                                            >
                                                <Trash2 className="size-4.5" />
                                            </button>
                                        </div>

                                        <p className="transition-colors duration-200 text-sm font-normal leading-tight text-muted-foreground line-clamp-2 pr-12">
                                            {item.product.shortDescription}
                                        </p>

                                        <div className="flex justify-start ">
                                            <p className="transition-colors duration-200 text-lg font-semibold text-accent-foreground whitespace-nowrap text-shadow-accent">
                                                {item.product.price.toFixed(2)} USD
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="border-t-2 border-border -mx-6 px-6 pt-4 flex flex-col gap-5 ">
                    {/* Summary */}
                    <div className="flex flex-col gap-1.5 ">
                        <p className="transition-colors duration-200 text-base font-normal leading-normal text-secondary-foreground flex justify-between ">
                            <span>Subtotal</span>
                            <span>{subtotal.toFixed(2)} USD</span>
                        </p>
                        <p className="transition-colors duration-200 text-base font-normal leading-normal text-secondary-foreground flex justify-between ">
                            <span>Taxes</span>
                            <span>{taxes.toFixed(2)} USD</span>
                        </p>
                        <p className="transition-colors duration-200 font-medium leading-normal flex justify-between text-xl text-primary-foreground border-border">
                            <span>Total</span>
                            <span>{total.toFixed(2)} USD</span>
                        </p>
                    </div>

                    <Button variant="primary" className="w-full py-3.5 text-xl">
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
