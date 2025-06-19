import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Dialog,
  DialogContent,
  IconButton,
  Box,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const VideoModal = ({ filename, onClose }) => {
  const [videoUrl, setVideoUrl] = useState(null);
  const theme = useTheme();  
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm")); // Make modal fullscreen on small screens

  useEffect(() => {
    if (filename) {
      const fetchVideoUrl = async () => {
        try {
          const response = await axios.get(
            `http://localhost:8080/api/media/stream/${filename}`,
            {
              responseType: "blob",
            }
          );
          const videoBlob = new Blob([response.data], { type: "video/mp4" });
          const videoObjectUrl = URL.createObjectURL(videoBlob);
          setVideoUrl(videoObjectUrl);
        } catch (err) {
          console.error("Failed to fetch video URL", err);
        }
      };

      fetchVideoUrl();
    }
  }, [filename]);

  if (!filename) return null;

  return (
    <Dialog open={!!filename} onClose={onClose} fullScreen={fullScreen} maxWidth="md" fullWidth>
      <DialogContent sx={{ position: "relative", p: 0 }}>
        <IconButton
          onClick={onClose}
          sx={{
            position: "absolute",
            top: 8,
            right: 8,
            zIndex: 10,
            color: "#fff",
            backgroundColor: "rgba(0,0,0,0.5)",
            "&:hover": {
              backgroundColor: "rgba(0,0,0,0.7)",
            },
          }}
        >
          <CloseIcon />
        </IconButton>
        <Box sx={{ width: "100%", height: "100%", backgroundColor: "#000" }}>
          {videoUrl ? (
            <video
              controls
              autoPlay
              style={{
                width: "100%",
                height: "100%",
                maxHeight: "80vh",
                display: "block",
              }}
            >
              <source src={videoUrl} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          ) : (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "300px",
                color: "#666",
              }}
            >
              Loading...
            </Box>
          )}
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default VideoModal;
