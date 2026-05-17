function renderSidebar() {
  const nav = [
    {
      title: "产品池",
      icon: "briefcase",
      page: "product-pool",
      children: [
        ["product-detail", "产品详情"],
        ["product-compare", "产品对比"],
      ],
    },
    {
      title: "管理人分析",
      icon: "users",
      page: "manager-analysis",
      children: [
        ["manager-strategy", "策略配置能力"],
        ["manager-tactical", "战术配置能力"],
        ["manager-selection", "选基能力"],
      ],
    },
    {
      title: "售后SOP",
      icon: "headset",
      page: "after-sales",
      children: [
        ["risk-alert", "风险事件预警"],
        ["service", "一线/客户触达"],
      ],
    },
    { title: "指标库", icon: "table", page: "indicator-library", children: [] },
    { title: "系统设置", icon: "gear", page: "settings", children: [] },
  ];
  return `
    <aside class="sidebar">
      <div class="brand"><span class="brand-mark">${icon("bank")}</span><span>产品评价系统</span></div>
      ${nav
        .map((section) => {
          const sectionActive = state.page === section.page || section.children.some((child) => child[0] === state.page) || (section.page === "after-sales" && state.page === "sop-workbench");
          return `
            <div class="nav-section">
              <button class="nav-heading ${sectionActive && section.children.length === 0 ? "active" : ""}" data-page="${section.page}">
                <span class="nav-icon">${icon(section.icon)}</span><span>${section.title}</span><span style="margin-left:auto">${section.children.length ? "⌄" : ""}</span>
              </button>
              ${section.children
                .map(
                  ([page, label]) =>
                    `<button class="nav-item ${state.page === page || (state.page === "manager-analysis" && page === "manager-strategy") ? "active" : ""}" data-page="${page}"><span class="bullet"></span><span>${label}</span></button>`,
                )
                .join("")}
            </div>
          `;
        })
        .join("")}
      <button class="collapse" aria-label="收起侧栏">≪</button>
    </aside>
  `;
}

function pageTitle() {
  const map = {
    "product-pool": "产品池",
    "product-detail": "单产品详情",
    "product-compare": "产品对比",
    "manager-analysis": "管理人分析",
    "manager-strategy": "策略配置能力",
    "manager-tactical": "战术配置能力",
    "manager-selection": "选基能力",
    "after-sales": "售后SOP",
    "risk-alert": "风险事件预警",
    service: "一线/客户触达",
    "sop-workbench": "产品售后工作台",
    "indicator-library": "指标库",
    settings: "系统设置",
  };
  return map[state.page] || "单产品详情";
}

function renderTopbar() {
  const results = state.searchOpen
    ? [...products.map((item) => ({ type: "产品", label: item.name, sub: `${item.code} / ${item.manager}`, action: `product:${item.id}` })), ...managers.map((item) => ({ type: "管理人", label: item.name, sub: `${item.type} / ${item.productCount}只产品`, action: `manager:${item.id}` }))]
    : [];
  return `
    <header class="topbar">
      <div class="title-row">
        <button class="menu-button" aria-label="菜单">${icon("menu")}</button>
        <div>
          <h1 class="page-title">${pageTitle()}</h1>
          <div class="crumbs">
            <button data-page="product-detail">首页</button>
            <span>/</span>
            <button data-page="${state.page}">${pageTitle()}</button>
          </div>
        </div>
      </div>
      <div class="search-box">
        <input id="global-search" placeholder="搜索产品名称、管理人、代码" />
        <button class="search-button" aria-label="搜索">${icon("search")}</button>
        ${results.length ? `<div class="search-results">${results.map((item) => `<button class="search-result" data-action="${item.action}"><span><b>${item.label}</b><small>${item.sub}</small></span><span class="tag">${item.type}</span></button>`).join("")}</div>` : ""}
      </div>
      <div class="top-meta">
        <div><span>数据截至：</span>2026-05-20</div>
        <div><span>更新于：</span>2026-05-21 09:30</div>
        <button class="icon-button" data-command="refresh" aria-label="刷新">${icon("refresh")}</button>
        <button class="icon-button" data-command="notifications" aria-label="通知">${icon("bell")}</button>
        <button class="user-button" data-command="user"><span>${icon("user")}</span>张三⌄</button>
      </div>
    </header>
  `;
}

function renderHero(mode = "product") {
  const p = product();
  const m = manager();
  const info =
    mode === "product"
      ? [
          ["产品名称：", `<button class="linkish" data-detail="product">${p.name}</button>`],
          ["管理人：", `<button class="linkish" data-page="manager-analysis" data-manager-id="${p.managerId}">${p.manager}</button>`],
          ["产品类型：", `<button class="linkish" data-detail="type">${p.type}</button>`],
        ]
      : [
          ["管理人名称：", `<button class="linkish" data-detail="manager">${m.name}</button>`],
          ["管理人类型：", `<button class="linkish" data-detail="type">${m.type}</button>`],
          ["跟踪产品数量：", `<button class="linkish" data-page="product-compare">${m.productCount}</button>`],
          ["跟踪子基金数量：", `<button class="linkish" data-detail="funds">${m.fundCount}</button>`],
        ];
  if (mode === "manager") {
    return `
      <section class="card hero-grid manager-hero">
        <div class="info-panel">
          ${info.map(([label, value]) => `<div class="info-row"><span class="label">${label}</span><span>${value}</span></div>`).join("")}
        </div>
      </section>
    `;
  }
  return `
    <section class="card hero-grid">
      <div class="info-panel">
        ${info.map(([label, value]) => `<div class="info-row"><span class="label">${label}</span><span>${value}</span></div>`).join("")}
      </div>
      <button class="card summary-box clickable" data-detail="${mode === "product" ? "conclusion" : "manager-conclusion"}">
        <h2 class="summary-title"><span class="status-dot good">✓</span>系统结论</h2>
        <p>${mode === "product" ? p.conclusion : m.conclusion}</p>
      </button>
      <button class="card summary-box clickable" data-detail="${mode === "product" ? "risk" : "manager-risk"}">
        <h2 class="summary-title"><span class="status-dot warn">!</span>主要风险</h2>
        <p>${mode === "product" ? p.risk : m.risk}</p>
      </button>
    </section>
  `;
}

const PRODUCT_CATEGORIES = [
  { name: "积极看多", desc: "偏进攻、权益弹性更高的产品" },
  { name: "谨慎看多", desc: "收益弹性与风险控制相对均衡" },
  { name: "低相关", desc: "量化、CTA、市场中性等低相关策略" },
  { name: "类固收", desc: "回撤较低、偏稳健体验的配置" },
];

const SPECIAL_PRODUCTS = [
  ["磐石3.0", "稳健底仓与多策略增强组合"],
  ["类全委", "以组合管理和陪伴服务为核心"],
  ["白金类全委", "面向高净值客户的升级组合"],
];

const POOL_METRIC_DEFINITIONS = [
  ["平均年化收益", "annualReturn", "%"],
  ["平均最大回撤", "maxDrawdown", "%"],
  ["平均波动率", "vol", "%"],
  ["平均夏普比率", "sharpe", ""],
];

function productPoolCategory(p) {
  if (p.rating?.includes("进取") || p.type?.includes("进取") || p.maxDrawdown >= 12) return "积极看多";
  if (p.type?.includes("固收") || p.type?.includes("稳健") || p.maxDrawdown <= 4) return "类固收";
  if (p.type?.includes("量化") || p.allocation?.series?.some((serie) => ["市场中性", "CTA"].includes(serie.name))) return "低相关";
  return "谨慎看多";
}

function productsByPoolCategory(categoryName) {
  return products.filter((p) => productPoolCategory(p) === categoryName);
}

