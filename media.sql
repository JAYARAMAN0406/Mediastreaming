CREATE DATABASE  IF NOT EXISTS `media` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `media`;
-- MySQL dump 10.13  Distrib 8.0.41, for Win64 (x86_64)
--
-- Host: localhost    Database: media
-- ------------------------------------------------------
-- Server version	8.0.41

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `livestream`
--

DROP TABLE IF EXISTS `livestream`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `livestream` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `content_type` varchar(255) DEFAULT NULL,
  `description` varchar(5000) DEFAULT NULL,
  `duration` varchar(255) DEFAULT NULL,
  `filename` varchar(255) DEFAULT NULL,
  `is_live` bit(1) DEFAULT NULL,
  `live_id` varchar(12) NOT NULL,
  `media_url` varchar(255) DEFAULT NULL,
  `size` bigint DEFAULT NULL,
  `thumbnail_url` varchar(255) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `type` varchar(255) DEFAULT NULL,
  `upload_date` date DEFAULT NULL,
  `viewers` varchar(255) DEFAULT NULL,
  `views` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UK_14nulpovaq1yscnsv2ismelg7` (`live_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `livestream`
--

LOCK TABLES `livestream` WRITE;
/*!40000 ALTER TABLE `livestream` DISABLE KEYS */;
/*!40000 ALTER TABLE `livestream` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `mediafile`
--

DROP TABLE IF EXISTS `mediafile`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `mediafile` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `content_type` varchar(255) DEFAULT NULL,
  `description` varchar(5000) DEFAULT NULL,
  `duration` varchar(255) DEFAULT NULL,
  `filename` varchar(255) DEFAULT NULL,
  `is_live` bit(1) DEFAULT NULL,
  `media_id` varchar(12) NOT NULL,
  `media_url` varchar(255) DEFAULT NULL,
  `size` bigint DEFAULT NULL,
  `thumbnail_url` varchar(255) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `type` varchar(255) DEFAULT NULL,
  `upload_date` date DEFAULT NULL,
  `viewers` varchar(255) DEFAULT NULL,
  `views` varchar(255) DEFAULT NULL,
  `playlist_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UK_qtu8gu6ggi7n6kaah734psk9e` (`media_id`),
  KEY `FKruye1x7mwf49k79qgfb5f2gxj` (`playlist_id`),
  CONSTRAINT `FKruye1x7mwf49k79qgfb5f2gxj` FOREIGN KEY (`playlist_id`) REFERENCES `playlist` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `mediafile`
--

LOCK TABLES `mediafile` WRITE;
/*!40000 ALTER TABLE `mediafile` DISABLE KEYS */;
INSERT INTO `mediafile` VALUES (1,'video/mp4','video 1','00:04:14.58','TheeThalapat.mp4',_binary '\0','a0343cb36f7e','E:\\Volumes\\TheeThalapat.mp4',187028548,'http://localhost:8080/api/media/thumbnails/thumbnail-1743235694650.jpg','video 1','video/mp4','2025-03-29',NULL,NULL,NULL),(2,'video/mp4','video 2','00:00:15.10','sakthisp.mp4',_binary '\0','26ff3e56d60e','E:\\Volumes\\sakthisp.mp4',1051069,'http://localhost:8080/api/media/thumbnails/thumbnail-1743235766672.jpg','video 2','video/mp4','2025-03-29',NULL,NULL,NULL),(3,'audio/mp3','ar rahman hits',NULL,'youthlovebgm.mp3',_binary '\0','cfc372de5c73','E:\\Volumes\\youthlovebgm.mp3',970029,'http://localhost:8080/api/media/thumbnails/arrahman.jpg','ar rahman','audio/mp3','2025-03-29',NULL,NULL,NULL),(4,'audio/mp3','mp3 one',NULL,'SaravananMee.mp3',_binary '\0','52183502e9a8','E:\\Volumes\\SaravananMee.mp3',2055981,'http://localhost:8080/api/media/thumbnails/saipallavifc.jpg','mp3 one','audio/mp3','2025-03-29',NULL,NULL,NULL),(5,'video/mp4','video 3','00:00:33.20','kmedits.mp4',_binary '\0','849c4e48ed33','E:\\Volumes\\kmedits.mp4',3544871,'http://localhost:8080/api/media/thumbnails/thumbnail-1743236165980.jpg','video 3','video/mp4','2025-03-29',NULL,NULL,NULL),(6,'video/mp4','video 4','00:00:29.86','manusfc.mp4',_binary '\0','1db4dc7a8445','E:\\Volumes\\manusfc.mp4',10320311,'http://localhost:8080/api/media/thumbnails/thumbnail-1743236192129.jpg','video 4','video/mp4','2025-03-29',NULL,NULL,NULL),(7,'video/mp4','video 5','00:00:28.35','rahmaniaa.mp4',_binary '\0','cecf63a1d14c','E:\\Volumes\\rahmaniaa.mp4',7908431,'http://localhost:8080/api/media/thumbnails/thumbnail-1743236213034.jpg','video 5','video/mp4','2025-03-29',NULL,NULL,NULL),(8,'video/mp4','video 7','00:00:36.24','marudhusanka.mp4',_binary '\0','0b5f0ef82385','E:\\Volumes\\marudhusanka.mp4',4725000,'http://localhost:8080/api/media/thumbnails/thumbnail-1743236998539.jpg','video 7','video/mp4','2025-03-29',NULL,NULL,NULL),(9,'video/mp4','videoplaone','00:00:27.86','sjefx.mp4',_binary '\0','f1e953d4f16f','E:\\Volumes\\sjefx.mp4',5272379,'http://localhost:8080/api/media/thumbnails/thumbnail-1743237229545.jpg','videoplaone','video/mp4','2025-03-29',NULL,NULL,1),(10,'audio/mp3','mp3song',NULL,'CaptainJackS.mp3',_binary '\0','7c8413df0793','E:\\Volumes\\CaptainJackS.mp3',965421,'http://localhost:8080/api/media/thumbnails/musicthree.jpg','mp3song','audio/mp3','2025-03-29',NULL,NULL,2),(11,'video/mp4','video success','00:00:32.18','tamillsongs.mp4',_binary '\0','9b7e07a02186','E:\\Volumes\\tamillsongs.mp4',6378341,'http://localhost:8080/api/media/thumbnails/thumbnail-1743237919280.jpg','video success','video/mp4','2025-03-29',NULL,NULL,NULL),(13,'audio/mp3','audio3',NULL,'Marapathilla.mp3',_binary '\0','c41838ceceeb','E:\\Volumes\\Marapathilla.mp3',212669,'http://localhost:8080/api/media/thumbnails/saipallavi.jpg','audio3','audio/mp3','2025-03-29',NULL,NULL,1),(14,'audio/mp3','\"Happy New Year\" is a 2014 Hindi-language action-comedy film directed by Farah Khan, starring Shah Rukh Khan, Deepika Padukone, and Abhishek Bachchan, following a group of \"losers\" who aim to win a dance competition and steal diamonds as part of a larger plan for revenge.',NULL,'ManwaLaageVi.mp3',_binary '\0','5e68679792da','E:\\Volumes\\ManwaLaageVi.mp3',1000784,'http://localhost:8080/api/media/thumbnails/maxresdefaul.jpg','Happy new Year','audio/mp3','2025-03-29',NULL,NULL,1);
/*!40000 ALTER TABLE `mediafile` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `playlist`
--

DROP TABLE IF EXISTS `playlist`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `playlist` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `playlist_id` varchar(12) NOT NULL,
  `thumbnail_url` varchar(255) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UK_2cbvjl7skkh8n70jnh3k1ojb6` (`playlist_id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `playlist`
--

LOCK TABLES `playlist` WRITE;
/*!40000 ALTER TABLE `playlist` DISABLE KEYS */;
INSERT INTO `playlist` VALUES (1,'46e02d7d891e','http://localhost:8080/api/media/thumbnails/music.jpg','paylist one'),(2,'ff74558defe3','http://localhost:8080/api/media/thumbnails/musicone.jpg','playlist two'),(3,'b84bbe80cb40','http://localhost:8080/api/media/thumbnails/musictwo.jpg','playlist three'),(4,'5e79b3662437','http://localhost:8080/api/media/thumbnails/saipallavi_is_my_mindset-20052021-0001.jpg','playlist4'),(5,'19cee0b450e8','http://localhost:8080/api/media/thumbnails/sai_pallavi_fc____-29062021-0001.jpg','playlist'),(6,'5017682b42d0','http://localhost:8080/api/media/thumbnails/lord-shiva-and-parvati-cute-cartoon-image.jpg','playistsix');
/*!40000 ALTER TABLE `playlist` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'media'
--

--
-- Dumping routines for database 'media'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-06-10  9:20:54
