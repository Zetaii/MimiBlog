import { db } from "./config"
import {
  collection,
  addDoc,
  getDocs,
  getDoc,
  deleteDoc,
  doc,
  query,
  orderBy,
  Timestamp,
} from "firebase/firestore"

export interface TravelGuide {
  id?: string
  title: string
  description: string
  content: string
  location: string
  duration: string
  imageUrls: string[]
  createdAt: Timestamp
}

export const createTravelGuide = async (
  guide: Omit<TravelGuide, "imageUrls" | "createdAt">,
  images: File[]
): Promise<string> => {
  try {
    // Upload images to Cloudinary (using your existing upload setup)
    const imageUrls = await Promise.all(
      images.map(async (image) => {
        const base64Data = await new Promise<string>((resolve) => {
          const reader = new FileReader()
          reader.onloadend = () => resolve(reader.result as string)
          reader.readAsDataURL(image)
        })

        const result = await fetch("/api/upload", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            data: base64Data,
            folder: "travel-guides",
          }),
        }).then((res) => res.json())

        return result.url
      })
    )

    const docRef = await addDoc(collection(db, "travelGuides"), {
      ...guide,
      imageUrls,
      createdAt: Timestamp.now(),
    })

    return docRef.id
  } catch (error) {
    console.error("Error creating travel guide:", error)
    throw error
  }
}

export const getTravelGuides = async (): Promise<TravelGuide[]> => {
  try {
    const q = query(
      collection(db, "travelGuides"),
      orderBy("createdAt", "desc")
    )
    const querySnapshot = await getDocs(q)

    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as TravelGuide[]
  } catch (error) {
    console.error("Error fetching travel guides:", error)
    throw error
  }
}

export const getTravelGuide = async (guideId: string): Promise<TravelGuide> => {
  try {
    const docRef = doc(db, "travelGuides", guideId)
    const docSnap = await getDoc(docRef)

    if (!docSnap.exists()) {
      throw new Error("Travel guide not found")
    }

    return {
      id: docSnap.id,
      ...docSnap.data(),
    } as TravelGuide
  } catch (error) {
    console.error("Error fetching travel guide:", error)
    throw error
  }
}

export const deleteTravelGuide = async (guideId: string): Promise<void> => {
  try {
    await deleteDoc(doc(db, "travelGuides", guideId))
  } catch (error) {
    console.error("Error deleting travel guide:", error)
    throw error
  }
}
