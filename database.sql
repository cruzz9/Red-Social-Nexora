-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `mydb` DEFAULT CHARACTER SET utf8 ;
USE `mydb` ;

-- -----------------------------------------------------
-- Table `mydb`.`especialidad`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`especialidad` (
  `especialidad_id` INT NOT NULL AUTO_INCREMENT,
  `especialidad` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`especialidad_id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Usuarios`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`Usuarios` (
  `usuario_id` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(45) NOT NULL,
  `apellido` VARCHAR(45) NOT NULL,
  `rol` VARCHAR(45) NOT NULL,
  `fecha_nacimiento` VARCHAR(45) NOT NULL,
  `genero` VARCHAR(45) NOT NULL,
  `email` VARCHAR(45) NOT NULL,
  `telefono` VARCHAR(20) NOT NULL,
  `especialidad_especialidad_id` INT NOT NULL,
  PRIMARY KEY (`usuario_id`),
  INDEX `fk_Usuarios_especialidad1_idx` (`especialidad_especialidad_id` ASC) VISIBLE,
  CONSTRAINT `fk_Usuarios_especialidad1`
    FOREIGN KEY (`especialidad_especialidad_id`)
    REFERENCES `mydb`.`especialidad` (`especialidad_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Publicaciones`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`Publicaciones` (
  `publicacion_id` INT NOT NULL AUTO_INCREMENT,
  `contenido` TEXT(100) NOT NULL,
  `likes` INT NOT NULL,
  `Usuarios_usuario_id` INT NOT NULL,
  PRIMARY KEY (`publicacion_id`),
  INDEX `fk_Publicaciones_Usuarios_idx` (`Usuarios_usuario_id` ASC) VISIBLE,
  CONSTRAINT `fk_Publicaciones_Usuarios`
    FOREIGN KEY (`Usuarios_usuario_id`)
    REFERENCES `mydb`.`Usuarios` (`usuario_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Comentarios`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`Comentarios` (
  `comentario_id` INT NOT NULL AUTO_INCREMENT,
  `contenido` TEXT(100) NOT NULL,
  `Publicaciones_publicacion_id` INT NOT NULL,
  PRIMARY KEY (`comentario_id`),
  INDEX `fk_Comentarios_Publicaciones1_idx` (`Publicaciones_publicacion_id` ASC) VISIBLE,
  CONSTRAINT `fk_Comentarios_Publicaciones1`
    FOREIGN KEY (`Publicaciones_publicacion_id`)
    REFERENCES `mydb`.`Publicaciones` (`publicacion_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Perfil`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`Perfil` (
  `perfil_id` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(50) NOT NULL,
  `carrera` VARCHAR(45) NOT NULL,
  `sobre_mi` VARCHAR(45) NOT NULL,
  `datos_carrera` VARCHAR(45) NOT NULL,
  `Usuarios_usuario_id` INT NOT NULL,
  PRIMARY KEY (`perfil_id`),
  INDEX `fk_Perfil_Usuarios1_idx` (`Usuarios_usuario_id` ASC) VISIBLE,
  CONSTRAINT `fk_Perfil_Usuarios1`
    FOREIGN KEY (`Usuarios_usuario_id`)
    REFERENCES `mydb`.`Usuarios` (`usuario_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

alter table usuarios drop column contrasena;

alter table usuarios add column contrasena varchar(50) not null;

insert into especialidad(especialidad)
values ('Tecnología y software'),
('Ingenierías clasicas'),
('Ingenierías aplicadas'),
('Matemáticas y ciencias fundamentales');

insert into usuarios (nombre, apellido, rol, fecha_nacimiento, genero, email, telefono, especialidad_especialidad_id, contrasena)
values ('Leonardo', 'Po', 'Desarrollador', 12-08-1995, 'Masculino', 'leo.po@nexora.com',5513243546, 1, 'Leopassword_123'),
('Raul', 'Medina', 'Desarrollador', 13-08-1995, 'Prefiero no decir', 'raulmedina@nexora.com', 5690785643, 3, 'Raulpassword_123'),
('Valeria', 'Perez', 'Desarrolladora', 14-08-1995, 'Femenino', 'vale.perez@nexora.com', 5525436874, 2, 'Valeriapassword_123');

insert into publicaciones(contenido, likes, Usuarios_usuario_id)
values ('Alguien me ayuda a configurar el CORS en un backend de Java?', 100, 3),
('Comparto este recurso para simulación de circuitos automatizados.', 500, 2),
('Busco ayuda para aprender a desarrollar con springboot', 300, 1);

insert into comentarios(contenido, Publicaciones_publicacion_id)
values ('Excelente aporte Raúl, me sirve mucho para el integrador.', 2),
('¡Hola Vale! Justo puedes usar la anotación @CrossOrigin en tu controlador de Java.', 1),
('¡Hola Leo! Yo doy asesorias por si gustas contactarme', 3);

select * from Usuarios;

select * from Publicaciones;

select * from Comentarios;

select * from Especialidad;