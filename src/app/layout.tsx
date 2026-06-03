import type { Metadata } from "next";
import { Poppins, Cormorant_Garamond } from "next/font/google";
import { CartProvider } from "@/context/CartContext";
import "./globals.css";
import AnalyticsScripts from "@/components/AnalyticsScripts";
import StructuredData from "@/components/StructuredData";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-cormorant",
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_APP_URL || "https://aeterna.com"
  ),

  title: {
    default: "AETERNA | Guías prácticas de acción digital",
    template: "%s | AETERNA",
  },

  description:
    "Guías prácticas para organizar, automatizar y monetizar conocimiento en la economía digital. Procesos, inteligencia artificial y sistemas de trabajo para profesionales de habla hispana.",

  keywords: [
    "inteligencia artificial",
    "productividad",
    "automatización",
    "economía digital",
    "trabajo remoto",
    "emprendimiento digital",
    "administración digital",
    "procesos",
    "guías digitales",
    "ChatGPT",
    "IA aplicada",
    "AETERNA",
  ],

  authors: [
    {
      name: "AETERNA",
    },
  ],

  creator: "AETERNA",

  publisher: "AETERNA",

  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  openGraph: {
    title: "AETERNA | Guías prácticas de acción digital",

    description:
      "Guías prácticas para organizar, automatizar y monetizar conocimiento en la economía digital.",

    url: process.env.NEXT_PUBLIC_APP_URL,

    siteName: "AETERNA",

    locale: "es_ES",

    type: "website",

    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "AETERNA | Guías prácticas de acción digital",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",

    title: "AETERNA",

    description:
      "Guías prácticas para organizar, automatizar y monetizar conocimiento en la economía digital.",

    images: ["/opengraph-image"],
  },

  alternates: {
    canonical: "/",
  },

  category: "education",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={`${poppins.variable} ${cormorant.variable}`}>
        <AnalyticsScripts />
        <StructuredData />
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  );
}