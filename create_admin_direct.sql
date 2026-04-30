-- Garante que a extensão pgcrypto está ativa para criar o hash da senha
CREATE EXTENSION IF NOT EXISTS pgcrypto;

DO $$ 
DECLARE
    new_user_id UUID := gen_random_uuid();
BEGIN
    -- 1. Insere o usuário na tabela de Autenticação do Supabase
    INSERT INTO auth.users (
        id,
        instance_id,
        aud,
        role,
        email,
        encrypted_password,
        email_confirmed_at,
        created_at,
        updated_at,
        confirmation_token,
        email_change_token_new,
        recovery_token,
        raw_user_meta_data
    ) VALUES (
        new_user_id,
        '00000000-0000-0000-0000-000000000000',
        'authenticated',
        'authenticated',
        'administrador@rathigas.com',
        crypt('Tde.Cyp7', gen_salt('bf')), -- Aqui a senha é criptografada
        now(),
        now(),
        now(),
        '',
        '',
        '',
        '{"full_name": "Administrador Global"}'::jsonb
    );

    -- 2. Insere a identidade de e-mail (Exigência do Supabase Auth)
    INSERT INTO auth.identities (
        id,
        user_id,
        provider_id,
        identity_data,
        provider,
        created_at,
        updated_at
    ) VALUES (
        new_user_id,
        new_user_id,
        new_user_id::text,
        jsonb_build_object('sub', new_user_id::text, 'email', 'administrador@rathigas.com'),
        'email',
        now(),
        now()
    );

    -- 3. Como a TRIGGER que criamos antes já gerou o perfil, a gente só atualiza ele para virar Admin
    UPDATE public.profiles
    SET is_admin = true
    WHERE id = new_user_id;

END $$;
