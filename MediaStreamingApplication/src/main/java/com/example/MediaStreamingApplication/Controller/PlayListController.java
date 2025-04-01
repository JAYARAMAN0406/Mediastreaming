package com.example.MediaStreamingApplication.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.example.MediaStreamingApplication.Entity.PlayList;
import com.example.MediaStreamingApplication.Service.PlayListService;

@RestController
@RequestMapping("/api/playlist")
public class PlayListController {

	
	 @Autowired
	 private PlayListService playListService;
	
	 @PostMapping("/playlists")
	 public ResponseEntity<PlayList> createPlaylist(
			  @RequestParam(value = "title") String title,
	         @RequestParam(value = "thumbnail", required = false) MultipartFile thumbnail) {
	     PlayList savedPlaylist = playListService.savePlaylistWithThumbnail(title, thumbnail);
	     return ResponseEntity.status(HttpStatus.CREATED).body(savedPlaylist);
	 }

	    @GetMapping("/playlists")
	    public ResponseEntity<List<PlayList>> listPlaylists() {
	        List<PlayList> playlists = playListService.listAllPlaylists();
	        return ResponseEntity.ok(playlists);
	    }

	    @GetMapping("/{id}")
	    public ResponseEntity<PlayList> getById(@PathVariable String id) {
	        PlayList playlists = playListService.getById(id);
	        return ResponseEntity.ok(playlists);
	    }
}
