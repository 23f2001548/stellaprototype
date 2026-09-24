import type { Metadata } from "next";
import { Bebas_Neue, Inter } from "next/font/google";
import "./globals.css";

const displayFont = Bebas_Neue({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
  weight: ["400"],
});

const bodyFont = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Stella — The Land of Ale | Kota's Premier Rooftop Bar & Kitchen",
  description:
    "Kota's most premium rooftop bar, lounge & kitchen. 8th Floor, Akash Mall. Craft cocktails, live DJ, rooftop dining with city skyline views. Open daily from 5 PM.",
  keywords: [
    "Stella Kota",
    "rooftop bar Kota",
    "nightlife Kota",
    "best bar in Kota",
    "Akash Mall restaurant",
    "DJ night Kota",
    "craft cocktails Kota",
    "The Land of Ale",
  ],
  openGraph: {
    title: "Stella — The Land of Ale | Kota's Premier Rooftop Bar",
    description:
      "Kota's most premium rooftop bar, lounge & kitchen. 8th Floor, Akash Mall. Craft cocktails, live DJ, rooftop dining.",
    type: "website",
    locale: "en_IN",
    siteName: "Stella — The Land of Ale",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${displayFont.variable} ${bodyFont.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col grain-overlay relative">
        {children}
      </body>
    </html>
  );
}
