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
import discord from "@/assets/discord.svg"

const benefits = [
    { icon: Gift, title: "Automatic Role Assignment", description: "Get your purchased product roles instantly" },
    { icon: Headphones, title: "Priority Support", description: "Access support channels faster" },
    { icon: Shield, title: "Customer Only Channels", description: "Access exclusive channels for customers" },
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
                        Connect Discord? <span >🥺</span>
                    </DialogTitle>
                    <DialogDescription>
                        Link your Discord account to unlock your purchase benefits and access support
                    </DialogDescription>
                </DialogHeader>

                <div className="flex flex-col gap-3">
                    {benefits.map((b) => (
                        <div key={b.title} className="flex items-center gap-3 p-3  rounded-md bg-white/[0.03] border-2 border-border">
                            <div className="p-2 rounded bg-accent/10">
                                <b.icon className="size-6 text-accent" />
                            </div>
                            <div>
                                <p className="text-base font-medium text-primary-foreground">{b.title}</p>
                                <p className="text-sm text-muted-foreground">{b.description}</p>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="flex flex-col gap-3">
                    <Button variant="primary" className="w-full" size="lg" onClick={handleConnect}>
                        <img src={discord.src} alt="Discord" className="size-6" />
                        Connect Discord
                    </Button>
                    <Button variant="ghost" className="w-full font-normal text-muted-foreground  hover:underline transition-none" onClick={() => setDiscordModalOpen(false)}>
                        I'll do it later
                    </Button>
                </div>

            </DialogContent>
        </Dialog>
    )
}
