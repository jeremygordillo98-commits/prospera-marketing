import type { Metadata } from "next";
import { Outfit, Plus_Jakarta_Sans } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Prospera - Domina tu dinero, logra tus metas",
  description: "Prospera es el asistente financiero inteligente que convierte el ahorro en un juego. Controla tus gastos, presupuestos y ahorra como un experto.",
  manifest: "/manifest.json",
  icons: {
    icon: "/pwa-icon.png",
    apple: "/pwa-icon.png",
  },
};

export const viewport = {
  themeColor: "#0f172a",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <head>
        <link rel="preconnect" href="https://app.prosperafinanzas.com" />
        <link rel="dns-prefetch" href="https://app.prosperafinanzas.com" />
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet" />
      </head>
      <body
        className={`${outfit.variable} ${plusJakartaSans.variable} antialiased`}
      >
        {children}
        <GoogleAnalytics gaId="G-P1XQS1WPC7" />
      </body>
    </html>
  );
}
