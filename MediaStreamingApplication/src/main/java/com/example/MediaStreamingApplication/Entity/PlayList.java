package com.example.MediaStreamingApplication.Entity;

import java.util.List;
import java.util.UUID;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name = "playlist")
public class PlayList {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "playlist_id", unique = true, nullable = false, length = 12)
    private String playlistId;

    @Column(name = "title")
    private String title;
    
    @Column(name = "thumbnail_url")
    private String thumbnailUrl;

    @OneToMany(mappedBy = "playlist", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<MediaFile> mediaFiles;

    @PrePersist
    private void generatePlaylistId() {
        if (this.playlistId == null) {
            // Generate a UUID and remove hyphens
            String uuidString = UUID.randomUUID().toString().replaceAll("-", "");
            
            // Ensure the string is long enough for the substring
            if (uuidString.length() >= 12) {
                this.playlistId = uuidString.substring(0, 12);
            } else {
                // Handle the edge case if the string is unexpectedly short
                throw new IllegalStateException("Generated UUID does not have enough characters.");
            }
        }
    }

}
