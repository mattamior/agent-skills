import { cp, mkdir, readdir, readFile, rm, writeFile } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const skillsDir = path.join(root, "skills");
const siteDir = path.join(root, "site");
const distDir = path.join(root, "dist");

function parseFrontmatter(source) {
  if (!source.startsWith("---\n")) throw new Error("SKILL.md must start with frontmatter");
  const end = source.indexOf("\n---\n", 4);
  if (end === -1) throw new Error("SKILL.md frontmatter is not closed");
  const frontmatter = source.slice(4, end).split("\n").reduce((acc, line) => {
    const separator = line.indexOf(":");
    if (separator === -1) return acc;
    acc[line.slice(0, separator).trim()] = line.slice(separator + 1).trim();
    return acc;
  }, {});
  return { frontmatter, body: source.slice(end + 5).trim() };
}

const entries = await readdir(skillsDir, { withFileTypes: true });
const skills = [];

for (const entry of entries.filter((item) => item.isDirectory()).sort((a, b) => a.name.localeCompare(b.name))) {
  const file = path.join(skillsDir, entry.name, "SKILL.md");
  const source = await readFile(file, "utf8");
  const { frontmatter, body } = parseFrontmatter(source);
  if (!frontmatter.name || !frontmatter.description) throw new Error(`${file} is missing name or description`);
  skills.push({
    slug: entry.name,
    name: frontmatter.name,
    description: frontmatter.description,
    body,
    source: `skills/${entry.name}/SKILL.md`
  });
}

await rm(distDir, { recursive: true, force: true });
await mkdir(distDir, { recursive: true });
await cp(siteDir, distDir, { recursive: true });
await writeFile(path.join(distDir, "skills.json"), `${JSON.stringify({ generatedAt: new Date().toISOString(), skills }, null, 2)}\n`);
await writeFile(path.join(distDir, "health.json"), `${JSON.stringify({
  status: "ok",
  skills: skills.length,
  revision: process.env.DEPLOY_REVISION || process.env.GITHUB_SHA || "development"
}, null, 2)}\n`);

console.log(`Built Agent Skills gallery with ${skills.length} skill(s).`);
