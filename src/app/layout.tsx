import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ClerkProvider, ClerkLoading, ClerkLoaded } from "@clerk/nextjs";
import { Toaster } from "@/components/ui/sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Next.js + Clerk + Prisma Starter",
  description:
    "A starter authentication template for Next.js with Clerk and Prisma",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-background text-foreground`}
        >
          <ClerkLoading>
            <div className="flex items-center justify-center h-screen text-2xl font-medium">
              LOADING...
            </div>
          </ClerkLoading>
          <ClerkLoaded>
            <Toaster richColors theme="light" />
            {children}
          </ClerkLoaded>
        </body>
      </html>
    </ClerkProvider>
  );
}
