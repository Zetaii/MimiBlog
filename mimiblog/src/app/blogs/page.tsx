import React from "react"
import { getBlogPosts } from "@/lib/firebase/blogPosts"
import Blogs from "@/components/Blogs"

export default async function BlogsPage() {
  // Fetch all blog posts
  const blogPosts = await getBlogPosts()

  // Convert Firestore Timestamps to plain Date objects
  const serializedBlogPosts = blogPosts.map((post) => ({
    ...post,
    id: post.id || "",
    createdAt: new Date(post.createdAt.toDate().toISOString()),
  }))

  return (
    <main className="min-h-screen bg-gray-200">
      <div className="max-w-[1850px] mx-auto bg-white shadow-lg mt-8 border border-black">
        <div className="px-12 py-8">
          <h1 className="text-4xl font-bold mb-8">Blog Posts</h1>
          <div className="relative mb-8">
            <div className="w-full h-[2px] bg-black"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {serializedBlogPosts.map((blog) => (
              <div key={blog.id} className="h-full">
                <Blogs post={blog} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}
