import { useEffect, useState } from "react";
import { Play } from "lucide-react";
import axios from "axios";
import MediaPlayer from "../components/MediaPlayer";
import { BASE_URL_MEDIA, MEDIA_LIST_VIDEO } from "../utils/ApplicationRouting";

export default function Video() {
  const [mediaItems, setMediaItems] = useState([]);
  const [selectedMedia, setSelectedMedia] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const videos = mediaItems.filter((item) => item.type.includes("video"));

  useEffect(() => {
    const fetchMedia = async () => {
      try {
        const response = await axios.get(`${BASE_URL_MEDIA}${MEDIA_LIST_VIDEO}`);
        setMediaItems(response.data);
        setLoading(false);   
      } catch (err) {
        setError("Failed to load media items");
        setLoading(false);
      }
    };

    fetchMedia();
  }, []);

  const handlePlay = (media) => {
    setSelectedMedia(media);
  };

  if (loading)
    return (
      <div className="flex items-center justify-center h-screen">
        <div>Loading...</div>
      </div>
    );
  if (error)
    return (
      <div className="flex items-center justify-center h-screen">
        <div>{error}</div>
      </div>
    );

  return (
    <div className="px-4 sm:px-8 lg:px-12 max-w-7xl mx-auto flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-6 mt-5">Videos</h1>

      {/* Responsive Grid for Videos */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 w-full">
        {videos.map((media) => (
          <div
            className="bg-white rounded-lg shadow-md overflow-hidden w-full"
            key={media.id}
          >
            <div className="relative aspect-video bg-gray-100">
              <img
                src={media.thumbnailUrl}
                alt={media.title}
                className="w-full h-full object-cover"
              />
              <div
                className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 hover:opacity-100 transition-opacity cursor-pointer"
                onClick={() => handlePlay(media)}
              >
                <Play className="w-8 h-8 text-white" />
              </div>
            </div>
            <div className="p-2 text-center">
              <h3 className="font-semibold text-sm">{media.title}</h3>
            </div>
          </div>
        ))}
      </div>

      {/* Media Player */}
      {selectedMedia && (
        <MediaPlayer media={selectedMedia} onClose={() => setSelectedMedia(null)} />
      )}
    </div>
  );
}
