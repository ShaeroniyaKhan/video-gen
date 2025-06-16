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
    <form onSubmit={handleSubmit} className="space-y-5">
      <label className="text-xl flex items-center gap-2 text-gray-800 font-medium">
        <Sparkles className="text-yellow-500" size={24} />
        Enter a video prompt
      </label>

      <textarea
        className="w-full h-48 border border-blue-300 bg-white/70 rounded-xl p-4 text-xl placeholder:text-gray-500 shadow-inner focus:outline-none focus:ring-2 focus:ring-blue-400"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Describe your video idea here..."
        required
      />

      <button
        type="submit"
        disabled={isLoading}
        className={`w-full mt-6 text-white py-4 px-4 rounded-xl font-semibold text-2xl tracking-wide transition-all duration-300 ${
          isLoading
            ? 'bg-blue-300 cursor-not-allowed'
            : 'bg-gradient-to-r from-pink-500 to-purple-500 hover:scale-[1.02] shadow-md'
        }`}
      >
        <Sparkles size={24} className="inline-block mr-1" />
        {isLoading ? 'Generating...' : 'Generate Video'}
      </button>
    </form>
  );
}
