import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Convergent Manufacturing Technologies US",
  description: "Advanced composite process simulation services and tools to make composites manufacturing lower risk at every stage of the process.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans antialiased`}>
        <div className="flex min-h-screen flex-col">
          <Header />
          <div className="bg-yellow-50 border-b border-yellow-200 text-yellow-900">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-2 text-sm text-center">
              We are in the process of developing a new website experience; please bear with us as new content is developed.
            </div>
          </div>
          <main className="flex-1">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
