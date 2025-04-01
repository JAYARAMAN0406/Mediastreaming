import { useEffect, useState } from "react";
import { Play } from "lucide-react";
import axios from "axios";
import MediaPlayer from "../components/MediaPlayer";
import { BASE_URL_MEDIA, MEDIA_LIST_AUDIO } from "../utils/ApplicationRouting";

export default function Audio() {
  const [mediaItems, setMediaItems] = useState([]);
  const [selectedMedia, setSelectedMedia] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const audios = mediaItems.filter((item) => item.type.includes("audio"));

  useEffect(() => {
    const fetchMedia = async () => {
      try {
        const response = await axios.get(`${BASE_URL_MEDIA}${MEDIA_LIST_AUDIO}`);
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

  if (loading) return <div className="flex justify-center items-center h-screen">Loading...</div>;
  if (error) return <div className="flex justify-center items-center h-screen">{error}</div>;

  return (
    <div className="p-4 max-w-5xl mx-auto flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-6 text-center">Music</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 justify-center">
        {audios.map((media) => (
          <div
            className="bg-white rounded-lg shadow-md overflow-hidden flex-none w-full sm:w-48"
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
            <div className="p-2">
              <h3 className="font-semibold text-sm text-center">{media.title}</h3>
            </div>
          </div>
        ))}
      </div>

      {selectedMedia && (
        <MediaPlayer media={selectedMedia} onClose={() => setSelectedMedia(null)} />
      )}
    </div>
  );
}

