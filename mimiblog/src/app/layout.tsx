import { Metadata } from "next"
import { Inter } from "next/font/google"
import NavBar from "@/components/NavBar"
import Footer from "@/components/Footer"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

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
    <html lang="en">
      <body
        className={`${inter.className} antialiased min-h-screen flex flex-col`}
      >
        <NavBar />
        <div className="flex-grow pt-20">{children}</div>
        <Footer />
      </body>
    </html>
  )
}
