package com.example.MediaStreamingApplication.Service;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStreamReader;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.example.MediaStreamingApplication.Entity.Livestream;
import com.example.MediaStreamingApplication.Repository.LivestreamRepository;
import com.example.MediaStreamingApplication.Repository.PlaylistRepository;

@Service
public class LivestreamService {


    private final FileStorageService fileStorageService;
    private final LivestreamRepository livestreamRepository;
    private final Path mediaStoragePath = Paths.get("media-files");

   
    public LivestreamService(
            FileStorageService fileStorageService,
            LivestreamRepository livestreamRepository,
            PlaylistRepository playlistRepository) throws IOException {
        this.fileStorageService = fileStorageService;
        this.livestreamRepository = livestreamRepository;

        // Ensure the media storage directory exists
        if (!Files.exists(mediaStoragePath)) {
            Files.createDirectories(mediaStoragePath);
        }
    }



	    public Optional<Livestream> getMediaFileByFilename(String filename) {
	        return livestreamRepository.findByFilename(filename);
	    }

	    
	    public List<Livestream> listAllMediaFiles() {
	        return livestreamRepository.findAll();
	    }




	  

	    public String saveMediaFile(MultipartFile file, MultipartFile thumbnail, String title, String description) 
	            throws IOException, InterruptedException {

	        final long MAX_FILE_SIZE = 5L * 1024 * 1024 * 1024; // 5GB in bytes
	        
	        // Validate file size
	        if (file.getSize() > MAX_FILE_SIZE) {
	            throw new IllegalArgumentException("File size exceeds the maximum limit of 5GB.");
	        }

	        // Validate original filename
	        String originalFilename = file.getOriginalFilename();
	        if (originalFilename == null || originalFilename.isEmpty()) {
	            throw new IllegalArgumentException("Invalid file name.");
	        }

	        // Sanitize filename
	        String sanitizedFilename = sanitizeFilename(originalFilename, ".mp3");

	        // Save media file to local storage
	        String mediaUrl;
	        try {
	            mediaUrl = fileStorageService.storeFile(file, sanitizedFilename);
	        } catch (IOException e) {
	            throw new IOException("Failed to save media file.", e);
	        }

	        // Save thumbnail if provided
	        String thumbnailUrl = "";
	        if (thumbnail != null && !thumbnail.isEmpty()) {
	            try {
	                String thumbnailFilename = sanitizeFilename(thumbnail.getOriginalFilename(), ".jpg");
	                thumbnailUrl = fileStorageService.storeFile(thumbnail, thumbnailFilename);
	            } catch (IOException e) {
	                throw new IOException("Failed to save thumbnail file.", e);
	            }
	        }

	        // Construct web-accessible URLs for the thumbnail
	        String webAccessibleThumbnailUrl = thumbnailUrl.isEmpty() 
	            ? "" 
	            : "http://localhost:8080/api/media/thumbnails/" + Paths.get(thumbnailUrl).getFileName().toString();

	        // Initialize MediaFile entity
	        Livestream liveStream = new Livestream();
	        liveStream.setMediaUrl(mediaUrl);
	        liveStream.setThumbnailUrl(webAccessibleThumbnailUrl);
	        liveStream.setTitle(title);
	        liveStream.setFilename(sanitizedFilename);
	        liveStream.setDescription(description);
	        liveStream.setContentType(normalizeContentType(file.getContentType()));
	        liveStream.setType(normalizeContentType(file.getContentType()));
	        liveStream.setUploadDate(LocalDate.now());
	        liveStream.setSize(file.getSize());
	        liveStream.setLive(true);
	       

	        // Process video-specific metadata
	        if ("video/mp4".equalsIgnoreCase(file.getContentType())) {
	            try {
	                // Extract duration
	                String duration = getVideoDuration(mediaUrl);
	                liveStream.setDuration(duration);

	                // Extract and save video thumbnail
	                String videoThumbnailUrl = extractThumbnail(mediaUrl, "thumbnail-" + System.currentTimeMillis() + ".jpg");
	                String webAccessibleVideoThumbnailUrl = "http://localhost:8080/api/media/thumbnails/" + Paths.get(videoThumbnailUrl).getFileName().toString();
	                liveStream.setThumbnailUrl(webAccessibleVideoThumbnailUrl);

	            } catch (IOException | InterruptedException e) {
	                throw new IOException("Failed to process video file: " + mediaUrl, e);
	            }
	        }

	        // Save the MediaFile entity
	        try {
	        	livestreamRepository.save(liveStream);
	        } catch (Exception e) {
	            // Cleanup saved files if saving entity fails
	            Files.deleteIfExists(Paths.get(mediaUrl));
	            if (!thumbnailUrl.isEmpty()) {
	                Files.deleteIfExists(Paths.get(thumbnailUrl));
	            }
	            throw new IOException("Failed to save media metadata.", e);
	        }

	        return "File uploaded successfully: " + mediaUrl;
	    }


	    
	    public String normalizeContentType(String contentType) {
	        if ("audio/mpeg".equals(contentType)) {
	            return "audio/mp3";
	        }
	        return contentType;
	    }

