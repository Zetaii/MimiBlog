"use client"

import { motion } from "framer-motion"
import { ReactNode } from "react"

interface PageTransitionProps {
  children: ReactNode
}

export default function PageTransition({ children }: PageTransitionProps) {
  // Enhanced variants with smoother motion and improved easing
  const variants = {
    hidden: {
      opacity: 0,
      y: 8, // Reduced from 10 for subtler movement
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.65, // Increased from 0.5 for smoother fade in
        ease: [0.1, 0.9, 0.2, 1], // More sophisticated easing curve
      },
    },
    exit: {
      opacity: 0,
      y: -8, // Reduced from -10 for subtler movement
      transition: {
        duration: 0.7, // Increased from 0.6 for an even smoother fade out
        ease: [0.1, 0.9, 0.2, 1], // More sophisticated easing curve
      },
    },
  }

  return (
    <motion.div
      variants={variants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="w-full"
    >
      {children}
    </motion.div>
  )
}
