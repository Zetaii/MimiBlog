import type { Metadata } from "next"
import { Playfair_Display } from "next/font/google"
import "./globals.css"
import NavBar from "@/components/NavBar"
import Footer from "@/components/Footer"
import ClientLayout from "@/components/ClientLayout"

const playfair = Playfair_Display({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Mimi Blog",
  description: "A travel and lifestyle blog",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={playfair.className} suppressHydrationWarning>
      <body
        className={`${playfair.className} antialiased min-h-screen bg-gray-200`}
      >
        <div className="flex flex-col min-h-screen">
          <NavBar />
          <main className="flex-grow">
            <ClientLayout>{children}</ClientLayout>
          </main>
          <Footer />
        </div>
      </body>
    </html>
  )
}
