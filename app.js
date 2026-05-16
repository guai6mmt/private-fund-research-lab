const state = {
  page: "product-detail",
  selectedProductId: "B5",
  selectedManagerId: "M3",
  compareProductIds: ["B5", "C3"],
  poolTypeFilter: "全部",
  poolManagerFilter: "全部",
  poolSelectedIds: ["B5", "C3"],
  activeLibrary: "业绩",
  searchOpen: false,
};

let products = [
  {
    id: "A",
    name: "产品A",
    code: "FOF-A001",
    managerId: "M1",
    manager: "管理人甲",
    type: "多策略FOF",
    rating: "优秀",
    score: 92,
    nav: "1.84",
    maxDrawdown: 12.35,
    currentDrawdown: 4.28,
    recoveryDays: 58,
    vol: 10.21,
    calmar: 1.48,
    annualReturn: 16.8,
    sharpe: 1.52,
    conclusion:
      "本产品近一年业绩表现较强，超额收益稳定，最大回撤相对较低，风险收益比较好，综合评估结果优秀，建议继续重点推荐。",
    risk:
      "近期权益类策略占比有所提升，现金缓冲水平下降；若市场波动加剧，回撤可能扩大，需持续跟踪其风险控制能力。",
    navSeries: [0.95, 1.02, 1.07, 1.12, 1.19, 1.16, 1.23, 1.49, 1.43, 1.47, 1.52, 1.50, 1.58, 1.62, 1.59, 1.61, 1.64, 1.70, 1.76, 1.84],
    benchmarkSeries: [0.96, 1.0, 1.02, 1.04, 1.02, 1.05, 1.04, 1.22, 1.18, 1.21, 1.27, 1.25, 1.32, 1.35, 1.32, 1.33, 1.31, 1.36, 1.39, 1.44],
    peerSeries: [0.94, 0.93, 0.92, 0.95, 0.93, 0.91, 0.92, 1.01, 0.99, 1.04, 1.06, 1.03, 1.09, 1.10, 1.08, 1.06, 1.05, 1.10, 1.13, 1.15],
    drawdown: [0, -0.2, -1.1, -0.8, -2.6, -0.4, -1.2, -0.6, -4.8, -9.2, -1.8, -2.6, -0.5, -1.1, -0.8, -2.2, -3.6, -2.8, -6.8, -2.1],
    allocation: {
      dates: ["2024-05", "2024-08", "2024-11", "2025-02", "2025-05"],
      series: [
        { name: "权益多头", color: "#0f5cff", values: [22, 24, 18, 24, 28] },
        { name: "债券策略", color: "#00a99d", values: [31, 34, 39, 33, 27] },
        { name: "量化对冲", color: "#ff9f1a", values: [25, 20, 18, 22, 19] },
        { name: "其他策略", color: "#6b4ce6", values: [22, 22, 25, 21, 26] },
      ],
    },
    cashSeries: [11, 12, 9, 10, 11, 16, 18, 21, 17, 14, 11, 9, 8, 10],
    quality: {
      positiveWeeks: "64%",
      alphaStability: "高",
      downsideCapture: "0.71",
      comment: "上涨周参与度较高，下跌周损失控制优于同类，收益质量维持在优秀区间。",
    },
    events: [
      "2025-01 权益多头占比提升 4.2pct",
      "2025-03 现金仓位降至 12.3%",
      "2025-05 回撤修复速度优于同类中位数",
    ],
  },
  {
    id: "B",
    name: "产品B",
    code: "FOF-B017",
    managerId: "M1",
    manager: "管理人甲",
    type: "稳健配置FOF",
    rating: "良好",
    score: 84,
    nav: "1.39",
    maxDrawdown: 9.88,
    currentDrawdown: 3.16,
    recoveryDays: 44,
    vol: 8.74,
    calmar: 1.32,
    annualReturn: 11.5,
    sharpe: 1.28,
    conclusion: "本产品波动较低，收益稳定性较好，适合稳健型客户配置。",
    risk: "短期超额收益收窄，债券策略贡献下降，需要观察组合弹性。",
    navSeries: [0.98, 1.01, 1.04, 1.06, 1.07, 1.1, 1.12, 1.16, 1.18, 1.2, 1.24, 1.25, 1.29, 1.31, 1.3, 1.33, 1.35, 1.36, 1.38, 1.39],
    benchmarkSeries: [0.96, 1, 1.02, 1.04, 1.02, 1.05, 1.04, 1.12, 1.16, 1.17, 1.21, 1.2, 1.23, 1.28, 1.27, 1.29, 1.31, 1.32, 1.33, 1.35],
    peerSeries: [0.95, 0.97, 0.99, 1, 1.02, 1.01, 1.04, 1.07, 1.09, 1.08, 1.11, 1.12, 1.14, 1.16, 1.15, 1.18, 1.19, 1.2, 1.21, 1.23],
    drawdown: [0, -0.5, -1.5, -1.1, -2.1, -0.7, -1.3, -2.2, -3.4, -1.6, -1.1, -0.9, -2.4, -3.1, -1.8, -0.8, -2.5, -3.4, -2.1, -3.16],
    allocation: {
      dates: ["2024-05", "2024-08", "2024-11", "2025-02", "2025-05"],
      series: [
        { name: "权益多头", color: "#0f5cff", values: [16, 15, 18, 17, 18] },
        { name: "债券策略", color: "#00a99d", values: [46, 48, 44, 43, 42] },
        { name: "量化对冲", color: "#ff9f1a", values: [18, 17, 19, 21, 20] },
        { name: "其他策略", color: "#6b4ce6", values: [20, 20, 19, 19, 20] },
      ],
    },
    cashSeries: [17, 18, 17, 16, 15, 16, 17, 16, 15, 15, 14, 13, 13, 14],
    quality: {
      positiveWeeks: "59%",
      alphaStability: "中高",
      downsideCapture: "0.78",
      comment: "收益来源较均衡，但进攻弹性弱于产品A。",
    },
    events: ["2025-02 债券策略贡献回落", "2025-04 组合波动率维持低位"],
  },
  {
    id: "C",
    name: "产品C",
    code: "FOF-C083",
    managerId: "M2",
    manager: "管理人乙",
    type: "进取多策略",
    rating: "观察",
    score: 76,
    nav: "1.57",
    maxDrawdown: 18.67,
    currentDrawdown: 7.8,
    recoveryDays: 91,
    vol: 14.72,
    calmar: 0.94,
    annualReturn: 13.9,
    sharpe: 0.92,
    conclusion: "本产品收益弹性较强，但回撤修复时间偏长，建议降低推荐优先级。",
    risk: "组合权益暴露较高，市场急跌时回撤放大明显，需关注风险漂移。",
    navSeries: [0.94, 1.01, 1.09, 1.2, 1.15, 1.25, 1.33, 1.28, 1.42, 1.5, 1.43, 1.56, 1.49, 1.6, 1.52, 1.48, 1.55, 1.51, 1.6, 1.57],
    benchmarkSeries: [0.96, 1, 1.02, 1.04, 1.02, 1.05, 1.04, 1.22, 1.18, 1.21, 1.27, 1.25, 1.32, 1.35, 1.32, 1.33, 1.31, 1.36, 1.39, 1.44],
    peerSeries: [0.94, 0.93, 0.92, 0.95, 0.93, 0.91, 0.92, 1.01, 0.99, 1.04, 1.06, 1.03, 1.09, 1.1, 1.08, 1.06, 1.05, 1.1, 1.13, 1.15],
    drawdown: [0, -1.2, -3.5, -2.1, -6.8, -1.5, -4.2, -8.1, -2.5, -5.3, -10.1, -4.4, -8.8, -3.1, -11.6, -18.67, -12.8, -9.2, -7.4, -7.8],
    allocation: {
      dates: ["2024-05", "2024-08", "2024-11", "2025-02", "2025-05"],
      series: [
        { name: "权益多头", color: "#0f5cff", values: [34, 38, 42, 44, 46] },
        { name: "债券策略", color: "#00a99d", values: [20, 18, 16, 15, 14] },
        { name: "量化对冲", color: "#ff9f1a", values: [24, 22, 23, 21, 19] },
        { name: "其他策略", color: "#6b4ce6", values: [22, 22, 19, 20, 21] },
      ],
    },
    cashSeries: [9, 8, 7, 7, 6, 5, 6, 5, 4, 6, 7, 8, 7, 6],
    quality: {
      positiveWeeks: "55%",
      alphaStability: "中",
      downsideCapture: "1.08",
      comment: "收益由高弹性阶段贡献较多，下行捕获率偏高。",
    },
    events: ["2025-01 权益暴露突破 40%", "2025-03 最大回撤触及预警阈值"],
  },
];

