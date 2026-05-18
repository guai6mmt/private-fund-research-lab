/* === Main App === */
/* global React, ReactDOM, ToastProvider, Sidebar, Topbar, ProductDetailDrawer, InfoDrawer,
   PageProductPool, PageProductDetail, PageProductCompare,
   PageMgrStrategy, PageMgrTactical, PageMgrSelection,
   PageRiskWarning, PageSOP, PageSystem */
const { useState, useEffect } = React;

const ROUTES = {
  "pool-list":    { title: "产品池", crumb: "产品池" },
  "pool-detail":  { title: "产品详情", crumb: "产品池 / 产品详情" },
  "pool-compare": { title: "产品对比", crumb: "产品池 / 产品对比" },
  "mgr-overview": { title: "管理人分析", crumb: "管理人分析" },
  "mgr-strategy": { title: "策略配置能力", crumb: "管理人分析 / 策略配置能力" },
  "mgr-tactical": { title: "战术配置能力", crumb: "管理人分析 / 战术配置能力" },
  "mgr-selection":{ title: "选基能力", crumb: "管理人分析 / 选基能力" },
  "warn-overview":{ title: "预警和售后", crumb: "预警和售后" },
  "warn-risk":    { title: "风险事件预警", crumb: "预警和售后 / 风险事件预警" },
  "warn-sop":     { title: "售后 SOP", crumb: "预警和售后 / 售后 SOP" },
  "system":       { title: "系统设置", crumb: "系统设置" },
};

function App() {
  const [route, setRoute] = useState("pool-list");
  const [productId, setProductId] = useState("A108");
  const [mgrId, setMgrId] = useState("M01");
  const [compareIds, setCompareIds] = useState(["A108", "P005", "P009", "C3"]);
  const [drawer, setDrawer] = useState(null); // { kind: 'product'|'info', id?, payload? }
  const [watchState, setWatchState] = useState(window.IRDATA.watchlist.map(e => ({ ...e })));

  const onNav = (r, extras) => {
    setRoute(r);
    if (extras?.productId) setProductId(extras.productId);
    if (extras?.mgrId) setMgrId(extras.mgrId);
  };

  const openDrawer = (d) => setDrawer(d);
  const closeDrawer = () => setDrawer(null);

  const addToCompare = (id) => {
    setCompareIds(ids => ids.includes(id) ? ids : (ids.length >= 6 ? ids : [...ids, id]));
  };

  const setStage = (eid, stage) => {
    setWatchState(prev => prev.map(e => e.id === eid ? { ...e, stage } : e));
  };

  const meta = ROUTES[route] || ROUTES["pool-list"];

  const renderPage = () => {
    switch (route) {
      case "pool-list":
        return <PageProductPool onNav={onNav} openDrawer={openDrawer}
          compareIds={compareIds} addToCompare={addToCompare} />;
      case "pool-detail":
        return <PageProductDetail productId={productId} setProductId={setProductId}
          onNav={onNav} openDrawer={openDrawer} />;
      case "pool-compare":
        return <PageProductCompare compareIds={compareIds} setCompareIds={setCompareIds}
          openDrawer={openDrawer} onNav={onNav} />;
      case "mgr-overview":
        return <PageMgrOverview mgrId={mgrId} setMgrId={setMgrId} onNav={onNav} openDrawer={openDrawer} />;
      case "mgr-strategy":
        return <PageMgrStrategy mgrId={mgrId} setMgrId={setMgrId} openDrawer={openDrawer} />;
      case "mgr-tactical":
        return <PageMgrTactical mgrId={mgrId} setMgrId={setMgrId} openDrawer={openDrawer} />;
      case "mgr-selection":
        return <PageMgrSelection mgrId={mgrId} setMgrId={setMgrId} />;
      case "warn-overview":
        return <PageWarnOverview onNav={onNav} watchState={watchState} setStage={setStage} />;
      case "warn-risk":
        return <PageRiskWarning openDrawer={openDrawer} onNav={onNav}
          watchState={watchState} setStage={setStage} />;
      case "warn-sop":
        return <PageSOP openDrawer={openDrawer} watchState={watchState} setStage={setStage} />;
      case "system":
        return <PageSystem />;
      default:
        return <div className="card"><div className="card-body">页面未找到</div></div>;
    }
  };

  return (
    <ToastProvider>
      <div className="app">
        <Sidebar route={route} onNav={onNav} />
        <div className="main">
          <Topbar
            title={meta.title}
            crumb={meta.crumb}
            onNav={onNav}
            openDrawer={openDrawer}
          />
          <div className="content">{renderPage()}</div>
        </div>
      </div>
      {drawer?.kind === "product" && (
        <ProductDetailDrawer id={drawer.id} onClose={closeDrawer} onNav={onNav} />
      )}
      {drawer?.kind === "info" && (
        <InfoDrawer payload={drawer.payload} onClose={closeDrawer} />
      )}
    </ToastProvider>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
