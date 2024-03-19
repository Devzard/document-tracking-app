import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster"

import { validateRequest } from "@/lib/auth";
import { SessionProvider } from "@/providers/sessionProvider";

import Header from "@/components/Header";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Document Tracking App",
  description: "Application to track document",
};

export default async function RootLayout({ children }) {
  const sessionData = await validateRequest()

  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionProvider value={sessionData}>
          <div className="flex flex-col w-full divide-y">
            <Header />    
            {children}
          </div>
        </SessionProvider>
        <Toaster />
      </body>
    </html>
  );
}