function renderProductPool() {
  const typeOptions = PRODUCT_CATEGORIES.map((item) => item.name);
  const managerOptions = uniqueValues(products, "manager");
  const activeType = typeOptions.includes(state.poolTypeFilter) ? state.poolTypeFilter : typeOptions[0];
  state.poolTypeFilter = activeType;
  const categoryProducts = productsByPoolCategory(activeType);
  const filtered = products.filter((p) => {
    const typeMatch = productPoolCategory(p) === activeType;
    const managerMatch = state.poolManagerFilter === "全部" || p.manager === state.poolManagerFilter;
    return typeMatch && managerMatch;
  });
  const metricRows = POOL_METRIC_DEFINITIONS.map(([label, key, unit]) => {
    const values = categoryProducts.map((item) => Number(item[key]));
    const avg = average(values);
    return { label, avg, unit };
  });
  const typeCards = PRODUCT_CATEGORIES.map((category) => {
    const scoped = productsByPoolCategory(category.name);
    return {
      ...category,
      count: scoped.length,
      managerCount: new Set(scoped.map((p) => p.manager)).size,
    };
  });
  const selectedCount = state.poolSelectedIds.length;
  return `
    <section class="pool-overview">
      <section class="card panel pool-hero">
        <div>
          <h2 class="panel-title">产品池概览</h2>
          <p class="pool-lead">当前接入 ${products.length} 只产品，按产品分类、特色产品和产品指标组织查看。指标区域会跟随当前产品分类联动。</p>
        </div>
        <div class="pool-total">
          <b>${products.length}</b>
          <span>池内产品</span>
        </div>
      </section>

      <section class="pool-summary-grid">
        <section class="card panel">
          <h2 class="panel-title small">产品分类</h2>
          <div class="type-card-grid">
            ${typeCards
              .map(
                (item) => `
                  <button class="type-card ${activeType === item.name ? "active" : ""}" data-pool-filter="type" data-value="${item.name}">
                    <b>${item.name}</b>
                    <strong>${item.count}只</strong>
                    <span>${item.desc} / ${item.managerCount}家管理人</span>
                  </button>
                `,
              )
              .join("")}
          </div>
        </section>
        <section class="card panel">
          <h2 class="panel-title small">特色产品</h2>
          <div class="special-product-grid">
            ${SPECIAL_PRODUCTS.map(
              ([name, desc]) => `
                <button class="special-product-card" data-detail="special:${name}">
                  <b>${name}</b>
                  <span>${desc}</span>
                </button>
              `,
            ).join("")}
          </div>
        </section>
        <section class="card panel">
          <h2 class="panel-title small">产品指标</h2>
          <p class="panel-subtitle">${activeType}产品，共 ${categoryProducts.length} 只</p>
          <div class="pool-metric-grid">
            ${metricRows
              .map((row) => {
                const formattedAvg = row.unit === "%" ? `${row.avg.toFixed(2)}%` : row.avg.toFixed(2);
                return `
                  <button class="pool-metric" data-detail="pool-metric:${row.label}">
                    <span>${row.label}</span>
                    <b>${formattedAvg}</b>
                    <small>随产品分类联动</small>
                  </button>
                `;
              })
              .join("")}
          </div>
        </section>
      </section>

      <section class="card panel">
        <div class="pool-list-head">
          <div>
            <h2 class="panel-title">产品列表</h2>
            <p class="panel-subtitle">已筛出 ${filtered.length} 只，已选择 ${selectedCount} 只用于对比</p>
          </div>
          <div class="pool-actions">
            <label>类型
              <select data-pool-filter="type">
                ${typeOptions.map((type) => `<option value="${type}" ${activeType === type ? "selected" : ""}>${type}</option>`).join("")}
              </select>
            </label>
            <label>管理人
              <select data-pool-filter="manager">
                ${managerOptions.map((managerName) => `<option value="${managerName}" ${state.poolManagerFilter === managerName ? "selected" : ""}>${managerName}</option>`).join("")}
              </select>
            </label>
            <button class="tag clickable" data-pool-import>导入产品对比</button>
          </div>
        </div>
        <div class="table-wrap">
          <table>
            <thead><tr><th>选择</th><th>产品</th><th>分类</th><th>管理人</th><th>年化收益</th><th>最大回撤</th><th>夏普</th><th>评分</th><th>操作</th></tr></thead>
            <tbody>
              ${filtered
                .map(
                  (p) => `
                    <tr>
                      <td><button class="check-button ${state.poolSelectedIds.includes(p.id) ? "active" : ""}" data-pool-select="${p.id}" aria-label="选择${p.name}">${state.poolSelectedIds.includes(p.id) ? "✓" : ""}</button></td>
                      <td><button class="linkish" data-page="product-detail" data-product-id="${p.id}">${p.name}</button><small class="muted-code">${p.code}</small></td>
                      <td>${productPoolCategory(p)}</td>
                      <td><button class="linkish" data-page="manager-analysis" data-manager-id="${p.managerId}">${p.manager}</button></td>
                      <td>${p.annualReturn.toFixed(2)}%</td>
                      <td>${p.maxDrawdown.toFixed(2)}%</td>
                      <td>${p.sharpe.toFixed(2)}</td>
                      <td>${p.score}</td>
                      <td><button class="linkish" data-detail="compare:${p.id}">查看拆解</button></td>
                    </tr>
                  `,
                )
                .join("")}
            </tbody>
          </table>
        </div>
      </section>
    </section>
  `;
}

function renderProductDetail() {
  const p = product();
  const hasStrategy = Boolean(p.allocation);
  const riskChartMin = Math.min(-8, Math.floor(Math.min(...p.drawdown, -p.maxDrawdown) - 1));
  const cashMax = hasStrategy ? Math.max(2, Math.ceil(Math.max(...p.cashSeries) * 1.1)) : 2;
  return `
    ${renderHero("product")}
    <section class="dashboard-grid">
      <div class="two-row">
        <section class="card panel">
          <h2 class="panel-title">业绩表现</h2>
          <h3 class="panel-subtitle">产品净值 vs 模拟基准 vs 模拟同类中位数</h3>
          <div class="legend">
            <span class="legend-item"><i class="legend-line" style="background:#0f5cff"></i>${p.name}</span>
            <span class="legend-item"><i class="legend-line" style="background:#ff7a1a"></i>模拟基准</span>
            <span class="legend-item"><i class="legend-line" style="background:#00a99d"></i>模拟同类中位数</span>
          </div>
          <button class="chart clickable" data-detail="performance">${lineChart([
            { name: p.name, values: p.navSeries, color: "#0f5cff" },
            { name: "模拟基准", values: p.benchmarkSeries, color: "#ff7a1a" },
            { name: "模拟同类中位数", values: p.peerSeries, color: "#00a99d" },
          ], { labels: p.labels })}</button>
        </section>
        <section class="card panel">
          <h2 class="panel-title">收益质量</h2>
          <button class="blank-panel clickable" data-detail="quality">
            <span>收益质量指标待接入</span>
          </button>
        </section>
      </div>
      <div class="two-row">
        <section class="card panel">
          <h2 class="panel-title">风险控制</h2>
          <div class="metric-grid">
            ${[
              ["最大回撤", `${p.maxDrawdown.toFixed(2)}%`, "max-dd"],
              ["当前回撤", `${p.currentDrawdown.toFixed(2)}%`, "current-dd"],
              ["回撤观察期", `${p.recoveryDays}天`, "recovery"],
              ["年化波动率", `${p.vol.toFixed(2)}%`, "vol"],
              ["卡玛比率", p.calmar.toFixed(2), "calmar"],
            ]
              .map(([label, value, key]) => `<button class="metric-card" data-detail="${key}"><b>${label}</b><span>${value}</span></button>`)
              .join("")}
          </div>
          <div class="risk-layout">
            <div>
              <div class="chart-title">回撤曲线</div>
              <button class="chart clickable" data-detail="drawdown">${lineChart([{ name: "回撤", values: p.drawdown, color: "#0f5cff" }], { min: riskChartMin, max: 1, percent: true, threshold: -p.maxDrawdown, labels: p.labels })}</button>
            </div>
            <button class="mini-card clickable" data-detail="peer-dd">
              <h3>产品 vs 模拟同类最大回撤</h3>
              <div>${barChart([
                { name: p.name, value: p.maxDrawdown, color: "#0f5cff" },
                { name: "同类中位数", value: p.peerMaxDrawdown, color: "#9aa8bd" },
              ])}</div>
            </button>
          </div>
        </section>
        <section class="card panel">
          <h2 class="panel-title">策略行为</h2>
          ${
            hasStrategy
              ? `
                <div class="strategy-grid">
                  <div>
                    <h3 class="panel-subtitle">策略配置比例（%）</h3>
                    <div class="legend compact">
                      ${p.allocation.series.map((item) => `<span class="legend-item"><i class="legend-line" style="background:${item.color}"></i>${item.name}</span>`).join("")}
                    </div>
                    <button class="chart short clickable" data-detail="allocation">${areaChart(p.allocation)}</button>
                  </div>
                  <div>
                    <h3 class="panel-subtitle">现金占比变化（%）</h3>
                    <button class="chart short clickable" data-detail="cash">${lineChart([{ name: "现金占比", values: p.cashSeries, color: "#0f5cff" }], { min: 0, max: cashMax, percent: true, labels: p.allocation.dates })}</button>
                  </div>
                </div>
                <div class="bottom-metrics">
                  ${p.strategyMetrics.map(([label, value], index) => `<button class="bottom-metric clickable ${index === 1 ? "orange" : ""}" data-detail="${index === 0 ? "hhi" : index === 1 ? "cash-risk" : "confidence"}"><b>${label}</b><span>${value}</span></button>`).join("")}
                </div>
              `
              : `<button class="blank-panel clickable" data-detail="allocation"><span>当前产品未接入策略行为数据</span></button>`
          }
        </section>
      </div>
    </section>
  `;
}

