/* === Manager Analysis pages === */
/* global React, LineChart, HBars, Icons */
const { useState: useMgrState } = React;

function MgrHero({ mgr, products }) {
  return (
    <div className="mgr-hero">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 14 }}>
        <div>
          <div className="mgr-hero-title">{mgr.name}</div>
          <div className="mgr-hero-meta">
            <span>类型：<b>{mgr.type}</b></span>
            <span>在管产品：<b>{mgr.productCount}</b> 只</span>
          </div>
        </div>
      </div>
    </div>);

}

function MgrSelector({ mgrId, setMgrId }) {
  const { managers } = window.IRDATA;
  return (
    <div style={{ display: "flex", gap: 6, marginBottom: 12 }}>
      {managers.map((m) =>
      <button key={m.id}
      className={"btn " + (mgrId === m.id ? "primary" : "")}
      onClick={() => setMgrId(m.id)}>
          {m.name}
        </button>
      )}
    </div>);

}

function PageMgrStrategy({ mgrId, setMgrId, openDrawer }) {
  const { managers, DATES, products } = window.IRDATA;
  const mgr = managers.find((m) => m.id === mgrId) || managers[0];
  return (
    <React.Fragment>
      <MgrSelector mgrId={mgr.id} setMgrId={setMgrId} />
      <MgrHero mgr={mgr} products={products} />

      <div className="section">
        <div className="section-header">
          <div className="section-title">策略配置能力 · 战略基准对照</div>
          <div className="muted txt-sm">基于年度战略权重 × 资产指数收益合成</div>
        </div>

        <div className="grid" style={{ gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: 12, marginBottom: 14 }}>
          {/* Chart 1 - Benchmark NAV */}
          <div className="card">
            <div className="card-header" style={{ padding: "12px 16px" }}>
              <div>
                <div className="card-title" style={{ fontSize: 13 }}><span className="bar" />图 1 · 基准净值曲线</div>
                <div className="card-sub">长期收益贡献</div>
              </div>
            </div>
            <div className="card-body" style={{ padding: "10px 12px 14px" }}>
              <div className="chart-legend" style={{ marginBottom: 4 }}>
                {managers.map((m) =>
                <div key={m.id} className={"l-item " + (m.id === mgr.id ? "" : "muted")}>
                    <span className="l-swatch" style={{ background: m.stratColor }} />
                    {m.name}
                  </div>
                )}
              </div>
              <LineChart
                series={managers.map((m) => ({
                  name: m.name, color: m.stratColor,
                  data: m.benchmarkNav,
                  strokeWidth: m.id === mgr.id ? 1.9 : 1.1
                }))}
                dates={DATES}
                height={200}
                format="nav"
                onPointClick={(idx) => openDrawer({ kind: "info", payload: {
                    title: `基准净值 · ${DATES[idx]}`,
                    kvs: managers.map((m) => ({
                      k: m.name, v: <span className="num">{m.benchmarkNav[idx].toFixed(4)}</span>
                    })),
                    body: "战略基准 = Σ(年度中枢权重 × 对应资产指数收益)。"
                  } })} />
              
            </div>
          </div>

          {/* Chart 2 - Benchmark Drawdown */}
          <div className="card">
            <div className="card-header" style={{ padding: "12px 16px" }}>
              <div>
                <div className="card-title" style={{ fontSize: 13 }}><span className="bar" style={{ background: "var(--red)" }} />图 2 · 基准回撤曲线</div>
                <div className="card-sub">压力阶段防守</div>
              </div>
            </div>
            <div className="card-body" style={{ padding: "10px 12px 14px" }}>
              <div className="chart-legend" style={{ marginBottom: 4 }}>
                {managers.map((m) =>
                <div key={m.id} className={"l-item " + (m.id === mgr.id ? "" : "muted")}>
                    <span className="l-swatch" style={{ background: m.stratColor }} />
                    {m.name}
                  </div>
                )}
              </div>
              <LineChart
                series={managers.map((m) => ({
                  name: m.name, color: m.stratColor,
                  data: m.benchmarkDD,
                  strokeWidth: m.id === mgr.id ? 1.9 : 1.1
                }))}
                dates={DATES}
                height={200}
                format="percent"
                maxY={0.01}
                threshold={[{ y: -0.06, color: "#97a3b8", label: "阈值 -6%" }]} />
              
            </div>
          </div>

          {/* Chart 3 - Rolling Sharpe */}
          <div className="card">
            <div className="card-header" style={{ padding: "12px 16px" }}>
              <div>
                <div className="card-title" style={{ fontSize: 13 }}><span className="bar" style={{ background: "var(--teal)" }} />图 3 · 滚动夏普 (60D)</div>
                <div className="card-sub">风险收益效率稳定性</div>
              </div>
            </div>
            <div className="card-body" style={{ padding: "10px 12px 14px" }}>
              <div className="chart-legend" style={{ marginBottom: 4 }}>
                {managers.map((m) =>
                <div key={m.id} className={"l-item " + (m.id === mgr.id ? "" : "muted")}>
                    <span className="l-swatch" style={{ background: m.stratColor }} />
                    {m.name}
                  </div>
                )}
              </div>
              <LineChart
                series={managers.map((m) => ({
                  name: m.name, color: m.stratColor,
                  data: m.rollingSharpe,
                  strokeWidth: m.id === mgr.id ? 1.9 : 1.1
                }))}
                dates={DATES}
                height={200}
                format="raw"
                threshold={[{ y: 0, color: "#97a3b8" }, { y: 1, color: "#97a3b8", label: "1.0" }]} />
              
            </div>
          </div>
        </div>

        {/* Qualitative analysis */}
        <div className="qual">
          <div className="qual-title">定性分析 · 战略配置基准</div>
          <div className="qual-body">
            战略配置基准用于回答<b>"年度中枢本身是否有效"</b>。<br />
            · <b>净值曲线</b>看长期收益贡献——验证中枢权重是否在多年维度上跑赢现金/无风险参照。<br />
            · <b>回撤曲线</b>看中枢在压力阶段的防守能力——衡量结构性下跌时的损失上限。<br />
            · <b>滚动夏普</b>看风险收益效率是否稳定——剔除单一区间偶然性，识别中枢的稳健性。<br />
            <span style={{ color: "var(--fg-3)" }}>结论：</span><span style={{ color: "var(--fg)" }}>{mgr.conclusion}</span>
          </div>
        </div>
      </div>
    </React.Fragment>);

}

