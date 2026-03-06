"use client";
import { MessageCircle, Shield, Headphones, Gift } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog"
import { useCart } from "@/context/CartContext"
import { useAuth } from "@/context/AuthContext"

const benefits = [
    { icon: Gift, title: "Automatic Role Assignment", description: "Get your purchased product roles instantly" },
    { icon: Headphones, title: "Priority Support", description: "Access dedicated support channels for customers" },
    { icon: Shield, title: "Exclusive Discounts", description: "Members-only deals and early access to new products" },
]

export default function DiscordGateModal() {
    const { isDiscordModalOpen, setDiscordModalOpen } = useCart()
    const { connectDiscord } = useAuth()

    const handleConnect = () => {
        connectDiscord()
        setDiscordModalOpen(false)
    }

    return (
        <Dialog open={isDiscordModalOpen} onOpenChange={setDiscordModalOpen}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                        <MessageCircle className="h-5 w-5 text-accent" />
                        Connect Discord to Continue
                    </DialogTitle>
                    <DialogDescription>
                        Link your Discord account to unlock your purchase benefits and access support.
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-3 py-4">
                    {benefits.map((b) => (
                        <div key={b.title} className="flex items-start gap-3 p-3 rounded-xl bg-white/[0.03] border-2 border-border">
                            <div className="p-2 rounded-lg bg-accent/10">
                                <b.icon className="h-4 w-4 text-accent" />
                            </div>
                            <div>
                                <p className="text-sm font-medium text-primary-foreground">{b.title}</p>
                                <p className="text-xs text-muted-foreground">{b.description}</p>
                            </div>
                        </div>
                    ))}
                </div>

                <Button variant="primary" className="w-full" size="lg" onClick={handleConnect}>
                    <MessageCircle className="h-4 w-4" />
                    Connect Discord
                </Button>
            </DialogContent>
        </Dialog>
    )
}
