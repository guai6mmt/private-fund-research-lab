/* === Risk warning + SOP pages === */
/* global React, useToast, Icons */
const { useState: useWarnState, useMemo: useWarnMemo } = React;

const LEVELS = { high: "高", mid: "中", low: "低" };
const TAG_CLASS = { 预警: "red", 安抚: "yellow", 增值: "green" };

function PageRiskWarning({ openDrawer, onNav, watchState, setStage }) {
  const { products, CATEGORIES } = window.IRDATA;
  const [catFilter, setCatFilter] = useWarnState("all");
  const [driverFilter, setDriverFilter] = useWarnState("all");

  const list = watchState;

  // Resolve category for each event - prefer explicit bigClass, else from product
  const getCat = (e) => {
    if (e.bigClass) return e.bigClass;
    const p = products.find((pp) => pp.id === e.productId);
    return p?.catId;
  };

  const filtered = useWarnMemo(() => list.filter((e) => {
    const cat = getCat(e);
    if (catFilter !== "all" && cat !== catFilter) return false;
    if (driverFilter !== "all" && e.driver !== driverFilter) return false;
    return true;
  }), [list, catFilter, driverFilter]);

  const counts = {
    high: list.filter((e) => e.level === "high").length,
    mid: list.filter((e) => e.level === "mid").length,
    low: list.filter((e) => e.level === "low").length,
    total: list.length
  };

  const catCounts = {};
  CATEGORIES.forEach((c) => {catCounts[c.id] = list.filter((e) => getCat(e) === c.id).length;});

  return (
    <React.Fragment>
      {/* Top stat row */}
      <div className="grid grid-4" style={{ marginBottom: 14 }}>
        <div className="metric" style={{ background: "linear-gradient(135deg, #fff 60%, var(--red-soft))", borderColor: "var(--red)" }}>
          <div className="metric-label"><span className="pulse"></span>高等级预警</div>
          <div className="metric-value danger">{counts.high}</div>
          <div className="metric-trend">需立即处置</div>
        </div>
        <div className="metric" style={{ background: "linear-gradient(135deg, #fff 60%, var(--orange-soft))", borderColor: "var(--orange)" }}>
          <div className="metric-label"><span className="dot" style={{ background: "var(--orange)" }} />中等级预警</div>
          <div className="metric-value warn">{counts.mid}</div>
          <div className="metric-trend">本周内跟进</div>
        </div>
        <div className="metric">
          <div className="metric-label"><span className="dot" style={{ background: "var(--yellow)" }} />低等级预警</div>
          <div className="metric-value" style={{ color: "var(--yellow)" }}>{counts.low}</div>
          <div className="metric-trend">观察池</div>
        </div>
        <div className="metric">
          <div className="metric-label"><span className="dot" style={{ background: "var(--primary)" }} />预警总数</div>
          <div className="metric-value">{counts.total}</div>
          <div className="metric-trend">含投研驱动 {list.filter((e) => e.driver.includes("投研")).length}</div>
        </div>
      </div>

      {/* Watchlist */}
      <div className="card">
        <div className="card-header">
          <div className="card-title"><span className="bar" />内部强关注列表</div>
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
            <span className="filter-label">大类：</span>
            <span className={"chip " + (catFilter === "all" ? "active" : "")} onClick={() => setCatFilter("all")}>
              全部 <span className="count">{counts.total}</span>
            </span>
            {CATEGORIES.map((c) =>
            <span key={c.id}
            className={"chip " + (catFilter === c.id ? "active" : "")}
            onClick={() => setCatFilter(c.id)}
            style={catFilter === c.id ? { background: c.color, borderColor: c.color } : {}}>
                {c.name}
                <span className="count" style={catFilter === c.id ? { background: "rgba(255,255,255,0.22)", color: "#fff" } : {}}>{catCounts[c.id] || 0}</span>
              </span>
            )}
            <span style={{ width: 1, height: 16, background: "var(--border)", margin: "0 4px", alignSelf: "center" }} />
            <span className="filter-label">驱动：</span>
            <span className={"chip " + (driverFilter === "all" ? "active" : "")} onClick={() => setDriverFilter("all")}>全部</span>
            <span className={"chip " + (driverFilter === "产品驱动" ? "active" : "")} onClick={() => setDriverFilter("产品驱动")}>产品驱动</span>
            <span className={"chip " + (driverFilter === "投研驱动" ? "active" : "")} onClick={() => setDriverFilter("投研驱动")}>投研驱动</span>
          </div>
        </div>
        <div className="tbl-wrap" style={{ border: "none", borderRadius: 0 }}>
          <table className="tbl zebra">
            <thead>
              <tr>
                <th>产品 / 对象</th>
                <th className="col-tag">大类</th>
                <th className="col-scene">场景</th>
                <th className="col-driver">驱动</th>
                <th className="col-tag">标签</th>
                <th className="col-level">等级</th>
                <th>触发原因</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((e) => {
                const p = products.find((pp) => pp.id === e.productId);
                const cat = CATEGORIES.find((c) => c.id === getCat(e));
                return (
                  <tr key={e.id}>
                    <td>
                      <div className="prod-cell">
                        <span className="prod-name">{p?.name || e.productId}</span>
                        <span className="prod-code">{p?.code}</span>
                      </div>
                    </td>
                    <td className="col-tag">{cat && <span className="tag" style={{ background: cat.soft, color: cat.color }}>{cat.name}</span>}</td>
                    <td className="col-scene" style={{ fontSize: 12 }}>{e.scene}</td>
                    <td className="col-driver"><span className={"tag " + (e.driver.includes("投研") ? "purple" : "blue")}>{e.driver}</span></td>
                    <td className="col-tag"><span className={"tag " + TAG_CLASS[e.tag]}>{e.tag}</span></td>
                    <td className="col-level">
                      <span className="level-pill" style={{
                        background: e.level === "high" ? "var(--red)" : e.level === "mid" ? "var(--orange)" : "var(--yellow)"
                      }}>{LEVELS[e.level]}</span>
                    </td>
                    <td className="col-text"><span className="clamp-2">{e.reason}</span></td>
                  </tr>);

              })}
              {filtered.length === 0 &&
              <tr><td colSpan="7"><div className="empty"><div className="icon">{Icons.empty}</div>暂无匹配的预警事件</div></td></tr>
              }
            </tbody>
          </table>
        </div>
      </div>
    </React.Fragment>);

}