const MANAGER_COLORS = ["#0f5cff", "#00a99d", "#ff7a1a", "#6b4ce6"];

const STRATEGIC_CENTER_WEIGHTS = {
  M1: { equity: 0.26, bond: 0.34, quant: 0.24, cta: 0.1, cash: 0.06 },
  M2: { equity: 0.46, bond: 0.14, quant: 0.2, cta: 0.15, cash: 0.05 },
  M3: { equity: 0.31, bond: 0.2, quant: 0.29, cta: 0.12, cash: 0.08 },
};

const ASSET_INDEX_RETURNS = {
  equity: [0.018, -0.024, 0.012, -0.018, 0.042, 0.018, -0.012, 0.026, 0.016, -0.008, 0.022, 0.034, 0.019, -0.014, 0.028, 0.021, 0.012, 0.024, -0.006],
  bond: [0.004, 0.005, 0.003, 0.004, 0.002, 0.005, 0.003, 0.004, 0.003, 0.005, 0.004, 0.003, 0.004, 0.002, 0.004, 0.003, 0.004, 0.005, 0.003],
  quant: [0.009, 0.006, -0.002, 0.011, 0.014, 0.005, 0.008, 0.012, -0.004, 0.01, 0.013, 0.009, 0.007, 0.004, 0.011, 0.012, 0.006, 0.01, 0.008],
  cta: [0.012, -0.006, 0.015, 0.008, -0.004, 0.011, 0.016, -0.003, 0.013, 0.006, -0.005, 0.014, 0.009, 0.012, -0.002, 0.01, 0.013, -0.004, 0.011],
  cash: [0.0018, 0.0018, 0.0017, 0.0018, 0.0017, 0.0018, 0.0018, 0.0017, 0.0018, 0.0017, 0.0018, 0.0018, 0.0017, 0.0018, 0.0017, 0.0018, 0.0018, 0.0017, 0.0018],
};

const TACTICAL_ABILITY_METRICS = {
  M1: { envMatch: 74, envWinRate: 61, envExcess: 0.42, eventResponse: 76, eventWinRate: 63, eventExcess: 0.36 },
  M2: { envMatch: 62, envWinRate: 52, envExcess: 0.18, eventResponse: 58, eventWinRate: 49, eventExcess: 0.05 },
  M3: { envMatch: 68, envWinRate: 55.3, envExcess: 0.28, eventResponse: 72, eventWinRate: 60, eventExcess: 0.18 },
};

function strategicBenchmarkData(managerItem) {
  const weights = STRATEGIC_CENTER_WEIGHTS[managerItem.id] || STRATEGIC_CENTER_WEIGHTS.M1;
  const returns = ASSET_INDEX_RETURNS.equity.map((_, index) =>
    Object.keys(weights).reduce((sum, key) => sum + weights[key] * ASSET_INDEX_RETURNS[key][index], 0),
  );
  const nav = [1];
  returns.forEach((value) => nav.push(Number((nav.at(-1) * (1 + value)).toFixed(4))));
  const drawdown = [];
  let peak = nav[0];
  nav.forEach((value) => {
    peak = Math.max(peak, value);
    drawdown.push(Number(((value / peak - 1) * 100).toFixed(2)));
  });
  const rollingSharpe = nav.map((_, index) => {
    const scoped = returns.slice(Math.max(0, index - 6), index);
    if (!scoped.length) return 0;
    const avgReturn = average(scoped);
    const variance = average(scoped.map((value) => Math.pow(value - avgReturn, 2)));
    const vol = Math.sqrt(Math.max(variance, 0.000001));
    return Number(((avgReturn / vol) * Math.sqrt(12)).toFixed(2));
  });
  return { returns, nav, drawdown, rollingSharpe };
}

function managerBenchmarkSeries(field) {
  return managers.map((item, index) => ({
    name: item.name,
    values: strategicBenchmarkData(item)[field],
    color: MANAGER_COLORS[index % MANAGER_COLORS.length],
  }));
}

function renderStrategyCapabilityPanel(cap, managerItem) {
  const navSeries = managerBenchmarkSeries("nav");
  const drawdownSeries = managerBenchmarkSeries("drawdown");
  const sharpeSeries = managerBenchmarkSeries("rollingSharpe");
  const selectedData = strategicBenchmarkData(managerItem);
  const selectedReturn = percentageReturn(selectedData.nav[0], selectedData.nav.at(-1));
  const selectedMaxDrawdown = maxDrawdownPct(selectedData.nav);
  const selectedSharpe = selectedData.rollingSharpe.at(-1);
  return `
    <section class="card capability-panel capability-rich strategy-capability">
      <div class="tactical-head">
        <div>
          <h2 class="panel-title small">${cap.title}</h2>
          <p>按管理人年度战略配置中枢权重，乘以对应资产类别指数收益，合成战略配置基准组合，并观察净值、回撤和滚动夏普。</p>
        </div>
        <div class="tactical-head-stats">
          <span>${managerItem.name}基准收益 ${selectedReturn.toFixed(2)}%</span>
          <span>最大回撤 ${selectedMaxDrawdown.toFixed(2)}%</span>
          <span>滚动夏普 ${selectedSharpe.toFixed(2)}</span>
        </div>
      </div>
      <div class="strategy-chart-grid">
        <div class="visual-card">
          <h3>管理人战略配置基准净值曲线</h3>
          <div class="legend compact">${managers.map((item, index) => `<span class="legend-item"><i class="legend-line" style="background:${MANAGER_COLORS[index % MANAGER_COLORS.length]}"></i>${item.name}</span>`).join("")}</div>
          ${lineChart(navSeries, { labels: months })}
        </div>
        <div class="visual-card">
          <h3>管理人战略配置基准回撤曲线</h3>
          ${lineChart(drawdownSeries, { labels: months, percent: true, min: Math.min(-12, ...drawdownSeries.flatMap((item) => item.values)), max: 1 })}
        </div>
        <div class="visual-card">
          <h3>滚动夏普曲线</h3>
          ${lineChart(sharpeSeries, { labels: months, min: Math.min(-1, ...sharpeSeries.flatMap((item) => item.values)), max: Math.max(5, ...sharpeSeries.flatMap((item) => item.values)) })}
        </div>
      </div>
      <div class="qualitative-analysis">
        <b>定性分析</b>
        <span>${managerItem.name}的战略配置基准用于回答“年度中枢本身是否有效”。净值曲线看长期收益贡献，回撤曲线看中枢在压力阶段的防守能力，滚动夏普看风险收益效率是否稳定。若未来接入真实年度中枢权重和资产类别指数，本模块可直接替换当前模拟序列。</span>
      </div>
    </section>
  `;
}

