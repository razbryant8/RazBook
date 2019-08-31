-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3309
-- Generation Time: Jul 27, 2019 at 04:26 PM
-- Server version: 5.7.26
-- PHP Version: 7.2.18

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `razbook`
--

-- --------------------------------------------------------

--
-- Table structure for table `comments`
--

DROP TABLE IF EXISTS `comments`;
CREATE TABLE IF NOT EXISTS `comments` (
  `post_id` int(11) NOT NULL,
  `comment_username` varchar(30) NOT NULL,
  `comment_text` varchar(200) NOT NULL,
  `comment_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `comments`
--

INSERT INTO `comments` (`post_id`, `comment_username`, `comment_text`, `comment_date`) VALUES
(68, 'kobe', 'I see the post. take Like.', '2019-07-27 16:22:49'),
(70, 'messi', 'Hello', '2019-07-27 16:23:36');

-- --------------------------------------------------------

--
-- Table structure for table `friends`
--

DROP TABLE IF EXISTS `friends`;
CREATE TABLE IF NOT EXISTS `friends` (
  `user1` varchar(30) NOT NULL,
  `user2` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `friends`
--

INSERT INTO `friends` (`user1`, `user2`) VALUES
('kobe', 'raz'),
('raz', 'kobe'),
('messi', 'raz'),
('raz', 'messi'),
('messi', 'will'),
('will', 'messi');

-- --------------------------------------------------------

--
-- Table structure for table `photos`
--

DROP TABLE IF EXISTS `photos`;
CREATE TABLE IF NOT EXISTS `photos` (
  `post_id` int(11) NOT NULL,
  `photo_name` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `posts`
--

DROP TABLE IF EXISTS `posts`;
CREATE TABLE IF NOT EXISTS `posts` (
  `post_id` int(11) NOT NULL AUTO_INCREMENT,
  `post_username` varchar(50) NOT NULL,
  `post_permission` tinyint(1) NOT NULL,
  `post_text` varchar(200) NOT NULL,
  `post_number_of_likes` int(200) NOT NULL,
  `post_create_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`post_id`)
) ENGINE=InnoDB AUTO_INCREMENT=74 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `posts`
--

INSERT INTO `posts` (`post_id`, `post_username`, `post_permission`, `post_text`, `post_number_of_likes`, `post_create_date`) VALUES
(67, 'kratos', 1, 'I am GOD!', 0, '2019-07-27 16:18:30'),
(68, 'raz', 1, 'Hello. This is my first post. and everyone can see it.', 1, '2019-07-27 16:18:59'),
(69, 'raz', 0, 'This is my second post. only ME can see it.', 0, '2019-07-27 16:19:17'),
(70, 'will', 1, 'Hello Everyone.', 0, '2019-07-27 16:19:48'),
(71, 'messi', 1, 'Ronaldo not HERE. I am the best football player in RaZBook!! HAHA', 0, '2019-07-27 16:21:32'),
(72, 'kobe', 1, 'G-O-A-T', 0, '2019-07-27 16:21:58'),
(73, 'messi', 1, 'I just become friend with Will Smith. OMG!', 0, '2019-07-27 16:24:06');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `username` varchar(30) NOT NULL,
  `password` varchar(50) NOT NULL,
  `birthday` varchar(10) NOT NULL,
  `fullname` varchar(30) NOT NULL,
  `profile_photo` varchar(50) NOT NULL,
  PRIMARY KEY (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`username`, `password`, `birthday`, `fullname`, `profile_photo`) VALUES
('kobe', '68dda37cbbecc4b8b256dcfc376254be', '23/08/1978', 'Kobe Bryant', 'kobe.jpg'),
('kratos', '323d854ff567ff1e0e2d279c8d5520fa', '01/01/1800', 'Kratos', 'kratos.png'),
('messi', 'bf070ee1ca94d5672590b013e3338861', '24/06/1987', 'Lionel Messi', 'messi.jpg'),
('raz', '61502886a310ec68475e984e5cf0e118', '22/11/1990', 'Raz Trugman', 'raz.jpg'),
('will', '5a2be9a580c6b4a9c53f98825b1e68ca', '25/09/1968', 'Will Smith', 'will.jpg');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
