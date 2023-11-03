-- phpMyAdmin SQL Dump
-- version 5.1.3
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 03-11-2023 a las 11:29:26
-- Versión del servidor: 10.4.24-MariaDB
-- Versión de PHP: 8.1.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

--
-- Base de datos: `ozone`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `contaminantes`
--

CREATE TABLE `contaminantes` (
  `idContaminante` int(11) NOT NULL,
  `nombre` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `contaminantes`
--

INSERT INTO `contaminantes` (`idContaminante`, `nombre`) VALUES
(1, 'ozono');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `mediciones`
--

CREATE TABLE `mediciones` (
  `idMedicion` int(11) NOT NULL,
  `instante` text NOT NULL,
  `lugar` text NOT NULL,
  `valor` double NOT NULL,
  `idContaminante` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `mediciones`
--

INSERT INTO `mediciones` (`idMedicion`, `instante`, `lugar`, `valor`, `idContaminante`) VALUES
(1, 'instante', 'lugar', 54.2, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sonda`
--

CREATE TABLE `sonda` (
  `idSonda` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `sonda`
--

INSERT INTO `sonda` (`idSonda`) VALUES
(1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sondamedicion`
--

CREATE TABLE `sondamedicion` (
  `idSonda` int(11) NOT NULL,
  `idMedicion` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `sondamedicion`
--

INSERT INTO `sondamedicion` (`idSonda`, `idMedicion`) VALUES
(1, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuariomedicion`
--

CREATE TABLE `usuariomedicion` (
  `email` varchar(255) NOT NULL,
  `idMedicion` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `usuariomedicion`
--

INSERT INTO `usuariomedicion` (`email`, `idMedicion`) VALUES
('usuario@example.com', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `email` varchar(255) NOT NULL,
  `contraseña` varchar(255) NOT NULL,
  `nombre` varchar(255) NOT NULL,
  `telefono` text NOT NULL,
  `admin` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`email`, `contraseña`, `nombre`, `telefono`, `admin`) VALUES
('usuario@example.com', '03ac674216f3e15c761ee1a5e255f067953623c8b388b4459e13f978d7c846f4', 'ads', '123456789', 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuariosonda`
--

CREATE TABLE `usuariosonda` (
  `email` varchar(255) NOT NULL,
  `idSonda` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `usuariosonda`
--

INSERT INTO `usuariosonda` (`email`, `idSonda`) VALUES
('usuario@example.com', 1);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `contaminantes`
--
ALTER TABLE `contaminantes`
  ADD PRIMARY KEY (`idContaminante`);

--
-- Indices de la tabla `mediciones`
--
ALTER TABLE `mediciones`
  ADD PRIMARY KEY (`idMedicion`),
  ADD KEY `idContaminante` (`idContaminante`);

--
-- Indices de la tabla `sonda`
--
ALTER TABLE `sonda`
  ADD PRIMARY KEY (`idSonda`);

--
-- Indices de la tabla `sondamedicion`
--
ALTER TABLE `sondamedicion`
  ADD PRIMARY KEY (`idSonda`),
  ADD KEY `idMedicion` (`idMedicion`);

--
-- Indices de la tabla `usuariomedicion`
--
ALTER TABLE `usuariomedicion`
  ADD PRIMARY KEY (`email`,`idMedicion`),
  ADD KEY `idMedicion` (`idMedicion`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`email`);

--
-- Indices de la tabla `usuariosonda`
--
ALTER TABLE `usuariosonda`
  ADD PRIMARY KEY (`email`,`idSonda`),
  ADD KEY `idSonda` (`idSonda`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `contaminantes`
--
ALTER TABLE `contaminantes`
  MODIFY `idContaminante` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `mediciones`
--
ALTER TABLE `mediciones`
  MODIFY `idMedicion` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `sonda`
--
ALTER TABLE `sonda`
  MODIFY `idSonda` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `mediciones`
--
ALTER TABLE `mediciones`
  ADD CONSTRAINT `mediciones_ibfk_1` FOREIGN KEY (`idContaminante`) REFERENCES `contaminantes` (`idContaminante`);

--
-- Filtros para la tabla `sondamedicion`
--
ALTER TABLE `sondamedicion`
  ADD CONSTRAINT `sondamedicion_ibfk_1` FOREIGN KEY (`idSonda`) REFERENCES `sonda` (`idSonda`),
  ADD CONSTRAINT `sondamedicion_ibfk_2` FOREIGN KEY (`idMedicion`) REFERENCES `mediciones` (`idMedicion`);

--
-- Filtros para la tabla `usuariomedicion`
--
ALTER TABLE `usuariomedicion`
  ADD CONSTRAINT `usuariomedicion_ibfk_1` FOREIGN KEY (`email`) REFERENCES `usuarios` (`email`),
  ADD CONSTRAINT `usuariomedicion_ibfk_2` FOREIGN KEY (`idMedicion`) REFERENCES `mediciones` (`idMedicion`);

--
-- Filtros para la tabla `usuariosonda`
--
ALTER TABLE `usuariosonda`
  ADD CONSTRAINT `usuariosonda_ibfk_1` FOREIGN KEY (`email`) REFERENCES `usuarios` (`email`),
  ADD CONSTRAINT `usuariosonda_ibfk_2` FOREIGN KEY (`idSonda`) REFERENCES `sonda` (`idSonda`);
COMMIT;