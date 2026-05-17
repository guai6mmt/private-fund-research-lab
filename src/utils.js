function product() {
  return products.find((item) => item.id === state.selectedProductId) || products[0];
}

function manager() {
  return managers.find((item) => item.id === state.selectedManagerId) || managers[0];
}

let catalogsSanitized = false;

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function sanitizeValue(value) {
  if (typeof value === "string") return escapeHtml(value);
  if (Array.isArray(value)) return value.map(sanitizeValue);
  if (value && typeof value === "object") {
    Object.keys(value).forEach((key) => {
      value[key] = sanitizeValue(value[key]);
    });
  }
  return value;
}

function sanitizeCatalogs() {
  if (catalogsSanitized) return;
  [products, managers, indicatorGroups, sopMetrics, focusEvents, tacticalDiagnostics, strategyCenterDiagnostics, marketStateTags].forEach(sanitizeValue);
  catalogsSanitized = true;
}

function csvCell(value) {
  const text = String(value ?? "")
    .replaceAll("&quot;", '"')
    .replaceAll("&#39;", "'")
    .replaceAll("&lt;", "<")
    .replaceAll("&gt;", ">")
    .replaceAll("&amp;", "&");
  return `"${text.replaceAll('"', '""')}"`;
}

function downloadTextFile(filename, content, mimeType = "text/plain;charset=utf-8") {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}