function PageMgrTactical({ mgrId, setMgrId, openDrawer }) {
  const { managers, products } = window.IRDATA;
  const mgr = managers.find((m) => m.id === mgrId) || managers[0];
  const c = mgr.capabilities;

  const renderMetric = (label, val, format, color, sub) =>
  <div className="metric" onClick={() => openDrawer({ kind: "info", payload: {
      title: label, sub: mgr.name,
      kvs: managers.map((m) => {
        const v = label.includes("匹配") ? m.capabilities.env.match :
        label.includes("响应") ? m.capabilities.evt.response :
        label.includes("环境") ? null : null;
        return null;
      }).filter(Boolean),
      body: "点击其它管理人卡片可对比同一指标，所有口径基于过去 24 个月滚动窗口。"
    } })}>
      <div className="metric-label"><span className="dot" style={{ background: color }} />{label}</div>
      <div className="metric-value" style={{ color }}>
        {format === "pct" ? (val * 100).toFixed(1) : val.toFixed(2)}
        <span className="unit">{format === "pct" ? "%" : ""}</span>
      </div>
      {sub && <div className="metric-trend">{sub}</div>}
    </div>;


  return (
    <React.Fragment>
      <MgrSelector mgrId={mgr.id} setMgrId={setMgrId} />
      <MgrHero mgr={mgr} products={products} />

      <div className="section">
        <div className="section-header">
          <div className="section-title">战术配置能力 · 环境模块</div>
          <div className="muted txt-sm">日常市场中的表现</div>
        </div>
        <div className="grid grid-3">
          {renderMetric("环境匹配度", c.env.match, "pct", "#0f5cff", "")}
          {renderMetric("环境胜率", c.env.winRate, "pct", "#00a99d", "")}
          {renderMetric("环境超额收益", c.env.alpha, "pct", "#14a065", "")}
        </div>
      </div>

      <div className="section">
        <div className="section-header">
          <div className="section-title">战术配置能力 · 事件模块</div>
          <div className="muted txt-sm">重大事件后的处理质量</div>
        </div>
        <div className="grid grid-3">
          {renderMetric("事件响应度", c.evt.response, "pct", "#ff7a1a", "")}
          {renderMetric("事件胜率", c.evt.winRate, "pct", "#6b4ce6", "")}
          {renderMetric("事件超额收益", c.evt.alpha, "pct", "#ef3f3f", "")}
        </div>
      </div>

      <div className="qual">
        <div className="qual-title">定性分析 · 战术配置</div>
        <div className="qual-body">
          战术配置评价重点从单纯调仓频率转向<b>"是否看对环境、是否及时响应事件、响应后是否产生胜率和超额收益"</b>。<br />
          · <b>环境模块</b>适合观察市场状态判断——通过比较战术权重与彼时市场实际状态，识别管理人对宏观和风格的前瞻性。<br />
          · <b>事件模块</b>适合观察回撤、风格漂移、开放赎回或业绩突变后的处理质量——衡量真实压力情境下的决策效率。<br />
          <span style={{ color: "var(--fg-3)" }}>主要风险：</span><span style={{ color: "var(--fg)" }}>{mgr.risk}</span>
        </div>
      </div>
    </React.Fragment>);

}

