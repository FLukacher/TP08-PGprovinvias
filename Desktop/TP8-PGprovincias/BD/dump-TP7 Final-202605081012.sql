--
-- PostgreSQL database dump
--

-- Dumped from database version 16.2
-- Dumped by pg_dump version 16.2

-- Started on 2026-05-08 10:12:41

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 4826 (class 1262 OID 16447)
-- Name: TP7 Final; Type: DATABASE; Schema: -; Owner: postgres
--

CREATE DATABASE "TP7 Final" WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'Spanish_Argentina.1252';


ALTER DATABASE "TP7 Final" OWNER TO postgres;

\connect -reuse-previous=on "dbname='TP7 Final'"

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 216 (class 1259 OID 16451)
-- Name: beneficios; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.beneficios (
    nombre character varying NOT NULL,
    id_comercio integer NOT NULL,
    descripcion_corta character varying NOT NULL,
    column1 character varying,
    descuento integer NOT NULL,
    activo boolean NOT NULL,
    id integer NOT NULL
);


ALTER TABLE public.beneficios OWNER TO postgres;

--
-- TOC entry 215 (class 1259 OID 16448)
-- Name: beneficios_usuarios; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.beneficios_usuarios (
    id_beneficio integer NOT NULL,
    id_usuario integer NOT NULL,
    fecha date NOT NULL,
    id integer NOT NULL
);


ALTER TABLE public.beneficios_usuarios OWNER TO postgres;

--
-- TOC entry 220 (class 1259 OID 16471)
-- Name: beneficios_usuarios_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.beneficios_usuarios ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.beneficios_usuarios_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 221 (class 1259 OID 16477)
-- Name: benficios_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.beneficios ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.benficios_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 217 (class 1259 OID 16456)
-- Name: comercios; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.comercios (
    nombre character varying NOT NULL,
    descripcion character varying NOT NULL,
    telefono_principal character varying NOT NULL,
    comercio_datoscontacto character varying NOT NULL,
    url character varying NOT NULL,
    email character varying NOT NULL,
    activo boolean NOT NULL,
    id integer NOT NULL
);


ALTER TABLE public.comercios OWNER TO postgres;

--
-- TOC entry 222 (class 1259 OID 16485)
-- Name: comercios_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.comercios ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.comercios_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 218 (class 1259 OID 16461)
-- Name: provincias; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.provincias (
    nombre character varying NOT NULL,
    orden integer NOT NULL,
    activo boolean NOT NULL,
    id integer NOT NULL
);


ALTER TABLE public.provincias OWNER TO postgres;

--
-- TOC entry 224 (class 1259 OID 16506)
-- Name: provincias_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.provincias ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.provincias_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 219 (class 1259 OID 16466)
-- Name: usuarios; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.usuarios (
    nombre character varying NOT NULL,
    apellido character varying NOT NULL,
    fecha_nacimiento date NOT NULL,
    id_provincia integer NOT NULL,
    id integer NOT NULL
);


ALTER TABLE public.usuarios OWNER TO postgres;

--
-- TOC entry 223 (class 1259 OID 16498)
-- Name: usuarios_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.usuarios ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.usuarios_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 4812 (class 0 OID 16451)
-- Dependencies: 216
-- Data for Name: beneficios; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.beneficios OVERRIDING SYSTEM VALUE VALUES ('2x1 Hamburguesas', 1, 'Promo combo', NULL, 50, true, 1);
INSERT INTO public.beneficios OVERRIDING SYSTEM VALUE VALUES ('Cafe Gratis', 3, 'Cafe mediano', NULL, 100, true, 2);
INSERT INTO public.beneficios OVERRIDING SYSTEM VALUE VALUES ('20 OFF Zapatillas', 4, 'Descuento en running', NULL, 20, true, 3);
INSERT INTO public.beneficios OVERRIDING SYSTEM VALUE VALUES ('15 OFF Combo', 2, 'Combo clasico', NULL, 15, true, 4);
INSERT INTO public.beneficios OVERRIDING SYSTEM VALUE VALUES ('10 OFF Remeras', 5, 'Indumentaria', NULL, 10, false, 5);
INSERT INTO public.beneficios OVERRIDING SYSTEM VALUE VALUES ('30 OFF Delivery', 1, 'Pedidos online', NULL, 30, true, 6);


