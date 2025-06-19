import axios from "axios";
import PlaylistForm from "../components/PlaylistForm";
import { Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BASE_URL_PLAYLIST, PLAYLIST_LIST } from "../utils/ApplicationRouting";

export default function Playlists() {
  const [showForm, setShowForm] = useState(false);
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
    } catch (err) {
      setError("Failed to load media items");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMedia();
  }, []);

  const handleSuccess = () => {
    setShowForm(false); // Close the form
    fetchMedia(); // Refresh playlists
  };

  return (
    <div className="p-6 overflow-auto">
      <div className="flex justify-between items-center mb-3 text-nowrap">
      <div className="w-full flex justify-center mb-3">
  <h1 className="text-2xl font-bold text-center">Playlists</h1>
</div>
        <button
  onClick={() => setShowForm(!showForm)}
  className="flex items-center gap-2 px-2 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
>
  {!showForm ? (
    <>
      <Plus size={20} />
      New Playlist
    </>
  ) : (
    "Close Form"
  )}
</button>

      </div>

      {showForm && (
        <div className="mb-8">
          <PlaylistForm onSuccess={handleSuccess} />
        </div>
      )}

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {!loading && !error && mediaItems.length === 0 && <p>No playlists found.</p>}

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
