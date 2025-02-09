"use client";

import { Roboto } from "next/font/google";
import "./globals.css";
import { AlertProvider } from "@/context/AlertProvider";
import { ThemeProvider } from "@/context/ThemeProvider";
import UnloggedLayout from "@/layouts/UnloggedLayout";
import LoggedLayout from "@/layouts/LoggedLayout";
import { usePathname } from "next/navigation";

const roboto = Roboto({
  weight: ["400", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const isAuthPage = pathname.startsWith("/auth");

  return (
    <html lang="en">
      <head>
        <title>Elevator Telephony</title>
        <link rel="icon" href="public/favicon.ico" />
      </head>
      <body className={roboto.className}>
        <ThemeProvider>
          <AlertProvider>
            {isAuthPage ? (
              <UnloggedLayout>{children}</UnloggedLayout>
            ) : (
              <LoggedLayout>{children}</LoggedLayout>
            )}
          </AlertProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
