import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BASE_URL_PLAYLIST, PLAYLIST_LIST } from "../utils/ApplicationRouting";

export default function Playlists() {
  const [mediaItems, setMediaItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const fetchMedia = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${BASE_URL_PLAYLIST}${PLAYLIST_LIST}`);
      setMediaItems(response.data);
      setError(null);   
    } catch {
      setError("Failed to load media items");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMedia();
  }, []);

  return (
    <div className="px-4 sm:px-8 lg:px-12 max-w-7xl mx-auto flex flex-col items-center">
      {/* Header */}
      <div className="w-full flex justify-center mb-6">
  <h1 className="text-2xl font-bold text-center">Playlists</h1>
</div>

      {/* Loading and Error Handling */}
      {loading && <p className="text-center">Loading...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}
      {!loading && !error && mediaItems.length === 0 && (
        <p className="text-center">No playlists found.</p>
      )}

      {/* Playlist Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 w-full">
        {mediaItems.map((item) => (
          <div
            key={item.id}
            onClick={() => navigate(`/playlist/${item.id}`)}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
          >
            <img
              src={item.thumbnailUrl}
              alt={item.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h2 className="text-lg font-semibold text-center">{item.title}</h2>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
