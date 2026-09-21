import Link from "next/link"
import { Youtube, Instagram, Mail, Globe } from "lucide-react"

const pageLinks = [
    { label: "Home", href: "/", isExternal: false },
    { label: "Scripts", href: "/scripts", isExternal: false },
    { label: "Bundles", href: "/bundles", isExternal: false },
    { label: "Subscriptions", href: "/subscriptions", isExternal: false },
    { label: "Documentation", href: "https://midnight-dev.gitbook.io/midnight-dev/", isExternal: true },
]

const socialLinks = [
    { label: "YouTube", icon: Youtube, href: "https://youtube.com" },
    { label: "Cfx.Re", icon: Globe, href: "https://forum.cfx.re" },
    { label: "Instagram", icon: Instagram, href: "https://instagram.com" },
    { label: "Email", icon: Mail, href: "mailto:contact@midnightdev.net" },
]

const legalLinks = [
    { label: "Tebex Terms", href: "https://www.tebex.io/legal/terms" },
    { label: "Tebex Privacy Policy", href: "https://www.tebex.io/legal/privacy" },
    { label: "Tebex Impressum", href: "https://www.tebex.io/legal/impressum" },
]

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="w-full py-10 lg:py-18 mt-24 bg-black/30 backdrop-blur-xl border-t-2 border-border">
            <div className="max-w-screen-2xl mx-auto px-6 lg:px-12">
                <div className="flex flex-col md:flex-row justify-between gap-10">
                    <div className="w-full max-w-xl flex flex-col sm:flex-row gap-10 justify-between">
                        <div className="flex flex-col gap-4">
                            <h4 className="text-base font-semibold text-foreground">PAGES</h4>
                            <ul className="flex flex-col gap-1.5">
                                {pageLinks.map((link) => (
                                    <li key={link.label}>
                                        {link.isExternal ? (
                                            <a
                                                href={link.href}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-base text-muted-foreground hover:text-foreground transition-colors"
                                            >
                                                {link.label}
                                            </a>
                                        ) : (
                                            <Link
                                                href={link.href}
                                                className="text-base text-muted-foreground hover:text-foreground transition-colors"
                                            >
                                                {link.label}
                                            </Link>
                                        )}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="flex flex-col gap-4">
                            <h4 className="text-base font-semibold text-foreground">SOCIALS</h4>
                            <ul className="flex flex-col gap-1.5">
                                {socialLinks.map((link) => (
                                    <li key={link.label}>
                                        <a
                                            href={link.href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-base text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2"
                                        >
                                            {link.label}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="flex flex-col gap-4">
                            <h4 className="text-base font-semibold text-foreground">LEGAL</h4>
                            <ul className="flex flex-col gap-1.5">
                                {legalLinks.map((link) => (
                                    <li key={link.label}>
                                        <a
                                            href={link.href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-base text-muted-foreground hover:text-foreground transition-colors"
                                        >
                                            {link.label}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    <div className="w-full max-w-xl text-base">
                        <p className="text-muted-foreground mb-4">
                            Copyright © {currentYear} Midnight Dev
                        </p>
                        <p className="text-muted-foreground mb-4">
                            This website's checkout process is operated by Tebex Limited, a third-party payment provider, who handle purchases, product fulfilment, billing support and refunds, allowing us to easily distribute FiveM assets. By completing a purchase, you agree to Tebex's Terms and Conditions and Privacy Policy.
                        </p>
                        <p className="text-muted-foreground">
                            All payments are processed in USD. Prices shown in other currencies are estimates based on weekly-updated exchange rates. The final amount charged may vary depending on your bank or payment provider's exchange rate and fees.
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    )
}
