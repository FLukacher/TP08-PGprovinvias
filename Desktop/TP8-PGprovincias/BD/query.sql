CREATE TABLE public.provincias (
    nombre character varying NOT NULL,
    orden integer NOT NULL,
    activo boolean NOT NULL,
    id integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY
);


INSERT INTO public.provincias (nombre, orden, activo) VALUES
('Buenos Aires', 1, true),
('Cordoba', 2, true),
('Santa Fe', 3, true),
('Mendoza', 4, true),
('Tucuman', 5, true),
('Entre Rios', 6, true),
('Salta', 7, true),
('Chaco', 8, true),
('Corrientes', 9, true),
('Misiones', 10, true),
('San Juan', 11, true),
('San Luis', 12, true),
('La Rioja', 13, true),
('Jujuy', 14, true),
('Neuquen', 15, true);