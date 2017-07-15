CREATE TABLE `films` (
	`film_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
	`title` varchar(255) NOT NULL,
	`director` varchar(225) NOT NULL,
	`actor` varchar(225),
	`country` varchar(225) NOT NULL,
	`running_time` int(3) NOT NULL,
	`synopsis` varchar(1000) NOT NULL,
	`poster` varchar(255) NOT NULL,
	`recognition` varchar(1000),
	`trailer` varchar(255),
	`release_date` date NOT NULL,
	`price` decimal(4,2) NOT NULL,
	`sale` boolean,
	PRIMARY KEY (`film_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1;

CREATE TABLE `theaters` (
	`theater_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
	`number` int(10) NOT NULL,
	`capacity` int(10) NOT NULL,
	PRIMARY KEY (`theater_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1;

CREATE TABLE `seats` (
	`seat_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
	`number` int(2) NOT NULL,
	`row` varchar(1) NOT NULL,
	`theater_id` int(10) unsigned NOT NULL,
	PRIMARY KEY (`seat_id`),
	KEY `fk_theater_id` (`theater_id`),
	CONSTRAINT `fk1_theater_id` FOREIGN KEY (`theater_id`) REFERENCES `theaters` (`theater_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1;

CREATE TABLE `bookings` (
	`code` varchar(4) NOT NULL,
	`seat_id` int(10) unsigned NOT NULL,
	`screening_id` int(10) unsigned NOT NULL,
	PRIMARY KEY (`seat_id`,`screening_id`),
	CONSTRAINT `fk1_seat_id` FOREIGN KEY (`seat_id`) REFERENCES `seats` (`seat_id`),
	CONSTRAINT `fk1_screening_id` FOREIGN KEY (`screening_id`) REFERENCES `screenings` (`screening_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1;

CREATE TABLE `purchases` (
	`mail` varchar(255) NOT NULL,
	`qrcode` varchar(255) NOT NULL,
	`seat_id` int(10) unsigned NOT NULL,
	`screening_id` int(10) unsigned NOT NULL,
	PRIMARY KEY (`seat_id`,`screening_id`),
	CONSTRAINT `fk2_seat_id` FOREIGN KEY (`seat_id`) REFERENCES `seats` (`seat_id`),
	CONSTRAINT `fk2_screening_id` FOREIGN KEY (`screening_id`) REFERENCES `screenings` (`screening_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1;

CREATE TABLE `screenings` (
	`screening_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
	`day` date NOT NULL,
	`hour` varchar(5) NOT NULL,
	`theater_id` int(10) unsigned NOT NULL,
	`film_id` int(10) unsigned NOT NULL,
	PRIMARY KEY (`screening_id`),
	KEY `fk_theater_id` (`theater_id`),
	KEY `fk_film_id` (`film_id`),
	CONSTRAINT `fk_film_id` FOREIGN KEY (`film_id`) REFERENCES `films` (`film_id`),
	CONSTRAINT `fk2_theater_id` FOREIGN KEY (`theater_id`) REFERENCES `theaters` (`theater_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1;
