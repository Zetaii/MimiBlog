"use client"

import { motion } from "framer-motion"

export default function PageLoader() {
  return (
    <motion.div
      className="fixed inset-0 bg-white z-50 flex items-center justify-center"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
    >
      <div className="flex flex-col items-center">
        <div className="w-16 h-16 border-t-4 border-b-4 border-black rounded-full animate-spin"></div>
        <p className="mt-4 text-black font-medium">Loading...</p>
      </div>
    </motion.div>
  )
}