function PageSOP({ openDrawer, watchState, setStage }) {
  const { products, STAGES, CATEGORIES } = window.IRDATA;
  const toast = useToast();
  const list = watchState;

  const getCat = (e) => {
    if (e.bigClass) return e.bigClass;
    const p = products.find((pp) => pp.id === e.productId);
    return p?.catId;
  };

  const counts = {
    stage0: list.filter((e) => e.stage === 0).length,
    stage1: list.filter((e) => e.stage === 1).length,
    valueAdd: list.filter((e) => e.tag === "增值").length,
    expire: 4
  };

  return (
    <React.Fragment>
      <div className="grid grid-4" style={{ marginBottom: 14 }}>
        {[
        { label: "待一线确认", val: counts.stage0, color: "var(--red)" },
        { label: "待客户触达", val: counts.stage1, color: "var(--orange)" },
        { label: "可营销机会", val: counts.valueAdd, color: "var(--green)" },
        { label: "今日到期任务", val: counts.expire, color: "var(--primary)" }].
        map((m, i) =>
        <div key={i} className="metric">
            <div className="metric-label"><span className="dot" style={{ background: m.color }} />{m.label}</div>
            <div className="metric-value" style={{ color: m.color }}>{m.val}</div>
            <div className="metric-trend">需在 24h 内处置</div>
          </div>
        )}
      </div>

      <div className="card">
        <div className="card-header">
          <div className="card-title"><span className="bar" />售后 SOP · 处理流水</div>
        </div>
        <div className="card-body" style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {list.map((e) => {
            const p = products.find((pp) => pp.id === e.productId);
            const cat = CATEGORIES.find((c) => c.id === getCat(e));
            return (
              <div key={e.id} style={{
                background: "#fff", border: "1px solid var(--border)", borderRadius: 8,
                padding: "12px 14px",
                display: "grid", gridTemplateColumns: "minmax(180px, 1.2fr) 84px 90px 90px 110px minmax(0, 2fr) 280px",
                gap: 12, alignItems: "center"
              }}>
                <div>
                  <div style={{ fontWeight: 600, fontSize: 13 }}>{p?.name || e.productId}</div>
                  <div className="muted txt-sm">{p?.code} · {p?.manager}</div>
                </div>
                {cat ? <span className="tag" style={{ background: cat.soft, color: cat.color, justifySelf: "start" }}>{cat.name}</span> : <span />}
                <span className={"tag " + (e.driver.includes("投研") ? "purple" : "blue")} style={{ justifySelf: "start" }}>{e.driver}</span>
                <span className={"tag " + TAG_CLASS[e.tag]} style={{ justifySelf: "start" }}>{e.tag}</span>
                <span style={{
                  fontSize: 11, padding: "2px 8px", borderRadius: 3, fontWeight: 600, color: "#fff",
                  background: e.level === "high" ? "var(--red)" : e.level === "mid" ? "var(--orange)" : "var(--yellow)",
                  textAlign: "center", justifySelf: "start"
                }}>{LEVELS[e.level]} · 等级</span>
                <div style={{ fontSize: 12, color: "var(--fg-2)" }}>
                  <div style={{ fontWeight: 500, color: "var(--fg)", marginBottom: 2 }}>{e.scene}</div>
                  <div>{e.action}</div>
                </div>
                <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
                  <div className="pipeline" style={{ flex: 1 }}>
                    {STAGES.map((s, i) =>
                    <div key={i} className={"stage " + (e.stage > i ? "done" : e.stage === i ? "active" : "")}>
                        {s.slice(0, 4)}
                      </div>
                    )}
                  </div>
                  {e.stage < STAGES.length - 1 ?
                  <button className="btn sm primary" onClick={() => {
                    setStage(e.id, e.stage + 1);
                    toast.push(`${p?.name}：${STAGES[e.stage + 1]}`);
                  }}>推进</button> :

                  <span className="tag green">已完成</span>
                  }
                </div>
              </div>);

          })}
        </div>
      </div>
    </React.Fragment>);

}

