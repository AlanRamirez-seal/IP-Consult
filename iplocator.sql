-- MySQL dump 10.13  Distrib 8.0.34, for Win64 (x86_64)
--
-- Host: localhost    Database: iplocator
-- ------------------------------------------------------
-- Server version	8.0.35

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
-- Table structure for table `searches`
--

DROP TABLE IF EXISTS `searches`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `searches` (
  `id` int NOT NULL AUTO_INCREMENT,
  `ip` varchar(15) NOT NULL,
  `data` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `searches`
--

LOCK TABLES `searches` WRITE;
/*!40000 ALTER TABLE `searches` DISABLE KEYS */;
INSERT INTO `searches` VALUES (16,'87.190.184.176','{\"ip\":\"87.190.184.176\",\"hostname\":\"p57beb8b0.dip0.t-ipconnect.de\",\"city\":\"Darmstadt\",\"region\":\"Hesse\",\"country\":\"DE\",\"loc\":\"49.8611,8.6373\",\"org\":\"AS3320 Deutsche Telekom AG\",\"postal\":\"64295\",\"timezone\":\"Europe/Berlin\"}'),(17,'187.130.184.176','{\"ip\":\"187.130.184.176\",\"hostname\":\"187-130-184-176.uninet-ide.com.mx\",\"city\":\"Santiago de Querétaro\",\"region\":\"Querétaro\",\"country\":\"MX\",\"loc\":\"20.5881,-100.3881\",\"org\":\"AS8151 UNINET\",\"postal\":\"76120\",\"timezone\":\"America/Mexico_City\"}'),(18,'187.130.184.174','{\"ip\":\"187.130.184.174\",\"hostname\":\"inet-jal-ctg-26-s0-4-3-0-1-2-4-3-0.uninet.net.mx\",\"city\":\"Santiago de Querétaro\",\"region\":\"Querétaro\",\"country\":\"MX\",\"loc\":\"20.5881,-100.3881\",\"org\":\"AS8151 UNINET\",\"postal\":\"76120\",\"timezone\":\"America/Mexico_City\"}');
/*!40000 ALTER TABLE `searches` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-11-09 10:01:28
