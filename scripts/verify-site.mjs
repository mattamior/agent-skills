import { readFile } from "node:fs/promises";

const data = JSON.parse(await readFile("dist/skills.json", "utf8"));
const health = JSON.parse(await readFile("dist/health.json", "utf8"));
const html = await readFile("dist/index.html", "utf8");

if (!Array.isArray(data.skills) || data.skills.length === 0) throw new Error("Gallery contains no skills");
for (const skill of data.skills) {
  if (!skill.name || !skill.description || !skill.body || !skill.source) throw new Error(`Incomplete gallery entry: ${skill.slug}`);
}
if (health.status !== "ok" || health.skills !== data.skills.length) throw new Error("Health metadata does not match gallery data");
if (!html.includes("Agent Skills") || !html.includes("skills.json")) throw new Error("Gallery shell is missing required content hooks");

console.log(`Verified gallery output for ${data.skills.length} skill(s).`);
