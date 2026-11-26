# EnumConnect API contract: auth v2 (draft for frontend review)

All endpoints are on the same origin as the web app. Send JSON with `Content-Type: application/json`. The session is an HTTP-only cookie set by the backend: do not read or store it, and do not store tokens anywhere in the browser.

Responses are never cached (`Cache-Control: no-store` on private data).

## Error shape

| Status | Body | When |
|---|---|---|
| 400 | `{ "error": "Invalid input", "fields": { "<field>": "<message>" } }` | A field failed validation. Show each message under its input. |
| 401 | `{ "error": "..." }` | Not signed in, wrong login, or wrong/expired code. Messages are deliberately generic. |
| 429 | `{ "error": "..." }` | Too many attempts. Disable the button and show a wait message. |
| 404 | `{ "error": "Not found" }` | Does not exist **or** you may not see it (we do not say which). |

## Password rule

At least 8 characters, at most 72, including at least one number (matches the Figma hint). Field key: `password`.

## Sign-up and verification flow (recommended)

1. **Create account**: `POST /api/auth/signup`
2. **Verify email**: type the code (`POST /api/auth/verify-email`) or click the link in the email (`GET /auth/confirm`, opened by the user). Either one signs the user in.
3. **Verify phone** (signed in): `POST /api/auth/phone/send`, then `POST /api/auth/phone/verify`.
4. **Profile / onboarding**: state, LGA, institution, skills and the rest (endpoints coming with M2).

Why this order: phone codes can only be sent to a signed-in user with a verified email. That keeps SMS cost and abuse under control and uses Supabase's built-in checks. The form can still be one page; the frontend holds phone, state and LGA until the later steps.

## Endpoints

### `POST /api/auth/signup`
Body:
```json
{ "email": "a@b.com", "password": "abcd1234", "role": "enumerator",
  "fullName": "Ibrahim Musa", "acceptedTerms": true }
```
- `role`: `"researcher"` or `"enumerator"` only.
- `acceptedTerms` must be `true`.
- `captchaToken` (optional): required only once CAPTCHA is enabled.
- Phone, state and LGA are **not** accepted here.

`201 { "message": "Check your email to confirm your account." }`
`400` with `fields`. `429` when rate limited.

### `POST /api/auth/verify-email`
Body: `{ "email": "a@b.com", "code": "123456" }`
`200 { "ok": true }`: signed in (session cookie set).
`400` bad code format. `401` wrong or expired code.

### `POST /api/auth/resend-email`
Body: `{ "email": "a@b.com" }`
`200` always, with a neutral message (it does not reveal whether the account exists). `429` if requested too soon.

### `GET /auth/confirm?token_hash=...&type=email&next=/onboarding`
Opened from the email link. On success the user is signed in and redirected to `next` (a path on this site only). On failure the user is redirected to `/login?error=confirmation_failed`. The frontend needs a `/login` page that reads that error, and the page `next` points to.

### `POST /api/auth/login`
Body: `{ "email": "...", "password": "..." }`
`200 { "ok": true }` (session cookie set). `401 { "error": "Invalid credentials" }` for every failure, including unverified email.

### `POST /api/auth/logout`
`200 { "ok": true }`

### `POST /api/auth/phone/send` (signed in)
Body: `{ "phone": "0801 234 5678" }`. Any common Nigerian format is accepted; it is normalised to `+2348012345678`. `400` with `fields.phone` if it does not look like a Nigerian mobile number.
`200 { "message": "Code sent" }`. `401` if not signed in. `429` if too soon. Also used for "Resend code".

### `POST /api/auth/phone/verify` (signed in)
Body: `{ "phone": "+2348012345678", "code": "123456" }` (6 digits).
`200 { "ok": true }`. `401` wrong or expired code.

### `GET /api/me` (signed in)
```json
{
  "profile": { "id": "...", "role": "enumerator", "account_status": "active", "full_name": "Ibrahim Musa" },
  "phone": "+2348012345678",
  "verification": { "email": true, "phone": false }
}
```
Use `verification` to decide which onboarding step to show after a refresh or a later login. `401` if not signed in.

## Not built yet

- SMS provider (phone endpoints return an error until one is configured in Supabase).
- Forgot / reset password.
- Profile completion endpoints (state, LGA, institution, skills, ID upload), training, projects.
- Rate limiting beyond Supabase's built-in limits, and CAPTCHA.
