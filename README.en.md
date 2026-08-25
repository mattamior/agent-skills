# Agent Skills

This is `mattamior`'s collection for developing and maintaining reusable Agent Skills for ChatGPT and Codex. Each skill lives independently under `skills/<skill-name>/` and uses `SKILL.md` as its entry point.

## Skills

| Skill | Purpose |
| --- | --- |
| [`brand-design-system`](skills/brand-design-system/SKILL.md) | Move from brand exploration, process records, and master approval to production assets, web integration, and visual acceptance. |

## Install

Codex discovers user-level skills from `$HOME/.agents/skills`. This repository uses symbolic links so installed skills stay aligned with their source:

```bash
git clone https://github.com/mattamior/agent-skills.git
cd agent-skills
./scripts/link-skills.sh --check brand-design-system
./scripts/link-skills.sh brand-design-system
```

With no skill arguments, the script processes every skill in the repository. Use `--target DIR` for another installation directory. It never overwrites an existing file or a symbolic link that points elsewhere.

## Use

Invoke `$brand-design-system` explicitly, or let ChatGPT or Codex select it for brand identity, logo-system, production brand-asset, or brand implementation review work.

## Develop and validate

When adding or changing a skill:

1. Put it in `skills/<skill-name>/` and keep the directory name equal to the `name` in `SKILL.md`.
2. Keep shared workflow and essential constraints in `SKILL.md`; put conditional detail in `references/` and output templates in `assets/`.
3. Keep `agents/openai.yaml` aligned and include `$<skill-name>` explicitly in its default prompt.
4. Run repository validation:

```bash
./scripts/validate-skills.py
```

GitHub Actions also validates specification compatibility with a pinned Agent Skills `skills-ref` revision and exercises the install script's check, install, idempotency, and collision-rejection paths.

For material routing changes, review the scenarios in [`tests/brand-design-system-trigger-cases.md`](tests/brand-design-system-trigger-cases.md).

Keep formal user documentation synchronized between `README.zh.md` and `README.en.md`. The initial release distributes standalone skills only; it does not package a plugin or publish a GitHub Release.

## License

[Apache License 2.0](LICENSE)
