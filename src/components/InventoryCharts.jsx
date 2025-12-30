import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

export default function InventoryCharts({ products }) {
  const isMobile = typeof window !== "undefined" && window.innerWidth < 640;

  /* ---------------- DATA ---------------- */

  const stockStatusData = [
    {
      name: "In Stock",
      value: products.filter((p) => p.quantity >= 10).length,
    },
    {
      name: "Low Stock",
      value: products.filter((p) => p.quantity > 0 && p.quantity < 10).length,
    },
    {
      name: "Out of Stock",
      value: products.filter((p) => p.quantity === 0).length,
    },
  ];

  const categoryQuantityData = Object.entries(
    products.reduce((acc, p) => {
      acc[p.category] = (acc[p.category] || 0) + p.quantity;
      return acc;
    }, {})
  ).map(([name, value]) => ({ name, value }));

  const valueByCategoryData = Object.entries(
    products.reduce((acc, p) => {
      acc[p.category] = (acc[p.category] || 0) + p.quantity * p.unitPrice;
      return acc;
    }, {})
  ).map(([category, value]) => ({ category, value: Math.round(value) }));

  const PIE_COLORS = [
    "var(--primary)",
    "var(--chart-1)",
    "var(--chart-2)",
    "var(--chart-3)",
    "var(--chart-4)",
  ];

  /* ---------------- UI ---------------- */

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-10 w-full overflow-x-hidden">
      {/* ================= Stock Status ================= */}
      <Card>
        <CardHeader>
          <CardTitle>Stock Status Overview</CardTitle>
          <CardDescription>Products by availability</CardDescription>
        </CardHeader>

        <CardContent className="overflow-hidden">
          <ChartContainer config={{}} className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={stockStatusData}
                margin={{
                  top: 20,
                  right: 20,
                  left: 0,
                  bottom: isMobile ? 60 : 30,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="name"
                  angle={isMobile ? -45 : 0}
                  textAnchor={isMobile ? "end" : "middle"}
                  height={isMobile ? 60 : 30}
                  tick={{ fontSize: isMobile ? 10 : 12 }}
                  interval={0}
                />
                <YAxis tick={{ fontSize: isMobile ? 10 : 12 }} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="value" fill="var(--primary)" radius={4} />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* ================= Quantity by Category ================= */}
      <Card>
        <CardHeader>
          <CardTitle>Quantity by Category</CardTitle>
          <CardDescription>Total units per category</CardDescription>
        </CardHeader>

        <CardContent className="overflow-hidden">
          <ChartContainer config={{}} className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryQuantityData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={isMobile ? 65 : 80}
                  label={!isMobile}
                  labelLine={false}
                >
                  {categoryQuantityData.map((_, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={PIE_COLORS[index % PIE_COLORS.length]}
                    />
                  ))}
                </Pie>
                <ChartTooltip content={<ChartTooltipContent />} />
              </PieChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* ================= Total Value by Category ================= */}
      <Card>
        <CardHeader>
          <CardTitle>Total Value by Category</CardTitle>
          <CardDescription>Monetary value ($)</CardDescription>
        </CardHeader>

        <CardContent className="overflow-hidden">
          <ChartContainer config={{}} className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={valueByCategoryData}
                margin={{
                  top: 20,
                  right: 20,
                  left: 0,
                  bottom: isMobile ? 80 : 30,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="category"
                  angle={isMobile ? -60 : 0}
                  textAnchor={isMobile ? "end" : "middle"}
                  height={isMobile ? 80 : 30}
                  tick={{ fontSize: isMobile ? 10 : 12 }}
                  interval={0}
                />
                <YAxis tick={{ fontSize: isMobile ? 10 : 12 }} />
                <ChartTooltip
                  content={<ChartTooltipContent />}
                  formatter={(value) => `$${value.toLocaleString()}`}
                />
                <Bar dataKey="value" fill="var(--primary)" radius={4} />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
}
