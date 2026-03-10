"use client";
import React, { useEffect, useRef } from "react";
import { toast } from "sonner";
import discordLogo from "@/assets/discord.svg";

export default function PromoToast() {
    const hasFired = useRef(false);

    useEffect(() => {
        if (!hasFired.current) {
            const hasSeen = sessionStorage.getItem("promo_toast_seen");
            if (!hasSeen) {
                hasFired.current = true;
                const timer = setTimeout(() => {
                    toast.info("GET 40% OFF", {
                        description: "Find a 40% discount by joining our discord server",
                        duration: Infinity,
                        closeButton: true,
                        icon: <img src={discordLogo.src} alt="Discord" className="w-4 h-4" />,
                        action: {
                            label: "Join Discord",
                            onClick: () => {
                                window.open("https://discord.gg/midnightdev", "_blank");
                            }
                        },
                        cancel: {
                            label: "Dismiss",
                            onClick: () => {
                                sessionStorage.setItem("promo_toast_seen", "true");
                            }
                        },
                        onDismiss: () => {
                            sessionStorage.setItem("promo_toast_seen", "true");
                        }
                    });
                }, 1500);
                return () => clearTimeout(timer);
            }
        }
    }, []);

    return null;
}
