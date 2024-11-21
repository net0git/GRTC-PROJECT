-- Table: d_tipo_servicio
CREATE TABLE d_tipo_servicio (
  id_tipo_servicio SERIAL PRIMARY KEY,
  denominacion VARCHAR
);

-- Table: d_tipo_infraestructura
CREATE TABLE d_tipo_infraestructura (
  id_tipo_infraestructura SERIAL PRIMARY KEY,
  denominacion VARCHAR
);

-- Table: t_tuc
CREATE TABLE t_tuc (
  id_tuc SERIAL PRIMARY KEY,
  nro_tuc VARCHAR,
  nro_impresion VARCHAR,
  razon_social VARCHAR,
  nro_part_reg VARCHAR,
  nombre_resolucion VARCHAR,
  marca VARCHAR,
  anio_fabricacion VARCHAR,
  color VARCHAR,
  nro_chasis VARCHAR,
  nro_asientos VARCHAR,
  peso DOUBLE PRECISION,
  carga DOUBLE PRECISION,
  ruta VARCHAR,
  fecha_exp DATE,
  fecha_ven DATE,
  condicion VARCHAR,
  estado VARCHAR,
  create_at TIMESTAMP
);

-- Table: d_marca
CREATE TABLE d_marca (
  id_marca SERIAL PRIMARY KEY,
  nombre_marca VARCHAR
);

-- Table: t_empresa
CREATE TABLE t_empresa (
  id_empresa SERIAL PRIMARY KEY,
  razon_social VARCHAR,
  ruc VARCHAR,
  direccion VARCHAR,
  correo VARCHAR,
  telefono VARCHAR,
  distrito VARCHAR,
  provincia VARCHAR,
  departamento VARCHAR,
  id_representante_legal INTEGER,
  nota TEXT
);

-- Table: r_empre_histo_vehiculo
CREATE TABLE r_empre_histo_vehiculo (
  id_historial SERIAL PRIMARY KEY,
  placa VARCHAR,
  condicion VARCHAR,
  nombre_resolucion VARCHAR,
  fecha_resolucion DATE,
  ruta TEXT,
  create_at TIMESTAMP,
  id_empresa_servicio INTEGER
);

-- Table: d_resolucion
CREATE TABLE d_resolucion (
  id_resolucion SERIAL PRIMARY KEY,
  nro_resolucion INTEGER,
  anio_resolucion VARCHAR,
  fecha_resolucion DATE,
  nombre_resolucion VARCHAR,
  tomo_resolucion INTEGER,
  documento TEXT,
  descripcion VARCHAR
);

-- Table: t_empresa_servicio
CREATE TABLE t_empresa_servicio (
  id_empresa_servicio SERIAL PRIMARY KEY,
  id_tipo_servicio INTEGER,
  id_empresa INTEGER,
  fecha_inicial DATE,
  fecha_final DATE,
  expediente VARCHAR,
  mtc BOOLEAN
);

-- Table: t_infraestructura
CREATE TABLE t_infraestructura (
  id_infraestructura SERIAL PRIMARY KEY,
  id_tipo_infraestructura INTEGER,
  nombre_infraestructura VARCHAR,
  representante VARCHAR,
  dni_representante VARCHAR,
  empresa VARCHAR,
  ruc_empresa VARCHAR,
  direccion VARCHAR,
  distrito VARCHAR,
  provincia VARCHAR,
  departamento VARCHAR,
  fecha_act DATE,
  expediente VARCHAR,
  mtc BOOLEAN
);

-- Table: d_certificado
CREATE TABLE d_certificado (
  id_certificado SERIAL PRIMARY KEY,
  nro_certificado INTEGER,
  anio_certificado VARCHAR,
  fecha_certificado DATE,
  nombre_certificado VARCHAR,
  tomo_certificado INTEGER,
  documento TEXT
);

-- Table: t_persona
CREATE TABLE t_persona (
  id_persona SERIAL PRIMARY KEY,
  nombres VARCHAR,
  ap_paterno VARCHAR,
  ap_materno VARCHAR,
  tipo_doc VARCHAR,
  documento VARCHAR,
  telefono VARCHAR,
  correo VARCHAR
);

-- Table: t_conductor
CREATE TABLE t_conductor (
  id_conductor SERIAL PRIMARY KEY,
  id_persona INTEGER,
  nro_licencia VARCHAR,
  id_empresa_servicio INTEGER,
  categoria VARCHAR
);

-- Table: t_usuario
CREATE TABLE t_usuario (
  id_usuario SERIAL PRIMARY KEY,
  nombre_usuario VARCHAR,
  rol VARCHAR,
  password VARCHAR,
  estado VARCHAR,
  id_persona INTEGER
);

