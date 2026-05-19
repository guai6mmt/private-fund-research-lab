/* === Product Pool page === */
/* global React, LineChart, useToast, Icons */
const { useState: usePoolState, useMemo: usePoolMemo } = React;

function PageProductPool({ onNav, openDrawer, compareIds, addToCompare }) {
  const { products, CATEGORIES, FEATURED, managers } = window.IRDATA;
  const [catId, setCatId] = usePoolState("agg");
  const [mgrFilter, setMgrFilter] = usePoolState("all");
  const [selected, setSelected] = usePoolState(new Set());
  const [featFilter, setFeatFilter] = usePoolState(null);
  const toast = useToast();

  const filtered = usePoolMemo(() => products.filter((p) =>
  p.catId === catId && (
  mgrFilter === "all" || p.managerId === mgrFilter) && (
  !featFilter || (p.featured || []).includes(featFilter))
  ), [catId, mgrFilter, featFilter, products]);

  const catCounts = CATEGORIES.map((c) => ({
    ...c,
    count: products.filter((p) => p.catId === c.id).length,
    delta: c.id === "agg" ? 2 : c.id === "mod" ? 1 : c.id === "low" ? -1 : 0
  }));

  // Average metrics scoped to selected category
  const scoped = products.filter((p) => p.catId === catId);
  const avg = (arr, key) => arr.length ? arr.reduce((a, b) => a + b[key], 0) / arr.length : 0;
  const metrics = {
    annualReturn: avg(scoped, "annualReturn"),
    maxDrawdown: avg(scoped, "maxDrawdown"),
    vol: avg(scoped, "vol"),
    sharpe: avg(scoped, "sharpe")
  };

  const toggleSel = (id) => {
    const s = new Set(selected);
    s.has(id) ? s.delete(id) : s.add(id);
    setSelected(s);
  };

  const doImport = () => {
    if (selected.size === 0) {toast.push("请先勾选产品", "warn");return;}
    const arr = [...selected];
    arr.forEach((id) => addToCompare(id));
    toast.push(`已导入 ${arr.length} 只产品至产品对比`);
    setSelected(new Set());
  };

  const currentCat = CATEGORIES.find((c) => c.id === catId);

  return (
    <React.Fragment>
      {/* Pool overview header (slim) */}
      <div className="card" style={{ marginBottom: 14 }}>
        <div className="card-body" style={{ display: "flex", gap: 24, alignItems: "center", flexWrap: "wrap", padding: "14px 18px" }}>
          <div>
            <div style={{ fontSize: 11, color: "var(--fg-3)", letterSpacing: 0.5, textTransform: "uppercase" }}>产品池</div>
            <div style={{ fontSize: 17, fontWeight: 600, marginTop: 2 }}>共 {products.length} 只在管产品 · 覆盖 {managers.length} 家管理人</div>
          </div>
        </div>
      </div>

      {/* Merged "产品筛选" card (left, two modules) + 产品指标 card (right) */}
      <div className="grid" style={{ gridTemplateColumns: "minmax(0, 1.6fr) minmax(0, 1fr)", gap: 14, marginBottom: 14 }}>

        {/* Merged categories + featured */}
        <div className="card">
          <div className="card-header">
            <div>
              <div className="card-title"><span className="bar" />产品筛选</div>
              <div className="card-sub"></div>
            </div>
            {(featFilter || catId !== "agg") &&
            <button className="btn-link" onClick={() => {setCatId("agg");setFeatFilter(null);}}>重置</button>
            }
          </div>
          <div className="card-body" style={{ padding: 0 }}>
            {/* Sub-module: 产品分类 */}
            <div style={{ padding: "12px 18px" }}>
              <div style={{
                display: "flex", alignItems: "center", justifyContent: "space-between",
                marginBottom: 10
              }}>
                <div style={{ fontSize: 12, fontWeight: 600, color: "var(--fg-2)", display: "flex", alignItems: "center", gap: 6 }}>
                  <span style={{ width: 4, height: 4, borderRadius: 2, background: "var(--primary)" }} />
                  产品分类
                  <span className="muted" style={{ fontWeight: 400, fontSize: 11 }}></span>
                </div>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 10 }}>
                {catCounts.map((c) =>
                <div key={c.id}
                className={"cat-card " + (catId === c.id ? "active" : "")}
                onClick={() => setCatId(c.id)}>
                    <div className="cat-card-head">
                      <span className="tag" style={{ background: c.soft, color: c.color }}>{c.name}</span>
                    </div>
                    <div className="cat-card-count">{c.count}<span className="unit">只</span></div>
                    <div className={"cat-card-delta " + (c.delta > 0 ? "delta-up" : c.delta < 0 ? "delta-down" : "delta-flat")}>
                      {c.delta > 0 ? "▲" : c.delta < 0 ? "▼" : "—"} {Math.abs(c.delta)}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Divider */}
            <div style={{ height: 1, background: "var(--divider)", margin: "0 18px" }} />

            {/* Sub-module: 特色产品 */}
            <div style={{ padding: "12px 18px 16px" }}>
              <div style={{
                display: "flex", alignItems: "center", justifyContent: "space-between",
                marginBottom: 10
              }}>
                <div style={{ fontSize: 12, fontWeight: 600, color: "var(--fg-2)", display: "flex", alignItems: "center", gap: 6 }}>
                  <span style={{ width: 4, height: 4, borderRadius: 2, background: "var(--purple)" }} />
                  特色产品
                  <span className="muted" style={{ fontWeight: 400, fontSize: 11 }}>系列产品矩阵</span>
                </div>
                {featFilter &&
                <button className="btn-link" onClick={() => setFeatFilter(null)}>清除筛选</button>
                }
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10 }}>
                {FEATURED.map((f) =>
                <div key={f.id}
                className="feat-card"
                onClick={() => setFeatFilter(featFilter === f.id ? null : f.id)}
                style={{
                  "--accent": f.color, "--accent-soft": f.soft,
                  borderColor: featFilter === f.id ? f.color : "",
                  boxShadow: featFilter === f.id ? `0 0 0 1px ${f.color}` : ""
                }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 8 }}>
                      <div>
                        <span className="feat-card-pill" style={{ background: f.soft, color: f.color }}>特色系列</span>
                        <div className="feat-card-name">{f.name}</div>
                      </div>
                      <div style={{ textAlign: "right" }}>
                        <div className="feat-card-count">{f.count}<span style={{ fontSize: 11, color: "var(--fg-3)", fontWeight: 400, marginLeft: 2 }}>只</span></div>
                        <div className="cat-card-delta" style={{ marginTop: 2, justifyContent: "flex-end" }}>
                          <span className={f.delta > 0 ? "delta-up" : f.delta < 0 ? "delta-down" : "delta-flat"}>
                            {f.delta > 0 ? "▲" : f.delta < 0 ? "▼" : "—"} {Math.abs(f.delta)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Metrics */}
        <div className="card">
          <div className="card-header">
            <div>
              <div className="card-title"><span className="bar" />产品指标</div>
              <div className="card-sub"></div>
            </div>
          </div>
          <div className="card-body grid grid-2" style={{ gap: 10 }}>
            <div className="metric" onClick={() => openDrawer({ kind: "info", payload: {
                title: "平均年化收益", sub: currentCat.name,
                kvs: scoped.map((p) => ({ k: p.name, v: <span className="num">{(p.annualReturn * 100).toFixed(2)}%</span> })),
                body: "该分类下所有产品自管理起算的年化收益均值。"
              } })}>
              <div className="metric-label"><span className="dot" style={{ background: "var(--green)" }} />平均年化收益</div>
              <div className="metric-value">{(metrics.annualReturn * 100).toFixed(2)}<span className="unit">%</span></div>
              <div className="metric-trend up-good">基于 {scoped.length} 只产品</div>
            </div>
            <div className="metric" onClick={() => openDrawer({ kind: "info", payload: {
                title: "平均最大回撤", sub: currentCat.name,
                kvs: scoped.map((p) => ({ k: p.name, v: <span className="num danger">{(p.maxDrawdown * 100).toFixed(2)}%</span> }))
              } })}>
              <div className="metric-label"><span className="dot" style={{ background: "var(--red)" }} />平均最大回撤</div>
              <div className="metric-value danger">{(metrics.maxDrawdown * 100).toFixed(2)}<span className="unit">%</span></div>
              <div className="metric-trend">同类均值参考</div>
            </div>
            <div className="metric" onClick={() => openDrawer({ kind: "info", payload: {
                title: "平均年化波动率", sub: currentCat.name,
                kvs: scoped.map((p) => ({ k: p.name, v: <span className="num">{(p.vol * 100).toFixed(2)}%</span> }))
              } })}>
              <div className="metric-label"><span className="dot" style={{ background: "var(--orange)" }} />平均波动率</div>
              <div className="metric-value">{(metrics.vol * 100).toFixed(2)}<span className="unit">%</span></div>
              <div className="metric-trend">年化标准差</div>
            </div>
            <div className="metric" onClick={() => openDrawer({ kind: "info", payload: {
                title: "平均夏普比率", sub: currentCat.name,
                kvs: scoped.map((p) => ({ k: p.name, v: <span className="num">{p.sharpe.toFixed(2)}</span> }))
              } })}>
              <div className="metric-label"><span className="dot" style={{ background: "var(--primary)" }} />平均夏普比率</div>
              <div className="metric-value">{metrics.sharpe.toFixed(2)}</div>
              <div className="metric-trend up-good">无风险利率 2.5%</div>
            </div>
          </div>
        </div>
      </div>

      {/* Product list */}
      <div className="filter-bar">
        <span className="filter-label">分类：</span>
        {CATEGORIES.map((c) =>
        <span key={c.id} className={"chip " + (c.id === catId ? "active" : "")} onClick={() => setCatId(c.id)}>
            {c.name}
            <span className="count">{products.filter((p) => p.catId === c.id).length}</span>
          </span>
        )}
        <span style={{ width: 1, height: 16, background: "var(--border)", margin: "0 4px" }} />
        <span className="filter-label">管理人：</span>
        <select className="select" value={mgrFilter} onChange={(e) => setMgrFilter(e.target.value)}>
          <option value="all">全部管理人</option>
          {managers.map((m) => <option key={m.id} value={m.id}>{m.name}</option>)}
        </select>
        <div className="spacer" />
        <span className="txt-sm muted">已选 {selected.size} 只</span>
        <button className="btn" onClick={() => setSelected(new Set())} disabled={selected.size === 0}>清空</button>
        <button className="btn primary" onClick={doImport} disabled={selected.size === 0}>导入产品对比 ({selected.size})</button>
      </div>

      <div className="tbl-wrap">
        <table className="tbl zebra">
          <thead>
            <tr>
              <th style={{ width: 36 }}></th>
              <th>产品</th>
              <th className="col-tag">分类</th>
              <th className="col-mgr">管理人</th>
              <th className="col-num">年化收益</th>
              <th className="col-num">最大回撤</th>
              <th className="col-num">夏普</th>
              <th className="col-action">操作</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((p) => {
              const cat = CATEGORIES.find((c) => c.id === p.catId);
              const isSel = selected.has(p.id);
              const inCmp = compareIds.includes(p.id);
              return (
                <tr key={p.id} className={isSel ? "selected" : ""}>
                  <td>
                    <span className={"cb " + (isSel ? "checked" : "")} onClick={() => toggleSel(p.id)} />
                  </td>
                  <td>
                    <div className="prod-cell">
                      <span className="prod-name">{p.name}</span>
                      <span className="prod-code">{p.code} · 评级 {p.rating}</span>
                    </div>
                  </td>
                  <td className="col-tag"><span className="tag" style={{ background: cat.soft, color: cat.color }}>{cat.name}</span></td>
                  <td className="col-mgr">{p.manager}</td>
                  <td className="col-num" style={{ color: p.annualReturn >= 0 ? "var(--red)" : "var(--green)" }}>
                    {(p.annualReturn * 100).toFixed(2)}%
                  </td>
                  <td className="col-num" style={{ color: "var(--red)" }}>{(p.maxDrawdown * 100).toFixed(2)}%</td>
                  <td className="col-num">{p.sharpe.toFixed(2)}</td>
                  <td className="col-action">
                    <button className="btn sm" onClick={() => openDrawer({ kind: "product", id: p.id })}>详情</button>
                    {!inCmp &&
                    <button className="btn sm" style={{ marginLeft: 4 }} onClick={() => {addToCompare(p.id);toast.push(`已加入对比：${p.name}`);}}>加入对比</button>
                    }
                    {inCmp && <span className="tag green" style={{ marginLeft: 4 }}>已在对比</span>}
                  </td>
                </tr>);

            })}
            {filtered.length === 0 &&
            <tr><td colSpan="8"><div className="empty"><div className="icon">{Icons.empty}</div>当前筛选下无产品</div></td></tr>
            }
          </tbody>
        </table>
      </div>
    </React.Fragment>);

}

Object.assign(window, { PageProductPool });