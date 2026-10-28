
"use client";

import { useMemo, useState } from "react";
import {
  Search,
  Plus,
  Package,
  AlertTriangle,
  CircleX,
  Boxes,
  ArrowDownToLine,
  ArrowUpFromLine,
  History,
  X,
  ChevronLeft,
  ChevronRight,
  SlidersHorizontal,
  CheckCircle2,
} from "lucide-react";

type InventoryProduct = {
  id: string;
  name: string;
  sku: string;
  category: string;
  stock: number;
  reserved: number;
  updatedAt: string;
};

type StockMovement = {
  id: string;
  productName: string;
  sku: string;
  type: "Stock In" | "Stock Out" | "Adjustment";
  quantity: number;
  reason: string;
  date: string;
};

const initialInventory: InventoryProduct[] = [
  {
    id: "1",
    name: "Classic Cotton T-Shirt",
    sku: "TSH-001",
    category: "Clothing",
    stock: 24,
    reserved: 4,
    updatedAt: "2026-10-28",
  },
  {
    id: "2",
    name: "Premium Casual Shirt",
    sku: "SHT-014",
    category: "Clothing",
    stock: 5,
    reserved: 2,
    updatedAt: "2026-10-28",
  },
  {
    id: "3",
    name: "Classic Leather Wallet",
    sku: "WLT-008",
    category: "Accessories",
    stock: 0,
    reserved: 0,
    updatedAt: "2026-10-27",
  },
  {
    id: "4",
    name: "Minimal Running Sneakers",
    sku: "SHO-021",
    category: "Footwear",
    stock: 18,
    reserved: 3,
    updatedAt: "2026-10-27",
  },
  {
    id: "5",
    name: "Everyday Backpack",
    sku: "BAG-003",
    category: "Accessories",
    stock: 12,
    reserved: 2,
    updatedAt: "2026-10-26",
  },
  {
    id: "6",
    name: "Classic Wrist Watch",
    sku: "WAT-012",
    category: "Accessories",
    stock: 3,
    reserved: 1,
    updatedAt: "2026-10-26",
  },
  {
    id: "7",
    name: "Essential Hoodie",
    sku: "HOD-006",
    category: "Clothing",
    stock: 32,
    reserved: 5,
    updatedAt: "2026-10-25",
  },
  {
    id: "8",
    name: "Everyday Sneakers",
    sku: "SHO-025",
    category: "Footwear",
    stock: 9,
    reserved: 2,
    updatedAt: "2026-10-24",
  },
];

const initialMovements: StockMovement[] = [
  {
    id: "M-105",
    productName: "Classic Cotton T-Shirt",
    sku: "TSH-001",
    type: "Stock In",
    quantity: 10,
    reason: "New supplier shipment",
    date: "2026-10-28",
  },
  {
    id: "M-104",
    productName: "Premium Casual Shirt",
    sku: "SHT-014",
    type: "Stock Out",
    quantity: 2,
    reason: "Order fulfillment",
    date: "2026-10-28",
  },
  {
    id: "M-103",
    productName: "Classic Wrist Watch",
    sku: "WAT-012",
    type: "Adjustment",
    quantity: -1,
    reason: "Damaged item",
    date: "2026-10-27",
  },
];

const getStockStatus = (stock: number) => {
  if (stock === 0) {
    return {
      label: "Out of stock",
      className: "bg-red-50 text-red-700",
      dot: "bg-red-500",
    };
  }

  if (stock <= 5) {
    return {
      label: "Low stock",
      className: "bg-amber-50 text-amber-700",
      dot: "bg-amber-500",
    };
  }

  return {
    label: "In stock",
    className: "bg-emerald-50 text-emerald-700",
    dot: "bg-emerald-500",
  };
};

