package com.example.MediaStreamingApplication.Controller;

import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Arrays;
import java.util.List;

import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.example.MediaStreamingApplication.Entity.Livestream;
import com.example.MediaStreamingApplication.Service.LivestreamService;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;




@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/api/live")
public class LivestreamController {

	 @Autowired
	 private LivestreamService livestreamService;

	

	   

	        @GetMapping("/stream/{filename}")
	        public ResponseEntity<Resource> streamMedia(@PathVariable String filename) {
	            return livestreamService.streamMedia(filename);
	        }
	    
	        @GetMapping("/streamaudio/{filename}")
	        public ResponseEntity<Resource> streamAudio(@PathVariable String filename) {
	            return livestreamService.streamAudio(filename);
	        }


	    @GetMapping("/list")
	    public ResponseEntity<List<Livestream>> listMediaFiles() {
	        List<Livestream> livestream = livestreamService.listAllMediaFiles();
	        return ResponseEntity.ok(livestream);
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
	            @RequestParam(value = "description", required = false) String description) throws InterruptedException {
	        try {
	            // Validate the media file type
	            if (!isValidMediaType(file)) {
	                return ResponseEntity.badRequest().body("Invalid file format. Only MP3 and MP4 files are allowed.");
	            }

	            String responseMessage = livestreamService.saveMediaFile(file, thumbnail, title, description);

	            return ResponseEntity.ok(responseMessage);
	        } catch (IOException e) {
	            return ResponseEntity.status(500).body("Error saving file: " + e.getMessage());
	        } catch (IllegalArgumentException e) {
	            return ResponseEntity.badRequest().body(e.getMessage());
	        }
	    }

	   
	    
	 


	   
	    
	    @GetMapping("/list/mp3")
	    public ResponseEntity<List<Livestream>> listMp3Files() {
	        List<Livestream> mp3Files = livestreamService.listMediaFilesByType("audio/mp3");
	        return ResponseEntity.ok(mp3Files);
	    }

	    @GetMapping("/list/mp4")
	    public ResponseEntity<List<Livestream>> listMp4Files() {
	        List<Livestream> mp4Files = livestreamService.listMediaFilesByType("video/mp4");
	        return ResponseEntity.ok(mp4Files);
	    }
	    
	  
	    
	    
	    @GetMapping("/thumbnails/{filename}")
	    public ResponseEntity<Resource> getThumbnail(@PathVariable String filename) {
	        try {
	            Path filePath = Paths.get("E:\\Volumes").resolve(filename).normalize();
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
