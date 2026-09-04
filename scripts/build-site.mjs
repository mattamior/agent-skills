import { cp, mkdir, readdir, readFile, rm, writeFile } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const skillsDir = path.join(root, "skills");
const siteDir = path.join(root, "site");
const distDir = path.join(root, "dist");
const repositoryUrl = "https://github.com/mattamior/skills-hub";

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

function readYamlScalar(source, key) {
  const match = source.match(new RegExp(`^\\s+${key}:\\s*(.+)$`, "m"));
  if (!match) return null;
  const raw = match[1].trim();
  if (raw.startsWith('"') && raw.endsWith('"')) {
    return JSON.parse(raw);
  }
  if (raw.startsWith("'") && raw.endsWith("'")) return raw.slice(1, -1).replaceAll("''", "'");
  if (raw === "true") return true;
  if (raw === "false") return false;
  return raw;
}

const escapeHtml = (value) => String(value)
  .replaceAll("&", "&amp;")
  .replaceAll("<", "&lt;")
  .replaceAll(">", "&gt;")
  .replaceAll('"', "&quot;")
  .replaceAll("'", "&#039;");

function resolveMarkdownHref(href, slug) {
  if (/^(https?:|mailto:|#)/.test(href)) return href;
  const relative = href.replace(/^\.\//, "");
  return `${repositoryUrl}/blob/main/skills/${slug}/${relative}`;
}

function renderInline(value, slug) {
  return escapeHtml(value)
    .replace(/`([^`]+)`/g, "<code>$1</code>")
    .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, (_, label, href) => `<a href="${escapeHtml(resolveMarkdownHref(href, slug))}">${label}</a>`);
}

function renderMarkdown(markdown, slug) {
  const lines = markdown.split("\n");
  const out = [];
  let list = null;
  let inCode = false;
  let code = [];

  const closeList = () => {
    if (list) out.push(`</${list}>`);
    list = null;
  };

  for (const line of lines) {
    if (line.startsWith("```")) {
      if (inCode) {
        out.push(`<pre><code>${escapeHtml(code.join("\n"))}</code></pre>`);
        code = [];
        inCode = false;
      } else {
        closeList();
        inCode = true;
      }
      continue;
    }
    if (inCode) {
      code.push(line);
      continue;
    }
    if (!line.trim()) {
      closeList();
      continue;
    }
    const heading = line.match(/^(#{1,3})\s+(.+)$/);
    if (heading) {
      closeList();
      const level = heading[1].length;
      out.push(`<h${level}>${renderInline(heading[2], slug)}</h${level}>`);
      continue;
    }
    const bullet = line.match(/^[-*]\s+(.+)$/);
    if (bullet) {
      if (list !== "ul") { closeList(); list = "ul"; out.push("<ul>"); }
      out.push(`<li>${renderInline(bullet[1], slug)}</li>`);
      continue;
    }
    const numbered = line.match(/^\d+\.\s+(.+)$/);
    if (numbered) {
      if (list !== "ol") { closeList(); list = "ol"; out.push("<ol>"); }
      out.push(`<li>${renderInline(numbered[1], slug)}</li>`);
      continue;
    }
    closeList();
    out.push(`<p>${renderInline(line, slug)}</p>`);
  }
  closeList();
  if (inCode) out.push(`<pre><code>${escapeHtml(code.join("\n"))}</code></pre>`);
  return out.join("\n");
}

function renderSkillPage(skill) {
  const installCommand = `git clone ${repositoryUrl}.git\ncd skills-hub\n./scripts/link-skills.sh ${skill.slug}`;
  const implicit = skill.allowImplicitInvocation
    ? "Automatic selection allowed"
    : "Explicit invocation only";
  const sourceUrl = `${repositoryUrl}/blob/main/${skill.source}`;
  const agentUrl = `${repositoryUrl}/blob/main/${skill.agentSource}`;
  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="description" content="${escapeHtml(skill.shortDescription)}">
  <title>${escapeHtml(skill.displayName)} — Agent Skills</title>
  <link rel="stylesheet" href="/styles.css">
</head>
<body class="skill-page" style="--skill-accent: ${escapeHtml(skill.brandColor)}">
  <header class="shell topbar">
    <a class="wordmark" href="/" aria-label="Agent Skills home">Agent Skills<span>.</span></a>
    <nav aria-label="Primary navigation">
      <a href="/#catalog">Catalog</a>
      <a href="/#usage">How to use</a>
      <a href="${repositoryUrl}">GitHub ↗</a>
    </nav>
  </header>

  <main class="shell detail-main">
    <section class="detail-hero">
      <a class="breadcrumb" href="/">← Back to catalog</a>
      <p class="eyebrow">$${escapeHtml(skill.slug)}</p>
      <h1>${escapeHtml(skill.displayName)}</h1>
      <p class="detail-description">${escapeHtml(skill.description)}</p>
      <div class="detail-meta">
        <span class="pill">${escapeHtml(implicit)}</span>
        <span class="pill">Config: <code>agents/openai.yaml</code></span>
      </div>
      <div class="detail-actions">
        <a class="button button-primary" href="#start">Use this skill</a>
        <a class="button" href="${sourceUrl}">Open SKILL.md ↗</a>
        <a class="button" href="${agentUrl}">Open agent config ↗</a>
      </div>
    </section>

    <section id="start" class="detail-usage" aria-labelledby="start-heading">
      <div class="detail-section-head">
        <div>
          <p class="eyebrow">Start here</p>
          <h2 id="start-heading">Install and invoke</h2>
        </div>
        <p>The commands and prompt below are generated from this repository’s current skill metadata.</p>
      </div>
      <div class="action-grid">
        <article class="action-card">
          <h3>Install for Codex</h3>
          <p>Install the skill at user scope so it is discoverable from any Codex project.</p>
          <div class="command">
            <pre id="install-command"><code>${escapeHtml(installCommand)}</code></pre>
            <button class="copy-button" type="button" data-copy-target="install-command">Copy</button>
          </div>
          <p class="product-note">Already cloned the repository? Run only <code>./scripts/link-skills.sh ${escapeHtml(skill.slug)}</code>.</p>
        </article>
        <article class="action-card">
          <h3>Invoke explicitly</h3>
          <p>Use the skill name in Codex, or adapt this default prompt for the task at hand.</p>
          <div class="command">
            <pre id="invoke-command"><code>${escapeHtml(skill.defaultPrompt)}</code></pre>
            <button class="copy-button" type="button" data-copy-target="invoke-command">Copy</button>
          </div>
          <p class="product-note">In ChatGPT, select <strong>${escapeHtml(skill.displayName)}</strong> from the Skills picker when available. Matching requests may also select it automatically when implicit invocation is enabled.</p>
        </article>
      </div>
    </section>

    <section class="contract" aria-labelledby="contract-heading">
      <div class="contract-grid">
        <aside class="contract-aside">
          <p class="eyebrow">Operating contract</p>
          <h2 id="contract-heading">SKILL.md</h2>
          <p>This is the skill’s repository instruction body, rendered directly from the same source used by ChatGPT and Codex.</p>
        </aside>
        <article class="markdown">${renderMarkdown(skill.body, skill.slug)}</article>
      </div>
    </section>
  </main>

  <footer class="shell footer">
    <span>Generated from <code>${escapeHtml(skill.source)}</code> and <code>${escapeHtml(skill.agentSource)}</code>.</span>
    <a href="${repositoryUrl}">View repository ↗</a>
  </footer>
  <script src="/detail.js" defer></script>
</body>
</html>
`;
}

const entries = await readdir(skillsDir, { withFileTypes: true });
const skills = [];

for (const entry of entries.filter((item) => item.isDirectory()).sort((a, b) => a.name.localeCompare(b.name))) {
  const skillFile = path.join(skillsDir, entry.name, "SKILL.md");
  const agentFile = path.join(skillsDir, entry.name, "agents", "openai.yaml");
  const source = await readFile(skillFile, "utf8");
  const agentSource = await readFile(agentFile, "utf8");
  const { frontmatter, body } = parseFrontmatter(source);
  if (!frontmatter.name || !frontmatter.description) throw new Error(`${skillFile} is missing name or description`);

  const displayName = readYamlScalar(agentSource, "display_name");
  const shortDescription = readYamlScalar(agentSource, "short_description");
  const brandColor = readYamlScalar(agentSource, "brand_color");
  const defaultPrompt = readYamlScalar(agentSource, "default_prompt");
  const allowImplicitInvocation = readYamlScalar(agentSource, "allow_implicit_invocation") === true;
  if (!displayName || !shortDescription || !brandColor || !defaultPrompt) {
    throw new Error(`${agentFile} is missing required interface metadata`);
  }
  if (!/^#[0-9a-fA-F]{6}$/.test(brandColor)) throw new Error(`${agentFile} has an invalid brand_color`);
  if (!defaultPrompt.includes(`$${entry.name}`)) throw new Error(`${agentFile} default_prompt must explicitly invoke $${entry.name}`);

  skills.push({
    slug: entry.name,
    name: frontmatter.name,
    displayName,
    shortDescription,
    description: frontmatter.description,
    brandColor,
    defaultPrompt,
    allowImplicitInvocation,
    body,
    source: `skills/${entry.name}/SKILL.md`,
    agentSource: `skills/${entry.name}/agents/openai.yaml`
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

for (const skill of skills) {
  const detailDir = path.join(distDir, "skills", skill.slug);
  await mkdir(detailDir, { recursive: true });
  await writeFile(path.join(detailDir, "index.html"), renderSkillPage(skill));
}

console.log(`Built Agent Skills catalog with ${skills.length} skill(s) and dedicated detail pages.`);
