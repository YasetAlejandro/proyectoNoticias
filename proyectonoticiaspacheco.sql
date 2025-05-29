-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 29-05-2025 a las 06:53:09
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `proyectonoticiaspacheco`
--

DELIMITER $$
--
-- Procedimientos
--
CREATE DEFINER=`root`@`localhost` PROCEDURE `SP_INSERTIMAGE` (IN `title` VARCHAR(255), IN `content` TEXT, IN `image_url` VARCHAR(255), IN `created_at` TIMESTAMP, IN `user_id` INT)   BEGIN

INSERT INTO news (title, content, image_url, created_at, user_id) VALUES (title, content, image_url, created_at, user_id );

END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `SP_LOGINUSUARIOS` (IN `name` VARCHAR(65), IN `email` VARCHAR(45), IN `pwd` VARCHAR(255), IN `rol` VARCHAR(15))   BEGIN
INSERT INTO users (name, email, pwd)VALUES (name, email, pwd);
SET @idValue= LAST_INSERT_ID();

INSERT INTO users_data(user_id, permissions) VALUES (@idValue, rol);

END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `SP_SELECTNEWS` ()   BEGIN

SELECT news.title as "Titulo", news.content as "Content", news.image_url as "imagen", news.created_at as "Fecha", news.user_id as "Matricula", users.name as "Autor"
FROM news INNER JOIN users
ON news.user_id= users.id 
ORDER BY news.created_at DESC;

END$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `news`
--

