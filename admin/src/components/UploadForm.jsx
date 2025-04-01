import { useState, useEffect } from "react";
import { Upload } from "lucide-react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BASE_URL_MEDIA, BASE_URL_PLAYLIST, MEDIA_UPLOAD, PLAYLIST_LIST } from "../utils/ApplicationRouting";

export default function UploadForm() {
  const [mediaType, setMediaType] = useState("video");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [thumbnail, setThumbnail] = useState(null);
  const [mediaFile, setMediaFile] = useState(null);
  const [playlists, setPlaylists] = useState([]);
  const [selectedPlaylistId, setSelectedPlaylistId] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchPlaylists = async () => {
      try {
        const response = await axios.get(`${BASE_URL_PLAYLIST}${PLAYLIST_LIST}`);
        setPlaylists(response.data);
      } catch (error) {
        console.error("Error fetching playlists:", error);
      }
    };

    fetchPlaylists();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("mediaType", mediaType);

    if (selectedPlaylistId) {
      formData.append("playlistId", selectedPlaylistId);
    }

    if (mediaFile) {
      formData.append("file", mediaFile);
    }

    if (thumbnail) {
      formData.append("thumbnail", thumbnail);
    }

    try {
      const response = await axios.post(`${BASE_URL_MEDIA}${MEDIA_UPLOAD}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 200) {
        toast.success("Media uploaded successfully! 🎉");
        setTitle("");
        setDescription("");
        setThumbnail(null);
        setMediaFile(null);
        setSelectedPlaylistId(null);
      }
    } catch (error) {
      console.error("Error uploading media:", error);
      toast.error("Failed to upload media. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl">
      {/* Toast Notifications */}
      <ToastContainer position="top-center" autoClose={3000} />

      <form onSubmit={handleSubmit} className="space-y-3">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Select Playlist</label>
          <select
            value={selectedPlaylistId || ""}
            onChange={(e) => setSelectedPlaylistId(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <option value="" disabled>
              Select a playlist
            </option>
            {playlists.map((playlist) => (
              <option key={playlist.id} value={playlist.playlistId}>
                {playlist.title}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Media Type</label>
          <select
            value={mediaType}
            onChange={(e) => setMediaType(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <option value="video">Video</option>
            <option value="audio">Audio</option>
          </select>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            required
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            rows={4}
          />
        </div>

        {mediaType === "audio" && (
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Thumbnail</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setThumbnail(e.target.files ? e.target.files[0] : null)}
              className="w-full"
            />
          </div>
        )}

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Media File</label>
          <input
            type="file"
            accept={mediaType === "audio" ? "audio/*" : "video/*"}
            onChange={(e) => setMediaFile(e.target.files ? e.target.files[0] : null)}
            className="w-full"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors disabled:opacity-50"
          disabled={loading}
        >
          <Upload size={20} />
          {loading ? "Uploading..." : "Upload Media"}
        </button>
      </form>
    </div>
  );
}
