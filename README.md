# Private Fund Research Lab

一个静态前端原型，用于演示私募/信托产品评价、管理人分析、产品对比、指标库和售后 SOP 工作流。项目不依赖构建工具，直接打开 `index.html` 即可运行。

## 功能概览

- 产品池：按产品类型和管理人筛选，查看产品池均值/中位数，并把选中产品导入对比。
- 单产品详情：展示净值曲线、模拟基准/同类对比、风险指标、回撤曲线、策略配置和现金占比。
- 管理人分析：围绕策略配置能力、战术配置能力、选基能力做管理人评价。
- 产品对比：比较多只产品的收益、风险、评级和评分，并支持导出 CSV。
- 指标库：沉淀业绩、风险、行为类指标说明，预留公式和阈值口径入口。
- 售后 SOP：覆盖内部风险预警、一线/客户触达、产品级事件工作台和状态推进。

## 运行方式

直接在浏览器打开：

```bash
open index.html
```

如需用本地静态服务预览：

```bash
python3 -m http.server 8000
```

然后访问 `http://127.0.0.1:8000`。

## 项目结构

```text
.
├── index.html              # 页面入口，按顺序加载脚本
├── app.js                  # 页面渲染、路由和交互绑定
├── styles.css              # 全局样式和响应式布局
├── src/
│   ├── data.js             # 样例产品、管理人、指标和 SOP 数据
│   ├── utils.js            # 当前对象、转义、下载等通用工具
│   ├── metrics.js          # 指标计算和数据校验
│   ├── ui.js               # 图标、抽屉、toast、页面跳转等 UI 工具
│   └── charts.js           # SVG 图表渲染函数
├── tests/
│   └── metrics.test.js     # 指标计算和数据校验测试
└── preview*.png            # 页面预览截图
```

## 数据与指标

当前数据仍是样例数据，但已从页面渲染文件中拆出到 `src/data.js`。后续接入真实数据时，建议保持同样的数据结构，由 Excel、数据库或 API 转换为产品、管理人、SOP 事件三类对象。

`src/metrics.js` 已提供基础计算与校验：

- `annualizedReturn`
- `maxDrawdownPct`
- `annualizedVolatilityPct`
- `sharpeRatio`
- `calmarRatio`
- `deriveProductMetrics`
- `validateCatalogs`

页面启动时会先做字符串转义和数据校验，减少未来接入外部数据时的注入和结构错误风险。

## 测试

无需安装依赖，直接运行：

```bash
npm test
```

测试覆盖种子数据 schema、核心指标计算和 HTML 转义函数。

## 后续建议

- 把 `src/data.js` 替换为由真实数据源生成的 catalog 文件，或接入后端 API。
- 将指标阈值和 SOP 状态流转抽象为可配置规则。
- 为关键页面补浏览器级 smoke test，覆盖筛选、对比导出、事件推进和移动端布局。
- 增加真实 Excel/PDF 报告导出服务，当前前端已支持 CSV 导出。
