# Next steps

1. The gallery is deployed and observed successfully at `https://agent-skills.mattamior.workers.dev`; this is the canonical production endpoint.
2. Future changes merged to `main` will run `Validate skills`; successful push validation triggers the trusted production workflow for that exact immutable SHA and verifies `/health.json` externally.
3. The previous `https://mattamior-agent-skills.mattamior.workers.dev` Worker still exists because renaming the Wrangler `name` creates/deploys the new Worker rather than deleting the old one. Remove it separately only if cleanup is desired.
4. Optionally expand the gallery as additional `skills/*/SKILL.md` entries are added; the catalog remains repository-derived and requires no second registry.
