#!/usr/bin/env python3
"""Validate repository-specific Agent Skill invariants without external dependencies."""

from __future__ import annotations

import re
import sys
from pathlib import Path


REPOSITORY_ROOT = Path(__file__).resolve().parents[1]
SKILLS_ROOT = REPOSITORY_ROOT / "skills"
NAME_PATTERN = re.compile(r"^[a-z0-9]+(?:-[a-z0-9]+)*$")
MARKDOWN_LINK_PATTERN = re.compile(r"\[[^\]]*\]\(([^)]+)\)")
DEFAULT_PROMPT_PATTERN = re.compile(
    r"^\s*default_prompt:\s*([\"']?)(.*?)\1\s*$", re.MULTILINE
)
SHORT_DESCRIPTION_PATTERN = re.compile(
    r"^\s*short_description:\s*([\"']?)(.*?)\1\s*$", re.MULTILINE
)
UNFINISHED_MARKERS = ("TODO", "FIXME", "Your skill content here", "Replace this")


def parse_frontmatter(skill_file: Path) -> tuple[dict[str, str], str]:
    text = skill_file.read_text(encoding="utf-8")
    lines = text.splitlines()
    if not lines or lines[0].strip() != "---":
        raise ValueError("SKILL.md must start with YAML frontmatter")

    try:
        closing_index = next(
            index for index, line in enumerate(lines[1:], start=1) if line.strip() == "---"
        )
    except StopIteration as error:
        raise ValueError("SKILL.md frontmatter is not closed") from error

    metadata: dict[str, str] = {}
    for line in lines[1:closing_index]:
        if not line.strip() or line.startswith((" ", "\t", "#")):
            continue
        key, separator, value = line.partition(":")
        if separator:
            metadata[key.strip()] = value.strip().strip("\"'")
    return metadata, "\n".join(lines[closing_index + 1 :])


def validate_markdown_links(skill_dir: Path) -> list[str]:
    errors: list[str] = []
    root = skill_dir.resolve()
    for markdown_file in sorted(skill_dir.rglob("*.md")):
        text = markdown_file.read_text(encoding="utf-8")
        for raw_target in MARKDOWN_LINK_PATTERN.findall(text):
            target = raw_target.strip().split("#", 1)[0]
            if not target or target.startswith(("http://", "https://", "mailto:")):
                continue
            resolved = (markdown_file.parent / target).resolve()
            if not resolved.is_relative_to(root):
                errors.append(f"{markdown_file}: link escapes the skill directory: {raw_target}")
            elif not resolved.exists():
                errors.append(f"{markdown_file}: missing link target: {raw_target}")
    return errors


def validate_skill(skill_dir: Path) -> list[str]:
    errors: list[str] = []
    skill_file = skill_dir / "SKILL.md"
    if not skill_file.is_file():
        return [f"{skill_dir}: missing SKILL.md"]

    try:
        metadata, body = parse_frontmatter(skill_file)
    except ValueError as error:
        return [f"{skill_file}: {error}"]

    name = metadata.get("name", "")
    description = metadata.get("description", "")
    if name != skill_dir.name:
        errors.append(f"{skill_file}: name must match directory '{skill_dir.name}'")
    if not NAME_PATTERN.fullmatch(name) or len(name) > 64:
        errors.append(f"{skill_file}: invalid skill name '{name}'")
    if not description:
        errors.append(f"{skill_file}: description is required")
    if not body.strip():
        errors.append(f"{skill_file}: instructions are empty")

    for markdown_file in [skill_file, *sorted((skill_dir / "references").glob("*.md"))]:
        if not markdown_file.exists():
            continue
        text = markdown_file.read_text(encoding="utf-8")
        for marker in UNFINISHED_MARKERS:
            if marker in text:
                errors.append(f"{markdown_file}: unfinished scaffold marker '{marker}'")

    if any(path.name.lower().startswith("readme") for path in skill_dir.rglob("README*")):
        errors.append(f"{skill_dir}: skill directories must not contain README files")

    openai_file = skill_dir / "agents" / "openai.yaml"
    if not openai_file.is_file():
        errors.append(f"{openai_file}: missing UI metadata")
    else:
        openai_text = openai_file.read_text(encoding="utf-8")
        prompt_match = DEFAULT_PROMPT_PATTERN.search(openai_text)
        if not prompt_match or f"${name}" not in prompt_match.group(2):
            errors.append(f"{openai_file}: default_prompt must invoke '${name}'")
        short_match = SHORT_DESCRIPTION_PATTERN.search(openai_text)
        if not short_match or not 25 <= len(short_match.group(2)) <= 64:
            errors.append(f"{openai_file}: short_description must be 25-64 characters")
        if re.search(r"allow_implicit_invocation:\s*false", openai_text):
            errors.append(f"{openai_file}: implicit invocation must remain enabled")

    errors.extend(validate_markdown_links(skill_dir))
    return errors


def select_skills(arguments: list[str]) -> tuple[list[Path], list[str]]:
    errors: list[str] = []
    if not SKILLS_ROOT.is_dir():
        return [], [f"{SKILLS_ROOT}: skills directory is missing"]

    if not arguments:
        skills = sorted(path for path in SKILLS_ROOT.iterdir() if path.is_dir())
        return skills, errors

    skills: list[Path] = []
    for name in arguments:
        if not NAME_PATTERN.fullmatch(name):
            errors.append(f"invalid skill argument '{name}'")
            continue
        skill_dir = SKILLS_ROOT / name
        if not skill_dir.is_dir():
            errors.append(f"unknown skill '{name}'")
            continue
        skills.append(skill_dir)
    return skills, errors


def main() -> int:
    skills, errors = select_skills(sys.argv[1:])
    if not skills and not errors:
        errors.append("no skills found")

    for skill_dir in skills:
        skill_errors = validate_skill(skill_dir)
        if skill_errors:
            errors.extend(skill_errors)
        else:
            print(f"OK {skill_dir.name}")

    if errors:
        for error in errors:
            print(f"ERROR {error}", file=sys.stderr)
        return 1
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
