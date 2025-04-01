// Define Media object structure
const Media = {
  id: 0,
  title: "",
  description: "",
  mediaType: "",
  thumbnailUrl: "",
  filename: "",
  url: "",
  type: "audio", // Can be 'audio' or 'video'
};

// Define Playlist object structure
const Playlist = {
  id: "",
  title: "",
  thumbnail: "",
  mediaIds: [],
};

// Define LiveStream object structure
const LiveStream = {
  id: "",
  title: "",
  url: "",
  isLive: false,
  timestamp: "",
};

export { Media, Playlist, LiveStream };
