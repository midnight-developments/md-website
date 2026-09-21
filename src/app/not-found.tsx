import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Home, Compass } from "lucide-react";
import fivemLogo from "@/assets/fivem-logo.png";

export default function NotFound() {
    return (
        <main className="min-h-[80vh] px-8 flex flex-col items-center justify-center text-center relative select-none">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[28rem] h-[28rem] bg-accent/10 blur-[130px] rounded-full pointer-events-none -z-10" />

            <div className="relative z-10 flex flex-col items-center gap-6">
                <div className="flex items-center justify-center gap-2 sm:gap-4 leading-none opacity-70">
                    <span
                        className="text-[12rem] font-semibold tracking-tighter text-foreground"
                    >
                        4
                    </span>
                    <div className="relative flex items-center justify-center">
                        <Image
                            src={fivemLogo}
                            alt="FiveM Logo"
                            priority
                            className="h-[8rem] w-auto object-contain "
                        />
                    </div>
                    <span
                        className="text-[12rem] font-semibold tracking-tighter text-foreground"
                    >
                        4
                    </span>
                </div>

                <div className="space-y-2.5">
                    <h1 className="text-3xl font-semibold tracking-tight text-foreground">
                        We couldn't find the page you were looking for 😔
                    </h1>
                    <p className="text-lg text-muted-foreground/80 max-w-md mx-auto leading-relaxed">
                        In the meantime, check out some of our <Link href="/scripts" className="text-accent underline transition-all hover:text-accent/80">beautiful scripts</Link>. Your server will thank you ;)
                    </p>
                </div>

            </div>
        </main>
    );
}
