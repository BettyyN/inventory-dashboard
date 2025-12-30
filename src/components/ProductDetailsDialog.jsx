import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";

const getStockStatus = (quantity) => {
  if (quantity === 0) return { text: "Out of Stock", variant: "destructive" };
  if (quantity < 10) return { text: "Low Stock", variant: "secondary" };
  return { text: "In Stock", variant: "default" };
};

export default function ProductDetailsDialog({ product, open, onOpenChange }) {
  if (!product) return null;

  const status = getStockStatus(product.quantity);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Product Details</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div>
            <Label>Code</Label>
            <p className="font-medium">{product.code}</p>
          </div>
          <div>
            <Label>Name</Label>
            <p className="font-medium">{product.name}</p>
          </div>
          <div>
            <Label>Category</Label>
            <p className="font-medium">{product.category}</p>
          </div>
          <div>
            <Label>Quantity</Label>
            <p className="font-medium">{product.quantity}</p>
          </div>
          <div>
            <Label>Unit Price</Label>
            <p className="font-medium">${product.unitPrice}</p>
          </div>
          <div>
            <Label>Status</Label>
            <Badge variant={status.variant}>{status.text}</Badge>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