products = [
  {
    id: "A108",
    name: "A108",
    code: "108产品示例",
    sourceFile: "108产品示例.xlsx",
    managerId: "M1",
    manager: "管理人甲",
    type: "多策略FOF",
    rating: "稳健",
    score: 86,
    nav: "1.0917",
    latestDate: "2026-04-17",
    maxDrawdown: 2.54,
    peerMaxDrawdown: 4.8,
    currentDrawdown: 0.4,
    recoveryDays: 14,
    vol: 4.46,
    calmar: 4.52,
    annualReturn: 11.47,
    sharpe: 2.24,
    conclusion: "A108 基于周度数据表现稳健，成立以来年化收益约 11.47%，最大回撤约 2.54%，风险收益比相对突出。",
    risk: "短期最大回撤仍处在可控区间，但产品样本时间较短，后续需要继续观察回撤修复和策略权重漂移。",
    labels: ["2026-01-23", "2026-01-30", "2026-02-06", "2026-02-27", "2026-03-06", "2026-03-13", "2026-03-20", "2026-03-27", "2026-04-03", "2026-04-10", "2026-04-17"],
    navSeries: [1.0852, 1.0834, 1.0756, 1.0961, 1.0888, 1.0864, 1.0707, 1.0721, 1.0683, 1.0824, 1.0917],
    benchmarkSeries: [1.0852, 1.084, 1.08, 1.086, 1.083, 1.081, 1.076, 1.078, 1.074, 1.081, 1.086],
    peerSeries: [1.0852, 1.082, 1.079, 1.083, 1.08, 1.078, 1.073, 1.074, 1.071, 1.076, 1.08],
    drawdown: [0, -0.17, -0.88, 0, -0.67, -0.88, -2.32, -2.19, -2.54, -1.25, -0.4],
    allocation: {
      dates: ["01-23", "01-30", "02-06", "02-27", "03-06", "03-13", "03-20", "03-27", "04-03", "04-10", "04-17"],
      series: [
        { name: "固定收益", color: "#3f7cff", values: [14.93, 14.97, 15.09, 14.84, 14.96, 15, 15.23, 15.22, 15.29, 15.11, 15] },
        { name: "量化套利", color: "#00a99d", values: [24.41, 24.44, 24.64, 24.35, 24.58, 24.62, 24.93, 24.94, 25.05, 24.77, 24.62] },
        { name: "量化中性", color: "#ff9f1a", values: [20.99, 20.96, 21.22, 21.14, 21.41, 21.49, 21.68, 21.82, 21.88, 21.72, 21.64] },
        { name: "CTA", color: "#6b4ce6", values: [20.88, 21.3, 20.87, 20.84, 20.7, 20.7, 20.65, 20.5, 20.62, 20.44, 20.3] },
        { name: "量化指增", color: "#e15c3b", values: [17.41, 16.96, 16.81, 17.53, 17.07, 16.92, 16.22, 16.24, 15.9, 16.73, 17.25] },
        { name: "现金及货币", color: "#90a4bc", values: [1.41, 1.42, 1.43, 1.33, 1.34, 1.35, 1.31, 1.3, 1.31, 1.29, 1.22] },
      ],
    },
    cashSeries: [1.41, 1.42, 1.43, 1.33, 1.34, 1.35, 1.31, 1.3, 1.31, 1.29, 1.22],
    strategyMetrics: [
      ["策略集中度（HHI）", "0.20"],
      ["现金缓冲度", "1.22%"],
      ["策略配置信度", "0.91"],
    ],
    quality: null,
    events: ["策略行为来自 108产品示例.xlsx", "收益质量模块按要求暂不填充"],
  },
  {
    id: "B5",
    name: "B5",
    code: "华润信托·民银尊享B5号单一资金信托",
    sourceFile: "B5净值+策略配置时序",
    managerId: "M3",
    manager: "华润信托",
    type: "单一资金信托",
    rating: "稳健",
    score: 82,
    nav: "1.2202",
    latestDate: "2026-04-30",
    maxDrawdown: 6.19,
    peerMaxDrawdown: 9.2,
    currentDrawdown: 0,
    recoveryDays: 246,
    vol: 4.5,
    calmar: 1.13,
    annualReturn: 7.02,
    sharpe: 1.44,
    conclusion: "B5基于净值与策略配置时序数据表现稳健，最新净值1.2202，年化收益约7.02%，最大回撤约6.19%，策略配置以市场中性、指数增强、量化多头为主。",
    risk: "B5历史回撤修复周期较长，策略层面从现金迁移至多策略配置后，需继续观察套利、市场中性和指数增强之间的权重再平衡。",
    labels: ["2023-05-26", "2023-07-28", "2023-09-15", "2023-11-17", "2024-01-05", "2024-03-01", "2024-04-26", "2024-06-28", "2024-08-16", "2024-10-18", "2024-12-06", "2025-01-27", "2025-03-28", "2025-05-23", "2025-07-11", "2025-09-05", "2025-10-31", "2025-12-31", "2026-03-06", "2026-04-30"],
    navSeries: [1, 1.008, 1.0083, 1.0146, 1.0055, 0.9745, 0.9916, 0.996, 0.9973, 1.0162, 1.0456, 1.0423, 1.0653, 1.0714, 1.0893, 1.1248, 1.1471, 1.1636, 1.2086, 1.2202],
    benchmarkSeries: [1, 1.0175, 0.9901, 0.9775, 0.953, 0.9789, 0.9863, 0.9749, 0.9635, 1.0321, 1.0393, 1.0247, 1.0373, 1.0362, 1.0517, 1.0991, 1.1187, 1.1199, 1.125, 1.1413],
    peerSeries: [1, 1.0142, 1, 0.9962, 0.9784, 0.9781, 0.989, 0.9837, 0.9772, 1.023, 1.0402, 1.0312, 1.0493, 1.0525, 1.0699, 1.1125, 1.1335, 1.1412, 1.1634, 1.1767],
    drawdown: [0, 0, 0, 0, -0.9, -3.95, -2.27, -1.83, -1.71, 0, 0, -0.32, 0, 0, 0, 0, 0, 0, 0, 0],
    allocation: {
      dates: ["2023-05", "2023-09", "2023-12", "2024-04", "2024-07", "2024-10", "2025-01", "2025-04", "2025-07", "2025-10", "2026-01", "2026-04"],
      series: [
        { name: "市场中性", color: "#00a99d", values: [0, 35.18, 41.6, 17.31, 15.89, 22.37, 22.84, 17.08, 17.86, 18.91, 21.22, 21.31] },
        { name: "指数增强", color: "#3f7cff", values: [0, 16.83, 16.69, 11, 5.1, 5.45, 10.65, 14.68, 15.54, 17.87, 17.51, 19.85] },
        { name: "量化多头", color: "#e15c3b", values: [0, 0, 0, 0, 0, 0, 0, 0, 8.8, 10.88, 12.53, 12.68] },
        { name: "套利", color: "#ff9f1a", values: [0, 10.09, 0, 20.29, 30.54, 28.22, 39.33, 35.41, 30.86, 25.49, 16.4, 9.16] },
        { name: "CTA", color: "#6b4ce6", values: [0, 9.95, 10.09, 0, 5.06, 6.33, 7.78, 9.61, 9.62, 9.12, 9.02, 9.11] },
        { name: "现金", color: "#90a4bc", values: [100, 2.72, 3.87, 12.44, 0.82, 14.08, 1.12, 8.14, 6.33, 1.04, 2.57, 8.04] },
      ],
    },
    cashSeries: [100, 2.72, 3.87, 12.44, 0.82, 14.08, 1.12, 8.14, 6.33, 1.04, 2.57, 8.04],
    strategyMetrics: [
      ["单期最大调仓", "53.94%"],
      ["累计调仓幅度", "550.92%"],
      ["调仓胜率", "62.3%"],
    ],
    quality: null,
    events: ["业绩表现来自2026年04月30日产品净值表", "策略行为来自B5策略配置时序图"],
  },
  {
    id: "C3",
    name: "C3",
    code: "华润信托·民银尊享C3号单一资金信托",
    sourceFile: "C3净值+策略配置时序",
    managerId: "M3",
    manager: "华润信托",
    type: "单一资金信托",
    rating: "进取观察",
    score: 74,
    nav: "1.1965",
    latestDate: "2026-05-08",
    maxDrawdown: 17.25,
    peerMaxDrawdown: 18.8,
    currentDrawdown: 0,
    recoveryDays: 343,
    vol: 10.07,
    calmar: 0.36,
    annualReturn: 6.18,
    sharpe: 0.61,
    conclusion: "C3最新净值1.1965，净值已修复并创新高，但历史最大回撤约17.25%，波动显著高于B5，策略配置更偏指数增强、主观选股和量化多头。",
    risk: "C3权益相关策略暴露更高，2024年曾经历较深回撤；后续需要重点观察高权益暴露下的调仓纪律和回撤保护能力。",
    labels: ["2023-05-12", "2023-07-14", "2023-09-01", "2023-11-03", "2023-12-29", "2024-02-23", "2024-04-19", "2024-06-21", "2024-08-09", "2024-10-11", "2024-12-06", "2025-01-27", "2025-03-28", "2025-05-23", "2025-07-18", "2025-09-05", "2025-11-07", "2026-01-09", "2026-03-13", "2026-05-08"],
    navSeries: [1, 1.0073, 0.9912, 0.9803, 0.9813, 0.8737, 0.8867, 0.8758, 0.8501, 0.894, 0.9147, 0.8959, 0.9344, 0.9227, 0.964, 1.0208, 1.0566, 1.107, 1.1295, 1.1965],
    benchmarkSeries: [1, 0.9902, 0.9629, 0.9102, 0.8713, 0.8862, 0.8994, 0.8877, 0.8461, 0.9872, 1.009, 0.9694, 0.9943, 0.9859, 1.0307, 1.1327, 1.1882, 1.2085, 1.1857, 1.2372],
    peerSeries: [1, 0.9989, 0.9773, 0.9437, 0.9226, 0.8818, 0.894, 0.8816, 0.8464, 0.9433, 0.9646, 0.9349, 0.9668, 0.9579, 1.002, 1.0842, 1.131, 1.1644, 1.1612, 1.2187],
    drawdown: [0, 0, -1.6, -2.68, -2.58, -13.26, -11.97, -13.05, -15.61, -11.25, -9.19, -11.06, -7.24, -8.4, -4.3, 0, 0, 0, 0, 0],
    allocation: {
      dates: ["2023-05", "2023-08", "2023-12", "2024-03", "2024-07", "2024-10", "2025-01", "2025-04", "2025-07", "2025-10", "2026-01", "2026-05"],
      series: [
        { name: "指数增强", color: "#3f7cff", values: [0, 38.81, 41.31, 33.98, 32.35, 23.43, 25.12, 35.98, 37.49, 40.77, 42.43, 43.42] },
        { name: "主观选股", color: "#e15c3b", values: [0, 9.9, 9.99, 0, 10.69, 13.13, 15.19, 12.33, 12.22, 13.23, 22.53, 22.79] },
        { name: "量化多头", color: "#ff9f1a", values: [0, 4.84, 10, 0, 0, 0, 0, 0, 0, 10.51, 13.12, 13.4] },
        { name: "CTA", color: "#6b4ce6", values: [0, 10.16, 10.22, 11.32, 12.15, 16.25, 11.05, 12.68, 12.48, 11.43, 10.68, 10.57] },
        { name: "多策略", color: "#00a99d", values: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9.4, 8.81] },
        { name: "现金", color: "#90a4bc", values: [100, 20.7, 13.11, 4.27, 13.51, 15.94, 2.8, 6.3, 5.8, 14.06, 1.83, 1] },
      ],
    },
    cashSeries: [100, 20.7, 13.11, 4.27, 13.51, 15.94, 2.8, 6.3, 5.8, 14.06, 1.83, 1],
    strategyMetrics: [
      ["单期最大调仓", "41.34%"],
      ["累计调仓幅度", "662.63%"],
      ["调仓胜率", "48.3%"],
    ],
    quality: null,
    events: ["业绩表现来自2026年05月08日产品净值表", "策略行为来自C3策略配置时序图"],
  },
];

const managers = [
  {
    id: "M3",
    name: "华润信托",
    type: "信托计划管理人",
    productCount: 2,
    fundCount: 13,
    conclusion: "当前已接入 B5、C3 两只单一资金信托的净值与策略配置时序，可初步评估管理人的策略配置和战术调仓能力。",
    risk: "C3权益相关策略暴露较高且历史回撤较深；B5调仓后收益表现更稳定，需继续观察管理人在不同市场状态下的调仓一致性。",
    capabilities: [
      {
        key: "strategy",
        title: "一、策略配置能力",
        score: 78,
        level: "年初中枢回测",
        text: "以年初定下的策略比率中枢为固定权重，不做年内调仓；用各策略对应市场指数加权，推演年底收益、回撤和夏普，再与实际产品结果对比判断战略配置能力。",
        metrics: [
          ["B5静态中枢", "收益7.4%"],
          ["C3静态中枢", "收益8.1%"],
          ["评价口径", "收益/回撤/夏普"],
        ],
      },
      {
        key: "tactical",
        title: "二、战术配置能力",
        score: 72,
        level: "分化明显",
        text: "B5调仓后收益检验更好，调仓胜率约62.3%；C3累计调仓幅度更高，但调仓后短期收益胜率约48.3%，择时稳定性仍需跟踪。",
        metrics: [
          ["B5调仓胜率", "62.3%"],
          ["C3调仓胜率", "48.3%"],
          ["环境匹配度", "样本分化"],
        ],
      },
      {
        key: "selection",
        title: "三、选基能力",
        score: 0,
        level: "留白",
        text: "选基能力部分暂不展示，待接入底层基金持仓、贡献和留存数据后再补充。",
        metrics: [],
      },
    ],
  },
  {
    id: "M1",
    name: "管理人甲",
    type: "多策略FOF",
    productCount: 12,
    fundCount: 38,
    conclusion: "本管理人在三大核心能力方面表现稳健，整体风险可控。建议保持关注，持续跟踪能力稳定性与风格一致性。",
    risk: "市场波动加剧时，战术配置能力存在阶段性回撤压力，需关注风格漂移与集中度风险。",
    capabilities: [
      {
        key: "strategy",
        title: "一、策略配置能力",
        score: 88,
        level: "稳健偏优",
        text: "长期策略权重分配较稳定，权益、债券和量化对冲之间的结构切换有纪律。",
        metrics: [
          ["策略集中度 HHI", "0.58"],
          ["有效策略数", "3.16"],
          ["风格漂移", "低"],
        ],
      },
      {
        key: "tactical",
        title: "二、战术配置能力",
        score: 82,
        level: "稳健",
        text: "能在市场上行阶段提升权益暴露，但极端波动阶段回撤控制仍需观察。",
        metrics: [
          ["调仓胜率", "61%"],
          ["平均换手", "6.5%"],
          ["回撤后降仓速度", "中"],
        ],
      },
      {
        key: "selection",
        title: "三、选基能力",
        score: 86,
        level: "优秀",
        text: "底层基金贡献分布相对健康，头部贡献稳定，拖累基金占比可控。",
        metrics: [
          ["正贡献基金占比", "68%"],
          ["基金留存率", "74%"],
          ["尾部拖累", "可控"],
        ],
      },
    ],
  },
  {
    id: "M2",
    name: "管理人乙",
    type: "进取多策略",
    productCount: 8,
    fundCount: 29,
    conclusion: "管理人乙具备较强进攻能力，但组合波动和风格漂移更明显。",
    risk: "权益暴露提升较快，回撤修复能力弱于管理人甲。",
    capabilities: [
      {
        key: "strategy",
        title: "一、策略配置能力",
        score: 76,
        level: "观察",
        text: "策略配置具备弹性，但集中度偏高，需要约束单一方向暴露。",
        metrics: [
          ["策略集中度 HHI", "0.71"],
          ["有效策略数", "2.43"],
          ["风格漂移", "中高"],
        ],
      },
      {
        key: "tactical",
        title: "二、战术配置能力",
        score: 73,
        level: "观察",
        text: "上行捕捉能力较好，但风险释放阶段降仓偏慢。",
        metrics: [
          ["调仓胜率", "52%"],
          ["平均换手", "9.8%"],
          ["回撤后降仓速度", "偏慢"],
        ],
      },
      {
        key: "selection",
        title: "三、选基能力",
        score: 79,
        level: "良好",
        text: "底层基金筛选能力尚可，但尾部拖累需要继续拆解。",
        metrics: [
          ["正贡献基金占比", "59%"],
          ["基金留存率", "66%"],
          ["尾部拖累", "偏高"],
        ],
      },
    ],
  },
];

const simulatedProductSpecs = [
  ["P001", "P001", "FOF-S001", "M1", "管理人甲", "稳健类FOF", "稳健", 88, 9.8, 3.8, 4.6, 2.18, 2.58, 34],
  ["P002", "P002", "FOF-B002", "M1", "管理人甲", "多策略FOF", "良好", 83, 8.6, 5.2, 5.8, 1.54, 1.65, 48],
  ["P003", "P003", "FOF-F003", "M1", "管理人甲", "固收增强FOF", "稳健", 90, 7.2, 2.6, 3.4, 2.08, 2.77, 28],
  ["P004", "P004", "FOF-Q004", "M2", "管理人乙", "量化FOF", "观察", 76, 10.9, 8.8, 9.2, 1.02, 1.24, 63],
  ["P005", "P005", "FOF-G005", "M2", "管理人乙", "进取类FOF", "进取观察", 72, 13.4, 15.6, 13.2, 0.82, 0.86, 86],
  ["P006", "P006", "FOF-L006", "M1", "管理人甲", "稳健类FOF", "稳健", 87, 6.9, 3.1, 3.9, 1.92, 2.23, 30],
  ["P007", "P007", "FOF-H007", "M2", "管理人乙", "多策略FOF", "良好", 81, 9.1, 6.4, 7.1, 1.28, 1.42, 54],
  ["P008", "P008", "FOF-M008", "M3", "华润信托", "单一资金信托", "稳健", 80, 7.6, 6.8, 5.6, 1.31, 1.12, 57],
  ["P009", "P009", "TRUST-D001", "M3", "华润信托", "单一资金信托", "良好", 79, 8.2, 7.4, 6.2, 1.21, 1.11, 61],
  ["P010", "P010", "TRUST-E002", "M3", "华润信托", "单一资金信托", "观察", 73, 6.4, 10.9, 8.1, 0.72, 0.59, 74],
  ["P011", "P011", "FOF-C011", "M2", "管理人乙", "量化FOF", "良好", 82, 8.9, 5.9, 7.8, 1.18, 1.51, 50],
  ["P012", "P012", "FOF-A012", "M1", "管理人甲", "量化FOF", "稳健", 85, 7.8, 4.2, 4.7, 1.74, 1.86, 39],
  ["P013", "P013", "FOF-W013", "M1", "管理人甲", "多策略FOF", "良好", 84, 8.4, 5.5, 5.1, 1.56, 1.53, 45],
  ["P014", "P014", "FOF-E014", "M2", "管理人乙", "进取类FOF", "进取观察", 71, 14.2, 18.4, 14.6, 0.74, 0.77, 92],
  ["P015", "P015", "FOF-CASH015", "M1", "管理人甲", "稳健类FOF", "稳健", 89, 5.6, 1.8, 2.2, 2.42, 3.11, 18],
  ["P016", "P016", "FOF-N016", "M3", "华润信托", "量化FOF", "良好", 83, 7.1, 4.6, 4.9, 1.46, 1.54, 36],
  ["P017", "P017", "FOF-X017", "M2", "管理人乙", "多策略FOF", "观察", 77, 9.7, 9.6, 8.4, 1.05, 1.01, 67],
  ["P018", "P018", "FOF-R018", "M3", "华润信托", "单一资金信托", "稳健", 81, 7.9, 5.8, 5.3, 1.39, 1.36, 49],
];

