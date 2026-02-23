import type { Metadata } from "next";
import { Cormorant, DM_Sans, Great_Vibes, Tangerine, Cinzel, Playfair_Display } from "next/font/google";
import "./globals.css";
import { InquiryModalProvider } from "@/context/inquiry-modal-context";
import { InquiryModal } from "@/components/ui/inquiry-modal";

const cormorant = Cormorant({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

// Elegant script font for taglines (fallback until Bellazio font file is added)
const greatVibes = Great_Vibes({
  variable: "--font-bellazio",
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});

// Tangerine - elegant cursive font for hero headlines
const tangerine = Tangerine({
  variable: "--font-tangerine",
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

// Cinzel - luxurious serif for hero tagline
const cinzel = Cinzel({
  variable: "--font-cinzel",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

// Playfair Display - high contrast luxury serif for headlines
const playfairDisplay = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "The Precious Interiors | Crafting Timeless Luxury",
  description:
    "Transform your space with The Precious Interiors. We specialize in creating elegant, functional, and timeless interior designs that reflect your unique story and elevate everyday living.",
  keywords: [
    "interior design",
    "luxury interiors",
    "residential design",
    "commercial design",
    "bespoke furniture",
    "space planning",
    "interior styling",
  ],
  authors: [{ name: "The Precious Interiors" }],
  openGraph: {
    title: "The Precious Interiors | Crafting Timeless Luxury",
    description:
      "Transform your space with The Precious Interiors. We specialize in creating elegant, functional, and timeless interior designs.",
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${cormorant.variable} ${dmSans.variable} ${greatVibes.variable} ${tangerine.variable} ${cinzel.variable} ${playfairDisplay.variable} antialiased bg-cream text-neutral-900`}
      >
        {/* Grain texture overlay */}
        <div className="grain-overlay" aria-hidden="true" />

        <InquiryModalProvider>
          {children}
          <InquiryModal />
        </InquiryModalProvider>
      </body>
    </html>
  );
}