CREATE TABLE `news` (
  `id` bigint(20) NOT NULL,
  `title` varchar(255) NOT NULL,
  `content` text NOT NULL,
  `image_url` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `user_id` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `news`
--

INSERT INTO `news` (`id`, `title`, `content`, `image_url`, `created_at`, `user_id`) VALUES
(18, 'EXPOSICION DE CAMPAÑAS SOCIALES', 'Con el propósito de conseguir un cambio positivo en conductas sociales a través de la comunicación persuasiva, estudiantes Linces del Programa Educativo de Mercadotecnia de la Universidad Autónoma de Occidente (UAdeO) Unidad Regional Culiacán, llevaron a cabo una Exposición de Campañas Sociales como parte de las actividades desarrolladas en la asignatura de Mercadotecnia Social en el cuarto semestre, impartida por la Dra. Florg Fong Villegas. \r\nLa exhibición estuvo conformada por diecisiete stands en los cuales cada equipo de Lince explicó las características generales de la campaña de diversas empresas tales como, Avon, Jaztea, Corver, Hobart Service, Horticultura, Kuroda, Tomateros, Carls Jr, SuKarne, Misterio Music, Fiasa, Feria Empresarial, Grupo Seamanduras, Culiacán Seeds, Cetaphil, Tomateros, Coppel y Caffenio.', '1716235869981-439908631_939087011335755_3596355403589312958_n.jpg', '2024-05-20 20:11:09', 22040000),
(19, 'SEMINARIO DE INVESTIGACION 2024', 'Estudiantes del sexto semestre del Programa Educativo de Gobierno y Administración Pública de la UAdeO Unidad Regional Culiacán, llevaron a cabo el 1er Coloquio para la presentación de avances de investigación en el marco de la segunda Jornada Académica del Seminario de Investigación 2024.\r\nFormaron parte del comité revisor las doctoras Gema Janeth Lara Barrera, Paola Marbella Canizalez Ramírez y los doctores Guadalupe Robles Hernández y Martín León Santíesteban.\r\nTambién participaron la Jefa del Departamento Académico de Ciencias Sociales y Humanidades, Dra. Alma Cazarez Félix; la Coordinadora del Programa Educativo, Dra. Beatriz Mendoza Camacho,  así como docentes invitados.', '1716235953759-436153622_954176756493447_610359322192675341_n.jpg', '2024-05-20 20:12:33', 22040000),
(20, 'JORNADA ACADEMICA INDUSTRIAL', 'El Comité Estudiantil de Ingeniería Industrial inauguró la Jornada Académica “El impulso de la innovación: crear, mejorar y sustentar”, dirigida a estudiantes y docentes de la UAdeO Unidad Regional Culiacán. \r\nEste evento inició con la conferencia magistral “Entornos laborales seguros y saludables”, a cargo del Coordinador Auxiliar de Seguridad en el Trabajo del IMSS, Ing. Jesús Francisco Jacobo Núñez. \r\nFormaron parte del presídium el Director de la Unidad Regional Culiacán, M.C. José Isidro Osuna López; la Jefa del Departamento Académico de Ingeniería y Tecnología, Dra. Alejandra Duarte Sánchez; la Coordinadora del Programa Educativo de Ingeniería Industrial, Lic. Tania Martínez Román; así como el docente de esta casa de estudios, Dr. Pablo Ochoa Barraza y el estudiante Oliver Galaviz Soto, en representación del comité organizador.', '1716236060348-344075006_245724941301439_7599876524809373572_n.jpg', '2024-05-20 20:14:20', 22040000),
(21, 'DIA DEL MAESTRO', 'Las y los docentes Linces de la UAdeO Unidad Regional Culiacán, se reunieron esta mañana para celebrar el Día del Maestro, a través de un agradable desayuno organizado por la Subdirección Administrativa. \r\nEl encuentro estuvo amenizado por jóvenes del Taller de Música quienes complacieron a las maestras y maestros con distintas melodías.  \r\nEn el festejo se dio cita el Director, Dr. Emigdio Leonel Urrea Moreno; el Subdirector Administrativo, M.C. Martin de Jesús Galaviz Serrano, así como la Subdirectora Académica, Dra. Denisse Liliana Ballardo Cárdenas.', '1716236091551-441526308_953521746558948_1911595559188828431_n.jpg', '2024-05-20 20:14:51', 22040000),
(22, 'EXPOSICION DE ARTE', 'A través de las asignaturas de Dibujo al Natural, Teoría del Color, Modelado Avanzado, Creatividad e Innovación, Fotografía, Sistemas de Impresión, Redes Sociales y Diseño de la Información, Cultura y Diseño, impartidas en el segundo, cuarto y sexto semestre de la Licenciatura en Diseño Gráfico y Artes Visuales, nuestros Linces exhibieron sus trabajos finales en la exposición “Estampación, representación, enfoque y comunicación”.\r\nDurante el recorrido se contó con la participación del Director de la Unidad Regional Culiacán, Dr. Emigdio Leonel Urrea Moreno; la  Jefa del Departamento de Arquitectura, Diseño y Arte, M.C. Aurora Heredia Valenzuela; la Coordinadora de la Licenciatura M.C. Griselda Corona Sánchez, así mismo los docentes responsables de la actividad.', '1716236419076-441285178_952209056690217_3523129318256766601_n.jpg', '2024-05-20 20:20:19', 22040001),
(23, 'MERCATLON', 'Repletos de energía y un ambiente de sana convivencia es lo que se trasmitió en la tercera edición del Rally Deportivo “Mercatlón”, realizado en el marco de la segunda Jornada Académica de Mercadotecnia 2024 y que tuvo lugar en la pista de atletismo de la UAdeO Unidad Regional Culiacán. \r\nLa agilidad y destreza de la comunidad Lince se hizo presente durante las carrera de obstáculos, carrera de botargas y diversas competencias que se  realizaron con el propósito de fomentar el espíritu deportivo.', '1716236472123-440748089_940422671202189_3594727863914775984_n.jpg', '2024-05-20 20:21:12', 22040001),
(24, 'LABVIEW JORNADA ISOF', 'Estudiantes Linces del Programa Educativo de Ingeniería de Software de la UAdeO Unidad Regional Culiacán, participaron en el taller \"Diseño de interfaces gráficas mediante Labview\", impartido por el Dr. José Luis Robles Magdaleno, en el marco de su jornada académica.', '1716236532498-438216368_938500138061109_507949865405032046_n.jpg', '2024-05-20 20:22:12', 22040001),
(25, 'PRESENTACION GASTRONOMICA', 'Para demostrar su talento culinario las y los jóvenes Linces del segundo semestre de la Licenciatura en Gastronomía de la UAdeO Unidad Regional Culiacán, se desafiaron a sí mismos al presentar su proyecto de banquete como parte de las asignaturas de Cocina Francesa y de Arte de la Mesa y Protocolo. \r\nEl delicioso menú estuvo compuesto por una Ensalada Nicoise de entrada, de plato fuerte se degustó un exquisito Filete Mignon, asimismo de postre una deliciosa Pera al Vino Tinto, acompañados de refrescantes bebidas como Gin de frutos rojos, Limonada de lavanda, Clericot y Vino espumoso rosado.\r\nSe contó con la presencia del Rector de la UAdeO, Dr. Pedro Flores Leal; el Director de la Unidad Regional Culiacán, Dr. Emigdio Leonel Urrea Moreno; el Coordinador de Gastronomía, L.G. Jesús Humberto Elenes Ríos, así como invitados especiales. El grupo de Linces estuvo asesorado por los docentes Lic. Elisandra González Camacho y el Lic. Alejandro Ceballos Atienzo, quienes apoyaron e  impulsaron el potencial del grupo.', '1716236589030-440121578_945111240733332_754850436069932864_n.jpg', '2024-05-20 20:23:09', 22040001),
(26, 'CONFERENCIA \"EL IDIOMA INGLES\"', 'Imparten conferencia  “El idioma inglés y su importancia en un mundo globalizado” disertada por la Jefa de Sección de Programas Especiales del Departamento de Internacionalización y docente de Idiomas de la UAdeO, Lic. Martha Lidia López Sánchez.\r\nLa actividad formó parte de la Jornada Multidisciplinaria del Departamento Académico de Ciencias Sociales y Humanidades, dirigido a estudiantes y docentes de los diversos programas educativos, asimismo contó con la presencia de la Coordinadora de PIFLEX, Lic. Silvia Milán Noris, quien fungió como organizadora del evento.', '1716236630071-438299315_944954574082332_4762811220295422921_n.jpg', '2024-05-20 20:23:50', 22040001),
(27, 'ENTREGA DE TESIS BIOMEDICA', 'El egresado de la Licenciatura en Ciencias Biomédicas, Praxedis Félix Alcalá, presentó su Tesis en Examen Profesional “Detección de mutaciones kdr en los dominios II y III del canal de sodio dependiente de voltaje VGSC de Aedes aegypti resistentes y susceptibles a insecticidas piretroides en  Culiacán, Sinaloa”, para obtener el grado de licenciado.\r\nParticiparon la Dra. Annete Itzel Apodaca Medina y el Dr. Sergio Alonso Duran Pérez, quienes fungieron como directores de tesis. Asimismo la Dra. Elisa Analí Camacho Ureta, participó como asesora. \r\nEn este contexto, el jurado decidió otorgarle al sustentante mención honorífica, una vez culminada la exposición. Muchas felicidades al joven Praxedis Félix Alcalá por su destacada defensa de tesis.', '1716237152158-439864238_940492851195171_8193631023157873845_n.jpg', '2024-05-20 20:32:32', 22040002),
(28, 'JORNADA #13 CRIMINALISTICA', 'En el marco de la 13va Jornada Académica de Criminalística y Ciencias Periciales de la UAdeO Unidad Regional Culiacán, se realizó la actividad “Seguridad y Justicia: Explorando las Unidades Policiales Especializadas en Sinaloa”, con el objetivo de dar a conocer las funciones del quehacer de las corporaciones especializadas que integran las unidades de la Secretaría de Seguridad Pública.\r\nEn la inauguración participó el Vicefiscal de Derechos Humanos, Dr. Alfonso Salazar Ibarra; Subsecretario de Seguridad Pública, Prevención y Reinserción Social de la dependencia, Leoncio Pedro García Alatorre; el representante del programa Ser Policía y Fundación FG1, Lic. Daniel Gutiérrez Moree, así como elementos de la policía estatal.\r\nLa Encargada del Despacho de la Subsecretaría de Estudios, Proyectos y Desarrollo de la SSP, Mtra. Sobeyda Sandoval Sicairos, expuso sobre la temática en cuestión. \r\nPor parte de la UAdeO, asistieron el Director, Dr. Emigdio Leonel Urrea Moreno; la Subdirectora Académica, Dra. Denisse Liliana Ballardo Cárdenas; la Jefa del Departamento Académico de Ciencias Sociales y Humanidades, Dra. Alma Velia Cazarez Félix; la Coordinadora de Criminalística y Ciencias Periciales, M.C. Rosario Heras Gaspar, asimismo, el Coordinador de Derecho y Ciencias Sociales, M.C. Martin Medina Valdez.', '1716237207057-441493024_952248983352891_4371632053218256744_n.jpg', '2024-05-20 20:33:27', 22040002),
(29, 'JORNADA ISOF 2024', 'Dio inicio la Jornada Académica de Ingeniería de Software 2024, con la conferencia “De la teoría a la práctica: Lecciones aprendidas en la administración de Bases de Datos”, impartida por el docente de la UAdeO Lic. Alfonzo Duarte Jiménez.\r\nDel mismo modo, el docente Dr. Enrique Iván Noriega Carrasco, disertó la charla  “IA: Lo que todo ingeniero debe saber”, en la cual explicó acerca de aprendizaje supervisado y no supervisado, además de las redes neuronales artificiales, entre otros métodos de inteligencia. \r\nDurante la inauguración se contó con la presencia del Director de la Unidad Regional Culiacán, Dr. Emigdio Leonel Urrea Moreno; la Subdirectora Académica, Dra. Denisse Ballardo Cárdenas; el Subdirector Administrativo, M.C. Martin de Jesús Galaviz Serrano; la Jefa del Departamento de Ingeniería y Tecnología, M.C. Tania Martínez Román, así como la Coordinadora del Programa Educativo de Ingeniería en Software, Lic. Rocío Paulina de la Vega Correa.', '1716237283760-439857149_937833714794418_7095417468782039863_n.jpg', '2024-05-20 20:34:43', 22040002),
(30, 'TITULO 1', 'Estudiantes de la uadeo que se fueron de viaje en verano', '1716499802899-291610077_1748505492182901_7901837978685496027_n.jpg', '2024-05-23 21:30:02', 22040000);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `id` bigint(20) NOT NULL,
  `name` varchar(120) NOT NULL,
  `email` varchar(255) NOT NULL,
  `pwd` varchar(128) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `pwd`) VALUES
