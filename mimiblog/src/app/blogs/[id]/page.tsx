"use client"
import { useEffect, useState } from "react"
import { getBlogPost, type BlogPost } from "@/lib/firebase/blogPosts"
import { useParams } from "next/navigation"
import Image from "next/image"

export default function BlogPostPage() {
  const params = useParams()
  const [post, setPost] = useState<BlogPost | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const postData = await getBlogPost(params.id as string)
        setPost(postData)
      } catch (err) {
        setError("Failed to fetch blog post")
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchPost()
  }, [params.id])

  if (loading) {
    return <div className="text-center py-12">Loading...</div>
  }

  if (error || !post) {
    return (
      <div className="text-red-500 text-center py-12">
        {error || "Post not found"}
      </div>
    )
  }

  return (
    <main className="min-h-screen">
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
        <p className="text-gray-500 mb-8">
          {post.createdAt.toDate().toLocaleDateString()}
        </p>

        {post.imageUrls[0] && (
          <div className="relative w-full h-[400px] mb-8">
            <img
              src={post.imageUrls[0]}
              alt={post.title}
              className="rounded-lg object-cover w-full h-full"
            />
          </div>
        )}

        <p className="text-xl text-gray-600 mb-8">{post.description}</p>

        <div className="prose max-w-none">
          {post.content.split("\n").map((paragraph, index) => (
            <p key={index} className="mb-4">
              {paragraph}
            </p>
          ))}
        </div>

        {post.imageUrls.slice(1).length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-4">Gallery</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {post.imageUrls.slice(1).map((url, index) => (
                <div key={index} className="relative aspect-square">
                  <img
                    src={url}
                    alt={`Image ${index + 2}`}
                    className="rounded-lg object-cover w-full h-full"
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </article>
    </main>
  )
}