function createSimulatedProduct(spec, index) {
  const [id, name, code, managerId, managerName, type, rating, score, annualReturn, maxDrawdown, vol, sharpe, calmar, riskTilt] = spec;
  const labels = ["2025-01-03", "2025-01-31", "2025-02-28", "2025-03-28", "2025-04-25", "2025-05-30", "2025-06-27", "2025-07-25", "2025-08-29", "2025-09-26", "2025-10-31", "2025-11-28", "2025-12-31", "2026-01-30", "2026-02-27", "2026-03-27", "2026-04-30"];
  const trend = annualReturn / 100 / 12;
  const wave = vol / 100 / 8;
  const navSeries = labels.map((_, i) => Number((1 + trend * i + Math.sin(i * 1.08 + index) * wave + Math.cos(i * 0.43 + index / 2) * wave * 0.45).toFixed(4)));
  const benchmarkSeries = labels.map((_, i) => Number((1 + trend * i * 0.82 + Math.sin(i * 0.9 + 0.6) * wave * 0.72).toFixed(4)));
  const peerSeries = labels.map((_, i) => Number((1 + trend * i * 0.75 + Math.sin(i * 0.76 + 1.4) * wave * 0.54).toFixed(4)));
  let peak = navSeries[0];
  const drawdown = navSeries.map((value, i) => {
    peak = Math.max(peak, value);
    const raw = ((value / peak - 1) * 100) - Math.max(0, Math.sin(i * 0.91 + index) * maxDrawdown * 0.12);
    return Number(Math.max(-maxDrawdown, raw).toFixed(2));
  });
  const allocationDates = ["2025-01", "2025-03", "2025-05", "2025-07", "2025-09", "2025-11", "2026-01", "2026-03", "2026-04"];
  const strategyNames = ["固定收益", "市场中性", "指数增强", "CTA", "套利", "现金"];
  const colors = ["#3f7cff", "#00a99d", "#e15c3b", "#6b4ce6", "#ff9f1a", "#90a4bc"];
  const base = [34 - riskTilt * 0.18, 18, riskTilt * 0.22, 12, 22 - riskTilt * 0.1, 14 - riskTilt * 0.06];
  const columns = allocationDates.map((_, i) => {
    const raw = base.map((value, j) => Math.max(1, value + Math.sin(i * 0.9 + j + index) * (2.4 + j * 0.35)));
    const sum = raw.reduce((total, value) => total + value, 0);
    return raw.map((value) => Number(((value / sum) * 100).toFixed(2)));
  });
  const allocation = {
    dates: allocationDates,
    series: strategyNames.map((strategy, strategyIndex) => ({
      name: strategy,
      color: colors[strategyIndex],
      values: columns.map((column) => column[strategyIndex]),
    })),
  };
  const turnover = allocationDates.slice(1).map((_, i) => allocation.series.reduce((sum, serie) => sum + Math.abs(serie.values[i + 1] - serie.values[i]), 0));
  const cumulativeTurnover = turnover.reduce((sum, value) => sum + value, 0);
  const latestNav = navSeries.at(-1);
  return {
    id,
    name,
    code,
    sourceFile: "模拟产品池数据",
    managerId,
    manager: managerName,
    type,
    rating,
    score,
    nav: latestNav.toFixed(4),
    latestDate: "2026-04-30",
    maxDrawdown,
    peerMaxDrawdown: Number((maxDrawdown * 1.18).toFixed(2)),
    currentDrawdown: Math.abs(drawdown.at(-1)),
    recoveryDays: Math.round(20 + maxDrawdown * 9),
    vol,
    calmar,
    annualReturn,
    sharpe,
    conclusion: `${name}为模拟产品池样本，年化收益约${annualReturn.toFixed(1)}%，最大回撤约${maxDrawdown.toFixed(1)}%，用于产品池筛选、横截面指标和对比流程演示。`,
    risk: `${name}当前主要观察点为策略暴露、调仓节奏和回撤修复能力，正式接入后需替换为真实净值与持仓数据。`,
    labels,
    navSeries,
    benchmarkSeries,
    peerSeries,
    drawdown,
    allocation,
    cashSeries: allocation.series.find((serie) => serie.name === "现金").values,
    strategyMetrics: [
      ["单期最大调仓", `${Math.max(...turnover).toFixed(2)}%`],
      ["累计调仓幅度", `${cumulativeTurnover.toFixed(2)}%`],
      ["调仓胜率", `${Math.max(42, Math.min(72, 58 + (score - 80) * 0.7)).toFixed(1)}%`],
    ],
    quality: null,
    events: ["该产品为模拟产品池样本", "净值、配置和指标均为前端确定性模拟数据"],
  };
}

products = [...products, ...simulatedProductSpecs.map((spec, index) => createSimulatedProduct(spec, index))];
managers.forEach((item) => {
  item.productCount = products.filter((productItem) => productItem.managerId === item.id).length;
});

const indicatorGroups = {
  业绩: [
    ["年化收益", "反映产品收益位置，适合与基准及同类中位数对比。"],
    ["周胜率", "衡量产品正收益周数占比，辅助判断收益稳定性。"],
    ["超额收益", "衡量相对基准的贡献，是推荐优先级的重要依据。"],
  ],
  风险: [
    ["最大回撤", "衡量净值从高点到低点的最大损失。"],
    ["回撤修复时间", "衡量从回撤底部恢复到前高所需时间。"],
    ["年化波动率", "衡量收益波动幅度，越低代表体验越平稳。"],
  ],
  行为: [
    ["策略集中度 HHI", "衡量策略配置是否过度集中。"],
    ["现金缓冲度", "衡量组合应对赎回和波动的安全垫。"],
    ["调仓胜率", "衡量调仓后是否提升组合表现。"],
  ],
};

const sopMetrics = {
  risk: [
    ["最大回撤超阈值", "2", "触发内部预警线"],
    ["净值异常下跌", "1", "短期跌幅放大"],
    ["波动率突然上升", "1", "近阶段波动跳升"],
    ["夏普持续下降", "2", "风险收益效率走弱"],
    ["卡玛明显恶化", "1", "回撤收益比恶化"],
    ["规模快速下降", "1", "期末规模变化异常"],
  ],
  service: [
    ["待一线确认", "8", "含2条高优先级"],
    ["待客户触达", "126", "安抚/提示类"],
    ["可营销机会", "42", "增值服务触发"],
    ["今日到期任务", "5", "T日内处理"],
  ],
};

const focusEvents = [
  {
    id: "risk-b5-dd",
    productId: "B5",
    module: "风险事件预警",
    target: "B5",
    scene: "最大回撤超过阈值",
    driver: "产品驱动",
    label: "预警",
    level: "高",
    trigger: "最大回撤突破当前风险等级内部阈值",
    nextAction: "联系管理人确认回撤来源、控风险动作和修复节奏",
    status: "待内部处理",
    customers: "持有客户待接入",
  },
  {
    id: "risk-a108-nav",
    productId: "A108",
    module: "风险事件预警",
    target: "A108",
    scene: "短期净值异常下跌",
    driver: "产品驱动",
    label: "预警",
    level: "中",
    trigger: "短期净值跌幅超过同类波动容忍区间",
    nextAction: "复核估值和持仓驱动，判断是否需要形成统一解释口径",
    status: "跟踪中",
    customers: "持有客户 128户",
  },
  {
    id: "risk-c3-vol",
    productId: "C3",
    module: "风险事件预警",
    target: "C3",
    scene: "波动率突然上升",
    driver: "产品驱动",
    label: "预警",
    level: "高",
    trigger: "年化波动率较前期明显抬升，权益相关暴露贡献较高",
    nextAction: "拆分权益、CTA和现金暴露变化，确认是否需要降波动动作",
    status: "待确认应对口径",
    customers: "持有客户待接入",
  },
  {
    id: "risk-b5-sharpe",
    productId: "B5",
    module: "风险事件预警",
    target: "B5",
    scene: "夏普持续下降",
    driver: "产品驱动",
    label: "预警",
    level: "中",
    trigger: "滚动夏普连续下降，收益补偿不足以覆盖新增波动",
    nextAction: "观察收益来源是否切换，要求管理人解释风险收益效率变化",
    status: "跟踪中",
    customers: "持有客户待接入",
  },
  {
    id: "risk-c3-calmar",
    productId: "C3",
    module: "风险事件预警",
    target: "C3",
    scene: "卡玛明显恶化",
    driver: "产品驱动",
    label: "预警",
    level: "高",
    trigger: "卡玛比率明显下行，回撤对收益的侵蚀加重",
    nextAction: "结合最大回撤和修复周期评估是否升级为客户触达事件",
    status: "待内部处理",
    customers: "持有客户待接入",
  },
  {
    id: "risk-a108-scale",
    productId: "A108",
    module: "风险事件预警",
    target: "A108",
    scene: "产品规模快速下降",
    driver: "产品驱动",
    label: "预警",
    level: "中",
    trigger: "期末产品规模较前期快速下降，可能影响组合流动性和配置稳定性",
    nextAction: "确认规模变化是否来自集中赎回，并评估后续组合调整压力",
    status: "跟踪中",
    customers: "持有客户 128户",
  },
  {
    id: "service-a108",
    productId: "A108",
    module: "一线/客户触达",
    target: "A108",
    scene: "产品回撤安抚",
    driver: "产品驱动",
    label: "安抚",
    level: "中",
    trigger: "产品回撤触发客户陪伴场景",
    nextAction: "生成一线话术，提醒客户关注持有体验",
    status: "待一线确认",
    customers: "128户",
  },
  {
    id: "service-upsell",
    productId: "A108",
    module: "一线/客户触达",
    target: "A108",
    scene: "业绩向好",
    driver: "产品驱动",
    label: "增值",
    level: "机会",
    trigger: "产品业绩连续表现优于模拟同类中位数",
    nextAction: "生成增值服务内容，供一线二次营销",
    status: "可营销",
    customers: "42户",
  },
  {
    id: "service-expiry",
    productId: "B5",
    module: "一线/客户触达",
    target: "B5",
    scene: "月度运作信息",
    driver: "产品驱动",
    label: "增值",
    level: "低",
    trigger: "月度运作基本信息定期触发",
    nextAction: "补齐月度运作模板，推送给一线或客户",
    status: "待生成内容",
    customers: "持有客户待接入",
  },
];

const tacticalDiagnostics = [
  {
    productId: "B5",
    product: "B5",
    maxSingle: "53.94%",
    cumulative: "550.92%",
    direction: "增配市场中性、指数增强、量化多头；大幅降低现金",
    frequency: "62次",
    marketTag: "震荡修复 / 低波动优先",
    match: "72%",
    post1: "+0.09%",
    post4: "+0.55%",
    winRate: "62.3%",
    stability: "较稳",
  },
  {
    productId: "C3",
    product: "C3",
    maxSingle: "41.34%",
    cumulative: "662.63%",
    direction: "增配指数增强、主观选股、量化多头；降低现金",
    frequency: "60次",
    marketTag: "权益修复 / 风险偏好回升",
    match: "64%",
    post1: "-0.04%",
    post4: "0.00%",
    winRate: "48.3%",
    stability: "待观察",
  },
];

const strategyCenterDiagnostics = [
  {
    product: "B5",
    center: "稳健中枢",
    staticReturn: "7.4%",
    actualReturn: "7.02%",
    staticDrawdown: "5.8%",
    actualDrawdown: "6.19%",
    staticSharpe: "1.37",
    actualSharpe: "1.44",
    verdict: "战略中枢有效",
  },
  {
    product: "C3",
    center: "进取中枢",
    staticReturn: "8.1%",
    actualReturn: "6.18%",
    staticDrawdown: "14.6%",
    actualDrawdown: "17.25%",
    staticSharpe: "0.72",
    actualSharpe: "0.61",
    verdict: "权益中枢偏进取",
  },
];

const marketStateTags = [
  ["权益修复", "沪深300/权益基准上行，适合提升指数增强、量化多头、主观选股等权益相关暴露。"],
  ["震荡修复", "权益方向不稳定但波动下降，适合保留市场中性、套利、CTA等低相关策略。"],
  ["权益承压", "权益基准回撤或波动上升，观察是否降权益、升现金或低相关策略。"],
  ["低波动优先", "组合体验目标优先，调仓应更看重回撤控制和收益平滑。"],
];

const months = [
  "2024-05",
  "2024-06",
  "2024-07",
  "2024-08",
  "2024-09",
  "2024-10",
  "2024-11",
  "2024-12",
  "2025-01",
  "2025-02",
  "2025-03",
  "2025-04",
  "2025-05",
  "2025-06",
  "2025-07",
  "2025-08",
  "2025-09",
  "2025-10",
  "2025-11",
  "2025-12",
];

function product() {
  return products.find((item) => item.id === state.selectedProductId) || products[0];
}

function manager() {
  return managers.find((item) => item.id === state.selectedManagerId) || managers[0];
}

