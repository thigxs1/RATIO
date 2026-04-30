-- 1. ADICIONAR NOVAS COLUNAS EM PROFILES
ALTER TABLE public.profiles
ADD COLUMN IF NOT EXISTS theme TEXT DEFAULT 'light',
ADD COLUMN IF NOT EXISTS color_hex TEXT DEFAULT '#0ea5e9',
ADD COLUMN IF NOT EXISTS status TEXT,
ADD COLUMN IF NOT EXISTS is_admin BOOLEAN DEFAULT FALSE;

-- 2. CRIAR O BUCKET DE STORAGE PARA AVATARES
INSERT INTO storage.buckets (id, name, public) 
VALUES ('avatars', 'avatars', true)
ON CONFLICT (id) DO NOTHING;

-- 3. POLÍTICAS DE SEGURANÇA (RLS) PARA O BUCKET 'avatars'
-- Permitir que qualquer um veja as fotos (para aparecer no perfil de todos)
CREATE POLICY "Avatar images are publicly accessible."
  ON storage.objects FOR SELECT
  USING ( bucket_id = 'avatars' );

-- Permitir que usuários autenticados façam upload do próprio avatar
CREATE POLICY "Users can upload their own avatars."
  ON storage.objects FOR INSERT
  WITH CHECK ( bucket_id = 'avatars' AND auth.uid() = owner );

-- Permitir que usuários autenticados atualizem o próprio avatar
CREATE POLICY "Users can update their own avatars."
  ON storage.objects FOR UPDATE
  WITH CHECK ( bucket_id = 'avatars' AND auth.uid() = owner );
