-- add user

INSERT INTO `users` (`user_id`, `user_name`, `email`, `password`, `role_id`) VALUES (NULL, 'Tadas', 'tadas@email.com', 'qwerty', '1');

-- add shop items

INSERT INTO `shop_items` (`shop_items_id`, `name`, `price`, `description`, `image`, `item_type_id`) VALUES (NULL, 'TV', '300', 'Samsung smart TV', 'https://picsum.photos/200/300', '1')

-- add order

INSERT INTO `orders` (`order_id`, `user_id`, `shop_item_id`, `quantity`, `total_price`, `status`) VALUES (NULL, '1', '2', '4', '220', 'pending')