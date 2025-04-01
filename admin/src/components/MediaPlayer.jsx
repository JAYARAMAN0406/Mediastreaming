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
          baseUrl = `${BASE_URL_MEDIA}${MEDIA_VIDEO_STREAM}`;
        } else if (media.type === 'audio/mp3') {
          baseUrl = `${BASE_URL_MEDIA}${MEDIA_AUDIO_STREAM}`;
        } else {
          console.error("Unsupported media type");
          return;
        }

        console.log(baseUrl);

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
      try {
        if (isPlaying) {
          mediaRef.current.pause();
        } else {
          mediaRef.current.play();
        }
        setIsPlaying(!isPlaying);
      } catch (error) {
        console.error("Playback error:", error);
      }
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

  if (!videoUrl) return <div>Loading media...</div>;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-gray-900 rounded-lg overflow-hidden w-[90%] max-w-md max-h-[90%] flex flex-col">
        <div className="p-2 flex justify-between items-center border-b border-gray-700">
          <h3 className="text-white font-semibold truncate">{media.title}</h3>
          <div className="flex gap-2">
            {isFullscreen ? (
              <Minimize2
                className="text-white cursor-pointer hover:text-gray-300"
                onClick={toggleFullscreen}
              />
            ) : (
              <Maximize2
                className="text-white cursor-pointer hover:text-gray-300"
                onClick={toggleFullscreen}
              />
            )}
            <X
              className="text-white cursor-pointer hover:text-gray-300"
              onClick={onClose}
            />
          </div>
        </div>

        <div className="relative flex-grow flex items-center justify-center bg-black">
          {media.type === 'video/mp4' ? (
            <video
              ref={mediaRef}
              src={videoUrl}
              className="max-w-[50%] max-h-[50%] object-contain"
              autoPlay
              controls
            />
          ) : (
            <div className="flex flex-col items-center gap-4">
              {media.thumbnailUrl && (
                <img
                  src={media.thumbnailUrl}
                  alt="Audio Thumbnail"
                  className="max-w-[50%] max-h-[50%] object-cover rounded-lg"
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

        <div className="p-4 flex justify-center gap-4">
          {onPrevious && (
            <button
              onClick={onPrevious}
              className="text-white hover:text-purple-500 transition-colors"
            >
              <SkipBack className="w-8 h-8" />
            </button>
          )}
          <button
            onClick={togglePlay}
            className="text-white hover:text-purple-500 transition-colors"
          >
            {isPlaying ? (
              <Pause className="w-8 h-8" />
            ) : (
              <Play className="w-8 h-8" />
            )}
          </button>
          {onNext && (
            <button
              onClick={onNext}
              className="text-white hover:text-purple-500 transition-colors"
            >
              <SkipForward className="w-8 h-8" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
