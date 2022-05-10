CREATE DATABASE agenda;

USE agenda;

CREATE TABLE users(
    id INT(11) NOT NULL,
    username VARCHAR(16) NOT NULL,
    password VARCHAR(60) NOT NULL,
    fullname VARCHAR(100) NOT NULL,
    puestoasignado VARCHAR(50) NOT NULL,
    sexo VARCHAR(1) NOT NULL,
    telefono VARCHAR(10)
);

ALTER TABLE users
    ADD PRIMARY KEY (id);

ALTER TABLE users
    MODIFY id INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 1

DESCRIBE users;

--TAREAS TABLE
CREATE TABLE actividades(
    id INT (11) NOT NULL,
    descripcion TEXT,
    fechainicio DATE NOT NULL,
    fechafin DATE NOT NULL,
    user_id INT(11),
    created_at timestamp NOT NULL DEFAULT current_timestamp,
    CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES users(id)
);


ALTER TABLE actividades
    ADD PRIMARY KEY (id)

CREATE TABLE asignacion_tarea(
    id_asignacion INT (11) NOT NULL,
    id_actividades INT(11),
    id_empleado INT(11),
    CONSTRAINT fk_tarea FOREIGN KEY (id_actividades) REFERENCES actividades(id),
    CONSTRAINT fk_empleado FOREIGN KEY (id_users) REFERENCES users(id)
);
ALTER TABLE asignacion_tarea
    ADD PRIMARY KEY (id_asignacion);