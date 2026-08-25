#!/usr/bin/env bash

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPOSITORY_ROOT="$(cd "${SCRIPT_DIR}/.." && pwd)"
SKILLS_ROOT="${REPOSITORY_ROOT}/skills"
TARGET_DIR="${HOME}/.agents/skills"
CHECK_ONLY=0
SKILL_NAMES=()

usage() {
  printf 'Usage: %s [--check] [--target DIR] [skill ...]\n' "$(basename "$0")"
}

fail() {
  printf 'ERROR %s\n' "$1" >&2
  exit 1
}

while [[ $# -gt 0 ]]; do
  case "$1" in
    --check)
      CHECK_ONLY=1
      shift
      ;;
    --target)
      [[ $# -ge 2 ]] || fail "--target requires a directory"
      TARGET_DIR="$2"
      shift 2
      ;;
    --help|-h)
      usage
      exit 0
      ;;
    --*)
      fail "unknown option '$1'"
      ;;
    *)
      SKILL_NAMES+=("$1")
      shift
      ;;
  esac
done

[[ -n "${TARGET_DIR}" && "${TARGET_DIR}" != "/" ]] || fail "unsafe target directory"

if [[ ${#SKILL_NAMES[@]} -eq 0 ]]; then
  for skill_dir in "${SKILLS_ROOT}"/*; do
    [[ -d "${skill_dir}" ]] || continue
    SKILL_NAMES+=("$(basename "${skill_dir}")")
  done
fi

[[ ${#SKILL_NAMES[@]} -gt 0 ]] || fail "no skills found"

SOURCES=()
DESTINATIONS=()

# Preflight every destination before creating anything so a collision cannot leave a partial install.
for skill_name in "${SKILL_NAMES[@]}"; do
  [[ "${skill_name}" =~ ^[a-z0-9]+(-[a-z0-9]+)*$ ]] || fail "invalid skill name '${skill_name}'"
  source_dir="${SKILLS_ROOT}/${skill_name}"
  destination="${TARGET_DIR}/${skill_name}"
  [[ -f "${source_dir}/SKILL.md" ]] || fail "unknown skill '${skill_name}'"

  if [[ -L "${destination}" ]]; then
    linked_target="$(readlink "${destination}")"
    [[ "${linked_target}" == "${source_dir}" ]] || fail "${destination} points to '${linked_target}'"
  elif [[ -e "${destination}" ]]; then
    fail "${destination} already exists and is not the expected symbolic link"
  fi

  SOURCES+=("${source_dir}")
  DESTINATIONS+=("${destination}")
done

for index in "${!SOURCES[@]}"; do
  source_dir="${SOURCES[$index]}"
  destination="${DESTINATIONS[$index]}"
  if [[ -L "${destination}" ]]; then
    printf 'OK %s -> %s\n' "${destination}" "${source_dir}"
  elif [[ ${CHECK_ONLY} -eq 1 ]]; then
    printf 'WOULD_LINK %s -> %s\n' "${destination}" "${source_dir}"
  else
    mkdir -p "${TARGET_DIR}"
    ln -s "${source_dir}" "${destination}"
    printf 'LINKED %s -> %s\n' "${destination}" "${source_dir}"
  fi
done