	    public String sanitizeFilename(String originalFilename, String defaultExtension) {
	        if (originalFilename == null || originalFilename.isEmpty()) {
	            throw new IllegalArgumentException("Invalid file name");
	        }

	        // Replace spaces with underscores
	        String sanitized = originalFilename.replace(" ", "_");

	        // Remove special characters except for allowed ones (e.g., underscores, dots, parentheses)
	        sanitized = sanitized.replaceAll("[^a-zA-Z0-9_.()]", "");

	        // Extract the file extension if present
	        int lastDotIndex = sanitized.lastIndexOf(".");
	        String baseName;
	        String extension;

	        if (lastDotIndex != -1) {
	            baseName = sanitized.substring(0, lastDotIndex); // Filename without extension
	            extension = sanitized.substring(lastDotIndex);   // Extension including dot
	        } else {
	            baseName = sanitized;                            // Entire filename without dot
	            extension = "";                                  // No extension
	        }

	        // Limit the base name to the first 12 characters (excluding numbers and special characters)
	        baseName = baseName.replaceAll("[^a-zA-Z]", "");     // Keep only letters
	        if (baseName.length() > 12) {
	            baseName = baseName.substring(0, 12);  // Only take up to the first 12 characters
	        }

	        // Use the provided default extension if no valid extension exists
	        if (extension.isEmpty()) {
	            extension = defaultExtension;
	        }

	        return baseName + extension;
	    }


	 // Method to get the video duration
	    public String getVideoDuration(String videoPath) throws IOException, InterruptedException {
	        String ffmpegPath = "C:\\ffmpeg\\ffmpeg-master-latest-win64-gpl-shared\\bin\\ffmpeg.exe"; // Ensure FFmpeg path is correct
	        File videoFile = new File(videoPath);

	        // Validate the file existence
	        if (!videoFile.exists()) {
	            throw new IOException("Video file not found: " + videoPath);
	        }

	        // Run FFmpeg command to get the video metadata
	        ProcessBuilder processBuilder = new ProcessBuilder(ffmpegPath, "-i", videoFile.getAbsolutePath());
	        processBuilder.redirectErrorStream(true); // Combine stdout and stderr

	        Process process = processBuilder.start();

	        StringBuilder output = new StringBuilder();
	        try (BufferedReader reader = new BufferedReader(new InputStreamReader(process.getInputStream()))) {
	            String line;
	            while ((line = reader.readLine()) != null) {
	                output.append(line).append(System.lineSeparator());
	                System.out.println(line); // Log FFmpeg output for debugging
	                if (line.contains("Duration:")) {
	                    // Extract duration from the line
	                    String[] parts = line.split(",");
	                    String duration = parts[0].split("Duration:")[1].trim();
	                    return duration;
	                }
	            }
	        }

	        int exitCode = process.waitFor();
	        if (exitCode != 0) {
	            System.err.println("FFmpeg failed. Exit code: " + exitCode);
	            System.err.println("FFmpeg output: " + output);
	            throw new IOException("FFmpeg failed to retrieve video duration. Exit code: " + exitCode);
	        }

	        // If no "Duration" line is found
	        throw new IOException("Failed to extract video duration. FFmpeg output: " + output);
	    }



	    // Method to extract a thumbnail from the video
	    public String extractThumbnail(String videoPath, String thumbnailFilename) throws IOException, InterruptedException {
	        String ffmpegPath = "C:\\ffmpeg\\ffmpeg-master-latest-win64-gpl-shared\\bin\\ffmpeg.exe";
	        String thumbnailPath = Paths.get("E:\\Volumes", thumbnailFilename).toString();

	        // Construct and log the FFmpeg command
	        ProcessBuilder processBuilder = new ProcessBuilder(
	            ffmpegPath, "-i", videoPath, "-ss", "00:00:01", "-vframes", "1", thumbnailPath
	        );
	        processBuilder.redirectErrorStream(true);

	        System.out.println("Executing FFmpeg command: " + String.join(" ", processBuilder.command()));

	        Process process = processBuilder.start();

	        // Capture FFmpeg output for debugging
	        try (BufferedReader reader = new BufferedReader(new InputStreamReader(process.getInputStream()))) {
	            String line;
	            while ((line = reader.readLine()) != null) {
	                System.out.println(line); // Log FFmpeg output
	            }
	        }

	        int exitCode = process.waitFor();
	        if (exitCode != 0) {
	            throw new IOException("FFmpeg failed to extract thumbnail. Exit code: " + exitCode);
	        }

	        return thumbnailPath;
	    }

	    
	    public ResponseEntity<Resource> streamMedia(String filename) {
	        try {
	            // Define the file path
	            Path filePath = Paths.get("E:\\Volumes").resolve(filename);
	            Resource resource = new UrlResource(filePath.toUri());

	            // Check if file exists and is readable
	            if (!resource.exists() || !resource.isReadable()) {
	                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
	            }

	            // Get file content type
	            String contentType = Files.probeContentType(filePath);

	            return ResponseEntity.ok()
	                    .header(HttpHeaders.CONTENT_TYPE, contentType)
	                    .header(HttpHeaders.CONTENT_LENGTH, String.valueOf(Files.size(filePath)))
	                    .body(resource);

	        } catch (IOException e) {
	            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
	        }
	    }
	    
	    public ResponseEntity<Resource> streamAudio(String filename) {
	        try {
	            Path filePath = Paths.get("E:\\Volumes", filename).normalize();
	            if (!Files.exists(filePath)) {
	                throw new FileNotFoundException("File not found: " + filename);
	            }

	            Resource resource = new UrlResource(filePath.toUri());
	            return ResponseEntity.ok()
	                    .contentType(MediaType.parseMediaType("audio/mpeg"))
	                    .body(resource);
	        } catch (Exception e) {
	            e.printStackTrace();
	            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
	        }
	    }

	   

	  
	    
	    
	    public List<Livestream> listMediaFilesByType(String contentType) {
	        return livestreamRepository.findByContentType(contentType);
	    }
	    
	 
	 

}
