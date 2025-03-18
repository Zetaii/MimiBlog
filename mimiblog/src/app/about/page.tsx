import Image from "next/image"

export default function AboutPage() {
  return (
    <main className="min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold mb-8">About Me</h1>

        <div className="grid md:grid-cols-3 gap-8 items-start">
          {/* Profile Image Section */}
          <div className="md:col-span-1">
            <div className="aspect-square relative rounded-lg overflow-hidden">
              <Image
                src="/profile-image.jpg" // Add profile image to public folder
                alt="Profile"
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover"
                priority
              />
            </div>
          </div>

          {/* Content Section */}
          <div className="md:col-span-2 space-y-6">
            <div className="prose max-w-none">
              <h2 className="text-2xl font-semibold mb-4">
                Hi, I&apos;m Mimi!
              </h2>

              <p className="text-gray-600 mb-4">
                Welcome to my blog! I&apos;m passionate about sharing my
                experiences and insights about travel, culture, and life&apos;s
                adventures.
              </p>

              <h3 className="text-xl font-semibold mb-3">My Story</h3>
              <p className="text-gray-600 mb-4">
                I love food, traveling, and pugs. [Insert Story Here]
              </p>

              <h3 className="text-xl font-semibold mb-3">What I Write About</h3>
              <ul className="list-disc list-inside text-gray-600 mb-4">
                <li>Travel adventures and guides</li>
                <li>Cultural experiences</li>
                <li>Photography tips</li>
                <li>Personal stories and reflections</li>
              </ul>

              <h3 className="text-xl font-semibold mb-3">Connect With Me</h3>
              <p className="text-gray-600">
                Feel free to reach out to me through [your preferred contact
                method] or follow me on social media:
              </p>

              {/* Social Links */}
              <div className="flex space-x-4 mt-4">
                <a
                  href="https://twitter.com/yourusername"
                  className="text-blue-500 hover:text-blue-600"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Twitter
                </a>
                <a
                  href="https://instagram.com/yourusername"
                  className="text-blue-500 hover:text-blue-600"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Instagram
                </a>
                <a
                  href="mailto:your@email.com"
                  className="text-blue-500 hover:text-blue-600"
                >
                  Email
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
