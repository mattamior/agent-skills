# Brand Design Workflow

An Apache-2.0 licensed Codex skill for moving from a brand concept to an approved, production-ready identity system.

## Included skill

[`brand-design-system`](brand-design-system/SKILL.md) supports:

- exploring distinct, vector-friendly logo directions;
- preserving an approved master through refinement and asset generation;
- producing only the SVG, PNG, favicon, PWA, and social assets a delivery needs;
- optionally integrating approved assets into a website; and
- validating rendered transparency, proportions, small-size readability, and delivered favicon/manifest paths.

It deliberately does not prescribe a visual style, palette, language, or brand name. Similarity observations are not trademark clearance or legal advice.

## Install

Copy or symlink [`brand-design-system`](brand-design-system) into your Codex skills directory:

```bash
git clone https://github.com/mattamior/brand-design-workflow.git
ln -s "$(pwd)/brand-design-workflow/brand-design-system" "$CODEX_HOME/skills/brand-design-system"
```

If `CODEX_HOME` is unset, use `~/.codex/skills/brand-design-system`.

## Use

Invoke `$brand-design-system` explicitly, or let Codex select it for brand identity, logo-system, production brand-asset, or brand web-integration work.

Provide the brand name, audience, intended surfaces, existing assets or approved design, and any required language, palette, or delivery constraints. The skill asks for decisions only when they materially change the resulting identity or asset pack.

## Scope boundary

Production assets are based on an approved design master. Image generation is useful during concept exploration, but editable SVG/vector construction is preferred for final logos. Legal clearance remains a separate professional process.
