-- phpMyAdmin SQL Dump
-- version 4.8.1
-- https://www.phpmyadmin.net/
--
-- 主機: 127.0.0.1
-- 產生時間： 2018-07-12 13:05:15
-- 伺服器版本: 10.1.33-MariaDB
-- PHP 版本： 7.2.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- 資料庫： `ang_mess`
--

-- --------------------------------------------------------

--
-- 資料表結構 `member`
--

CREATE TABLE `member` (
  `m_seq` int(10) NOT NULL,
  `m_account` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `m_pw` text COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- 資料表的匯出資料 `member`
--

INSERT INTO `member` (`m_seq`, `m_account`, `m_pw`) VALUES
(1, 'test1', '1111'),
(2, 'test2', '2222'),
(3, 'test3', '3333'),
(4, 'test4', '4444'),
(5, 'test5', '5555'),
(6, 'test6', '6666'),
(7, 'test7', '7777');

-- --------------------------------------------------------

--
-- 資料表結構 `word`
--

CREATE TABLE `word` (
  `w_seq` int(10) NOT NULL,
  `w_title` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `w_word` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `w_id` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `w_date` datetime NOT NULL,
  `w_display` int(2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- 資料表的匯出資料 `word`
--

INSERT INTO `word` (`w_seq`, `w_title`, `w_word`, `w_id`, `w_date`, `w_display`) VALUES
(1, '測試文章主題一', '11111111111111111111111111111111111111', 'test1', '2018-07-03 15:21:17', 1),
(2, '測試文章主題二', '222222222222222222222222222222222222', 'test2', '2018-07-04 10:21:31', 1),
(3, '測試文章主題三', '333333333333333333333333', 'test3', '2018-07-05 11:40:54', 1),
(4, '測試文章主題四', '44444444', 'test4', '2018-07-06 18:29:12', 0),
(5, '測試文章主題五', '55555555555555555555', 'test5', '2018-07-07 14:56:41', 1),
(6, '測試文章主題六', '6666666666666666666666666', 'test6', '2018-07-08 14:00:37', 1),
(7, '測試文章主題七', '777777777777777777777777777777777777777777777', 'test7', '2018-07-09 19:11:42', 0),
(8, '測試8', '88888888888888888888', 'tt', '2018-07-10 12:01:21', 1),
(9, '測試9', '99999999999999', 'tt', '2018-07-10 12:02:09', 1),
(10, '測試10', '1010101010101', 'tt', '2018-07-10 12:03:01', 1),
(11, '測試十一', '1111111111111111111111', 'tt', '2018-07-10 12:03:59', 1),
(12, '測試12', '121212112112121', 'tt', '2018-07-10 12:04:14', 1);

-- --------------------------------------------------------

--
-- 資料表結構 `word2`
--

CREATE TABLE `word2` (
  `w2_seq` int(10) NOT NULL,
  `w1_title` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `w1_id` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `w2_word` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `w2_id` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `w2_date` datetime NOT NULL,
  `w2_display` int(2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- 資料表的匯出資料 `word2`
--

INSERT INTO `word2` (`w2_seq`, `w1_title`, `w1_id`, `w2_word`, `w2_id`, `w2_date`, `w2_display`) VALUES
(1, '測試文章主題一', 'test1', '11111111111111111111111111111111111111', '路人甲', '2018-07-03 15:21:17', 1),
(2, '測試文章主題二', 'test2', '222222222222222222222222222222222222', '路人乙', '2018-07-04 10:21:31', 1),
(3, '測試文章主題三', 'test3', '333333333333333333333333', '路人丙', '2018-07-05 11:40:54', 1),
(4, '測試文章主題四', 'test4', '44444444', '路人丁', '2018-07-06 18:29:12', 0),
(5, '測試文章主題五', 'test5', '55555555555555555555', '路人戊', '2018-07-07 14:56:41', 1),
(6, '測試文章主題六', 'test6', '6666666666666666666666666', '路人己', '2018-07-08 14:00:37', 1),
(7, '測試文章主題七', 'test7', '777777777777777777777777777777777777777777777', '路人庚', '2018-07-09 19:11:42', 0),
(8, '測試8', 'tt', '88888888888888888888', '路人辛', '2018-07-10 12:01:21', 1),
(9, '測試9', 'tt', '99999999999999', '路人13', '2018-07-10 12:02:09', 1),
(10, '測試10', 'tt', '1010101010101', '路人14', '2018-07-10 12:03:01', 1),
(11, '測試十一', 'tt', '1111111111111111111111', '路人15', '2018-07-10 12:03:59', 1),
(12, '測試12', 'tt', '121212112112121', '路人16', '2018-07-10 12:04:14', 1),
(13, '測試文章主題一', 'test1', '963258741', '路人', '2018-07-03 15:21:17', 1);

--
-- 已匯出資料表的索引
--

--
-- 資料表索引 `member`
--
ALTER TABLE `member`
  ADD PRIMARY KEY (`m_seq`);

--
-- 資料表索引 `word`
--
ALTER TABLE `word`
  ADD PRIMARY KEY (`w_seq`);

--
-- 資料表索引 `word2`
--
ALTER TABLE `word2`
  ADD PRIMARY KEY (`w2_seq`);

--
-- 在匯出的資料表使用 AUTO_INCREMENT
--

--
-- 使用資料表 AUTO_INCREMENT `member`
--
ALTER TABLE `member`
  MODIFY `m_seq` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- 使用資料表 AUTO_INCREMENT `word`
--
ALTER TABLE `word`
  MODIFY `w_seq` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- 使用資料表 AUTO_INCREMENT `word2`
--
ALTER TABLE `word2`
  MODIFY `w2_seq` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
