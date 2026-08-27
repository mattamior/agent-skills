# Next steps

1. The gallery is deployed and observed successfully at `https://mattamior-agent-skills.mattamior.workers.dev`; no required delivery blocker remains.
2. Future changes merged to `main` will run `Validate skills`; successful push validation triggers the trusted production workflow for that exact immutable SHA and verifies `/health.json` externally.
3. Optionally add a custom domain and record the route/domain evidence only after the custom endpoint is externally verified.
4. Optionally expand the gallery as additional `skills/*/SKILL.md` entries are added; the catalog remains repository-derived and requires no second registry.
