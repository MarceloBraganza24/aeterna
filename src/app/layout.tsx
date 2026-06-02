import type { Metadata } from "next";
import { Poppins, Cormorant_Garamond } from "next/font/google";
import { CartProvider } from "@/context/CartContext";
import "./globals.css";

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
  title: "AETERNA | Guías prácticas de acción digital",
  description:
    "Guías prácticas enfocadas en eficiencia de procesos, administración aplicada e inteligencia artificial.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${poppins.variable} ${cormorant.variable}`}>
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  );
}