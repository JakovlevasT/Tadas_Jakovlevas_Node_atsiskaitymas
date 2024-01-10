-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 10, 2024 at 02:30 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `exam`
--

-- --------------------------------------------------------

--
-- Table structure for table `item_types`
--

CREATE TABLE `item_types` (
  `item_type_id` int(10) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `item_types`
--

INSERT INTO `item_types` (`item_type_id`, `name`) VALUES
(1, 'food'),
(2, 'drink'),
(3, 'electronic'),
(4, 'clothes');

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `order_id` int(10) UNSIGNED NOT NULL,
  `user_id` int(11) UNSIGNED NOT NULL,
  `shop_item_id` int(11) UNSIGNED NOT NULL,
  `quantity` decimal(10,0) NOT NULL,
  `total_price` decimal(10,0) NOT NULL,
  `status` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`order_id`, `user_id`, `shop_item_id`, `quantity`, `total_price`, `status`) VALUES
(1, 2, 1, 3, 220, 'pending'),
(2, 3, 1, 6, 621, 'Complete'),
(3, 3, 3, 2, 10, 'pending'),
(4, 1, 1, 1, 1200, 'pending'),
(5, 1, 3, 12, 12, 'pending'),
(6, 1, 1, 0, 1200, 'pending'),
(7, 1, 2, 3, 8, 'pending'),
(8, 1, 1, 1, 1200, 'pending'),
(9, 1, 3, 1, 12, 'pending'),
(10, 1, 1, 1, 1200, 'pending'),
(11, 1, 3, 1, 12, 'pending'),
(12, 2, 7, 1, 3, 'pending'),
(13, 2, 8, 1, 1200, 'pending'),
(14, 2, 1, 1, 1200, 'pending'),
(15, 2, 8, 1, 1200, 'pending'),
(16, 2, 6, 1, 13, 'pending'),
(17, 2, 1, 1, 1200, 'pending'),
(18, 2, 1, 1, 1200, 'pending'),
(19, 2, 7, 1, 3, 'pending'),
(20, 2, 1, 1, 1200, 'pending'),
(21, 2, 1, 1, 1200, 'pending'),
(22, 2, 6, 1, 13, 'pending'),
(23, 3, 5, 1, 3, 'pending'),
(24, 5, 2, 1, 8, 'pending'),
(25, 3, 4, 1, 3, 'pending'),
(26, 1, 4, 1, 3, 'pending');

-- --------------------------------------------------------

--
-- Table structure for table `shop_items`
--

CREATE TABLE `shop_items` (
  `shop_items_id` int(10) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `price` decimal(10,0) NOT NULL,
  `description` text NOT NULL,
  `image` varchar(255) NOT NULL,
  `item_type_id` int(11) UNSIGNED NOT NULL,
  `isDeleted` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `shop_items`
--

INSERT INTO `shop_items` (`shop_items_id`, `name`, `price`, `description`, `image`, `item_type_id`, `isDeleted`) VALUES
(1, 'Computer', 1200, 'MSI computer with RTX 3070', 'https://picsum.photos/id/11/200/300', 3, 0),
(2, 'Burger', 8, 'The best burger in town', 'https://picsum.photos/id/123/200/300', 1, 0),
(3, 'Pizza', 12, 'Italian Pizza', 'https://picsum.photos/id/26/200/300', 1, 0),
(4, 'Bulka', 3, 'Sokolado skonio bulka', 'https://picsum.photos/id/200/200/300', 1, 0),
(5, 'Makaronai', 3, 'spageti makaronai', 'https://picsum.photos/id/230/200/300', 1, 0),
(6, 'T-shirt', 13, 'Very nice Nike T-shirt', 'https://picsum.photos/id/35/200/300', 4, 0),
(7, 'Coca-Cola', 3, '2l of best Coce you ever drinked', 'https://picsum.photos/id/420/200/300', 2, 0),
(8, 'Samsung s23', 1200, 'New Samsung s23 phone with so much hype', 'https://picsum.photos/id/321/200/300', 3, 0),
(9, 'Sweater', 20, 'Warm sweater with buttons', 'https://picsum.photos/id/223/800/400', 4, 0);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `user_id` int(10) UNSIGNED NOT NULL,
  `user_name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role_id` int(11) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `user_name`, `email`, `password`, `role_id`) VALUES
(1, 'Tadas', 'tadas@email.com', 'qwerty', 1),
(2, 'Tomas', 'tomas@email.com', '12345', 1),
(3, 'Rebeka', 'rebeka@email.com', 'password', 2),
(4, 'Arnas', 'arnas@email.com', 'qwerty12345', 2),
(5, 'Andrius', 'andrius@email.com', 'password', 3),
(6, 'Antanas', 'antanas@email.com', 'password', 3);

-- --------------------------------------------------------

--
-- Table structure for table `user_roles`
--

CREATE TABLE `user_roles` (
  `user_roles_id` int(10) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user_roles`
--

INSERT INTO `user_roles` (`user_roles_id`, `name`) VALUES
(1, 'admin'),
(2, 'user'),
(3, 'guest');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `item_types`
--
ALTER TABLE `item_types`
  ADD PRIMARY KEY (`item_type_id`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`order_id`);

--
-- Indexes for table `shop_items`
--
ALTER TABLE `shop_items`
  ADD PRIMARY KEY (`shop_items_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`);

--
-- Indexes for table `user_roles`
--
ALTER TABLE `user_roles`
  ADD PRIMARY KEY (`user_roles_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `item_types`
--
ALTER TABLE `item_types`
  MODIFY `item_type_id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `order_id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- AUTO_INCREMENT for table `shop_items`
--
ALTER TABLE `shop_items`
  MODIFY `shop_items_id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `user_roles`
--
ALTER TABLE `user_roles`
  MODIFY `user_roles_id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
