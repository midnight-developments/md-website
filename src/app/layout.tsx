import Script from "next/script";
import "./globals.css";
import { Providers } from "./providers";
import { getBasketOrNull } from "@/actions/baskets";
import NextTopLoader from "nextjs-toploader";
import { Caveat, Outfit } from "next/font/google";

const caveat = Caveat({
  subsets: ["latin"],
  variable: "--font-caveat",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const basket = await getBasketOrNull();

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`antialiased ${outfit.variable} ${caveat.variable}`}
      >
        <Script
          src={`https://js.tebex.io/v/1.js?public_key=${process.env.TEBEX_PUBLIC_KEY}`}
          strategy="afterInteractive"
        />
        <NextTopLoader
          color="#6464e6"
          initialPosition={0.08}
          crawlSpeed={200}
          height={4}
          crawl={true}
          showSpinner={false}
          easing="ease"
          speed={200}
          shadow="0 0 10px #6464e6,0 0 5px #6464e6"
        />
        <Providers initialBasket={basket}>
          {children}
        </Providers>
      </body>
    </html>
  );
}
