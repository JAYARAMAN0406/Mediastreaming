package com.example.MediaStreamingApplication.Entity;

import java.time.LocalDate;
import java.util.UUID;


import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name = "livestream")
public class Livestream {
	
	 @Id
	    @GeneratedValue(strategy = GenerationType.IDENTITY)
	    @Column(name = "id")
	    private Long id;

	    @Column(name = "live_id", unique = true, nullable = false, length = 12)
	    private String liveId;

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

	    @PrePersist
	    private void generateMediaId() {
	        if (this.liveId == null) {
	            // Generate a UUID string and remove hyphens
	            String uuidString = UUID.randomUUID().toString().replaceAll("-", "");
	            
	            // Ensure the UUID string has at least 12 characters
	            if (uuidString.length() >= 12) {
	                this.liveId = uuidString.substring(0, 12);
	            } else {
	                // Log or throw an exception if the UUID is unexpectedly short
	                throw new IllegalStateException("Generated UUID is too short: " + uuidString);
	            }
	        }
	    }
	    
}
