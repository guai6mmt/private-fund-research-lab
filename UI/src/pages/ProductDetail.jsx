/* === Product Detail page === */
/* global React, LineChart, StackedAreaChart, DrawdownArea, useToast, Icons */
const { useState: useDetailState } = React;

function PageProductDetail({ productId, onNav, openDrawer, setProductId }) {
  const { products, CATEGORIES, DATES } = window.IRDATA;
  const fallback = products[0];
  const p = products.find((x) => x.id === productId) || fallback;
  const cat = CATEGORIES.find((c) => c.id === p.catId);
  const toast = useToast();

  const [legendOff, setLegendOff] = useDetailState(new Set());
  const isOff = (k) => legendOff.has(k);
  const toggleLegend = (k) => {
    const s = new Set(legendOff);
    s.has(k) ? s.delete(k) : s.add(k);
    setLegendOff(s);
  };

  const lineSeries = [
    { key: "self",  name: p.name,            color: cat.color, data: p.navSeries },
    { key: "bench", name: "模拟基准",          color: "#6c7a93", data: p.benchmarkSeries },
    { key: "peer",  name: "模拟同类中位数",     color: "#00a99d", data: p.peerSeries },
  ].filter((s) => !isOff(s.key));

  // strategy metrics
  const sm = p.strategyMetrics;

  const allocColors = ["#0f5cff", "#00a99d", "#ff7a1a", "#6b4ce6"];

  return (
    <React.Fragment>
      {/* Product picker bar */}
      <div className="filter-bar">
        <span className="filter-label">查看产品：</span>
        <select className="select" value={p.id} onChange={(e) => setProductId(e.target.value)} style={{ minWidth: 200 }}>
          {products.map((pp) => (
            <option key={pp.id} value={pp.id}>{pp.name} · {pp.code}</option>
          ))}
        </select>
        <div className="spacer" />
        <button className="btn" onClick={() => onNav("pool-compare")}>加入对比</button>
        <button className="btn primary" onClick={() => toast.push("已导出 PDF 评价报告（模拟）")}>导出报告</button>
      </div>

      {/* Profile */}
      <div className="card" style={{ marginBottom: 16, overflow: "hidden" }}>
        <div style={{
          background: `linear-gradient(95deg, ${cat.color} 0%, ${cat.color}aa 100%)`,
          color: "#fff", padding: "18px 22px", position: "relative",
        }}>
          <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
            <div style={{
              width: 44, height: 44, borderRadius: 8,
              background: "rgba(255,255,255,0.15)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontFamily: "var(--mono)", fontSize: 13, fontWeight: 600,
              border: "1px solid rgba(255,255,255,0.25)",
            }}>{p.rating}</div>
            <div>
              <div style={{ fontSize: 20, fontWeight: 600 }}>{p.name}</div>
              <div style={{ fontSize: 12.5, opacity: 0.9, marginTop: 4, display: "flex", gap: 18 }}>
                <span>{p.code}</span>
                <span>管理人：<b style={{ fontFamily: "var(--mono)" }}>{p.manager}</b></span>
                <span>类型：{p.type}</span>
                <span>分类：{cat.name}</span>
              </div>
            </div>
            <div className="spacer" />
            <div style={{ display: "flex", gap: 20, fontSize: 11 }}>
              <div>
                <div style={{ opacity: 0.7 }}>最新净值</div>
                <div className="num" style={{ fontSize: 18, fontWeight: 600 }}>{p.nav.toFixed(4)}</div>
              </div>
              <div>
                <div style={{ opacity: 0.7 }}>年化收益</div>
                <div className="num" style={{ fontSize: 18, fontWeight: 600 }}>{(p.annualReturn * 100).toFixed(2)}%</div>
              </div>
              <div>
                <div style={{ opacity: 0.7 }}>夏普</div>
                <div className="num" style={{ fontSize: 18, fontWeight: 600 }}>{p.sharpe.toFixed(2)}</div>
              </div>
            </div>
          </div>
        </div>
        <div style={{ padding: "14px 22px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          <div>
            <div style={{ fontSize: 11, color: "var(--fg-3)", textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 4 }}>系统结论</div>
            <div style={{ fontSize: 12.5, color: "var(--fg)", lineHeight: 1.7 }}>{p.conclusion}</div>
          </div>
          <div>
            <div style={{ fontSize: 11, color: "var(--red)", textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 4 }}>主要风险</div>
            <div style={{ fontSize: 12.5, color: "var(--fg)", lineHeight: 1.7 }}>{p.risk}</div>
          </div>
        </div>
      </div>

      {/* === 业绩表现 === */}
      <div className="card" style={{ marginBottom: 16 }}>
        <div className="card-header">
          <div className="card-title"><span className="bar" />业绩表现</div>
          <div style={{ display: "flex", gap: 4 }}>
            <button className="btn sm">近 6M</button>
            <button className="btn sm" style={{ borderColor: "var(--primary)", color: "var(--primary)" }}>近 1Y</button>
            <button className="btn sm">成立以来</button>
          </div>
        </div>
        <div className="card-body">
          <div className="chart-legend">
            {[
              { key: "self", name: p.name, color: cat.color },
              { key: "bench", name: "模拟基准", color: "#6c7a93" },
              { key: "peer", name: "模拟同类中位数", color: "#00a99d" },
            ].map((it) => (
              <div key={it.key} className={"l-item " + (isOff(it.key) ? "muted" : "")} onClick={() => toggleLegend(it.key)}>
                <span className="l-swatch" style={{ background: it.color, height: 3 }} />
                {it.name}
              </div>
            ))}
          </div>
          <LineChart
            series={lineSeries}
            dates={DATES}
            height={280}
            format="nav"
            onPointClick={(idx) => openDrawer({ kind: "info", payload: {
                title: `净值点 · ${DATES[idx]}`,
                sub: p.name,
                kvs: [
                  { k: p.name, v: <span className="num">{p.navSeries[idx].toFixed(4)}</span> },
                  { k: "模拟基准", v: <span className="num">{p.benchmarkSeries[idx].toFixed(4)}</span> },
                  { k: "同类中位数", v: <span className="num">{p.peerSeries[idx].toFixed(4)}</span> },
                  { k: "超额", v: <span className="num good">{((p.navSeries[idx] / p.benchmarkSeries[idx] - 1) * 100).toFixed(2)}%</span> },
                ],
                body: "点击净值曲线任意点，可查看当日产品净值、基准、同类对比及超额收益。",
              } })} />
        </div>
      </div>

      {/* === 风险控制 (merged: drawdown chart + 6 metrics into one module) === */}
      <div className="card" style={{ marginBottom: 16 }}>
        <div className="card-header">
          <div className="card-title"><span className="bar" style={{ background: "var(--red)" }} />风险控制</div>
        </div>
        <div className="card-body" style={{ padding: 0 }}>
          {/* sub-module: 回撤曲线 */}
          <div style={{ padding: "14px 18px 6px" }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: "var(--fg-2)", display: "flex", alignItems: "center", gap: 6, marginBottom: 10 }}>
              <span style={{ width: 4, height: 4, borderRadius: 2, background: "var(--red)" }} />
              回撤曲线
              <span className="muted" style={{ fontWeight: 400, fontSize: 11 }}>历史净值相对前高的跌幅</span>
            </div>
            <DrawdownArea
              data={p.drawdown}
              dates={DATES}
              color="#ef3f3f"
              height={220}
              threshold={[{ y: -0.06, color: "#ef3f3f", label: "阈值 -6%" }]}
            />
          </div>
          <div style={{ height: 1, background: "var(--divider)", margin: "0 18px" }} />
          {/* sub-module: 风险指标 */}
          <div style={{ padding: "12px 18px 16px" }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: "var(--fg-2)", display: "flex", alignItems: "center", gap: 6, marginBottom: 10 }}>
              <span style={{ width: 4, height: 4, borderRadius: 2, background: "var(--orange)" }} />
              风险指标
              <span className="muted" style={{ fontWeight: 400, fontSize: 11 }}>关键风险口径汇总</span>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(6, minmax(0, 1fr))", gap: 10 }}>
              {[
                { label: "最大回撤", val: (p.maxDrawdown * 100).toFixed(2) + "%", color: "var(--red)" },
                { label: "当前回撤", val: (p.currentDrawdown * 100).toFixed(2) + "%", color: "var(--orange)" },
                { label: "回撤观察期", val: p.recoveryDays + " 日", color: "var(--fg-2)" },
                { label: "年化波动率", val: (p.vol * 100).toFixed(2) + "%", color: "var(--purple)" },
                { label: "卡玛比率", val: p.calmar.toFixed(2), color: "var(--primary)" },
                { label: "同类回撤", val: (p.peerMaxDrawdown * 100).toFixed(2) + "%", color: "var(--fg-3)" },
              ].map((m, i) => (
                <div key={i} className="s-metric">
                  <div className="l">{m.label}</div>
                  <div className="v" style={{ color: m.color }}>{m.val}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* === 收益质量 (full-width) === */}
      <div className="card" style={{ marginBottom: 16 }}>
        <div className="card-header"><div className="card-title"><span className="bar" style={{ background: "var(--teal)" }} />收益质量</div></div>
        <div className="card-body">
          <div className="empty" style={{ padding: "48px 18px" }}>
            <div className="icon">{Icons.empty}</div>
            收益质量指标待接入
            <div style={{ fontSize: 11, marginTop: 4 }}>归因模块预计 2026 Q3 上线</div>
          </div>
        </div>
      </div>

      {/* === 策略行为 (merged: allocation + strategy metrics) === */}
      <div className="card" style={{ marginBottom: 16 }}>
        <div className="card-header">
          <div className="card-title"><span className="bar" style={{ background: "var(--purple)" }} />策略行为</div>
        </div>
        <div className="card-body" style={{ padding: 0 }}>
          {/* sub-module: 配置变化 */}
          <div style={{ padding: "14px 18px 6px" }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: "var(--fg-2)", display: "flex", alignItems: "center", gap: 6, marginBottom: 8 }}>
              <span style={{ width: 4, height: 4, borderRadius: 2, background: "var(--primary)" }} />
              配置变化
              <span className="muted" style={{ fontWeight: 400, fontSize: 11 }}>四类策略权重的逐月推移</span>
            </div>
            <div className="chart-legend">
              {p.allocation.map((s, i) => (
                <div key={i} className="l-item">
                  <span className="l-swatch" style={{ background: allocColors[i], height: 9, width: 14, borderRadius: 2 }} />
                  {s.name}
                </div>
              ))}
            </div>
            <StackedAreaChart
              series={p.allocation.map((s, i) => ({
                name: s.name,
                color: allocColors[i],
                data: s.series,
              }))}
              labels={Array.from({ length: p.allocation[0].series.length }, (_, i) => `M${i + 1}`)}
              height={200}
            />
          </div>
          <div style={{ height: 1, background: "var(--divider)", margin: "0 18px" }} />
          {/* sub-module: 策略指标 */}
          <div style={{ padding: "12px 18px 16px" }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: "var(--fg-2)", display: "flex", alignItems: "center", gap: 6, marginBottom: 10 }}>
              <span style={{ width: 4, height: 4, borderRadius: 2, background: "var(--purple)" }} />
              策略指标
              <span className="muted" style={{ fontWeight: 400, fontSize: 11 }}>调仓与集中度</span>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, minmax(0, 1fr))", gap: 10 }}>
              <div className="s-metric">
                <div className="l">单期最大调仓</div>
                <div className="v">{(sm.singleAdj * 100).toFixed(1)}%</div>
              </div>
              <div className="s-metric">
                <div className="l">累计调仓幅度</div>
                <div className="v">{(sm.cumAdj * 100).toFixed(1)}%</div>
              </div>
              <div className="s-metric">
                <div className="l">策略集中度 (HHI)</div>
                <div className="v">{sm.concentration.toFixed(2)}</div>
              </div>
              <div className="s-metric">
                <div className="l">现金缓冲度</div>
                <div className="v">{(sm.cashBuffer * 100).toFixed(2)}%</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

Object.assign(window, { PageProductDetail });
