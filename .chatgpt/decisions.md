# Durable decisions

## Repository-derived catalog

The website treats `skills/*/SKILL.md` as the catalog source of truth. The build step extracts frontmatter and body content into `dist/skills.json`; no second hand-maintained skill registry is introduced.

## Minimal static architecture

The first gallery release uses dependency-light static HTML, CSS, and browser JavaScript. A Node build step creates deployable assets. This keeps the site proportional to the repository's current size and makes new skills appear automatically after validation and deployment.

## Cloudflare target

Use Cloudflare Workers Static Assets with `wrangler.jsonc`, rather than deprecated Workers Sites. Production must be delivered remotely from an immutable revision and externally observed after deployment.

## ZeroLocal trust boundary

Cloudflare credential values remain outside repository and chat. The expected protected names are `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID`. Production deployment automation must not expose them to pull-request validation.
