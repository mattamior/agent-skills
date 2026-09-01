# Current State

- Project: `mattamior/skills-hub`, a repository for developing and maintaining reusable Agent Skills for ChatGPT and Codex.
- Skills live under `skills/<skill-name>/` and use `SKILL.md` as their entry point.
- The currently documented reusable skill is `brand-design-system`.
- The public gallery is deployed with Cloudflare Workers at `skills-hub.mattamior.workers.dev`.
- Repository validation uses `./scripts/validate-skills.py`; GitHub Actions also checks skill compatibility and install behavior.
- Agnir Core `0.1` with discovery profile `repository-filesystem/0.1` is initialized, with colocated durable continuity under `.agnir/`.
