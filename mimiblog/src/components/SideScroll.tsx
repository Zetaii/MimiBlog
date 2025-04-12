"use client"
import { motion, useTransform, useScroll } from "framer-motion"
import { useRef, useEffect, useState } from "react"
import { useLenis } from "./LenisProvider"

// Types
interface CardType {
  url: string
  title: string
  description: string
  id: number
}

interface CardProps {
  card: CardType
}

// Define a more specific interface for the Lenis instance properties we use
interface LenisWithDuration {
  duration: number
  [key: string]: unknown
}

// Optimized Card component
const Card = ({ card }: CardProps) => {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const img = new Image()
    img.src = card.url
    img.onload = () => setIsLoaded(true)
  }, [card.url])

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.2 }}
      className="sidescroll-card"
    >
      <div
        style={{
          backgroundImage: isLoaded ? `url(${card.url})` : "none",
        }}
        className="sidescroll-card-image"
      />
      <div className="absolute inset-0 bg-neutral-900/10 mix-blend-overlay" />
      <div className="sidescroll-card-overlay" />
      <div className="sidescroll-card-content">
        <motion.h2
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="sidescroll-card-title"
        >
          {card.title}
        </motion.h2>
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="sidescroll-card-description"
        >
          {card.description}
        </motion.p>
      </div>
    </motion.div>
  )
}

// Main carousel component
const HorizontalScrollCarousel = () => {
  const { lenis } = useLenis()
  const containerRef = useRef<HTMLDivElement>(null)

  // Use the scroll progress of the container for the animation
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  // Transform the horizontal position based on scroll progress
  // Adjusted starting position to "5%" to prevent the first card from being cut off
  // Changed the end position to "-85%" to make scrolling faster
  const x = useTransform(scrollYProgress, [0, 1], ["35%", "-85%"])

  // Optimize Lenis scrolling for this section
  useEffect(() => {
    if (!lenis || !containerRef.current) return

    // Store original duration
    const originalDuration = 1.2

    // Function to check if we're in the scroll section and adjust scroll speed
    const handleScroll = () => {
      const rect = containerRef.current?.getBoundingClientRect()
      if (!rect) return

      const inView = rect.top < window.innerHeight && rect.bottom > 0

      // NOTE: The Lenis type definition doesn't include all the properties that are actually
      // available at runtime. We're using a type assertion to work around this limitation.
      const lenisInstance = lenis as unknown as LenisWithDuration

      if (inView) {
        // Set shorter duration for faster scrolling
        lenisInstance.duration = 0.8 // Reduced from 1.8 to 0.8 for faster scrolling
      } else {
        // Restore normal scrolling elsewhere
        lenisInstance.duration = originalDuration
      }
    }

    // Add scroll listener
    window.addEventListener("scroll", handleScroll)

    // Initial check
    handleScroll()

    return () => {
      window.removeEventListener("scroll", handleScroll)
      // Make sure to restore original configuration when cleaning up
      // NOTE: Using the same type assertion approach as above for consistency
      const lenisInstance = lenis as unknown as LenisWithDuration
      lenisInstance.duration = originalDuration
    }
  }, [lenis])

  return (
    <section className="relative" ref={containerRef}>
      {/* This is the tall container that gives us scroll space */}
      <div className="h-[300vh]">
        {" "}
        {/* Reduced from 400vh to 300vh for faster scrolling */}
        {/* This sticky container ensures the carousel stays on screen while scrolling */}
        <div className="sticky top-0 flex h-screen items-center overflow-hidden">
          {/* This is the container that moves horizontally, added padding for the first card */}
          <motion.div style={{ x }} className="flex gap-10 px-12 py-10">
            {cards.map((card) => (
              <Card card={card} key={card.id} />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}

// Main component export
export default function SideScroll() {
  return (
    <div id="side-scroll-section" className="w-full bg-white">
      <div className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 font-serif text-center">
            Explore Our World
          </h2>
          <div className="relative mb-12">
            <div className="w-full h-[2px] bg-black"></div>
            <div className="text-center text-sm text-black mt-3 mb-3 font-serif">
              Journey Through Images
            </div>
            <div className="w-full h-[2px] bg-black"></div>
          </div>
        </div>
      </div>
      <HorizontalScrollCarousel />
    </div>
  )
}

// Data
const cards: CardType[] = [
  {
    url: "https://images.unsplash.com/photo-1500835556837-99ac94a94552?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8dHJhdmVsfGVufDB8fDB8fHww",
    title: "Natural Wonders",
    description: "Explore the breathtaking beauty of autumn landscapes",
    id: 1,
  },
  {
    url: "https://plus.unsplash.com/premium_photo-1664475945300-2a152f7f9e54?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "Mountain Peaks",
    description: "Discover majestic mountain ranges and scenic views",
    id: 2,
  },
  {
    url: "https://plus.unsplash.com/premium_photo-1664475855903-52d6b0d338bb?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "Ocean Depths",
    description: "Dive into the mysterious world beneath the waves",
    id: 3,
  },
  {
    url: "https://images.unsplash.com/photo-1640402882370-eb3d172f026e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "Wildlife",
    description: "Encounter magnificent creatures in their natural habitat",
    id: 4,
  },
  {
    url: "https://images.unsplash.com/photo-1689548803178-736406ff0df0?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "Desert Sands",
    description: "Experience the raw beauty of desert landscapes",
    id: 5,
  },
  {
    url: "https://images.unsplash.com/photo-1601823984263-b87b59798b70?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "Forest Tales",
    description: "Wander through ancient forests and hidden paths",
    id: 6,
  },
  {
    url: "https://images.unsplash.com/photo-1605440704327-02885013fc22?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "Arctic Dreams",
    description: "Witness the pristine beauty of polar regions",
    id: 7,
  },
]
