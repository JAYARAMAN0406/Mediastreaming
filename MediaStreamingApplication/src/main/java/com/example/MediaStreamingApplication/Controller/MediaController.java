package com.example.MediaStreamingApplication.Controller;

import java.io.IOException;
import java.net.MalformedURLException;
import org.springframework.http.HttpHeaders;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Arrays;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.example.MediaStreamingApplication.Entity.MediaFile;
import com.example.MediaStreamingApplication.Service.MediaService;

import jakarta.persistence.EntityNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;




@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/api/media")
public class MediaController {

	 @Autowired
	 private MediaService mediaService;

	

	   

	        @GetMapping("/stream/{filename}")
	        public ResponseEntity<Resource> streamMedia(@PathVariable String filename, @RequestHeader HttpHeaders headers) {
	            return mediaService.streamMedia(filename,headers);
	        }
	    
	        @GetMapping("/streamaudio/{filename}")
	        public ResponseEntity<Resource> streamAudio(@PathVariable String filename) {
	            return mediaService.streamAudio(filename);
	        }


	    @GetMapping("/list")
	    public ResponseEntity<List<MediaFile>> listMediaFiles() {
	        List<MediaFile> mediaFiles = mediaService.listAllMediaFiles();
	        return ResponseEntity.ok(mediaFiles);
	    }
	    
	    private boolean isValidMediaType(MultipartFile file) {
	        // Validate content type
	        String contentType = file.getContentType();
	        List<String> allowedTypes = Arrays.asList("audio/mpeg", "video/mp4");
	        if (!allowedTypes.contains(contentType)) {
	            return false;
	        }

	        // Validate file extension
	        String fileName = file.getOriginalFilename();
	        if (fileName != null) {
	            String extension = fileName.substring(fileName.lastIndexOf(".") + 1).toLowerCase();
	            List<String> allowedExtensions = Arrays.asList("mp3", "mp4");
	            return allowedExtensions.contains(extension);
	        }
	        return false;
	    }

	    @PostMapping("/upload")
	    public ResponseEntity<String> uploadFile(
	            @RequestParam("file") MultipartFile file,
	            @RequestParam(value = "thumbnail", required = false) MultipartFile thumbnail,
	            @RequestParam(value = "title") String title,
	            @RequestParam(value = "description", required = false) String description,
	            @RequestParam(value = "playlistId", required = false) String playlistId) throws InterruptedException {
	        try {
	            // Validate the media file type
	            if (!isValidMediaType(file)) {
	                return ResponseEntity.badRequest().body("Invalid file format. Only MP3 and MP4 files are allowed.");
	            }

	            // Validate the playlistId (if provided)
	            if (playlistId != null && !playlistId.isEmpty()) {
	                // Optionally, you can validate the playlistId here by checking if it exists in the database
	                // For example, if using JPA, you could check if the playlist exists
	            }

	            // Save media file through service layer
	            String responseMessage = mediaService.saveMediaFile(file, thumbnail, title, description, playlistId);

	            return ResponseEntity.ok(responseMessage);
	        } catch (IOException e) {
	            // Log error for debugging purposes (optional)
	            // logger.error("Error saving file", e);
	            return ResponseEntity.status(500).body("Error saving file: " + e.getMessage());
	        } catch (IllegalArgumentException e) {
	            return ResponseEntity.badRequest().body(e.getMessage());
	        }
	    }

	   
	    
	    @GetMapping("/{id}")
	    public ResponseEntity<List<MediaFile>> getPlaylistById(@PathVariable String id) {
	        try {
	            List<MediaFile> playlist = mediaService.listAllPlaylistFiles(id);
	            return ResponseEntity.ok(playlist);
	        } catch (EntityNotFoundException e) {
	            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
	        }
	    }


	   
	    
	    @GetMapping("/list/mp3")
	    public ResponseEntity<List<MediaFile>> listMp3Files() {
	        List<MediaFile> mp3Files = mediaService.listMediaFilesByType("audio/mp3");
	        return ResponseEntity.ok(mp3Files);
	    }

	    @GetMapping("/list/mp4")
	    public ResponseEntity<List<MediaFile>> listMp4Files() {
	        List<MediaFile> mp4Files = mediaService.listMediaFilesByType("video/mp4");
	        return ResponseEntity.ok(mp4Files);
	    }
	    
	    @DeleteMapping("/{id}")
	    public ResponseEntity<String> deletePlaylist(@PathVariable Long id) {
	        try {
	        	mediaService.deletePlaylistAndFiles(id);
	            return ResponseEntity.ok("Playlist and associated files deleted successfully.");
	        } catch (IllegalArgumentException e) {
	            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
	        } catch (IOException e) {
	            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error deleting files: " + e.getMessage());
	        }
	    }
	    
	    
	    @GetMapping("/thumbnails/{filename}")
	    public ResponseEntity<Resource> getThumbnail(@PathVariable String filename) {
	        try {
	            Path filePath = Paths.get("E:\\jayaraman\\Volumes").resolve(filename).normalize();
	            Resource resource = new UrlResource(filePath.toUri());
	            if (resource.exists()) {
	                return ResponseEntity.ok()
	                        .contentType(MediaType.IMAGE_JPEG)
	                        .body(resource);
	            } else {
	                return ResponseEntity.notFound().build();
	            }
	        } catch (MalformedURLException e) {
	            return ResponseEntity.badRequest().build();
	        }
	    }
}
