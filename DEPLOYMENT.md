# AfroNova production configuration

Set these values in your hosting provider's production environment settings. Do not commit credentials to the repository.

| Variable | Required | Source |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Yes | `https://afronova.org` |
| `NEXT_PUBLIC_SUPABASE_URL` | Yes | Supabase project Settings → API |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Yes | Supabase project Settings → API |
| `SUPABASE_SERVICE_ROLE_KEY` | Yes | Supabase project Settings → API; server-only |
| `RESEND_API_KEY` | Yes | Resend API Keys |
| `RESEND_FROM_EMAIL` | Yes | A verified Resend sending address |
| `RESEND_FROM_NAME` | Yes | `AfroNova` |
| `CONTACT_TO_EMAIL` | Yes | Inbox for contact submissions |
| `HEALTHCHECK_TOKEN` | Recommended | A long random secret |
| `MAILCHIMP_API_KEY` | Optional | Mailchimp API key |
| `MAILCHIMP_AUDIENCE_ID` | Optional | Mailchimp audience settings |
| `MAILCHIMP_DC` | Optional | Mailchimp key data-centre suffix |

## Database

1. Run `supabase/migrations/001_initial_schema.sql` in a new Supabase project.
2. If the previous portal schema was already applied, run `supabase/migrations/002_remove_application_portal.sql` too.
3. Confirm RLS is enabled on `contact_submissions` and `newsletter_subscribers`.

## Verification after deployment

1. Submit one contact form using a controlled inbox; verify the Supabase row and both emails.
2. Subscribe a controlled address; verify the database row, welcome email, and optional Mailchimp sync.
3. Request `/api/health` with `Authorization: Bearer <HEALTHCHECK_TOKEN>`; expect `{"status":"healthy"}`.
