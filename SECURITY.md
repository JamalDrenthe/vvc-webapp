# Security Policy — VVC Webapp (`vvc-webapp`)

## Ondersteunde Versies
Alleen de actuele productie-branch (`main`) wordt actief ondersteund met beveiligingsupdates.

## Kwetsbaarheden Melden (Responsible Disclosure)
Meld beveiligingsproblemen **nooit** via publieke GitHub Issues. Neem direct vertrouwelijk contact op via:
- **Security Contact:** `info@jamaldrenthe.com`
- **Onderwerp:** `[SECURITY][VVC-WEBAPP] Beschrijving kwetsbaarheid`

## Herstel-SLA Baseline
- **P0 (Critical):** 24 – 48 uur
- **P1 (High):** 7 dagen
- **P2 (Medium):** 30 dagen
- **P3 (Low):** 90 dagen

## Architecturale Beveiligingseisen
- AI-verzoeken lopen uitsluitend server-side via Cloudflare Pages Functions (`/api/chat`) met `GEMINI_API_KEY` als encrypted secret.
- Geen API-sleutels of geheimen in client-side bundels (`VITE_*` / browser storage).
- Strikte HTTP security headers (HSTS preload, CSP, `X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`) worden afgedwongen via `public/_headers`.