function icon(name) {
  const icons = {
    bank: '<svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 10h18L12 4 3 10Z"/><path d="M5 10v9M9 10v9M15 10v9M19 10v9"/><path d="M3 19h18"/></svg>',
    briefcase: '<svg viewBox="0 0 24 24" width="21" height="21" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="7" width="18" height="13" rx="2"/><path d="M8 7V5h8v2M3 12h18"/></svg>',
    users: '<svg viewBox="0 0 24 24" width="21" height="21" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></svg>',
    headset: '<svg viewBox="0 0 24 24" width="21" height="21" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 18v-6a9 9 0 0 1 18 0v6"/><path d="M21 19a2 2 0 0 1-2 2h-2"/><rect x="3" y="13" width="4" height="6" rx="2"/><rect x="17" y="13" width="4" height="6" rx="2"/></svg>',
    table: '<svg viewBox="0 0 24 24" width="21" height="21" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="16" rx="2"/><path d="M3 10h18M9 10v10"/></svg>',
    gear: '<svg viewBox="0 0 24 24" width="21" height="21" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .34 1.88l.05.05a2 2 0 1 1-2.83 2.83l-.05-.05A1.7 1.7 0 0 0 15 19.4a1.7 1.7 0 0 0-1 .6 1.7 1.7 0 0 0-.4 1.1V21a2 2 0 1 1-4 0v-.1A1.7 1.7 0 0 0 9 19.4a1.7 1.7 0 0 0-1.88.34l-.05.05a2 2 0 1 1-2.83-2.83l.05-.05A1.7 1.7 0 0 0 4.6 15a1.7 1.7 0 0 0-.6-1A1.7 1.7 0 0 0 3 13.6H3a2 2 0 1 1 0-4h.1A1.7 1.7 0 0 0 4.6 9a1.7 1.7 0 0 0-.34-1.88l-.05-.05a2 2 0 1 1 2.83-2.83l.05.05A1.7 1.7 0 0 0 9 4.6a1.7 1.7 0 0 0 1-.6 1.7 1.7 0 0 0 .4-1.1V3a2 2 0 1 1 4 0v.1A1.7 1.7 0 0 0 15 4.6a1.7 1.7 0 0 0 1.88-.34l.05-.05a2 2 0 1 1 2.83 2.83l-.05.05A1.7 1.7 0 0 0 19.4 9c.3.38.67.58 1.1.6H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1.4Z"/></svg>',
    menu: '<svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" stroke-width="3"><path d="M4 6h16M4 12h16M4 18h16"/></svg>',
    search: '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>',
    refresh: '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12a9 9 0 0 1-15.2 6.5"/><path d="M3 12A9 9 0 0 1 18.2 5.5"/><path d="M3 19v-5h5M21 5v5h-5"/></svg>',
    bell: '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 8a6 6 0 1 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9"/><path d="M10 21h4"/></svg>',
    user: '<svg viewBox="0 0 24 24" width="19" height="19" fill="currentColor"><circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/></svg>',
  };
  return icons[name] || "";
}

function setPage(page, detail) {
  state.page = page;
  state.searchOpen = false;
  if (detail?.productId) {
    state.selectedProductId = detail.productId;
    const p = products.find((item) => item.id === detail.productId);
    if (p) state.selectedManagerId = p.managerId;
  }
  if (detail?.managerId) state.selectedManagerId = detail.managerId;
  render();
}

function openDrawer(title, subtitle, blocks) {
  const mask = document.querySelector(".drawer-mask");
  mask.innerHTML = `
    <aside class="drawer" role="dialog" aria-modal="true" aria-label="${title}">
      <div class="drawer-header">
        <div>
          <h2>${title}</h2>
          <p>${subtitle}</p>
        </div>
        <button class="drawer-close" aria-label="关闭">×</button>
      </div>
      <div class="drawer-body">
        ${blocks
          .map(
            (block) => `
              <section class="drawer-block">
                <h3>${block.title}</h3>
                ${Array.isArray(block.body) ? `<ul>${block.body.map((item) => `<li>${item}</li>`).join("")}</ul>` : `<p>${block.body}</p>`}
              </section>
            `,
          )
          .join("")}
      </div>
    </aside>
  `;
  mask.classList.add("open");
  mask.querySelector(".drawer-close").addEventListener("click", closeDrawer);
  mask.addEventListener("click", (event) => {
    if (event.target === mask) closeDrawer();
  });
}

function closeDrawer() {
  const mask = document.querySelector(".drawer-mask");
  mask.classList.remove("open");
}

function toast(message) {
  const el = document.querySelector(".toast");
  el.textContent = message;
  el.classList.add("show");
  window.clearTimeout(toast.timer);
  toast.timer = window.setTimeout(() => el.classList.remove("show"), 1800);
}