export default function InventoryPage() {
  const [inventory, setInventory] = useState(initialInventory);
  const [movements, setMovements] = useState(initialMovements);
  const [search, setSearch] = useState("");
  const [stockFilter, setStockFilter] = useState("All stock");
  const [categoryFilter, setCategoryFilter] = useState("All categories");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [selectedProduct, setSelectedProduct] =
    useState<InventoryProduct | null>(null);
  const [movementType, setMovementType] = useState<
    "Stock In" | "Stock Out" | "Adjustment"
  >("Stock In");
  const [quantity, setQuantity] = useState("1");
  const [reason, setReason] = useState("Supplier restock");
  const [notice, setNotice] = useState("");
  const [showHistory, setShowHistory] = useState(false);

  const categories = useMemo(
    () => [...new Set(inventory.map((item) => item.category))],
    [inventory],
  );

  const filteredInventory = useMemo(() => {
    return inventory.filter((item) => {
      const query = search.trim().toLowerCase();

      const matchesSearch =
        item.name.toLowerCase().includes(query) ||
        item.sku.toLowerCase().includes(query);

      const matchesCategory =
        categoryFilter === "All categories" || item.category === categoryFilter;

      const matchesStock =
        stockFilter === "All stock" ||
        (stockFilter === "In stock" && item.stock > 5) ||
        (stockFilter === "Low stock" && item.stock > 0 && item.stock <= 5) ||
        (stockFilter === "Out of stock" && item.stock === 0);

      return matchesSearch && matchesCategory && matchesStock;
    });
  }, [inventory, search, stockFilter, categoryFilter]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredInventory.length / pageSize),
  );
  const currentPage = Math.min(page, totalPages);
  const paginatedInventory = filteredInventory.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize,
  );

  const totalUnits = inventory.reduce((sum, item) => sum + item.stock, 0);
  const lowStockCount = inventory.filter(
    (item) => item.stock > 0 && item.stock <= 5,
  ).length;
  const outOfStockCount = inventory.filter((item) => item.stock === 0).length;
  const reservedUnits = inventory.reduce((sum, item) => sum + item.reserved, 0);

  function openMovement(
    product: InventoryProduct,
    type: "Stock In" | "Stock Out" | "Adjustment",
  ) {
    setSelectedProduct(product);
    setMovementType(type);
    setQuantity("1");
    setReason(
      type === "Stock In"
        ? "Supplier restock"
        : type === "Stock Out"
          ? "Order fulfillment"
          : "Stock correction",
    );
  }

  function submitMovement(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!selectedProduct) return;

    const amount = Number(quantity);

    if (!Number.isInteger(amount) || amount <= 0) {
      setNotice("Quantity must be a positive whole number.");
      return;
    }

    const current = inventory.find((item) => item.id === selectedProduct.id);

    if (!current) return;

    let delta = amount;

    if (movementType === "Stock Out") {
      delta = -amount;
    }

    if (movementType === "Adjustment") {
      delta = amount;
    }

    const nextStock = current.stock + delta;

    if (movementType !== "Stock In" && nextStock < 0) {
      setNotice("Stock cannot be negative.");
      return;
    }

    if (movementType !== "Stock In" && nextStock < current.reserved) {
      setNotice(`Stock cannot go below ${current.reserved} reserved units.`);
      return;
    }

    const date = new Date().toISOString().slice(0, 10);

    setInventory((previous) =>
      previous.map((item) =>
        item.id === current.id
          ? { ...item, stock: nextStock, updatedAt: date }
          : item,
      ),
    );

    const movement: StockMovement = {
      id: `M-${Date.now()}`,
      productName: current.name,
      sku: current.sku,
      type: movementType,
      quantity: delta,
      reason: reason.trim() || "Manual stock update",
      date,
    };

    setMovements((previous) => [movement, ...previous]);
    setSelectedProduct(null);
    setNotice(`Stock updated: ${current.name} now has ${nextStock} units.`);
  }

  return (
    <main className="min-h-screen bg-[#F7F7F8] p-4 text-gray-900 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-[1600px] space-y-6">
        {/* Header */}
        <header className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <p className="mb-2 text-xs text-gray-400">Admin / Inventory</p>
            <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
              Stock Management
            </h1>
            <p className="mt-1 text-sm text-gray-500">
              Monitor inventory, update stock and track stock movements.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setShowHistory((previous) => !previous)}
              className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-semibold hover:bg-gray-50"
            >
              <History size={17} />
              {showHistory ? "Hide history" : "Stock history"}
            </button>
            <button
              onClick={() => {
                if (inventory[0]) openMovement(inventory[0], "Stock In");
              }}
              className="inline-flex items-center gap-2 rounded-xl bg-[#92003A] px-4 py-3 text-sm font-semibold text-white hover:bg-[#76002F]"
            >
              <Plus size={17} />
              Add stock
            </button>
          </div>
        </header>

        {notice && (
          <div
            role="status"
            className="flex items-start justify-between gap-3 rounded-xl border border-[#92003A]/15 bg-[#92003A]/5 px-4 py-3 text-sm text-[#92003A]"
          >
            <span>{notice}</span>
            <button onClick={() => setNotice("")} aria-label="Dismiss">
              <X size={17} />
            </button>
          </div>
        )}

        {/* Metrics */}
        <section className="grid grid-cols-2 gap-3 xl:grid-cols-4 xl:gap-4">
          {[
            {
              title: "Total Units",
              value: totalUnits,
              description: "Physical stock quantity",
              icon: Boxes,
              color: "bg-[#92003A]/[0.08] text-[#92003A]",
            },
            {
              title: "Low Stock",
              value: lowStockCount,
              description: "Products with 1–5 units",
              icon: AlertTriangle,
              color: "bg-amber-50 text-amber-700",
            },
            {
              title: "Out of Stock",
              value: outOfStockCount,
              description: "Products with zero units",
              icon: CircleX,
              color: "bg-red-50 text-red-700",
            },
            {
              title: "Reserved Units",
              value: reservedUnits,
              description: "Allocated to orders",
              icon: Package,
              color: "bg-blue-50 text-blue-700",
            },
          ].map((metric) => {
            const Icon = metric.icon;

            return (
              <article
                key={metric.title}
                className="rounded-2xl border border-gray-200/80 bg-white p-4 sm:p-5"
              >
                <div className="flex items-start justify-between gap-2">
                  <p className="text-xs font-medium text-gray-500 sm:text-sm">
                    {metric.title}
                  </p>
                  <span
                    className={`flex size-9 shrink-0 items-center justify-center rounded-xl ${metric.color}`}
                  >
                    <Icon size={18} />
                  </span>
                </div>
                <p className="mt-3 text-2xl font-bold sm:text-3xl">
                  {metric.value}
                </p>
                <p className="mt-1 text-xs text-gray-400">
                  {metric.description}
                </p>
              </article>
            );
          })}
        </section>

        {/* Inventory table */}
        <section className="overflow-hidden rounded-2xl border border-gray-200/80 bg-white">
          <div className="space-y-4 p-4 sm:p-5">
            <div>
              <h2 className="font-bold">Inventory</h2>
              <p className="mt-1 text-sm text-gray-500">
                {filteredInventory.length} products in this view
              </p>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-[minmax(220px,1fr)_200px_180px]">
              <div className="relative">
                <Search
                  size={17}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />
                <input
                  value={search}
                  onChange={(event) => {
                    setSearch(event.target.value);
                    setPage(1);
                  }}
                  placeholder="Search product or SKU..."
                  className="h-11 w-full rounded-xl border border-gray-200 pl-10 pr-3 text-sm outline-none focus:border-[#92003A]/50 focus:ring-2 focus:ring-[#92003A]/10"
                />
              </div>

              <select
                value={categoryFilter}
                onChange={(event) => {
                  setCategoryFilter(event.target.value);
                  setPage(1);
                }}
                className="h-11 rounded-xl border border-gray-200 bg-white px-3 text-sm outline-none focus:border-[#92003A]/50"
              >
                <option>All categories</option>
                {categories.map((category) => (
                  <option key={category}>{category}</option>
                ))}
              </select>

              <select
                value={stockFilter}
                onChange={(event) => {
                  setStockFilter(event.target.value);
                  setPage(1);
                }}
                className="h-11 rounded-xl border border-gray-200 bg-white px-3 text-sm outline-none focus:border-[#92003A]/50"
              >
                <option>All stock</option>
                <option>In stock</option>
                <option>Low stock</option>
                <option>Out of stock</option>
              </select>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[850px] text-left text-sm">
              <thead className="border-y border-gray-100 bg-gray-50/80 text-xs text-gray-500">
                <tr>
                  <th className="px-5 py-4 font-medium">Product</th>
                  <th className="px-4 py-4 font-medium">Category</th>
                  <th className="px-4 py-4 font-medium">On hand</th>
                  <th className="px-4 py-4 font-medium">Reserved</th>
                  <th className="px-4 py-4 font-medium">Available</th>
                  <th className="px-4 py-4 font-medium">Status</th>
                  <th className="px-5 py-4 text-right font-medium">
                    Update stock
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100">
                {paginatedInventory.map((product) => {
                  const status = getStockStatus(product.stock);
                  const available = product.stock - product.reserved;

                  return (
                    <tr key={product.id} className="hover:bg-gray-50/70">
                      <td className="px-5 py-4">
                        <p className="font-semibold">{product.name}</p>
                        <p className="mt-1 text-xs text-gray-400">
                          SKU: {product.sku}
                        </p>
                      </td>

                      <td className="px-4 py-4 text-gray-600">
                        {product.category}
                      </td>

                      <td className="px-4 py-4 font-semibold">
                        {product.stock}
                      </td>

                      <td className="px-4 py-4 text-gray-500">
                        {product.reserved}
                      </td>

                      <td className="px-4 py-4">
                        <span
                          className={
                            available <= 0
                              ? "font-semibold text-red-600"
                              : "font-semibold"
                          }
                        >
                          {available}
                        </span>
                      </td>

                      <td className="px-4 py-4">
                        <span
                          className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ${status.className}`}
                        >
                          <span
                            className={`size-1.5 rounded-full ${status.dot}`}
                          />
                          {status.label}
                        </span>
                      </td>

                      <td className="px-5 py-4">
                        <div className="flex justify-end gap-1.5">
                          <button
                            title="Add stock"
                            onClick={() => openMovement(product, "Stock In")}
                            className="flex size-9 items-center justify-center rounded-lg border border-gray-200 text-emerald-700 hover:border-emerald-200 hover:bg-emerald-50"
                          >
                            <ArrowDownToLine size={16} />
                          </button>
                          <button
                            title="Remove stock"
                            disabled={available <= 0}
                            onClick={() => openMovement(product, "Stock Out")}
                            className="flex size-9 items-center justify-center rounded-lg border border-gray-200 text-red-600 hover:border-red-200 hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-30"
                          >
                            <ArrowUpFromLine size={16} />
                          </button>
                          <button
                            title="Adjust stock"
                            onClick={() => openMovement(product, "Adjustment")}
                            className="flex size-9 items-center justify-center rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-100"
                          >
                            <SlidersHorizontal size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}

                {paginatedInventory.length === 0 && (
                  <tr>
                    <td
                      colSpan={7}
                      className="px-5 py-14 text-center text-sm text-gray-500"
                    >
                      <Package
                        className="mx-auto mb-2 text-gray-300"
                        size={28}
                      />
                      No inventory items found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 border-t border-gray-100 px-4 py-4 sm:px-5">
            <p className="text-xs text-gray-500">
              Showing{" "}
              {filteredInventory.length ? (currentPage - 1) * pageSize + 1 : 0}
              {"–"}
              {Math.min(currentPage * pageSize, filteredInventory.length)} of{" "}
              {filteredInventory.length}
            </p>

            <div className="flex items-center gap-2">
              <select
                aria-label="Rows per page"
                value={pageSize}
                onChange={(event) => {
                  setPageSize(Number(event.target.value));
                  setPage(1);
                }}
                className="h-9 rounded-lg border border-gray-200 bg-white px-2 text-xs"
              >
                <option value={5}>5 / page</option>
                <option value={10}>10 / page</option>
                <option value={20}>20 / page</option>
              </select>
              <button
                aria-label="Previous page"
                disabled={currentPage <= 1}
                onClick={() => setPage((previous) => previous - 1)}
                className="flex size-9 items-center justify-center rounded-lg border border-gray-200 disabled:opacity-40"
              >
                <ChevronLeft size={17} />
              </button>
              <span className="min-w-12 text-center text-sm">
                {currentPage}/{totalPages}
              </span>
              <button
                aria-label="Next page"
                disabled={currentPage >= totalPages}
                onClick={() => setPage((previous) => previous + 1)}
                className="flex size-9 items-center justify-center rounded-lg border border-gray-200 disabled:opacity-40"
              >
                <ChevronRight size={17} />
              </button>
            </div>
          </div>
        </section>

        {/* Stock movement history */}
        {showHistory && (
          <section className="overflow-hidden rounded-2xl border border-gray-200/80 bg-white">
            <div className="border-b border-gray-100 p-5">
              <h2 className="font-bold">Stock Movement History</h2>
              <p className="mt-1 text-sm text-gray-500">
                A record of inventory changes made during this session.
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full min-w-[650px] text-left text-sm">
                <thead className="bg-gray-50 text-xs text-gray-500">
                  <tr>
                    <th className="px-5 py-3 font-medium">Product</th>
                    <th className="px-4 py-3 font-medium">Movement</th>
                    <th className="px-4 py-3 font-medium">Quantity</th>
                    <th className="px-4 py-3 font-medium">Reason</th>
                    <th className="px-5 py-3 font-medium">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {movements.map((movement) => (
                    <tr key={movement.id}>
                      <td className="px-5 py-4">
                        <p className="font-medium">{movement.productName}</p>
                        <p className="mt-1 text-xs text-gray-400">
                          {movement.sku}
                        </p>
                      </td>
                      <td className="px-4 py-4 text-gray-600">
                        {movement.type}
                      </td>
                      <td
                        className={`px-4 py-4 font-semibold ${
                          movement.quantity > 0
                            ? "text-emerald-700"
                            : "text-red-600"
                        }`}
                      >
                        {movement.quantity > 0 ? "+" : ""}
                        {movement.quantity}
                      </td>
                      <td className="px-4 py-4 text-gray-500">
                        {movement.reason}
                      </td>
                      <td className="px-5 py-4 text-gray-500">
                        {movement.date}
                      </td>
                    </tr>
                  ))}
                  {movements.length === 0 && (
                    <tr>
                      <td
                        colSpan={5}
                        className="px-5 py-8 text-center text-gray-500"
                      >
                        No stock movements recorded.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </section>
        )}

        <p className="text-xs leading-5 text-gray-400">
          Inventory is currently demo data stored in component state. Refreshing
          the page resets changes. Connect the stock update flow to your backend
          before using this in production.
        </p>
      </div>

      {/* Stock update modal */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <form
            onSubmit={submitMovement}
            className="w-full max-w-md rounded-2xl bg-white p-5 shadow-2xl sm:p-6"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-xs font-medium text-[#92003A]">
                  INVENTORY UPDATE
                </p>
                <h2 className="mt-1 text-xl font-bold">{movementType}</h2>
                <p className="mt-1 text-sm text-gray-500">
                  {selectedProduct.name}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setSelectedProduct(null)}
                aria-label="Close dialog"
                className="rounded-lg p-2 text-gray-500 hover:bg-gray-100"
              >
                <X size={18} />
              </button>
            </div>

            <div className="mt-5 rounded-xl bg-gray-50 p-4">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Current stock</span>
                <span className="font-semibold">
                  {selectedProduct.stock} units
                </span>
              </div>
              <div className="mt-2 flex justify-between text-sm">
                <span className="text-gray-500">Reserved</span>
                <span className="font-medium">
                  {selectedProduct.reserved} units
                </span>
              </div>
              <div className="mt-2 flex justify-between text-sm">
                <span className="text-gray-500">Available</span>
                <span className="font-semibold">
                  {selectedProduct.stock - selectedProduct.reserved} units
                </span>
              </div>
            </div>

            <div className="mt-5 space-y-4">
              <div>
                <label className="mb-2 block text-sm font-medium">
                  Movement type
                </label>
                <select
                  value={movementType}
                  onChange={(event) =>
                    setMovementType(
                      event.target.value as
                        | "Stock In"
                        | "Stock Out"
                        | "Adjustment",
                    )
                  }
                  className="h-11 w-full rounded-xl border border-gray-200 bg-white px-3 text-sm outline-none focus:border-[#92003A]"
                >
                  <option>Stock In</option>
                  <option>Stock Out</option>
                  <option>Adjustment</option>
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">
                  Quantity
                </label>
                <input
                  type="number"
                  min={1}
                  step={1}
                  required
                  value={quantity}
                  onChange={(event) => setQuantity(event.target.value)}
                  className="h-11 w-full rounded-xl border border-gray-200 px-3 text-sm outline-none focus:border-[#92003A]"
                />
                <p className="mt-1 text-xs text-gray-400">
                  Adjustment currently adds the entered quantity. Use Stock Out
                  for reductions.
                </p>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">Reason</label>
                <select
                  value={reason}
                  onChange={(event) => setReason(event.target.value)}
                  className="h-11 w-full rounded-xl border border-gray-200 bg-white px-3 text-sm outline-none focus:border-[#92003A]"
                >
                  <option>Supplier restock</option>
                  <option>Order fulfillment</option>
                  <option>Damaged item</option>
                  <option>Stock correction</option>
                  <option>Returned item</option>
                  <option>Other</option>
                </select>
              </div>
            </div>

            <div className="mt-6 flex gap-3">
              <button
                type="button"
                onClick={() => setSelectedProduct(null)}
                className="flex-1 rounded-xl border border-gray-200 px-4 py-3 text-sm font-semibold hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 rounded-xl bg-[#92003A] px-4 py-3 text-sm font-semibold text-white hover:bg-[#76002F]"
              >
                Update stock
              </button>
            </div>
          </form>
        </div>
      )}
    </main>
  );
}