--
-- TOC entry 4811 (class 0 OID 16448)
-- Dependencies: 215
-- Data for Name: beneficios_usuarios; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.beneficios_usuarios OVERRIDING SYSTEM VALUE VALUES (1, 1, '2025-05-01', 1);
INSERT INTO public.beneficios_usuarios OVERRIDING SYSTEM VALUE VALUES (2, 2, '2025-05-02', 2);
INSERT INTO public.beneficios_usuarios OVERRIDING SYSTEM VALUE VALUES (3, 3, '2025-05-03', 3);
INSERT INTO public.beneficios_usuarios OVERRIDING SYSTEM VALUE VALUES (1, 4, '2025-05-04', 4);
INSERT INTO public.beneficios_usuarios OVERRIDING SYSTEM VALUE VALUES (4, 5, '2025-05-05', 5);
INSERT INTO public.beneficios_usuarios OVERRIDING SYSTEM VALUE VALUES (6, 1, '2025-05-06', 6);
INSERT INTO public.beneficios_usuarios OVERRIDING SYSTEM VALUE VALUES (2, 6, '2025-05-07', 7);
INSERT INTO public.beneficios_usuarios OVERRIDING SYSTEM VALUE VALUES (3, 7, '2025-05-08', 8);


--
-- TOC entry 4813 (class 0 OID 16456)
-- Dependencies: 217
-- Data for Name: comercios; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.comercios OVERRIDING SYSTEM VALUE VALUES ('McDonalds', 'Comida rapida', '111111111', 'Instagram', 'https://mcdonalds.com', 'mc@mcdonalds.com', true, 1);
INSERT INTO public.comercios OVERRIDING SYSTEM VALUE VALUES ('Burger King', 'Hamburguesas', '222222222', 'Whatsapp', 'https://burgerking.com', 'bk@burgerking.com', true, 2);
INSERT INTO public.comercios OVERRIDING SYSTEM VALUE VALUES ('Starbucks', 'Cafe', '333333333', 'Instagram', 'https://starbucks.com', 'sb@starbucks.com', true, 3);
INSERT INTO public.comercios OVERRIDING SYSTEM VALUE VALUES ('Nike', 'Indumentaria deportiva', '444444444', 'Mail', 'https://nike.com', 'nike@nike.com', true, 4);
INSERT INTO public.comercios OVERRIDING SYSTEM VALUE VALUES ('Adidas', 'Ropa deportiva', '555555555', 'Mail', 'https://adidas.com', 'adidas@adidas.com', false, 5);


--
-- TOC entry 4814 (class 0 OID 16461)
-- Dependencies: 218
-- Data for Name: provincias; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.provincias OVERRIDING SYSTEM VALUE VALUES ('Buenos Aires', 1, true, 1);
INSERT INTO public.provincias OVERRIDING SYSTEM VALUE VALUES ('Cordoba', 2, true, 2);
INSERT INTO public.provincias OVERRIDING SYSTEM VALUE VALUES ('Santa Fe', 3, true, 3);
INSERT INTO public.provincias OVERRIDING SYSTEM VALUE VALUES ('Mendoza', 4, true, 4);
INSERT INTO public.provincias OVERRIDING SYSTEM VALUE VALUES ('Tucuman', 5, true, 5);


