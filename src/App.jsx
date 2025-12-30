import { useState, useEffect } from "react";
import { getProducts, addProduct, updateProduct } from "./api/products";
import LoadingState from "./components/LoadingState";
import ErrorState from "./components/ErrorState";
import SummaryCards from "./components/SummaryCards";
import SearchAndFilter from "./components/SearchAndFilter";
import ProductTable from "./components/ProductTable";
import ProductForm from "./components/ProductForm";
import ProductDetailsDialog from "./components/ProductDetailsDialog";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { deleteProduct } from "./api/products";
import InventoryCharts from "./components/InventoryCharts";

function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [formOpen, setFormOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [viewProduct, setViewProduct] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [deleteProductItem, setDeleteProductItem] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const data = await getProducts();
        setProducts(data);
      } catch (err) {
        setError("Failed to load products");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const handleSave = async (data) => {
    if (editingProduct) {
      const updated = await updateProduct({ ...editingProduct, ...data });
      setProducts((prev) =>
        prev.map((p) => (p.id === updated.id ? updated : p))
      );
    } else {
      const newProd = await addProduct(data);
      setProducts((prev) => [...prev, newProd]);
    }
    setFormOpen(false);
    setEditingProduct(null);
  };

  const filteredProducts = products.filter((p) => {
    const matchesSearch =
      p.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "All" ||
      (statusFilter === "In Stock" && p.quantity >= 10) ||
      (statusFilter === "Low Stock" && p.quantity > 0 && p.quantity < 10) ||
      (statusFilter === "Out of Stock" && p.quantity === 0);
    return matchesSearch && matchesStatus;
  });
  const handleDelete = async () => {
    if (deleteProductItem) {
      await deleteProduct(deleteProductItem.id);
      setProducts((prev) => prev.filter((p) => p.id !== deleteProductItem.id));
      setDeleteProductItem(null);
      // Reset page if needed
      if (filteredProducts.length === 1 && currentPage > 1) {
        setCurrentPage(currentPage - 1);
      }
    }
  };

  if (loading) return <LoadingState />;
  if (error) return <ErrorState message={error} />;

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="mx-auto max-w-7xl">
        <h1 className="text-title mb-8">Inventory Management</h1>

        <SummaryCards products={products} />

        <SearchAndFilter
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          onAddClick={() => {
            setEditingProduct(null);
            setFormOpen(true);
          }}
        />

        <ProductTable
          products={filteredProducts}
          totalProducts={filteredProducts.length}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          onView={setViewProduct}
          onEdit={(p) => {
            setEditingProduct(p);
            setFormOpen(true);
          }}
          onDelete={setDeleteProductItem}
        />

        <InventoryCharts products={products} />

        {/* Add/Edit Form */}
        <Dialog
          open={formOpen}
          onOpenChange={(open) => {
            setFormOpen(open);
            if (!open) setEditingProduct(null);
          }}
        >
          <DialogContent className="sm:max-w-lg">
            <DialogHeader>
              <DialogTitle>
                {editingProduct ? "Edit Product" : "Add New Product"}
              </DialogTitle>
            </DialogHeader>
            <ProductForm
              product={editingProduct}
              onSave={handleSave}
              onClose={() => setFormOpen(false)}
            />
          </DialogContent>
        </Dialog>

        {/* View Details */}
        <ProductDetailsDialog
          product={viewProduct}
          open={!!viewProduct}
          onOpenChange={() => setViewProduct(null)}
        />
        {/* Delete Confirmation */}
        <AlertDialog
          open={!!deleteProductItem}
          onOpenChange={() => setDeleteProductItem(null)}
        >
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This will permanently delete{" "}
                <strong>{deleteProductItem?.name}</strong> (
                {deleteProductItem?.code}). This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={handleDelete}
                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              >
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
}

export default App;
