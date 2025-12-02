import "@/styles/globals.css";
import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { TRPCReactProvider } from "@/trpc/react";
import { Footer, Header } from "./defaultLayout";

export const metadata: Metadata = {
  title: "Viktor",
  description: "Eine Seite",
};

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html className={`${geist.variable}`} lang="de" data-theme="cerberus">
      <body>
        <TRPCReactProvider>
          <div className="grid h-screen grid-rows-[auto_1fr_auto]">
            <Header />
            <main className="p-4">{children}</main>
            <Footer />
          </div>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
