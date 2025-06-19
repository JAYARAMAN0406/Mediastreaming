import { useEffect, useState, useRef } from "react";
import { Play, ChevronLeft, ChevronRight } from "lucide-react";
import axios from "axios";
import MediaPlayer from "../components/MediaPlayer";
import { BASE_URL_MEDIA, MEDIA_LIST } from "../utils/ApplicationRouting";
import VideoModal from "../components/VideoModal";

export default function Media() {
  const [mediaItems, setMediaItems] = useState([]);
  const [selectedMedia, setSelectedMedia] = useState(null);
  const [selectedFilename, setSelectedFilename] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const videoRowRef = useRef(null);
  const audioRowRef = useRef(null);

  const videos = mediaItems.filter(
  (item) => item && typeof item.type === 'string' && item.type.includes("video")
);

const audios = mediaItems.filter(
  (item) => item && typeof item.type === 'string' && item.type.includes("audio")
);

  useEffect(() => {
    const fetchMedia = async () => {
      try {
        const response = await axios.get(`${BASE_URL_MEDIA}${MEDIA_LIST}`);
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
  setSelectedMedia(media)
};


  const scrollRow = (ref, direction) => {
    if (ref.current) {
      ref.current.scrollBy({
        left: direction === "left" ? -250 : 250,
        behavior: "smooth",
      });
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
       <div className="h-screen w-screen scrollbar-hide overflow-auto md:max-w-3xl lg:max-w-5xl mx-auto p-0 md:p-4 sm:p-4">
      <h1 className="text-2xl font-bold mb-6 text-center md:text-left">All Media</h1>

      {/* Video Row */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4 text-center md:text-left">Videos</h2>
        <div className="relative w-full">
          {/* Left Chevron */}
          <button
            className="absolute left-1 top-1/2 transform -translate-y-1/2 z-10 p-2 bg-gray-200 rounded-full hover:bg-gray-300 shadow-md"
            onClick={() => scrollRow(videoRowRef, "left")}
          >
            <ChevronLeft size={24} />
          </button>

          {/* Scrollable Video Row */}
          <div
            ref={videoRowRef}
         className="flex overflow-x-auto space-x-4 scrollbar-hide items-center w-full"
          >
            {videos.map((media) => (
              <div
                className="bg-white rounded-lg shadow-md flex-none w-40 sm:w-48"
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
 
>
  <Play className="w-8 h-8 text-white"  onClick={() => handlePlay(media)} />
   
</div>

                </div>
                <div className="p-2">
                  <h3 className="font-semibold text-sm">{media.title}</h3>
                </div>
              </div>
            ))}
          </div>

          {/* Right Chevron */}
          <button
            className="absolute right-1 top-1/2 transform -translate-y-1/2 z-10 p-2 bg-gray-200 rounded-full hover:bg-gray-300 shadow-md"
            onClick={() => scrollRow(videoRowRef, "right")}
          >
            <ChevronRight size={24} />
          </button>
        </div>
      </div>
{selectedMedia && (
 
  <MediaPlayer
    key={selectedMedia.id} // 👈 important to force re-render
    media={selectedMedia}
    onClose={() => setSelectedMedia(null)}
    onNext={() => {
      const currentIndex = mediaItems.findIndex((m) => m.id === selectedMedia.id);
      for (let i = currentIndex + 1; i < mediaItems.length; i++) {
        const item = mediaItems[i];
        if (item.type === 'video/mp4') {
          setSelectedMedia(item);
    return
        }else if (item.contentType === 'audio/mp3') {
          setSelectedMedia(item);
        return 
        }
      }
    }}
    onPrevious={() => {
      const currentIndex = mediaItems.findIndex((m) => m.id === selectedMedia.id);
      for (let i = currentIndex - 1; i >= 0; i--) {
        const item = mediaItems[i];
        if (item.type === 'video/mp4' || item.type === 'audio/mp3') {
          setSelectedMedia(item);
          break;
        }
      }
    }}
  />

)}



      {/* Audio Row */}
      <div>
        <h2 className="text-xl font-semibold mb-4 text-center md:text-left">Audios</h2>
        <div className="relative w-full">
          {/* Left Chevron */}
          <button
            className="absolute left-1 top-1/2 transform -translate-y-1/2 z-10 p-2 bg-gray-200 rounded-full hover:bg-gray-300 shadow-md"
            onClick={() => scrollRow(audioRowRef, "left")}
          >
            <ChevronLeft size={24} />
          </button>

          {/* Scrollable Audio Row */}
          <div
            ref={audioRowRef}
            className="flex overflow-x-auto space-x-4 scrollbar-hide items-center w-full"
          >
            {audios.map((media) => (
              <div
                className="bg-white rounded-lg shadow-md flex-none w-48"
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
                  <h3 className="font-semibold text-sm">{media.title}</h3>
                </div>
              </div>
            ))}
          </div>

          {/* Right Chevron */}
          <button
            className="absolute right-1 top-1/2 transform -translate-y-1/2 z-10 p-2 bg-gray-200 rounded-full hover:bg-gray-300 shadow-md"
            onClick={() => scrollRow(audioRowRef, "right")}
          >
            <ChevronRight size={24} />
          </button>
        </div>
      </div>
      

    </div>
  );
}



