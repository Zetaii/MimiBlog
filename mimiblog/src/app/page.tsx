"use client"
import React, { useEffect, useState } from "react"
import { getBlogPosts } from "@/lib/firebase/blogPosts"
import { getTravelGuides } from "@/lib/firebase/travelGuides"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Timestamp } from "firebase/firestore"

type CombinedPost = {
  id: string
  type: "blog" | "guide"
  title: string
  description: string
  imageUrls: string[]
  createdAt: Timestamp
  location?: string
  duration?: string
}

export default function HomePage() {
  const router = useRouter()
  const [posts, setPosts] = useState<CombinedPost[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchAllPosts = async () => {
      try {
        const [blogs, guides] = await Promise.all([
          getBlogPosts(),
          getTravelGuides(),
        ])

        const combinedPosts: CombinedPost[] = [
          ...blogs.map((blog) => ({
            ...blog,
            id: blog.id || "",
            type: "blog" as const,
          })),
          ...guides.map((guide) => ({
            ...guide,
            id: guide.id || "",
            type: "guide" as const,
          })),
        ]

        // Sort by date, newest first
        const sortedPosts = combinedPosts.sort(
          (a, b) =>
            b.createdAt.toDate().getTime() - a.createdAt.toDate().getTime()
        )

        setPosts(sortedPosts)
      } catch (err) {
        setError("Failed to fetch content")
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchAllPosts()
  }, [])

  const handleCardClick = (post: CombinedPost) => {
    const path =
      post.type === "blog" ? `/blogs/${post.id}` : `/travel-guides/${post.id}`
    router.push(path)
  }

  if (loading) {
    return <div className="text-center py-12">Loading...</div>
  }

  if (error) {
    return <div className="text-red-500 text-center py-12">{error}</div>
  }

  return (
    <main className="min-h-screen">
      <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold mb-8">Latest Posts</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {posts.map((post) => (
            <div
              key={`${post.type}-${post.id}`}
              onClick={() => handleCardClick(post)}
              className="rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer h-[600px] bg-white"
            >
              {post.imageUrls[0] && (
                <div className="relative h-[500px]">
                  <Image
                    src={post.imageUrls[0]}
                    alt={post.title}
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
              )}
              <div className="p-6 flex flex-col h-[100px]">
                <div className="flex justify-between items-start mb-2">
                  <h2 className="text-2xl font-semibold line-clamp-1">
                    {post.title}
                  </h2>
                  {post.type === "guide" && (
                    <div className="flex items-center text-sm text-gray-500 space-x-3">
                      <span>📍 {post.location}</span>
                      <span>⏱ {post.duration}</span>
                    </div>
                  )}
                </div>
                <p className="text-gray-600 line-clamp-2 mb-2 flex-grow">
                  {post.description}
                </p>
                <div className="flex justify-between items-center">
                  <div className="text-sm text-gray-500">
                    {post.createdAt.toDate().toLocaleDateString()}
                  </div>
                  <span className="text-sm font-medium px-2 py-1 rounded bg-gray-100">
                    {post.type === "blog" ? "Blog Post" : "Travel Guide"}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}
