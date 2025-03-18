"use client"
import React from "react"
import Image from "next/image"
import Link from "next/link"
import { Playfair_Display } from "next/font/google"

const playfair = Playfair_Display({ subsets: ["latin"] })

const Hero = () => {
  return (
    <div className="relative flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12 min-h-[80vh] border-b border-black">
      {/* Left content */}
      <div className="flex-1 text-center lg:text-left lg:pl-24 py-12">
        <div className="flex items-center justify-center lg:justify-start gap-2 mb-4">
          <span className="px-3 py-1 bg-black text-white text-sm font-medium tracking-wider rounded-full">
            TRAVEL & LIFESTYLE
          </span>
        </div>
        <h1
          className={`${playfair.className} text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-black leading-tight`}
        >
          Welcome to Mimi's World
        </h1>
        <p className="text-lg md:text-xl text-gray-700 mb-8 max-w-2xl mx-auto lg:mx-0 tracking-wide">
          Join me on my adventures as I explore the world, share travel tips,
          and document life's beautiful moments.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
          <Link
            href="/blogs"
            className="px-8 py-3 bg-black text-white rounded-full font-medium hover:bg-gray-800 transition-colors duration-300 tracking-wide"
          >
            Read My Blog
          </Link>
          <Link
            href="/travel-guides"
            className="px-8 py-3 border-2 border-black text-black rounded-full font-medium hover:bg-black hover:text-white transition-colors duration-300 tracking-wide"
          >
            Travel Guides
          </Link>
        </div>
      </div>

      {/* Right image */}
      <div className="flex-1 w-full max-w-2xl h-[80vh]">
        <div className="relative w-full h-full">
          <Image
            src="/hero-image.png"
            alt="Travel Adventure"
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
            priority
          />
        </div>
      </div>
    </div>
  )
}

export default Hero
