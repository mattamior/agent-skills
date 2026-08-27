# Durable decisions

## Repository-derived catalog

The website treats `skills/*/SKILL.md` as the catalog source of truth. The build step extracts frontmatter and body content into `dist/skills.json`; no second hand-maintained skill registry is introduced.

## Minimal static architecture

The first gallery release uses dependency-light static HTML, CSS, and browser JavaScript. A Node build step creates deployable assets. This keeps the site proportional to the repository's current size and makes new skills appear automatically after validation and deployment.

## Cloudflare target

Use Cloudflare Workers Static Assets with `wrangler.jsonc`, rather than deprecated Workers Sites. Production must be delivered remotely from an immutable revision and externally observed after deployment.

## ZeroLocal trust boundary

Cloudflare credential values remain outside repository and chat. The expected protected names are `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID`. Production deployment automation must not expose them to pull-request validation.

## Trusted deployment gate

Production delivery is implemented in `.github/workflows/deploy.yml`. Automatic production deploys are triggered only by a successful `Validate skills` workflow caused by a push to `main`, then check out `workflow_run.head_sha` rather than a moving branch. Deploys use the GitHub `production` environment, are serialized with a production concurrency group, and are considered observed only when the externally fetched `/health.json` reports `status: ok` and the exact deployed revision. Manual recovery accepts only a full immutable SHA reachable from `main` and re-validates it remotely before deployment.

## Wrangler v4 for assets-only deployment

Use `cloudflare/wrangler-action@v4` and explicitly select Wrangler major version 4 for production deployment. The first production attempt exposed that wrangler-action v3 could install Wrangler 3.90.0 when no local package was present; Wrangler 3 rejected the assets-only configuration with `Missing entry-point`. The v4 action installed Wrangler 4.126.0 and successfully deployed the static assets configuration.
