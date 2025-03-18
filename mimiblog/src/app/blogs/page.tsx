import Blogs from "@/components/Blogs"

export default function BlogsPage() {
  return (
    <main className="min-h-screen">
      <div className="max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold mb-8">Blog Posts</h1>
        <Blogs />
      </div>
    </main>
  )
}
