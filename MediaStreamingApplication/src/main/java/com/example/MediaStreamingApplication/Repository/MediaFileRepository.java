package com.example.MediaStreamingApplication.Repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.MediaStreamingApplication.Entity.MediaFile;

@Repository
public interface MediaFileRepository extends JpaRepository<MediaFile, Long> {

	 Optional<MediaFile> findByFilename(String filename);

	List<MediaFile> findByContentType(String contentType);

	

	@Query("SELECT m FROM MediaFile m WHERE m.playlist.id = :playlistId")
	List<MediaFile> findAllByPlaylistId(@Param("playlistId") String playlistId);

	

	
}