function PageSystem() {
  return (
    <div className="card">
      <div className="card-header"><div className="card-title"><span className="bar" />系统设置</div></div>
      <div className="card-body" style={{ display: "grid", gridTemplateColumns: "200px 1fr", gap: 24 }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          {["账号与权限", "数据接入", "评分模型", "预警阈值", "通知偏好", "审计日志"].map((s, i) =>
          <div key={i} style={{
            padding: "8px 12px",
            background: i === 3 ? "var(--primary-soft)" : "transparent",
            color: i === 3 ? "var(--primary)" : "var(--fg-2)",
            borderRadius: 6, cursor: "pointer", fontSize: 13,
            fontWeight: i === 3 ? 500 : 400
          }}>{s}</div>
          )}
        </div>
        <div>
          <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 10 }}>预警阈值配置</div>
          {[
          { label: "最大回撤阈值 (%)", val: "6.0" },
          { label: "净值单日下跌阈值 (%)", val: "1.5" },
          { label: "波动率上升触发倍数", val: "1.6" },
          { label: "夏普下降阈值", val: "0.5" },
          { label: "卡玛恶化连续月份", val: "2" },
          { label: "规模下降阈值 (%)", val: "15" }].
          map((c, i) =>
          <div key={i} className="kv">
              <div className="k" style={{ width: 200 }}>{c.label}</div>
              <div className="v num">{c.val}</div>
              <button className="btn sm" style={{ marginLeft: "auto" }}>修改</button>
            </div>
          )}
        </div>
      </div>
    </div>);

}

