/* === Shared UI === */
/* global React */
const { useState: useStateUI, useEffect: useEffectUI, useRef: useRefUI } = React;

// Icon helper - simple inline SVGs
const Icons = {
  pool: <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="2" y="3" width="12" height="3" rx="0.5" /><rect x="2" y="8" width="12" height="3" rx="0.5" /><rect x="2" y="13" width="6" height="0.5" /></svg>,
  mgr: <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="8" cy="5" r="2.5" /><path d="M3 14c0-2.8 2.2-5 5-5s5 2.2 5 5" /></svg>,
  warn: <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M8 2l6.5 11h-13L8 2z" /><line x1="8" y1="6.5" x2="8" y2="10" /><circle cx="8" cy="11.8" r="0.6" fill="currentColor" /></svg>,
  setting: <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="8" cy="8" r="2" /><path d="M8 1v2M8 13v2M1 8h2M13 8h2M3 3l1.5 1.5M11.5 11.5L13 13M3 13l1.5-1.5M11.5 4.5L13 3" /></svg>,
  refresh: <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M2 8a6 6 0 0 1 10.5-3.9M14 8a6 6 0 0 1-10.5 3.9" /><path d="M13 2v3h-3M3 14v-3h3" /></svg>,
  bell: <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M4 11V7a4 4 0 0 1 8 0v4l1 1.5H3L4 11z" /><path d="M6.5 13.5a1.5 1.5 0 0 0 3 0" /></svg>,
  user: <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="8" cy="5.5" r="2.5" /><path d="M3 14c0-2.5 2.2-4.5 5-4.5s5 2 5 4.5" /></svg>,
  close: <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M4 4l8 8M12 4l-8 8" /></svg>,
  download: <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M8 2v8m0 0l-3-3m3 3l3-3M3 13h10" /></svg>,
  plus: <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M8 3v10M3 8h10" /></svg>,
  check: <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 8l3 3 7-7" /></svg>,
  arrow: <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 8h10M9 4l4 4-4 4" /></svg>,
  empty: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4"><rect x="3" y="4" width="18" height="16" rx="2" /><path d="M3 10h18" /></svg>
};

// ---- Toast system ----
const ToastContext = React.createContext({ push: () => {} });
function ToastProvider({ children }) {
  const [toasts, setToasts] = useStateUI([]);
  const push = (msg, type = "success") => {
    const id = Date.now() + Math.random();
    setToasts((ts) => [...ts, { id, msg, type }]);
    setTimeout(() => {
      setToasts((ts) => ts.filter((t) => t.id !== id));
    }, 3000);
  };
  return (
    <ToastContext.Provider value={{ push }}>
      {children}
      <div className="toast-stack">
        {toasts.map((t) =>
        <div key={t.id} className={"toast " + t.type}>
            <span className="icon">
              {t.type === "success" ? "✓" : t.type === "warn" ? "!" : t.type === "error" ? "×" : "i"}
            </span>
            <span>{t.msg}</span>
          </div>
        )}
      </div>
    </ToastContext.Provider>);

}
function useToast() {return React.useContext(ToastContext);}

