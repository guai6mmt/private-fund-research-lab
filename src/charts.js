function lineChart(series, options = {}) {
  const width = 680;
  const height = 230;
  const pad = { left: 44, right: 18, top: 14, bottom: 32 };
  const all = series.flatMap((item) => item.values);
  const min = options.min ?? Math.min(...all);
  const max = options.max ?? Math.max(...all);
  const x = (i, n) => pad.left + (i / Math.max(n - 1, 1)) * (width - pad.left - pad.right);
  const y = (v) => pad.top + ((max - v) / Math.max(max - min, 0.0001)) * (height - pad.top - pad.bottom);
  const ticks = [0, 0.25, 0.5, 0.75, 1].map((n) => min + (max - min) * n);
  const labels = options.labels || months;

  return `
    <svg viewBox="0 0 ${width} ${height}" role="img">
      ${ticks
        .map((tick) => {
          const yy = y(tick);
          return `<path d="M${pad.left} ${yy}H${width - pad.right}" stroke="#e9eff8" stroke-width="1"/><text x="8" y="${yy + 4}" fill="#334765" font-size="12">${options.percent ? `${tick.toFixed(0)}%` : tick.toFixed(1)}</text>`;
        })
        .join("")}
      ${options.threshold ? `<path d="M${pad.left} ${y(options.threshold)}H${width - pad.right}" stroke="#ef3f3f" stroke-dasharray="5 5"/><text x="${pad.left + 12}" y="${y(options.threshold) + 20}" fill="#ef3f3f" font-size="14">最大回撤：${options.threshold.toFixed(2)}%</text>` : ""}
      ${series
        .map((item) => {
          const path = item.values.map((v, i) => `${i === 0 ? "M" : "L"}${x(i, item.values.length).toFixed(1)} ${y(v).toFixed(1)}`).join(" ");
          const dots = item.values
            .map(
              (v, i) =>
                `<circle class="point" data-title="${item.name}" data-date="${labels[i] || ""}" data-value="${v}" cx="${x(i, item.values.length).toFixed(1)}" cy="${y(v).toFixed(1)}" r="3.2" fill="${item.color}"/>`,
            )
            .join("");
          return `<path d="${path}" fill="none" stroke="${item.color}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>${dots}`;
        })
        .join("")}
      ${[0, 0.25, 0.5, 0.75, 1]
        .map((n) => {
          const idx = Math.round((labels.length - 1) * n);
          return `<text x="${x(idx, labels.length)}" y="${height - 8}" text-anchor="middle" fill="#334765" font-size="12">${labels[idx]}</text>`;
        })
        .join("")}
    </svg>
  `;
}

function barChart(items) {
  const width = 280;
  const height = 170;
  const max = Math.max(...items.map((item) => item.value)) * 1.2;
  const base = 130;
  return `
    <svg viewBox="0 0 ${width} ${height}" role="img">
      <path d="M24 ${base}H260" stroke="#dce6f5"/>
      ${items
        .map((item, index) => {
          const x = 62 + index * 110;
          const h = (item.value / max) * 104;
          return `
            <rect class="bar" data-title="${item.name}" data-value="${item.value}" x="${x}" y="${base - h}" width="52" height="${h}" rx="3" fill="${item.color}"/>
            <text x="${x + 26}" y="${base - h - 9}" text-anchor="middle" fill="#27395c" font-size="13" font-weight="800">${item.value.toFixed(2)}%</text>
            <text x="${x + 26}" y="${base + 24}" text-anchor="middle" fill="#27395c" font-size="12">${item.name}</text>
          `;
        })
        .join("")}
    </svg>
  `;
}

function pairedBarChart(rows, options = {}) {
  const width = 430;
  const height = 188;
  const pad = { left: 34, right: 18, top: 24, bottom: 44 };
  const max = Math.max(...rows.flatMap((row) => [row.first, row.second]), 0.01) * 1.18;
  const groupWidth = (width - pad.left - pad.right) / rows.length;
  const barWidth = 28;
  const y = (value) => pad.top + (1 - value / max) * (height - pad.top - pad.bottom);
  const base = height - pad.bottom;
  const fmt = (value) => `${value.toFixed(options.decimals ?? 1)}${options.unit ?? "%"}`;

  return `
    <svg viewBox="0 0 ${width} ${height}" role="img">
      <path d="M${pad.left} ${base}H${width - pad.right}" stroke="#dce6f5"/>
      ${rows
        .map((row, index) => {
          const x = pad.left + groupWidth * index + groupWidth / 2;
          const firstY = y(row.first);
          const secondY = y(row.second);
          return `
            <rect x="${x - barWidth - 3}" y="${firstY}" width="${barWidth}" height="${base - firstY}" rx="4" fill="${options.firstColor || "#3f7cff"}"/>
            <rect x="${x + 3}" y="${secondY}" width="${barWidth}" height="${base - secondY}" rx="4" fill="${options.secondColor || "#00a99d"}"/>
            <text x="${x - barWidth / 2 - 3}" y="${firstY - 7}" text-anchor="middle" fill="#27395c" font-size="11" font-weight="850">${fmt(row.first)}</text>
            <text x="${x + barWidth / 2 + 3}" y="${secondY - 7}" text-anchor="middle" fill="#27395c" font-size="11" font-weight="850">${fmt(row.second)}</text>
            <text x="${x}" y="${height - 13}" text-anchor="middle" fill="#334765" font-size="12" font-weight="800">${row.label}</text>
          `;
        })
        .join("")}
      <circle cx="${pad.left + 8}" cy="12" r="4" fill="${options.firstColor || "#3f7cff"}"/><text x="${pad.left + 18}" y="16" fill="#60708e" font-size="12" font-weight="750">${options.firstLabel || "静态"}</text>
      <circle cx="${pad.left + 78}" cy="12" r="4" fill="${options.secondColor || "#00a99d"}"/><text x="${pad.left + 88}" y="16" fill="#60708e" font-size="12" font-weight="750">${options.secondLabel || "实际"}</text>
    </svg>
  `;
}

function divergingPercentChart(rows) {
  const width = 530;
  const height = 46 * rows.length + 26;
  const pad = { left: 112, right: 52, top: 14, bottom: 12 };
  const min = Math.min(-0.1, ...rows.map((row) => row.value));
  const max = Math.max(0.1, ...rows.map((row) => row.value));
  const x = (value) => pad.left + ((value - min) / (max - min)) * (width - pad.left - pad.right);
  const zero = x(0);

  return `
    <svg viewBox="0 0 ${width} ${height}" role="img">
      <path d="M${zero} ${pad.top - 4}V${height - pad.bottom}" stroke="#c7d5e8" stroke-dasharray="4 4"/>
      ${rows
        .map((row, index) => {
          const y = pad.top + index * 46 + 10;
          const end = x(row.value);
          const rectX = Math.min(zero, end);
          const rectWidth = Math.max(2, Math.abs(end - zero));
          return `
            <text x="8" y="${y + 14}" fill="#27395c" font-size="13" font-weight="850">${row.label}</text>
            <rect x="${rectX}" y="${y}" width="${rectWidth}" height="18" rx="4" fill="${row.color}"/>
            <text x="${row.value >= 0 ? end + 7 : end - 7}" y="${y + 14}" text-anchor="${row.value >= 0 ? "start" : "end"}" fill="#27395c" font-size="12" font-weight="900">${row.value.toFixed(2)}%</text>
          `;
        })
        .join("")}
    </svg>
  `;
}

function horizontalPercentChart(rows, options = {}) {
  const width = 530;
  const height = 46 * rows.length + 26;
  const pad = { left: 112, right: 48, top: 14, bottom: 12 };
  const x = (value) => pad.left + (Math.max(0, Math.min(100, value)) / 100) * (width - pad.left - pad.right);

  return `
    <svg viewBox="0 0 ${width} ${height}" role="img">
      ${options.threshold ? `<path d="M${x(options.threshold)} ${pad.top - 4}V${height - pad.bottom}" stroke="#ff7a1a" stroke-dasharray="4 4"/><text x="${x(options.threshold) + 6}" y="${height - 3}" fill="#b25c00" font-size="11" font-weight="800">${options.threshold}%</text>` : ""}
      ${rows
        .map((row, index) => {
          const y = pad.top + index * 46 + 10;
          return `
            <text x="8" y="${y + 14}" fill="#27395c" font-size="13" font-weight="850">${row.label}</text>
            <rect x="${pad.left}" y="${y}" width="${width - pad.left - pad.right}" height="18" rx="4" fill="#edf3fb"/>
            <rect x="${pad.left}" y="${y}" width="${x(row.value) - pad.left}" height="18" rx="4" fill="${row.color}"/>
            <text x="${width - 10}" y="${y + 14}" text-anchor="end" fill="#27395c" font-size="12" font-weight="900">${row.value.toFixed(1)}%</text>
          `;
        })
        .join("")}
    </svg>
  `;
}

function compactMetricChart(rows, options = {}) {
  const width = 360;
  const height = 52 * rows.length + 26;
  const pad = { left: 118, right: 48, top: 14, bottom: 12 };
  const x = (value) => pad.left + (Math.max(0, Math.min(100, value)) / 100) * (width - pad.left - pad.right);

  return `
    <svg viewBox="0 0 ${width} ${height}" role="img">
      ${options.threshold ? `<path d="M${x(options.threshold)} ${pad.top - 4}V${height - pad.bottom}" stroke="#ff7a1a" stroke-dasharray="4 4"/><text x="${x(options.threshold) + 5}" y="${height - 4}" fill="#b25c00" font-size="12" font-weight="850">${options.threshold}%</text>` : ""}
      ${rows
        .map((row, index) => {
          const y = pad.top + index * 52 + 12;
          return `
            <text x="10" y="${y + 15}" fill="#27395c" font-size="15" font-weight="900">${row.label}</text>
            <rect x="${pad.left}" y="${y}" width="${width - pad.left - pad.right}" height="22" rx="5" fill="#edf3fb"/>
            <rect x="${pad.left}" y="${y}" width="${x(row.value) - pad.left}" height="22" rx="5" fill="${row.color}"/>
            <text x="${width - 10}" y="${y + 16}" text-anchor="end" fill="#27395c" font-size="14" font-weight="950">${row.value.toFixed(1)}%</text>
          `;
        })
        .join("")}
    </svg>
  `;
}

function areaChart(allocation) {
  const width = 520;
  const height = 170;
  const pad = { left: 38, right: 14, top: 12, bottom: 30 };
  const x = (i) => pad.left + (i / (allocation.dates.length - 1)) * (width - pad.left - pad.right);
  const y = (v) => pad.top + ((100 - v) / 100) * (height - pad.top - pad.bottom);
  const cumulative = allocation.dates.map(() => 0);

  const layers = allocation.series
    .map((serie) => {
      const lower = cumulative.slice();
      serie.values.forEach((v, i) => {
        cumulative[i] += v;
      });
      const top = cumulative.map((v, i) => [x(i), y(v)]);
      const bottom = lower.map((v, i) => [x(i), y(v)]).reverse();
      const points = top.concat(bottom).map((p) => p.join(",")).join(" ");
      return `<polygon class="bar" data-title="${serie.name}" data-value="${serie.values.at(-1)}" points="${points}" fill="${serie.color}" opacity="0.82"/>`;
    })
    .join("");

  return `
    <svg viewBox="0 0 ${width} ${height}" role="img">
      ${[0, 25, 50, 75, 100]
        .map((tick) => `<path d="M${pad.left} ${y(tick)}H${width - pad.right}" stroke="#e9eff8"/><text x="4" y="${y(tick) + 4}" fill="#334765" font-size="11">${tick}%</text>`)
        .join("")}
      ${layers}
      ${allocation.dates
        .map((date, i) => `<text x="${x(i)}" y="${height - 8}" text-anchor="middle" fill="#334765" font-size="11">${date}</text>`)
        .join("")}
    </svg>
  `;
}