(22040000, 'Yaset Alejandro Meza Valenzuela', 'alex_mzvla@outlook.com', '$2a$08$XrJcXqH7DUATm.RDcjlMjuLBs3GtJqLd4ZVKpfElO18VYxhz3hJgG'),
(22040001, 'Luis David Elizarraras', 'Davo@uadeo.mx', '$2a$08$45c68.MaQwo./2WvMTuZ6eVregzfsChS7/Hl/prfppbTpz9A9jFi2'),
(22040002, 'Eduardo Maytorena Ruvalcaba', 'Eduardo@uadeo.mx', '$2a$08$QwML7Mzqo3Qlczr6/K96V.DKcss18oPZOgHSmYGcyyREx0rzPEApS'),
(22040003, 'Cecilia Valenzuela', 'ceci_vla@hotmail.com', '$2a$08$1gPVTiYiPVUbpYYilbHMbeB9ZU3q3GT90A6RoqzpdTAHjyMLgGLyO'),
(22040004, 'Efren Valle Flores', 'efren@uadeo.mx', '$2a$08$XB7ypVVda2WeqKRY57vJC.pSQNzGsEOGdP5zKJW..qwwaFS1QGZIW');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users_data`
--

CREATE TABLE `users_data` (
  `id` bigint(20) NOT NULL,
  `user_id` bigint(20) NOT NULL,
  `user_token` varchar(8) DEFAULT NULL,
  `permissions` varchar(15) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `users_data`
--

INSERT INTO `users_data` (`id`, `user_id`, `user_token`, `permissions`) VALUES
(29, 22040000, NULL, 'admin'),
(30, 22040001, NULL, 'admin'),
(31, 22040002, NULL, 'data entry'),
(32, 22040003, NULL, 'data entry'),
(33, 22040004, NULL, 'data entry');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `news`
--
ALTER TABLE `news`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `users_data`
--
ALTER TABLE `users_data`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `user_token` (`user_token`),
  ADD KEY `user_id` (`user_id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `news`
--
ALTER TABLE `news`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=34;

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22040005;

--
-- AUTO_INCREMENT de la tabla `users_data`
--
ALTER TABLE `users_data`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=34;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `news`
--
ALTER TABLE `news`
  ADD CONSTRAINT `news_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Filtros para la tabla `users_data`
--
ALTER TABLE `users_data`
  ADD CONSTRAINT `users_data_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
