import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

const categories = [
  "Electronics",
  "Furniture",
  "Supplies",
  "Office Equipment",
  "Other",
];

export default function ProductForm({ product, onSave, onClose }) {
  const [form, setForm] = useState({
    code: product?.code || "",
    name: product?.name || "",
    category: product?.category || categories[0],
    quantity: product?.quantity || 0,
    unitPrice: product?.unitPrice || 0,
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!form.code.trim()) newErrors.code = "Required";
    if (!form.name.trim()) newErrors.name = "Required";
    if (form.quantity < 0) newErrors.quantity = "Must be ≥ 0";
    if (form.unitPrice <= 0) newErrors.unitPrice = "Must be > 0";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;
    onSave(form);
    onClose();
  };

  return (
    <div className="grid gap-4 py-4">
      <div>
        <Label>Product Code {product && "(cannot edit)"}</Label>
        <Input
          disabled={!!product}
          value={form.code}
          onChange={(e) => setForm({ ...form, code: e.target.value })}
        />
        {errors.code && (
          <p className="text-sm text-destructive mt-1">{errors.code}</p>
        )}
      </div>
      <div>
        <Label>Product Name</Label>
        <Input
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        {errors.name && (
          <p className="text-sm text-destructive mt-1">{errors.name}</p>
        )}
      </div>
      <div>
        <Label>Category</Label>
        <Select
          value={form.category}
          onValueChange={(v) => setForm({ ...form, category: v })}
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {categories.map((cat) => (
              <SelectItem key={cat} value={cat}>
                {cat}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      {/* Quantity */}
      {/* Quantity */}
      <div>
        <Label>Quantity</Label>
        <Input
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          placeholder="0"
          value={form.quantity === 0 ? "" : form.quantity.toString()}
          onChange={(e) => {
            let value = e.target.value;

            value = value.replace(/[^0-9]/g, "");

            if (value === "" || value === "0") {
              setForm({ ...form, quantity: 0 });
            } else {
              const cleaned = value.replace(/^0+/, "");
              const finalValue = cleaned === "" ? 0 : Number(cleaned);
              setForm({ ...form, quantity: finalValue });
            }
          }}
          className="text-left"
        />
        {errors.quantity && (
          <p className="text-sm text-destructive mt-1">{errors.quantity}</p>
        )}
      </div>

      {/* Unit Price */}
      <div>
        <Label>Unit Price ($)</Label>
        <Input
          type="text"
          inputMode="decimal"
          placeholder="0.00"
          value={form.unitPrice === 0 ? "" : form.unitPrice.toString()}
          onChange={(e) => {
            let value = e.target.value;

          
            if (!/^\d*\.?\d*$/.test(value)) return;

            if (value === "" || value === "0" || value === "0.") {
              setForm({ ...form, unitPrice: 0 });
            } else {
              let cleaned = value;
              if (value.includes(".")) {
                const [whole, decimal] = value.split(".");
                const cleanedWhole = whole.replace(/^0+/, "") || "0";
                cleaned =
                  cleanedWhole + (decimal !== undefined ? "." + decimal : "");
              } else {
                cleaned = value.replace(/^0+/, "");
              }
              const finalValue = cleaned === "" ? 0 : Number(cleaned);
              setForm({ ...form, unitPrice: finalValue });
            }
          }}
          className="text-left"
        />
        {errors.unitPrice && (
          <p className="text-sm text-destructive mt-1">{errors.unitPrice}</p>
        )}
      </div>
      <div className="flex justify-end gap-3 pt-4">
        <Button
          variant="outline"
          className="btn-primary-outline"
          onClick={onClose}
        >
          Cancel
        </Button>
        <Button className="btn-primary" onClick={handleSubmit}>
          {product ? "Update" : "Add"} Product
        </Button>
      </div>
    </div>
  );
}
