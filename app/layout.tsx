import type { Metadata } from "next";
import "./globals.css";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { ClerkProvider } from "@clerk/nextjs";
import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import { extractRouterConfig } from "uploadthing/server";
import { ourFileRouter } from "@/app/api/uploadthing/core";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: "OfferHaus",
  description:
    "Write a winning offer and save thousands on your next home purchase.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" className="relative min-h-full">
        <body className="overflow-x-hidden">
        <NextSSRPlugin
          routerConfig={extractRouterConfig(ourFileRouter)}
        />
          <Toaster position="top-center" closeButton />
          <NavBar />
          <main>{children}</main>
          <Footer />
        </body>
      </html>
    </ClerkProvider>
  );
}
