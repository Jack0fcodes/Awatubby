# Awatubby gallery admin setup

The admin page is published at:

https://jack0fcodes.github.io/Awatubby/admin.html

## 1. Add the authorized email address

In Supabase, open the **Awatabby_Portfolio** project → **SQL Editor** → **New query**. Run this SQL, replacing the example email with the email address your friend will use to sign in:

```sql
insert into public.gallery_admins (email)
values (lower('FRIEND_EMAIL@example.com'))
on conflict (email) do nothing;
```

Add your own email as well if you want admin access. Only email addresses in this allowlist can manage artwork.

## 2. Set the sign-in redirect

In Supabase → **Authentication** → **URL Configuration**:

- Site URL: `https://jack0fcodes.github.io/Awatubby`
- Add this Redirect URL: `https://jack0fcodes.github.io/Awatubby/admin.html`

Use the email magic-link login on the admin page. No database password is needed for your friend.

## 3. What is already configured

- `gallery_items` table stores artwork metadata, category, order, draft/published status.
- `portfolio-artwork` Storage bucket stores images, GIFs, and MP4s.
- Row Level Security policies restrict changes to allowlisted admin emails.
- The public portfolio reads only published items.
- Admin page supports upload, draft save, edit, publish/unpublish, reorder, and delete.

## Security note

The website uses the Supabase **publishable** key in the browser, which is expected for a public frontend. Never put the database password, service-role key, or secret API keys into GitHub or this page.
