// Prompt validation result type
interface PromptValidationResult {
    valid: boolean
    error?: string
  }
  
  // Validate the text prompt for AI video generation
  export function validatePrompt(prompt: string): PromptValidationResult {
    if (!prompt || typeof prompt !== 'string') {
      return { valid: false, error: 'Prompt is required' }
    }
  
    if (prompt.trim().length < 10) {
      return { valid: false, error: 'Prompt must be at least 10 characters long' }
    }
  
    if (prompt.length > 500) {
      return { valid: false, error: 'Prompt must be less than 500 characters' }
    }
  
    const inappropriateWords = ['violent', 'explicit', 'nsfw']
    const lowerPrompt = prompt.toLowerCase()
  
    for (const word of inappropriateWords) {
      if (lowerPrompt.includes(word)) {
        return {
          valid: false,
          error: 'Please use appropriate content for video generation'
        }
      }
    }
  
    return { valid: true }
  }
  
  // Convert duration in seconds to MM:SS format
  export function formatDuration(seconds: number): string {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }
  
  // Map internal API provider ID to display name
  export function getApiProviderName(provider: string): string {
    const providers: Record<string, string> = {
      aimlapi: 'AI/ML API',
      veo3api: 'Veo3API.ai'
    }
    return providers[provider] || provider
  }
  