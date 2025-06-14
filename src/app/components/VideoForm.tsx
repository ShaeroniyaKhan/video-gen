'use client'

import { useState } from 'react'

type VideoFormProps = {
  onVideoGenerated: (url: string) => void
  onGenerationStart: () => void
  onError: (message: string) => void
  isLoading: boolean
  defaultPrompt?: string
}

export default function VideoForm({
  onVideoGenerated,
  onGenerationStart,
  onError,
  isLoading,
  defaultPrompt = '',
}: VideoFormProps) {
  const [prompt, setPrompt] = useState<string>(defaultPrompt)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    onGenerationStart()

    try {
      const res = await fetch('/api/generate-video', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || 'Something went wrong')
      }

      onVideoGenerated(data.videoUrl)
    } catch (err: any) {
      onError(err.message)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <textarea
        className="w-full border rounded-lg p-3"
        rows={6}
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Describe your video idea here..."
        required
      />

      <button
        type="submit"
        disabled={isLoading}
        className="bg-blue-600 text-white font-semibold px-6 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
      >
        {isLoading ? 'Generating...' : 'Generate Video'}
      </button>
    </form>
  )
}
