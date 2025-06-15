'use client';

import LoadingSpinner from './LoadingSpinner';

type VideoPlayerProps = {
  videoUrl: string;
  isLoading: boolean;
};

export default function VideoPlayer({ videoUrl, isLoading }: VideoPlayerProps) {
  if (isLoading) {
    return (
      <div className="h-64 bg-purple-50 rounded-xl border-2 border-dashed border-purple-300 flex items-center justify-center text-center">
        <div>
          <LoadingSpinner size="large" />
          <p className="mt-4 text-purple-600 font-medium">Generating your video...</p>
          <p className="text-sm text-purple-400">Please wait ⏳</p>
        </div>
      </div>
    );
  }

  if (!videoUrl) {
    return (
      <div className="h-64 bg-[#f3f3fd] border-2 border-dashed border-purple-300 rounded-xl flex flex-col items-center justify-center text-center text-gray-600">
        <div className="text-5xl mb-2">🎬</div>
        <p>Your generated video will appear here</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="aspect-video bg-black rounded-xl overflow-hidden">
        <video controls className="w-full h-full object-contain" src={videoUrl} typeof="video/mp4">
          Your browser does not support the video tag.
        </video>
      </div>

      <div className="text-center">
        <a
          href={videoUrl}
          download
          className={`w-full font-semibold py-2 rounded-lg transition flex items-center justify-center gap-2 ${
            isLoading
              ? 'bg-indigo-300 cursor-not-allowed opacity-60'
              : 'bg-gradient-to-r from-pink-400 to-purple-500 hover:scale-[1.02] hover:shadow-md text-white'
          }`}        >
          ⬇️ Download Video
        </a>
      </div>
    </div>
  );
}
