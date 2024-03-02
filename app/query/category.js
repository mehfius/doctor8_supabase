
CREATE TABLE public.category (
    "id" bigint NOT NULL,
    "created_as" timestamp without time zone DEFAULT now(),
    "a" boolean DEFAULT true,
    "d" boolean DEFAULT false,
    "url" text NOT NULL DEFAULT extensions.uuid_generate_v4(),
    "label" text NOT NULL DEFAULT extensions.uuid_generate_v4(),
    "colors" text 


);

ALTER TABLE public.category ALTER COLUMN id ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public.category_id_seq1
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);

ALTER TABLE ONLY public.category
    ADD CONSTRAINT category_pkey PRIMARY KEY (id);