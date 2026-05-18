/* === Product Compare page === */
/* global React, LineChart, useToast, Icons */
const { useState: useCmpState, useMemo: useCmpMemo } = React;

const CMP_COLORS = ["#0f5cff", "#ef3f3f", "#00a99d", "#ff7a1a", "#6b4ce6", "#14a065", "#f5a623"];

function PageProductCompare({ compareIds, setCompareIds, openDrawer, onNav }) {
  const { products, CATEGORIES, DATES } = window.IRDATA;
  const toast = useToast();
  const [pickerOpen, setPickerOpen] = useCmpState(false);
  const [catFilter, setCatFilter] = useCmpState("all");

  const cmpProducts = compareIds.map(id => products.find(p => p.id === id)).filter(Boolean);

  const remove = (id) => {
    setCompareIds(compareIds.filter(x => x !== id));
    toast.push("已移出对比", "info");
  };
  const add = (id) => {
    if (compareIds.includes(id)) return;
    if (compareIds.length >= 6) { toast.push("对比数量已达上限 6 只", "warn"); return; }
    setCompareIds([...compareIds, id]);
    toast.push(`已加入对比：${products.find(p=>p.id===id).name}`);
  };

  const exportCSV = () => {
    if (cmpProducts.length === 0) { toast.push("请先加入产品", "warn"); return; }
    const head = ["产品", "代码", "管理人", "分类", "年化收益", "最大回撤", "年化波动", "夏普", "卡玛"];
    const rows = cmpProducts.map(p => [
      p.name, p.code, p.manager,
      CATEGORIES.find(c=>c.id===p.catId).name,
      (p.annualReturn*100).toFixed(2)+"%",
      (p.maxDrawdown*100).toFixed(2)+"%",
      (p.vol*100).toFixed(2)+"%",
      p.sharpe.toFixed(2),
      p.calmar.toFixed(2),
    ]);
    const csv = [head, ...rows].map(r => r.join(",")).join("\n");
    const blob = new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = "产品对比.csv"; a.click();
    URL.revokeObjectURL(url);
    toast.push("已导出 CSV 文件");
  };

  const available = products.filter(p =>
    !compareIds.includes(p.id) && (catFilter === "all" || p.catId === catFilter)
  );

  return (
    <React.Fragment>
      {/* Selection bar */}
      <div className="card" style={{ marginBottom: 14, padding: "14px 18px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
          <div>
            <div style={{ fontSize: 14, fontWeight: 600 }}>对比清单 · {cmpProducts.length} 只</div>
            <div className="muted txt-sm" style={{ marginTop: 2 }}>最多支持 6 只产品同屏对比</div>
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <button className="btn" onClick={() => setCompareIds([])} disabled={cmpProducts.length === 0}>清空</button>
            <button className="btn primary" onClick={exportCSV}>{Icons.download} 导出 CSV</button>
          </div>
        </div>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          {cmpProducts.map((p, i) => (
            <div key={p.id} style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              padding: "6px 6px 6px 10px",
              background: "#fff", border: "1px solid var(--border)",
              borderRadius: 18, fontSize: 12.5,
            }}>
              <span style={{ width: 10, height: 10, background: CMP_COLORS[i % CMP_COLORS.length], borderRadius: 2 }} />
              <span style={{ fontWeight: 500 }}>{p.name}</span>
              <button onClick={() => remove(p.id)} style={{
                border: "none", background: "var(--bg-2)", borderRadius: "50%",
                width: 18, height: 18, cursor: "pointer", color: "var(--fg-3)",
                display: "inline-flex", alignItems: "center", justifyContent: "center"
              }}>×</button>
            </div>
          ))}
          <button className="btn sm" onClick={() => setPickerOpen(!pickerOpen)} style={{ borderStyle: "dashed" }}>
            {Icons.plus} 添加产品
          </button>
        </div>
        {pickerOpen && (
          <div style={{
            marginTop: 12, padding: 12, background: "var(--bg)",
            borderRadius: 8, border: "1px solid var(--border)",
          }}>
            <div style={{ display: "flex", gap: 8, marginBottom: 10, alignItems: "center" }}>
              <span className="txt-sm muted">分类筛选：</span>
              <span className={"chip " + (catFilter === "all" ? "active" : "")} onClick={() => setCatFilter("all")}>全部</span>
              {CATEGORIES.map(c => (
                <span key={c.id} className={"chip " + (catFilter === c.id ? "active" : "")} onClick={() => setCatFilter(c.id)}>{c.name}</span>
              ))}
              <div className="spacer" />
              <button className="btn-link" onClick={() => setPickerOpen(false)}>收起</button>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 6, maxHeight: 220, overflowY: "auto" }}>
              {available.map(p => {
                const cat = CATEGORIES.find(c => c.id === p.catId);
                return (
                  <div key={p.id} onClick={() => add(p.id)} style={{
                    padding: "8px 10px", background: "#fff",
                    border: "1px solid var(--border)", borderRadius: 6,
                    cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center", gap: 8,
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.borderColor = "var(--primary)"}
                  onMouseLeave={(e) => e.currentTarget.style.borderColor = "var(--border)"}
                  >
                    <div style={{ minWidth: 0, flex: 1 }}>
                      <div style={{ fontSize: 12.5, fontWeight: 500, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{p.name}</div>
                      <div className="muted txt-sm">{p.code}</div>
                    </div>
                    <span className="tag" style={{ background: cat.soft, color: cat.color }}>{cat.name}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Nav comparison chart */}
      <div className="card" style={{ marginBottom: 14 }}>
        <div className="card-header">
          <div className="card-title"><span className="bar" />产品净值对比图</div>
          <div className="muted txt-sm">区间：{DATES[0]} ~ {DATES[DATES.length-1]}</div>
        </div>
        <div className="card-body">
          {cmpProducts.length === 0 ? (
            <div className="empty"><div className="icon">{Icons.empty}</div>请添加产品后查看对比</div>
          ) : (
            <React.Fragment>
              <div className="chart-legend">
                {cmpProducts.map((p, i) => (
                  <div key={p.id} className="l-item">
                    <span className="l-swatch" style={{ background: CMP_COLORS[i % CMP_COLORS.length] }} />
                    {p.name}
                  </div>
                ))}
              </div>
              <LineChart
                series={cmpProducts.map((p, i) => ({
                  name: p.name,
                  color: CMP_COLORS[i % CMP_COLORS.length],
                  data: p.navSeries,
                }))}
                dates={DATES}
                height={320}
                format="nav"
              />
            </React.Fragment>
          )}
        </div>
      </div>

      {/* Comparison table */}
      <div className="card">
        <div className="card-header">
          <div className="card-title"><span className="bar" />指标对比</div>
        </div>
        {cmpProducts.length === 0 ? (
          <div className="card-body">
            <div className="empty"><div className="icon">{Icons.empty}</div>暂无对比数据</div>
          </div>
        ) : (
          <div className="tbl-wrap" style={{ border: "none", borderRadius: 0 }}>
            <table className="tbl">
              <thead>
                <tr>
                  <th>产品</th>
                  <th>管理人</th>
                  <th>分类</th>
                  <th className="num-col">年化收益</th>
                  <th className="num-col">最大回撤</th>
                  <th className="num-col">波动率</th>
                  <th className="num-col">夏普</th>
                  <th className="num-col">卡玛</th>
                  <th style={{ width: 130 }}>操作</th>
                </tr>
              </thead>
              <tbody>
                {cmpProducts.map((p, i) => {
                  const cat = CATEGORIES.find(c => c.id === p.catId);
                  return (
                    <tr key={p.id}>
                      <td>
                        <div className="prod-cell">
                          <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
                            <span style={{ width: 8, height: 8, background: CMP_COLORS[i % CMP_COLORS.length], borderRadius: 2 }} />
                            <span className="prod-name">{p.name}</span>
                          </span>
                          <span className="prod-code">{p.code}</span>
                        </div>
                      </td>
                      <td>{p.manager}</td>
                      <td><span className="tag" style={{ background: cat.soft, color: cat.color }}>{cat.name}</span></td>
                      <td className="num-col">{(p.annualReturn*100).toFixed(2)}%</td>
                      <td className="num-col danger">{(p.maxDrawdown*100).toFixed(2)}%</td>
                      <td className="num-col">{(p.vol*100).toFixed(2)}%</td>
                      <td className="num-col">{p.sharpe.toFixed(2)}</td>
                      <td className="num-col">{p.calmar.toFixed(2)}</td>
                      <td>
                        <button className="btn sm" onClick={() => openDrawer({ kind: "product", id: p.id })}>详情</button>
                        <button className="btn sm" style={{ marginLeft: 4 }} onClick={() => remove(p.id)}>移出</button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </React.Fragment>
  );
}

Object.assign(window, { PageProductCompare });