function renderTacticalCapabilityPanel(cap, managerItem) {
  const metrics = TACTICAL_ABILITY_METRICS[managerItem.id] || TACTICAL_ABILITY_METRICS.M1;
  const metricCards = [
    ["环境模块", "环境匹配度", `${metrics.envMatch.toFixed(1)}%`, "调仓方向与市场状态的一致性"],
    ["环境模块", "胜率", `${metrics.envWinRate.toFixed(1)}%`, "环境判断后组合表现为正的比例"],
    ["环境模块", "超额收益", `${metrics.envExcess >= 0 ? "+" : ""}${metrics.envExcess.toFixed(2)}%`, "环境判断后相对基准的平均贡献"],
    ["事件模块", "事件响应度", `${metrics.eventResponse.toFixed(1)}%`, "风险或机会事件触发后的动作及时性"],
    ["事件模块", "胜率", `${metrics.eventWinRate.toFixed(1)}%`, "事件响应后收益改善的比例"],
    ["事件模块", "超额收益", `${metrics.eventExcess >= 0 ? "+" : ""}${metrics.eventExcess.toFixed(2)}%`, "事件响应后的平均超额表现"],
  ];
  return `
    <section class="card capability-panel capability-rich tactical-capability">
      <div class="tactical-head">
        <div>
          <h2 class="panel-title small">${cap.title}</h2>
          <p>战术配置能力拆成环境模块和事件模块，各模块分别观察独特指标，并共用胜率与超额收益评价动作有效性。</p>
        </div>
        <div class="tactical-head-stats">
          <span>环境匹配 ${metrics.envMatch.toFixed(1)}%</span>
          <span>事件响应 ${metrics.eventResponse.toFixed(1)}%</span>
          <span>综合胜率 ${average([metrics.envWinRate, metrics.eventWinRate]).toFixed(1)}%</span>
        </div>
      </div>
      <div class="ability-metric-grid">
        ${metricCards
          .map(
            ([moduleName, label, value, hint]) => `
              <button class="ability-metric-card clickable" data-detail="tactical-metric:${moduleName}:${label}">
                <small>${moduleName}</small>
                <b>${label}</b>
                <strong>${value}</strong>
                <span>${hint}</span>
              </button>
            `,
          )
          .join("")}
      </div>
      <div class="qualitative-analysis">
        <b>定性分析</b>
        <span>${managerItem.name}的战术配置评价重点从单纯调仓频率转向“是否看对环境、是否及时响应事件、响应后是否产生胜率和超额收益”。环境模块适合观察市场状态判断，事件模块适合观察回撤、风格漂移、开放赎回或业绩突变后的处理质量。</span>
      </div>
    </section>
  `;
}

function renderCapabilityPanel(cap, managerItem) {
  if (cap.key === "strategy") return renderStrategyCapabilityPanel(cap, managerItem);
  if (cap.key === "tactical") return renderTacticalCapabilityPanel(cap, managerItem);
  if (cap.key === "selection" && managerItem.id === "M3") {
    return `
      <section class="card capability-panel capability-blank">
        <h2 class="panel-title small">${cap.title}</h2>
        <button class="blank-panel clickable" data-detail="capability:${cap.key}">
          <span>选基能力待接入底层基金数据后展示</span>
        </button>
      </section>
    `;
  }
  return `
    <button class="card capability-panel clickable" data-detail="capability:${cap.key}">
      <h2 class="panel-title small">${cap.title}</h2>
      <div class="capability-headline">
        <b>${cap.level}</b>
        <p>${cap.text}</p>
      </div>
      <div class="detail-list">
        ${cap.metrics.map(([label, value]) => `<div class="detail-pill"><b>${label}</b><span>${value}</span></div>`).join("")}
      </div>
    </button>
  `;
}

function renderManagerAnalysis(capabilityKey) {
  const m = manager();
  const caps = capabilityKey ? m.capabilities.filter((item) => item.key === capabilityKey) : m.capabilities;
  return `
    ${renderHero("manager")}
    <section class="manager-grid ${capabilityKey ? "single-capability" : "capability-overview"}">
      ${caps
        .map((cap) => renderCapabilityPanel(cap, m))
        .join("")}
    </section>
  `;
}

function renderCompare() {
  const selected = products.filter((item) => state.compareProductIds.includes(item.id));
  const compareColors = ["#0f5cff", "#ff7a1a", "#00a99d", "#6b4ce6", "#e15c3b", "#90a4bc"];
  const longestSeries = selected.reduce((winner, item) => (item.navSeries.length > winner.navSeries.length ? item : winner), selected[0] || products[0]);
  return `
    <section class="compare-layout">
      <aside class="card list-card">
        <h2 class="panel-title small">选择产品</h2>
        <div class="select-list">
          ${products
            .map(
              (p) => `
                <button class="select-row ${state.compareProductIds.includes(p.id) ? "active" : ""}" data-toggle-product="${p.id}">
                  <span><b>${p.name}</b><small>${p.code} / ${p.manager}</small></span>
                  <span class="tag">${p.rating}</span>
                </button>
              `,
            )
            .join("")}
        </div>
      </aside>
      <section class="card panel">
        <h2 class="panel-title">产品对比</h2>
        <div class="toolbar">
          <button class="tag clickable" data-detail="compare-rule">评分规则</button>
          <button class="tag clickable" data-command="export">导出对比</button>
        </div>
        <section class="compare-chart-panel">
          <h3 class="panel-subtitle">产品净值对比图</h3>
          <div class="legend compact">
            ${selected.map((p, index) => `<span class="legend-item"><i class="legend-line" style="background:${compareColors[index % compareColors.length]}"></i>${p.name}</span>`).join("")}
          </div>
          <button class="chart clickable" data-detail="compare-nav">${lineChart(
            selected.map((p, index) => ({ name: p.name, values: p.navSeries, color: compareColors[index % compareColors.length] })),
            { labels: longestSeries.labels },
          )}</button>
        </section>
        <div class="table-wrap">
          <table>
            <thead><tr><th>产品</th><th>管理人</th><th>年化收益</th><th>最大回撤</th><th>波动率</th><th>夏普</th><th>卡玛</th><th>操作</th></tr></thead>
            <tbody>
              ${selected
                .map(
                  (p) => `
                    <tr>
                      <td><button class="linkish" data-page="product-detail" data-product-id="${p.id}">${p.name}</button></td>
                      <td><button class="linkish" data-page="manager-analysis" data-manager-id="${p.managerId}">${p.manager}</button></td>
                      <td>${p.annualReturn.toFixed(1)}%</td>
                      <td>${p.maxDrawdown.toFixed(2)}%</td>
                      <td>${p.vol.toFixed(2)}%</td>
                      <td>${p.sharpe.toFixed(2)}</td>
                      <td>${p.calmar.toFixed(2)}</td>
                      <td><button class="linkish" data-detail="compare:${p.id}">查看拆解</button></td>
                    </tr>
                  `,
                )
                .join("")}
            </tbody>
          </table>
        </div>
      </section>
    </section>
  `;
}

function renderIndicatorLibrary() {
  return `
    <section class="library-layout">
      <aside class="card list-card">
        <h2 class="panel-title small">指标分类</h2>
        <div class="segmented">
          ${Object.keys(indicatorGroups).map((key) => `<button class="${state.activeLibrary === key ? "active" : ""}" data-library="${key}">${key}</button>`).join("")}
        </div>
      </aside>
      <section class="card panel">
        <h2 class="panel-title">${state.activeLibrary}指标</h2>
        <div class="table-wrap">
          <table>
            <thead><tr><th>指标名称</th><th>业务含义</th><th>入口</th></tr></thead>
            <tbody>
              ${indicatorGroups[state.activeLibrary]
                .map(
                  ([name, desc]) => `
                  <tr>
                    <td><button class="linkish" data-detail="indicator:${name}">${name}</button></td>
                    <td>${desc}</td>
                    <td><button class="linkish" data-detail="indicator:${name}">查看口径</button></td>
                  </tr>
                `,
                )
                .join("")}
            </tbody>
          </table>
        </div>
      </section>
    </section>
  `;
}

