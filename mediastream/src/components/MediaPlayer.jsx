import React, { useEffect, useRef, useState } from 'react';
import { X, Maximize2, Minimize2, Play, Pause, SkipBack, SkipForward } from 'lucide-react';
import axios from 'axios';
import { BASE_URL_MEDIA, MEDIA_AUDIO_STREAM, MEDIA_VIDEO_STREAM } from '../utils/ApplicationRouting';

export default function MediaPlayer({ media, onClose, onNext, onPrevious }) {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const [videoUrl, setVideoUrl] = useState(null);
  const mediaRef = useRef(null);

  useEffect(() => {
    const fetchMedia = async () => {
      try {
        let baseUrl;

        if (media.type === 'video/mp4') {
          baseUrl =`${BASE_URL_MEDIA}${MEDIA_VIDEO_STREAM}`;
        } else if (media.type === 'audio/mp3') {
          baseUrl = `${BASE_URL_MEDIA}${MEDIA_AUDIO_STREAM}`;
        } else {
          console.error("Unsupported media type");
          return;
        }

        const response = await axios.get(`${baseUrl}/${media.filename}`, {
          responseType: 'blob',
        });

        const url = URL.createObjectURL(response.data);
        setVideoUrl(url);
      } catch (err) {
        console.error("Failed to fetch media:", err);
      }
    };

    fetchMedia();

    return () => {
      if (videoUrl) {
        URL.revokeObjectURL(videoUrl);
      }
    };
  }, [media.filename]);

  const togglePlay = () => {
    if (mediaRef.current) {
      if (isPlaying) {
        mediaRef.current.pause();
      } else {
        mediaRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  if (!videoUrl) return <div className="flex items-center justify-center h-screen">Loading media...</div>;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-900 rounded-lg overflow-hidden w-full sm:max-w-lg  max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="p-3 flex justify-between items-center border-b border-gray-700">
          <h3 className="text-white font-semibold truncate">{media.title}</h3>
          <div className="flex gap-2">
            {isFullscreen ? (
              <Minimize2 className="text-white cursor-pointer hover:text-gray-300" onClick={toggleFullscreen} />
            ) : (
              <Maximize2 className="text-white cursor-pointer hover:text-gray-300" onClick={toggleFullscreen} />
            )}
            <X className="text-white cursor-pointer hover:text-gray-300" onClick={onClose} />
          </div>
        </div>

        {/* Media Player */}
        <div className="relative flex-grow flex items-center justify-center bg-black p-4">
          {media.type === 'video/mp4' ? (
            <video
              ref={mediaRef}
              src={videoUrl}
              className="w-full max-w-full max-h-[70vh] sm:max-h-[20vh] object-contain"
              autoPlay
              controls
            />
          ) : (
            <div className="flex flex-col items-center gap-4 w-full">
              {media.thumbnailUrl && (
                <img
                  src={media.thumbnailUrl}
                  alt="Audio Thumbnail"
                  className="w-full max-w-[300px] rounded-lg"
                />
              )}
              <audio
                ref={mediaRef}
                src={videoUrl}
                autoPlay
                controls
                className="w-full"
              />
            </div>
          )}
        </div>

        {/* Controls */}
        <div className="p-4 flex justify-center gap-6">
          {onPrevious && <SkipBack className="text-white cursor-pointer hover:text-purple-500 w-8 h-8" onClick={onPrevious} />}
          <button onClick={togglePlay} className="text-white hover:text-purple-500 transition-colors">
            {isPlaying ? <Pause className="w-8 h-8" /> : <Play className="w-8 h-8" />}
          </button>
          {onNext && <SkipForward className="text-white cursor-pointer hover:text-purple-500 w-8 h-8" onClick={onNext} />}
        </div>
      </div>
    </div>
  );
}
