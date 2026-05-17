function numericValue(value) {
  return parseFloat(String(value).replace("%", "")) || 0;
}

function percentageReturn(start, end) {
  return Number.isFinite(start) && Number.isFinite(end) && start > 0 ? (end / start - 1) * 100 : 0;
}

function yearsBetween(labels) {
  if (!Array.isArray(labels) || labels.length < 2) return 0;
  const first = new Date(labels[0]);
  const last = new Date(labels[labels.length - 1]);
  const ms = last.getTime() - first.getTime();
  return Number.isFinite(ms) && ms > 0 ? ms / (365.25 * 24 * 60 * 60 * 1000) : 0;
}

function annualizedReturn(navSeries, labels) {
  if (!Array.isArray(navSeries) || navSeries.length < 2) return 0;
  const start = Number(navSeries[0]);
  const end = Number(navSeries[navSeries.length - 1]);
  if (!Number.isFinite(start) || !Number.isFinite(end) || start <= 0) return 0;
  const years = yearsBetween(labels);
  if (years > 0) return (Math.pow(end / start, 1 / years) - 1) * 100;
  return percentageReturn(start, end);
}

function maxDrawdownPct(navSeries) {
  if (!Array.isArray(navSeries) || !navSeries.length) return 0;
  let peak = Number(navSeries[0]);
  let maxDrawdown = 0;
  navSeries.forEach((raw) => {
    const value = Number(raw);
    if (!Number.isFinite(value)) return;
    if (value > peak) peak = value;
    if (peak > 0) maxDrawdown = Math.min(maxDrawdown, (value / peak - 1) * 100);
  });
  return Math.abs(maxDrawdown);
}

function annualizedVolatilityPct(navSeries, periodsPerYear = 52) {
  if (!Array.isArray(navSeries) || navSeries.length < 3) return 0;
  const returns = [];
  for (let index = 1; index < navSeries.length; index += 1) {
    const prev = Number(navSeries[index - 1]);
    const current = Number(navSeries[index]);
    if (Number.isFinite(prev) && Number.isFinite(current) && prev > 0) {
      returns.push(current / prev - 1);
    }
  }
  if (returns.length < 2) return 0;
  const mean = average(returns);
  const variance = average(returns.map((value) => Math.pow(value - mean, 2)));
  return Math.sqrt(variance) * Math.sqrt(periodsPerYear) * 100;
}

function sharpeRatio(annualReturnPct, annualVolatilityPct, riskFreePct = 0) {
  return annualVolatilityPct > 0 ? (annualReturnPct - riskFreePct) / annualVolatilityPct : 0;
}

function calmarRatio(annualReturnPct, maxDrawdownPercent) {
  return maxDrawdownPercent > 0 ? annualReturnPct / maxDrawdownPercent : 0;
}

function deriveProductMetrics(p) {
  const annualReturnPct = annualizedReturn(p.navSeries, p.labels);
  const maxDrawdownPercent = maxDrawdownPct(p.navSeries);
  const volatilityPct = annualizedVolatilityPct(p.navSeries);
  return {
    annualReturn: annualReturnPct,
    maxDrawdown: maxDrawdownPercent,
    vol: volatilityPct,
    sharpe: sharpeRatio(annualReturnPct, volatilityPct),
    calmar: calmarRatio(annualReturnPct, maxDrawdownPercent),
  };
}

function validateProductData(p) {
  const errors = [];
  ["id", "name", "code", "managerId", "manager", "type"].forEach((key) => {
    if (!p[key]) errors.push(`${p.id || "未知产品"} 缺少 ${key}`);
  });
  ["navSeries", "benchmarkSeries", "peerSeries", "drawdown"].forEach((key) => {
    if (!Array.isArray(p[key]) || p[key].length === 0) errors.push(`${p.id} 缺少 ${key}`);
  });
  if (Array.isArray(p.labels) && Array.isArray(p.navSeries) && p.labels.length !== p.navSeries.length) {
    errors.push(`${p.id} labels 与 navSeries 长度不一致`);
  }
  if (Array.isArray(p.navSeries)) {
    ["benchmarkSeries", "peerSeries", "drawdown"].forEach((key) => {
      if (Array.isArray(p[key]) && p[key].length !== p.navSeries.length) errors.push(`${p.id} ${key} 与 navSeries 长度不一致`);
    });
  }
  if (p.allocation) {
    if (!Array.isArray(p.allocation.dates) || !Array.isArray(p.allocation.series)) {
      errors.push(`${p.id} 策略配置结构不完整`);
    } else {
      p.allocation.series.forEach((serie) => {
        if (!Array.isArray(serie.values) || serie.values.length !== p.allocation.dates.length) {
          errors.push(`${p.id} 策略 ${serie.name || "未知"} 与日期长度不一致`);
        }
      });
    }
  }
  ["score", "maxDrawdown", "currentDrawdown", "recoveryDays", "vol", "calmar", "annualReturn", "sharpe"].forEach((key) => {
    if (!Number.isFinite(Number(p[key]))) errors.push(`${p.id} ${key} 不是有效数字`);
  });
  return errors;
}

function validateCatalogs() {
  const productErrors = products.flatMap(validateProductData);
  const managerIds = new Set(managers.map((item) => item.id));
  const managerErrors = products.filter((item) => !managerIds.has(item.managerId)).map((item) => `${item.id} 找不到管理人 ${item.managerId}`);
  const eventProductIds = new Set(products.map((item) => item.id));
  const eventErrors = focusEvents.filter((item) => !eventProductIds.has(item.productId)).map((item) => `${item.id} 找不到产品 ${item.productId}`);
  return [...productErrors, ...managerErrors, ...eventErrors];
}

function median(values) {
  const sorted = values.filter((value) => Number.isFinite(value)).slice().sort((a, b) => a - b);
  if (!sorted.length) return 0;
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2;
}

function average(values) {
  const valid = values.filter((value) => Number.isFinite(value));
  return valid.length ? valid.reduce((sum, value) => sum + value, 0) / valid.length : 0;
}

function uniqueValues(items, key) {
  return ["全部", ...Array.from(new Set(items.map((item) => item[key]).filter(Boolean)))];
}

function sampleSeries(values, length) {
  if (length <= 1) return [values[0] ?? 0];
  return Array.from({ length }, (_, index) => {
    const sourceIndex = Math.round((index / (length - 1)) * (values.length - 1));
    return values[sourceIndex] ?? values.at(-1) ?? 0;
  });
}

function allocationTurnoverRows(p) {
  if (!p.allocation) return [];
  const navSamples = sampleSeries(p.navSeries, p.allocation.dates.length);
  return p.allocation.dates.slice(1).map((date, index) => {
    const currentIndex = index + 1;
    const turnover = p.allocation.series.reduce((sum, serie) => sum + Math.abs((serie.values[currentIndex] || 0) - (serie.values[index] || 0)), 0);
    const startNav = navSamples[currentIndex] || 1;
    const endNav = navSamples[Math.min(currentIndex + 1, navSamples.length - 1)] || startNav;
    return {
      date,
      turnover,
      postReturn: (endNav / startNav - 1) * 100,
    };
  });
}
