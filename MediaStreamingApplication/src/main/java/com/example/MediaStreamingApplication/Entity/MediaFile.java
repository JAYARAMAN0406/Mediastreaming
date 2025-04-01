package com.example.MediaStreamingApplication.Entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.util.UUID;

@Entity
@Getter
@Setter
@Table(name = "mediafile")
public class MediaFile {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "media_id", unique = true, nullable = false, length = 12)
    private String mediaId;

    @Column(name = "filename")
    private String filename;
    
    @Column(name = "title")
    private String title;
    
    @Column(name = "description", length = 5000)
    private String description;

    
    
    @Column(name = "content_type")
    private String contentType;

    @Column(name = "size")
    private long size;
    
    @Column(name = "type")
    private String type;
    
    @Column(name = "is_live")
    private boolean isLive;
    
    @Column(name = "viewers")
    private String viewers;
    
    @Column(name = "views")
    private String views;

    @Column(name = "upload_date")
    private LocalDate uploadDate;
    
    @Column(name = "duration")
    private String duration;


    @Column(name = "thumbnail_url")
    private String thumbnailUrl;
    
    @Column(name = "media_url")
    private String mediaUrl;
    
    @ManyToOne
    @JoinColumn(name = "playlist_id")
    @JsonIgnore
    private PlayList playlist;


    @PrePersist
    private void generateMediaId() {
        if (this.mediaId == null) {
            // Generate a UUID string and remove hyphens
            String uuidString = UUID.randomUUID().toString().replaceAll("-", "");
            
            // Ensure the UUID string has at least 12 characters
            if (uuidString.length() >= 12) {
                this.mediaId = uuidString.substring(0, 12);
            } else {
                // Log or throw an exception if the UUID is unexpectedly short
                throw new IllegalStateException("Generated UUID is too short: " + uuidString);
            }
        }
    }


}
