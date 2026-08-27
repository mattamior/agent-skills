# Next steps

1. In the GitHub `production` environment, configure protected `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID`. Scope the API token to the target Cloudflare account with only the Workers deployment permissions needed. Never store or paste either value in the repository or chat.
2. Confirm the final `validate` check passes on the current PR head, then merge PR #1 into `main`.
3. The successful `Validate skills` push run on `main` will trigger `.github/workflows/deploy.yml`, which checks out that exact validated SHA, serializes production deploys, deploys with Wrangler, and verifies `/health.json` externally.
4. Inspect the deployment run. Record the observed Cloudflare endpoint and deployed revision in `.chatgpt/state.yaml` only after `/health.json` reports `status: ok` and the exact deployed revision.
5. Optionally add a custom domain after the `workers.dev` deployment is observed successfully.
