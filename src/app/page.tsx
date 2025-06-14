'use client'

import { useState } from 'react'
import VideoForm from '../app/components/VideoForm'
import VideoPlayer from '../app/components/VideoPlayer'

export default function Home() {
  const [videoUrl, setVideoUrl] = useState<string>('')
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<string>('')
  const [useCase, setUseCase] = useState<'suplimax' | 'real-estate'>('suplimax')

  const handleVideoGenerated = (url: string) => {
    setVideoUrl(url)
    setIsLoading(false)
    setError('')
  }

  const handleGenerationStart = () => {
    setIsLoading(true)
    setError('')
    setVideoUrl('')
  }

  const handleError = (message: string) => {
    setError(message)
    setIsLoading(false)
  }

  const getDefaultPrompt = () => {
    if (useCase === 'real-estate') {
      return `Create a luxurious video tour of the following property:\n
12012 Crest Ct, Beverly Hills, CA 90210\n
Price: $10,183,985\n
Bedrooms: 5\n
Bathrooms: 6.5\n
Size: 6,100 sq ft\n
Features: Luxury estate, three-car garage, landscaped grounds, elegant entrance with grand staircase, modern design, prime Beverly Hills location.`
    }
    return ''
  }

  return (
    <div className="min-h-screen gradient-bg py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-4">
            AI Video Generator
          </h1>
          <p className="text-xl text-white/80">
            Transform your ideas into videos with Gemini Veo3
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white rounded-xl shadow-xl p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">
              {useCase === 'suplimax'
                ? 'Create a Suplimax Marketing Video'
                : 'Create a Real Estate Tour'}
            </h2>

            <VideoForm
              onVideoGenerated={handleVideoGenerated}
              onGenerationStart={handleGenerationStart}
              onError={handleError}
              isLoading={isLoading}
              defaultPrompt={getDefaultPrompt()}
            />

            {error && (
              <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-600">{error}</p>
              </div>
            )}
          </div>

          <div className="bg-white rounded-xl shadow-xl p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">
              Generated Video
            </h2>
            <VideoPlayer videoUrl={videoUrl} isLoading={isLoading} />
          </div>
        </div>
      </div>
    </div>
  )
}
