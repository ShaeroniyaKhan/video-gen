'use client';

import LoadingSpinner from './LoadingSpinner';

type VideoPlayerProps = {
  videoUrl: string;
  isLoading: boolean;
};

export default function VideoPlayer({ videoUrl, isLoading }: VideoPlayerProps) {
  if (isLoading) {
    return (
      <div className="h-100 bg-purple-100/30 border border-purple-300/50 rounded-xl backdrop-blur-sm flex items-center justify-center text-center">
        <div>
          <LoadingSpinner size="large" />
          <p className="mt-3 text-purple-700 font-semibold">Generating your video...</p>
          <p className="text-xs text-purple-500">Please wait ⏳</p>
        </div>
      </div>
    );
  }

  if (!videoUrl) {
    return (
      <div className="h-64 bg-white/40 border border-purple-300/50 rounded-xl backdrop-blur-md flex flex-col items-center justify-center text-center text-gray-600">
        <div className="text-5xl mb-2">🎬</div>
        <p className="font-medium">Your generated video will appear here</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="aspect-video bg-black rounded-xl overflow-hidden shadow-inner">
        <video controls className="w-full h-full object-contain" src={videoUrl} typeof="video/mp4">
          Your browser does not support the video tag.
        </video>
      </div>

      <div className="text-center">
        <a
          href={videoUrl}
          download
          className="inline-block px-24 py-4 rounded-xl text-white text-2xl font-medium bg-gradient-to-r from-pink-500 to-purple-600 hover:scale-[1.02] hover:shadow-md transition"
        >
          ⬇️ Download Video
        </a>
      </div>
    </div>
  );
}
