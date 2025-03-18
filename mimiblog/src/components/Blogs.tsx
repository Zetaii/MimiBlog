"use client"
import React, { useEffect, useState } from "react"
import {
  getBlogPosts,
  deleteBlogPost,
  type BlogPost,
} from "@/lib/firebase/blogPosts"
import { useRouter } from "next/navigation"
import Image from "next/image"

const Blogs = () => {
  const router = useRouter()
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isDeleting, setIsDeleting] = useState<string | null>(null)

  const fetchPosts = async () => {
    try {
      const fetchedPosts = await getBlogPosts()
      setPosts(fetchedPosts)
    } catch (err) {
      setError("Failed to fetch blog posts")
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchPosts()
  }, [])

  const handleDelete = async (postId: string) => {
    if (!window.confirm("Are you sure you want to delete this blog post?")) {
      return
    }

    setIsDeleting(postId)
    try {
      await deleteBlogPost(postId)
      // Refresh the posts list
      await fetchPosts()
    } catch (err) {
      console.error("Failed to delete post:", err)
      setError("Failed to delete post. Please try again.")
    } finally {
      setIsDeleting(null)
    }
  }

  const handleCardClick = (postId: string, event: React.MouseEvent) => {
    // Prevent navigation if clicking the delete button
    if ((event.target as HTMLElement).closest("button")) {
      return
    }
    router.push(`/blogs/${postId}`)
  }

  if (loading) {
    return <div className="text-center">Loading...</div>
  }

  if (error) {
    return <div className="text-red-500">{error}</div>
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
      {posts.map((post) => (
        <div
          key={post.id}
          onClick={(e) => post.id && handleCardClick(post.id, e)}
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
            </div>
            <p className="text-gray-600 line-clamp-2 mb-2 flex-grow">
              {post.description}
            </p>
            <div className="flex justify-between items-center">
              <div className="text-sm text-gray-500">
                {post.createdAt.toDate().toLocaleDateString()}
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  if (post.id) {
                    handleDelete(post.id)
                  }
                }}
                disabled={isDeleting === post.id}
                className={`text-red-500 hover:text-red-700 font-medium text-sm transition-colors ${
                  isDeleting === post.id ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {isDeleting === post.id ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Blogs