// ---- Drawer ----
function Drawer({ open, onClose, title, sub, children, footer }) {
  useEffectUI(() => {
    if (!open) return;
    const onKey = (e) => {if (e.key === "Escape") onClose();};
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);
  if (!open) return null;
  return (
    <React.Fragment>
      <div className="drawer-backdrop" onClick={onClose} />
      <div className="drawer" role="dialog">
        <div className="drawer-header">
          <div>
            <div className="drawer-title">{title}</div>
            {sub && <div className="drawer-sub">{sub}</div>}
          </div>
          <button className="drawer-close" onClick={onClose}>{Icons.close}</button>
        </div>
        <div className="drawer-body">{children}</div>
        {footer &&
        <div style={{ padding: "12px 20px", borderTop: "1px solid var(--divider)", display: "flex", justifyContent: "flex-end", gap: 8 }}>
            {footer}
          </div>
        }
      </div>
    </React.Fragment>);

}

// ---- Sidebar ----
function Sidebar({ route, onNav }) {
  const groups = [
  {
    id: "pool", label: "产品池", icon: Icons.pool, parentRoute: "pool-list",
    items: [
    { id: "pool-detail", label: "产品详情" },
    { id: "pool-compare", label: "产品对比" }]

  },
  {
    id: "mgr", label: "管理人分析", icon: Icons.mgr, parentRoute: "mgr-overview",
    items: [
    { id: "mgr-strategy", label: "策略配置能力" },
    { id: "mgr-tactical", label: "战术配置能力" },
    { id: "mgr-selection", label: "选基能力" }]

  },
  {
    id: "warn", label: "预警和售后", icon: Icons.warn, parentRoute: "warn-overview",
    items: [
    { id: "warn-risk", label: "风险事件预警" },
    { id: "warn-sop", label: "售后 SOP" }]

  },
  {
    id: "system", label: "系统设置", icon: Icons.setting, leaf: true,
    route: "system"
  }];


  const [open, setOpen] = useStateUI({
    pool: true, mgr: route.startsWith("mgr"), warn: route.startsWith("warn")
  });

  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <div className="sidebar-brand-mark" />
        <div>
          <div className="sidebar-brand-title">产品评价系统</div>
        </div>
      </div>
      <nav className="sidebar-nav">
        {groups.map((g) => g.leaf ?
        <div key={g.id}
        className={"nav-leaf " + (route === g.route ? "active" : "")}
        onClick={() => onNav(g.route)}>
            <span className="icon">{g.icon}</span>{g.label}
          </div> :

        <div className="nav-group" key={g.id}>
            <div className={"nav-group-label " + (open[g.id] ? "open" : "") + (route === g.parentRoute ? " is-active" : "")}>
              <span style={{ display: "flex", alignItems: "center", flex: 1, minWidth: 0 }}
            onClick={() => g.parentRoute ? onNav(g.parentRoute) : setOpen({ ...open, [g.id]: !open[g.id] })}>
                <span className="icon">{g.icon}</span>{g.label}
                {g.parentRoute && route === g.parentRoute &&
              <span style={{ marginLeft: 8, width: 4, height: 4, borderRadius: 4, background: "var(--primary)", boxShadow: "0 0 0 3px rgba(15,92,255,0.18)" }} />
              }
              </span>
              <span className="chev" onClick={() => setOpen({ ...open, [g.id]: !open[g.id] })} style={{ padding: "4px 6px", marginRight: -6, cursor: "pointer" }}>▶</span>
            </div>
            {open[g.id] &&
          <div className="nav-items">
                {g.items.map((it) =>
            <div key={it.id}
            className={"nav-item " + (route === it.id ? "active" : "")}
            onClick={() => onNav(it.id)}>
                    {it.label}
                  </div>
            )}
              </div>
          }
          </div>
        )}
      </nav>
      <div className="sidebar-footer">
        <div><span className="dot"></span>系统运行中</div>
        <div>北京 · 09:30</div>
      </div>
    </aside>);

}

// ---- Topbar ----
function Topbar({ title, crumb, onSearchOpen, onNav, drawerOpen, openDrawer }) {
  const [q, setQ] = useStateUI("");
  const [focused, setFocused] = useStateUI(false);
  const wrapRef = useRefUI(null);

  useEffectUI(() => {
    const onDown = (e) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) setFocused(false);
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, []);

  const results = (() => {
    if (!q || q.length < 1) return null;
    const ql = q.toLowerCase();
    const prods = window.IRDATA.products.filter((p) =>
    p.name.toLowerCase().includes(ql) || p.code.toLowerCase().includes(ql) || p.id.toLowerCase().includes(ql)
    ).slice(0, 8);
    const mgrs = window.IRDATA.managers.filter((m) =>
    m.name.includes(q) || m.type.includes(q)
    );
    return { prods, mgrs };
  })();

  return (
    <header className="topbar">
      <div className="topbar-left">
        <div className="crumbs">
          <span>首页</span><span className="sep">/</span><span style={{ color: "var(--fg-3)" }}>{crumb}</span>
        </div>
        <div className="page-title">
          {title}
          <span className="tag">实时</span>
        </div>
      </div>
      <div className="topbar-right">
        <div className="search-wrap" ref={wrapRef} style={{ position: "relative" }}>
          <input
            className="search-box"
            placeholder="搜索产品名称、管理人、代码"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            onFocus={() => setFocused(true)} />
          
          {focused && results && results.prods.length + results.mgrs.length > 0 &&
          <div className="search-results">
              {results.prods.length > 0 &&
            <React.Fragment>
                  <div className="group-label">产品 · {results.prods.length}</div>
                  {results.prods.map((p) =>
              <div key={p.id} className="res-item" onClick={() => {
                openDrawer({ kind: "product", id: p.id });
                setQ("");setFocused(false);
              }}>
                      <div>
                        <div className="name">{p.name}</div>
                        <div className="meta">{p.code} · {p.manager}</div>
                      </div>
                      <div className="meta">{(p.annualReturn * 100).toFixed(2)}%</div>
                    </div>
              )}
                </React.Fragment>
            }
              {results.mgrs.length > 0 &&
            <React.Fragment>
                  <div className="group-label">管理人 · {results.mgrs.length}</div>
                  {results.mgrs.map((m) =>
              <div key={m.id} className="res-item" onClick={() => {
                onNav("mgr-strategy", { mgrId: m.id });
                setQ("");setFocused(false);
              }}>
                      <div>
                        <div className="name">{m.name}</div>
                        <div className="meta">{m.type} · {m.productCount} 产品</div>
                      </div>
                    </div>
              )}
                </React.Fragment>
            }
            </div>
          }
          {focused && q && results && results.prods.length === 0 && results.mgrs.length === 0 &&
          <div className="search-results"><div className="empty">未找到匹配</div></div>
          }
        </div>
        <div className="topbar-meta">
          <div className="meta-block">
            <span className="meta-label">数据截至</span>
            <b>2026-05-20</b>
          </div>
          <div className="meta-block">
            <span className="meta-label">更新于</span>
            <b>2026-05-21 09:30</b>
          </div>
        </div>
        <button className="icon-btn" title="刷新">{Icons.refresh}</button>
        <button className="icon-btn" title="通知">
          {Icons.bell}
          <span className="badge">5</span>
        </button>
        <div className="user-chip">
          <span className="user-avatar">张</span>
          <span>张三</span>
        </div>
      </div>
    </header>);

}

