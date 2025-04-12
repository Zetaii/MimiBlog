"use client"
import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react"
import Lenis from "@studio-freight/lenis"

// Define the type for our context
type LenisContextType = {
  lenis: Lenis | null
}

// Create context with a default value
const LenisContext = createContext<LenisContextType>({ lenis: null })

// Hook to use Lenis in any component
export const useLenis = () => useContext(LenisContext)

type LenisProviderProps = {
  children: ReactNode
}

export function LenisProvider({ children }: LenisProviderProps) {
  const [lenis, setLenis] = useState<Lenis | null>(null)

  useEffect(() => {
    // Initialize Lenis only on the client side
    if (typeof window === "undefined") return

    // Create new Lenis instance with smooth scrolling config
    const lenisInstance = new Lenis({
      duration: 0.9,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1.2,
      touchMultiplier: 2.5,
    })

    // Set up the animation loop
    function raf(time: number) {
      lenisInstance.raf(time)
      requestAnimationFrame(raf)
    }

    // Start the loop
    requestAnimationFrame(raf)

    // Store the instance in state
    setLenis(lenisInstance)

    // Clean up on unmount
    return () => {
      lenisInstance.destroy()
    }
  }, [])

  return (
    <LenisContext.Provider value={{ lenis }}>{children}</LenisContext.Provider>
  )
}

export default LenisProvider