function labelClass(label) {
  if (label.includes("预警")) return "danger";
  if (label.includes("安抚")) return "warning";
  if (label.includes("增值")) return "success";
  return "info";
}

function nextSopStatus(item) {
  const flows = {
    风险事件预警: ["待内部处理", "跟踪中", "待确认应对口径", "已形成应对口径", "已转一线确认"],
    "一线/客户触达": ["待生成内容", "待一线确认", "待客户触达", "已触达", "已归档"],
  };
  const flow = flows[item.module] || ["待处理", "处理中", "已完成"];
  const currentIndex = flow.indexOf(item.status);
  return flow[Math.min(currentIndex + 1, flow.length - 1)] || flow[1];
}

function advanceSopEvent(eventId) {
  const item = focusEvents.find((event) => event.id === eventId);
  if (!item) return;
  const nextStatus = nextSopStatus(item);
  if (item.status === nextStatus) {
    toast("该事件已处于最终状态");
    return;
  }
  item.status = nextStatus;
  toast(`已更新：${item.target} / ${item.scene} -> ${nextStatus}`);
  render();
}

function sopStatusCell(item) {
  return `
    <div class="status-actions">
      <button class="linkish" data-detail="sop-event:${item.id}">${item.status}</button>
      <button class="mini-action" data-sop-advance="${item.id}">推进</button>
    </div>
  `;
}

function renderSopMetricCards(items) {
  return `
    <div class="sop-metrics">
      ${items
        .map(
          ([label, value, hint]) => `
            <button class="sop-metric clickable" data-detail="sop-metric:${label}">
              <b>${label}</b>
              <strong>${value}</strong>
              <span>${hint}</span>
            </button>
          `,
        )
        .join("")}
    </div>
  `;
}

function renderFocusRows(filterModule) {
  const rows = filterModule ? focusEvents.filter((item) => item.module === filterModule) : focusEvents;
  return rows
    .map(
      (item) => `
        <tr>
          <td><button class="linkish" data-page="sop-workbench" data-product-id="${item.productId}">${item.target}</button></td>
          <td>${item.scene}</td>
          <td>${item.driver}</td>
          <td><span class="status-tag ${labelClass(item.label)}">${item.label}</span></td>
          <td><span class="level-chip">${item.level}</span></td>
          <td>${item.trigger}</td>
          <td>${item.nextAction}</td>
          <td>${sopStatusCell(item)}</td>
        </tr>
      `,
    )
    .join("");
}

function renderSopOverview() {
  return `
    <section class="sop-overview">
      <div class="sop-titlebar card">
        <div>
          <h2>售后SOP总览</h2>
          <p>先看内部预警和一线/客户触达的全局状态，点击强关注项后进入产品级工作台。</p>
        </div>
        <div class="sop-actions">
          <button class="tag clickable" data-detail="rules-library">规则库维护</button>
          <button class="tag clickable" data-detail="speech-template">话术模板</button>
        </div>
      </div>
      <div class="sop-dual">
        <section class="card sop-column">
          <div class="sop-column-head">
            <div>
              <h3>风险事件预警</h3>
              <p>内部使用，阈值更严格，售后触发前先联系管理人或等待投研判断。</p>
            </div>
            <button class="linkish" data-page="risk-alert">进入总览</button>
          </div>
          ${renderSopMetricCards(sopMetrics.risk)}
        </section>
        <section class="card sop-column">
          <div class="sop-column-head">
            <div>
              <h3>一线/客户触达</h3>
              <p>面向一线和客户触达，承接安抚、提示、增值服务和进一步营销。</p>
            </div>
            <button class="linkish" data-page="service">进入总览</button>
          </div>
          ${renderSopMetricCards(sopMetrics.service)}
        </section>
      </div>
      <section class="card panel">
        <div class="sop-section-head">
          <div>
            <h2 class="panel-title">强关注列表</h2>
            <p class="panel-subtitle">覆盖内部预警、一线/客户触达和可营销机会，优先处理高等级事项。</p>
          </div>
          <button class="tag clickable" data-detail="sop-flow">查看处理流程</button>
        </div>
        <div class="table-wrap">
          <table>
            <thead><tr><th>对象</th><th>场景</th><th>驱动</th><th>标签</th><th>等级</th><th>触发原因</th><th>建议动作</th><th>状态</th></tr></thead>
            <tbody>${renderFocusRows()}</tbody>
          </table>
        </div>
      </section>
    </section>
  `;
}

function renderRiskEventCards(filterModule) {
  const events = filterModule ? focusEvents.filter((item) => item.module === filterModule) : focusEvents;
  const high = events.filter((e) => e.level === "高");
  const mid = events.filter((e) => e.level === "中");
  const low = events.filter((e) => e.level === "低");

  function cardGroup(items, levelLabel, colorClass) {
    if (!items.length) return "";
    return `
      <div class="risk-group">
        <div class="risk-group-header">
          <span class="risk-level-badge ${colorClass}">${levelLabel}</span>
          <span class="risk-group-count">${items.length} 项</span>
        </div>
        <div class="risk-card-list">
          ${items
            .map(
              (item) => `
                <div class="risk-event-card">
                  <div class="risk-event-row">
                    <button class="linkish risk-event-target" data-page="sop-workbench" data-product-id="${item.productId}">${item.target}</button>
                    <span class="status-tag ${labelClass(item.label)}">${item.label}</span>
                    <span class="risk-event-status">${item.status}</span>
                  </div>
                  <div class="risk-event-scene">${item.scene}</div>
                  <div class="risk-event-action">${item.nextAction}</div>
                </div>
              `,
            )
            .join("")}
        </div>
      </div>
    `;
  }

  return `
    <div class="risk-event-groups">
      ${cardGroup(high, "高等级", "risk-high")}
      ${cardGroup(mid, "中等级", "risk-mid")}
      ${cardGroup(low, "低等级", "risk-low")}
    </div>
  `;
}

function renderRiskAlertOverview() {
  const events = focusEvents.filter((item) => item.module === "风险事件预警");
  const high = events.filter((e) => e.level === "高");
  const mid = events.filter((e) => e.level === "中");
  return `
    <section class="sop-overview">
      <div class="sop-titlebar card">
        <div>
          <h2>风险事件预警总览</h2>
          <p>内部预警先于客户触达，用更严格的阈值发现问题，推动管理人沟通和应对口径确认。</p>
        </div>
        <div class="sop-actions">
          <button class="tag clickable" data-detail="rules-library">规则库维护</button>
          <button class="tag clickable" data-page="after-sales">返回总览</button>
        </div>
      </div>
      <div class="risk-summary-row">
        <div class="card risk-summary-card">
          <strong class="risk-count-high">${high.length}</strong>
          <b>高等级预警</b>
          <span>需优先内部处理</span>
        </div>
        <div class="card risk-summary-card">
          <strong class="risk-count-mid">${mid.length}</strong>
          <b>中等级预警</b>
          <span>持续跟踪观察</span>
        </div>
        <div class="card risk-summary-card">
          <strong class="risk-count-total">${events.length}</strong>
          <b>预警总数</b>
          <span>本周期内</span>
        </div>
      </div>
      <section class="card panel">
        <h2 class="panel-title">内部强关注</h2>
        <p class="panel-subtitle">以下事件尚未进入完整一线/客户触达，需内部提前处理并确认应对口径。</p>
        ${renderRiskEventCards("风险事件预警")}
      </section>
    </section>
  `;
}

