const assert = require("assert");
const fs = require("fs");
const path = require("path");
const vm = require("vm");

const root = path.resolve(__dirname, "..");
const context = { console };
vm.createContext(context);

["src/data.js", "src/utils.js", "src/metrics.js"].forEach((file) => {
  vm.runInContext(fs.readFileSync(path.join(root, file), "utf8"), context, { filename: file });
});

function run(expression) {
  return vm.runInContext(expression, context);
}

assert.strictEqual(run("validateCatalogs().length"), 0, "seed data should pass schema checks");

assert.strictEqual(run("maxDrawdownPct([1, 1.2, 0.9, 1.4]).toFixed(2)"), "25.00");
assert.strictEqual(run("percentageReturn(1, 1.25).toFixed(2)"), "25.00");
assert.ok(run("annualizedVolatilityPct([1, 1.01, 0.99, 1.03])") > 0);

const b5Metrics = run("deriveProductMetrics(products.find((item) => item.id === 'B5'))");
assert.ok(b5Metrics.annualReturn > 0, "B5 should have positive annualized return");
assert.ok(b5Metrics.maxDrawdown > 0, "B5 should have measurable drawdown");
assert.ok(Number.isFinite(b5Metrics.sharpe), "derived Sharpe should be numeric");

assert.strictEqual(run("escapeHtml('<script>alert(1)</script>')"), "&lt;script&gt;alert(1)&lt;/script&gt;");

console.log("metrics and validation tests passed");
