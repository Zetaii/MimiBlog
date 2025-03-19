"use client"

import { ReactNode } from "react"
import PageTransition from "./PageTransition"

interface PageTransitionWrapperProps {
  children: ReactNode
}

export default function PageTransitionWrapper({
  children,
}: PageTransitionWrapperProps) {
  return <PageTransition>{children}</PageTransition>
}
