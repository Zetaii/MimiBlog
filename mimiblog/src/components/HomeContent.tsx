"use client"
import React from "react"
import Hero2 from "@/components/Hero2"
import AboutMe from "@/components/AboutMe"
import Blogs from "@/components/Blogs"
import TravelGuides from "@/components/TravelGuides"
import SideScroll from "@/components/SideScroll"
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
        caption: "Closeup",
      },
      { id: 2, image: "/instagram-2.webp", caption: "Cute" },
      { id: 3, image: "/instagram-3.jpg", caption: "Live" },
    ],
  }

  return (
    <div className="min-h-screen bg-gray-200">
      <div className="max-w-[1850px] mx-auto bg-white shadow-lg mt-8 border border-black">
        <div className="pt-8">
          <Hero2 />
        </div>
        <AboutMe />

        {/* Add padding to ensure first card is fully visible */}
        <div className="pb-8">
          <SideScroll />
        </div>

        <div className="px-12 py-8">
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-8 font-serif">Recent Blogs</h2>
            <div className="relative mb-12">
              <div className="w-full h-[2px] bg-black"></div>
              <div className="text-left text-sm text-black mt-3 mb-3 font-serif">
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
              {recentBlogs.slice(0, 3).map((post) => (
                <Blogs key={post.id} post={post} />
              ))}
            </div>
          </section>

          <div className="border-t-1 border-gray-600 my-20 -mx-12"></div>

          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-8 font-serif">
              Recent Travel Guides
            </h2>
            <div className="relative mb-12">
              <div className="w-full h-[2px] bg-black"></div>
              <div className="text-left text-sm text-black mt-3 mb-3 font-serif">
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
            <h2 className="text-3xl font-bold mb-4 font-serif">Social Media</h2>
            <div className="relative">
              <div className="w-full h-[2px] bg-black"></div>
              <div className="text-left text-black mt-4 mb-2 font-serif">
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
                className="flex items-center justify-center p-6 bg-black rounded-lg text-white hover:bg-gradient-to-r hover:from-purple-600 hover:via-pink-500 hover:to-yellow-400 transition-all duration-300 font-serif"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 448 512"
                  className="w-6 h-6 mr-3 fill-current"
                >
                  <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z" />
                </svg>
                <span className="text-xl font-semibold">Instagram</span>
              </Link>
              <Link
                href="https://tiktok.com/@mimi"
                target="_blank"
                className="flex items-center justify-center p-6 bg-black rounded-lg text-white hover:bg-white hover:text-black border-black border-[1px] transition-all duration-300 font-serif"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 448 512"
                  className="w-6 h-6 mr-3 fill-current"
                >
                  <path d="M448,209.91a210.06,210.06,0,0,1-122.77-39.25V349.38A162.55,162.55,0,1,1,185,188.31V278.2a74.62,74.62,0,1,0,52.23,71.18V0l88,0a121.18,121.18,0,0,0,1.86,22.17h0A122.18,122.18,0,0,0,381,102.39a121.43,121.43,0,0,0,67,20.14Z" />
                </svg>
                <span className="text-xl font-semibold">TikTok</span>
              </Link>
              <Link
                href="https://youtube.com/@mimi"
                target="_blank"
                className="flex items-center justify-center p-6 bg-black rounded-lg text-white hover:bg-red-600  hover:border-black transition-all duration-300 font-serif"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 576 512"
                  className="w-6 h-6 mr-3 fill-current"
                >
                  <path d="M549.655 124.083c-6.281-23.65-24.787-42.276-48.284-48.597C458.781 64 288 64 288 64S117.22 64 74.629 75.486c-23.497 6.322-42.003 24.947-48.284 48.597-11.412 42.867-11.412 132.305-11.412 132.305s0 89.438 11.412 132.305c6.281 23.65 24.787 41.5 48.284 47.821C117.22 448 288 448 288 448s170.78 0 213.371-11.486c23.497-6.321 42.003-24.171 48.284-47.821 11.412-42.867 11.412-132.305 11.412-132.305s0-89.438-11.412-132.305zm-317.51 213.508V175.185l142.739 81.205-142.739 81.201z" />
                </svg>
                <span className="text-xl font-semibold">YouTube</span>
              </Link>
            </div>

            {/* TikTok Videos */}
            <div className="mb-16 bg-white p-8 shadow-md border-2 border-black">
              <h3 className="text-3xl font-bold mb-6 text-black font-serif">
                Favorite TikToks
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {socialContent.tiktok.map((video) => (
                  <div
                    key={video.id}
                    className="relative aspect-[9/16] bg-white rounded-xl overflow-hidden group w-full max-w-[200px] mx-auto transform transition-all duration-300 hover:scale-105 hover:shadow-xl border-2 border-black"
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
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent">
                      <div className="absolute bottom-0 left-0 right-0 p-3 text-white">
                        <p className="font-medium text-sm font-serif">
                          {video.title}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex justify-center mt-8">
                <Link
                  href="https://tiktok.com/@mimi"
                  target="_blank"
                  className="inline-flex items-center px-8 py-3 border-2 border-black bg-white text-black font-serif text-sm hover:bg-black hover:text-white transition-all duration-300"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 448 512"
                    className="w-4 h-4 mr-2 fill-current"
                  >
                    <path d="M448,209.91a210.06,210.06,0,0,1-122.77-39.25V349.38A162.55,162.55,0,1,1,185,188.31V278.2a74.62,74.62,0,1,0,52.23,71.18V0l88,0a121.18,121.18,0,0,0,1.86,22.17h0A122.18,122.18,0,0,0,381,102.39a121.43,121.43,0,0,0,67,20.14Z" />
                  </svg>
                  View More Posts
                </Link>
              </div>
            </div>

            {/* YouTube Videos */}
            <div className="mb-16 bg-white rounded-2xl p-8 shadow-xl border border-zinc-200">
              <h3 className="text-3xl font-bold mb-6 text-black font-serif">
                Favorite Videos
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
                        <p className="font-medium text-lg font-serif">
                          {video.title}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex justify-center mt-8">
                <Link
                  href="https://youtube.com/@mimi"
                  target="_blank"
                  className="inline-flex items-center px-8 py-3 border-2 border-black bg-white text-black font-serif text-sm hover:bg-red-600 hover:text-white hover:border-transparent transition-all duration-300"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 576 512"
                    className="w-4 h-4 mr-2 fill-current"
                  >
                    <path d="M549.655 124.083c-6.281-23.65-24.787-42.276-48.284-48.597C458.781 64 288 64 288 64S117.22 64 74.629 75.486c-23.497 6.322-42.003 24.947-48.284 48.597-11.412 42.867-11.412 132.305-11.412 132.305s0 89.438 11.412 132.305c6.281 23.65 24.787 41.5 48.284 47.821C117.22 448 288 448 288 448s170.78 0 213.371-11.486c23.497-6.321 42.003-24.171 48.284-47.821 11.412-42.867 11.412-132.305 11.412-132.305s0-89.438-11.412-132.305zm-317.51 213.508V175.185l142.739 81.205-142.739 81.201z" />
                  </svg>
                  View More Videos
                </Link>
              </div>
            </div>

            {/* Instagram Posts */}
            <div className="mb-24 bg-white rounded p-12 pt-14 pb-16 shadow-lg border-2 border-black">
              <h3 className="text-4xl font-bold mb-10 text-black font-serif">
                Favorite Instagram Posts
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-y-12 gap-x-8">
                {socialContent.instagram.map((post) => (
                  <div
                    key={post.id}
                    className="relative aspect-[3/4] bg-white overflow-hidden group transform transition-all duration-300 hover:scale-105 hover:shadow-xl border border-gray-200"
                  >
                    <Image
                      src={post.image}
                      alt={post.caption}
                      fill
                      sizes="(max-width: 640px) 90vw, (max-width: 768px) 45vw, (max-width: 1200px) 30vw, 350px"
                      className="object-cover group-hover:opacity-90 transition-all duration-500"
                      loading="eager"
                      onError={() => {
                        console.error(
                          `Error loading Instagram image: ${post.image}`
                        )
                      }}
                    />
                    <div className="">
                      <div className="absolute bottom-0 left-0 right-0 p-5 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                        <p className="text-base font-medium font-serif">
                          {post.caption}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex justify-center mt-12">
                <Link
                  href="https://instagram.com/mimi"
                  target="_blank"
                  className="inline-flex items-center px-8 py-3 border-2 border-black bg-white text-black font-serif text-sm hover:bg-gradient-to-r hover:from-purple-600 hover:via-pink-500 hover:to-yellow-400 hover:border-transparent hover:text-white transition-all duration-300"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 448 512"
                    className="w-4 h-4 mr-2 fill-current"
                  >
                    <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z" />
                  </svg>
                  View More Posts
                </Link>
              </div>
            </div>
          </section>

          <div className="border-t-2 border-black my-12 -mx-12"></div>

          <section className="h-[100vh] flex flex-col">
            <div className="flex flex-col md:flex-row h-full">
              <div className="flex-1 flex flex-col items-center justify-center">
                <h2 className="text-2xl font-bold mb-10 font-serif text-center">
                  Want to Work Together?
                </h2>
                <Link
                  href="mailto:your-email@example.com"
                  className="inline-block px-12 py-2 border-black border-2 bg-white text-black font-medium rounded-sm hover:bg-gray-800 transition-colors duration-300 font-serif text-sm"
                >
                  Let&apos;s Connect
                </Link>
              </div>
              <div className="flex-1 relative h-full w-full">
                <Image
                  src="/hero-image.png"
                  alt="Collaboration"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
