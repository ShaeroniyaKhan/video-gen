'use client';

import { useState } from 'react';
import { Sparkles } from 'lucide-react';

type VideoFormProps = {
  onVideoGenerated: (url: string) => void;
  onGenerationStart: () => void;
  onError: (message: string) => void;
  isLoading: boolean;
  defaultPrompt?: string;
};

export default function VideoForm({
  onVideoGenerated,
  onGenerationStart,
  onError,
  isLoading,
  defaultPrompt = '',
}: VideoFormProps) {
  const [prompt, setPrompt] = useState<string>(defaultPrompt);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    onGenerationStart();

    try {
      const res = await fetch('/api/generate-video', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Something went wrong');
      }

      onVideoGenerated(data.videoUrl);
    } catch (err: any) {
      onError(err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <label className="text-sm flex items-center gap-2 text-gray-700 mb-1">
        <Sparkles className="text-yellow-500" size={16} />
        Video Prompt
      </label>

      <textarea
        className="w-full h-32 border-2 border-blue-400 rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-300 transition bg-white"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Describe your video idea here..."
        required
      />

      <button
        type="submit"
        disabled={isLoading}
        className={`w-full font-semibold py-2 rounded-lg transition flex items-center justify-center gap-2 ${
          isLoading
            ? 'bg-indigo-300 cursor-not-allowed opacity-60'
            : 'bg-gradient-to-r from-pink-400 to-purple-500 hover:scale-[1.02] hover:shadow-md text-white'
        }`}
      >
        <Sparkles size={18} />
        {isLoading ? 'Generating...' : 'Generate Video'}
      </button>
    </form>
  );
}
