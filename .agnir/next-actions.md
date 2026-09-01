# Next Actions

- A new Cloudflare API token named `pages-worker-edit` has been created for the Pages migration. Verify it is the value stored in the GitHub Actions secret `CLOUDFLARE_API_TOKEN` and that it grants Cloudflare Pages Edit plus Workers Scripts Write for the account used by `CLOUDFLARE_ACCOUNT_ID`.
- Run the current `main` deployment path and verify the Cloudflare Pages project probe no longer returns HTTP 403 / Cloudflare error 10000. The existing Worker must remain active until Pages acceptance succeeds.
- Migration is complete only after the immutable Pages deployment and production URL pass health/content acceptance, the old `skills-hub` Worker is verified deleted, and Pages remains healthy afterward.
- After successful migration, remove Worker-only deployment configuration and fallback logic, then update public documentation and Agnir current state to the verified Pages production URL.
