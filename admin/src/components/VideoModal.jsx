import React, { useState, useEffect } from "react";
import axios from "axios";

const VideoModal = ({ filename, onClose }) => {
  const [videoUrl, setVideoUrl] = useState(null);

  useEffect(() => {
    if (filename) {
      const fetchVideoUrl = async () => {
        try {
          const response = await axios.get(`http://localhost:8080/api/media/stream/${filename}`);
          setVideoUrl(response.data.videoUrl); // Ensure your backend returns the video URL
        } catch (err) {
          console.error("Failed to fetch video URL", err);
        }
      };

      fetchVideoUrl();
    }
  }, [filename]);

  if (!filename) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden w-full max-w-lg">
        <div className="relative">
          {videoUrl ? (
            <video controls autoPlay className="w-full">
              <source src={videoUrl} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          ) : (
            <div className="p-8 text-center">Loading...</div>
          )}
          <button
            onClick={onClose}
            className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-2"
          >
            ✕
          </button>
        </div>
      </div>
    </div>
  );
};

export default VideoModal;
