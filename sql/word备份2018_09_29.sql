-- --------------------------------------------------------
-- 主机:                           127.0.0.1
-- 服务器版本:                        10.1.29-MariaDB - mariadb.org binary distribution
-- 服务器操作系统:                      Win32
-- HeidiSQL 版本:                  9.5.0.5196
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;


-- 导出 word 的数据库结构
CREATE DATABASE IF NOT EXISTS `word` /*!40100 DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci */;
USE `word`;

-- 导出  表 word.cache 结构
CREATE TABLE IF NOT EXISTS `cache` (
  `id` int(11) DEFAULT NULL COMMENT '唯一值',
  `sourceId` int(11) DEFAULT NULL COMMENT '资源id',
  `searchType` int(1) DEFAULT '0' COMMENT '抓取方式，0：单页抓取，1：整站抓取',
  `words` text COLLATE utf8_unicode_ci COMMENT '抓取到的所有单词，存为txt用空格分开',
  `createTime` timestamp NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci COMMENT='抓取后的数据缓存';

-- 正在导出表  word.cache 的数据：~18 rows (大约)
DELETE FROM `cache`;
/*!40000 ALTER TABLE `cache` DISABLE KEYS */;
INSERT INTO `cache` (`id`, `sourceId`, `searchType`, `words`, `createTime`) VALUES
	(NULL, NULL, 0, 'hao About nbsp nbsp Baidu copy nbsp Baidu nbsp nbsp nbsp ICP nbsp nbsp nbsp', '2018-09-27 18:16:36'),
	(NULL, NULL, 0, 'hao About nbsp nbsp Baidu copy nbsp Baidu nbsp nbsp nbsp ICP nbsp nbsp nbsp', '2018-09-28 11:25:30'),
	(NULL, NULL, 0, 'hao About nbsp nbsp Baidu copy nbsp Baidu nbsp nbsp nbsp ICP nbsp nbsp nbsp', '2018-09-28 11:34:08'),
	(NULL, NULL, 0, 'hao About nbsp nbsp Baidu copy nbsp Baidu nbsp nbsp nbsp ICP nbsp nbsp nbsp', '2018-09-28 11:34:09'),
	(NULL, NULL, 0, 'hao About nbsp nbsp Baidu copy nbsp Baidu nbsp nbsp nbsp ICP nbsp nbsp nbsp', '2018-09-28 11:34:10'),
	(NULL, NULL, 0, 'hao About nbsp nbsp Baidu copy nbsp Baidu nbsp nbsp nbsp ICP nbsp nbsp nbsp', '2018-09-28 11:35:24'),
	(NULL, NULL, 0, 'hao About nbsp nbsp Baidu copy nbsp Baidu nbsp nbsp nbsp ICP nbsp nbsp nbsp', '2018-09-28 11:35:25'),
	(NULL, NULL, 0, 'hao About nbsp nbsp Baidu copy nbsp Baidu nbsp nbsp nbsp ICP nbsp nbsp nbsp', '2018-09-28 11:35:27'),
	(NULL, NULL, 0, 'hao About nbsp nbsp Baidu copy nbsp Baidu nbsp nbsp nbsp ICP nbsp nbsp nbsp', '2018-09-28 11:35:28'),
	(NULL, NULL, 0, 'hao About nbsp nbsp Baidu copy nbsp Baidu nbsp nbsp nbsp ICP nbsp nbsp nbsp', '2018-09-28 11:38:00'),
	(NULL, NULL, 0, 'hao About nbsp nbsp Baidu copy nbsp Baidu nbsp nbsp nbsp ICP nbsp nbsp nbsp', '2018-09-28 11:41:23'),
	(NULL, NULL, 0, 'hao About nbsp nbsp Baidu copy nbsp Baidu nbsp nbsp nbsp ICP nbsp nbsp nbsp', '2018-09-28 11:51:10'),
	(NULL, NULL, 0, 'hao About   Baidu copy  Baidu    ICP   ', '2018-09-28 12:04:21'),
	(NULL, NULL, 0, 'hao About   Baidu copy  Baidu    ICP   ', '2018-09-28 12:04:43'),
	(NULL, NULL, 0, 'hao About   Baidu copy  Baidu    ICP   ', '2018-09-28 16:48:01'),
	(NULL, NULL, 0, 'hao About   Baidu copy  Baidu    ICP   ', '2018-09-28 16:49:04'),
	(NULL, NULL, 0, 'hao About Baidu copy Baidu ICP', '2018-09-28 16:49:28'),
	(NULL, NULL, 0, 'hao about baidu copy icp', '2018-09-28 17:14:22'),
	(NULL, NULL, 0, 'hao about baidu copy icp', '2018-09-28 17:16:13'),
	(NULL, NULL, 0, 'hao About Baidu copy Baidu ICP', '2018-09-29 14:39:54'),
	(NULL, NULL, 0, 'hao About Baidu copy Baidu ICP', '2018-09-29 14:43:58'),
	(NULL, NULL, 0, 'hao About Baidu copy Baidu ICP', '2018-09-29 14:44:26'),
	(NULL, NULL, 0, 'hao About Baidu copy Baidu ICP', '2018-09-29 14:44:41'),
	(NULL, NULL, 0, 'hao About Baidu copy Baidu ICP', '2018-09-29 14:52:46'),
	(NULL, NULL, 0, 'hao About Baidu copy Baidu ICP', '2018-09-29 14:53:28'),
	(NULL, NULL, 0, 'hao About Baidu copy Baidu ICP', '2018-09-29 14:56:29'),
	(NULL, NULL, 0, 'hao About Baidu copy Baidu ICP', '2018-09-29 15:00:36'),
	(NULL, NULL, 0, 'hao About Baidu copy Baidu ICP', '2018-09-29 15:01:04'),
	(NULL, NULL, 0, 'hao About Baidu copy Baidu ICP', '2018-09-29 15:03:30'),
	(NULL, NULL, 0, 'hao About Baidu copy Baidu ICP', '2018-09-29 15:11:14');
/*!40000 ALTER TABLE `cache` ENABLE KEYS */;

-- 导出  表 word.dictionary 结构
CREATE TABLE IF NOT EXISTS `dictionary` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '唯一编号',
  `word` varchar(50) COLLATE utf8_unicode_ci NOT NULL DEFAULT '0' COMMENT '单词',
  `markNum` int(11) NOT NULL DEFAULT '0' COMMENT '标记的次数',
  `rememberNum` int(11) NOT NULL DEFAULT '0' COMMENT '记住的次数',
  `chinese` varchar(100) COLLATE utf8_unicode_ci NOT NULL DEFAULT '0' COMMENT '汉语解释',
  `state` tinyint(2) NOT NULL DEFAULT '0' COMMENT '状态：0：在词库中，1：学习中，2：学习成功',
  `createTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '添加时间',
  `updateTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci COMMENT='字典';

-- 正在导出表  word.dictionary 的数据：~0 rows (大约)
DELETE FROM `dictionary`;
/*!40000 ALTER TABLE `dictionary` DISABLE KEYS */;
INSERT INTO `dictionary` (`id`, `word`, `markNum`, `rememberNum`, `chinese`, `state`, `createTime`, `updateTime`) VALUES
	(1, 'hao', 2, 0, '0', 0, '2018-09-29 15:08:50', '2018-09-29 15:09:10'),
	(2, 'about', 2, 0, '0', 0, '2018-09-29 15:08:50', '2018-09-29 15:09:10'),
	(3, 'baidu', 4, 0, '0', 0, '2018-09-29 15:09:10', '2018-09-29 15:11:24');
/*!40000 ALTER TABLE `dictionary` ENABLE KEYS */;

-- 导出  表 word.source 结构
CREATE TABLE IF NOT EXISTS `source` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '唯一值',
  `name` varchar(200) COLLATE utf8_unicode_ci NOT NULL COMMENT '链接名字',
  `links` varchar(200) COLLATE utf8_unicode_ci NOT NULL COMMENT '链接地址',
  `createTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '添加时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci COMMENT='资源链接';

-- 正在导出表  word.source 的数据：~0 rows (大约)
DELETE FROM `source`;
/*!40000 ALTER TABLE `source` DISABLE KEYS */;
INSERT INTO `source` (`id`, `name`, `links`, `createTime`) VALUES
	(1, '百度', 'http://www.baidu.com', '2018-09-27 18:23:09'),
	(2, '谷歌', 'http://www.google.com', '0000-00-00 00:00:00');
/*!40000 ALTER TABLE `source` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
