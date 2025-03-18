"use client"
import Link from "next/link"
import React, { useState, useEffect } from "react"
import Image from "next/image"

const NavBar = () => {
  const [prevScrollPos, setPrevScrollPos] = useState(0)
  const [visible, setVisible] = useState(true)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY

      // Make navbar visible when scrolling up or at the top
      setVisible(prevScrollPos > currentScrollPos || currentScrollPos < 10)

      setPrevScrollPos(currentScrollPos)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [prevScrollPos])

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <div
      className={`fixed top-0 left-0 right-0 z-50 transition-transform duration-300 ${
        visible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="flex w-full bg-white/95 backdrop-blur-sm h-20 items-center justify-between px-8 shadow-sm">
        <div className="text-black font-bold text-4xl flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2">
            <span>Mimi</span>
            <div className="relative h-10 w-10">
              <Image
                src="/pug-logo.png"
                alt="Pug Logo"
                fill
                className="object-contain"
                priority
              />
            </div>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-8 text-xl">
          <Link href="/blogs" className="hover:text-gray-600">
            Blogs
          </Link>
          <Link href="/travel-guides" className="hover:text-gray-600">
            Travel Guides
          </Link>
          <Link href="/create-blog" className="hover:text-gray-600">
            Create Blog
          </Link>
          <Link href="/create-travel-guide" className="hover:text-gray-600">
            Create Guide
          </Link>
          <Link href="/about" className="hover:text-gray-600">
            About
          </Link>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          className="md:hidden text-black p-2"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            {isMenuOpen ? (
              <path d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Navigation Menu */}
      <div
        className={`md:hidden bg-white/95 backdrop-blur-sm shadow-sm transition-all duration-300 ease-in-out ${
          isMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        } overflow-hidden`}
      >
        <div className="flex flex-col space-y-4 px-8 py-6">
          <Link
            href="/blogs"
            className="hover:text-gray-600 text-lg"
            onClick={() => setIsMenuOpen(false)}
          >
            Blogs
          </Link>
          <Link
            href="/travel-guides"
            className="hover:text-gray-600 text-lg"
            onClick={() => setIsMenuOpen(false)}
          >
            Travel Guides
          </Link>
          <Link
            href="/create-blog"
            className="hover:text-gray-600 text-lg"
            onClick={() => setIsMenuOpen(false)}
          >
            Create Blog
          </Link>
          <Link
            href="/create-travel-guide"
            className="hover:text-gray-600 text-lg"
            onClick={() => setIsMenuOpen(false)}
          >
            Create Guide
          </Link>
          <Link
            href="/about"
            className="hover:text-gray-600 text-lg"
            onClick={() => setIsMenuOpen(false)}
          >
            About
          </Link>
        </div>
      </div>
    </div>
  )
}

export default NavBar