function renderServiceOverview() {
  return `
    <section class="sop-overview">
      <div class="sop-titlebar card">
        <div>
          <h2>一线/客户触达总览</h2>
          <p>承接已经可以触达一线或客户的事项，区分安抚、提示、增值和可营销机会。</p>
        </div>
        <div class="sop-actions">
          <button class="tag clickable" data-detail="speech-template">话术模板</button>
          <button class="tag clickable" data-page="after-sales">返回总览</button>
        </div>
      </div>
      <section class="card panel">
        ${renderSopMetricCards(sopMetrics.service)}
      </section>
      <section class="card panel">
        <div class="sop-section-head">
          <div>
            <h2 class="panel-title">待触达与可营销机会</h2>
            <p class="panel-subtitle">点击对象进入产品售后工作台，生成或确认一线动作。</p>
          </div>
        </div>
        <div class="table-wrap">
          <table>
            <thead><tr><th>对象</th><th>场景</th><th>驱动</th><th>标签</th><th>等级</th><th>触发原因</th><th>建议动作</th><th>状态</th></tr></thead>
            <tbody>${renderFocusRows("一线/客户触达")}</tbody>
          </table>
        </div>
      </section>
    </section>
  `;
}

function renderSopWorkbench() {
  const p = product();
  const related = focusEvents.filter((item) => item.productId === p.id);
  return `
    <section class="sop-overview">
      <div class="product-switcher card">
        <div>
          <b>产品售后工作台</b>
          <span>${p.name} / ${p.type}</span>
        </div>
        <div class="product-tabs">
          ${products.map((item) => `<button class="${item.id === p.id ? "active" : ""}" data-page="sop-workbench" data-product-id="${item.id}">${item.name}</button>`).join("")}
        </div>
      </div>
      <section class="card hero-grid">
        <div class="info-panel">
          <div class="info-row"><span class="label">产品名称：</span><span><button class="linkish" data-page="product-detail" data-product-id="${p.id}">${p.name}</button></span></div>
          <div class="info-row"><span class="label">产品类型：</span><span>${p.type}</span></div>
          <div class="info-row"><span class="label">最新净值：</span><span>${p.nav}</span></div>
          <div class="info-row"><span class="label">最大回撤：</span><span>${p.maxDrawdown.toFixed(2)}%</span></div>
        </div>
        <button class="card summary-box clickable" data-detail="sop-product-risk">
          <h2 class="summary-title"><span class="status-dot warn">!</span>内部预警动作</h2>
          <p>确认触发依据，必要时联系管理人，形成统一应对口径后再转入一线/客户触达。</p>
        </button>
        <button class="card summary-box clickable" data-detail="sop-product-service">
          <h2 class="summary-title"><span class="status-dot good">✓</span>一线/客户触达动作</h2>
          <p>根据标签生成一线话术、客户安抚内容或增值服务内容，并跟踪触达反馈。</p>
        </button>
      </section>
      <section class="card panel">
        <div class="sop-section-head">
          <div>
            <h2 class="panel-title">当前产品事件</h2>
            <p class="panel-subtitle">这里才进入围绕单个产品的处理工作台。</p>
          </div>
          <button class="tag clickable" data-detail="speech-template">生成服务话术</button>
        </div>
        <div class="table-wrap">
          <table>
            <thead><tr><th>模块</th><th>场景</th><th>标签</th><th>等级</th><th>触发原因</th><th>建议动作</th><th>状态</th></tr></thead>
            <tbody>
              ${related
                .map(
                  (item) => `
                    <tr>
                      <td>${item.module}</td>
                      <td>${item.scene}</td>
                      <td><span class="status-tag ${labelClass(item.label)}">${item.label}</span></td>
                      <td><span class="level-chip">${item.level}</span></td>
                      <td>${item.trigger}</td>
                      <td>${item.nextAction}</td>
                      <td>${sopStatusCell(item)}</td>
                    </tr>
                  `,
                )
                .join("")}
            </tbody>
          </table>
        </div>
      </section>
    </section>
  `;
}

function renderPlaceholder(kind) {
  const title = pageTitle();
  const actions = {
    "risk-alert": ["查看红黄灯名单", "生成客户沟通要点", "追踪回撤修复"],
    service: ["查看触达记录", "新增跟进事项", "同步客户名单"],
    "after-sales": ["风险事件预警", "一线/客户触达", "客户触达计划"],
    settings: ["用户权限", "数据源配置", "指标阈值"],
  }[kind] || ["查看详情"];
  return `
    <section class="card panel">
      <h2 class="panel-title">${title}</h2>
      <p class="panel-subtitle">该模块已预留入口，后续可以接入真实工作流。</p>
      <div class="manager-grid">
        ${actions.map((item) => `<button class="card summary-box clickable" data-detail="placeholder:${item}"><h2 class="summary-title">${item}</h2><p>点击后可查看该功能的数据口径、待办动作和扩展字段。</p></button>`).join("")}
      </div>
    </section>
  `;
}

function renderContent() {
  if (state.page === "product-pool") return renderProductPool();
  if (state.page === "product-detail") return renderProductDetail();
  if (state.page === "product-compare") return renderCompare();
  if (state.page === "manager-analysis") return renderManagerAnalysis();
  if (state.page === "manager-strategy") return renderManagerAnalysis("strategy");
  if (state.page === "manager-tactical") return renderManagerAnalysis("tactical");
  if (state.page === "manager-selection") return renderManagerAnalysis("selection");
  if (state.page === "after-sales") return renderSopOverview();
  if (state.page === "risk-alert") return renderRiskAlertOverview();
  if (state.page === "service") return renderServiceOverview();
  if (state.page === "sop-workbench") return renderSopWorkbench();
  if (state.page === "indicator-library") return renderIndicatorLibrary();
  return renderPlaceholder(state.page);
}

function render() {
  document.querySelector("#app").innerHTML = `
    ${renderSidebar()}
    <main class="main">
      ${renderTopbar()}
      <div class="content">${renderContent()}</div>
    </main>
    <div class="drawer-mask"></div>
    <div class="toast"></div>
  `;
  bindEvents();
}

