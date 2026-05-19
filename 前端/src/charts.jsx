/* === SVG chart primitives === */
/* global React */
const { useState, useRef, useMemo, useEffect } = React;

/** Generic line chart supporting multiple series, percentage formatting, threshold lines */
function LineChart({
  series,            // [{name, color, data:[...], dashed?:boolean}]
  dates,             // array same length as data
  height = 240,
  width = 800,
  format = "raw",    // 'raw' | 'percent' | 'nav'
  minY, maxY,
  threshold,         // [{y, color, label}]
  onPointClick,
  showXLabels = true,
}) {
  const wrapRef = useRef(null);
  const [w, setW] = useState(width);
  const [hover, setHover] = useState(null);

  useEffect(() => {
    if (!wrapRef.current) return;
    const ro = new ResizeObserver((entries) => {
      const cw = entries[0].contentRect.width;
      if (cw > 0) setW(cw);
    });
    ro.observe(wrapRef.current);
    return () => ro.disconnect();
  }, []);

  const padL = 44, padR = 12, padT = 12, padB = showXLabels ? 28 : 12;
  const innerW = Math.max(40, w - padL - padR);
  const innerH = height - padT - padB;

  const flatVals = useMemo(() => series.flatMap(s => s.data.filter(v => v != null)), [series]);
  const dataMin = flatVals.length ? Math.min(...flatVals) : 0;
  const dataMax = flatVals.length ? Math.max(...flatVals) : 1;
  const yMin = minY != null ? minY : dataMin - (dataMax - dataMin) * 0.08;
  const yMax = maxY != null ? maxY : dataMax + (dataMax - dataMin) * 0.08;
  const yRange = yMax - yMin || 1;

  const n = dates.length;
  const xAt = (i) => padL + (innerW * i) / Math.max(1, n - 1);
  const yAt = (v) => padT + innerH * (1 - (v - yMin) / yRange);

  const fmtY = (v) => {
    if (format === "percent") return (v * 100).toFixed(1) + "%";
    if (format === "nav") return v.toFixed(3);
    return v.toFixed(2);
  };

  // Y ticks
  const ticks = 5;
  const yTicks = [];
  for (let i = 0; i <= ticks; i++) {
    const v = yMin + (yRange * i) / ticks;
    yTicks.push({ v, y: yAt(v) });
  }

  // X ticks
  const xTickCount = 6;
  const xTicks = [];
  for (let i = 0; i < xTickCount; i++) {
    const idx = Math.round(((n - 1) * i) / (xTickCount - 1));
    xTicks.push({ idx, label: dates[idx] ? dates[idx].slice(2) : "" });
  }

  const buildPath = (data) => {
    let d = "";
    let started = false;
    data.forEach((v, i) => {
      if (v == null) return;
      const x = xAt(i), y = yAt(v);
      d += (started ? " L " : "M ") + x.toFixed(1) + " " + y.toFixed(1);
      started = true;
    });
    return d;
  };

  const onMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const px = e.clientX - rect.left;
    let i = Math.round(((px - padL) / innerW) * (n - 1));
    i = Math.max(0, Math.min(n - 1, i));
    setHover({ idx: i, x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <div className="chart-wrap" ref={wrapRef} style={{ position: "relative" }}>
      <svg
        width={w}
        height={height}
        onMouseMove={onMouseMove}
        onMouseLeave={() => setHover(null)}
        onClick={() => { if (hover && onPointClick) onPointClick(hover.idx); }}
        style={{ display: "block", cursor: onPointClick ? "pointer" : "default" }}
      >
        {/* Grid */}
        <g className="chart-grid">
          {yTicks.map((t, i) => (
            <line key={i} x1={padL} x2={padL + innerW} y1={t.y} y2={t.y} />
          ))}
        </g>
        {/* Y axis */}
        <g className="chart-axis">
          <line x1={padL} x2={padL} y1={padT} y2={padT + innerH} />
          {yTicks.map((t, i) => (
            <text key={i} x={padL - 6} y={t.y + 3} textAnchor="end">{fmtY(t.v)}</text>
          ))}
        </g>
        {/* X axis */}
        {showXLabels && (
          <g className="chart-axis">
            <line x1={padL} x2={padL + innerW} y1={padT + innerH} y2={padT + innerH} />
            {xTicks.map((t, i) => (
              <text key={i} x={xAt(t.idx)} y={padT + innerH + 14} textAnchor="middle">{t.label}</text>
            ))}
          </g>
        )}
        {/* Threshold lines */}
        {threshold && threshold.map((t, i) => (
          <g key={i}>
            <line
              x1={padL} x2={padL + innerW}
              y1={yAt(t.y)} y2={yAt(t.y)}
              stroke={t.color || "#ef3f3f"} strokeDasharray="4 3" strokeWidth="1"
            />
            {t.label && (
              <text x={padL + innerW - 4} y={yAt(t.y) - 4} textAnchor="end" fontSize="10" fill={t.color || "#ef3f3f"} fontFamily="ui-monospace,monospace">
                {t.label}
              </text>
            )}
          </g>
        ))}
        {/* Series */}
        {series.map((s, i) => (
          <g key={i}>
            <path
              d={buildPath(s.data)}
              fill="none"
              stroke={s.color}
              strokeWidth={s.strokeWidth || 1.6}
              strokeDasharray={s.dashed ? "5 4" : ""}
              strokeLinejoin="round"
              strokeLinecap="round"
            />
          </g>
        ))}
        {/* Hover guideline + points */}
        {hover && (
          <g>
            <line
              x1={xAt(hover.idx)} x2={xAt(hover.idx)}
              y1={padT} y2={padT + innerH}
              stroke="#0f5cff" strokeDasharray="3 3" strokeWidth="1" opacity="0.6"
            />
            {series.map((s, i) => {
              const v = s.data[hover.idx];
              if (v == null) return null;
              return <circle key={i} cx={xAt(hover.idx)} cy={yAt(v)} r="3.5" fill="#fff" stroke={s.color} strokeWidth="2" />;
            })}
          </g>
        )}
      </svg>
      {hover && (
        <div className="chart-tooltip" style={{
          left: Math.min(hover.x + 14, w - 180),
          top: Math.max(8, hover.y - 60),
        }}>
          <div className="tt-date">{dates[hover.idx]}</div>
          {series.map((s, i) => {
            const v = s.data[hover.idx];
            if (v == null) return null;
            return (
              <div key={i} className="tt-row">
                <span className="name"><span className="dot" style={{ background: s.color }} />{s.name}</span>
                <span className="val">{fmtY(v)}</span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

/** Stacked area chart for allocation */
function StackedAreaChart({
  series,        // [{name, color, data}] - each data is array of values (already summing to 1)
  labels,        // labels under x axis
  height = 220,
  width = 800,
}) {
  const wrapRef = useRef(null);
  const [w, setW] = useState(width);
  const [hover, setHover] = useState(null);
  useEffect(() => {
    if (!wrapRef.current) return;
    const ro = new ResizeObserver((entries) => {
      const cw = entries[0].contentRect.width;
      if (cw > 0) setW(cw);
    });
    ro.observe(wrapRef.current);
    return () => ro.disconnect();
  }, []);

  const padL = 38, padR = 12, padT = 12, padB = 28;
  const innerW = Math.max(40, w - padL - padR);
  const innerH = height - padT - padB;
  const n = labels.length;

  // Build cumulative
  const cum = series.map(s => s.data.map(() => 0));
  for (let t = 0; t < n; t++) {
    let acc = 0;
    series.forEach((s, i) => {
      acc += s.data[t];
      cum[i][t] = acc;
    });
  }

  const xAt = (i) => padL + (innerW * i) / Math.max(1, n - 1);
  const yAt = (v) => padT + innerH * (1 - v);

  const buildArea = (sIdx) => {
    const top = cum[sIdx];
    const bottom = sIdx === 0 ? top.map(() => 0) : cum[sIdx - 1];
    let d = "M " + xAt(0) + " " + yAt(top[0]);
    for (let i = 1; i < n; i++) d += " L " + xAt(i) + " " + yAt(top[i]);
    for (let i = n - 1; i >= 0; i--) d += " L " + xAt(i) + " " + yAt(bottom[i]);
    d += " Z";
    return d;
  };

  const yTicks = [0, 0.25, 0.5, 0.75, 1];
  const xTickCount = 6;
  const xTicks = [];
  for (let i = 0; i < xTickCount; i++) {
    const idx = Math.round(((n - 1) * i) / (xTickCount - 1));
    xTicks.push({ idx, label: labels[idx] });
  }

  const onMM = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const px = e.clientX - rect.left;
    let i = Math.round(((px - padL) / innerW) * (n - 1));
    i = Math.max(0, Math.min(n - 1, i));
    setHover({ idx: i, x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <div className="chart-wrap" ref={wrapRef} style={{ position: "relative" }}>
      <svg width={w} height={height} onMouseMove={onMM} onMouseLeave={()=>setHover(null)} style={{ display: "block" }}>
        <g className="chart-grid">
          {yTicks.map((t,i)=> <line key={i} x1={padL} x2={padL+innerW} y1={yAt(t)} y2={yAt(t)} />)}
        </g>
        <g className="chart-axis">
          <line x1={padL} x2={padL} y1={padT} y2={padT+innerH} />
          {yTicks.map((t,i)=>(<text key={i} x={padL-6} y={yAt(t)+3} textAnchor="end">{(t*100).toFixed(0)+"%"}</text>))}
        </g>
        <g className="chart-axis">
          <line x1={padL} x2={padL+innerW} y1={padT+innerH} y2={padT+innerH} />
          {xTicks.map((t,i)=>(<text key={i} x={xAt(t.idx)} y={padT+innerH+14} textAnchor="middle">{t.label}</text>))}
        </g>
        {series.map((s,i)=> <path key={i} d={buildArea(i)} fill={s.color} opacity="0.82" />)}
        {hover && (
          <line x1={xAt(hover.idx)} x2={xAt(hover.idx)} y1={padT} y2={padT+innerH} stroke="#0d1b35" strokeDasharray="3 3" strokeWidth="1" opacity="0.4" />
        )}
      </svg>
      {hover && (
        <div className="chart-tooltip" style={{ left: Math.min(hover.x+14, w-200), top: Math.max(8, hover.y-80) }}>
          <div className="tt-date">{labels[hover.idx]}</div>
          {series.map((s,i)=>(
            <div key={i} className="tt-row">
              <span className="name"><span className="dot" style={{ background: s.color }} />{s.name}</span>
              <span className="val">{(s.data[hover.idx]*100).toFixed(1)}%</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/** Drawdown area chart (below zero) */
function DrawdownChart({ data, dates, color = "#ef3f3f", height = 200, threshold }) {
  const series = [{ name: "回撤", color, data }];
  const minVal = Math.min(...data);
  return (
    <LineChart
      series={[{
        ...series[0],
        // Render as filled by using a custom drawing: we'll just use the line + fill via SVG separately
      }]}
      dates={dates}
      height={height}
      format="percent"
      maxY={0.005}
      minY={minVal * 1.15}
      threshold={threshold}
    />
  );
}

/** Filled drawdown area chart */
function DrawdownArea({ data, dates, color = "#ef3f3f", height = 200, threshold }) {
  const wrapRef = useRef(null);
  const [w, setW] = useState(800);
  const [hover, setHover] = useState(null);
  useEffect(() => {
    if (!wrapRef.current) return;
    const ro = new ResizeObserver((entries) => {
      const cw = entries[0].contentRect.width;
      if (cw > 0) setW(cw);
    });
    ro.observe(wrapRef.current);
    return () => ro.disconnect();
  }, []);
  const padL = 44, padR = 12, padT = 12, padB = 28;
  const innerW = Math.max(40, w - padL - padR);
  const innerH = height - padT - padB;
  const minVal = Math.min(...data);
  const yMin = minVal * 1.15;
  const yMax = 0.005;
  const n = dates.length;
  const xAt = (i) => padL + (innerW * i) / Math.max(1, n - 1);
  const yAt = (v) => padT + innerH * (1 - (v - yMin) / (yMax - yMin));

  let pathLine = "M " + xAt(0) + " " + yAt(data[0]);
  for (let i = 1; i < n; i++) pathLine += " L " + xAt(i) + " " + yAt(data[i]);
  let pathFill = pathLine + " L " + xAt(n-1) + " " + yAt(0) + " L " + xAt(0) + " " + yAt(0) + " Z";

  const yTicks = [yMin, yMin * 0.66, yMin * 0.33, 0];
  const xTickCount = 6;
  const xTicks = [];
  for (let i = 0; i < xTickCount; i++) {
    const idx = Math.round(((n - 1) * i) / (xTickCount - 1));
    xTicks.push({ idx, label: dates[idx] ? dates[idx].slice(2) : "" });
  }

  const onMM = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const px = e.clientX - rect.left;
    let i = Math.round(((px - padL) / innerW) * (n - 1));
    i = Math.max(0, Math.min(n - 1, i));
    setHover({ idx: i, x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <div className="chart-wrap" ref={wrapRef} style={{ position: "relative" }}>
      <svg width={w} height={height} onMouseMove={onMM} onMouseLeave={()=>setHover(null)} style={{ display: "block" }}>
        <defs>
          <linearGradient id="ddGrad" x1="0" y1="1" x2="0" y2="0">
            <stop offset="0%" stopColor={color} stopOpacity="0.35" />
            <stop offset="100%" stopColor={color} stopOpacity="0.02" />
          </linearGradient>
        </defs>
        <g className="chart-grid">
          {yTicks.map((t,i)=> <line key={i} x1={padL} x2={padL+innerW} y1={yAt(t)} y2={yAt(t)} />)}
        </g>
        <g className="chart-axis">
          <line x1={padL} x2={padL} y1={padT} y2={padT+innerH} />
          {yTicks.map((t,i)=>(<text key={i} x={padL-6} y={yAt(t)+3} textAnchor="end">{(t*100).toFixed(1)+"%"}</text>))}
        </g>
        <g className="chart-axis">
          <line x1={padL} x2={padL+innerW} y1={yAt(0)} y2={yAt(0)} />
          {xTicks.map((t,i)=>(<text key={i} x={xAt(t.idx)} y={padT+innerH+14} textAnchor="middle">{t.label}</text>))}
        </g>
        {threshold && threshold.map((t,i)=>(
          <line key={i} x1={padL} x2={padL+innerW} y1={yAt(t.y)} y2={yAt(t.y)} stroke={t.color||"#ef3f3f"} strokeDasharray="4 3" strokeWidth="1" />
        ))}
        <path d={pathFill} fill="url(#ddGrad)" />
        <path d={pathLine} fill="none" stroke={color} strokeWidth="1.4" />
        {hover && (
          <g>
            <line x1={xAt(hover.idx)} x2={xAt(hover.idx)} y1={padT} y2={padT+innerH} stroke={color} strokeDasharray="3 3" opacity="0.5" />
            <circle cx={xAt(hover.idx)} cy={yAt(data[hover.idx])} r="3.5" fill="#fff" stroke={color} strokeWidth="2" />
          </g>
        )}
      </svg>
      {hover && (
        <div className="chart-tooltip" style={{ left: Math.min(hover.x+14, w-160), top: Math.max(8, hover.y-50) }}>
          <div className="tt-date">{dates[hover.idx]}</div>
          <div className="tt-row">
            <span className="name"><span className="dot" style={{ background: color }} />回撤</span>
            <span className="val">{(data[hover.idx]*100).toFixed(2)}%</span>
          </div>
        </div>
      )}
    </div>
  );
}

/** Compact bar chart, horizontal */
function HBars({ items, format = "percent", colorMap }) {
  const max = Math.max(...items.map(it => Math.abs(it.value)), 0.001);
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      {items.map((it, i) => {
        const pct = Math.abs(it.value) / max;
        const color = (colorMap && colorMap[it.name]) || it.color || "#0f5cff";
        const v = format === "percent" ? (it.value * 100).toFixed(1) + "%" : it.value.toFixed(2);
        return (
          <div key={i} style={{ display: "grid", gridTemplateColumns: "80px 1fr 60px", gap: 8, alignItems: "center", fontSize: 12 }}>
            <div style={{ color: "var(--fg-3)" }}>{it.name}</div>
            <div style={{ height: 10, background: "var(--bg)", borderRadius: 5, overflow: "hidden", position: "relative" }}>
              <div style={{ width: (pct*100).toFixed(1)+"%", height: "100%", background: color, borderRadius: 5, transition: "width 0.3s" }} />
            </div>
            <div className="num" style={{ textAlign: "right", color: "var(--fg)" }}>{v}</div>
          </div>
        );
      })}
    </div>
  );
}

/** Mini sparkline */
function Sparkline({ data, color = "#0f5cff", width = 90, height = 24 }) {
  if (!data || data.length === 0) return null;
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const n = data.length;
  let d = "M 0 " + (height - ((data[0]-min)/range)*height);
  for (let i = 1; i < n; i++) {
    const x = (i/(n-1))*width;
    const y = height - ((data[i]-min)/range)*height;
    d += " L " + x.toFixed(1) + " " + y.toFixed(1);
  }
  return (
    <svg width={width} height={height} style={{ display: "block" }}>
      <path d={d} fill="none" stroke={color} strokeWidth="1.4" strokeLinejoin="round" />
    </svg>
  );
}

Object.assign(window, { LineChart, StackedAreaChart, DrawdownArea, HBars, Sparkline });
