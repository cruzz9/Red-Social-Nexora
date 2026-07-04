-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema nexora
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema nexora
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `nexora` DEFAULT CHARACTER SET utf8mb3 ;
USE `nexora` ;

-- -----------------------------------------------------
-- Table `nexora`.`Especialidad`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `nexora`.`Especialidad` (
  `especialidad_id` INT NOT NULL AUTO_INCREMENT,
  `especialidad` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`especialidad_id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `nexora`.`Usuarios`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `nexora`.`Usuarios` (
  `usuario_id` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(45) NOT NULL,
  `apellido` VARCHAR(45) NOT NULL,
  `rol` VARCHAR(45) NOT NULL,
  `fecha_nacimiento` DATE NOT NULL,
  `genero` VARCHAR(45) NOT NULL,
  `email` VARCHAR(45) NOT NULL,
  `telefono` VARCHAR(20) NOT NULL,
  `especialidad_especialidad_id` INT NOT NULL,
  `contrasena` VARCHAR(50) NOT NULL,
  PRIMARY KEY (`usuario_id`),
  INDEX `fk_Usuarios_especialidad_idx` (`especialidad_especialidad_id` ASC) VISIBLE,
  CONSTRAINT `fk_Usuarios_especialidad1`
    FOREIGN KEY (`especialidad_especialidad_id`)
    REFERENCES `nexora`.`Especialidad` (`especialidad_id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `nexora`.`Publicaciones`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `nexora`.`Publicaciones` (
  `publicacion_id` INT NOT NULL AUTO_INCREMENT,
  `contenido` TEXT NOT NULL,
  `likes` INT NOT NULL,
  `Usuarios_usuario_id` INT NOT NULL,
  PRIMARY KEY (`publicacion_id`),
  INDEX `fk_Publicaciones_Usuarios_idx` (`Usuarios_usuario_id` ASC) VISIBLE,
  CONSTRAINT `fk_Publicaciones_Usuarios`
    FOREIGN KEY (`Usuarios_usuario_id`)
    REFERENCES `nexora`.`Usuarios` (`usuario_id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `nexora`.`Comentarios`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `nexora`.`Comentarios` (
  `comentario_id` INT NOT NULL AUTO_INCREMENT,
  `contenido` TEXT NOT NULL,
  `Publicaciones_publicacion_id` INT NOT NULL,
  `Usuarios_usuario_id` INT NOT NULL,
  PRIMARY KEY (`comentario_id`),
  INDEX `fk_Comentarios_Publicaciones1_idx` (`Publicaciones_publicacion_id` ASC) VISIBLE,
  INDEX `fk_Comentarios_Usuarios1_idx` (`Usuarios_usuario_id` ASC) VISIBLE,
  CONSTRAINT `fk_Comentarios_Publicaciones1`
    FOREIGN KEY (`Publicaciones_publicacion_id`)
    REFERENCES `nexora`.`Publicaciones` (`publicacion_id`),
  CONSTRAINT `fk_Comentarios_Usuarios1`
    FOREIGN KEY (`Usuarios_usuario_id`)
    REFERENCES `nexora`.`Usuarios` (`usuario_id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `nexora`.`Perfil`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `nexora`.`Perfil` (
  `perfil_id` INT NOT NULL AUTO_INCREMENT,
  `carrera` VARCHAR(45) NOT NULL,
  `sobre_mi` VARCHAR(500) NULL DEFAULT NULL,
  `datos_carrera` VARCHAR(500) NULL DEFAULT NULL,
  `Usuarios_usuario_id` INT NOT NULL,
  PRIMARY KEY (`perfil_id`),
  UNIQUE INDEX `Usuarios_usuario_id_UNIQUE` (`Usuarios_usuario_id` ASC) INVISIBLE,
  UNIQUE INDEX `fk_Perfil_Usuarios1_idx` (`Usuarios_usuario_id` ASC) INVISIBLE,
  CONSTRAINT `fk_Perfil_Usuarios1`
    FOREIGN KEY (`Usuarios_usuario_id`)
    REFERENCES `nexora`.`Usuarios` (`usuario_id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
