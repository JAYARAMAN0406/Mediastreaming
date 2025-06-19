import React, { useEffect, useRef, useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Box,
  Stack,
  useMediaQuery,
  useTheme
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import FullscreenExitIcon from '@mui/icons-material/FullscreenExit';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import axios from 'axios';
import { BASE_URL_MEDIA, MEDIA_AUDIO_STREAM, MEDIA_VIDEO_STREAM } from '../utils/ApplicationRouting';

const MediaPlayer = ({ media, onClose, onNext, onPrevious }) => {
  const [videoUrl, setVideoUrl] = useState(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const mediaRef = useRef(null);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
  const fetchMedia = async () => {
    try {
      let baseUrl;
      if (media.type === 'video/mp4') {
        baseUrl = `${BASE_URL_MEDIA}${MEDIA_VIDEO_STREAM}`;
      } else if (media.type === 'audio/mp3') {
        baseUrl = `${BASE_URL_MEDIA}${MEDIA_AUDIO_STREAM}`;
      } else {
        console.error("Unsupported media type");
        return;
      }

      const response = await axios.get(`${baseUrl}/${media.filename}`, {
        responseType: 'blob',
      });
      const url = URL.createObjectURL(response.data);

      // Pause the old media
      if (mediaRef.current) {
        mediaRef.current.pause();
      }

      setVideoUrl(url);
      setIsPlaying(true); // Reset to playing state
    } catch (err) {
      console.error("Failed to fetch media:", err);
    }
  };

  fetchMedia();

  return () => {
    if (videoUrl) {
      URL.revokeObjectURL(videoUrl);
    }
  };
}, [media]);

useEffect(() => {
  if (mediaRef.current && isPlaying) {
    mediaRef.current.play().catch((e) => {
      console.warn("Autoplay failed:", e);
    });
  }
}, [videoUrl]);


  const togglePlay = () => {
    if (mediaRef.current) {
      if (isPlaying) {
        mediaRef.current.pause();
      } else {
        mediaRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleFullscreen = () => {
    const elem = document.documentElement;
    if (!document.fullscreenElement) {
      elem.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  if (!videoUrl) return null;

  return (
    <Dialog open onClose={onClose} fullScreen={fullScreen} maxWidth="md">
      <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        {media.title}
        <Box>
          <IconButton onClick={toggleFullscreen}>
            {isFullscreen ? <FullscreenExitIcon /> : <FullscreenIcon />}
          </IconButton>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>

      <DialogContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
        {media.type === 'video/mp4' ? (
          <video
            ref={mediaRef}
            src={videoUrl}
            autoPlay
            controls
            style={{ width: '100%', maxHeight: '60vh', borderRadius: 8 }}
          />
        ) : (
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
            {media.thumbnailUrl && (
              <img
                src={media.thumbnailUrl}
                alt="Audio Thumbnail"
                style={{ maxWidth: '100%', maxHeight: 250, borderRadius: 8 }}
              />
            )}
            <audio ref={mediaRef} src={videoUrl} autoPlay controls style={{ width: '100%' }} />
          </Box>
        )}

        <Stack direction="row" spacing={3} alignItems="center" justifyContent="center">
          {onPrevious && (
            <IconButton onClick={onPrevious}>
              <SkipPreviousIcon fontSize="large" />
            </IconButton>
          )}
          <IconButton onClick={togglePlay}>
            {isPlaying ? <PauseIcon fontSize="large" /> : <PlayArrowIcon fontSize="large" />}
          </IconButton>
          {onNext && (
            <IconButton onClick={onNext}>
              <SkipNextIcon fontSize="large" />
            </IconButton>
          )}
        </Stack>
      </DialogContent>
    </Dialog>
  );
};

export default MediaPlayer;
