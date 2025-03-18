"use client"
import React, { ChangeEvent, FormEvent, useState, useEffect } from "react"
import { createTravelGuide } from "@/lib/firebase/travelGuides"
import { useRouter } from "next/navigation"
import Image from "next/image"

interface GuideFormData {
  title: string
  description: string
  content: string
  location: string
  duration: string
  images: File[]
}

const CreateTravelGuide: React.FC = () => {
  const router = useRouter()
  const [formData, setFormData] = useState<GuideFormData>({
    title: "",
    description: "",
    content: "",
    location: "",
    duration: "",
    images: [],
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [imageUrls, setImageUrls] = useState<string[]>([])

  useEffect(() => {
    const urls = formData.images.map((image) => URL.createObjectURL(image))
    setImageUrls(urls)
    return () => {
      urls.forEach((url) => URL.revokeObjectURL(url))
    }
  }, [formData.images])

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files)
      setFormData((prev) => ({
        ...prev,
        images: [...prev.images, ...files],
      }))
    }
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    try {
      await createTravelGuide(
        {
          title: formData.title,
          description: formData.description,
          content: formData.content,
          location: formData.location,
          duration: formData.duration,
        },
        formData.images
      )

      setFormData({
        title: "",
        description: "",
        content: "",
        location: "",
        duration: "",
        images: [],
      })
      router.push("/travel-guides")
    } catch (err) {
      setError("Failed to create travel guide. Please try again.")
      console.error(err)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold mb-8">Create New Travel Guide</h1>

      {error && (
        <div className="bg-red-50 text-red-500 p-4 rounded-md mb-6">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <label htmlFor="title" className="block text-sm font-medium">
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            required
            className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="location" className="block text-sm font-medium">
            Location
          </label>
          <input
            type="text"
            id="location"
            name="location"
            value={formData.location}
            onChange={handleInputChange}
            required
            className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="duration" className="block text-sm font-medium">
            Duration
          </label>
          <input
            type="text"
            id="duration"
            name="duration"
            value={formData.duration}
            onChange={handleInputChange}
            placeholder="e.g., 5 days"
            required
            className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="description" className="block text-sm font-medium">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            rows={3}
            required
            className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="content" className="block text-sm font-medium">
            Content
          </label>
          <textarea
            id="content"
            name="content"
            value={formData.content}
            onChange={handleInputChange}
            rows={10}
            required
            className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="images" className="block text-sm font-medium">
            Add Images
          </label>
          <input
            type="file"
            id="images"
            name="images"
            onChange={handleImageUpload}
            multiple
            accept="image/*"
            className="w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
        </div>

        {imageUrls.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {imageUrls.map((url, index) => (
              <div key={index} className="relative aspect-square">
                <Image
                  src={url}
                  alt={`Preview ${index + 1}`}
                  fill
                  sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                  className="object-cover rounded-lg"
                />
              </div>
            ))}
          </div>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200 ${
            isSubmitting ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {isSubmitting ? "Creating..." : "Create Travel Guide"}
        </button>
      </form>
    </div>
  )
}

export default CreateTravelGuide
