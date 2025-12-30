// src/api/products.js
const delay = () => new Promise((resolve) => setTimeout(resolve, 600)); // Simulate network

let products = [
  {
    id: 1,
    code: "PR-001",
    name: "Laptop Pro",
    category: "Electronics",
    quantity: 15,
    unitPrice: 1299,
  },
  {
    id: 2,
    code: "PR-002",
    name: "Wireless Mouse",
    category: "Electronics",
    quantity: 5,
    unitPrice: 45,
  },
  {
    id: 3,
    code: "PR-003",
    name: "Office Chair",
    category: "Furniture",
    quantity: 0,
    unitPrice: 299,
  },
  {
    id: 4,
    code: "PR-004",
    name: "Printer Ink",
    category: "Supplies",
    quantity: 25,
    unitPrice: 89,
  },
  {
    id: 5,
    code: "PR-005",
    name: "Desk Lamp",
    category: "Furniture",
    quantity: 8,
    unitPrice: 75,
  },
];

export const getProducts = async () => {
  await delay();
  return [...products]; // Return copy
};

export const addProduct = async (data) => {
  await delay();
  const newProduct = {
    ...data,
    id: Math.max(...products.map((p) => p.id), 0) + 1,
  };
  products.push(newProduct);
  return newProduct;
};

export const updateProduct = async (updated) => {
  await delay();
  products = products.map((p) => (p.id === updated.id ? updated : p));
  return updated;
};

export const deleteProduct = async (id) => {
  await delay();
  products = products.filter((p) => p.id !== id);
  return id;
};