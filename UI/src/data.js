/* === Sample data for 投研 product evaluation system === */
(function () {
  // Deterministic pseudo-random
  function rng(seed) {
    let s = seed;
    return function () {
      s = (s * 9301 + 49297) % 233280;
      return s / 233280;
    };
  }

  function dateRange(startStr, days) {
    const out = [];
    const d = new Date(startStr);
    for (let i = 0; i < days; i++) {
      out.push(new Date(d.getTime() + i * 86400000).toISOString().slice(0, 10));
    }
    return out;
  }

  function genNav(seed, days, opts) {
    const r = rng(seed);
    const { drift = 0.00035, vol = 0.011, shocks = [] } = opts || {};
    const out = [1];
    for (let i = 1; i < days; i++) {
      let step = drift + (r() - 0.5) * vol * 2;
      const shock = shocks.find((s) => s.day === i);
      if (shock) step += shock.amt;
      out.push(out[i - 1] * (1 + step));
    }
    return out;
  }

  function drawdownSeries(nav) {
    let peak = nav[0];
    return nav.map((v) => {
      peak = Math.max(peak, v);
      return (v - peak) / peak;
    });
  }

  const DAYS = 504; // ~2 years
  const DATES = dateRange("2024-04-01", DAYS);

  // ---- Managers ----
  const managers = [
    {
      id: "M01",
      name: "华润信托",
      type: "信托机构",
      productCount: 18,
      fundCount: 64,
      conclusion: "整体能力较强，战略中枢稳定有效；战术配置在事件驱动场景下响应及时，胜率较高。",
      risk: "策略权重对权益偏多，市场系统性回撤期间净值压力较大；TMT 集中度近期上升。",
      stratSeed: 42,
      stratColor: "#0f5cff",
    },
    {
      id: "M02",
      name: "管理人甲",
      type: "私募证券",
      productCount: 11,
      fundCount: 36,
      conclusion: "中枢偏稳健，长期收益贡献可观，但在风格切换阶段战术响应略迟。",
      risk: "组合久期偏长；信用债池下沉度边际抬升，需关注信用利差走阔风险。",
      stratSeed: 88,
      stratColor: "#00a99d",
    },
    {
      id: "M03",
      name: "管理人乙",
      type: "FOF 管理人",
      productCount: 7,
      fundCount: 22,
      conclusion: "选基偏向 alpha 主动权益，组合分散度尚可；战术上对回撤管理偏被动。",
      risk: "底层基金集中在两家主动管理人，单一管理人风险敞口较大。",
      stratSeed: 137,
      stratColor: "#ff7a1a",
    },
  ];

  // Manager strategic benchmark series (synthetic)
  managers.forEach((m) => {
    const navSeries = genNav(m.stratSeed, DAYS, {
      drift: m.id === "M01" ? 0.00040 : m.id === "M02" ? 0.00028 : 0.00032,
      vol: m.id === "M01" ? 0.009 : m.id === "M02" ? 0.006 : 0.012,
      shocks: m.id === "M03"
        ? [{ day: 180, amt: -0.05 }, { day: 360, amt: -0.04 }]
        : [{ day: 200, amt: -0.025 }],
    });
    m.benchmarkNav = navSeries;
    m.benchmarkDD = drawdownSeries(navSeries);
    // rolling sharpe (60d)
    const window = 60;
    const sharpe = [];
    for (let i = 0; i < navSeries.length; i++) {
      if (i < window) { sharpe.push(null); continue; }
      const rets = [];
      for (let j = i - window + 1; j <= i; j++) {
        rets.push(navSeries[j] / navSeries[j - 1] - 1);
      }
      const mean = rets.reduce((a, b) => a + b, 0) / rets.length;
      const variance = rets.reduce((a, b) => a + (b - mean) ** 2, 0) / rets.length;
      const std = Math.sqrt(variance);
      sharpe.push(std === 0 ? 0 : (mean * 252 - 0.025) / (std * Math.sqrt(252)));
    }
    m.rollingSharpe = sharpe;

    // Tactical metrics
    if (m.id === "M01") {
      m.capabilities = {
        env: { match: 0.78, winRate: 0.64, alpha: 0.058 },
        evt: { response: 0.86, winRate: 0.71, alpha: 0.042 },
      };
    } else if (m.id === "M02") {
      m.capabilities = {
        env: { match: 0.62, winRate: 0.55, alpha: 0.031 },
        evt: { response: 0.58, winRate: 0.49, alpha: 0.018 },
      };
    } else {
      m.capabilities = {
        env: { match: 0.71, winRate: 0.59, alpha: 0.046 },
        evt: { response: 0.48, winRate: 0.52, alpha: 0.022 },
      };
    }
  });

  // ---- Products ----
  // categories: 积极看多 / 谨慎看多 / 低相关 / 类固收
  const CATEGORIES = [
    { id: "agg",  name: "积极看多", color: "#ef3f3f", soft: "#fde8e8", desc: "权益中枢较高，主动承担市场 beta" },
    { id: "mod",  name: "谨慎看多", color: "#ff7a1a", soft: "#fff1e5", desc: "适度暴露权益，重视风险预算" },
    { id: "low",  name: "低相关",   color: "#6b4ce6", soft: "#ede8fc", desc: "与权益相关度低，作为分散工具" },
    { id: "fix",  name: "类固收",   color: "#00a99d", soft: "#e0f5f3", desc: "以信用与利率债底仓为主" },
  ];

  const FEATURED = [
    { id: "ROCK",  name: "磐石3.0",     count: 6, delta: 2,  color: "#0f5cff", soft: "#e8f0ff" },
    { id: "QTR",   name: "类全委",       count: 4, delta: -1, color: "#6b4ce6", soft: "#ede8fc" },
    { id: "PQTR",  name: "白金类全委",   count: 3, delta: 1,  color: "#00a99d", soft: "#e0f5f3" },
  ];

  // base list of products with seed config
  const PROD_TPL = [
    { id: "A108",  name: "磐石3.0-A108", code: "ZS-A108", catId: "agg", mgrId: "M01", rating: "A+", drift: 0.00050, vol: 0.013, shocks: [{day:200,amt:-0.045}], featured: ["ROCK"] },
    { id: "B5",    name: "晨曦量化B5",   code: "QH-B005", catId: "mod", mgrId: "M02", rating: "A",  drift: 0.00038, vol: 0.009, shocks: [{day:210,amt:-0.025}] },
    { id: "C3",    name: "稳益固收C3",   code: "WY-C003", catId: "fix", mgrId: "M01", rating: "A+", drift: 0.00018, vol: 0.0028, shocks: [] },
    { id: "P001",  name: "磐石3.0-001", code: "ZS-001",  catId: "agg", mgrId: "M01", rating: "A",  drift: 0.00045, vol: 0.012, shocks: [{day:200,amt:-0.04}], featured: ["ROCK"] },
    { id: "P002",  name: "磐石3.0-002", code: "ZS-002",  catId: "agg", mgrId: "M01", rating: "A-", drift: 0.00040, vol: 0.014, shocks: [{day:200,amt:-0.05}], featured: ["ROCK"] },
    { id: "P003",  name: "磐石3.0-003", code: "ZS-003",  catId: "agg", mgrId: "M02", rating: "B+", drift: 0.00033, vol: 0.013, shocks: [{day:190,amt:-0.06}], featured: ["ROCK"] },
    { id: "P004",  name: "磐石3.0-004", code: "ZS-004",  catId: "agg", mgrId: "M03", rating: "B",  drift: 0.00028, vol: 0.015, shocks: [{day:200,amt:-0.05},{day:380,amt:-0.03}], featured: ["ROCK"] },
    { id: "P005",  name: "类全委-蓝筹", code: "QW-LZ01", catId: "mod", mgrId: "M01", rating: "A",  drift: 0.00036, vol: 0.008, shocks: [{day:200,amt:-0.022}], featured: ["QTR"] },
    { id: "P006",  name: "类全委-平衡", code: "QW-PH02", catId: "mod", mgrId: "M02", rating: "A-", drift: 0.00030, vol: 0.0085, shocks: [{day:200,amt:-0.025}], featured: ["QTR"] },
    { id: "P007",  name: "类全委-稳健", code: "QW-WJ03", catId: "mod", mgrId: "M01", rating: "B+", drift: 0.00027, vol: 0.007, shocks: [{day:210,amt:-0.022}], featured: ["QTR"] },
    { id: "P008",  name: "类全委-动态", code: "QW-DT04", catId: "mod", mgrId: "M03", rating: "B",  drift: 0.00025, vol: 0.009, shocks: [{day:200,amt:-0.03},{day:400,amt:-0.02}], featured: ["QTR"] },
    { id: "P009",  name: "白金类全委-1", code: "BJ-001", catId: "mod", mgrId: "M01", rating: "A+", drift: 0.00038, vol: 0.0075, shocks: [{day:200,amt:-0.018}], featured: ["PQTR"] },
    { id: "P010",  name: "白金类全委-2", code: "BJ-002", catId: "mod", mgrId: "M01", rating: "A",  drift: 0.00033, vol: 0.0072, shocks: [{day:200,amt:-0.02}],  featured: ["PQTR"] },
    { id: "P011",  name: "白金类全委-3", code: "BJ-003", catId: "mod", mgrId: "M02", rating: "A-", drift: 0.00030, vol: 0.008, shocks: [{day:200,amt:-0.022}], featured: ["PQTR"] },
    { id: "P012",  name: "中证套利-Q1",  code: "TL-Q01", catId: "low", mgrId: "M02", rating: "A",  drift: 0.00029, vol: 0.0042, shocks: [] },
    { id: "P013",  name: "CTA-趋势A",    code: "CTA-A1", catId: "low", mgrId: "M03", rating: "B+", drift: 0.00024, vol: 0.007, shocks: [{day:300,amt:-0.025}] },
    { id: "P014",  name: "宏观对冲-G",   code: "MAC-G1", catId: "low", mgrId: "M02", rating: "B+", drift: 0.00026, vol: 0.0055, shocks: [] },
    { id: "P015",  name: "稳益固收-短", code: "WY-S01",  catId: "fix", mgrId: "M01", rating: "A",  drift: 0.00014, vol: 0.0022, shocks: [] },
    { id: "P016",  name: "稳益固收-中", code: "WY-M01",  catId: "fix", mgrId: "M02", rating: "A",  drift: 0.00016, vol: 0.0026, shocks: [] },
    { id: "P017",  name: "稳益固收-增", code: "WY-Z01",  catId: "fix", mgrId: "M01", rating: "A-", drift: 0.00020, vol: 0.0034, shocks: [{day:320,amt:-0.008}] },
    { id: "P018",  name: "信用精选-1",   code: "XY-001", catId: "fix", mgrId: "M03", rating: "B",  drift: 0.00017, vol: 0.0029, shocks: [{day:330,amt:-0.006}] },
  ];

  const products = PROD_TPL.map((p) => {
    const seed = (p.id.charCodeAt(0) * 17 + p.id.charCodeAt(1) * 31) % 9999;
    const nav = genNav(seed, DAYS, { drift: p.drift, vol: p.vol, shocks: p.shocks });
    // benchmark: smoother version
    const bench = genNav(seed + 1000, DAYS, { drift: p.drift * 0.85, vol: p.vol * 0.7, shocks: p.shocks.map(s => ({day:s.day, amt:s.amt*0.7})) });
    const peer  = genNav(seed + 2000, DAYS, { drift: p.drift * 0.8, vol: p.vol * 0.9, shocks: p.shocks.map(s => ({day:s.day, amt:s.amt*0.85})) });
    const dd = drawdownSeries(nav);
    const ddFloor = Math.min(...dd);
    const peerDD = Math.min(...drawdownSeries(peer));
    const last = nav[nav.length - 1];
    const startVal = nav[0];
    const annualReturn = Math.pow(last / startVal, 252 / DAYS) - 1;
    // Vol
    const rets = nav.map((v, i) => i === 0 ? 0 : v / nav[i-1] - 1).slice(1);
    const meanR = rets.reduce((a,b)=>a+b,0)/rets.length;
    const variance = rets.reduce((a,b)=>a+(b-meanR)**2,0)/rets.length;
    const vol = Math.sqrt(variance) * Math.sqrt(252);
    const sharpe = vol === 0 ? 0 : (annualReturn - 0.025) / vol;
    const calmar = ddFloor === 0 ? 0 : annualReturn / Math.abs(ddFloor);
    const currentDD = dd[dd.length - 1];
    // Recovery days (since last new high)
    let recDays = 0;
    let peak = nav[0];
    for (let i = 0; i < nav.length; i++) {
      if (nav[i] >= peak) { peak = nav[i]; recDays = 0; }
      else recDays++;
    }
    // Allocation: 4 sleeves over time
    const sleeves = ["权益主动", "权益量化", "固收增强", "商品/对冲"];
    const targetMix = p.catId === "agg" ? [0.50, 0.25, 0.15, 0.10]
                    : p.catId === "mod" ? [0.30, 0.25, 0.30, 0.15]
                    : p.catId === "low" ? [0.10, 0.20, 0.20, 0.50]
                    : [0.05, 0.10, 0.75, 0.10];
    const allocPoints = 24; // monthly
    const allocation = sleeves.map((name, idx) => {
      const r2 = rng(seed + idx * 7);
      const series = [];
      for (let i = 0; i < allocPoints; i++) {
        series.push(Math.max(0.02, targetMix[idx] + (r2()-0.5)*0.06));
      }
      return { name, series };
    });
    // normalize each timepoint
    for (let t = 0; t < allocPoints; t++) {
      const sum = allocation.reduce((a, s) => a + s.series[t], 0);
      allocation.forEach(s => s.series[t] = s.series[t] / sum);
    }
    // Cash series
    const cashR = rng(seed + 555);
    const cashSeries = [];
    for (let i = 0; i < allocPoints; i++) {
      cashSeries.push(0.05 + cashR() * 0.08 + (p.catId === "fix" ? 0.05 : 0));
    }
    // Strategy metrics
    const strategyMetrics = {
      singleAdj: 0.08 + Math.random()*0.06,
      cumAdj: 0.35 + Math.random()*0.25,
      concentration: 0.55 + Math.random()*0.25,
      cashBuffer: cashSeries.reduce((a,b)=>a+b,0)/cashSeries.length,
    };
    // labels
    const labels = [];
    if (Math.abs(ddFloor) > 0.06) labels.push("高回撤");
    if (annualReturn > 0.10) labels.push("收益突出");
    if (vol < 0.05) labels.push("低波动");
    if (sharpe > 1.2) labels.push("高夏普");
    if (p.featured) labels.push(...p.featured.map(fid => FEATURED.find(f=>f.id===fid).name));
    // conclusion
    const conclusion = annualReturn > 0.08
      ? "长期收益曲线稳健，风险预算控制在合理范围。"
      : annualReturn > 0.04
      ? "收益中位，回撤管理可接受，建议观察战术响应。"
      : "近期收益与同类相比偏弱，关注策略适应性。";
    const risk = Math.abs(ddFloor) > 0.06
      ? "近 12 月最大回撤已超阈值，需重点关注流动性与赎回压力。"
      : currentDD < -0.025
      ? "当前处于阶段性回撤，恢复期已超 30 天。"
      : "无显著风险信号。";
    return {
      ...p,
      manager: managers.find(m => m.id === p.mgrId).name,
      managerId: p.mgrId,
      type: p.catId === "fix" ? "类固收" : p.catId === "low" ? "对冲/多元" : "权益多策略",
      score: Math.round((annualReturn * 100 + sharpe * 8 - Math.abs(ddFloor) * 60) * 10) / 10,
      nav: Math.round(last * 10000) / 10000,
      latestDate: DATES[DATES.length - 1],
      maxDrawdown: ddFloor,
      peerMaxDrawdown: peerDD,
      currentDrawdown: currentDD,
      recoveryDays: recDays,
      vol,
      calmar,
      annualReturn,
      sharpe,
      conclusion,
      risk,
      labels,
      navSeries: nav,
      benchmarkSeries: bench,
      peerSeries: peer,
      drawdown: dd,
      allocation,
      cashSeries,
      strategyMetrics,
      events: [],
    };
  });

  // Events / 强关注 list
  const STAGES = ["待一线确认","待客户触达","已触达","已完成"];
  const watchlist = [
    // 产品驱动
    { id: "EVT01", productId: "A108", scene: "最大回撤超阈值", driver: "产品驱动", tag: "预警", level: "high", reason: "近 60 日最大回撤达 -7.8%，超阈值 -6%", action: "立即一线复盘，准备客户沟通脚本", stage: 0 },
    { id: "EVT02", productId: "P004", scene: "净值异常下跌",   driver: "产品驱动", tag: "预警", level: "high", reason: "T-3 日净值单日跌 -2.4%，归因尚未确认", action: "联系管理人核实，启动 SOP-A 流程", stage: 1 },
    { id: "EVT03", productId: "P002", scene: "回撤恢复期延长", driver: "产品驱动", tag: "安抚", level: "mid",  reason: "当前回撤 -3.6%，已 48 日未创新高", action: "向持有客户发送月度安抚说明", stage: 1 },
    { id: "EVT05", productId: "P010", scene: "开放期可营销",   driver: "产品驱动", tag: "增值", level: "low",  reason: "白金类全委-2 即将开放申购", action: "向意向客户推送营销机会", stage: 2 },
    { id: "EVT07", productId: "P018", scene: "卡玛明显恶化",   driver: "产品驱动", tag: "预警", level: "low",  reason: "卡玛比率连续 2 个月低于 0.6", action: "纳入观察池，下次评审讨论", stage: 0 },
    { id: "EVT08", productId: "P008", scene: "规模快速下降",   driver: "产品驱动", tag: "预警", level: "mid",  reason: "近 30 日规模下降 18%", action: "确认是否存在流动性匹配问题", stage: 1 },
    // 投研驱动 - 积极看多
    { id: "EVT10", productId: "A108", scene: "A股·沪深300 单日跌幅 ≥ 3%", driver: "投研驱动", tag: "预警", level: "high", reason: "沪深300 当日 -3.4%，触发宽基跌幅阈值", action: "评估积极看多池整体敞口，准备客户沟通模板", stage: 0, bigClass: "agg" },
    { id: "EVT11", productId: "P003", scene: "量化指增·单周回撤 ≥ 5%",    driver: "投研驱动", tag: "预警", level: "high", reason: "近 5 日累计 -5.6%，超量化指增单周阈值", action: "复盘超额来源与拥挤度，确认是否启动减仓", stage: 0, bigClass: "agg" },
    { id: "EVT12", productId: "P002", scene: "港股·恒生科技 ≥ 4%",        driver: "投研驱动", tag: "安抚", level: "mid",  reason: "恒生科技单日 -4.6%，组合港股敞口 18%", action: "测算冲击，准备港股敞口说明材料", stage: 1, bigClass: "agg" },
    { id: "EVT13", productId: "P001", scene: "美股·纳斯达克 ≥ 3%",        driver: "投研驱动", tag: "安抚", level: "mid",  reason: "纳斯达克 -3.2%，QDII 敞口受影响", action: "盘前向 QDII 持仓客户群推送说明", stage: 1, bigClass: "agg" },
    // 投研驱动 - 谨慎看多
    { id: "EVT14", productId: "B5",   scene: "多策略·单周回撤(均衡) ≥ 3%", driver: "投研驱动", tag: "预警", level: "mid",  reason: "近 5 日 -3.1%，均衡型阈值触发", action: "向投顾团队同步风险预算调整", stage: 0, bigClass: "mod" },
    { id: "EVT15", productId: "P005", scene: "宏观·货币政策重大转向",      driver: "投研驱动", tag: "安抚", level: "mid",  reason: "央行降准 25bp，权益情绪改善但债端承压", action: "评估谨慎看多池久期与权益再平衡", stage: 1, bigClass: "mod" },
    { id: "EVT16", productId: "P006", scene: "10Y 国债期货 ≥ 1%",          driver: "投研验证", tag: "预警", level: "mid",  reason: "10Y 国债期货 -1.2%，已持续 2 日下跌", action: "检视谨慎看多池固收敞口", stage: 0, bigClass: "mod" },
    // 投研驱动 - 低相关
    { id: "EVT17", productId: "P013", scene: "CTA·单周回撤 ≥ 3%",          driver: "投研驱动", tag: "预警", level: "mid",  reason: "CTA 趋势策略近 5 日 -3.4%", action: "确认交易量变化与策略拥挤度", stage: 0, bigClass: "low" },
    { id: "EVT18", productId: "P012", scene: "套利·单周回撤 ≥ 2.5%",       driver: "投研驱动", tag: "预警", level: "low",  reason: "套利策略 -2.7%，基差快速收敛", action: "短期观察，暂不调整", stage: 0, bigClass: "low" },
    { id: "EVT19", productId: "P014", scene: "COMEX 黄金 ≥ 5%",            driver: "投研驱动", tag: "安抚", level: "low",  reason: "COMEX 黄金单日 -5.2%", action: "向贵金属配置客户预先沟通", stage: 2, bigClass: "low" },
    { id: "EVT20", productId: "P013", scene: "商品·黑色系板块 ≥ 5%",       driver: "投研驱动", tag: "预警", level: "low",  reason: "螺纹钢、铁矿、焦炭单日均跌超 5%", action: "评估 CTA 趋势仓位贡献", stage: 0, bigClass: "low" },
    // 投研驱动 - 类固收
    { id: "EVT21", productId: "C3",   scene: "类固收·单周回撤 ≥ 1%",       driver: "投研驱动", tag: "预警", level: "mid",  reason: "稳益固收 C3 近 5 日 -1.1%，类固收阈值触发", action: "排查信用债持仓集中度", stage: 0, bigClass: "fix" },
    { id: "EVT22", productId: "P017", scene: "10Y 国债期货 ≥ 1%",          driver: "投研驱动", tag: "预警", level: "mid",  reason: "10Y 国债期货 -1.2%，利率久期受压", action: "缩短久期或对冲利率敞口", stage: 1, bigClass: "fix" },
  ];

  // ---- HTML escape ----
  function escape(s) {
    if (s == null) return "";
    return String(s).replace(/[&<>"']/g, (c) => ({
      "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
    }[c]));
  }

  // Validate
  function validate() {
    const errs = [];
    products.forEach((p) => {
      if (!p.id || !p.name || !p.navSeries || p.navSeries.length === 0) errs.push("Bad product: " + p.id);
    });
    if (errs.length) console.warn("Data validation:", errs);
    return errs.length === 0;
  }

  // 投研驱动阈值规则 - by 大类
  const THRESHOLDS = [
    { catId: "agg", catName: "积极看多", color: "#ef3f3f", soft: "#fde8e8", rules: [
      { item: "产品回撤", text: "量化指增（除红利指增）单周回撤 ≥ 5%；最大回撤 ≥ 20%" },
      { item: "产品回撤", text: "红利指增单周回撤 ≥ 3%；最大回撤 ≥ 10%" },
      { item: "产品回撤", text: "主观多头单周回撤 ≥ 5%；最大回撤 ≥ 20%" },
      { item: "产品回撤", text: "多策略单周回撤（进取）≥ 4%；最大回撤 ≥ 10%" },
      { item: "A 股",     text: "沪深300 / A500 / 中证500 / 中证1000 / 中证红利 单日跌幅 ≥ 3.0%；重要点位" },
      { item: "港股",     text: "恒生指数 ≥ 3.0%；恒生科技 ≥ 4.0%；重要点位" },
      { item: "美股",     text: "标普500 / 纳斯达克 单日跌幅 ≥ 3.0%；重要点位" },
      { item: "量化指增", text: "监管政策变化、交易量骤降带来的策略拥挤度" },
    ]},
    { catId: "mod", catName: "谨慎看多", color: "#ff7a1a", soft: "#fff1e5", rules: [
      { item: "产品回撤", text: "多策略单周回撤（稳健）≥ 2%；（均衡）≥ 3%" },
      { item: "产品回撤", text: "宏观策略单周回撤 ≥ 5%" },
      { item: "A 股",     text: "沪深300 / A500 / 中证500 / 中证1000 / 中证红利 单日跌幅 ≥ 3.0%；重要点位" },
      { item: "国内债券", text: "10 年期国债期货单日价格持续下跌 ≥ 1%" },
      { item: "宏观",     text: "货币政策重大转向" },
    ]},
    { catId: "low", catName: "低相关", color: "#6b4ce6", soft: "#ede8fc", rules: [
      { item: "产品回撤", text: "CTA 策略单周回撤 ≥ 3%" },
      { item: "产品回撤", text: "T0 / 中性 / 套利（如有）单周回撤 ≥ 2.5%" },
      { item: "策略环境", text: "CTA / T0 / 中性 / 套利 交易规则变化、交易量骤降带来的策略拥挤度" },
      { item: "贵金属",   text: "COMEX 黄金 / 沪金 单日跌幅 ≥ 5.0%" },
      { item: "大宗商品", text: "能源类、黑色系、有色系、农产品、化工类 各板块多品种单日跌幅 ≥ 5.0%" },
    ]},
    { catId: "fix", catName: "类固收", color: "#00a99d", soft: "#e0f5f3", rules: [
      { item: "产品回撤", text: "单周回撤 ≥ 1%" },
      { item: "国内债券", text: "10 年期国债期货单日价格持续下跌 ≥ 1%" },
    ]},
  ];

  window.IRDATA = {
    DATES,
    DAYS,
    CATEGORIES,
    FEATURED,
    products,
    managers,
    watchlist,
    STAGES,
    THRESHOLDS,
    escape,
    validate,
  };
  validate();
})();
