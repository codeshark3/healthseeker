import "~/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";
import { cn } from "~/lib/utils";
import { ThemeProvider } from "~/components/ui/theme-provider";
export const metadata: Metadata = {
  title: "healthseeker",
  description: "Generated by create-t3-app",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${GeistSans.variable}`}>
      <body className={cn('min-h-screen bg-dark-300  antialiased')}><ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>{children}</ThemeProvider></body>
    </html>
  );
}