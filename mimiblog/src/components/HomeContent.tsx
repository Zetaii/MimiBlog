"use client"
import React from "react"
import Hero from "@/components/Hero"
import Blogs from "@/components/Blogs"
import TravelGuides from "@/components/TravelGuides"
import Link from "next/link"
import Image from "next/image"

// Define local interfaces that match the component's needs
interface BlogPostWithId {
  id: string
  title: string
  description: string
  content: string
  imageUrls: string[]
  createdAt: Date
}

interface TravelGuideWithId {
  id: string
  title: string
  description: string
  content: string
  location: string
  duration: string
  imageUrls: string[]
  createdAt: Date
}

interface HomeContentProps {
  recentBlogs: BlogPostWithId[]
  recentGuides: TravelGuideWithId[]
}

export default function HomeContent({
  recentBlogs,
  recentGuides,
}: HomeContentProps) {
  // Sample social media content (replace with your actual content)
  const socialContent = {
    tiktok: [
      {
        id: 1,
        thumbnail: "/tiktok-1.jpg",
        title: "Travel Vlog #1",
      },
      { id: 2, thumbnail: "/tiktok-2.jpg", title: "Food Review" },
      {
        id: 3,
        thumbnail: "/tiktok-3.jpg",
        title: "Adventure Time",
      },
    ],
    youtube: [
      {
        id: 1,
        thumbnail: "/youtube-1.jpg",
        title: "Travel Guide: Paris",
      },
      {
        id: 2,
        thumbnail: "/youtube-2.jpg",
        title: "Hotel Review",
      },
      {
        id: 3,
        thumbnail: "/youtube-3.jpg",
        title: "Travel Tips",
      },
    ],
    instagram: [
      {
        id: 1,
        image: "/instagram-1.jpg",
        caption: "Beautiful sunset",
      },
      { id: 2, image: "/instagram-2.jpg", caption: "City views" },
      { id: 3, image: "/instagram-3.jpg", caption: "Beach day" },
    ],
  }

  return (
    <div className="min-h-screen bg-gray-200">
      <div className="max-w-[1850px] mx-auto bg-white shadow-lg mt-8 border border-black">
        <div className="pt-8">
          <Hero />
        </div>
        <div className="px-12 py-8">
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-8">Recent Blogs</h2>
            <div className="relative mb-12">
              <div className="w-full h-[2px] bg-black"></div>
              <div className="text-left text-sm text-black mt-3 mb-3">
                My Thoughts |{" "}
                <Link
                  href="/blogs"
                  className="text-blue-600 hover:text-blue-800"
                >
                  View All Blogs
                </Link>
              </div>
              <div className="w-full h-[2px] bg-black"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mt-12">
              {recentBlogs.map((post) => (
                <Blogs key={post.id} post={post} />
              ))}
            </div>
          </section>

          <div className="border-t-1 border-gray-600 my-20 -mx-12"></div>

          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-8">Recent Travel Guides</h2>
            <div className="relative mb-12">
              <div className="w-full h-[2px] bg-black"></div>
              <div className="text-left text-sm text-black mt-3 mb-3">
                My Adventures |{" "}
                <Link
                  href="/travel-guides"
                  className="text-blue-600 hover:text-blue-800"
                >
                  View All Travel Guides
                </Link>
              </div>
              <div className="w-full h-[2px] bg-black"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mt-12">
              {recentGuides.map((guide) => (
                <TravelGuides key={guide.id} post={guide} />
              ))}
            </div>
          </section>

          <div className="border-t-1 border-gray-600 my-20 -mx-12"></div>

          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-4">Social Media</h2>
            <div className="relative">
              <div className="w-full h-[2px] bg-black"></div>
              <div className="text-left text-black mt-4 mb-2">
                Let&apos;s connect |{" "}
                <Link
                  href="https://instagram.com/mimi"
                  target="_blank"
                  className="text-blue-600 hover:text-blue-800"
                >
                  @mimi
                </Link>
              </div>
              <div className="w-full h-[2px] bg-black"></div>
            </div>

            {/* Social Media Links */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8 mb-12">
              <Link
                href="https://instagram.com/mimi"
                target="_blank"
                className="flex items-center justify-center p-6 bg-black rounded-lg text-white hover:opacity-90 transition-opacity"
              >
                <span className="text-xl font-semibold">Instagram</span>
              </Link>
              <Link
                href="https://tiktok.com/@mimi"
                target="_blank"
                className="flex items-center justify-center p-6 bg-black rounded-lg text-white hover:opacity-90 transition-opacity"
              >
                <span className="text-xl font-semibold">TikTok</span>
              </Link>
              <Link
                href="https://youtube.com/@mimi"
                target="_blank"
                className="flex items-center justify-center p-6 bg-black rounded-lg text-white hover:opacity-90 transition-opacity"
              >
                <span className="text-xl font-semibold">YouTube</span>
              </Link>
            </div>

            {/* TikTok Videos */}
            <div className="mb-16 bg-gradient-to-br from-zinc-900 to-black rounded-2xl p-8 shadow-xl">
              <h3 className="text-3xl font-bold mb-6 text-white">
                Latest TikToks
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {socialContent.tiktok.map((video) => (
                  <div
                    key={video.id}
                    className="relative aspect-[9/16] bg-zinc-800 rounded-xl overflow-hidden group w-full max-w-[200px] mx-auto transform transition-all duration-300 hover:scale-105 hover:shadow-2xl"
                  >
                    <Image
                      src={video.thumbnail}
                      alt={video.title}
                      fill
                      sizes="(max-width: 640px) 33vw, (max-width: 1024px) 25vw, 16vw"
                      className="object-cover"
                      loading="eager"
                      onError={(e) => {
                        console.error(
                          `Error loading TikTok image: ${video.thumbnail}. Please check if the file exists in the public directory.`
                        )
                        const imgElement = e.target as HTMLImageElement
                        imgElement.src = `/instagram-${video.id}.jpg`
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent">
                      <div className="absolute bottom-0 left-0 right-0 p-3 text-white">
                        <p className="font-medium text-sm">{video.title}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* YouTube Videos */}
            <div className="mb-16 bg-white rounded-2xl p-8 shadow-xl border border-zinc-200">
              <h3 className="text-3xl font-bold mb-6 text-black">
                Latest Videos
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {socialContent.youtube.map((video) => (
                  <div
                    key={video.id}
                    className="relative aspect-video bg-zinc-100 rounded-xl overflow-hidden group transform transition-all duration-300 hover:scale-105 hover:shadow-2xl"
                  >
                    <Image
                      src={video.thumbnail}
                      alt={video.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover"
                      loading="eager"
                      onError={(e) => {
                        console.error(
                          `Error loading YouTube image: ${video.thumbnail}. Please check if the file exists in the public directory.`
                        )
                        const imgElement = e.target as HTMLImageElement
                        imgElement.src = `/instagram-${video.id}.jpg`
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent">
                      <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                        <p className="font-medium text-lg">{video.title}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Instagram Posts */}
            <div className="mb-16 bg-gradient-to-br from-black to-zinc-900 rounded-2xl p-8 shadow-xl">
              <h3 className="text-3xl font-bold mb-6 text-white">
                Instagram Feed
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {socialContent.instagram.map((post) => (
                  <div
                    key={post.id}
                    className="relative aspect-square bg-zinc-800 rounded-xl overflow-hidden group transform transition-all duration-300 hover:scale-105 hover:shadow-2xl"
                  >
                    <Image
                      src={post.image}
                      alt={post.caption}
                      fill
                      sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                      className="object-cover hover:grayscale transition-all duration-500"
                      loading="eager"
                      onError={() => {
                        console.error(
                          `Error loading Instagram image: ${post.image}`
                        )
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/0 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300">
                      <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                        <p className="text-sm font-medium">{post.caption}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <div className="border-t-2 border-black my-12 -mx-12"></div>

          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-4">Want to Work Together?</h2>
            <div className="relative">
              <div className="w-full h-[2px] bg-black"></div>
              <div className="text-left text-black mt-4 mb-2">
                Let&apos;s collaborate |{" "}
                <Link
                  href="mailto:your-email@example.com"
                  className="text-blue-600 hover:text-blue-800"
                >
                  Get in touch
                </Link>
              </div>
              <div className="w-full h-[2px] bg-black"></div>
            </div>
            <div className="bg-gray-100 rounded-lg p-8 mt-8">
              <div className="max-w-2xl mx-auto text-center">
                <p className="text-lg text-gray-700 mb-6">
                  I&apos;m always excited to collaborate on new projects and
                  create amazing content together. Whether you&apos;re a brand,
                  fellow creator, or just want to say hi, I&apos;d love to hear
                  from you!
                </p>
                <Link
                  href="mailto:your-email@example.com"
                  className="inline-block px-8 py-3 bg-black text-white rounded-full font-medium hover:bg-gray-800 transition-colors duration-300"
                >
                  Email Me
                </Link>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
