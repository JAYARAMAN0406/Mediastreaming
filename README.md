MediaStreamer

MediaStreamer is a web application built with ReactJS (using Vite), TailwindCSS, Java (Spring Boot), and MySQL. It allows users to stream and manage media content seamlessly. This README provides details on setting up, running, and using the application, as well as any additional features included.

Features

Media Streaming: Stream video and audio files in real-time.

User Authentication: Secure login and registration functionality.

Responsive Design: Built with TailwindCSS for a mobile-first, responsive user interface.

Media Management: Upload, delete, and organize media files.

Search and Filter: Easily find content with search and filter capabilities.

Database Integration: MySQL is used for storing user data and media metadata.

Backend Services: Powered by Spring Boot for robust API management.

Prerequisites

Ensure you have the following installed:

Node.js (v14 or later)

Java (JDK 11 or later)

MySQL Server

Maven (for building the Spring Boot application)

Installation

Frontend (ReactJS with Vite)

Clone the repository:

git clone https://github.com/your-username/mediastreamer.git
cd mediastreamer/frontend

Install dependencies:

npm install

Start the development server:

npm run dev

Open your browser and navigate to http://localhost:3000.

Backend (Spring Boot)

Navigate to the backend directory:

cd mediastreamer/backend

Configure MySQL:

Create a database named mediastreamer.

Update the application.properties file in the src/main/resources directory with your MySQL credentials:

spring.datasource.url=jdbc:mysql://localhost:3306/mediastreamer
spring.datasource.username=your-username
spring.datasource.password=your-password

Build and run the Spring Boot application:

mvn spring-boot:run

The backend server will be available at http://localhost:8080.

Usage

Open the frontend in your browser (http://localhost:3000).

Register or log in with your credentials.

Upload media files to your account.

Stream media directly from the application.

Use search and filter to explore available content.

Additional Features

Cross-Browser Compatibility: Works seamlessly on major browsers (Chrome, Firefox, Safari, Edge).

Error Handling: User-friendly error messages for common issues.

Session Management: Secure session storage for logged-in users.

Dark Mode: Toggle between light and dark themes.

Deployment

To deploy MediaStreamer:

Build the frontend for production:

npm run build

Package the backend:

mvn package

Deploy the frontend build files and backend JAR file to your hosting environment.