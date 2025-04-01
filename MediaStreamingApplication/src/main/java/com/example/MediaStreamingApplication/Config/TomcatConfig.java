package com.example.MediaStreamingApplication.Config;

import org.springframework.boot.web.embedded.tomcat.TomcatServletWebServerFactory;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class TomcatConfig {

	 @Bean
	    public TomcatServletWebServerFactory servletContainer() {
	        TomcatServletWebServerFactory tomcat = new TomcatServletWebServerFactory();
	        tomcat.addConnectorCustomizers(connector -> {
	            connector.setMaxPostSize(-1);  // Disable size limit for POST requests
	        });
	        return tomcat;
	    }
	
}
