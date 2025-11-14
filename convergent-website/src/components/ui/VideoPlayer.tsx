interface VideoPlayerProps {
  src: string;
  poster?: string;
  className?: string;
}

export default function VideoPlayer({ src, poster, className = '' }: VideoPlayerProps) {
  return (
    <div className={`w-full ${className}`}>
      <video
        controls
        className="w-full rounded-lg shadow-lg"
        poster={poster}
        preload="metadata"
      >
        <source src={src} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
}
