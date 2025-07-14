'use client';

import dynamic from 'next/dynamic';

const ReactPlayer = dynamic(() => import('react-player'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-64 bg-white/[0.05] border border-white/[0.2] rounded-lg flex items-center justify-center">
      <div className="text-white-100">Loading video...</div>
    </div>
  ),
});

interface VideoPlayerProps {
  url: string;
  width?: string;
  height?: string;
}

export default function VideoPlayer({ url, width = "100%", height = "100%" }: VideoPlayerProps) {
  return (
    <ReactPlayer
      url={url}
      width={width}
      height={height}
      controls
    />
  );
} 