// ---- Product detail drawer ----
function ProductDetailDrawer({ id, onClose, onNav }) {
  if (!id) return null;
  const p = window.IRDATA.products.find((x) => x.id === id);
  if (!p) return null;
  const cat = window.IRDATA.CATEGORIES.find((c) => c.id === p.catId);
  return (
    <Drawer
      open
      onClose={onClose}
      title={p.name}
      sub={`${p.code} · ${p.manager} · ${p.type}`}
      footer={
      <React.Fragment>
          <button className="btn" onClick={onClose}>关闭</button>
          <button className="btn primary" onClick={() => {onNav("pool-detail", { productId: p.id });onClose();}}>进入详情页</button>
        </React.Fragment>
      }>
      
      <div className="drawer-section">
        <div className="drawer-section-title">核心指标</div>
        <div className="grid grid-2" style={{ gap: 8 }}>
          <div className="kv"><div className="k">最新净值</div><div className="v num">{p.nav.toFixed(4)}</div></div>
          <div className="kv"><div className="k">截至日期</div><div className="v num">{p.latestDate}</div></div>
          <div className="kv"><div className="k">年化收益</div><div className="v num">{(p.annualReturn * 100).toFixed(2)}%</div></div>
          <div className="kv"><div className="k">夏普比率</div><div className="v num">{p.sharpe.toFixed(2)}</div></div>
          <div className="kv"><div className="k">最大回撤</div><div className="v num danger">{(p.maxDrawdown * 100).toFixed(2)}%</div></div>
          <div className="kv"><div className="k">同类回撤</div><div className="v num">{(p.peerMaxDrawdown * 100).toFixed(2)}%</div></div>
          <div className="kv"><div className="k">当前回撤</div><div className="v num">{(p.currentDrawdown * 100).toFixed(2)}%</div></div>
          <div className="kv"><div className="k">恢复天数</div><div className="v num">{p.recoveryDays} 日</div></div>
          <div className="kv"><div className="k">年化波动</div><div className="v num">{(p.vol * 100).toFixed(2)}%</div></div>
          <div className="kv"><div className="k">卡玛比率</div><div className="v num">{p.calmar.toFixed(2)}</div></div>
        </div>
      </div>

      <div className="drawer-section">
        <div className="drawer-section-title">净值曲线</div>
        <LineChart
          series={[
          { name: p.name, color: cat.color, data: p.navSeries }]
          }
          dates={window.IRDATA.DATES}
          height={160}
          format="nav"
          showXLabels={true} />
        
      </div>

      <div className="drawer-section">
        <div className="drawer-section-title">系统结论</div>
        <div style={{ background: "var(--bg)", padding: "10px 12px", borderRadius: 6, fontSize: 12.5, color: "var(--fg-2)", lineHeight: 1.7 }}>
          {p.conclusion}
        </div>
      </div>
      <div className="drawer-section">
        <div className="drawer-section-title">主要风险</div>
        <div style={{ background: "var(--red-soft)", padding: "10px 12px", borderRadius: 6, fontSize: 12.5, color: "var(--red)", lineHeight: 1.7 }}>
          {p.risk}
        </div>
      </div>
      <div className="drawer-section">
        <div className="drawer-section-title">标签</div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
          <span className="tag" style={{ background: cat.soft, color: cat.color }}>{cat.name}</span>
          {p.labels.map((l, i) => <span key={i} className="tag">{l}</span>)}
        </div>
      </div>
    </Drawer>);

}

// ---- Generic info drawer (for chart point clicks etc) ----
function InfoDrawer({ payload, onClose }) {
  if (!payload) return null;
  return (
    <Drawer open onClose={onClose} title={payload.title} sub={payload.sub}>
      <div className="drawer-section">
        <div className="drawer-section-title">明细</div>
        {payload.kvs && payload.kvs.map((kv, i) =>
        <div className="kv" key={i}>
            <div className="k">{kv.k}</div>
            <div className="v">{kv.v}</div>
          </div>
        )}
      </div>
      {payload.body &&
      <div className="drawer-section">
          <div className="drawer-section-title">说明</div>
          <div style={{ fontSize: 12.5, color: "var(--fg-2)", lineHeight: 1.75 }}>{payload.body}</div>
        </div>
      }
    </Drawer>);

}

Object.assign(window, {
  Icons, ToastProvider, useToast, Drawer, Sidebar, Topbar,
  ProductDetailDrawer, InfoDrawer
});