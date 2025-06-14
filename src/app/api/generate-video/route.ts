// app/api/generate/route.ts

import { NextRequest, NextResponse } from 'next/server'
import { generateVideo } from '@/lib/veo3'
import { validatePrompt } from '@/lib/utils'

interface GenerateRequestBody {
  prompt: string
}

export async function POST(req: NextRequest) {
  try {
    const body: GenerateRequestBody = await req.json()
    const { prompt } = body

    // Validate prompt
    const validation = validatePrompt(prompt)
    if (!validation.valid) {
      return NextResponse.json({ error: validation.error }, { status: 400 })
    }

    const result = await generateVideo(prompt)

    return NextResponse.json({
      videoUrl: result.videoUrl,
      prompt: result.prompt,
      provider: result.provider,
      generatedAt: result.generatedAt,
    })
  } catch (error: any) {
    return NextResponse.json(
      {
        error: error.message || 'Failed to generate video',
        details:
          process.env.NODE_ENV === 'development' ? error.stack : undefined,
      },
      { status: 500 }
    )
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'Video generation API is running',
    provider: process.env.VEO_API_PROVIDER || 'mock-veo3',
    timestamp: new Date().toISOString(),
  })
}
