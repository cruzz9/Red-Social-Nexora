insert into Especialidad(especialidad)
values ('Tecnología y software'),
('Ingenierías clasicas'),
('Ingenierías aplicadas'),
('Matemáticas y ciencias fundamentales');
select * from Especialidad;


insert into Usuarios (nombre, apellido, rol, fecha_nacimiento, genero, email, telefono, especialidad_especialidad_id, contrasena)
values ('Leonardo', 'Po', 'Estudiante', '2007-05-15', 'Masculino', 'leo.po@nexora.com', '5513243546', 1, 'Leopassword_123'),
('Raul', 'Medina', 'Estudiante', '2010-03-18', 'Masculino', 'raulmedina@nexora.com', '5690785643', 3, 'Raulpassword_123'),
('Valeria', 'Perez', 'Estudiante', '2010-12-01', 'Femenino', 'vale.perez@nexora.com', '5525436874', 2, 'Valeriapassword_123'),
('Lizeth', 'Valderrama','Estudiante', '2012-11-13', 'Femenino', 'liz.valderrama@nexora.com', '5578435474', 4, 'Lizpassword_123'),
('Uriel', 'Diaz', 'Estudiante', '2008-02-28', 'Masculino', 'uri.diaz@nexora.com', '5590454874', 2, 'Urielpassword_123'),
('Laura', 'Iturrieta', 'Profesionista', '1982-05-15', 'Femenino', 'laura.i@email.com', '5512345678', 3, 'Laupassword_123'),
('Juan', 'Peralta','Profesionista', '1979-11-22', 'Masculino', 'juan@email.com', '5598765432', 2, 'Juanpassword_123'),
('Merari', 'Silva', 'Profesionista', '1990-03-10', 'Femenino', 'merari.silva@email.com', '5544332211', 1, 'password125P'),
('Liliana', 'Olmos', 'Profesionista', '1985-08-30', 'Femenino', 'liliana.o@email.com', '5566778899', 4, 'password126P'),
('Luis', 'Juárez', 'Profesionista', '1993-12-05', 'Masculino', 'luis.juarez@email.com', '5522113344', 2, 'password129P');

select * from Usuarios;

insert into Publicaciones(contenido, likes, Usuarios_usuario_id)
values ('¿Cómo potencia la Ciencia de Datos a la Ingeniería Química para optimizar procesos industriales y predecir fallos?', 100, 3),
('Comparto este recurso para simulación de circuitos automatizados.', 500, 2),
('Busco ayuda para aprender a desarrollar con springboot', 300, 1),
('¡Hola! Duda para físicos: ¿Es verdad que en la carrera programan más de lo que hacen experimentos o solo es un mito?', 300, 4),
('¿Cómo está cambiando la IA y el análisis de datos a la Ingeniería Civil en proyectos modernos? 
¿Qué habilidades tecnológicas adicionales requiere este sector para destacar?', 300, 5);

insert into Comentarios(contenido, Publicaciones_publicacion_id, Usuarios_usuario_id)
values ('Excelente aporte Raúl, me sirve mucho para el integrador.', 2,6),
('¡Hola Vale! Por ejemplo en la industria alimenticia,
 empresas como Nestlé usan ciencia de datos para predecir la calidad de ingredientes, optimizar tiempos de cocción y reducir mermas,
 transformando procesos químicos tradicionales mediante modelos predictivos avanzados.', 1,7),
('¡Hola Leo! Yo doy asesorias por si gustas contactarme', 3,8),
('La IA automatiza cálculos estructurales, optimiza materiales
 y permite gemelos digitales; hoy es vital dominar software avanzado y análisis predictivo', 5,9),
('¡Hola Liz! En Física, la programación es fundamental para simular sistemas complejos. 
En computación cuántica, el código es el experimento mismo, pues controlas qubits
 para modelar la realidad. ¡Es vital!', 4,10);
 
insert into Perfil(carrera, sobre_mi,datos_carrera, Usuarios_usuario_id)
values
('Ingeniera Mecatrónica',
'Líder en robótica con 20 años transformando la automatización global.', 
'Un mito sobre la ingeniería en mecatrónica es que solo construyen robots humanoides de ciencia ficción, cuando en realidad automatizan la industria combinando mecánica, 
electrónica y programación para diseñar prótesis médicas, 
vehículos autónomos, sistemas de manufactura inteligente y tecnología aeroespacial.',
6),

('Ingeniero Químico',
'Soy un experto que ha impulsado la industria sostenible mundial.',
 'Un mito sobre la ingeniería química es que solo trabajan en laboratorios mezclando sustancias en tubos de ensayo, 
 cuando en realidad diseñan y operan plantas industriales a gran escala para transformar materias primas 
 en productos cotidianos como medicamentos, alimentos, combustibles y plásticos de forma segura y sustentable.', 
 7),
 
('Ingeniera en Sistemas Computacionales',
'Visionaria tecnológica creando ecosistemas digitales de alto impacto empresarial.', 
'Un mito sobre los ingenieros en sistemas es que solo programan páginas web, 
 cuando en realidad optimizan empresas liderando la ciberseguridad, la inteligencia artificial,
 el desarrollo de aplicaciones móviles, la gestión de bases de datos y la automatización industrial en la nube.',
 8),
 
('Licenciada en Física',
'Investigadora laureada con décadas descifrando los misterios de la computación cuántica.', 
'Un mito sobre los físicos cuánticos es que solo debaten filosofías abstractas sobre universos paralelos en laboratorios teóricos,
 cuando en realidad controlan partículas microscópicas para revolucionar el mundo real 
creando la computación cuántica, sensores de máxima precisión, sistemas de ciberseguridad inviolables y nuevos materiales para la medicina del futuro',
9),

('Ingeniero Civil', 
'Ingeniero de grandes proyectos que sostienen la infraestructura moderna.', 
'Un mito sobre los ingenieros civiles es que solo dirigen albañiles y construyen carreteras de cemento, cuando en realidad 
planifican el crecimiento de las ciudades diseñando estructuras capaces de resistir desastres naturales, gestionando redes de agua potable, 
creando sistemas de transporte masivo y desarrollando infraestructura sustentable para mejorar la calidad de vida.', 10);
select * from Usuarios;
select * from Perfil;
select * from Publicaciones;
select * from Comentarios;
select * from Especialidad;
