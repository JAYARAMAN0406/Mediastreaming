import { useEffect, useState } from "react";
import { Play, Video } from "lucide-react";
import axios from "axios";
import MediaPlayer from "../components/MediaPlayer";
import { BASE_URL_LIVESTREAM,LIVESTREAM_ADD, LIVESTREAM_LIST } from "../utils/ApplicationRouting";

export default function LiveStream() {
  const [liveStreams, setLiveStreams] = useState([]);
  const [selectedStream, setSelectedStream] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isStartingStream, setIsStartingStream] = useState(false);

  useEffect(() => {
    const fetchLiveStreams = async () => {  
      try {
        const response = await axios.get(`${BASE_URL_LIVESTREAM}${LIVESTREAM_LIST}`);
        setLiveStreams(response.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to load live streams");
        setLoading(false);
      }
    };

    fetchLiveStreams();
  }, []);

  const handleStartLiveStream = async () => {
    setIsStartingStream(true);
    try {
      const response = await axios.post(`${BASE_URL_LIVESTREAM}${LIVESTREAM_ADD}`);
      if (response.status === 200) {
        alert("Live stream started successfully!");
        setLiveStreams((prevStreams) => [...prevStreams, response.data]); // Add the new stream
      }
    } catch (err) {
      alert("Failed to start live stream. Please try again.");
    } finally {
      setIsStartingStream(false);
    }
  };

  const handlePlay = (stream) => {
    setSelectedStream(stream);
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
      <div className="flex justify-between items-center w-full mb-6 mt-5">
        <h1 className="text-2xl font-bold">Live Streams</h1>
        <button
          onClick={handleStartLiveStream}
          className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors flex items-center gap-2"
          disabled={isStartingStream}
        >
          <Video className="w-5 h-5" />
          {isStartingStream ? "Starting..." : "Start Live Stream"}
        </button>
      </div>

      {/* Responsive Grid for Live Streams */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 w-full">
        {liveStreams.map((stream) => (
          <div
            className="bg-white rounded-lg shadow-md overflow-hidden w-full"
            key={stream.id}
          >
            <div className="relative aspect-video bg-gray-100">
              <img
                src={stream.thumbnailUrl}
                alt={stream.title}
                className="w-full h-full object-cover"
              />
              <div
                className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 hover:opacity-100 transition-opacity cursor-pointer"
                onClick={() => handlePlay(stream)}
              >
                <Play className="w-8 h-8 text-white" />
              </div>
            </div>
            <div className="p-2 text-center">
              <h3 className="font-semibold text-sm">{stream.title}</h3>
              <p className="text-gray-500 text-xs">{stream.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Media Player */}
      {selectedStream && (
        <MediaPlayer
          media={selectedStream}
          onClose={() => setSelectedStream(null)}
        />
      )}
    </div>
  );
}
