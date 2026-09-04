import { readFile } from "node:fs/promises";
import path from "node:path";

const data = JSON.parse(await readFile("dist/skills.json", "utf8"));
const health = JSON.parse(await readFile("dist/health.json", "utf8"));
const html = await readFile("dist/index.html", "utf8");
const app = await readFile("dist/app.js", "utf8");
await readFile("dist/detail.js", "utf8");

if (!Array.isArray(data.skills) || data.skills.length === 0) throw new Error("Gallery contains no skills");
for (const skill of data.skills) {
  const required = ["name", "displayName", "shortDescription", "description", "brandColor", "defaultPrompt", "body", "source", "agentSource"];
  for (const field of required) {
    if (!skill[field]) throw new Error(`Incomplete gallery entry ${skill.slug}: missing ${field}`);
  }
  if (!skill.defaultPrompt.includes(`$${skill.slug}`)) throw new Error(`Gallery prompt does not invoke ${skill.slug}`);

  const detail = await readFile(path.join("dist", "skills", skill.slug, "index.html"), "utf8");
  if (!detail.includes(skill.displayName)) throw new Error(`Detail page title missing for ${skill.slug}`);
  if (!detail.includes(`./scripts/link-skills.sh ${skill.slug}`)) throw new Error(`Install command missing for ${skill.slug}`);
  if (!detail.includes(`$${skill.slug}`)) throw new Error(`Invocation missing for ${skill.slug}`);
  if (!detail.includes(skill.source) || !detail.includes(skill.agentSource)) throw new Error(`Source provenance missing for ${skill.slug}`);
}
if (health.status !== "ok" || health.skills !== data.skills.length) throw new Error("Health metadata does not match gallery data");
if (!html.includes("Agent Skills") || !html.includes("skills.json") || !html.includes('id="usage"')) throw new Error("Gallery shell is missing required content hooks");
if (!app.includes("/skills/") || !app.includes("shortDescription")) throw new Error("Catalog cards are not wired to skill detail pages");

console.log(`Verified catalog output for ${data.skills.length} skill(s), including dedicated detail pages.`);
