import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Navigation, Provider, Loader, Footer, LogOutBtn } from "@/components";
import { Toaster } from "react-hot-toast";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: " Sparkle world studio | we construct your dream into reality",
  description:
    "Indias best construction company providing best structure  , interior work",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta charSet="UTF-8" />
        <meta name="description" content="Best Construction Company" />
        <meta
          name="keywords"
          content="building, construction engineering ,new construction ,tiny house builders, construction companies near me, construction site , construction materials ,construction worker ,construction management ,general contractor , building construction,remodeling ,constructeur maison, construction companies,builder ,contractor ,contractions ,building"
        />
        <meta name="author" content="Adil Nisar" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="icon" type="image/x-icon" href="/sws.ico"></link>
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Dela+Gothic+One&family=Martian+Mono:wght@800&display=swap"
          rel="stylesheet"
        />
      </head>
      <Provider>
        <body className={`${inter.className}`}>
          <header>
            <Navigation />
            <div className="fixed top-[40px] right-[10px]"></div>
          </header>
          <div className="flex flex-col ">
            <main>
              {/* <Loader /> */}
              {children}
            </main>
            <div className="z-[2]  ">
              <Footer />
            </div>
          </div>
          <Toaster position="top-right" reverseOrder={false} />
          <ReactQueryDevtools />
        </body>
      </Provider>
    </html>
  );
}
