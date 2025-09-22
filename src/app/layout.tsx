import type { Metadata } from "next";
import { vazirMatn } from "next-persian-fonts/vazirmatn";
import "./globals.css";
import Navbar from "@/components/navbar";
import { ThemeProvider } from "next-themes";
import { ToastContainer } from "react-toastify";
import { BookDashed } from "lucide-react";

export const metadata: Metadata = {
  title: "داشبورد",
  description: "داشبورد مدیریتی کاربران",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <html lang="fa" dir="rtl">
        <body className={`${vazirMatn.className} antialiased`}>
          <ToastContainer limit={3} closeOnClick={true} icon={<></>} toastClassName={`${vazirMatn.className} font-bold`} theme="colored" rtl={true} />
          <Navbar />
          {children}
        </body>
      </html>
    </ThemeProvider>
  );
}
