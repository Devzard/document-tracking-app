import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

import { validateRequest } from "@/lib/auth";
import { SessionProvider } from "@/providers/sessionProvider";
import { ThemeProvider } from "@/components/theme-provider";

import { sideNav } from "@/site-config";
import Header from "@/components/Header";
import SideNav from "@/components/SideNav";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Document Tracking App",
  description: "Application to track document",
};

export default async function RootLayout({ children }) {
  const sessionData = await validateRequest();

  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionProvider value={sessionData}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <div className="flex h-screen w-full flex-col divide-y bg-background">
              {sessionData.user ? (
                <>
                  <div className="h-[7%]">
                    <Header sessionData={sessionData} />
                  </div>
                  <div className="flex h-[93%]">
                    <div className="w-1/4 md:w-1/5 lg:w-1/6">
                      <SideNav
                        items={sideNav}
                        footer={
                          <div>
                            &#169;{" "}
                            <a
                              target="_blank"
                              href="https://www.linkedin.com/in/debashish-gogoi-devzard/"
                            >
                              Debashish Gogoi
                            </a>
                          </div>
                        }
                      />
                    </div>
                    <div className="overflow-y-scroll flex w-3/4 items-center justify-center md:w-4/5 lg:w-5/6">
                      {children}
                    </div>
                  </div>
                </>
              ) : (
                <div className="justify-center6 flex w-full items-center">
                  {children}
                </div>
              )}
            </div>
            <Toaster />
          </ThemeProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
