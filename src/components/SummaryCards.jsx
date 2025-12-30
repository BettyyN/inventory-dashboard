import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function SummaryCards({ products }) {
  const total = products.length;
  const inStock = products.filter((p) => p.quantity >= 10).length;
  const lowStock = products.filter(
    (p) => p.quantity > 0 && p.quantity < 10
  ).length;
  const outOfStock = products.filter((p) => p.quantity === 0).length;
  const totalValue = products.reduce(
    (sum, p) => sum + p.quantity * p.unitPrice,
    0
  );

  return (
    <div className="mb-8 grid gap-4 md:grid-cols-2 lg:grid-cols-5">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Total Products</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{total}</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">In Stock</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-green-600">{inStock}</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Low Stock</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-yellow-600">{lowStock}</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Out of Stock</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-red-600">{outOfStock}</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Total Value</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            ${totalValue.toLocaleString()}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
