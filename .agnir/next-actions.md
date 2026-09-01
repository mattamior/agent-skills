# Next Actions

- Cloudflare Pages migration is blocked by the current GitHub Actions `CLOUDFLARE_API_TOKEN`: the Pages project probe returned HTTP 403 / Cloudflare error 10000. The existing Worker remains active and must not be deleted before Pages acceptance.
- Grant the existing Cloudflare token Account → Cloudflare Pages → Edit for the account used by `CLOUDFLARE_ACCOUNT_ID`, or replace the GitHub Actions secret with a token that has both Cloudflare Pages Edit and Workers Scripts Write.
- After Pages access is authorized, run `Deploy gallery` for the current `main` revision. Migration is complete only after the immutable Pages deployment and production URL pass health/content acceptance, the old `skills-hub` Worker is verified deleted, and Pages remains healthy afterward.
- After successful migration, remove Worker-only deployment configuration and fallback logic, then update public documentation and Agnir current state to the verified Pages production URL.
