-- The exhibitor, vendor, and sponsor portal was removed from the website.
-- Apply this migration to existing Supabase projects that ran 001 previously.

drop view if exists public.v_new_applications;
drop table if exists public.application_submissions;
