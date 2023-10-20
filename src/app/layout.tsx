import "./globals.css";
import type { Metadata } from "next";
import { Barlow } from "next/font/google";

const barlow = Barlow({
  subsets: ["latin"],
  fallback: ["sans-serif"],
  weight: ["400", "500", "800", "900"],
});

export const metadata: Metadata = {
  title: "Alpaca Image Generator",
  description:
    "Create your own alpaca characters with the Alpaca Image Generator website. Mix and match backgrounds, accessories, and facial features to design adorable alpacas. It's easy and fun! Get creative and make unique alpaca images on this user-friendly platform. Dive into the world of alpaca art with our web project.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`grid min-h-screen place-items-center bg-gray-200 ${barlow.className}`}
      >
        {children}
      </body>
    </html>
  );
}
