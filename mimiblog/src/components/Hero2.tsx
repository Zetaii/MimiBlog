"use client"
import React, { useState, useEffect } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { Playfair_Display } from "next/font/google"
import Link from "next/link"

const playfair = Playfair_Display({ subsets: ["latin"] })

type Position = {
  top?: string
  left?: string
  right?: string
  bottom?: string
  xTransform: string
  yTransform: string
}

const Hero2 = () => {
  const [isHovered, setIsHovered] = useState(false)
  const [hasBeenHovered, setHasBeenHovered] = useState(false)
  const [hoveredItem, setHoveredItem] = useState<string | null>(null)
  const [displayedText, setDisplayedText] = useState<string>("")
  const titleText = "Welcome to Mimi's World"

  // Set hasBeenHovered to true when hover happens
  useEffect(() => {
    if (isHovered) {
      setHasBeenHovered(true)
    }
  }, [isHovered])

  // Text animation
  useEffect(() => {
    let i = 0
    const titleAnimation = setInterval(() => {
      if (i <= titleText.length) {
        setDisplayedText(titleText.substring(0, i))
        i++
      } else {
        clearInterval(titleAnimation)
      }
    }, 90)

    return () => clearInterval(titleAnimation)
  }, [])

  // Define fixed positions for each item
  const positions: Record<string, Position> = {
    TRAVEL: { top: "-100px", left: "50%", xTransform: "-50%", yTransform: "0" },
    FASHION: {
      top: "0px",
      right: "-120px",
      xTransform: "0",
      yTransform: "0",
    },
    "TWIN CITIES LOCAL": {
      top: "0px",
      left: "-130px",
      xTransform: "0",
      yTransform: "0",
    },
    WORK: {
      bottom: "25px",
      right: "-75px",
      xTransform: "0",
      yTransform: "0",
    },
    HOBBIES: {
      bottom: "25px",
      left: "-75px",
      xTransform: "0",
      yTransform: "0",
    },
  }

  const textItems = [
    { text: "TRAVEL", href: "/travel" },
    { text: "FASHION", href: "/fashion" },
    { text: "TWIN CITIES LOCAL", href: "/local" },
    { text: "WORK", href: "/work" },
    { text: "HOBBIES", href: "/hobbies" },
  ]

  return (
    <div className="relative flex flex-col items-center justify-between min-h-[100vh] border-b border-black py-0">
      <div className="text-center mb-12">
        <h1
          className={`${playfair.className} text-5xl md:text-6xl lg:text-7xl font-bold mt-8 mb-10 text-black leading-tight`}
        >
          {displayedText}
          <span className="animate-pulse">|</span>
        </h1>
        <motion.p
          className="text-lg md:text-xl text-gray-700 max-w-2xl mx-auto tracking-wide"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5, duration: 0.8 }}
        >
          Join me on my adventures as I explore the world, share travel tips,
          and document life&apos;s beautiful moments.
        </motion.p>
      </div>

      <div
        className="relative w-[300px] md:w-[350px] lg:w-[450px] aspect-square mx-auto mb-16"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <motion.div
          className="relative w-full h-full rounded-full overflow-hidden border-4 border-black"
          animate={{
            scale: isHovered ? 0.95 : 1,
          }}
          transition={{ duration: 0.3 }}
        >
          <Image
            src="/hero-image.png"
            alt="Travel Adventure"
            fill
            className="object-cover"
            priority
          />
        </motion.div>

        {textItems.map((item, index) => {
          const pos = positions[item.text]
          return (
            <Link href={item.href} key={index}>
              <motion.div
                className={`absolute cursor-pointer font-bold text-sm md:text-lg z-10 px-5 py-2 rounded-full border border-black transition-colors duration-300 ${
                  item.text === "TWIN CITIES LOCAL"
                    ? "w-[180px] text-xs md:text-sm"
                    : "w-[100px]"
                } h-[40px] flex items-center justify-center text-center ${
                  hoveredItem === item.text
                    ? "bg-black text-white"
                    : "bg-white text-black"
                }`}
                initial={{
                  opacity: 0,
                  scale: 0.5,
                  left: "50%",
                  top: "50%",
                  right: "auto",
                  bottom: "auto",
                  transform: "translate(-50%, -50%)",
                }}
                animate={{
                  opacity: hasBeenHovered ? 1 : 0,
                  scale: hasBeenHovered ? (isHovered ? 1 : 0.95) : 0.5,
                  top: hasBeenHovered ? pos.top || "auto" : "50%",
                  left: hasBeenHovered ? pos.left || "auto" : "50%",
                  right: hasBeenHovered ? pos.right || "auto" : "auto",
                  bottom: hasBeenHovered ? pos.bottom || "auto" : "auto",
                  transform: hasBeenHovered
                    ? `translate(${pos.xTransform}, ${pos.yTransform})`
                    : "translate(-50%, -50%)",
                }}
                transition={{
                  duration: 0.6,
                  delay: isHovered && !hasBeenHovered ? index * 0.08 : 0,
                  ease: [0.1, 0.9, 0.2, 1],
                  opacity: {
                    duration: 0.8,
                    delay:
                      isHovered && !hasBeenHovered ? 0.2 + index * 0.08 : 0,
                  },
                }}
                onMouseEnter={() => setHoveredItem(item.text)}
                onMouseLeave={() => setHoveredItem(null)}
              >
                {item.text}
              </motion.div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}

export default Hero2
