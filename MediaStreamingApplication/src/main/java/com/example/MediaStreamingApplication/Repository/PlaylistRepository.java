package com.example.MediaStreamingApplication.Repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.MediaStreamingApplication.Entity.PlayList;


@Repository
public interface PlaylistRepository extends JpaRepository<PlayList, Long> {

	@Query("SELECT p FROM PlayList p WHERE p.playlistId = :playlistId")
	 Optional<PlayList> findByPlaylistId(@Param("playlistId") String playlistId);

	@Query("SELECT p FROM PlayList p WHERE p.Id = :id")
	 Optional<PlayList> findById(@Param("id") String id);

}
