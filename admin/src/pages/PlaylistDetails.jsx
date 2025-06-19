import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import MediaPlayer from "../components/MediaPlayer";
import { ChevronLeft, ChevronRight, Music, Play } from "lucide-react";
import { BASE_URL_MEDIA, BASE_URL_PLAYLIST } from "../utils/ApplicationRouting";

export default function PlaylistDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [playlist, setPlaylist] = useState([]);
  const [play, setPlay] = useState(null);
  const [selectedMedia, setSelectedMedia] = useState(null);
  const [loading, setLoading] = useState(true);  
  const [error, setError] = useState(null);

   const videoRowRef = useRef(null);
    const audioRowRef = useRef(null);
  

  useEffect(() => {
    const fetchPlaylistDetails = async () => {
      try {
        const response = await axios.get(`${BASE_URL_MEDIA}/${id}`);
        setPlaylist(response.data);
        setLoading(false);
        setError(null);
      } catch (err) {
        setError("Failed to load playlist details");
        setLoading(false);
      }
    };

    fetchPlaylistDetails();
  }, [id]);

  useEffect(() => {
    const fetchPlaylistDetails = async () => {
      try {
        const response = await axios.get(`${BASE_URL_PLAYLIST}/${id}`);
        setPlay(response.data);
        setLoading(false);
        setError(null);
      } catch (err) {
        setError("Failed to load playlist details");
        setLoading(false);
      }
    };

    fetchPlaylistDetails();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  const videos = playlist.filter((item) => item.type.includes("video"));
  const audios = playlist.filter((item) => item.type.includes("audio"));

  const handlePlay = (media) => {
    setSelectedMedia(media);
  };

  const scrollRow = (ref, direction) => {
    if (ref.current) {
      ref.current.scrollBy({
        left: direction === "left" ? -250 : 250,
        behavior: "smooth",
      });
    }
  };

  return (
    <div>
      <div className="absolute top-4 right-4">
        <button
          onClick={() => navigate(-1)}
          className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors"
        >
          Back
        </button>
      </div>

      <div className="bg-white p-8">
        <h1 className="text-2xl font-bold mb-6">{play?.title}</h1>

        {/* Video Row */}

<div className="relative mb-8">
  <h2 className="text-xl font-semibold mb-4">Videos</h2>
  <div ref={videoRowRef} className="flex overflow-x-auto space-x-6 scrollbar-hide">
    {videos.map((media) => (
      <div
        className="bg-white rounded-lg shadow-md overflow-hidden flex-none w-64"
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
            <Play className="w-12 h-12 text-white" />
          </div>
        </div>
        <div className="p-4">
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
            <Music size={16} />
            <span>{media.mediaType}</span>
          </div>
          <h3 className="font-semibold text-lg mb-1">{media.title}</h3>
          <p className="text-gray-600 text-sm line-clamp-2">{media.description}</p>
        </div>
      </div>
    ))}
  </div>
  <button
    className="absolute left-2 top-1/2 transform -translate-y-1/2 z-10 p-2 bg-gray-200 rounded-full hover:bg-gray-300 shadow-md"
    onClick={() => scrollRow(videoRowRef, "left")}
  >
    <ChevronLeft size={24} />
  </button>
  <button
    className="absolute right-2 top-1/2 transform -translate-y-1/2 z-10 p-2 bg-gray-200 rounded-full hover:bg-gray-300 shadow-md"
    onClick={() => scrollRow(videoRowRef, "right")}
  >
    <ChevronRight size={24} />
  </button>
</div>


        {/* Audio Row */}
        <div className="relative mb-8">
          <h2 className="text-xl font-semibold mb-4">Audios</h2>
          <div ref={videoRowRef} className="flex overflow-x-auto space-x-6 scrollbar-hide">
         
            {audios.map((media) => (
              <div
                className="bg-white rounded-lg shadow-md overflow-hidden flex-none w-64"
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
                    <Play className="w-12 h-12 text-white" />
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                    <Music size={16} />
                    <span>{media.mediaType}</span>
                  </div>
                  <h3 className="font-semibold text-lg mb-1">{media.title}</h3>
                  <p className="text-gray-600 text-sm line-clamp-2">{media.description}</p>
                </div>
              </div>
            ))}
            
          </div>
          <button
            className="absolute left-2 top-1/2 transform -translate-y-1/2 z-10 p-2 bg-gray-200 rounded-full hover:bg-gray-300 shadow-md"
            onClick={() => scrollRow(audioRowRef, "left")}
          >
            <ChevronLeft size={24} />
          </button>
          <button
            className="absolute right-2 top-1/2 transform -translate-y-1/2 z-10 p-2 bg-gray-200 rounded-full hover:bg-gray-300 shadow-md"
            onClick={() => scrollRow(audioRowRef, "right")}
          >
            <ChevronRight size={24} />
          </button>
        </div>

        {selectedMedia && (
          <MediaPlayer media={selectedMedia} onClose={() => setSelectedMedia(null)} />
        )}
      </div>
    </div>
  );
}