-- Table: t_contrato_arrendamiento
CREATE TABLE t_contrato_arrendamiento (
  id_contrato SERIAL PRIMARY KEY,
  arrendador VARCHAR,
  dni VARCHAR,
  direccion VARCHAR,
  propiedad VARCHAR,
  distrito VARCHAR,
  provincia VARCHAR,
  departamento VARCHAR,
  fecha_inicio DATE,
  fecha_fin DATE,
  id_empresa_servicio INTEGER
);

-- Table: t_vehiculo
CREATE TABLE t_vehiculo (
  id_vehiculo SERIAL PRIMARY KEY,
  placa VARCHAR,
  nro_part_reg VARCHAR,
  modalidad VARCHAR,
  estado VARCHAR,
  carga FLOAT,
  peso FLOAT,
  categoria VARCHAR,
  anio_fabricacion VARCHAR,
  color VARCHAR,
  nro_chasis VARCHAR,
  nro_asientos VARCHAR,
  marca VARCHAR,
  modelo VARCHAR,
  serie VARCHAR,
  carroceria VARCHAR,
  id_empresa_servicio INTEGER,
  id_detalle_ruta_itinerario INTEGER,
  id_resolucion INTEGER,
  id_tuc INTEGER
);

-- Table: t_detalle_ruta_itinerario
CREATE TABLE t_detalle_ruta_itinerario (
  id_detalle_ruta_itinerario SERIAL PRIMARY KEY,
  origen VARCHAR,
  destino VARCHAR,
  corredor VARCHAR,
  itinerario TEXT,
  frecuencia VARCHAR,
  id_empresa_servicio INTEGER
);

-- Table: t_modelo
CREATE TABLE t_modelo (
  id_modelo SERIAL PRIMARY KEY,
  nombre_modelo VARCHAR,
  id_marca INTEGER
);

-- Table: t_infraestructura_resoluciones
CREATE TABLE t_infraestructura_resoluciones (
  id_infraestructura_resoluciones SERIAL PRIMARY KEY,
  id_infraestructura INTEGER,
  id_resolucion INTEGER
);

-- Table: t_infraestructura_certificados
CREATE TABLE t_infraestructura_certificados (
  id_infraestructura_certificados SERIAL PRIMARY KEY,
  id_infraestructura INTEGER,
  id_certificado INTEGER
);

-- Table: t_empresa_servicio_resoluciones
CREATE TABLE t_empresa_servicio_resoluciones (
  id_empresa_servicio_resoluciones SERIAL PRIMARY KEY,
  id_empresa_servicio INTEGER,
  id_resolucion INTEGER
);


-- RELACIONES

-- r1: un tipo de empresa a varios vehiculos
ALTER TABLE t_vehiculo
ADD CONSTRAINT fk_vehiculo_empresa_servicio
FOREIGN KEY (id_empresa_servicio) REFERENCES t_empresa_servicio (id_empresa_servicio);

-- r2: por una ruta pueden pasar varios vehiculos
ALTER TABLE t_vehiculo
ADD CONSTRAINT fk_vehiculo_detalle_ruta
FOREIGN KEY (id_detalle_ruta_itinerario) REFERENCES t_detalle_ruta_itinerario (id_detalle_ruta_itinerario);

-- r3: de contrato arrendamiento a empresa por servicio
ALTER TABLE t_contrato_arrendamiento
ADD CONSTRAINT fk_contrato_empresa_servicio
FOREIGN KEY (id_empresa_servicio) REFERENCES t_empresa_servicio (id_empresa_servicio);

-- r4: de id_empresa_servicio a t_detalle_ruta_itinerario
ALTER TABLE t_detalle_ruta_itinerario
ADD CONSTRAINT fk_detalle_ruta_empresa_servicio
FOREIGN KEY (id_empresa_servicio) REFERENCES t_empresa_servicio (id_empresa_servicio);

-- r5: de id_empresa_servicio a t_conductor
ALTER TABLE t_conductor
ADD CONSTRAINT fk_conductor_empresa_servicio
FOREIGN KEY (id_empresa_servicio) REFERENCES t_empresa_servicio (id_empresa_servicio);

-- r6: de tipo de servicio con una empresa (1:N)
ALTER TABLE t_empresa_servicio
ADD CONSTRAINT fk_empresa_servicio_tipo_servicio
FOREIGN KEY (id_tipo_servicio) REFERENCES d_tipo_servicio (id_tipo_servicio);

-- r7: de tipo de infraestructura a empresa (1:N)
ALTER TABLE t_infraestructura
ADD CONSTRAINT fk_infraestructura_tipo_infraestructura
FOREIGN KEY (id_tipo_infraestructura) REFERENCES d_tipo_infraestructura (id_tipo_infraestructura);

-- r8: una empresa por servicio tiene varias resoluciones
ALTER TABLE t_empresa_servicio_resoluciones
ADD CONSTRAINT fk_empresa_servicio_resolucion
FOREIGN KEY (id_empresa_servicio) REFERENCES t_empresa_servicio (id_empresa_servicio);

