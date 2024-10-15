import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/NavigatorBar";
import { ThemeProvider } from "@/components/ThemeContext";
import { UserProvider } from '@/context/UserContext';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Swift Pulse Hub",
  description: "Task Managing Applications",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider>
        <UserProvider>
        {children}
        </UserProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}