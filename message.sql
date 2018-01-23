CREATE TABLE IF NOT EXISTS `message` (
  `id` int(5) NOT NULL AUTO_INCREMENT,
  `joueur1` text NOT NULL,
  `joueur2` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1;