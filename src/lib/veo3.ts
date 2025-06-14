// lib/veo3.ts

export async function generateVideo(prompt: string) {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 2000))

  const lowerPrompt = prompt.toLowerCase()

  const isSuplimax =
    lowerPrompt.includes('suplimax') || lowerPrompt.includes('energy drink')

  const isRealEstate =
    lowerPrompt.includes('real estate') ||
    lowerPrompt.includes('property') ||
    lowerPrompt.includes('beverly hills') ||
    lowerPrompt.includes('luxury estate')

  let videoUrl = ''
  let provider = 'mock-veo3'

  if (isSuplimax) {
    videoUrl = '/videos/suplimax.mp4'
  } else if (isRealEstate) {
    videoUrl = '/videos/real-estate.mp4'
  } else {
    throw new Error(
      'Failed'
    )
  }

  return {
    videoUrl,
    prompt,
    provider,
    generatedAt: new Date().toISOString(),
  }
}
