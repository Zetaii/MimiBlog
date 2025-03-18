"use client"
import React, { useState } from "react"
import Link from "next/link"

const Footer = () => {
  const [email, setEmail] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Implement newsletter signup
    console.log("Newsletter signup:", email)
    setEmail("")
  }

  return (
    <footer className="w-full bg-white border-t border-gray-200">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Site Map */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Site Map</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/"
                  className="text-gray-600 hover:text-black transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/blogs"
                  className="text-gray-600 hover:text-black transition-colors"
                >
                  Blogs
                </Link>
              </li>
              <li>
                <Link
                  href="/travel-guides"
                  className="text-gray-600 hover:text-black transition-colors"
                >
                  Travel Guides
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-gray-600 hover:text-black transition-colors"
                >
                  About
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Social</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="https://instagram.com/mimi"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-black transition-colors"
                >
                  Instagram
                </a>
              </li>
              <li>
                <a
                  href="https://tiktok.com/@mimi"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-black transition-colors"
                >
                  TikTok
                </a>
              </li>
              <li>
                <a
                  href="https://youtube.com/@mimi"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-black transition-colors"
                >
                  YouTube
                </a>
              </li>
              <li>
                <a
                  href="https://twitch.tv/mimi"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-black transition-colors"
                >
                  Twitch
                </a>
              </li>
              <li>
                <a
                  href="https://discord.gg/mimi"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-black transition-colors"
                >
                  Discord
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Newsletter</h3>
            <p className="text-gray-600 mb-4">
              Hey Foodies, thanks for visiting! Join my mailing list for more
              delicious recipes and stories
            </p>
            <form
              onSubmit={handleSubmit}
              className="flex flex-col sm:flex-row gap-2"
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email Address"
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                required
              />
              <button
                type="submit"
                className="px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors duration-300"
              >
                Join
              </button>
            </form>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-8 border-t border-gray-200">
          <p className="text-center text-gray-600">
            Created By Mimi Huynh © {new Date().getFullYear()}
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
