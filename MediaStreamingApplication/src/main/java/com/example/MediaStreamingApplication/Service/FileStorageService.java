package com.example.MediaStreamingApplication.Service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;


import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@Service
public class FileStorageService {

    @Value("${file.storage.path}")
    private String storagePath;

    @Value("${server.base.url}") // Add base URL for public access
    private String serverBaseUrl;

    public String storeFile(MultipartFile file, String customFilename) throws IOException {
        // Ensure the storage directory exists
        Path directory = Paths.get(storagePath);
        Files.createDirectories(directory);

        // Determine the filename to use (custom or original)
        String originalFilename = file.getOriginalFilename();
        String filenameToUse = (customFilename != null && !customFilename.isEmpty())
                ? customFilename
                : originalFilename;

        // Validate the filename
        if (filenameToUse == null || filenameToUse.isEmpty()) {
            throw new IllegalArgumentException("Invalid file name.");
        }

        // Sanitize: Remove numbers and special characters, keep first 12 valid characters
        String sanitizedFileName = filenameToUse.replaceAll("[^a-zA-Z]", "");
        sanitizedFileName = sanitizedFileName.substring(0, Math.min(12, sanitizedFileName.length()));

        // Append the file extension (if applicable)
        String extension = "";
        if (filenameToUse.contains(".")) {
            extension = filenameToUse.substring(filenameToUse.lastIndexOf("."));
        }
        sanitizedFileName += extension;

        // Resolve the file path
        Path filePath = directory.resolve(customFilename);

        // Check for file existence to prevent overwriting
        if (Files.exists(filePath)) {
            throw new IOException("File already exists: " + sanitizedFileName);
        }

        // Save the file
        try (InputStream inputStream = file.getInputStream()) {
            Files.copy(inputStream, filePath);
        }

        // Return the absolute path
        return filePath.toAbsolutePath().toString();
    }






}

