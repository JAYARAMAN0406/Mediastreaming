package com.example.MediaStreamingApplication.Service;


import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.example.MediaStreamingApplication.Entity.PlayList;
import com.example.MediaStreamingApplication.Repository.PlaylistRepository;

@Service
public class PlayListService {
	
	   private final PlaylistRepository playlistRepository;
	   private final Path mediaStoragePath = Paths.get("media-files");
	   private final FileStorageService fileStorageService;
	   
	   public PlayListService( PlaylistRepository playlistRepository,FileStorageService fileStorageService) throws IOException {
		    this.fileStorageService = fileStorageService;
	        this.playlistRepository = playlistRepository;
	        if (!Files.exists(mediaStoragePath)) {
	            Files.createDirectories(mediaStoragePath);
	        }
	    }

	   public PlayList savePlaylistWithThumbnail(String title, MultipartFile thumbnail) {
		    try {
		    	
		    	 PlayList playList=new PlayList();
		        if (thumbnail != null && !thumbnail.isEmpty()) {
		            // Validate file type
		            String contentType = thumbnail.getContentType();
		            if (contentType == null || !contentType.startsWith("image/")) {
		                throw new IllegalArgumentException("Invalid thumbnail file type.");
		            }

		            String thumbnailUrl = "";
			        if (thumbnail != null && !thumbnail.isEmpty()) {
			            try {
			                String thumbnailFilename = thumbnail.getOriginalFilename();
			                thumbnailUrl = fileStorageService.storeFile(thumbnail, thumbnailFilename);
			            } catch (IOException e) {
			                throw new IOException("Failed to save thumbnail file.", e);
			            }
			        }

			        // Construct web-accessible URLs
			        String webAccessibleThumbnailUrl = thumbnailUrl.isEmpty() 
			            ? "" 
			            : "http://localhost:8080/api/media/thumbnails/" + Paths.get(thumbnailUrl).getFileName().toString();


		            // Set the thumbnail URL/path to the playlist
		            playList.setThumbnailUrl(webAccessibleThumbnailUrl);
		            playList.setTitle(title);
		        }

		        // Save the playlist
		        return playlistRepository.save(playList);
		    } catch (IOException e) {
		        throw new RuntimeException("Error while saving thumbnail", e);
		    }
		}

	  
	  
	    public List<PlayList> listAllPlaylists() {
	        return playlistRepository.findAll();
	    }

		public PlayList getById(String id) {
			 PlayList playlist = playlistRepository.findById(id)
			            .orElseThrow(() -> new IllegalArgumentException("Playlist not found with ID: " + id));
			return playlist;
		}
	
}
