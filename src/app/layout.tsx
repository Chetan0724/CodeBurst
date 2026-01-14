import { ThemeProvider } from "@/components/theme-provider";
import type { Metadata } from "next";
import { Geist, Geist_Mono, DM_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import EditorProvider from "@/context/EditorProvider";
import SidebarProvider from "@/context/SidebarProvider";
import { Header } from "@/components/Header";
import Footer from "@/components/Footer";
import { ReactQueryProvider } from "@/lib/react-query-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const dmMono = DM_Mono({
  weight: "400",
  variable: "--font-dmmono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CodeBurst — Fast Revision Through Practical Coding",
  description:
    "CodeBurst is a fast and practical coding-revision platform where you solve real programming tasks instead of reading theory. Improve your logic, strengthen concepts, and track your progress through hands-on practice.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${dmMono.variable} antialiased min-h-screen font-sans`}
      >
        <ReactQueryProvider>
          <SidebarProvider>
            <EditorProvider>
              <ThemeProvider
                attribute="class"
                defaultTheme="system"
                enableSystem
                disableTransitionOnChange
              >
                <Header />
                <main>{children}</main>
                <Footer />
                <Toaster />
              </ThemeProvider>
            </EditorProvider>
          </SidebarProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
