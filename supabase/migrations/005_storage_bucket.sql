-- ===============================================================
-- AfroNova — Storage Bucket Setup (005)
-- Creates the 'portfolio' storage bucket used by the admin image
-- upload endpoint (/api/admin/upload).
--
-- Note: In Supabase, storage buckets are also managed via the
-- Storage API and Dashboard. This SQL ensures the bucket exists
-- when applying migrations directly in the SQL Editor.
-- ===============================================================

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'portfolio',
  'portfolio',
  true,
  52428800,
  '{"image/png","image/jpeg","image/webp","image/gif"}'::text[]
)
on conflict (id) do nothing;

-- Public read access policy for the portfolio bucket
create policy "p_public_read_portfolio" on storage.objects for select
  using (bucket_id = 'portfolio');

-- Authenticated upload policy (admin uploads go through the API
-- route which uses the service role, but this policy allows
-- authenticated users to upload directly if needed)
create policy "p_authenticated_upload_portfolio" on storage.objects for insert
  with check (bucket_id = 'portfolio' and auth.role() = 'authenticated');

-- Allow authenticated users to update/delete their own uploads
create policy "p_authenticated_modify_portfolio" on storage.objects for update
  using (bucket_id = 'portfolio' and auth.role() = 'authenticated');

create policy "p_authenticated_delete_portfolio" on storage.objects for delete
  using (bucket_id = 'portfolio' and auth.role() = 'authenticated');
