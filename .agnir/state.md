# Current State

- Project: `mattamior/skills-hub`, a repository for developing and maintaining reusable Agent Skills for ChatGPT and Codex.
- Skills live under `skills/<skill-name>/` and use `SKILL.md` as their entry point.
- The currently documented reusable skills are `brand-design-system` and `pet-avatar-generation`.
- The public gallery is deployed with Cloudflare Pages at `https://skills-hub-ea7.pages.dev/`; the superseded `skills-hub` Cloudflare Worker has been retired after Pages acceptance.
- Repository validation uses `./scripts/validate-skills.py`; GitHub Actions also checks skill compatibility and install behavior before deploying the validated revision to Cloudflare Pages.
- Agnir Core `0.1` with discovery profile `repository-filesystem/0.1` is initialized, with colocated durable continuity under `.agnir/`.
