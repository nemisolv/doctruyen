import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { Toaster } from "@/components/ui/toaster"



import "./globals.css";
import {Inter} from 'next/font/google';

const inter = Inter({subsets: ['latin']})

export const metadata: Metadata = {
  title: 'DocTruyen',
  description: 'Read your favorite stories, comics, and mangas for free.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
    <html lang="en">
      <body
        className={`${inter.className} h-full bg-white dark:bg-[#313338]`}
      >
        <ThemeProvider
         attribute="class"
         defaultTheme="dark"
         enableSystem
         storageKey="doctruyen-theme"
        >
        {children}
        <Toaster />
        </ThemeProvider>
      </body>
    </html>
    </ClerkProvider>
  );
}
