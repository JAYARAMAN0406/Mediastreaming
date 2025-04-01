package com.example.MediaStreamingApplication.Model;



import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class FileInfo {

  
	private String localPath;
    private String url;
	
    
    public FileInfo(String localPath, String url) {
        this.localPath = localPath;
        this.url = url;
    }
}
