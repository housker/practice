USE root

DROP TABLE IF EXISTS `teams`;

CREATE TABLE `teams` (
  `id` INTEGER NOT NULL AUTO_INCREMENT,
  `name` CHAR(50),
  `price` INTEGER,
  `geolocation` CHAR(50),
  `updated` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
);

/*  Execute this file from the command line by typing:
 *    mysql -u root < server/schema.sql
 *  to create the database and the tables.*/