package com.example.MediaStreamingApplication;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cache.annotation.EnableCaching;

@SpringBootApplication
@EnableCaching
public class MediaStreamingApplication {

	public static void main(String[] args) {
		SpringApplication.run(MediaStreamingApplication.class, args);
	}

}