--
-- TOC entry 4815 (class 0 OID 16466)
-- Dependencies: 219
-- Data for Name: usuarios; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.usuarios OVERRIDING SYSTEM VALUE VALUES ('Juan', 'Gomez', '1999-05-10', 1, 1);
INSERT INTO public.usuarios OVERRIDING SYSTEM VALUE VALUES ('Lucia', 'Fernandez', '2001-08-22', 2, 2);
INSERT INTO public.usuarios OVERRIDING SYSTEM VALUE VALUES ('Martin', 'Ruiz', '1995-11-03', 3, 3);
INSERT INTO public.usuarios OVERRIDING SYSTEM VALUE VALUES ('Sofia', 'Gonzalez', '2000-01-15', 1, 4);
INSERT INTO public.usuarios OVERRIDING SYSTEM VALUE VALUES ('Tomas', 'Perez', '1998-07-09', 4, 5);
INSERT INTO public.usuarios OVERRIDING SYSTEM VALUE VALUES ('Valentina', 'Lopez', '2002-12-01', 5, 6);
INSERT INTO public.usuarios OVERRIDING SYSTEM VALUE VALUES ('Mateo', 'Diaz', '1997-04-19', 2, 7);
INSERT INTO public.usuarios OVERRIDING SYSTEM VALUE VALUES ('Camila', 'Sosa', '2003-09-25', 3, 8);


--
-- TOC entry 4827 (class 0 OID 0)
-- Dependencies: 220
-- Name: beneficios_usuarios_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.beneficios_usuarios_id_seq', 8, true);


--
-- TOC entry 4828 (class 0 OID 0)
-- Dependencies: 221
-- Name: benficios_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.benficios_id_seq', 6, true);


--
-- TOC entry 4829 (class 0 OID 0)
-- Dependencies: 222
-- Name: comercios_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.comercios_id_seq', 5, true);


--
-- TOC entry 4830 (class 0 OID 0)
-- Dependencies: 224
-- Name: provincias_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.provincias_id_seq', 5, true);


--
-- TOC entry 4831 (class 0 OID 0)
-- Dependencies: 223
-- Name: usuarios_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.usuarios_id_seq', 8, true);


--
-- TOC entry 4655 (class 2606 OID 16476)
-- Name: beneficios_usuarios beneficios_usuarios_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.beneficios_usuarios
    ADD CONSTRAINT beneficios_usuarios_pk PRIMARY KEY (id);


--
-- TOC entry 4657 (class 2606 OID 16484)
-- Name: beneficios benficios_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.beneficios
    ADD CONSTRAINT benficios_pk PRIMARY KEY (id);


--
-- TOC entry 4659 (class 2606 OID 16492)
-- Name: comercios comercios_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.comercios
    ADD CONSTRAINT comercios_pk PRIMARY KEY (id);


--
-- TOC entry 4661 (class 2606 OID 16513)
-- Name: provincias provincias_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.provincias
    ADD CONSTRAINT provincias_pk PRIMARY KEY (id);


--
-- TOC entry 4663 (class 2606 OID 16505)
-- Name: usuarios usuarios_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuarios
    ADD CONSTRAINT usuarios_pk PRIMARY KEY (id);


--
-- TOC entry 4664 (class 2606 OID 16493)
-- Name: beneficios_usuarios beneficios_usuarios_benficios_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.beneficios_usuarios
    ADD CONSTRAINT beneficios_usuarios_benficios_fk FOREIGN KEY (id_beneficio) REFERENCES public.beneficios(id);


--
-- TOC entry 4665 (class 2606 OID 16520)
-- Name: beneficios_usuarios beneficios_usuarios_usuarios_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.beneficios_usuarios
    ADD CONSTRAINT beneficios_usuarios_usuarios_fk FOREIGN KEY (id_usuario) REFERENCES public.usuarios(id);


--
-- TOC entry 4666 (class 2606 OID 16515)
-- Name: beneficios benficios_comercios_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.beneficios
    ADD CONSTRAINT benficios_comercios_fk FOREIGN KEY (id_comercio) REFERENCES public.comercios(id);


--
-- TOC entry 4667 (class 2606 OID 16525)
-- Name: usuarios usuarios_provincias_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuarios
    ADD CONSTRAINT usuarios_provincias_fk FOREIGN KEY (id_provincia) REFERENCES public.provincias(id);


-- Completed on 2026-05-08 10:12:42

--
-- PostgreSQL database dump complete
--

