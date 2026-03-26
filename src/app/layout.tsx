import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
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
  themeColor: "#0f172a",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <GoogleAnalytics gaId="G-S4WMLC1REB" />
      </body>
    </html>
  );
}
