import { db } from "./config"
import {
  collection,
  addDoc,
  getDocs,
  query,
  orderBy,
  Timestamp,
  deleteDoc,
  doc,
  getDoc,
} from "firebase/firestore"
import cloudinary from "../cloudinary/config"

export interface BlogPost {
  id?: string
  title: string
  description: string
  content: string
  imageUrls: string[]
  createdAt: Timestamp
}

export const createBlogPost = async (
  post: Omit<BlogPost, "imageUrls" | "createdAt">,
  images: File[]
): Promise<string> => {
  try {
    // Upload images to Cloudinary
    const imageUrls = await Promise.all(
      images.map(async (image) => {
        // Convert File to base64
        const base64Data = await new Promise<string>((resolve) => {
          const reader = new FileReader()
          reader.onloadend = () => resolve(reader.result as string)
          reader.readAsDataURL(image)
        })

        // Upload to Cloudinary
        const result = await fetch("/api/upload", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            data: base64Data,
            folder: "blog-images",
          }),
        }).then((res) => res.json())

        return result.url
      })
    )

    // Create blog post document
    const docRef = await addDoc(collection(db, "blogPosts"), {
      ...post,
      imageUrls,
      createdAt: Timestamp.now(),
    })

    return docRef.id
  } catch (error) {
    console.error("Error creating blog post:", error)
    throw error
  }
}

export const getBlogPosts = async (): Promise<BlogPost[]> => {
  try {
    const q = query(collection(db, "blogPosts"), orderBy("createdAt", "desc"))
    const querySnapshot = await getDocs(q)

    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as BlogPost[]
  } catch (error) {
    console.error("Error fetching blog posts:", error)
    throw error
  }
}

export const deleteBlogPost = async (postId: string): Promise<void> => {
  try {
    await deleteDoc(doc(db, "blogPosts", postId))
  } catch (error) {
    console.error("Error deleting blog post:", error)
    throw error
  }
}

export const getBlogPost = async (postId: string): Promise<BlogPost> => {
  try {
    const docRef = doc(db, "blogPosts", postId)
    const docSnap = await getDoc(docRef)

    if (!docSnap.exists()) {
      throw new Error("Blog post not found")
    }

    return {
      id: docSnap.id,
      ...docSnap.data(),
    } as BlogPost
  } catch (error) {
    console.error("Error fetching blog post:", error)
    throw error
  }
}
