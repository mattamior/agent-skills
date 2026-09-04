const source = document.querySelector("#gallery-source").textContent.trim();
const grid = document.querySelector("#skill-grid");
const count = document.querySelector("#skill-count");
const search = document.querySelector("#search");
const empty = document.querySelector("#empty-state");

const escapeHtml = (value) => String(value)
  .replaceAll("&", "&amp;")
  .replaceAll("<", "&lt;")
  .replaceAll(">", "&gt;")
  .replaceAll('"', "&quot;")
  .replaceAll("'", "&#039;");

const response = await fetch(source);
if (!response.ok) throw new Error(`Unable to load gallery data: ${response.status}`);
const { skills } = await response.json();
count.textContent = skills.length;

function render(query = "") {
  const normalized = query.trim().toLowerCase();
  const filtered = skills.filter((skill) => [
    skill.slug,
    skill.displayName,
    skill.shortDescription,
    skill.description,
    skill.defaultPrompt,
    skill.body
  ].join(" ").toLowerCase().includes(normalized));

  grid.replaceChildren();
  filtered.forEach((skill, index) => {
    const card = document.createElement("a");
    card.className = "skill-card";
    card.href = `/skills/${encodeURIComponent(skill.slug)}/`;
    card.setAttribute("aria-label", `Open ${skill.displayName}`);
    card.innerHTML = `
      <span class="card-index">${String(index + 1).padStart(2, "0")}</span>
      <span class="card-arrow" aria-hidden="true">↗</span>
      <div class="card-copy">
        <span class="card-slug">$${escapeHtml(skill.slug)}</span>
        <h3>${escapeHtml(skill.displayName)}</h3>
        <p>${escapeHtml(skill.shortDescription)}</p>
      </div>`;
    grid.append(card);
  });
  empty.hidden = filtered.length !== 0;
}

search.addEventListener("input", () => render(search.value));
render();
