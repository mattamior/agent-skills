# Next steps

1. Open and run CI on `feat/skill-gallery-cloudflare`; repair any repository-owned build or validation failure.
2. Add a trusted Cloudflare deployment workflow after the GitHub write safety boundary permits it. It must deploy the exact validated SHA, use protected `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID`, serialize production deploys, and verify `/health.json` externally.
3. Configure the two protected Cloudflare credentials in the GitHub `production` environment with least privilege; never store their values in the repository or chat.
4. Merge only after required CI passes, then deploy and record the observed Cloudflare endpoint and deployed revision.
5. Optionally add a custom domain after the `workers.dev` deployment is observed successfully.