function detailBlocks(detail) {
  const p = product();
  const m = manager();
  const capKey = detail.split(":")[1];
  const cap = m.capabilities.find((item) => item.key === capKey);
  const specificProduct = products.find((item) => item.id === capKey);
  const map = {
    product: ["产品档案", `${p.name} / ${p.code}`, [{ title: "核心信息", body: [`管理人：${p.manager}`, `类型：${p.type}`, `评分：${p.score} / ${p.rating}`, `最新净值：${p.nav}`] }]],
    manager: ["管理人档案", m.name, [{ title: "覆盖范围", body: [`跟踪产品：${m.productCount}只`, `跟踪子基金：${m.fundCount}只`, `管理人类型：${m.type}`] }]],
    type: ["产品类型说明", p.type, [{ title: "扩展字段", body: "类型字段后续可接入同类池、策略标签、适配客户风险等级和推荐规则。" }]],
    funds: ["子基金明细", m.name, [{ title: "预留明细", body: "这里可扩展为底层基金列表、贡献拆解、持仓变动和基金经理评价。" }]],
    conclusion: ["系统结论", p.name, [{ title: "结论依据", body: ["业绩相对基准和同类中位数占优。", "最大回撤和修复时间处于可接受区间。", "策略配置未出现明显单一暴露。"] }]],
    risk: ["主要风险", p.name, [{ title: "风险拆解", body: ["权益类策略占比提升，组合进攻性增强。", "现金缓冲下降，赎回和波动场景下的安全垫变薄。", "需要继续观察回撤修复速度。"] }]],
    "manager-conclusion": ["系统结论", m.name, [{ title: "结论依据", body: ["三大能力评分均处于稳健区间。", "跟踪产品数量和底层子基金覆盖较充分。", "风格一致性和能力稳定性可继续纳入月度跟踪。"] }]],
    "manager-risk": ["主要风险", m.name, [{ title: "风险拆解", body: ["市场急跌阶段战术配置压力上升。", "需关注权益暴露变化与底层基金集中度。", "后续可扩展风险漂移、集中度和客户触达任务。"] }]],
    performance: ["业绩表现", p.name, [{ title: "图表说明", body: `产品净值来自 ${p.sourceFile}；基准和同类中位数为当前原型中的模拟序列，可在接入同类池后替换。` }]],
    quality: ["收益质量", p.name, [{ title: "留白说明", body: "该模块按本次要求暂不填充，后续可接入胜率、收益分布、上下行捕获、Alpha 稳定性等指标。" }]],
    drawdown: ["回撤曲线", p.name, [{ title: "观察重点", body: ["回撤深度：最大损失幅度。", "修复时间：客户体验中的关键指标。", "回撤频率：判断风险是否常态化。"] }]],
    "peer-dd": ["同类回撤对比", p.name, [{ title: "比较结果", body: `${p.name}最大回撤为${p.maxDrawdown.toFixed(2)}%，模拟同类中位数为${p.peerMaxDrawdown.toFixed(2)}%。` }]],
    allocation: ["策略配置", p.name, [{ title: p.allocation ? "配置结构" : "留白说明", body: p.allocation ? "点击面积层可查看对应策略最新占比。后续可扩展为策略漂移、贡献和调仓归因。" : "当前产品文件未提供策略配置字段，因此策略行为区域保留为空。" }]],
    cash: ["现金占比", p.name, [{ title: "现金缓冲", body: p.allocation ? "现金占比来自策略配置字段，可用于观察组合进攻性和流动性缓冲。" : "当前产品未提供现金占比字段。" }]],
    hhi: [p.strategyMetrics?.[0]?.[0] || "策略指标", p.name, [{ title: "指标说明", body: p.strategyMetrics ? `当前展示值：${p.strategyMetrics[0][1]}。用于观察单期调仓或策略集中变化的强度。` : "当前产品未提供策略配置，暂不计算。" }]],
    "cash-risk": [p.strategyMetrics?.[1]?.[0] || "策略指标", p.name, [{ title: "指标说明", body: p.strategyMetrics ? `当前展示值：${p.strategyMetrics[1][1]}。用于衡量策略迁移和组合再平衡的累计强度。` : "当前产品未提供策略配置数据。" }]],
    confidence: [p.strategyMetrics?.[2]?.[0] || "策略指标", p.name, [{ title: "业务含义", body: p.strategyMetrics ? `当前展示值：${p.strategyMetrics[2][1]}。可作为择时能力稳定性的初步观察口径。` : "衡量策略权重稳定性和有效性，适合用于管理人配置能力跟踪。" }]],
    "market-tags": ["市场状态标签库", "战术配置能力", [{ title: "标签用途", body: ["将市场环境拆成权益修复、震荡修复、权益承压、低波动优先等状态。", "判断管理人调仓方向是否与环境一致。", "后续可接投研系统自动生成市场状态。"] }]],
    "compare-rule": ["产品对比规则", "评分口径", [{ title: "对比维度", body: ["收益：年化收益、超额收益、胜率。", "风险：最大回撤、波动率、修复时间。", "行为：策略集中度、现金缓冲度、调仓有效性。"] }]],
    "compare-nav": ["产品净值对比图", "产品对比", [{ title: "图表说明", body: "对选中的产品净值序列进行同屏展示，用于观察净值走势、修复节奏和阶段性分化。" }]],
    "rules-library": ["规则库维护", "售后SOP", [{ title: "维护内容", body: ["投研驱动触发标准：资产、策略、市场事件。", "产品驱动触发标准：回撤、持有期、开放赎回、月度运作、业绩向好。", "风险事件预警阈值应严于一线/客户触达阈值，先内部提醒，再决定是否触达客户。"] }]],
    "speech-template": ["话术模板", "一线与客户触达", [{ title: "模板方向", body: ["预警：说明风险、触发原因、建议动作。", "安抚：解释波动、稳定客户情绪、提示长期视角。", "增值：提供运作信息、增强信任、承接追加推荐。"] }]],
    "sop-flow": ["处理流程", "从内部预警到一线/客户触达", [{ title: "建议流程", body: ["数据触发规则。", "内部预警先处理：确认触发依据、联系管理人或等待投研判断。", "确认应对口径后转入一线/客户触达。", "一线确认话术并触达客户。", "记录客户反馈和后续动作。"] }]],
    "sop-product-risk": ["内部预警动作", p.name, [{ title: "处理重点", body: ["确认是否达到内部预警阈值。", "联系管理人解释回撤或异常原因。", "记录干预动作和管理人反馈。", "决定是否转入一线/客户触达。"] }]],
    "sop-product-service": ["一线/客户触达动作", p.name, [{ title: "触达重点", body: ["按预警/安抚/增值标签生成话术。", "一线确认后再触达客户。", "对业绩向好场景提供追加推荐线索。", "沉淀客户反馈。"] }]],
  };

  if (detail.startsWith("pool-metric:")) {
    const metric = detail.split(":")[1];
    return [
      metric,
      "产品池横截面指标",
      [
        { title: "计算口径", body: `当前按“${state.poolTypeFilter}”分类下的产品计算平均值。` },
        { title: "使用方式", body: "点击产品分类后，产品指标区域会自动切换到对应分类样本。" },
      ],
    ];
  }
  if (detail.startsWith("special:")) {
    const name = detail.split(":")[1];
    return [
      name,
      "特色产品",
      [
        { title: "产品定位", body: "该特色产品入口用于承接货架化展示、客户适配规则、组合方案和服务说明。" },
        { title: "后续扩展", body: "可继续接入产品清单、准入条件、推荐话术和目标客户标签。" },
      ],
    ];
  }
  if (detail.startsWith("sop-event:")) {
    const event = focusEvents.find((item) => item.id === detail.split(":")[1]);
    if (event) {
      return [
        event.scene,
        `${event.module} / ${event.target}`,
        [
          { title: "触发依据", body: event.trigger },
          { title: "建议动作", body: event.nextAction },
          { title: "影响范围", body: `${event.customers}；当前状态：${event.status}` },
        ],
      ];
    }
  }
  if (detail.startsWith("sop-metric:")) {
    const metric = detail.split(":")[1];
    return [metric, "售后SOP总览指标", [{ title: "说明", body: "该指标用于总览当前待处理压力，点击列表中的对象后进入产品级工作台处理。" }]];
  }
  if (detail.startsWith("market-tag:")) {
    const name = detail.split(":")[1];
    const tag = marketStateTags.find((item) => item[0] === name);
    if (tag) return [tag[0], "市场状态标签库", [{ title: "判断口径", body: tag[1] }]];
  }
  if (detail.startsWith("tactical-metric:")) {
    const [, moduleName, metricName] = detail.split(":");
    return [
      metricName,
      moduleName,
      [
        { title: "指标口径", body: moduleName === "环境模块" ? "环境模块衡量管理人根据市场状态进行战术调整后的有效性。" : "事件模块衡量管理人面对风险、机会或运营事件时的响应质量。" },
        { title: "使用方式", body: "与同一模块下的胜率、超额收益联动观察，避免只看动作数量而忽略动作质量。" },
      ],
    ];
  }
  if (detail.startsWith("capability:") && cap) {
    if (cap.key === "strategy") {
      return [
        cap.title,
        m.name,
        [
          { title: "基准净值", body: "按年度战略配置中枢权重乘以资产类别指数收益，合成管理人战略配置基准组合净值。" },
          { title: "回撤与夏普", body: "基于基准净值计算历史回撤，并以滚动窗口收益计算滚动夏普，判断战略中枢的防守能力和风险收益效率。" },
        ],
      ];
    }
    if (cap.key === "tactical") {
      return [
        cap.title,
        m.name,
        [
          { title: "环境模块", body: ["环境匹配度：调仓方向与市场状态是否一致。", "胜率：环境判断后组合表现为正的比例。", "超额收益：环境判断后相对基准的平均贡献。"] },
          { title: "事件模块", body: ["事件响应度：事件触发后的处理及时性和完整性。", "胜率：事件响应后收益改善的比例。", "超额收益：事件响应后相对基准的平均贡献。"] },
        ],
      ];
    }
    if (m.id === "M3" && cap.key === "selection") {
      return [cap.title, m.name, [{ title: "留白说明", body: "选基能力部分暂不展示，待接入底层基金持仓、贡献和留存数据后再补充。" }]];
    }
    return [
      cap.title,
      m.name,
      [
        { title: "能力判断", body: cap.text },
        { title: "关键指标", body: cap.metrics.map(([label, value]) => `${label}：${value}`) },
      ],
    ];
  }
  if (detail.startsWith("compare:") && specificProduct) {
    return [
      `${specificProduct.name}拆解`,
      specificProduct.code,
      [
        { title: "评分概览", body: [`综合评分：${specificProduct.score}`, `评级：${specificProduct.rating}`, `年化收益：${specificProduct.annualReturn.toFixed(1)}%`] },
        { title: "风险概览", body: [`最大回撤：${specificProduct.maxDrawdown.toFixed(2)}%`, `年化波动率：${specificProduct.vol.toFixed(2)}%`, `卡玛比率：${specificProduct.calmar.toFixed(2)}`] },
      ],
    ];
  }
  if (detail.startsWith("indicator:")) {
    const name = detail.split(":")[1];
    return [name, "指标库口径", [{ title: "说明", body: "这里预留指标公式、计算频率、阈值规则和数据字段映射。后续可以直接挂接指标计算服务。" }]];
  }
  if (detail.startsWith("placeholder:")) {
    const name = detail.split(":")[1];
    return [name, "功能预留", [{ title: "扩展方式", body: "该入口已接入交互框架，后续只需要补充数据源、列表字段和详情视图。" }]];
  }
  if (detail === "max-dd" || detail === "current-dd" || detail === "recovery" || detail === "vol" || detail === "calmar") {
    const labels = {
      "max-dd": "最大回撤",
      "current-dd": "当前回撤",
      recovery: "回撤修复时间",
      vol: "年化波动率",
      calmar: "卡玛比率",
    };
    return [labels[detail], p.name, [{ title: "指标解释", body: "点击指标卡后可展示口径说明、历史趋势、同类分位和触发阈值。" }]];
  }
  return map[detail] || ["详情", "可点击信息", [{ title: "说明", body: "该信息点已预留详情入口。" }]];
}