function PageMgrSelection({ mgrId, setMgrId }) {
  const { managers, products } = window.IRDATA;
  const mgr = managers.find((m) => m.id === mgrId) || managers[0];
  return (
    <React.Fragment>
      <MgrSelector mgrId={mgr.id} setMgrId={setMgrId} />
      <MgrHero mgr={mgr} products={products} />
      <div className="card">
        <div className="card-header"><div className="card-title"><span className="bar" />选基能力</div></div>
        <div className="card-body">
          <div className="empty">
            <div className="icon">{Icons.empty}</div>
            选基能力待接入底层基金数据后展示
            <div style={{ fontSize: 11, marginTop: 6 }}>预计 Q3 接入 Wind / 朝阳永续底基库</div>
          </div>
        </div>
      </div>
    </React.Fragment>);

}

function PageMgrOverview({ mgrId, setMgrId, onNav, openDrawer }) {
  const { managers, products, DATES } = window.IRDATA;
  const mgr = managers.find((m) => m.id === mgrId) || managers[0];
  const mgrProducts = products.filter((p) => p.managerId === mgr.id);

  // Aggregate capability scores
  const stratScore = (mgr.benchmarkNav[mgr.benchmarkNav.length - 1] - 1) * 100;
  const stratDD = Math.min(...mgr.benchmarkDD) * 100;
  const tactEnv = (mgr.capabilities.env.match + mgr.capabilities.env.winRate) / 2;
  const tactEvt = (mgr.capabilities.evt.response + mgr.capabilities.evt.winRate) / 2;

  // Radar-style data
  const radarItems = [
  { label: "战略中枢", val: 0.62 + (mgr.id === "M01" ? 0.18 : mgr.id === "M02" ? 0.08 : 0.04), color: "#0f5cff" },
  { label: "压力防守", val: 0.50 + (mgr.id === "M01" ? 0.18 : mgr.id === "M02" ? 0.15 : 0.02), color: "#ef3f3f" },
  { label: "效率稳定", val: 0.55 + (mgr.id === "M01" ? 0.18 : mgr.id === "M02" ? 0.05 : 0.10), color: "#00a99d" },
  { label: "环境判断", val: mgr.capabilities.env.match, color: "#6b4ce6" },
  { label: "事件响应", val: mgr.capabilities.evt.response, color: "#ff7a1a" },
  { label: "事件胜率", val: mgr.capabilities.evt.winRate, color: "#f5a623" }];


  const Capability = ({ title, badge, kpis, route, gradient }) =>
  <div className="card" style={{ overflow: "hidden", cursor: "pointer" }} onClick={() => onNav(route)}>
      <div style={{ background: gradient, padding: "14px 16px", color: "#fff", position: "relative" }}>
        <div>
          <div style={{ fontSize: 11, opacity: 0.82, letterSpacing: 0.4, textTransform: "uppercase" }}>{badge}</div>
          <div style={{ fontSize: 16, fontWeight: 600, marginTop: 2 }}>{title}</div>
        </div>
      </div>
      <div className="card-body" style={{ padding: "12px 16px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
          {kpis.map((k, i) =>
        <div key={i} className="s-metric" style={{ padding: "8px 10px" }}>
              <div className="l">{k.label}</div>
              <div className="v" style={{ fontSize: 14 }}>{k.val}</div>
            </div>
        )}
        </div>
        <div style={{ marginTop: 10, fontSize: 11.5, color: "var(--primary)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span>进入详情 →</span>
          <span className="muted">{badge}</span>
        </div>
      </div>
    </div>;


  return (
    <React.Fragment>
      <MgrSelector mgrId={mgr.id} setMgrId={setMgrId} />
      <MgrHero mgr={mgr} products={products} />

      {/* Three capabilities overview */}
      <div className="section">
        <div className="section-header">
          <div className="section-title">能力总览 · 三大维度</div>
          <div className="muted txt-sm"></div>
        </div>
        <div className="grid" style={{ gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: 12 }}>
          <Capability
            title="策略配置能力"
            badge="STRATEGIC"
            gradient="linear-gradient(135deg, #0f5cff 0%, #0a47cc 100%)"
            route="mgr-strategy"
            kpis={[
            { label: "基准收益率", val: stratScore.toFixed(2) + "%" },
            { label: "基准最大回撤", val: stratDD.toFixed(2) + "%" }]
            } />
          
          <Capability
            title="战术配置能力"
            badge="TACTICAL"
            gradient="linear-gradient(135deg, #ff7a1a 0%, #ef3f3f 100%)"
            route="mgr-tactical"
            kpis={[
            { label: "环境匹配度", val: (mgr.capabilities.env.match * 100).toFixed(0) + "%" },
            { label: "环境胜率", val: (mgr.capabilities.env.winRate * 100).toFixed(0) + "%" }]
            } />
          
          <Capability
            title="选基能力"
            badge="SELECTION"
            gradient="linear-gradient(135deg, #00a99d 0%, #14a065 100%)"
            route="mgr-selection"
            kpis={[
            { label: "覆盖底基", val: mgr.fundCount + " 支" },
            { label: "管理人集中度", val: mgr.id === "M03" ? "高" : "中" }]
            } />
          
        </div>
      </div>

      {/* Compact comparison: benchmark NAV across all 3 managers */}
      <div className="card" style={{ marginBottom: 14 }}>
        <div className="card-header">
          <div className="card-title"><span className="bar" />战略基准对照 · 全部管理人</div>
          <button className="btn sm" onClick={() => onNav("mgr-strategy")}>查看完整分析 →</button>
        </div>
        <div className="card-body">
          <div className="chart-legend">
            {managers.map((m) =>
            <div key={m.id} className={"l-item " + (m.id === mgr.id ? "" : "muted")}>
                <span className="l-swatch" style={{ background: m.stratColor }} />
                {m.name}
              </div>
            )}
          </div>
          <LineChart
            series={managers.map((m) => ({
              name: m.name, color: m.stratColor,
              data: m.benchmarkNav,
              strokeWidth: m.id === mgr.id ? 1.9 : 1.1
            }))}
            dates={DATES}
            height={220}
            format="nav" />
          
        </div>
      </div>

      {/* Conclusion / risk strip */}
      <div className="grid" style={{ gridTemplateColumns: "1fr 1fr", gap: 14 }}>
        <div className="qual">
          <div className="qual-title">系统结论</div>
          <div className="qual-body">{mgr.conclusion}</div>
        </div>
        <div className="qual" style={{ background: "linear-gradient(135deg, #fff5f5 0%, #fff 100%)", borderColor: "var(--red-soft)" }}>
          <div className="qual-title" style={{ color: "var(--red)" }}>主要风险</div>
          <div className="qual-body">{mgr.risk}</div>
        </div>
      </div>
    </React.Fragment>);

}

Object.assign(window, { PageMgrStrategy, PageMgrTactical, PageMgrSelection, PageMgrOverview });