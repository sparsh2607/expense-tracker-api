import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

function CategoryChart({ categoryData }) {
  const chartData = Object.entries(categoryData || {}).map(([name, amount]) => ({
    name,
    amount: Number(amount),
  }));

  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 shadow-2xl backdrop-blur">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-white">Category Spending</h2>
        <p className="text-sm text-slate-400">
          Expense breakdown by category.
        </p>
      </div>

      <div className="h-80">
        {chartData.length === 0 ? (
          <div className="flex h-full items-center justify-center text-slate-400">
            No expense data available.
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              margin={{
                top: 20,
                right: 20,
                left: 10,
                bottom: 20,
              }}
            >
              <defs>
                <linearGradient id="expenseGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#34d399" stopOpacity={1} />
                  <stop offset="100%" stopColor="#059669" stopOpacity={1} />
                </linearGradient>
              </defs>

              <CartesianGrid
                strokeDasharray="3 3"
                stroke="rgba(255,255,255,0.08)"
                vertical={false}
              />

              <XAxis
                dataKey="name"
                stroke="#94a3b8"
                tick={{ fill: "#94a3b8", fontSize: 13 }}
                axisLine={{ stroke: "#334155" }}
                tickLine={false}
              />

              <YAxis
                stroke="#94a3b8"
                tick={{ fill: "#94a3b8", fontSize: 13 }}
                axisLine={{ stroke: "#334155" }}
                tickLine={false}
              />

              <Tooltip
                cursor={{ fill: "rgba(255,255,255,0.04)" }}
                contentStyle={{
                  backgroundColor: "#020617",
                  border: "1px solid rgba(255,255,255,0.12)",
                  borderRadius: "14px",
                  color: "#ffffff",
                  boxShadow: "0 20px 40px rgba(0,0,0,0.35)",
                }}
                labelStyle={{
                  color: "#e2e8f0",
                  fontWeight: "600",
                }}
                formatter={(value) => [`₹${Number(value).toLocaleString("en-IN")}`, "Spent"]}
              />

              <Bar
                dataKey="amount"
                fill="url(#expenseGradient)"
                radius={[12, 12, 0, 0]}
                barSize={70}
              />
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
}

export default CategoryChart;