import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./providers";
import { getBasketOrNull } from "@/services/tebex/baskets";
import NextTopLoader from "nextjs-toploader";
import { Caveat } from "next/font/google";

const caveat = Caveat({
  subsets: ["latin"],
  variable: "--font-caveat",
});

export const metadata: Metadata = {
  title: "Midnight Store",
  description: "Where Premium Scripts Meet Flawless Aesthetics",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const basket = await getBasketOrNull();

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          src={`https://js.tebex.io/v/1.js?public_key=${process.env.TEBEX_PUBLIC_KEY}`}
          async
        />
      </head>
      <body
        className={`antialiased ${caveat.variable}`}
      >
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