function PageWarnOverview({ onNav, watchState, setStage }) {
  const { products, STAGES, CATEGORIES } = window.IRDATA;
  const toast = useToast();
  const list = watchState;
  const [catFilter, setCatFilter] = useWarnState("all");
  const [driverFilter, setDriverFilter] = useWarnState("all");

  const getCat = (e) => {
    if (e.bigClass) return e.bigClass;
    const p = products.find((pp) => pp.id === e.productId);
    return p?.catId;
  };

  const riskCounts = {
    high: list.filter((e) => e.level === "high").length,
    mid: list.filter((e) => e.level === "mid").length,
    low: list.filter((e) => e.level === "low").length,
    total: list.length,
  };

  const sopCounts = {
    stage0: list.filter((e) => e.stage === 0).length,
    stage1: list.filter((e) => e.stage === 1).length,
    valueAdd: list.filter((e) => e.tag === "增值").length,
    expire: 4,
  };

  // Pick top urgent items: high-level + stage 0/1
  const urgent = list
    .filter((e) => e.level === "high" || (e.level === "mid" && e.stage < 2))
    .sort((a, b) => {
      const order = { high: 0, mid: 1, low: 2 };
      return order[a.level] - order[b.level] || a.stage - b.stage;
    })
    .slice(0, 6);

  // Full watchlist with filters applied
  const catCounts = {};
  CATEGORIES.forEach((c) => { catCounts[c.id] = list.filter((e) => getCat(e) === c.id).length; });
  const filtered = list.filter((e) => {
    const cat = getCat(e);
    if (catFilter !== "all" && cat !== catFilter) return false;
    if (driverFilter !== "all" && e.driver !== driverFilter) return false;
    return true;
  });

  return (
    <React.Fragment>
      {/* === 风险事件预警 metrics === */}
      <div className="section">
        <div className="section-header">
          <div className="section-title">风险事件预警 · 实时概况</div>
          <button className="btn-link" onClick={() => onNav("warn-risk")}>查看完整预警 →</button>
        </div>
        <div className="grid grid-4">
          <div className="metric" style={{ background: "linear-gradient(135deg, #fff 60%, var(--red-soft))", borderColor: "var(--red)" }} onClick={() => onNav("warn-risk")}>
            <div className="metric-label"><span className="pulse"></span>高等级预警</div>
            <div className="metric-value danger">{riskCounts.high}</div>
            <div className="metric-trend">需立即处置</div>
          </div>
          <div className="metric" style={{ background: "linear-gradient(135deg, #fff 60%, var(--orange-soft))", borderColor: "var(--orange)" }} onClick={() => onNav("warn-risk")}>
            <div className="metric-label"><span className="dot" style={{ background: "var(--orange)" }} />中等级预警</div>
            <div className="metric-value warn">{riskCounts.mid}</div>
            <div className="metric-trend">本周内跟进</div>
          </div>
          <div className="metric" onClick={() => onNav("warn-risk")}>
            <div className="metric-label"><span className="dot" style={{ background: "var(--yellow)" }} />低等级预警</div>
            <div className="metric-value" style={{ color: "var(--yellow)" }}>{riskCounts.low}</div>
            <div className="metric-trend">观察池</div>
          </div>
          <div className="metric" onClick={() => onNav("warn-risk")}>
            <div className="metric-label"><span className="dot" style={{ background: "var(--primary)" }} />预警总数</div>
            <div className="metric-value">{riskCounts.total}</div>
            <div className="metric-trend">含投研驱动 {list.filter((e) => e.driver.includes("投研")).length}</div>
          </div>
        </div>
      </div>

      {/* === 售后 SOP metrics === */}
      <div className="section">
        <div className="section-header">
          <div className="section-title">售后 SOP · 任务概况</div>
          <button className="btn-link" onClick={() => onNav("warn-sop")}>查看处理流水 →</button>
        </div>
        <div className="grid grid-4">
          {[
            { label: "待一线确认", val: sopCounts.stage0, color: "var(--red)", sub: "需 24h 内推进" },
            { label: "待客户触达", val: sopCounts.stage1, color: "var(--orange)", sub: "投顾团队跟进" },
            { label: "可营销机会", val: sopCounts.valueAdd, color: "var(--green)", sub: "增值事件" },
            { label: "今日到期任务", val: sopCounts.expire, color: "var(--primary)", sub: "SLA 临近" },
          ].map((m, i) => (
            <div key={i} className="metric" onClick={() => onNav("warn-sop")}>
              <div className="metric-label"><span className="dot" style={{ background: m.color }} />{m.label}</div>
              <div className="metric-value" style={{ color: m.color }}>{m.val}</div>
              <div className="metric-trend">{m.sub}</div>
            </div>
          ))}
        </div>
      </div>

      {/* === 紧急处置清单 === */}
      <div className="card">
        <div className="card-header">
          <div className="card-title"><span className="bar" style={{ background: "var(--red)" }} />紧急处置清单</div>
          <span className="muted txt-sm">高等级或处于待确认/待触达阶段的事件 · 共 {urgent.length} 条</span>
        </div>
        <div className="tbl-wrap" style={{ border: "none", borderRadius: 0 }}>
          <table className="tbl zebra">
            <thead>
              <tr>
                <th>产品 / 对象</th>
                <th className="col-tag">大类</th>
                <th className="col-scene">场景</th>
                <th className="col-driver">驱动</th>
                <th className="col-tag">标签</th>
                <th className="col-level">等级</th>
                <th>触发原因</th>
                <th style={{ width: 260 }}>状态 / 推进</th>
              </tr>
            </thead>
            <tbody>
              {urgent.map((e) => {
                const p = products.find((pp) => pp.id === e.productId);
                const cat = CATEGORIES.find((c) => c.id === getCat(e));
                return (
                  <tr key={e.id}>
                    <td>
                      <div className="prod-cell">
                        <span className="prod-name">{p?.name || e.productId}</span>
                        <span className="prod-code">{p?.code}</span>
                      </div>
                    </td>
                    <td className="col-tag">{cat && <span className="tag" style={{ background: cat.soft, color: cat.color }}>{cat.name}</span>}</td>
                    <td className="col-scene" style={{ fontSize: 12 }}>{e.scene}</td>
                    <td className="col-driver"><span className={"tag " + (e.driver.includes("投研") ? "purple" : "blue")}>{e.driver}</span></td>
                    <td className="col-tag"><span className={"tag " + TAG_CLASS[e.tag]}>{e.tag}</span></td>
                    <td className="col-level">
                      <span className="level-pill" style={{
                        background: e.level === "high" ? "var(--red)" : e.level === "mid" ? "var(--orange)" : "var(--yellow)",
                      }}>{LEVELS[e.level]}</span>
                    </td>
                    <td className="col-text"><span className="clamp-2">{e.reason}</span></td>
                    <td>
                      <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
                        <div className="pipeline" style={{ flex: 1 }}>
                          {STAGES.map((s, i) => (
                            <div key={i} className={"stage " + (e.stage > i ? "done" : e.stage === i ? "active" : "")}>
                              {s.slice(0, 4)}
                            </div>
                          ))}
                        </div>
                        {e.stage < STAGES.length - 1 ? (
                          <button className="btn sm primary" onClick={() => {
                            setStage(e.id, e.stage + 1);
                            toast.push(`${p?.name}：${STAGES[e.stage + 1]}`);
                          }}>推进</button>
                        ) : (
                          <span className="tag green">完成</span>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
              {urgent.length === 0 && (
                <tr><td colSpan="8"><div className="empty"><div className="icon">{Icons.empty}</div>当前无紧急事件</div></td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* === 内部强关注列表 === */}
      <div className="card" style={{ marginTop: 14 }}>
        <div className="card-header">
          <div className="card-title"><span className="bar" />内部强关注列表</div>
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
            <span className="filter-label">大类：</span>
            <span className={"chip " + (catFilter === "all" ? "active" : "")} onClick={() => setCatFilter("all")}>
              全部 <span className="count">{list.length}</span>
            </span>
            {CATEGORIES.map((c) => (
              <span key={c.id}
                    className={"chip " + (catFilter === c.id ? "active" : "")}
                    onClick={() => setCatFilter(c.id)}
                    style={catFilter === c.id ? { background: c.color, borderColor: c.color } : {}}>
                {c.name}
                <span className="count" style={catFilter === c.id ? { background: "rgba(255,255,255,0.22)", color: "#fff" } : {}}>{catCounts[c.id] || 0}</span>
              </span>
            ))}
            <span style={{ width: 1, height: 16, background: "var(--border)", margin: "0 4px", alignSelf: "center" }} />
            <span className="filter-label">驱动：</span>
            <span className={"chip " + (driverFilter === "all" ? "active" : "")} onClick={() => setDriverFilter("all")}>全部</span>
            <span className={"chip " + (driverFilter === "产品驱动" ? "active" : "")} onClick={() => setDriverFilter("产品驱动")}>产品驱动</span>
            <span className={"chip " + (driverFilter === "投研驱动" ? "active" : "")} onClick={() => setDriverFilter("投研驱动")}>投研驱动</span>
          </div>
        </div>
        <div className="tbl-wrap" style={{ border: "none", borderRadius: 0 }}>
          <table className="tbl zebra">
            <thead>
              <tr>
                <th>产品 / 对象</th>
                <th className="col-tag">大类</th>
                <th className="col-scene">场景</th>
                <th className="col-driver">驱动</th>
                <th className="col-tag">标签</th>
                <th className="col-level">等级</th>
                <th>触发原因</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((e) => {
                const p = products.find((pp) => pp.id === e.productId);
                const cat = CATEGORIES.find((c) => c.id === getCat(e));
                return (
                  <tr key={e.id}>
                    <td>
                      <div className="prod-cell">
                        <span className="prod-name">{p?.name || e.productId}</span>
                        <span className="prod-code">{p?.code}</span>
                      </div>
                    </td>
                    <td className="col-tag">{cat && <span className="tag" style={{ background: cat.soft, color: cat.color }}>{cat.name}</span>}</td>
                    <td className="col-scene" style={{ fontSize: 12 }}>{e.scene}</td>
                    <td className="col-driver"><span className={"tag " + (e.driver.includes("投研") ? "purple" : "blue")}>{e.driver}</span></td>
                    <td className="col-tag"><span className={"tag " + TAG_CLASS[e.tag]}>{e.tag}</span></td>
                    <td className="col-level">
                      <span className="level-pill" style={{
                        background: e.level === "high" ? "var(--red)" : e.level === "mid" ? "var(--orange)" : "var(--yellow)",
                      }}>{LEVELS[e.level]}</span>
                    </td>
                    <td className="col-text"><span className="clamp-2">{e.reason}</span></td>
                  </tr>
                );
              })}
              {filtered.length === 0 && (
                <tr><td colSpan="7"><div className="empty"><div className="icon">{Icons.empty}</div>暂无匹配的事件</div></td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </React.Fragment>
  );
}

Object.assign(window, { PageRiskWarning, PageSOP, PageSystem, PageWarnOverview });