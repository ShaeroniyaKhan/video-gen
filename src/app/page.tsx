"use client";
import { Video, Folder } from "lucide-react";
import { useState } from "react";
import VideoForm from "../app/components/VideoForm";
import VideoPlayer from "../app/components/VideoPlayer";

export default function Home() {
  const [videoUrl, setVideoUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#e0eafc] to-[#cfdef3] flex items-center justify-center px-4 py-20">
  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-6xl min-h-[550px] items-stretch backdrop-blur-xl bg-white/30 shadow-xl p-6 rounded-3xl border border-white/40">
    <div className="bg-white/40 backdrop-blur-md rounded-2xl p-6 border border-white/30 shadow-lg h-full flex flex-col">
          <h2 className="text-3xl font-bold text-purple-800 flex items-center gap-2 mb-4">
            <Video className="text-purple-500" size={30} />
            Create a Video
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

          {error && <p className="text-red-600 text-sm mt-3">{error}</p>}
        </div>

        <div className="bg-white/50 backdrop-blur-md rounded-2xl p-6 border border-white/30 shadow-lg h-full flex flex-col">
        <h2 className="text-3xl font-bold text-yellow-700 flex items-center gap-2 mb-4">
            <Folder className="text-yellow-500" size={30} />
            Generated Video
          </h2>
          <VideoPlayer videoUrl={videoUrl} isLoading={isLoading} />
        </div>
      </div>
    </div>
  );
}
