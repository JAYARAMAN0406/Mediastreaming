package com.example.MediaStreamingApplication.Repository;



import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.MediaStreamingApplication.Entity.Livestream;

@Repository
public interface LivestreamRepository extends JpaRepository<Livestream, Long> {

	Optional<Livestream> findByFilename(String filename);

	List<Livestream> findByContentType(String contentType);

	

	

	
}
