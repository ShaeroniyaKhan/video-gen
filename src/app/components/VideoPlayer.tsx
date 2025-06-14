'use client'

import LoadingSpinner from './LoadingSpinner'

// Optional: Add type props for full TS support
// type VideoPlayerProps = {
//   videoUrl: string
//   isLoading: boolean 
// }

export default function VideoPlayer({ videoUrl, isLoading }) {
  if (isLoading) {
    return (
      <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center">
        <div className="text-center">
          <LoadingSpinner size="large" />
          <p className="mt-4 text-gray-600">Generating your video...</p>
          <p className="text-sm text-gray-500">This may take a few minutes</p>
        </div>
      </div>
    )
  }

  if (!videoUrl) {
    return (
      <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center">
        <div className="text-center text-gray-500">
          <svg
            className="w-16 h-16 mx-auto mb-4 text-gray-300"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M2 6a2 2 0 012-2h6l2 2h6a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM5 8a1 1 0 011-1h8a1 1 0 011 1v4a1 1 0 01-1 1H6a1 1 0 01-1-1V8z" />
          </svg>
          <p>Your generated video will appear here</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="aspect-video bg-black rounded-lg overflow-hidden">
        <video
          controls
          className="w-full h-full object-contain"
          src={videoUrl}
          typeof="video/mp4"
        >
          Your browser does not support the video tag.
        </video>
      </div>

      <div className="text-center">
        <a
          href={videoUrl}
          download
          className="inline-block bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
        >
          ⬇️ Download Video
        </a>
      </div>
    </div>
  )
}
