"use client";
import { Sparkles, Video, Folder } from "lucide-react";
import { useState } from "react";
import VideoForm from "../app/components/VideoForm";
import VideoPlayer from "../app/components/VideoPlayer";

export default function Home() {
  const [videoUrl, setVideoUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 to-purple-100 flex items-center justify-center p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-5xl">
        {/* Create Video Panel */}
        <div className="bg-white rounded-2xl p-6 shadow-md">
          <h2 className="text-xl font-semibold flex items-center gap-2 mb-4">
            <Video className="text-purple-600" size={20} />
            <span className="text-purple-700 font-bold">Create a Suplimax Video</span>
          </h2>

          <VideoForm
            onVideoGenerated={(url) => {
              setVideoUrl(url);
              setIsLoading(false);
            }}
            onGenerationStart={() => {
              setIsLoading(true);
              setError("");
            }}
            onError={(msg) => {
              setError(msg);
              setIsLoading(false);
            }}
            isLoading={isLoading}
          />

          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        </div>

        {/* Generated Video Panel */}
        <div className="bg-white rounded-2xl p-6 shadow-md">
          <h2 className="text-xl font-semibold flex items-center gap-2 mb-4">
            <Folder className="text-yellow-500" size={20} />
            <span className="text-yellow-600 font-bold">Generated Video</span>
          </h2>
          <VideoPlayer videoUrl={videoUrl} isLoading={isLoading} />
        </div>
      </div>
    </div>
  );
}
