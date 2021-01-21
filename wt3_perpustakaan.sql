-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 21, 2021 at 04:07 PM
-- Server version: 10.4.11-MariaDB
-- PHP Version: 7.4.5

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `perpustakaan_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `buku`
--

CREATE TABLE `buku` (
  `kd_buku` int(10) NOT NULL,
  `judul` varchar(100) NOT NULL,
  `isbn` varchar(100) NOT NULL,
  `cover` varchar(255) CHARACTER SET utf8 NOT NULL,
  `penulis` varchar(100) NOT NULL,
  `kategori_buku` varchar(50) NOT NULL DEFAULT 'Novel',
  `tahun` varchar(100) NOT NULL,
  `ket` varchar(100) NOT NULL,
  `status_buku` tinyint(1) NOT NULL DEFAULT 0,
  `id_peminjam` int(11) DEFAULT NULL,
  `isdeleted` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `buku`
--

INSERT INTO `buku` (`kd_buku`, `judul`, `isbn`, `cover`, `penulis`, `kategori_buku`, `tahun`, `ket`, `status_buku`, `id_peminjam`, `isdeleted`) VALUES
(1, 'Komi Can\'t Communicate vol 1', '978-1-9747-0712-6', 'https://upload.wikimedia.org/wikipedia/id/d/d1/Cover_Art_Komi-san_wa%2C_Komyushou_desu_Vol_1.jpg', 'Tomohito Oda', 'novel', '2016', 'On her first day attending the elite Itan Private High School, the main setting of the story, Shouko', 0, NULL, 0),
(2, 'Overlord 1: The Undead King', '978-0-316-27224-7', 'https://en.wikipedia.org/wiki/Overlord_(novel_series)#/media/File:Overlord_novel.jpg', 'Kugane Maruyama', 'novel', '2016', 'Momonga is an average salaryman who spends most of his time playing the game YGGDRASIL. Sadly, YGGDR', 1, 1, 0),
(3, 'Five Nights at Freddy\'s: The Silver Eyes', '978-1338134377', 'https://images-na.ssl-images-amazon.com/images/I/51kkeE8Jv+L._SX326_BO1,204,203,200_.jpg', 'Scott Cawthon and Kira Breed-Wrisley', 'komik', '2015 ', 'The book follows a young woman named Charlotte, who reunites with her childhood friends on the anniv', 0, NULL, 0),
(4, 'Gravity Falls: Journal 3', '978-1484746691', 'https://static.wikia.nocookie.net/gravityfalls/images/9/90/Journal_3%27s_dust_cover_1.jpg/revision/latest/scale-to-width-down/700?cb=20160718094558', 'Rob Renzetti and Alex Hirsch', 'komik', '2016', 'Journal 3 brims with every page ever seen on the show plus all-new pages with monsters and secrets, ', 0, NULL, 0),
(5, 'Fantastic Beasts and Where to Find Them', '0-439-29501-7', 'https://upload.wikimedia.org/wikipedia/en/8/8d/Fantastic_beasts.JPG', 'J. K. Rowling', 'komik', '2010', 'Fantastic Beasts purports to be a reproduction of a textbook owned by Harry Potter and written by ma', 0, NULL, 0);

-- --------------------------------------------------------

--
-- Table structure for table `get_detail_account`
--

CREATE TABLE `get_detail_account` (
  `id_account` varchar(255) NOT NULL,
  `nama` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `level_access_user` tinyint(1) NOT NULL,
  `username` varchar(255) NOT NULL,
  `allow_edit` tinyint(1) NOT NULL,
  `allow_delete` tinyint(1) NOT NULL,
  `allow_update` tinyint(1) NOT NULL,
  `allow_create` tinyint(1) NOT NULL,
  `id_buku_pinjaman` varchar(10) DEFAULT NULL,
  `status_peminjaman` tinyint(1) NOT NULL DEFAULT 0,
  `is_deleted` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `get_detail_account`
--

INSERT INTO `get_detail_account` (`id_account`, `nama`, `password`, `email`, `level_access_user`, `username`, `allow_edit`, `allow_delete`, `allow_update`, `allow_create`, `id_buku_pinjaman`, `status_peminjaman`, `is_deleted`) VALUES
('001', 'andre', '@dmin', 'andre3@gmail.com', 1, 'andreas', 1, 1, 1, 1, '2', 1, 0);

-- --------------------------------------------------------

--
-- Table structure for table `kategori_buku`
--

CREATE TABLE `kategori_buku` (
  `kd_kategoribuku` int(8) NOT NULL,
  `nm_kategoribuku` varchar(255) NOT NULL,
  `is_deleted` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `kategori_buku`
--

INSERT INTO `kategori_buku` (`kd_kategoribuku`, `nm_kategoribuku`, `is_deleted`) VALUES
(1, 'novel', 0),
(2, 'komik', 0),
(3, 'ensiklopedia', 1),
(4, 'dongeng', 0),
(5, 'biography', 0),
(6, 'diary', 0),
(7, 'fotography', 0),
(8, 'kamus', 0),
(9, 'karya ilmiah', 0),
(10, 'panduan', 0),
(11, 'atlas', 0),
(12, 'teks', 0),
(13, 'mewarnai', 0);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `buku`
--
ALTER TABLE `buku`
  ADD PRIMARY KEY (`kd_buku`);

--
-- Indexes for table `kategori_buku`
--
ALTER TABLE `kategori_buku`
  ADD PRIMARY KEY (`kd_kategoribuku`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `buku`
--
ALTER TABLE `buku`
  MODIFY `kd_buku` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `kategori_buku`
--
ALTER TABLE `kategori_buku`
  MODIFY `kd_kategoribuku` int(8) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