-- r9: una resolución puede estar en varias t_empresa_servicio_resoluciones
ALTER TABLE t_empresa_servicio_resoluciones
ADD CONSTRAINT fk_resolucion_empresa_servicio
FOREIGN KEY (id_resolucion) REFERENCES d_resolucion (id_resolucion);

-- r10: de las TUC's al historial de las empresas de servicio (1:N)
ALTER TABLE r_empre_histo_vehiculo
ADD CONSTRAINT fk_historial_empresa_servicio
FOREIGN KEY (id_empresa_servicio) REFERENCES t_empresa_servicio (id_empresa_servicio);

-- r11: de marca a modelo (1:N)
ALTER TABLE t_modelo
ADD CONSTRAINT fk_modelo_marca
FOREIGN KEY (id_marca) REFERENCES d_marca (id_marca);

-- r12: de conductor a persona
ALTER TABLE t_conductor
ADD CONSTRAINT fk_conductor_persona
FOREIGN KEY (id_persona) REFERENCES t_persona (id_persona);

-- r13: de usuario a persona
ALTER TABLE t_usuario
ADD CONSTRAINT fk_usuario_persona
FOREIGN KEY (id_persona) REFERENCES t_persona (id_persona);

-- r14: de empresa a su historial vehicular
ALTER TABLE r_empre_histo_vehiculo
ADD CONSTRAINT fk_historial_empresa
FOREIGN KEY (id_empresa_servicio) REFERENCES t_empresa_servicio (id_empresa_servicio);

-- r15: relación de una resolución con t_infraestructura_resoluciones
ALTER TABLE t_infraestructura_resoluciones
ADD CONSTRAINT fk_infraestructura_resolucion_resolucion
FOREIGN KEY (id_resolucion) REFERENCES d_resolucion (id_resolucion);

-- r16: de una infraestructura con t_infraestructura_resoluciones
ALTER TABLE t_infraestructura_resoluciones
ADD CONSTRAINT fk_infraestructura_resolucion_infraestructura
FOREIGN KEY (id_infraestructura) REFERENCES t_infraestructura (id_infraestructura);

-- r17: de un certificado con t_infraestructura_certificados
ALTER TABLE t_infraestructura_certificados
ADD CONSTRAINT fk_certificado_infraestructura_certificado
FOREIGN KEY (id_certificado) REFERENCES d_certificado (id_certificado);

-- r18: de un certificado a una infraestructura
ALTER TABLE t_infraestructura_certificados
ADD CONSTRAINT fk_certificado_infraestructura
FOREIGN KEY (id_infraestructura) REFERENCES t_infraestructura (id_infraestructura);

-- r19: de un representante legal de una empresa a una persona
ALTER TABLE t_empresa
ADD CONSTRAINT fk_empresa_representante_legal
FOREIGN KEY (id_representante_legal) REFERENCES t_persona (id_persona);

-- r20: de una empresa al tipo de servicio que pertenece
ALTER TABLE t_empresa_servicio
ADD CONSTRAINT fk_empresa_servicio_empresa
FOREIGN KEY (id_empresa) REFERENCES t_empresa (id_empresa);

-- r21: relación de una TUC con un vehículo (1:1)
ALTER TABLE t_vehiculo
ADD CONSTRAINT fk_vehiculo_tuc
FOREIGN KEY (id_tuc) REFERENCES t_tuc (id_tuc);

-- r22: relación de una resolución a varios vehículos (1:N)
ALTER TABLE t_vehiculo
ADD CONSTRAINT fk_vehiculo_resolucion
FOREIGN KEY (id_resolucion) REFERENCES d_resolucion (id_resolucion);

INSERT INTO d_tipo_servicio (denominacion) VALUES ('TRANSPORTE DE PERSONAS');
INSERT INTO d_tipo_servicio (denominacion) VALUES ('TRANSPORTE TURISTICO');
INSERT INTO d_tipo_servicio (denominacion) VALUES ('TRANSPORTE DE TRABAJADORES');
INSERT INTO d_tipo_servicio (denominacion) VALUES ('TRANSPORTE DE ESTUDIANTES');

INSERT INTO d_tipo_infraestructura (denominacion) VALUES ('TERMINAL TERRESTRE');
INSERT INTO d_tipo_infraestructura (denominacion) VALUES ('ESTACION DE RUTA TIPO I');
INSERT INTO d_tipo_infraestructura (denominacion) VALUES ('ESTACION DE RUTA TIPO II');
INSERT INTO d_tipo_infraestructura (denominacion) VALUES ('ESTACION DE RUTA TIPO III');

INSERT INTO t_persona (nombres) VALUES ('ADMIN');
INSERT INTO t_usuario (nombre_usuario, rol, password,estado,id_persona) VALUES ('ADMIN','ADMINISTRADOR','$2a$10$QkpvLZmaeeNqo8IjNmpb1OzDKhHezB4fLocqgm64S9nb7/t5agofa','ACTIVO',1);--123456

