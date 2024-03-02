
CREATE TABLE public.users_pessoal (
    "id" bigint NOT NULL,
    "created_at" timestamp without time zone DEFAULT now()


);

ALTER TABLE public.users_pessoal ALTER COLUMN id ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public.users_pessoal_id_seq1
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);

ALTER TABLE ONLY public.users_pessoal
    ADD CONSTRAINT users_pessoal_pkey PRIMARY KEY (id);