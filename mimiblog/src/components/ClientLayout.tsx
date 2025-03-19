"use client"

import { ReactNode, useState, useEffect, useRef, Suspense } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { usePathname, useSearchParams } from "next/navigation"
import PageTransition from "./PageTransition"

// Create a separate component that uses useSearchParams
function TransitionController({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [showingOverlay, setShowingOverlay] = useState(false)
  const [displayChildren, setDisplayChildren] = useState(children)
  const prevPathRef = useRef(pathname)

  // Generate a unique key for the current route
  const routeKey = pathname + (searchParams?.toString() || "")

  // Handle route changes
  useEffect(() => {
    // Skip the effect on first render
    if (prevPathRef.current === pathname) return

    // Update the ref
    prevPathRef.current = pathname

    // Start transition
    setShowingOverlay(true)

    // Timing sequence for smooth transitions
    const sequence = async () => {
      // Wait for exit animation to be almost complete
      await new Promise((resolve) => setTimeout(resolve, 750))

      // Update content when overlay is visible
      window.scrollTo({ top: 0, behavior: "instant" })
      setDisplayChildren(children)

      // Wait for enter animation
      await new Promise((resolve) => setTimeout(resolve, 650))

      // Complete transition
      setShowingOverlay(false)
    }

    sequence()
  }, [pathname, children, searchParams])

  // Overlay animation variants
  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.4,
        ease: [0.1, 0.9, 0.2, 1], // Matching the page transition easing
      },
    },
    exit: {
      opacity: 0,
      transition: {
        duration: 0.4,
        ease: [0.1, 0.9, 0.2, 1], // Matching the page transition easing
      },
    },
  }

  return (
    <div className="w-full mt-20">
      {/* Content container with relative positioning - starting below navbar */}
      <div className="content-area relative">
        {/* Transition overlay - strictly contained within content area */}
        <AnimatePresence>
          {showingOverlay && (
            <motion.div
              className="absolute inset-0 bg-white z-10 pointer-events-none"
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={overlayVariants}
            />
          )}
        </AnimatePresence>

        {/* Page content */}
        <AnimatePresence mode="wait" initial={false}>
          <PageTransition key={routeKey}>{displayChildren}</PageTransition>
        </AnimatePresence>
      </div>
    </div>
  )
}

// Loading fallback component
function LoadingFallback() {
  return <div className="w-full mt-20">Loading...</div>
}

interface ClientLayoutProps {
  children: ReactNode
}

export default function ClientLayout({ children }: ClientLayoutProps) {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <TransitionController>{children}</TransitionController>
    </Suspense>
  )
}
