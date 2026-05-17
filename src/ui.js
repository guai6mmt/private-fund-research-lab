function icon(name) {
  const icons = {
    bank: '<svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 10h18L12 4 3 10Z"/><path d="M5 10v9M9 10v9M15 10v9M19 10v9"/><path d="M3 19h18"/></svg>',
    briefcase: '<svg viewBox="0 0 24 24" width="21" height="21" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="7" width="18" height="13" rx="2"/><path d="M8 7V5h8v2M3 12h18"/></svg>',
    users: '<svg viewBox="0 0 24 24" width="21" height="21" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></svg>',
    headset: '<svg viewBox="0 0 24 24" width="21" height="21" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 18v-6a9 9 0 0 1 18 0v6"/><path d="M21 19a2 2 0 0 1-2 2h-2"/><rect x="3" y="13" width="4" height="6" rx="2"/><rect x="17" y="13" width="4" height="6" rx="2"/></svg>',
    table: '<svg viewBox="0 0 24 24" width="21" height="21" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="16" rx="2"/><path d="M3 10h18M9 10v10"/></svg>',
    gear: '<svg viewBox="0 0 24 24" width="21" height="21" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .34 1.88l.05.05a2 2 0 1 1-2.83 2.83l-.05-.05A1.7 1.7 0 0 0 15 19.4a1.7 1.7 0 0 0-1 .6 1.7 1.7 0 0 0-.4 1.1V21a2 2 0 1 1-4 0v-.1A1.7 1.7 0 0 0 9 19.4a1.7 1.7 0 0 0-1.88.34l-.05.05a2 2 0 1 1-2.83-2.83l.05-.05A1.7 1.7 0 0 0 4.6 15a1.7 1.7 0 0 0-.6-1A1.7 1.7 0 0 0 3 13.6H3a2 2 0 1 1 0-4h.1A1.7 1.7 0 0 0 4.6 9a1.7 1.7 0 0 0-.34-1.88l-.05-.05a2 2 0 1 1 2.83-2.83l.05.05A1.7 1.7 0 0 0 9 4.6a1.7 1.7 0 0 0 1-.6 1.7 1.7 0 0 0 .4-1.1V3a2 2 0 1 1 4 0v.1A1.7 1.7 0 0 0 15 4.6a1.7 1.7 0 0 0 1.88-.34l.05-.05a2 2 0 1 1 2.83 2.83l-.05.05A1.7 1.7 0 0 0 19.4 9c.3.38.67.58 1.1.6H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1.4Z"/></svg>',
    menu: '<svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" stroke-width="3"><path d="M4 6h16M4 12h16M4 18h16"/></svg>',
    search: '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>',
    refresh: '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12a9 9 0 0 1-15.2 6.5"/><path d="M3 12A9 9 0 0 1 18.2 5.5"/><path d="M3 19v-5h5M21 5v5h-5"/></svg>',
    bell: '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 8a6 6 0 1 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9"/><path d="M10 21h4"/></svg>',
    user: '<svg viewBox="0 0 24 24" width="19" height="19" fill="currentColor"><circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/></svg>',
  };
  return icons[name] || "";
}

function setPage(page, detail) {
  state.page = page;
  state.searchOpen = false;
  if (detail?.productId) {
    state.selectedProductId = detail.productId;
    const p = products.find((item) => item.id === detail.productId);
    if (p) state.selectedManagerId = p.managerId;
  }
  if (detail?.managerId) state.selectedManagerId = detail.managerId;
  render();
}

function openDrawer(title, subtitle, blocks) {
  const mask = document.querySelector(".drawer-mask");
  mask.innerHTML = `
    <aside class="drawer" role="dialog" aria-modal="true" aria-label="${title}">
      <div class="drawer-header">
        <div>
          <h2>${title}</h2>
          <p>${subtitle}</p>
        </div>
        <button class="drawer-close" aria-label="关闭">×</button>
      </div>
      <div class="drawer-body">
        ${blocks
          .map(
            (block) => `
              <section class="drawer-block">
                <h3>${block.title}</h3>
                ${Array.isArray(block.body) ? `<ul>${block.body.map((item) => `<li>${item}</li>`).join("")}</ul>` : `<p>${block.body}</p>`}
              </section>
            `,
          )
          .join("")}
      </div>
    </aside>
  `;
  mask.classList.add("open");
  mask.querySelector(".drawer-close").addEventListener("click", closeDrawer);
  mask.addEventListener("click", (event) => {
    if (event.target === mask) closeDrawer();
  });
}

function closeDrawer() {
  const mask = document.querySelector(".drawer-mask");
  mask.classList.remove("open");
}

function toast(message) {
  const el = document.querySelector(".toast");
  el.textContent = message;
  el.classList.add("show");
  window.clearTimeout(toast.timer);
  toast.timer = window.setTimeout(() => el.classList.remove("show"), 1800);
}
