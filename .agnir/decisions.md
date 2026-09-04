# Decisions

- Keep each reusable skill independent under `skills/<skill-name>/` with `SKILL.md` as the entry point.
- Keep formal public documentation synchronized between English and Chinese.
- Do not commit credentials, user data, generated caches, virtual environments, or local installation links.
- Use Agnir `repository-filesystem/0.1` with project-owned continuity memory under `.agnir/` and repository `main` as the authoritative ref.
- Host the public skill gallery on Cloudflare Pages and deploy only revisions that have passed the repository validation workflow; the previous `skills-hub` Cloudflare Worker was retired after Pages acceptance and post-retirement health verification.
- Generate public catalog metadata and per-skill detail pages from each skill's `SKILL.md` and `agents/openai.yaml`; do not hand-maintain duplicate skill descriptions, invocation prompts, or source provenance in site code.
