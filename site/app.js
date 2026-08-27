const source = document.querySelector("#gallery-source").textContent.trim();
const grid = document.querySelector("#skill-grid");
const count = document.querySelector("#skill-count");
const search = document.querySelector("#search");
const empty = document.querySelector("#empty-state");
const dialog = document.querySelector("#skill-dialog");
const dialogContent = document.querySelector("#dialog-content");
const closeButton = dialog.querySelector(".dialog-close");

const escapeHtml = (value) => value
  .replaceAll("&", "&amp;")
  .replaceAll("<", "&lt;")
  .replaceAll(">", "&gt;")
  .replaceAll('"', "&quot;")
  .replaceAll("'", "&#039;");

function renderInline(value) {
  return escapeHtml(value)
    .replace(/`([^`]+)`/g, "<code>$1</code>")
    .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');
}

function renderMarkdown(markdown) {
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
      out.push(`<h${level}>${renderInline(heading[2])}</h${level}>`);
      continue;
    }
    const bullet = line.match(/^[-*]\s+(.+)$/);
    if (bullet) {
      if (list !== "ul") { closeList(); list = "ul"; out.push("<ul>"); }
      out.push(`<li>${renderInline(bullet[1])}</li>`);
      continue;
    }
    const numbered = line.match(/^\d+\.\s+(.+)$/);
    if (numbered) {
      if (list !== "ol") { closeList(); list = "ol"; out.push("<ol>"); }
      out.push(`<li>${renderInline(numbered[1])}</li>`);
      continue;
    }
    closeList();
    out.push(`<p>${renderInline(line)}</p>`);
  }
  closeList();
  return out.join("\n");
}

const response = await fetch(source);
if (!response.ok) throw new Error(`Unable to load gallery data: ${response.status}`);
const { skills } = await response.json();
count.textContent = skills.length;

function openSkill(skill) {
  const sourceUrl = `https://github.com/mattamior/agent-skills/blob/main/${skill.source}`;
  dialogContent.innerHTML = `
    <article class="dialog-body">
      <p class="eyebrow">${escapeHtml(skill.slug)}</p>
      <h2>${escapeHtml(skill.name)}</h2>
      <p class="dialog-description">${escapeHtml(skill.description)}</p>
      <a class="dialog-source" href="${sourceUrl}">Open SKILL.md on GitHub ↗</a>
      <div class="markdown">${renderMarkdown(skill.body)}</div>
    </article>`;
  dialog.showModal();
}

function render(query = "") {
  const normalized = query.trim().toLowerCase();
  const filtered = skills.filter((skill) => `${skill.name} ${skill.description} ${skill.body}`.toLowerCase().includes(normalized));
  grid.replaceChildren();
  filtered.forEach((skill, index) => {
    const card = document.createElement("article");
    card.className = "skill-card";
    card.tabIndex = 0;
    card.setAttribute("role", "button");
    card.setAttribute("aria-label", `Open ${skill.name}`);
    card.innerHTML = `
      <span class="card-index">${String(index + 1).padStart(2, "0")}</span>
      <span class="card-arrow" aria-hidden="true">↗</span>
      <h3>${escapeHtml(skill.name)}</h3>
      <p>${escapeHtml(skill.description)}</p>`;
    card.addEventListener("click", () => openSkill(skill));
    card.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        openSkill(skill);
      }
    });
    grid.append(card);
  });
  empty.hidden = filtered.length !== 0;
}

search.addEventListener("input", () => render(search.value));
closeButton.addEventListener("click", () => dialog.close());
dialog.addEventListener("click", (event) => {
  if (event.target === dialog) dialog.close();
});
render();