function exportCompareCsv() {
  const selected = products.filter((item) => state.compareProductIds.includes(item.id));
  if (!selected.length) {
    toast("请先选择需要导出的产品");
    return;
  }
  const headers = ["产品", "代码", "管理人", "类型", "年化收益", "最大回撤", "波动率", "夏普", "卡玛", "评分", "评级", "最新净值", "数据来源"];
  const rows = selected.map((p) => [
    p.name,
    p.code,
    p.manager,
    p.type,
    `${p.annualReturn.toFixed(2)}%`,
    `${p.maxDrawdown.toFixed(2)}%`,
    `${p.vol.toFixed(2)}%`,
    p.sharpe.toFixed(2),
    p.calmar.toFixed(2),
    p.score,
    p.rating,
    p.nav,
    p.sourceFile,
  ]);
  const csv = [headers, ...rows].map((row) => row.map(csvCell).join(",")).join("\n");
  downloadTextFile(`product-compare-${new Date().toISOString().slice(0, 10)}.csv`, `\ufeff${csv}`, "text/csv;charset=utf-8");
  toast(`已导出 ${selected.length} 只产品对比 CSV`);
}

function bindEvents() {
  document.querySelectorAll("[data-page]").forEach((el) => {
    el.addEventListener("click", () => {
      setPage(el.dataset.page, {
        productId: el.dataset.productId,
        managerId: el.dataset.managerId,
      });
    });
  });

  document.querySelectorAll("[data-detail]").forEach((el) => {
    el.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();
      const [title, subtitle, blocks] = detailBlocks(el.dataset.detail);
      openDrawer(title, subtitle, blocks);
    });
  });

  document.querySelectorAll("[data-toggle-product]").forEach((el) => {
    el.addEventListener("click", () => {
      const id = el.dataset.toggleProduct;
      if (state.compareProductIds.includes(id)) {
        state.compareProductIds = state.compareProductIds.filter((item) => item !== id);
      } else {
        state.compareProductIds = [...state.compareProductIds, id];
      }
      if (!state.compareProductIds.length) state.compareProductIds = [id];
      render();
    });
  });

  document.querySelectorAll("[data-pool-filter]").forEach((el) => {
    const applyFilter = () => {
      const key = el.dataset.poolFilter;
      const value = el.value || el.dataset.value || "全部";
      if (key === "type") state.poolTypeFilter = value;
      if (key === "manager") state.poolManagerFilter = value;
      render();
    };
    if (el.tagName === "SELECT") {
      el.addEventListener("change", applyFilter);
    } else {
      el.addEventListener("click", applyFilter);
    }
  });

  document.querySelectorAll("[data-pool-select]").forEach((el) => {
    el.addEventListener("click", () => {
      const id = el.dataset.poolSelect;
      if (state.poolSelectedIds.includes(id)) {
        state.poolSelectedIds = state.poolSelectedIds.filter((item) => item !== id);
      } else {
        state.poolSelectedIds = [...state.poolSelectedIds, id];
      }
      render();
    });
  });

  document.querySelectorAll("[data-pool-import]").forEach((el) => {
    el.addEventListener("click", () => {
      if (!state.poolSelectedIds.length) {
        toast("请先选择需要对比的产品");
        return;
      }
      state.compareProductIds = state.poolSelectedIds.slice();
      setPage("product-compare");
      toast(`已导入 ${state.compareProductIds.length} 只产品到产品对比`);
    });
  });

  document.querySelectorAll("[data-library]").forEach((el) => {
    el.addEventListener("click", () => {
      state.activeLibrary = el.dataset.library;
      render();
    });
  });

  document.querySelectorAll("[data-sop-advance]").forEach((el) => {
    el.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();
      advanceSopEvent(el.dataset.sopAdvance);
    });
  });

  document.querySelectorAll("[data-action]").forEach((el) => {
    el.addEventListener("click", () => {
      const [type, id] = el.dataset.action.split(":");
      if (type === "product") setPage("product-detail", { productId: id });
      if (type === "manager") setPage("manager-analysis", { managerId: id });
    });
  });

  document.querySelectorAll("[data-command]").forEach((el) => {
    el.addEventListener("click", () => {
      const command = el.dataset.command;
      if (command === "export") {
        exportCompareCsv();
        return;
      }
      const messages = {
        refresh: "已模拟刷新：数据时间保持 2026-05-21 09:30",
        notifications: "暂无新的风险预警",
        user: "用户中心入口已预留",
      };
      toast(messages[command] || "操作已触发");
    });
  });

  document.querySelectorAll(".point").forEach((point) => {
    point.addEventListener("click", (event) => {
      event.stopPropagation();
      openDrawer(`${point.dataset.title}数据点`, point.dataset.date, [{ title: "数值", body: Number(point.dataset.value).toFixed(2) }]);
    });
  });

  document.querySelectorAll(".bar").forEach((bar) => {
    bar.addEventListener("click", (event) => {
      event.stopPropagation();
      openDrawer(bar.dataset.title, "图表明细", [{ title: "当前值", body: `${Number(bar.dataset.value).toFixed(2)}%` }]);
    });
  });

  const search = document.querySelector("#global-search");
  search.addEventListener("focus", () => {
    if (state.searchOpen) return;
    state.searchOpen = true;
    render();
    document.querySelector("#global-search")?.focus();
  });
  search.addEventListener("input", (event) => {
    const keyword = event.target.value.trim();
    if (!keyword) return;
    const foundProduct = products.find((p) => [p.name, p.code, p.manager].some((v) => v.toLowerCase().includes(keyword.toLowerCase())));
    const foundManager = managers.find((m) => m.name.includes(keyword));
    if (foundProduct || foundManager) {
      toast(`已找到 ${foundProduct?.name || foundManager?.name}`);
    }
  });
}

function initializeApplication() {
  sanitizeCatalogs();
  state.validationErrors = validateCatalogs();
  if (state.validationErrors.length) {
    console.warn("数据校验发现问题：", state.validationErrors);
  }
  render();
}

initializeApplication();
