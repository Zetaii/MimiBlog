import { Metadata } from "next"
import { Inter, Playfair_Display } from "next/font/google"
import NavBar from "@/components/NavBar"
import Footer from "@/components/Footer"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })
const playfair = Playfair_Display({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Mimi's Blog",
  description: "Just a girlie",
  icons: {
    icon: "/pug-logo.png",
    apple: "/pug-logo.png",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.className} antialiased min-h-screen bg-gray-200`}
        suppressHydrationWarning
      >
        <NavBar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
