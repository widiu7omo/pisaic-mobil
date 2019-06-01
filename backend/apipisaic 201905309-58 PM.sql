# ************************************************************
# Sequel Pro SQL dump
# Version 4541
#
# http://www.sequelpro.com/
# https://github.com/sequelpro/sequelpro
#
# Host: 127.0.0.1 (MySQL 5.5.5-10.3.9-MariaDB)
# Database: apipisaic
# Generation Time: 2019-05-30 13:58:57 +0000
# ************************************************************


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


# Dump of table android_metadata
# ------------------------------------------------------------

DROP TABLE IF EXISTS `android_metadata`;

CREATE TABLE `android_metadata` (
  `locale` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;



# Dump of table dataunits
# ------------------------------------------------------------

DROP TABLE IF EXISTS `dataunits`;

CREATE TABLE `dataunits` (
  `id` varchar(255) NOT NULL DEFAULT '',
  `unit_id` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;



# Dump of table group_kind_unit_zones
# ------------------------------------------------------------

DROP TABLE IF EXISTS `group_kind_unit_zones`;

CREATE TABLE `group_kind_unit_zones` (
  `kind_unit_zone_id` varchar(255) DEFAULT NULL,
  `group_id` varchar(255) DEFAULT NULL,
  `input_items` longtext DEFAULT NULL,
  `id` varchar(255) NOT NULL DEFAULT '',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

LOCK TABLES `group_kind_unit_zones` WRITE;
/*!40000 ALTER TABLE `group_kind_unit_zones` DISABLE KEYS */;

INSERT INTO `group_kind_unit_zones` (`kind_unit_zone_id`, `group_id`, `input_items`, `id`)
VALUES
	('h98r1lv6g$zns1ggvq0','1','[{\"name\":\"Teeth Bucket\",\"subname\":\"(Crack,Worn, Loose, Missing)\",\"condition\":\"Good\",\"note\":\"None\",\"priority\":\"None\",\"foto\":{\"name\":\"\",\"catatan\":\"\"},\"remark\":\"\"},{\"name\":\"Lock Pin Teeth Bucket\",\"subname\":\"(Broken, Worn, Loose, Missing)\",\"condition\":\"Bad\",\"note\":\"None\",\"priority\":\"None\",\"foto\":{\"name\":\"\",\"catatan\":\"\"},\"remark\":\"\"},{\"name\":\"Shroud\",\"subname\":\"(Worn,Crack,Loose,Missing)\",\"condition\":\"Good\",\"note\":\"None\",\"priority\":\"None\",\"foto\":{\"name\":\"\",\"catatan\":\"\"},\"remark\":\"\"},{\"name\":\"Bucket Hinge Front Face\",\"subname\":\"(Crack)\",\"condition\":\"Good\",\"note\":\"None\",\"priority\":\"None\",\"foto\":{\"name\":\"\",\"catatan\":\"\"},\"remark\":\"\"},{\"name\":\"Clamp Cylinder LH\",\"subname\":\"(Leaking,Scratch,Bending etc)\",\"condition\":\"\",\"note\":\"None\",\"priority\":\"None\",\"foto\":{\"name\":\"\",\"catatan\":\"\"},\"remark\":\"\"},{\"name\":\"Clamp Cylinder RH\",\"subname\":\"(Leaking,Scratch,Bending etc)\",\"condition\":\"\",\"note\":\"None\",\"priority\":\"None\",\"foto\":{\"name\":\"\",\"catatan\":\"\"},\"remark\":\"\"},{\"name\":\"Pin & Bushing LHRH Cyl Clamp\",\"subname\":\"(Lock Pink,Lubricating)\",\"condition\":\"\",\"note\":\"None\",\"priority\":\"None\",\"foto\":{\"name\":\"\",\"catatan\":\"\"},\"remark\":\"\"},{\"name\":\"Bucket Cylinder LH\",\"subname\":\"(Leaking,Scratch,Bending etc)\",\"condition\":\"\",\"note\":\"None\",\"priority\":\"None\",\"foto\":{\"name\":\"\",\"catatan\":\"\"},\"remark\":\"\"},{\"name\":\"Bucket Cylinder RH\",\"subname\":\"(Leaking,Scratch,Bending etc)\",\"condition\":\"\",\"note\":\"None\",\"priority\":\"None\",\"foto\":{\"name\":\"\",\"catatan\":\"\"},\"remark\":\"\"},{\"name\":\"Pin & Bushing RHLH Front Face\",\"subname\":\"(Lock Pin, Lubricating)\",\"condition\":\"\",\"note\":\"None\",\"priority\":\"None\",\"foto\":{\"name\":\"\",\"catatan\":\"\"},\"remark\":\"Vggg\"},{\"name\":\"Pin & Bushing RHLH Cyl Bucket\",\"subname\":\"(Lock Pin,Lubricating)\",\"condition\":\"\",\"note\":\"None\",\"priority\":\"None\",\"foto\":{\"name\":\"\",\"catatan\":\"\"},\"remark\":\"\"},{\"name\":\"Injector & Grease Line Bucket\",\"subname\":\"(Leak,Loose)\",\"condition\":\"\",\"note\":\"None\",\"priority\":\"None\",\"foto\":{\"name\":\"\",\"catatan\":\"\"},\"remark\":\"Hhhii\"}]','n9n3u9u7a$girop6c5g'),
	('p84w3cquc$fzsq9la7p','1','[{\"name\":\"Teeth Bucket\",\"subname\":\"(Crack,Worn, Loose, Missing)\",\"remark\":\"\",\"foto\":{\"name\":\"file:///data/user/0/com.danarwidi.pisaic_united_tracktor/cache/ExperienceData/%2540widiu7omo%252Fpisaic/ImageManipulator/2bc0e77d-a3d3-4d22-9b48-fcf4839ed0b9.jpg\",\"catatan\":\"\",\"kind_unit_zone_id\":\"p84w3cquc$fzsq9la7p\",\"index_foto\":0},\"priority\":\"None\",\"note\":\"None\",\"condition\":\"Good\"},{\"name\":\"Lock Pin Teeth Bucket\",\"subname\":\"(Broken, Worn, Loose, Missing)\",\"condition\":\"Bad\",\"remark\":\"\",\"note\":\"Missing\",\"priority\":\"Now\",\"foto\":{\"name\":\"file:///data/user/0/com.danarwidi.pisaic_united_tracktor/cache/ExperienceData/%2540widiu7omo%252Fpisaic/ImageManipulator/01ba5c4a-64e6-4284-9b13-b4918332fe5e.jpg\",\"catatan\":\"\",\"kind_unit_zone_id\":\"p84w3cquc$fzsq9la7p\",\"index_foto\":1}},{\"name\":\"Shroud\",\"subname\":\"(Worn,Crack,Loose,Missing)\",\"condition\":\"Good\",\"note\":\"None\",\"priority\":\"None\",\"foto\":{\"name\":\"\",\"catatan\":\"\"},\"remark\":\"\"},{\"name\":\"Bucket Hinge Front Face\",\"subname\":\"(Crack)\",\"condition\":\"Good\",\"note\":\"None\",\"priority\":\"None\",\"foto\":{\"name\":\"\",\"catatan\":\"\"},\"remark\":\"\"},{\"name\":\"Clamp Cylinder LH\",\"subname\":\"(Leaking,Scratch,Bending etc)\",\"condition\":\"\",\"note\":\"None\",\"priority\":\"None\",\"foto\":{\"name\":\"\",\"catatan\":\"\"},\"remark\":\"\"},{\"name\":\"Clamp Cylinder RH\",\"subname\":\"(Leaking,Scratch,Bending etc)\",\"condition\":\"\",\"note\":\"None\",\"priority\":\"None\",\"foto\":{\"name\":\"\",\"catatan\":\"\"},\"remark\":\"\"},{\"name\":\"Pin & Bushing LHRH Cyl Clamp\",\"subname\":\"(Lock Pink,Lubricating)\",\"condition\":\"\",\"note\":\"None\",\"priority\":\"None\",\"foto\":{\"name\":\"\",\"catatan\":\"\"},\"remark\":\"\"},{\"name\":\"Bucket Cylinder LH\",\"subname\":\"(Leaking,Scratch,Bending etc)\",\"condition\":\"\",\"note\":\"None\",\"priority\":\"None\",\"foto\":{\"name\":\"\",\"catatan\":\"\"},\"remark\":\"\"},{\"name\":\"Bucket Cylinder RH\",\"subname\":\"(Leaking,Scratch,Bending etc)\",\"condition\":\"\",\"note\":\"None\",\"priority\":\"None\",\"foto\":{\"name\":\"\",\"catatan\":\"\"},\"remark\":\"\"},{\"name\":\"Pin & Bushing RHLH Front Face\",\"subname\":\"(Lock Pin, Lubricating)\",\"condition\":\"\",\"note\":\"None\",\"priority\":\"None\",\"foto\":{\"name\":\"\",\"catatan\":\"\"},\"remark\":\"\"},{\"name\":\"Pin & Bushing RHLH Cyl Bucket\",\"subname\":\"(Lock Pin,Lubricating)\",\"condition\":\"\",\"note\":\"None\",\"priority\":\"None\",\"foto\":{\"name\":\"\",\"catatan\":\"\"},\"remark\":\"\"},{\"name\":\"Injector & Grease Line Bucket\",\"subname\":\"(Leak,Loose)\",\"condition\":\"\",\"note\":\"None\",\"priority\":\"None\",\"foto\":{\"name\":\"\",\"catatan\":\"\"},\"remark\":\"\"}]','r4vsvxwso$s42xvjw4z');

/*!40000 ALTER TABLE `group_kind_unit_zones` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table groups
# ------------------------------------------------------------

DROP TABLE IF EXISTS `groups`;

CREATE TABLE `groups` (
  `id` varchar(255) NOT NULL DEFAULT '',
  `name` text DEFAULT NULL,
  `zone_id` varchar(255) DEFAULT NULL,
  `screen` text DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

LOCK TABLES `groups` WRITE;
/*!40000 ALTER TABLE `groups` DISABLE KEYS */;

INSERT INTO `groups` (`id`, `name`, `zone_id`, `screen`)
VALUES
	('1','A. Bucket Group','ZONE3','z1a'),
	('2','B. Stick Group','ZONE3','z1b'),
	('22','B. PDG And Pump','ZONE4','z2b'),
	('23','C. Swing','ZONE4','z2c'),
	('24','D. Oil Center','ZONE4','z2d'),
	('25','E. Central Lubrication System (CLS)','ZONE4','z2e'),
	('26','F. Swing Lubrication System (SLS)','ZONE4','z2f'),
	('27','G. Hydraulic','ZONE4','z2g'),
	('28','H. Electric','ZONE4','z2h'),
	('29','I. Additional Of Fluid (Oil, Coolant, Grease)','ZONE4','z2i'),
	('3','C. Boom Group','ZONE3','z1c'),
	('37','A. Hydraulic','ZONE5','z3a'),
	('38','B. ARC Hose','ZONE5','z3b'),
	('39','C. Pipe In Boom, Stick & Clamp','ZONE5','z3c'),
	('4','D. Track Group LH','ZONE3','z1d'),
	('40','D. ARC Hose Upper','ZONE5','z3d'),
	('41','E. Related','ZONE5','z3e'),
	('42','F. Air Conditioning','ZONE5','z3f'),
	('43','G. Cabin','ZONE5','z3g'),
	('5','E. Track Group RH','ZONE3','z1e'),
	('6','F. Center Frame','ZONE3','z1f'),
	('7','G. Ladder','ZONE3','z1g'),
	('8','A. Main Drive Motor','ZONE4','z2a');

/*!40000 ALTER TABLE `groups` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table images
# ------------------------------------------------------------

DROP TABLE IF EXISTS `images`;

CREATE TABLE `images` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `kind_unit_zone_id` varchar(255) DEFAULT NULL,
  `name` text DEFAULT NULL,
  `catatan` text DEFAULT NULL,
  `index_foto` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;



# Dump of table kind_unit_zones
# ------------------------------------------------------------

DROP TABLE IF EXISTS `kind_unit_zones`;

CREATE TABLE `kind_unit_zones` (
  `kind_unit_id` varchar(255) DEFAULT NULL,
  `zone_id` varchar(255) DEFAULT NULL,
  `id` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

LOCK TABLES `kind_unit_zones` WRITE;
/*!40000 ALTER TABLE `kind_unit_zones` DISABLE KEYS */;

INSERT INTO `kind_unit_zones` (`kind_unit_id`, `zone_id`, `id`)
VALUES
	('j0pgs1pvx$r7720873b','ZONE3','3t6uaoa4a$esd123zmd'),
	('k1wdnxcs3$r3lhbczer','ZONE2','gx95agwvg$js48ihtsf'),
	('k1wdnxcs3$r3lhbczer','ZONE3','h98r1lv6g$zns1ggvq0'),
	('k1wdnxcs3$r3lhbczer','ZONE1','jy28zgm2h$x6kikrty4'),
	('cwb9luwgy$uaes6rvd5','ZONE3','p84w3cquc$fzsq9la7p'),
	('k1wdnxcs3$r3lhbczer','ZONE4','wnnyw9ukc$wq0oqempv');

/*!40000 ALTER TABLE `kind_unit_zones` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table kind_units
# ------------------------------------------------------------

DROP TABLE IF EXISTS `kind_units`;

CREATE TABLE `kind_units` (
  `kind_id` varchar(255) DEFAULT NULL,
  `unit_user_id` varchar(255) DEFAULT NULL,
  `id` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

LOCK TABLES `kind_units` WRITE;
/*!40000 ALTER TABLE `kind_units` DISABLE KEYS */;

INSERT INTO `kind_units` (`kind_id`, `unit_user_id`, `id`)
VALUES
	('KIND6','k1wdnxcs3$r3lhbczer','3v6qiazmw$bri7b32kf'),
	('KIND1','oryf9zyla$sqmkjprvl','cwb9luwgy$uaes6rvd5'),
	('KIND3','k1wdnxcs3$r3lhbczer','g6brdtyv3$g3ibj0t9w'),
	('KIND1','gmhuzoxp4$frpo5lwed','j0pgs1pvx$r7720873b'),
	('KIND1','k1wdnxcs3$r3lhbczer','k1wdnxcs3$r3lhbczer'),
	('KIND5','k1wdnxcs3$r3lhbczer','khxn49176$gkmitoaw7'),
	('KIND2','k1wdnxcs3$r3lhbczer','lnctunsl8$2vdwi0aro'),
	('KIND2','gmhuzoxp4$frpo5lwed','oqjvr7ukj$22siboi4l'),
	('KIND4','k1wdnxcs3$r3lhbczer','u7q00zq1g$8jhruik21');

/*!40000 ALTER TABLE `kind_units` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table kinds
# ------------------------------------------------------------

DROP TABLE IF EXISTS `kinds`;

CREATE TABLE `kinds` (
  `id` varchar(255) NOT NULL DEFAULT '',
  `name` text DEFAULT NULL,
  `screen` text DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

LOCK TABLES `kinds` WRITE;
/*!40000 ALTER TABLE `kinds` DISABLE KEYS */;

INSERT INTO `kinds` (`id`, `name`, `screen`)
VALUES
	('KIND1','Periodic Inspection Sheet','PeriodicInspection'),
	('KIND2','Inspection Camera','InspectCamera'),
	('KIND3','Problem Log','ProblemLogScreen'),
	('KIND4','Backlog Monitoring Sheet','BacklogMonitor'),
	('KIND5','Backlog Entry Sheet','BacklogEntry'),
	('KIND6','Cylinder Daily Check Sheet','CylinderDaily');

/*!40000 ALTER TABLE `kinds` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table unit_users
# ------------------------------------------------------------

DROP TABLE IF EXISTS `unit_users`;

CREATE TABLE `unit_users` (
  `id` varchar(255) NOT NULL,
  `unit_id` varchar(255) DEFAULT NULL,
  `user_id` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

LOCK TABLES `unit_users` WRITE;
/*!40000 ALTER TABLE `unit_users` DISABLE KEYS */;

INSERT INTO `unit_users` (`id`, `unit_id`, `user_id`)
VALUES
	('0srwld941$4vayat326','7u9hwievk$c2vh2z31f','2vgj5q2q0$9u8zteqoy'),
	('26xwbyv8e$i4gxsm2je','7u9hwievk$c2vh2z31f','2vgj5q2q0$9u8zteqoy'),
	('9hoj91dt7$0s1lfscij','7u9hwievk$c2vh2z31f','2vgj5q2q0$9u8zteqoy'),
	('a7l2rp9e9$65g3c1o6l','7u9hwievk$c2vh2z31f','2vgj5q2q0$9u8zteqoy'),
	('atssmb2wr$gn5j3aaxp','7u9hwievk$c2vh2z31f','2vgj5q2q0$9u8zteqoy'),
	('esjk4c9aj$xy4drt3yk','7u9hwievk$c2vh2z31f','2vgj5q2q0$9u8zteqoy'),
	('g2z2m2wpd$d0izsp7jd','7u9hwievk$c2vh2z31f','2vgj5q2q0$9u8zteqoy'),
	('gep6tvs15$lg7z0id94','7u9hwievk$c2vh2z31f','2vgj5q2q0$9u8zteqoy'),
	('gmhuzoxp4$frpo5lwed','7u9hwievk$c2vh2z31f','2vgj5q2q0$9u8zteqoy'),
	('k1wdnxcs3$r3lhbczer','7u9hwievk$c2vh2z31f','2vgj5q2q0$9u8zteqoy'),
	('k8gtk5wj8$2nyaegttr','7u9hwievk$c2vh2z31f','2vgj5q2q0$9u8zteqoy'),
	('n1vba56u5$ds5ah78vl','7u9hwievk$c2vh2z31f','2vgj5q2q0$9u8zteqoy'),
	('o34043cgg$saz9fhyqi','7u9hwievk$c2vh2z31f','2vgj5q2q0$9u8zteqoy'),
	('oryf9zyla$sqmkjprvl','7u9hwievk$c2vh2z31f','2vgj5q2q0$9u8zteqoy'),
	('p6on5r6aa$ffmzljcrv','7u9hwievk$c2vh2z31f','2vgj5q2q0$9u8zteqoy'),
	('pqc73pv6q$9aobhbjpq','7u9hwievk$c2vh2z31f','2vgj5q2q0$9u8zteqoy'),
	('qilsalf3n$tvx2ii3i9','7u9hwievk$c2vh2z31f','2vgj5q2q0$9u8zteqoy'),
	('z2zyk2uih$lz71n98wu','7u9hwievk$c2vh2z31f','2vgj5q2q0$9u8zteqoy');

/*!40000 ALTER TABLE `unit_users` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table units
# ------------------------------------------------------------

DROP TABLE IF EXISTS `units`;

CREATE TABLE `units` (
  `id` varchar(255) NOT NULL DEFAULT '',
  `name` text DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

LOCK TABLES `units` WRITE;
/*!40000 ALTER TABLE `units` DISABLE KEYS */;

INSERT INTO `units` (`id`, `name`)
VALUES
	('7u9hwievk$c2vh2z31f','SE 3001'),
	('96wmpsn00$7o0gtm4g5','SE 3007'),
	('hu9stuogq$bxqpw12iy','SE 3004'),
	('j4acbemfo$75csrz4er','SE 3003'),
	('tqsch6vsz$92yowsso5','SE 3002'),
	('tz3i68dxg$m8t97lv3p','SE 3005'),
	('wxkhy91ua$36flvm2i8','SE 3006');

/*!40000 ALTER TABLE `units` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table users
# ------------------------------------------------------------

DROP TABLE IF EXISTS `users`;

CREATE TABLE `users` (
  `id` varchar(255) NOT NULL DEFAULT '',
  `name` text DEFAULT NULL,
  `nrp` text DEFAULT NULL,
  `lahir` text DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;

INSERT INTO `users` (`id`, `name`, `nrp`, `lahir`)
VALUES
	('2vgj5q2q0$9u8zteqoy','MUH. YASIN','80107232','07031987'),
	('36zmperje$36w3vd3xa','MUH. AGUS ROMI','80107179','14061983'),
	('aryntc9xc$gg6lxq1ho','FERIANUS','82107080','15061985'),
	('h69bdjafb$0qe1xsh4z','DWI HINDHARYA P','82107126','29091986'),
	('j6hrl1hq6$ibstt074r','ZAINURI','80110259','08061990'),
	('jfose356f$rkveomjn9','WAHYUDI','80110206','16041988'),
	('mm2epab2x$uf7ltuhks','BAKHTIAR RIFAI','82102014','12061982'),
	('rz1pyyu03$gmylqy2fi','AHMAD FIRLI','80112116','14031990'),
	('te5zfaeda$8lf41ibzt','GUNAIDY','80112121','15011991'),
	('u1azyeljz$ji9mhnlor','RUSWANTO','80107138','17061984'),
	('zefbvq81t$csl5z4n6k','YUDHA PRAWIRA ','80110207','20111989');

/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table workorders
# ------------------------------------------------------------

DROP TABLE IF EXISTS `workorders`;

CREATE TABLE `workorders` (
  `id` varchar(255) NOT NULL DEFAULT '',
  `unit_id` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;



# Dump of table zones
# ------------------------------------------------------------

DROP TABLE IF EXISTS `zones`;

CREATE TABLE `zones` (
  `id` varchar(255) NOT NULL DEFAULT '',
  `name` text DEFAULT NULL,
  `screen` text DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

LOCK TABLES `zones` WRITE;
/*!40000 ALTER TABLE `zones` DISABLE KEYS */;

INSERT INTO `zones` (`id`, `name`, `screen`)
VALUES
	('ZONE1','Workorder & Others','Workorder'),
	('ZONE2','Dataunit','Dataunit'),
	('ZONE3','Zone 1: Front Attachment & Track Group','Zone1'),
	('ZONE4','Zone 2: Upper Front, Central Frame & Motor Area','Zone2'),
	('ZONE5','Zone 3: Upper Rear Area - Cabin & Motor Container','Zone3');

/*!40000 ALTER TABLE `zones` ENABLE KEYS */;
UNLOCK TABLES;



/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
