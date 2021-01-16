-- phpMyAdmin SQL Dump
-- version 4.8.3
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Waktu pembuatan: 16 Jan 2021 pada 03.31
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

-- --------------------------------------------------------

--
-- Struktur dari tabel `get_detail_account`
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
  `is_deleted` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data untuk tabel `get_detail_account`
--

INSERT INTO `get_detail_account` (`id_account`, `nama`, `password`, `email`, `level_access_user`, `username`, `allow_edit`, `allow_delete`, `allow_update`, `allow_create`, `is_deleted`) VALUES
('001', 'andre', '@dmin', 'andre3@gmail.com', 1, 'andreas', 1, 1, 1, 1, 1);

-- --------------------------------------------------------

--
-- Struktur dari tabel `kategori_buku`
--

CREATE TABLE `kategori_buku` (
  `kd_kategoribuku` varchar(255) NOT NULL,
  `nm_kategoribuku` varchar(255) NOT NULL,
  `is_deleted` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data untuk tabel `kategori_buku`
--

INSERT INTO `kategori_buku` (`kd_kategoribuku`, `nm_kategoribuku`, `is_deleted`) VALUES
('01', 'novel', 1),
('02', 'komik', 1),
('03', 'ensiklopedia', 1),
('04', 'dongeng', 1),
('05', 'biography', 1),
('06', 'diary', 1),
('07', 'fotography', 1),
('08', 'kamus', 1),
('09', 'karya ilmiah', 1),
('10', 'panduan', 1),
('11', 'atlas', 1),
('12', 'teks', 1),
('13', 'mewarnai', 1);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
