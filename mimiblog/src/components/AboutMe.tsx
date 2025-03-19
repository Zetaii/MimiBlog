"use client"
import React from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { Playfair_Display } from "next/font/google"

const playfair = Playfair_Display({ subsets: ["latin"] })

const AboutMe = () => {
  return (
    <div className="border-b border-black">
      <motion.div
        className="w-full max-w-6xl mx-auto px-4 py-12 mb-16"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h2
          className={`${playfair.className} text-3xl md:text-4xl font-bold mb-8 text-center`}
        >
          About Me
        </h2>

        <div className="flex flex-col md:flex-row items-center md:items-start gap-10">
          <div className="w-full md:w-1/3 flex justify-center">
            <div className="relative w-64 h-80 overflow-hidden rounded-lg shadow-lg border-2 border-black">
              <Image
                src="/aboutme.jpg"
                alt="Mimi Portrait"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>

          <div className="w-full md:w-2/3">
            <p className="text-lg mb-5 leading-relaxed">
              Hi, I&apos;m Mimi! A lifestyle blogger, travel enthusiast, and
              Minnesota native with a passion for exploring both far-off
              destinations and local treasures in the Twin Cities area.
            </p>
            <p className="text-lg mb-5 leading-relaxed">
              When I&apos;m not documenting my adventures or sharing style tips,
              you can find me exploring new restaurants, hiking with friends, or
              curled up with a good book and a cup of coffee at my favorite
              local café.
            </p>
            <p className="text-lg leading-relaxed">
              Through this blog, I hope to inspire you to embrace new
              experiences, discover hidden gems in your own city, and find
              beauty in everyday moments. I believe that life is a collection of
              stories worth sharing, and I&apos;m excited to bring you along for
              the journey!
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default AboutMe
