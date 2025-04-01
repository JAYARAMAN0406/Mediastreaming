import { useState } from "react";
import { PlaySquare } from "lucide-react";
import axios from "axios";
import { BASE_URL_PLAYLIST, PLAYLIST_LIST } from "../utils/ApplicationRouting";

export default function PlaylistForm({ onSuccess }) {
  const [title, setTitle] = useState("");
  const [thumbnail, setThumbnail] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("title", title);
    if (thumbnail) formData.append("thumbnail", thumbnail);

    try {
      const response = await axios.post(`${BASE_URL_PLAYLIST}${PLAYLIST_LIST}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 201) {
        console.log("Playlist created successfully:", response.data);
        setTitle("");
        setThumbnail(null);
        onSuccess(); // Notify parent component
      }
    } catch (error) {
      console.error("Error creating playlist:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">Playlist Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
          required
        />
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">Thumbnail</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setThumbnail(e.target.files ? e.target.files[0] : null)}
          className="w-full"
          required
        />
      </div>

      <button
        type="submit"
        className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors disabled:opacity-50"
        disabled={loading}
      >
        <PlaySquare size={20} />
        {loading ? "Creating..." : "Create Playlist"}
      </button>
    </form>
  );
}