function lineChart(series, options = {}) {
  const width = 680;
  const height = 230;
  const pad = { left: 44, right: 18, top: 14, bottom: 32 };
  const all = series.flatMap((item) => item.values);
  const min = options.min ?? Math.min(...all);
  const max = options.max ?? Math.max(...all);
  const x = (i, n) => pad.left + (i / Math.max(n - 1, 1)) * (width - pad.left - pad.right);
  const y = (v) => pad.top + ((max - v) / Math.max(max - min, 0.0001)) * (height - pad.top - pad.bottom);
  const ticks = [0, 0.25, 0.5, 0.75, 1].map((n) => min + (max - min) * n);
  const labels = options.labels || months;

  return `
    <svg viewBox="0 0 ${width} ${height}" role="img">
      ${ticks
        .map((tick) => {
          const yy = y(tick);
          return `<path d="M${pad.left} ${yy}H${width - pad.right}" stroke="#e9eff8" stroke-width="1"/><text x="8" y="${yy + 4}" fill="#334765" font-size="12">${options.percent ? `${tick.toFixed(0)}%` : tick.toFixed(1)}</text>`;
        })
        .join("")}
      ${options.threshold ? `<path d="M${pad.left} ${y(options.threshold)}H${width - pad.right}" stroke="#ef3f3f" stroke-dasharray="5 5"/><text x="${pad.left + 12}" y="${y(options.threshold) + 20}" fill="#ef3f3f" font-size="14">最大回撤：${options.threshold.toFixed(2)}%</text>` : ""}
      ${series
        .map((item) => {
          const path = item.values.map((v, i) => `${i === 0 ? "M" : "L"}${x(i, item.values.length).toFixed(1)} ${y(v).toFixed(1)}`).join(" ");
          const dots = item.values
            .map(
              (v, i) =>
                `<circle class="point" data-title="${item.name}" data-date="${labels[i] || ""}" data-value="${v}" cx="${x(i, item.values.length).toFixed(1)}" cy="${y(v).toFixed(1)}" r="3.2" fill="${item.color}"/>`,
            )
            .join("");
          return `<path d="${path}" fill="none" stroke="${item.color}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>${dots}`;
        })
        .join("")}
      ${[0, 0.25, 0.5, 0.75, 1]
        .map((n) => {
          const idx = Math.round((labels.length - 1) * n);
          return `<text x="${x(idx, labels.length)}" y="${height - 8}" text-anchor="middle" fill="#334765" font-size="12">${labels[idx]}</text>`;
        })
        .join("")}
    </svg>
  `;
}

function barChart(items) {
  const width = 280;
  const height = 170;
  const max = Math.max(...items.map((item) => item.value)) * 1.2;
  const base = 130;
  return `
    <svg viewBox="0 0 ${width} ${height}" role="img">
      <path d="M24 ${base}H260" stroke="#dce6f5"/>
      ${items
        .map((item, index) => {
          const x = 62 + index * 110;
          const h = (item.value / max) * 104;
          return `
            <rect class="bar" data-title="${item.name}" data-value="${item.value}" x="${x}" y="${base - h}" width="52" height="${h}" rx="3" fill="${item.color}"/>
            <text x="${x + 26}" y="${base - h - 9}" text-anchor="middle" fill="#27395c" font-size="13" font-weight="800">${item.value.toFixed(2)}%</text>
            <text x="${x + 26}" y="${base + 24}" text-anchor="middle" fill="#27395c" font-size="12">${item.name}</text>
          `;
        })
        .join("")}
    </svg>
  `;
}

function numericValue(value) {
  return parseFloat(String(value).replace("%", "")) || 0;
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

function pairedBarChart(rows, options = {}) {
  const width = 430;
  const height = 188;
  const pad = { left: 34, right: 18, top: 24, bottom: 44 };
  const max = Math.max(...rows.flatMap((row) => [row.first, row.second]), 0.01) * 1.18;
  const groupWidth = (width - pad.left - pad.right) / rows.length;
  const barWidth = 28;
  const y = (value) => pad.top + (1 - value / max) * (height - pad.top - pad.bottom);
  const base = height - pad.bottom;
  const fmt = (value) => `${value.toFixed(options.decimals ?? 1)}${options.unit ?? "%"}`;

  return `
    <svg viewBox="0 0 ${width} ${height}" role="img">
      <path d="M${pad.left} ${base}H${width - pad.right}" stroke="#dce6f5"/>
      ${rows
        .map((row, index) => {
          const x = pad.left + groupWidth * index + groupWidth / 2;
          const firstY = y(row.first);
          const secondY = y(row.second);
          return `
            <rect x="${x - barWidth - 3}" y="${firstY}" width="${barWidth}" height="${base - firstY}" rx="4" fill="${options.firstColor || "#3f7cff"}"/>
            <rect x="${x + 3}" y="${secondY}" width="${barWidth}" height="${base - secondY}" rx="4" fill="${options.secondColor || "#00a99d"}"/>
            <text x="${x - barWidth / 2 - 3}" y="${firstY - 7}" text-anchor="middle" fill="#27395c" font-size="11" font-weight="850">${fmt(row.first)}</text>
            <text x="${x + barWidth / 2 + 3}" y="${secondY - 7}" text-anchor="middle" fill="#27395c" font-size="11" font-weight="850">${fmt(row.second)}</text>
            <text x="${x}" y="${height - 13}" text-anchor="middle" fill="#334765" font-size="12" font-weight="800">${row.label}</text>
          `;
        })
        .join("")}
      <circle cx="${pad.left + 8}" cy="12" r="4" fill="${options.firstColor || "#3f7cff"}"/><text x="${pad.left + 18}" y="16" fill="#60708e" font-size="12" font-weight="750">${options.firstLabel || "静态"}</text>
      <circle cx="${pad.left + 78}" cy="12" r="4" fill="${options.secondColor || "#00a99d"}"/><text x="${pad.left + 88}" y="16" fill="#60708e" font-size="12" font-weight="750">${options.secondLabel || "实际"}</text>
    </svg>
  `;
}

function divergingPercentChart(rows) {
  const width = 530;
  const height = 46 * rows.length + 26;
  const pad = { left: 112, right: 52, top: 14, bottom: 12 };
  const min = Math.min(-0.1, ...rows.map((row) => row.value));
  const max = Math.max(0.1, ...rows.map((row) => row.value));
  const x = (value) => pad.left + ((value - min) / (max - min)) * (width - pad.left - pad.right);
  const zero = x(0);

  return `
    <svg viewBox="0 0 ${width} ${height}" role="img">
      <path d="M${zero} ${pad.top - 4}V${height - pad.bottom}" stroke="#c7d5e8" stroke-dasharray="4 4"/>
      ${rows
        .map((row, index) => {
          const y = pad.top + index * 46 + 10;
          const end = x(row.value);
          const rectX = Math.min(zero, end);
          const rectWidth = Math.max(2, Math.abs(end - zero));
          return `
            <text x="8" y="${y + 14}" fill="#27395c" font-size="13" font-weight="850">${row.label}</text>
            <rect x="${rectX}" y="${y}" width="${rectWidth}" height="18" rx="4" fill="${row.color}"/>
            <text x="${row.value >= 0 ? end + 7 : end - 7}" y="${y + 14}" text-anchor="${row.value >= 0 ? "start" : "end"}" fill="#27395c" font-size="12" font-weight="900">${row.value.toFixed(2)}%</text>
          `;
        })
        .join("")}
    </svg>
  `;
}

function horizontalPercentChart(rows, options = {}) {
  const width = 530;
  const height = 46 * rows.length + 26;
  const pad = { left: 112, right: 48, top: 14, bottom: 12 };
  const x = (value) => pad.left + (Math.max(0, Math.min(100, value)) / 100) * (width - pad.left - pad.right);

  return `
    <svg viewBox="0 0 ${width} ${height}" role="img">
      ${options.threshold ? `<path d="M${x(options.threshold)} ${pad.top - 4}V${height - pad.bottom}" stroke="#ff7a1a" stroke-dasharray="4 4"/><text x="${x(options.threshold) + 6}" y="${height - 3}" fill="#b25c00" font-size="11" font-weight="800">${options.threshold}%</text>` : ""}
      ${rows
        .map((row, index) => {
          const y = pad.top + index * 46 + 10;
          return `
            <text x="8" y="${y + 14}" fill="#27395c" font-size="13" font-weight="850">${row.label}</text>
            <rect x="${pad.left}" y="${y}" width="${width - pad.left - pad.right}" height="18" rx="4" fill="#edf3fb"/>
            <rect x="${pad.left}" y="${y}" width="${x(row.value) - pad.left}" height="18" rx="4" fill="${row.color}"/>
            <text x="${width - 10}" y="${y + 14}" text-anchor="end" fill="#27395c" font-size="12" font-weight="900">${row.value.toFixed(1)}%</text>
          `;
        })
        .join("")}
    </svg>
  `;
}

function compactMetricChart(rows, options = {}) {
  const width = 360;
  const height = 52 * rows.length + 26;
  const pad = { left: 118, right: 48, top: 14, bottom: 12 };
  const x = (value) => pad.left + (Math.max(0, Math.min(100, value)) / 100) * (width - pad.left - pad.right);

  return `
    <svg viewBox="0 0 ${width} ${height}" role="img">
      ${options.threshold ? `<path d="M${x(options.threshold)} ${pad.top - 4}V${height - pad.bottom}" stroke="#ff7a1a" stroke-dasharray="4 4"/><text x="${x(options.threshold) + 5}" y="${height - 4}" fill="#b25c00" font-size="12" font-weight="850">${options.threshold}%</text>` : ""}
      ${rows
        .map((row, index) => {
          const y = pad.top + index * 52 + 12;
          return `
            <text x="10" y="${y + 15}" fill="#27395c" font-size="15" font-weight="900">${row.label}</text>
            <rect x="${pad.left}" y="${y}" width="${width - pad.left - pad.right}" height="22" rx="5" fill="#edf3fb"/>
            <rect x="${pad.left}" y="${y}" width="${x(row.value) - pad.left}" height="22" rx="5" fill="${row.color}"/>
            <text x="${width - 10}" y="${y + 16}" text-anchor="end" fill="#27395c" font-size="14" font-weight="950">${row.value.toFixed(1)}%</text>
          `;
        })
        .join("")}
    </svg>
  `;
}

function areaChart(allocation) {
  const width = 520;
  const height = 170;
  const pad = { left: 38, right: 14, top: 12, bottom: 30 };
  const x = (i) => pad.left + (i / (allocation.dates.length - 1)) * (width - pad.left - pad.right);
  const y = (v) => pad.top + ((100 - v) / 100) * (height - pad.top - pad.bottom);
  const cumulative = allocation.dates.map(() => 0);

  const layers = allocation.series
    .map((serie) => {
      const lower = cumulative.slice();
      serie.values.forEach((v, i) => {
        cumulative[i] += v;
      });
      const top = cumulative.map((v, i) => [x(i), y(v)]);
      const bottom = lower.map((v, i) => [x(i), y(v)]).reverse();
      const points = top.concat(bottom).map((p) => p.join(",")).join(" ");
      return `<polygon class="bar" data-title="${serie.name}" data-value="${serie.values.at(-1)}" points="${points}" fill="${serie.color}" opacity="0.82"/>`;
    })
    .join("");

  return `
    <svg viewBox="0 0 ${width} ${height}" role="img">
      ${[0, 25, 50, 75, 100]
        .map((tick) => `<path d="M${pad.left} ${y(tick)}H${width - pad.right}" stroke="#e9eff8"/><text x="4" y="${y(tick) + 4}" fill="#334765" font-size="11">${tick}%</text>`)
        .join("")}
      ${layers}
      ${allocation.dates
        .map((date, i) => `<text x="${x(i)}" y="${height - 8}" text-anchor="middle" fill="#334765" font-size="11">${date}</text>`)
        .join("")}
    </svg>
  `;
}

function renderSidebar() {
  const nav = [
    {
      title: "产品池",
      icon: "briefcase",
      page: "product-pool",
      children: [
        ["product-detail", "产品详情"],
        ["product-compare", "产品对比"],
      ],
    },
    {
      title: "管理人分析",
      icon: "users",
      page: "manager-analysis",
      children: [
        ["manager-strategy", "策略配置能力"],
        ["manager-tactical", "战术配置能力"],
        ["manager-selection", "选基能力"],
      ],
    },
    {
      title: "售后SOP",
      icon: "headset",
      page: "after-sales",
      children: [
        ["risk-alert", "风险事件预警"],
        ["service", "一线/客户触达"],
      ],
    },
    { title: "指标库", icon: "table", page: "indicator-library", children: [] },
    { title: "系统设置", icon: "gear", page: "settings", children: [] },
  ];
  return `
    <aside class="sidebar">
      <div class="brand"><span class="brand-mark">${icon("bank")}</span><span>产品评价系统</span></div>
      ${nav
        .map((section) => {
          const sectionActive = state.page === section.page || section.children.some((child) => child[0] === state.page) || (section.page === "after-sales" && state.page === "sop-workbench");
          return `
            <div class="nav-section">
              <button class="nav-heading ${sectionActive && section.children.length === 0 ? "active" : ""}" data-page="${section.page}">
                <span class="nav-icon">${icon(section.icon)}</span><span>${section.title}</span><span style="margin-left:auto">${section.children.length ? "⌄" : ""}</span>
              </button>
              ${section.children
                .map(
                  ([page, label]) =>
                    `<button class="nav-item ${state.page === page || (state.page === "manager-analysis" && page === "manager-strategy") ? "active" : ""}" data-page="${page}"><span class="bullet"></span><span>${label}</span></button>`,
                )
                .join("")}
            </div>
          `;
        })
        .join("")}
      <button class="collapse" aria-label="收起侧栏">≪</button>
    </aside>
  `;
}

function pageTitle() {
  const map = {
    "product-pool": "产品池",
    "product-detail": "单产品详情",
    "product-compare": "产品对比",
    "manager-analysis": "管理人分析",
    "manager-strategy": "策略配置能力",
    "manager-tactical": "战术配置能力",
    "manager-selection": "选基能力",
    "after-sales": "售后SOP",
    "risk-alert": "风险事件预警",
    service: "一线/客户触达",
    "sop-workbench": "产品售后工作台",
    "indicator-library": "指标库",
    settings: "系统设置",
  };
  return map[state.page] || "单产品详情";
}

function renderTopbar() {
  const results = state.searchOpen
    ? [...products.map((item) => ({ type: "产品", label: item.name, sub: `${item.code} / ${item.manager}`, action: `product:${item.id}` })), ...managers.map((item) => ({ type: "管理人", label: item.name, sub: `${item.type} / ${item.productCount}只产品`, action: `manager:${item.id}` }))]
    : [];
  return `
    <header class="topbar">
      <div class="title-row">
        <button class="menu-button" aria-label="菜单">${icon("menu")}</button>
        <div>
          <h1 class="page-title">${pageTitle()}</h1>
          <div class="crumbs">
            <button data-page="product-detail">首页</button>
            <span>/</span>
            <button data-page="${state.page}">${pageTitle()}</button>
          </div>
        </div>
      </div>
      <div class="search-box">
        <input id="global-search" placeholder="搜索产品名称、管理人、代码" />
        <button class="search-button" aria-label="搜索">${icon("search")}</button>
        ${results.length ? `<div class="search-results">${results.map((item) => `<button class="search-result" data-action="${item.action}"><span><b>${item.label}</b><small>${item.sub}</small></span><span class="tag">${item.type}</span></button>`).join("")}</div>` : ""}
      </div>
      <div class="top-meta">
        <div><span>数据截至：</span>2026-05-20</div>
        <div><span>更新于：</span>2026-05-21 09:30</div>
        <button class="icon-button" data-command="refresh" aria-label="刷新">${icon("refresh")}</button>
        <button class="icon-button" data-command="notifications" aria-label="通知">${icon("bell")}</button>
        <button class="user-button" data-command="user"><span>${icon("user")}</span>张三⌄</button>
      </div>
    </header>
  `;
}

function renderHero(mode = "product") {
  const p = product();
  const m = manager();
  const info =
    mode === "product"
      ? [
          ["产品名称：", `<button class="linkish" data-detail="product">${p.name}</button>`],
          ["管理人：", `<button class="linkish" data-page="manager-analysis" data-manager-id="${p.managerId}">${p.manager}</button>`],
          ["产品类型：", `<button class="linkish" data-detail="type">${p.type}</button>`],
        ]
      : [
          ["管理人名称：", `<button class="linkish" data-detail="manager">${m.name}</button>`],
          ["管理人类型：", `<button class="linkish" data-detail="type">${m.type}</button>`],
          ["跟踪产品数量：", `<button class="linkish" data-page="product-compare">${m.productCount}</button>`],
          ["跟踪子基金数量：", `<button class="linkish" data-detail="funds">${m.fundCount}</button>`],
        ];
  if (mode === "manager") {
    return `
      <section class="card hero-grid manager-hero">
        <div class="info-panel">
          ${info.map(([label, value]) => `<div class="info-row"><span class="label">${label}</span><span>${value}</span></div>`).join("")}
        </div>
      </section>
    `;
  }
  return `
    <section class="card hero-grid">
      <div class="info-panel">
        ${info.map(([label, value]) => `<div class="info-row"><span class="label">${label}</span><span>${value}</span></div>`).join("")}
      </div>
      <button class="card summary-box clickable" data-detail="${mode === "product" ? "conclusion" : "manager-conclusion"}">
        <h2 class="summary-title"><span class="status-dot good">✓</span>系统结论</h2>
        <p>${mode === "product" ? p.conclusion : m.conclusion}</p>
      </button>
      <button class="card summary-box clickable" data-detail="${mode === "product" ? "risk" : "manager-risk"}">
        <h2 class="summary-title"><span class="status-dot warn">!</span>主要风险</h2>
        <p>${mode === "product" ? p.risk : m.risk}</p>
      </button>
    </section>
  `;
}

function renderProductPool() {
  const typeOptions = uniqueValues(products, "type");
  const managerOptions = uniqueValues(products, "manager");
  const filtered = products.filter((p) => {
    const typeMatch = state.poolTypeFilter === "全部" || p.type === state.poolTypeFilter;
    const managerMatch = state.poolManagerFilter === "全部" || p.manager === state.poolManagerFilter;
    return typeMatch && managerMatch;
  });
  const metricRows = [
    ["年化收益", "annualReturn", "%", true],
    ["最大回撤", "maxDrawdown", "%", false],
    ["波动率", "vol", "%", false],
    ["夏普", "sharpe", "", true],
    ["卡玛", "calmar", "", true],
    ["综合评分", "score", "", true],
  ].map(([label, key, unit, higherBetter]) => {
    const values = products.map((item) => Number(item[key]));
    const avg = average(values);
    const med = median(values);
    return { label, avg, med, unit, higherBetter, gap: avg - med };
  });
  const typeCards = typeOptions
    .filter((type) => type !== "全部")
    .map((type) => {
      const scoped = products.filter((p) => p.type === type);
      return {
        type,
        count: scoped.length,
        managerCount: new Set(scoped.map((p) => p.manager)).size,
        avgScore: average(scoped.map((p) => p.score)),
      };
    });
  const selectedCount = state.poolSelectedIds.length;
  return `
    <section class="pool-overview">
      <section class="card panel pool-hero">
        <div>
          <h2 class="panel-title">产品池概览</h2>
          <p class="pool-lead">当前接入 ${products.length} 只产品，覆盖 ${typeCards.length} 类产品类型、${managerOptions.length - 1} 家管理人。筛选后的产品可直接导入产品对比。</p>
        </div>
        <div class="pool-total">
          <b>${products.length}</b>
          <span>池内产品</span>
        </div>
      </section>

      <section class="pool-summary-grid">
        <section class="card panel">
          <h2 class="panel-title small">类型分类</h2>
          <div class="type-card-grid">
            ${typeCards
              .map(
                (item) => `
                  <button class="type-card ${state.poolTypeFilter === item.type ? "active" : ""}" data-pool-filter="type" data-value="${item.type}">
                    <b>${item.type}</b>
                    <strong>${item.count}只</strong>
                    <span>${item.managerCount}家管理人 / 平均评分 ${item.avgScore.toFixed(1)}</span>
                  </button>
                `,
              )
              .join("")}
          </div>
        </section>
        <section class="card panel">
          <h2 class="panel-title small">平均指标 vs 中位数</h2>
          <div class="pool-metric-grid">
            ${metricRows
              .map((row) => {
                const positive = row.higherBetter ? row.gap >= 0 : row.gap <= 0;
                const formattedAvg = row.unit === "%" ? `${row.avg.toFixed(2)}%` : row.avg.toFixed(2);
                const formattedMedian = row.unit === "%" ? `${row.med.toFixed(2)}%` : row.med.toFixed(2);
                const formattedGap = row.unit === "%" ? `${row.gap >= 0 ? "+" : ""}${row.gap.toFixed(2)}pct` : `${row.gap >= 0 ? "+" : ""}${row.gap.toFixed(2)}`;
                return `
                  <button class="pool-metric" data-detail="pool-metric:${row.label}">
                    <span>${row.label}</span>
                    <b>${formattedAvg}</b>
                    <small>中位数 ${formattedMedian}</small>
                    <em class="${positive ? "good" : "warn"}">${formattedGap}</em>
                  </button>
                `;
              })
              .join("")}
          </div>
        </section>
      </section>

      <section class="card panel">
        <div class="pool-list-head">
          <div>
            <h2 class="panel-title">产品列表</h2>
            <p class="panel-subtitle">已筛出 ${filtered.length} 只，已选择 ${selectedCount} 只用于对比</p>
          </div>
          <div class="pool-actions">
            <label>类型
              <select data-pool-filter="type">
                ${typeOptions.map((type) => `<option value="${type}" ${state.poolTypeFilter === type ? "selected" : ""}>${type}</option>`).join("")}
              </select>
            </label>
            <label>管理人
              <select data-pool-filter="manager">
                ${managerOptions.map((managerName) => `<option value="${managerName}" ${state.poolManagerFilter === managerName ? "selected" : ""}>${managerName}</option>`).join("")}
              </select>
            </label>
            <button class="tag clickable" data-pool-import>导入产品对比</button>
          </div>
        </div>
        <div class="table-wrap">
          <table>
            <thead><tr><th>选择</th><th>产品</th><th>类型</th><th>管理人</th><th>年化收益</th><th>最大回撤</th><th>夏普</th><th>评分</th><th>操作</th></tr></thead>
            <tbody>
              ${filtered
                .map(
                  (p) => `
                    <tr>
                      <td><button class="check-button ${state.poolSelectedIds.includes(p.id) ? "active" : ""}" data-pool-select="${p.id}" aria-label="选择${p.name}">${state.poolSelectedIds.includes(p.id) ? "✓" : ""}</button></td>
                      <td><button class="linkish" data-page="product-detail" data-product-id="${p.id}">${p.name}</button><small class="muted-code">${p.code}</small></td>
                      <td>${p.type}</td>
                      <td><button class="linkish" data-page="manager-analysis" data-manager-id="${p.managerId}">${p.manager}</button></td>
                      <td>${p.annualReturn.toFixed(2)}%</td>
                      <td>${p.maxDrawdown.toFixed(2)}%</td>
                      <td>${p.sharpe.toFixed(2)}</td>
                      <td>${p.score}</td>
                      <td><button class="linkish" data-detail="compare:${p.id}">查看拆解</button></td>
                    </tr>
                  `,
                )
                .join("")}
            </tbody>
          </table>
        </div>
      </section>
    </section>
  `;
}

function renderProductDetail() {
  const p = product();
  const hasStrategy = Boolean(p.allocation);
  const riskChartMin = Math.min(-8, Math.floor(Math.min(...p.drawdown, -p.maxDrawdown) - 1));
  const cashMax = hasStrategy ? Math.max(2, Math.ceil(Math.max(...p.cashSeries) * 1.1)) : 2;
  return `
    <section class="product-switcher card">
      <div>
        <b>产品视图</b>
        <span>${p.sourceFile}</span>
      </div>
      <div class="product-tabs">
        ${products.map((item) => `<button class="${item.id === p.id ? "active" : ""}" data-page="product-detail" data-product-id="${item.id}">${item.name}</button>`).join("")}
      </div>
    </section>
    ${renderHero("product")}
    <section class="dashboard-grid">
      <div class="two-row">
        <section class="card panel">
          <h2 class="panel-title">业绩表现</h2>
          <h3 class="panel-subtitle">产品净值 vs 模拟基准 vs 模拟同类中位数</h3>
          <div class="legend">
            <span class="legend-item"><i class="legend-line" style="background:#0f5cff"></i>${p.name}</span>
            <span class="legend-item"><i class="legend-line" style="background:#ff7a1a"></i>模拟基准</span>
            <span class="legend-item"><i class="legend-line" style="background:#00a99d"></i>模拟同类中位数</span>
          </div>
          <button class="chart clickable" data-detail="performance">${lineChart([
            { name: p.name, values: p.navSeries, color: "#0f5cff" },
            { name: "模拟基准", values: p.benchmarkSeries, color: "#ff7a1a" },
            { name: "模拟同类中位数", values: p.peerSeries, color: "#00a99d" },
          ], { labels: p.labels })}</button>
        </section>
        <section class="card panel">
          <h2 class="panel-title">收益质量</h2>
          <button class="blank-panel clickable" data-detail="quality">
            <span>收益质量指标待接入</span>
          </button>
        </section>
      </div>
      <div class="two-row">
        <section class="card panel">
          <h2 class="panel-title">风险控制</h2>
          <div class="metric-grid">
            ${[
              ["最大回撤", `${p.maxDrawdown.toFixed(2)}%`, "max-dd"],
              ["当前回撤", `${p.currentDrawdown.toFixed(2)}%`, "current-dd"],
              ["回撤观察期", `${p.recoveryDays}天`, "recovery"],
              ["年化波动率", `${p.vol.toFixed(2)}%`, "vol"],
              ["卡玛比率", p.calmar.toFixed(2), "calmar"],
            ]
              .map(([label, value, key]) => `<button class="metric-card" data-detail="${key}"><b>${label}</b><span>${value}</span></button>`)
              .join("")}
          </div>
          <div class="risk-layout">
            <div>
              <div class="chart-title">回撤曲线</div>
              <button class="chart clickable" data-detail="drawdown">${lineChart([{ name: "回撤", values: p.drawdown, color: "#0f5cff" }], { min: riskChartMin, max: 1, percent: true, threshold: -p.maxDrawdown, labels: p.labels })}</button>
            </div>
            <button class="mini-card clickable" data-detail="peer-dd">
              <h3>产品 vs 模拟同类最大回撤</h3>
              <div>${barChart([
                { name: p.name, value: p.maxDrawdown, color: "#0f5cff" },
                { name: "同类中位数", value: p.peerMaxDrawdown, color: "#9aa8bd" },
              ])}</div>
            </button>
          </div>
        </section>
        <section class="card panel">
          <h2 class="panel-title">策略行为</h2>
          ${
            hasStrategy
              ? `
                <div class="strategy-grid">
                  <div>
                    <h3 class="panel-subtitle">策略配置比例（%）</h3>
                    <div class="legend compact">
                      ${p.allocation.series.map((item) => `<span class="legend-item"><i class="legend-line" style="background:${item.color}"></i>${item.name}</span>`).join("")}
                    </div>
                    <button class="chart short clickable" data-detail="allocation">${areaChart(p.allocation)}</button>
                  </div>
                  <div>
                    <h3 class="panel-subtitle">现金占比变化（%）</h3>
                    <button class="chart short clickable" data-detail="cash">${lineChart([{ name: "现金占比", values: p.cashSeries, color: "#0f5cff" }], { min: 0, max: cashMax, percent: true, labels: p.allocation.dates })}</button>
                  </div>
                </div>
                <div class="bottom-metrics">
                  ${p.strategyMetrics.map(([label, value], index) => `<button class="bottom-metric clickable ${index === 1 ? "orange" : ""}" data-detail="${index === 0 ? "hhi" : index === 1 ? "cash-risk" : "confidence"}"><b>${label}</b><span>${value}</span></button>`).join("")}
                </div>
              `
              : `<button class="blank-panel clickable" data-detail="allocation"><span>当前产品未接入策略行为数据</span></button>`
          }
        </section>
      </div>
    </section>
  `;
}

function renderM3CapabilityPanel(cap) {
  if (cap.key === "strategy" || cap.key === "selection") {
    const blankText = cap.key === "strategy" ? "策略配置能力待接入管理人长期配置中枢、策略基准和投研归因数据后展示" : "选基能力待接入底层基金数据后展示";
    return `
      <section class="card capability-panel capability-blank">
        <h2 class="panel-title small">${cap.title}</h2>
        <button class="blank-panel clickable" data-detail="capability:${cap.key}">
          <span>${blankText}</span>
        </button>
      </section>
    `;
  }

  if (cap.key === "tactical") {
    const b5Rows = allocationTurnoverRows(products.find((item) => item.id === "B5"));
    const c3Rows = allocationTurnoverRows(products.find((item) => item.id === "C3"));
    const totalFrequency = tacticalDiagnostics.reduce((sum, item) => sum + numericValue(item.frequency), 0);
    const totalTurnover = tacticalDiagnostics.reduce((sum, item) => sum + numericValue(item.cumulative), 0);
    const maxSingle = Math.max(...tacticalDiagnostics.map((item) => numericValue(item.maxSingle)));
    const avgTurnover = totalTurnover / Math.max(totalFrequency, 1);
    const avgPost1 = tacticalDiagnostics.reduce((sum, item) => sum + numericValue(item.post1), 0) / tacticalDiagnostics.length;
    const avgPost4 = tacticalDiagnostics.reduce((sum, item) => sum + numericValue(item.post4), 0) / tacticalDiagnostics.length;
    const avgWinRate = tacticalDiagnostics.reduce((sum, item) => sum + numericValue(item.winRate), 0) / tacticalDiagnostics.length;
    const avgMatch = tacticalDiagnostics.reduce((sum, item) => sum + numericValue(item.match), 0) / tacticalDiagnostics.length;
    const chartMin = Math.min(-2, ...b5Rows.map((item) => item.postReturn), ...c3Rows.map((item) => item.postReturn));
    const chartMax = Math.max(4, ...b5Rows.map((item) => item.postReturn), ...c3Rows.map((item) => item.postReturn));
    return `
      <section class="card capability-panel capability-rich tactical-horizontal" data-detail="capability:${cap.key}">
        <div class="tactical-head">
          <div>
            <h2 class="panel-title small">${cap.title}</h2>
            <p>${cap.text}</p>
          </div>
          <div class="tactical-head-stats">
            <span>调仓 ${totalFrequency.toFixed(0)}次</span>
            <span>胜率 ${avgWinRate.toFixed(1)}%</span>
            <span>后4期均值 ${avgPost4.toFixed(2)}%</span>
          </div>
        </div>
        <div class="tactical-workbench">
          <div class="tactical-summary-strip">
            <div class="tactical-summary-item">
              <b>调仓行为分析</b>
              <span>两只产品合计调仓 ${totalFrequency.toFixed(0)} 次，累计调仓幅度 ${totalTurnover.toFixed(2)}%，单期最大 ${maxSingle.toFixed(2)}%，平均单次强度 ${avgTurnover.toFixed(2)}%。整体调仓行为较为积极，以增配低相关策略和压缩现金仓位为主要方向。</span>
            </div>
            <div class="tactical-summary-item">
              <b>收益验证</b>
              <span>调仓后 1 期平均收益 ${avgPost1.toFixed(2)}%，调仓后 4 期平均收益 ${avgPost4.toFixed(2)}%，环境匹配均值 ${avgMatch.toFixed(1)}%。B5 调仓胜率约 62.3%，调仓后收益更为稳定；C3 调仓胜率约 48.3%，权益暴露较高，择时稳定性仍需持续跟踪。</span>
            </div>
            <div class="tactical-summary-item">
              <b>综合总结</b>
              <span>管理人在震荡修复市场环境中调仓行为相对积极，B5 以低波动、低相关策略为主，体现出稳健的风险控制意图；C3 权益相关策略暴露更高，回撤修复周期长，后续重点观察高权益暴露下的调仓纪律与风险应对一致性。</span>
            </div>
          </div>
          <div class="visual-card visual-card-large tactical-return-chart">
            <h3>调仓后收益时间序列</h3>
            <div class="legend compact">
              <span class="legend-item"><i class="legend-line" style="background:#3f7cff"></i>B5</span>
              <span class="legend-item"><i class="legend-line" style="background:#e15c3b"></i>C3</span>
            </div>
            ${lineChart(
              [
                { name: "B5调仓后收益", values: b5Rows.map((item) => item.postReturn), color: "#3f7cff" },
                { name: "C3调仓后收益", values: c3Rows.map((item) => item.postReturn), color: "#e15c3b" },
              ],
              { min: chartMin, max: chartMax, percent: true, labels: b5Rows.map((item) => item.date) },
            )}
          </div>
        </div>
      </section>
    `;
  }

  return "";
}

function renderManagerAnalysis(capabilityKey) {
  const m = manager();
  const caps = capabilityKey ? m.capabilities.filter((item) => item.key === capabilityKey) : m.capabilities;
  return `
    ${renderHero("manager")}
    <section class="manager-grid ${capabilityKey ? "single-capability" : "capability-overview"}">
      ${caps
        .map(
          (cap) =>
            m.id === "M3"
              ? renderM3CapabilityPanel(cap)
              : `
            <button class="card capability-panel clickable" data-detail="capability:${cap.key}">
              <h2 class="panel-title small">${cap.title}</h2>
              <div class="capability-headline">
                <b>${cap.level}</b>
                <p>${cap.text}</p>
              </div>
              <div class="detail-list">
                ${cap.metrics.map(([label, value]) => `<div class="detail-pill"><b>${label}</b><span>${value}</span></div>`).join("")}
              </div>
            </button>
          `,
        )
        .join("")}
    </section>
  `;
}

function renderCompare() {
  const selected = products.filter((item) => state.compareProductIds.includes(item.id));
  return `
    <section class="compare-layout">
      <aside class="card list-card">
        <h2 class="panel-title small">选择产品</h2>
        <div class="select-list">
          ${products
            .map(
              (p) => `
                <button class="select-row ${state.compareProductIds.includes(p.id) ? "active" : ""}" data-toggle-product="${p.id}">
                  <span><b>${p.name}</b><small>${p.code} / ${p.manager}</small></span>
                  <span class="tag">${p.rating}</span>
                </button>
              `,
            )
            .join("")}
        </div>
      </aside>
      <section class="card panel">
        <h2 class="panel-title">产品对比</h2>
        <div class="toolbar">
          <button class="tag clickable" data-detail="compare-rule">评分规则</button>
          <button class="tag clickable" data-command="export">导出对比</button>
        </div>
        <div class="table-wrap">
          <table>
            <thead><tr><th>产品</th><th>管理人</th><th>年化收益</th><th>最大回撤</th><th>波动率</th><th>夏普</th><th>卡玛</th><th>操作</th></tr></thead>
            <tbody>
              ${selected
                .map(
                  (p) => `
                    <tr>
                      <td><button class="linkish" data-page="product-detail" data-product-id="${p.id}">${p.name}</button></td>
                      <td><button class="linkish" data-page="manager-analysis" data-manager-id="${p.managerId}">${p.manager}</button></td>
                      <td>${p.annualReturn.toFixed(1)}%</td>
                      <td>${p.maxDrawdown.toFixed(2)}%</td>
                      <td>${p.vol.toFixed(2)}%</td>
                      <td>${p.sharpe.toFixed(2)}</td>
                      <td>${p.calmar.toFixed(2)}</td>
                      <td><button class="linkish" data-detail="compare:${p.id}">查看拆解</button></td>
                    </tr>
                  `,
                )
                .join("")}
            </tbody>
          </table>
        </div>
      </section>
    </section>
  `;
}

function renderIndicatorLibrary() {
  return `
    <section class="library-layout">
      <aside class="card list-card">
        <h2 class="panel-title small">指标分类</h2>
        <div class="segmented">
          ${Object.keys(indicatorGroups).map((key) => `<button class="${state.activeLibrary === key ? "active" : ""}" data-library="${key}">${key}</button>`).join("")}
        </div>
      </aside>
      <section class="card panel">
        <h2 class="panel-title">${state.activeLibrary}指标</h2>
        <div class="table-wrap">
          <table>
            <thead><tr><th>指标名称</th><th>业务含义</th><th>入口</th></tr></thead>
            <tbody>
              ${indicatorGroups[state.activeLibrary]
                .map(
                  ([name, desc]) => `
                  <tr>
                    <td><button class="linkish" data-detail="indicator:${name}">${name}</button></td>
                    <td>${desc}</td>
                    <td><button class="linkish" data-detail="indicator:${name}">查看口径</button></td>
                  </tr>
                `,
                )
                .join("")}
            </tbody>
          </table>
        </div>
      </section>
    </section>
  `;
}

function labelClass(label) {
  if (label.includes("预警")) return "danger";
  if (label.includes("安抚")) return "warning";
  if (label.includes("增值")) return "success";
  return "info";
}

function renderSopMetricCards(items) {
  return `
    <div class="sop-metrics">
      ${items
        .map(
          ([label, value, hint]) => `
            <button class="sop-metric clickable" data-detail="sop-metric:${label}">
              <b>${label}</b>
              <strong>${value}</strong>
              <span>${hint}</span>
            </button>
          `,
        )
        .join("")}
    </div>
  `;
}

function renderFocusRows(filterModule) {
  const rows = filterModule ? focusEvents.filter((item) => item.module === filterModule) : focusEvents;
  return rows
    .map(
      (item) => `
        <tr>
          <td><button class="linkish" data-page="sop-workbench" data-product-id="${item.productId}">${item.target}</button></td>
          <td>${item.scene}</td>
          <td>${item.driver}</td>
          <td><span class="status-tag ${labelClass(item.label)}">${item.label}</span></td>
          <td><span class="level-chip">${item.level}</span></td>
          <td>${item.trigger}</td>
          <td>${item.nextAction}</td>
          <td><button class="linkish" data-detail="sop-event:${item.id}">${item.status}</button></td>
        </tr>
      `,
    )
    .join("");
}

function renderSopOverview() {
  return `
    <section class="sop-overview">
      <div class="sop-titlebar card">
        <div>
          <h2>售后SOP总览</h2>
          <p>先看内部预警和一线/客户触达的全局状态，点击强关注项后进入产品级工作台。</p>
        </div>
        <div class="sop-actions">
          <button class="tag clickable" data-detail="rules-library">规则库维护</button>
          <button class="tag clickable" data-detail="speech-template">话术模板</button>
        </div>
      </div>
      <div class="sop-dual">
        <section class="card sop-column">
          <div class="sop-column-head">
            <div>
              <h3>风险事件预警</h3>
              <p>内部使用，阈值更严格，售后触发前先联系管理人或等待投研判断。</p>
            </div>
            <button class="linkish" data-page="risk-alert">进入总览</button>
          </div>
          ${renderSopMetricCards(sopMetrics.risk)}
        </section>
        <section class="card sop-column">
          <div class="sop-column-head">
            <div>
              <h3>一线/客户触达</h3>
              <p>面向一线和客户触达，承接安抚、提示、增值服务和进一步营销。</p>
            </div>
            <button class="linkish" data-page="service">进入总览</button>
          </div>
          ${renderSopMetricCards(sopMetrics.service)}
        </section>
      </div>
      <section class="card panel">
        <div class="sop-section-head">
          <div>
            <h2 class="panel-title">强关注列表</h2>
            <p class="panel-subtitle">覆盖内部预警、一线/客户触达和可营销机会，优先处理高等级事项。</p>
          </div>
          <button class="tag clickable" data-detail="sop-flow">查看处理流程</button>
        </div>
        <div class="table-wrap">
          <table>
            <thead><tr><th>对象</th><th>场景</th><th>驱动</th><th>标签</th><th>等级</th><th>触发原因</th><th>建议动作</th><th>状态</th></tr></thead>
            <tbody>${renderFocusRows()}</tbody>
          </table>
        </div>
      </section>
    </section>
  `;
}

function renderRiskEventCards(filterModule) {
  const events = filterModule ? focusEvents.filter((item) => item.module === filterModule) : focusEvents;
  const high = events.filter((e) => e.level === "高");
  const mid = events.filter((e) => e.level === "中");
  const low = events.filter((e) => e.level === "低");

  function cardGroup(items, levelLabel, colorClass) {
    if (!items.length) return "";
    return `
      <div class="risk-group">
        <div class="risk-group-header">
          <span class="risk-level-badge ${colorClass}">${levelLabel}</span>
          <span class="risk-group-count">${items.length} 项</span>
        </div>
        <div class="risk-card-list">
          ${items
            .map(
              (item) => `
                <div class="risk-event-card">
                  <div class="risk-event-row">
                    <button class="linkish risk-event-target" data-page="sop-workbench" data-product-id="${item.productId}">${item.target}</button>
                    <span class="status-tag ${labelClass(item.label)}">${item.label}</span>
                    <span class="risk-event-status">${item.status}</span>
                  </div>
                  <div class="risk-event-scene">${item.scene}</div>
                  <div class="risk-event-action">${item.nextAction}</div>
                </div>
              `,
            )
            .join("")}
        </div>
      </div>
    `;
  }

  return `
    <div class="risk-event-groups">
      ${cardGroup(high, "高等级", "risk-high")}
      ${cardGroup(mid, "中等级", "risk-mid")}
      ${cardGroup(low, "低等级", "risk-low")}
    </div>
  `;
}

function renderRiskAlertOverview() {
  const events = focusEvents.filter((item) => item.module === "风险事件预警");
  const high = events.filter((e) => e.level === "高");
  const mid = events.filter((e) => e.level === "中");
  return `
    <section class="sop-overview">
      <div class="sop-titlebar card">
        <div>
          <h2>风险事件预警总览</h2>
          <p>内部预警先于客户触达，用更严格的阈值发现问题，推动管理人沟通和应对口径确认。</p>
        </div>
        <div class="sop-actions">
          <button class="tag clickable" data-detail="rules-library">规则库维护</button>
          <button class="tag clickable" data-page="after-sales">返回总览</button>
        </div>
      </div>
      <div class="risk-summary-row">
        <div class="card risk-summary-card">
          <strong class="risk-count-high">${high.length}</strong>
          <b>高等级预警</b>
          <span>需优先内部处理</span>
        </div>
        <div class="card risk-summary-card">
          <strong class="risk-count-mid">${mid.length}</strong>
          <b>中等级预警</b>
          <span>持续跟踪观察</span>
        </div>
        <div class="card risk-summary-card">
          <strong class="risk-count-total">${events.length}</strong>
          <b>预警总数</b>
          <span>本周期内</span>
        </div>
      </div>
      <section class="card panel">
        <h2 class="panel-title">内部强关注</h2>
        <p class="panel-subtitle">以下事件尚未进入完整一线/客户触达，需内部提前处理并确认应对口径。</p>
        ${renderRiskEventCards("风险事件预警")}
      </section>
    </section>
  `;
}

function renderServiceOverview() {
  return `
    <section class="sop-overview">
      <div class="sop-titlebar card">
        <div>
          <h2>一线/客户触达总览</h2>
          <p>承接已经可以触达一线或客户的事项，区分安抚、提示、增值和可营销机会。</p>
        </div>
        <div class="sop-actions">
          <button class="tag clickable" data-detail="speech-template">话术模板</button>
          <button class="tag clickable" data-page="after-sales">返回总览</button>
        </div>
      </div>
      <section class="card panel">
        ${renderSopMetricCards(sopMetrics.service)}
      </section>
      <section class="card panel">
        <div class="sop-section-head">
          <div>
            <h2 class="panel-title">待触达与可营销机会</h2>
            <p class="panel-subtitle">点击对象进入产品售后工作台，生成或确认一线动作。</p>
          </div>
        </div>
        <div class="table-wrap">
          <table>
            <thead><tr><th>对象</th><th>场景</th><th>驱动</th><th>标签</th><th>等级</th><th>触发原因</th><th>建议动作</th><th>状态</th></tr></thead>
            <tbody>${renderFocusRows("一线/客户触达")}</tbody>
          </table>
        </div>
      </section>
    </section>
  `;
}

function renderSopWorkbench() {
  const p = product();
  const related = focusEvents.filter((item) => item.productId === p.id);
  return `
    <section class="sop-overview">
      <div class="product-switcher card">
        <div>
          <b>产品售后工作台</b>
          <span>${p.name} / ${p.type}</span>
        </div>
        <div class="product-tabs">
          ${products.map((item) => `<button class="${item.id === p.id ? "active" : ""}" data-page="sop-workbench" data-product-id="${item.id}">${item.name}</button>`).join("")}
        </div>
      </div>
      <section class="card hero-grid">
        <div class="info-panel">
          <div class="info-row"><span class="label">产品名称：</span><span><button class="linkish" data-page="product-detail" data-product-id="${p.id}">${p.name}</button></span></div>
          <div class="info-row"><span class="label">产品类型：</span><span>${p.type}</span></div>
          <div class="info-row"><span class="label">最新净值：</span><span>${p.nav}</span></div>
          <div class="info-row"><span class="label">最大回撤：</span><span>${p.maxDrawdown.toFixed(2)}%</span></div>
        </div>
        <button class="card summary-box clickable" data-detail="sop-product-risk">
          <h2 class="summary-title"><span class="status-dot warn">!</span>内部预警动作</h2>
          <p>确认触发依据，必要时联系管理人，形成统一应对口径后再转入一线/客户触达。</p>
        </button>
        <button class="card summary-box clickable" data-detail="sop-product-service">
          <h2 class="summary-title"><span class="status-dot good">✓</span>一线/客户触达动作</h2>
          <p>根据标签生成一线话术、客户安抚内容或增值服务内容，并跟踪触达反馈。</p>
        </button>
      </section>
      <section class="card panel">
        <div class="sop-section-head">
          <div>
            <h2 class="panel-title">当前产品事件</h2>
            <p class="panel-subtitle">这里才进入围绕单个产品的处理工作台。</p>
          </div>
          <button class="tag clickable" data-detail="speech-template">生成服务话术</button>
        </div>
        <div class="table-wrap">
          <table>
            <thead><tr><th>模块</th><th>场景</th><th>标签</th><th>等级</th><th>触发原因</th><th>建议动作</th><th>状态</th></tr></thead>
            <tbody>
              ${related
                .map(
                  (item) => `
                    <tr>
                      <td>${item.module}</td>
                      <td>${item.scene}</td>
                      <td><span class="status-tag ${labelClass(item.label)}">${item.label}</span></td>
                      <td><span class="level-chip">${item.level}</span></td>
                      <td>${item.trigger}</td>
                      <td>${item.nextAction}</td>
                      <td><button class="linkish" data-detail="sop-event:${item.id}">${item.status}</button></td>
                    </tr>
                  `,
                )
                .join("")}
            </tbody>
          </table>
        </div>
      </section>
    </section>
  `;
}

function renderPlaceholder(kind) {
  const title = pageTitle();
  const actions = {
    "risk-alert": ["查看红黄灯名单", "生成客户沟通要点", "追踪回撤修复"],
    service: ["查看触达记录", "新增跟进事项", "同步客户名单"],
    "after-sales": ["风险事件预警", "一线/客户触达", "客户触达计划"],
    settings: ["用户权限", "数据源配置", "指标阈值"],
  }[kind] || ["查看详情"];
  return `
    <section class="card panel">
      <h2 class="panel-title">${title}</h2>
      <p class="panel-subtitle">该模块已预留入口，后续可以接入真实工作流。</p>
      <div class="manager-grid">
        ${actions.map((item) => `<button class="card summary-box clickable" data-detail="placeholder:${item}"><h2 class="summary-title">${item}</h2><p>点击后可查看该功能的数据口径、待办动作和扩展字段。</p></button>`).join("")}
      </div>
    </section>
  `;
}

function renderContent() {
  if (state.page === "product-pool") return renderProductPool();
  if (state.page === "product-detail") return renderProductDetail();
  if (state.page === "product-compare") return renderCompare();
  if (state.page === "manager-analysis") return renderManagerAnalysis();
  if (state.page === "manager-strategy") return renderManagerAnalysis("strategy");
  if (state.page === "manager-tactical") return renderManagerAnalysis("tactical");
  if (state.page === "manager-selection") return renderManagerAnalysis("selection");
  if (state.page === "after-sales") return renderSopOverview();
  if (state.page === "risk-alert") return renderRiskAlertOverview();
  if (state.page === "service") return renderServiceOverview();
  if (state.page === "sop-workbench") return renderSopWorkbench();
  if (state.page === "indicator-library") return renderIndicatorLibrary();
  return renderPlaceholder(state.page);
}

function render() {
  document.querySelector("#app").innerHTML = `
    ${renderSidebar()}
    <main class="main">
      ${renderTopbar()}
      <div class="content">${renderContent()}</div>
    </main>
    <div class="drawer-mask"></div>
    <div class="toast"></div>
  `;
  bindEvents();
}

function detailBlocks(detail) {
  const p = product();
  const m = manager();
  const capKey = detail.split(":")[1];
  const cap = m.capabilities.find((item) => item.key === capKey);
  const specificProduct = products.find((item) => item.id === capKey);
  const map = {
    product: ["产品档案", `${p.name} / ${p.code}`, [{ title: "核心信息", body: [`管理人：${p.manager}`, `类型：${p.type}`, `评分：${p.score} / ${p.rating}`, `最新净值：${p.nav}`] }]],
    manager: ["管理人档案", m.name, [{ title: "覆盖范围", body: [`跟踪产品：${m.productCount}只`, `跟踪子基金：${m.fundCount}只`, `管理人类型：${m.type}`] }]],
    type: ["产品类型说明", p.type, [{ title: "扩展字段", body: "类型字段后续可接入同类池、策略标签、适配客户风险等级和推荐规则。" }]],
    funds: ["子基金明细", m.name, [{ title: "预留明细", body: "这里可扩展为底层基金列表、贡献拆解、持仓变动和基金经理评价。" }]],
    conclusion: ["系统结论", p.name, [{ title: "结论依据", body: ["业绩相对基准和同类中位数占优。", "最大回撤和修复时间处于可接受区间。", "策略配置未出现明显单一暴露。"] }]],
    risk: ["主要风险", p.name, [{ title: "风险拆解", body: ["权益类策略占比提升，组合进攻性增强。", "现金缓冲下降，赎回和波动场景下的安全垫变薄。", "需要继续观察回撤修复速度。"] }]],
    "manager-conclusion": ["系统结论", m.name, [{ title: "结论依据", body: ["三大能力评分均处于稳健区间。", "跟踪产品数量和底层子基金覆盖较充分。", "风格一致性和能力稳定性可继续纳入月度跟踪。"] }]],
    "manager-risk": ["主要风险", m.name, [{ title: "风险拆解", body: ["市场急跌阶段战术配置压力上升。", "需关注权益暴露变化与底层基金集中度。", "后续可扩展风险漂移、集中度和客户触达任务。"] }]],
    performance: ["业绩表现", p.name, [{ title: "图表说明", body: `产品净值来自 ${p.sourceFile}；基准和同类中位数为当前原型中的模拟序列，可在接入同类池后替换。` }]],
    quality: ["收益质量", p.name, [{ title: "留白说明", body: "该模块按本次要求暂不填充，后续可接入胜率、收益分布、上下行捕获、Alpha 稳定性等指标。" }]],
    drawdown: ["回撤曲线", p.name, [{ title: "观察重点", body: ["回撤深度：最大损失幅度。", "修复时间：客户体验中的关键指标。", "回撤频率：判断风险是否常态化。"] }]],
    "peer-dd": ["同类回撤对比", p.name, [{ title: "比较结果", body: `${p.name}最大回撤为${p.maxDrawdown.toFixed(2)}%，模拟同类中位数为${p.peerMaxDrawdown.toFixed(2)}%。` }]],
    allocation: ["策略配置", p.name, [{ title: p.allocation ? "配置结构" : "留白说明", body: p.allocation ? "点击面积层可查看对应策略最新占比。后续可扩展为策略漂移、贡献和调仓归因。" : "当前产品文件未提供策略配置字段，因此策略行为区域保留为空。" }]],
    cash: ["现金占比", p.name, [{ title: "现金缓冲", body: p.allocation ? "现金占比来自策略配置字段，可用于观察组合进攻性和流动性缓冲。" : "当前产品未提供现金占比字段。" }]],
    hhi: [p.strategyMetrics?.[0]?.[0] || "策略指标", p.name, [{ title: "指标说明", body: p.strategyMetrics ? `当前展示值：${p.strategyMetrics[0][1]}。用于观察单期调仓或策略集中变化的强度。` : "当前产品未提供策略配置，暂不计算。" }]],
    "cash-risk": [p.strategyMetrics?.[1]?.[0] || "策略指标", p.name, [{ title: "指标说明", body: p.strategyMetrics ? `当前展示值：${p.strategyMetrics[1][1]}。用于衡量策略迁移和组合再平衡的累计强度。` : "当前产品未提供策略配置数据。" }]],
    confidence: [p.strategyMetrics?.[2]?.[0] || "策略指标", p.name, [{ title: "业务含义", body: p.strategyMetrics ? `当前展示值：${p.strategyMetrics[2][1]}。可作为择时能力稳定性的初步观察口径。` : "衡量策略权重稳定性和有效性，适合用于管理人配置能力跟踪。" }]],
    "market-tags": ["市场状态标签库", "战术配置能力", [{ title: "标签用途", body: ["将市场环境拆成权益修复、震荡修复、权益承压、低波动优先等状态。", "判断管理人调仓方向是否与环境一致。", "后续可接投研系统自动生成市场状态。"] }]],
    "compare-rule": ["产品对比规则", "评分口径", [{ title: "对比维度", body: ["收益：年化收益、超额收益、胜率。", "风险：最大回撤、波动率、修复时间。", "行为：策略集中度、现金缓冲度、调仓有效性。"] }]],
    "rules-library": ["规则库维护", "售后SOP", [{ title: "维护内容", body: ["投研驱动触发标准：资产、策略、市场事件。", "产品驱动触发标准：回撤、持有期、开放赎回、月度运作、业绩向好。", "风险事件预警阈值应严于一线/客户触达阈值，先内部提醒，再决定是否触达客户。"] }]],
    "speech-template": ["话术模板", "一线与客户触达", [{ title: "模板方向", body: ["预警：说明风险、触发原因、建议动作。", "安抚：解释波动、稳定客户情绪、提示长期视角。", "增值：提供运作信息、增强信任、承接追加推荐。"] }]],
    "sop-flow": ["处理流程", "从内部预警到一线/客户触达", [{ title: "建议流程", body: ["数据触发规则。", "内部预警先处理：确认触发依据、联系管理人或等待投研判断。", "确认应对口径后转入一线/客户触达。", "一线确认话术并触达客户。", "记录客户反馈和后续动作。"] }]],
    "sop-product-risk": ["内部预警动作", p.name, [{ title: "处理重点", body: ["确认是否达到内部预警阈值。", "联系管理人解释回撤或异常原因。", "记录干预动作和管理人反馈。", "决定是否转入一线/客户触达。"] }]],
    "sop-product-service": ["一线/客户触达动作", p.name, [{ title: "触达重点", body: ["按预警/安抚/增值标签生成话术。", "一线确认后再触达客户。", "对业绩向好场景提供追加推荐线索。", "沉淀客户反馈。"] }]],
  };

  if (detail.startsWith("pool-metric:")) {
    const metric = detail.split(":")[1];
    return [
      metric,
      "产品池横截面指标",
      [
        { title: "计算口径", body: "当前按已接入产品全样本计算平均值和中位数；后续可切换为同类型、同管理人或同风险档位分组。" },
        { title: "使用方式", body: "平均值用于观察产品池整体水平，中位数用于识别是否被少数极端产品拉动。" },
      ],
    ];
  }
  if (detail.startsWith("sop-event:")) {
    const event = focusEvents.find((item) => item.id === detail.split(":")[1]);
    if (event) {
      return [
        event.scene,
        `${event.module} / ${event.target}`,
        [
          { title: "触发依据", body: event.trigger },
          { title: "建议动作", body: event.nextAction },
          { title: "影响范围", body: `${event.customers}；当前状态：${event.status}` },
        ],
      ];
    }
  }
  if (detail.startsWith("sop-metric:")) {
    const metric = detail.split(":")[1];
    return [metric, "售后SOP总览指标", [{ title: "说明", body: "该指标用于总览当前待处理压力，点击列表中的对象后进入产品级工作台处理。" }]];
  }
  if (detail.startsWith("market-tag:")) {
    const name = detail.split(":")[1];
    const tag = marketStateTags.find((item) => item[0] === name);
    if (tag) return [tag[0], "市场状态标签库", [{ title: "判断口径", body: tag[1] }]];
  }
  if (detail.startsWith("capability:") && cap) {
    if (m.id === "M3" && cap.key === "strategy") {
      return [
        cap.title,
        m.name,
        [
          { title: "留白说明", body: "策略配置能力不再做管理人旗下产品对比，待接入管理人长期配置中枢、策略基准和投研归因数据后展示管理人概况。" },
        ],
      ];
    }
    if (m.id === "M3" && cap.key === "tactical") {
      return [
        cap.title,
        m.name,
        [
          { title: "调仓行为统计", body: ["调仓次数：122次。", "单期最大调仓：53.94%。", "累计调仓幅度：1213.55%。", "平均单次调仓强度约9.95%。"] },
          { title: "收益与稳定性统计", body: ["调仓后1期平均收益：0.03%。", "调仓后4期平均收益：0.28%。", "调仓胜率均值：55.3%。", "环境匹配均值：68.0%。"] },
        ],
      ];
    }
    if (m.id === "M3" && cap.key === "selection") {
      return [cap.title, m.name, [{ title: "留白说明", body: "选基能力部分暂不展示，待接入底层基金持仓、贡献和留存数据后再补充。" }]];
    }
    return [
      cap.title,
      m.name,
      [
        { title: "能力判断", body: cap.text },
        { title: "关键指标", body: cap.metrics.map(([label, value]) => `${label}：${value}`) },
      ],
    ];
  }
  if (detail.startsWith("compare:") && specificProduct) {
    return [
      `${specificProduct.name}拆解`,
      specificProduct.code,
      [
        { title: "评分概览", body: [`综合评分：${specificProduct.score}`, `评级：${specificProduct.rating}`, `年化收益：${specificProduct.annualReturn.toFixed(1)}%`] },
        { title: "风险概览", body: [`最大回撤：${specificProduct.maxDrawdown.toFixed(2)}%`, `年化波动率：${specificProduct.vol.toFixed(2)}%`, `卡玛比率：${specificProduct.calmar.toFixed(2)}`] },
      ],
    ];
  }
  if (detail.startsWith("indicator:")) {
    const name = detail.split(":")[1];
    return [name, "指标库口径", [{ title: "说明", body: "这里预留指标公式、计算频率、阈值规则和数据字段映射。后续可以直接挂接指标计算服务。" }]];
  }
  if (detail.startsWith("placeholder:")) {
    const name = detail.split(":")[1];
    return [name, "功能预留", [{ title: "扩展方式", body: "该入口已接入交互框架，后续只需要补充数据源、列表字段和详情视图。" }]];
  }
  if (detail === "max-dd" || detail === "current-dd" || detail === "recovery" || detail === "vol" || detail === "calmar") {
    const labels = {
      "max-dd": "最大回撤",
      "current-dd": "当前回撤",
      recovery: "回撤修复时间",
      vol: "年化波动率",
      calmar: "卡玛比率",
    };
    return [labels[detail], p.name, [{ title: "指标解释", body: "点击指标卡后可展示口径说明、历史趋势、同类分位和触发阈值。" }]];
  }
  return map[detail] || ["详情", "可点击信息", [{ title: "说明", body: "该信息点已预留详情入口。" }]];
}

function bindEvents() {
  document.querySelectorAll("[data-page]").forEach((el) => {
    el.addEventListener("click", () => {
      setPage(el.dataset.page, {
        productId: el.dataset.productId,
        managerId: el.dataset.managerId,
      });
    });
  });

  document.querySelectorAll("[data-detail]").forEach((el) => {
    el.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();
      const [title, subtitle, blocks] = detailBlocks(el.dataset.detail);
      openDrawer(title, subtitle, blocks);
    });
  });

  document.querySelectorAll("[data-toggle-product]").forEach((el) => {
    el.addEventListener("click", () => {
      const id = el.dataset.toggleProduct;
      if (state.compareProductIds.includes(id)) {
        state.compareProductIds = state.compareProductIds.filter((item) => item !== id);
      } else {
        state.compareProductIds = [...state.compareProductIds, id];
      }
      if (!state.compareProductIds.length) state.compareProductIds = [id];
      render();
    });
  });

  document.querySelectorAll("[data-pool-filter]").forEach((el) => {
    const applyFilter = () => {
      const key = el.dataset.poolFilter;
      const value = el.value || el.dataset.value || "全部";
      if (key === "type") state.poolTypeFilter = value;
      if (key === "manager") state.poolManagerFilter = value;
      render();
    };
    if (el.tagName === "SELECT") {
      el.addEventListener("change", applyFilter);
    } else {
      el.addEventListener("click", applyFilter);
    }
  });

  document.querySelectorAll("[data-pool-select]").forEach((el) => {
    el.addEventListener("click", () => {
      const id = el.dataset.poolSelect;
      if (state.poolSelectedIds.includes(id)) {
        state.poolSelectedIds = state.poolSelectedIds.filter((item) => item !== id);
      } else {
        state.poolSelectedIds = [...state.poolSelectedIds, id];
      }
      render();
    });
  });

  document.querySelectorAll("[data-pool-import]").forEach((el) => {
    el.addEventListener("click", () => {
      if (!state.poolSelectedIds.length) {
        toast("请先选择需要对比的产品");
        return;
      }
      state.compareProductIds = state.poolSelectedIds.slice();
      setPage("product-compare");
      toast(`已导入 ${state.compareProductIds.length} 只产品到产品对比`);
    });
  });

  document.querySelectorAll("[data-library]").forEach((el) => {
    el.addEventListener("click", () => {
      state.activeLibrary = el.dataset.library;
      render();
    });
  });

  document.querySelectorAll("[data-action]").forEach((el) => {
    el.addEventListener("click", () => {
      const [type, id] = el.dataset.action.split(":");
      if (type === "product") setPage("product-detail", { productId: id });
      if (type === "manager") setPage("manager-analysis", { managerId: id });
    });
  });

  document.querySelectorAll("[data-command]").forEach((el) => {
    el.addEventListener("click", () => {
      const command = el.dataset.command;
      const messages = {
        refresh: "已模拟刷新：数据时间保持 2026-05-21 09:30",
        notifications: "暂无新的风险预警",
        user: "用户中心入口已预留",
        export: "已模拟导出：后续可接入 Excel/PDF 服务",
      };
      toast(messages[command] || "操作已触发");
    });
  });

  document.querySelectorAll(".point").forEach((point) => {
    point.addEventListener("click", (event) => {
      event.stopPropagation();
      openDrawer(`${point.dataset.title}数据点`, point.dataset.date, [{ title: "数值", body: Number(point.dataset.value).toFixed(2) }]);
    });
  });

  document.querySelectorAll(".bar").forEach((bar) => {
    bar.addEventListener("click", (event) => {
      event.stopPropagation();
      openDrawer(bar.dataset.title, "图表明细", [{ title: "当前值", body: `${Number(bar.dataset.value).toFixed(2)}%` }]);
    });
  });

  const search = document.querySelector("#global-search");
  search.addEventListener("focus", () => {
    if (state.searchOpen) return;
    state.searchOpen = true;
    render();
    document.querySelector("#global-search")?.focus();
  });
  search.addEventListener("input", (event) => {
    const keyword = event.target.value.trim();
    if (!keyword) return;
    const foundProduct = products.find((p) => [p.name, p.code, p.manager].some((v) => v.toLowerCase().includes(keyword.toLowerCase())));
    const foundManager = managers.find((m) => m.name.includes(keyword));
    if (foundProduct || foundManager) {
      toast(`已找到 ${foundProduct?.name || foundManager?.name}`);
    }
  });
}

render();
