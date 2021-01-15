-- phpMyAdmin SQL Dump
-- version 4.8.3
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Waktu pembuatan: 15 Jan 2021 pada 14.32
-- Versi server: 10.1.36-MariaDB
-- Versi PHP: 5.6.38

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `wt3_perpustakaan`
--

-- --------------------------------------------------------

--
-- Struktur dari tabel `buku`
--

CREATE TABLE `buku` (
  `kd_buku` varchar(100) NOT NULL,
  `judul` varchar(100) NOT NULL,
  `isbn` varchar(100) NOT NULL,
  `cover` varchar(255) CHARACTER SET utf8 NOT NULL,
  `penulis` varchar(100) NOT NULL,
  `tahun` varchar(100) NOT NULL,
  `kategori_buku` varchar(255) NOT NULL,
  `ket` varchar(100) NOT NULL,
  `isdeleted` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data untuk tabel `buku`
--

INSERT INTO `buku` (`kd_buku`, `judul`, `isbn`, `cover`, `penulis`, `tahun`, `kategori_buku`, `ket`, `isdeleted`) VALUES
('001', 'Komi Can\'t Communicate vol 1', '978-1-9747-0712-6', 'https://upload.wikimedia.org/wikipedia/id/d/d1/Cover_Art_Komi-san_wa%2C_Komyushou_desu_Vol_1.jpg', 'Tomohito Oda', '2016', 'Novel', 'On her first day attending the elite Itan Private High School, the main setting of the story, Shouko', NULL),
('002', 'Overlord 1: The Undead King', '978-0-316-27224-7', 'https://en.wikipedia.org/wiki/Overlord_(novel_series)#/media/File:Overlord_novel.jpg', 'Kugane Maruyama', '2016', 'Novel', 'Momonga is an average salaryman who spends most of his time playing the game YGGDRASIL. Sadly, YGGDR', NULL),
('003', 'Five Nights at Freddy\'s: The Silver Eyes', '978-1338134377', 'https://images-na.ssl-images-amazon.com/images/I/51kkeE8Jv+L._SX326_BO1,204,203,200_.jpg', 'Scott Cawthon and Kira Breed-Wrisley', '2015 ', 'Novel', 'The book follows a young woman named Charlotte, who reunites with her childhood friends on the anniv', NULL),
('004', 'Gravity Falls: Journal 3', '978-1484746691', 'https://static.wikia.nocookie.net/gravityfalls/images/9/90/Journal_3%27s_dust_cover_1.jpg/revision/latest/scale-to-width-down/700?cb=20160718094558', 'Rob Renzetti and Alex Hirsch', '2016', 'Novel', 'Journal 3 brims with every page ever seen on the show plus all-new pages with monsters and secrets, ', NULL),
('005', 'Fantastic Beasts and Where to Find Them', '0-439-29501-7', 'https://upload.wikimedia.org/wikipedia/en/8/8d/Fantastic_beasts.JPG', 'J. K. Rowling', '2010', 'Novel', 'Fantastic Beasts purports to be a reproduction of a textbook owned by Harry Potter and written by ma', NULL);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
