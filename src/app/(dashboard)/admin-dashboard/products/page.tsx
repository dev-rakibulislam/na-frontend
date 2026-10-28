
"use client";

import { useMemo, useState } from "react";
import {
  Search,
  Plus,
  SlidersHorizontal,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ArrowUpDown,
  MoreHorizontal,
  Pencil,
  Trash2,
  Eye,
  Package,
  AlertTriangle,
  Archive,
  CheckCircle2,
  X,
  Download,
  RotateCcw,
} from "lucide-react";

type ProductStatus = "Active" | "Draft" | "Archived";

type Product = {
  id: string;
  name: string;
  sku: string;
  category: string;
  price: number;
  originalPrice: number;
  stock: number;
  status: ProductStatus;
  image: string;
  createdAt: string;
};

const initialProducts: Product[] = [
  {
    id: "1",
    name: "Classic Cotton T-Shirt",
    sku: "TSH-001",
    category: "Clothing",
    price: 850,
    originalPrice: 1100,
    stock: 24,
    status: "Active",
    image:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=200&q=80",
    createdAt: "2026-10-25",
  },
  {
    id: "2",
    name: "Premium Casual Shirt",
    sku: "SHT-014",
    category: "Clothing",
    price: 1450,
    originalPrice: 1800,
    stock: 5,
    status: "Active",
    image:
      "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=200&q=80",
    createdAt: "2026-10-24",
  },
  {
    id: "3",
    name: "Classic Leather Wallet",
    sku: "WLT-008",
    category: "Accessories",
    price: 690,
    originalPrice: 690,
    stock: 0,
    status: "Active",
    image:
      "https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=200&q=80",
    createdAt: "2026-10-23",
  },
  {
    id: "4",
    name: "Minimal Running Sneakers",
    sku: "SHO-021",
    category: "Footwear",
    price: 2450,
    originalPrice: 2990,
    stock: 18,
    status: "Active",
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=200&q=80",
    createdAt: "2026-10-22",
  },
  {
    id: "5",
    name: "Everyday Backpack",
    sku: "BAG-003",
    category: "Accessories",
    price: 1850,
    originalPrice: 2200,
    stock: 12,
    status: "Draft",
    image:
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=200&q=80",
    createdAt: "2026-10-21",
  },
  {
    id: "6",
    name: "Classic Wrist Watch",
    sku: "WAT-012",
    category: "Accessories",
    price: 3200,
    originalPrice: 3900,
    stock: 3,
    status: "Active",
    image:
      "https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&fit=crop&w=200&q=80",
    createdAt: "2026-10-20",
  },
  {
    id: "7",
    name: "Essential Hoodie",
    sku: "HOD-006",
    category: "Clothing",
    price: 1750,
    originalPrice: 2100,
    stock: 32,
    status: "Archived",
    image:
      "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=200&q=80",
    createdAt: "2026-10-19",
  },
  {
    id: "8",
    name: "Everyday Sneakers",
    sku: "SHO-025",
    category: "Footwear",
    price: 2150,
    originalPrice: 2500,
    stock: 9,
    status: "Active",
    image:
      "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=200&q=80",
    createdAt: "2026-10-18",
  },
  {
    id: "9",
    name: "Travel Shoulder Bag",
    sku: "BAG-011",
    category: "Accessories",
    price: 1250,
    originalPrice: 1500,
    stock: 0,
    status: "Draft",
    image:
      "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=200&q=80",
    createdAt: "2026-10-17",
  },
];

const currency = (amount: number) =>
  new Intl.NumberFormat("en-BD", {
    style: "currency",
    currency: "BDT",
    maximumFractionDigits: 0,
  })
    .format(amount)
    .replace("BDT", "৳");

function stockLabel(stock: number) {
  if (stock === 0) {
    return {
      label: "Out of stock",
      className: "bg-red-50 text-red-700",
    };
  }

  if (stock <= 5) {
    return {
      label: "Low stock",
      className: "bg-amber-50 text-amber-700",
    };
  }

  return {
    label: "In stock",
    className: "bg-emerald-50 text-emerald-700",
  };
}

function statusStyle(status: ProductStatus) {
  switch (status) {
    case "Active":
      return "bg-emerald-50 text-emerald-700";
    case "Draft":
      return "bg-gray-100 text-gray-600";
    case "Archived":
      return "bg-orange-50 text-orange-700";
  }
}

export default function AdminProductsPage() {
  const [products, setProducts] = useState(initialProducts);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All categories");
  const [status, setStatus] = useState("All statuses");
  const [stockFilter, setStockFilter] = useState("All stock");
  const [sortBy, setSortBy] = useState("newest");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [selected, setSelected] = useState<string[]>([]);
  const [menuId, setMenuId] = useState<string | null>(null);
  const [notice, setNotice] = useState("");
  const [deleteTarget, setDeleteTarget] = useState<string | null>(null);

  const categories = useMemo(
    () => [...new Set(products.map((product) => product.category))],
    [products],
  );

  const filteredProducts = useMemo(() => {
    const result = products.filter((product) => {
      const query = search.trim().toLowerCase();

      const matchesSearch =
        !query ||
        product.name.toLowerCase().includes(query) ||
        product.sku.toLowerCase().includes(query);

      const matchesCategory =
        category === "All categories" || product.category === category;

      const matchesStatus =
        status === "All statuses" || product.status === status;

      const matchesStock =
        stockFilter === "All stock" ||
        (stockFilter === "In stock" && product.stock > 5) ||
        (stockFilter === "Low stock" &&
          product.stock > 0 &&
          product.stock <= 5) ||
        (stockFilter === "Out of stock" && product.stock === 0);

      return matchesSearch && matchesCategory && matchesStatus && matchesStock;
    });

    if (sortBy === "price-low") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-high") {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === "name") {
      result.sort((a, b) => a.name.localeCompare(b.name));
    } else {
      result.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      );
    }

    return result;
  }, [products, search, category, status, stockFilter, sortBy]);

  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / pageSize));
  const currentPage = Math.min(page, totalPages);
  const startIndex = (currentPage - 1) * pageSize;
  const paginatedProducts = filteredProducts.slice(
    startIndex,
    startIndex + pageSize,
  );

  const selectedOnPage = paginatedProducts.every((product) =>
    selected.includes(product.id),
  );

  const activeCount = products.filter((p) => p.status === "Active").length;
  const lowStockCount = products.filter(
    (p) => p.stock > 0 && p.stock <= 5,
  ).length;
  const outOfStockCount = products.filter((p) => p.stock === 0).length;

  function resetFilters() {
    setSearch("");
    setCategory("All categories");
    setStatus("All statuses");
    setStockFilter("All stock");
    setSortBy("newest");
    setPage(1);
  }

  function toggleSelected(id: string) {
    setSelected((previous) =>
      previous.includes(id)
        ? previous.filter((item) => item !== id)
        : [...previous, id],
    );
  }

  function togglePageSelection() {
    const pageIds = paginatedProducts.map((product) => product.id);

    setSelected((previous) =>
      selectedOnPage
        ? previous.filter((id) => !pageIds.includes(id))
        : [...new Set([...previous, ...pageIds])],
    );
  }

  function deleteProducts(ids: string[]) {
    setProducts((previous) =>
      previous.filter((product) => !ids.includes(product.id)),
    );
    setSelected((previous) => previous.filter((id) => !ids.includes(id)));
    setDeleteTarget(null);
    setMenuId(null);
    setNotice(`${ids.length} product(s) removed from demo data.`);
  }

  function exportCSV() {
    const header = ["Name", "SKU", "Category", "Price", "Stock", "Status"];

    const rows = filteredProducts.map((product) => [
      product.name,
      product.sku,
      product.category,
      product.price,
      product.stock,
      product.status,
    ]);

    const csv = [header, ...rows]
      .map((row) =>
        row.map((value) => `"${String(value).replace(/"/g, '""')}"`).join(","),
      )
      .join("\n");

    const blob = new Blob(["\uFEFF" + csv], {
      type: "text/csv;charset=utf-8;",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "products.csv";
    link.click();
    URL.revokeObjectURL(url);
  }

  function actionMessage(action: string, product: Product) {
    setMenuId(null);
    setNotice(`${action}: ${product.name}. Connect this action to your API.`);
  }

  return (
    <main
      className="min-h-screen bg-[#F7F7F8] p-4 text-gray-900 sm:p-6 lg:p-8"
      onClick={() => menuId && setMenuId(null)}
    >
      <div className="mx-auto max-w-[1600px] space-y-6">
        {/* Header */}
        <header className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <div className="mb-2 flex items-center gap-2 text-xs text-gray-400">
              <span>Admin</span>
              <span>/</span>
              <span className="text-gray-600">Products</span>
            </div>
            <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
              Products
            </h1>
            <p className="mt-1 text-sm text-gray-500">
              Manage your catalog, inventory and product visibility.
            </p>
          </div>

          <button
            onClick={() => setNotice("Navigate to your Add Product page.")}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#92003A] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#76002F]"
          >
            <Plus size={18} />
            Add Product
          </button>
        </header>

        {/* Notice */}
        {notice && (
          <div
            role="status"
            className="flex items-start justify-between gap-3 rounded-xl border border-[#92003A]/15 bg-[#92003A]/5 px-4 py-3 text-sm text-[#92003A]"
          >
            <span>{notice}</span>
            <button
              onClick={() => setNotice("")}
              aria-label="Dismiss notification"
            >
              <X size={17} />
            </button>
          </div>
        )}

        {/* Stats */}
        <section className="grid grid-cols-2 gap-3 xl:grid-cols-4 xl:gap-4">
          {[
            {
              label: "Total Products",
              value: products.length,
              icon: Package,
              note: "Across all categories",
              tone: "text-[#92003A] bg-[#92003A]/[0.08]",
            },
            {
              label: "Active Products",
              value: activeCount,
              icon: CheckCircle2,
              note: "Currently published",
              tone: "text-emerald-700 bg-emerald-50",
            },
            {
              label: "Low Stock",
              value: lowStockCount,
              icon: AlertTriangle,
              note: "1–5 units remaining",
              tone: "text-amber-700 bg-amber-50",
            },
            {
              label: "Out of Stock",
              value: outOfStockCount,
              icon: Archive,
              note: "Needs replenishment",
              tone: "text-red-700 bg-red-50",
            },
          ].map((stat) => {
            const Icon = stat.icon;

            return (
              <article
                key={stat.label}
                className="rounded-2xl border border-gray-200/80 bg-white p-4 sm:p-5"
              >
                <div className="flex items-start justify-between gap-2">
                  <p className="text-xs font-medium text-gray-500 sm:text-sm">
                    {stat.label}
                  </p>
                  <span
                    className={`flex size-9 shrink-0 items-center justify-center rounded-xl ${stat.tone}`}
                  >
                    <Icon size={18} />
                  </span>
                </div>
                <p className="mt-3 text-2xl font-bold sm:text-3xl">
                  {stat.value}
                </p>
                <p className="mt-1 text-xs text-gray-400">{stat.note}</p>
              </article>
            );
          })}
        </section>

        {/* Product list */}
        <section className="overflow-hidden rounded-2xl border border-gray-200/80 bg-white">
          <div className="flex flex-col gap-4 p-4 sm:p-5">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h2 className="font-bold">All Products</h2>
                <p className="mt-1 text-sm text-gray-500">
                  {filteredProducts.length} products found
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                <button
                  onClick={exportCSV}
                  className="inline-flex items-center gap-2 rounded-xl border border-gray-200 px-3 py-2.5 text-sm font-medium transition hover:bg-gray-50"
                >
                  <Download size={16} />
                  Export CSV
                </button>
                <button
                  onClick={resetFilters}
                  className="inline-flex items-center gap-2 rounded-xl border border-gray-200 px-3 py-2.5 text-sm font-medium text-gray-600 transition hover:bg-gray-50"
                >
                  <RotateCcw size={15} />
                  Reset
                </button>
              </div>
            </div>

            {/* Search + filters */}
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-[minmax(220px,1fr)_repeat(3,minmax(130px,165px))]">
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
                  placeholder="Search name or SKU..."
                  className="h-11 w-full rounded-xl border border-gray-200 bg-white pl-10 pr-3 text-sm outline-none transition placeholder:text-gray-400 focus:border-[#92003A]/50 focus:ring-2 focus:ring-[#92003A]/10"
                />
              </div>

              <select
                value={category}
                onChange={(event) => {
                  setCategory(event.target.value);
                  setPage(1);
                }}
                className="h-11 rounded-xl border border-gray-200 bg-white px-3 text-sm outline-none focus:border-[#92003A]/50"
              >
                <option>All categories</option>
                {categories.map((item) => (
                  <option key={item}>{item}</option>
                ))}
              </select>

              <select
                value={status}
                onChange={(event) => {
                  setStatus(event.target.value);
                  setPage(1);
                }}
                className="h-11 rounded-xl border border-gray-200 bg-white px-3 text-sm outline-none focus:border-[#92003A]/50"
              >
                <option>All statuses</option>
                <option>Active</option>
                <option>Draft</option>
                <option>Archived</option>
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

            {/* Bulk actions */}
            {selected.length > 0 && (
              <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-[#92003A]/15 bg-[#92003A]/[0.04] p-3">
                <p className="text-sm font-medium">
                  {selected.length} product(s) selected
                </p>
                <button
                  onClick={() => setDeleteTarget("selected")}
                  className="inline-flex items-center gap-2 rounded-lg border border-red-200 bg-white px-3 py-2 text-sm font-semibold text-red-600 hover:bg-red-50"
                >
                  <Trash2 size={15} />
                  Delete selected
                </button>
              </div>
            )}
          </div>

          {/* Desktop table */}
          <div className="hidden overflow-x-auto md:block">
            <table className="w-full min-w-[900px] text-left text-sm">
              <thead className="border-y border-gray-100 bg-gray-50/80 text-xs text-gray-500">
                <tr>
                  <th className="w-12 px-5 py-4">
                    <input
                      type="checkbox"
                      aria-label="Select products on current page"
                      checked={paginatedProducts.length > 0 && selectedOnPage}
                      onChange={togglePageSelection}
                      className="size-4 accent-[#92003A]"
                    />
                  </th>
                  <th className="px-3 py-4 font-medium">Product</th>
                  <th className="px-3 py-4 font-medium">Category</th>
                  <th className="px-3 py-4 font-medium">
                    <button
                      onClick={() =>
                        setSortBy(
                          sortBy === "price-low" ? "price-high" : "price-low",
                        )
                      }
                      className="inline-flex items-center gap-1"
                    >
                      Price <ArrowUpDown size={13} />
                    </button>
                  </th>
                  <th className="px-3 py-4 font-medium">Stock</th>
                  <th className="px-3 py-4 font-medium">Status</th>
                  <th className="px-3 py-4 font-medium">Created</th>
                  <th className="px-5 py-4 text-right font-medium">Actions</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100">
                {paginatedProducts.map((product) => {
                  const stock = stockLabel(product.stock);

                  return (
                    <tr
                      key={product.id}
                      className="transition hover:bg-gray-50/70"
                    >
                      <td className="px-5 py-4">
                        <input
                          type="checkbox"
                          aria-label={`Select ${product.name}`}
                          checked={selected.includes(product.id)}
                          onChange={() => toggleSelected(product.id)}
                          className="size-4 accent-[#92003A]"
                        />
                      </td>

                      <td className="px-3 py-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="size-12 rounded-xl border border-gray-100 bg-gray-50 object-cover"
                          />
                          <div className="min-w-0">
                            <p className="max-w-[220px] truncate font-semibold">
                              {product.name}
                            </p>
                            <p className="mt-1 text-xs text-gray-400">
                              SKU: {product.sku}
                            </p>
                          </div>
                        </div>
                      </td>

                      <td className="px-3 py-4 text-gray-600">
                        {product.category}
                      </td>

                      <td className="px-3 py-4">
                        <p className="font-semibold">
                          {currency(product.price)}
                        </p>
                        {product.originalPrice > product.price && (
                          <p className="mt-1 text-xs text-gray-400 line-through">
                            {currency(product.originalPrice)}
                          </p>
                        )}
                      </td>

                      <td className="px-3 py-4">
                        <p className="font-semibold">{product.stock} units</p>
                        <span
                          className={`mt-1 inline-flex rounded-full px-2 py-1 text-[11px] font-medium ${stock.className}`}
                        >
                          {stock.label}
                        </span>
                      </td>

                      <td className="px-3 py-4">
                        <span
                          className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${statusStyle(product.status)}`}
                        >
                          {product.status}
                        </span>
                      </td>

                      <td className="px-3 py-4 text-gray-500">
                        {new Date(product.createdAt).toLocaleDateString(
                          "en-GB",
                          {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                          },
                        )}
                      </td>

                      <td className="px-5 py-4 text-right">
                        <div className="relative inline-block">
                          <button
                            aria-label={`Actions for ${product.name}`}
                            onClick={(event) => {
                              event.stopPropagation();
                              setMenuId(
                                menuId === product.id ? null : product.id,
                              );
                            }}
                            className="rounded-lg p-2 text-gray-500 hover:bg-gray-100"
                          >
                            <MoreHorizontal size={19} />
                          </button>

                          {menuId === product.id && (
                            <div
                              onClick={(event) => event.stopPropagation()}
                              className="absolute right-0 top-10 z-20 w-44 rounded-xl border border-gray-200 bg-white p-1.5 text-left shadow-xl"
                            >
                              <button
                                onClick={() => actionMessage("View", product)}
                                className="flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-sm hover:bg-gray-50"
                              >
                                <Eye size={15} /> View product
                              </button>
                              <button
                                onClick={() => actionMessage("Edit", product)}
                                className="flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-sm hover:bg-gray-50"
                              >
                                <Pencil size={15} /> Edit product
                              </button>
                              <button
                                onClick={() => {
                                  setDeleteTarget(product.id);
                                  setMenuId(null);
                                }}
                                className="flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-sm text-red-600 hover:bg-red-50"
                              >
                                <Trash2 size={15} /> Delete product
                              </button>
                            </div>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}

                {paginatedProducts.length === 0 && (
                  <tr>
                    <td colSpan={8} className="px-5 py-16 text-center">
                      <Package
                        size={30}
                        className="mx-auto mb-3 text-gray-300"
                      />
                      <p className="font-semibold">No products found</p>
                      <p className="mt-1 text-sm text-gray-500">
                        Try changing your search or filters.
                      </p>
                      <button
                        onClick={resetFilters}
                        className="mt-3 text-sm font-semibold text-[#92003A]"
                      >
                        Clear filters
                      </button>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Mobile cards */}
          <div className="divide-y divide-gray-100 md:hidden">
            {paginatedProducts.map((product) => {
              const stock = stockLabel(product.stock);

              return (
                <article key={product.id} className="p-4">
                  <div className="flex gap-3">
                    <input
                      type="checkbox"
                      aria-label={`Select ${product.name}`}
                      checked={selected.includes(product.id)}
                      onChange={() => toggleSelected(product.id)}
                      className="mt-1 size-4 accent-[#92003A]"
                    />
                    <img
                      src={product.image}
                      alt={product.name}
                      className="size-16 shrink-0 rounded-xl border border-gray-100 object-cover"
                    />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between gap-2">
                        <p className="text-sm font-semibold">{product.name}</p>
                        <button
                          onClick={() =>
                            setMenuId(menuId === product.id ? null : product.id)
                          }
                          aria-label="Toggle product actions"
                          className="shrink-0 rounded-lg p-1 text-gray-500 hover:bg-gray-100"
                        >
                          <MoreHorizontal size={18} />
                        </button>
                      </div>
                      <p className="mt-1 text-xs text-gray-400">
                        {product.sku} · {product.category}
                      </p>
                      <div className="mt-2 flex flex-wrap items-center gap-2">
                        <span className="font-semibold">
                          {currency(product.price)}
                        </span>
                        <span
                          className={`rounded-full px-2 py-1 text-[10px] font-semibold ${statusStyle(product.status)}`}
                        >
                          {product.status}
                        </span>
                        <span
                          className={`rounded-full px-2 py-1 text-[10px] font-medium ${stock.className}`}
                        >
                          {stock.label}: {product.stock}
                        </span>
                      </div>
                    </div>
                  </div>

                  {menuId === product.id && (
                    <div className="ml-7 mt-3 flex flex-wrap gap-2">
                      <button
                        onClick={() => actionMessage("View", product)}
                        className="rounded-lg border px-3 py-2 text-xs font-medium"
                      >
                        View
                      </button>
                      <button
                        onClick={() => actionMessage("Edit", product)}
                        className="rounded-lg border px-3 py-2 text-xs font-medium"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => {
                          setDeleteTarget(product.id);
                          setMenuId(null);
                        }}
                        className="rounded-lg border border-red-200 px-3 py-2 text-xs font-medium text-red-600"
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </article>
              );
            })}

            {paginatedProducts.length === 0 && (
              <div className="px-5 py-12 text-center text-sm text-gray-500">
                No products found. Try changing your filters.
              </div>
            )}
          </div>

          {/* Pagination */}
          <div className="flex flex-col gap-3 border-t border-gray-100 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-5">
            <p className="text-xs text-gray-500 sm:text-sm">
              Showing{" "}
              <span className="font-semibold text-gray-800">
                {filteredProducts.length === 0 ? 0 : startIndex + 1}–
                {Math.min(startIndex + pageSize, filteredProducts.length)}
              </span>{" "}
              of{" "}
              <span className="font-semibold text-gray-800">
                {filteredProducts.length}
              </span>{" "}
              products
            </p>

            <div className="flex flex-wrap items-center gap-2">
              <select
                aria-label="Products per page"
                value={pageSize}
                onChange={(event) => {
                  setPageSize(Number(event.target.value));
                  setPage(1);
                }}
                className="h-9 rounded-lg border border-gray-200 bg-white px-2 text-xs outline-none"
              >
                <option value={5}>5 / page</option>
                <option value={10}>10 / page</option>
                <option value={20}>20 / page</option>
              </select>

              <button
                disabled={currentPage <= 1}
                onClick={() => setPage((previous) => previous - 1)}
                className="flex size-9 items-center justify-center rounded-lg border border-gray-200 disabled:cursor-not-allowed disabled:opacity-40"
                aria-label="Previous page"
              >
                <ChevronLeft size={17} />
              </button>

              <span className="min-w-16 text-center text-sm font-medium">
                {currentPage} / {totalPages}
              </span>

              <button
                disabled={currentPage >= totalPages}
                onClick={() => setPage((previous) => previous + 1)}
                className="flex size-9 items-center justify-center rounded-lg border border-gray-200 disabled:cursor-not-allowed disabled:opacity-40"
                aria-label="Next page"
              >
                <ChevronRight size={17} />
              </button>
            </div>
          </div>
        </section>

        {/* Delete confirmation */}
        {deleteTarget && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
            <div
              role="dialog"
              aria-modal="true"
              aria-labelledby="delete-title"
              className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl"
            >
              <div className="flex size-12 items-center justify-center rounded-xl bg-red-50 text-red-600">
                <Trash2 size={22} />
              </div>
              <h2 id="delete-title" className="mt-4 text-lg font-bold">
                Delete product{deleteTarget === "selected" ? "s" : ""}?
              </h2>
              <p className="mt-2 text-sm leading-6 text-gray-500">
                This removes the selected item(s) from this page&apos;s demo
                data. It does not delete anything from your database.
              </p>
              <div className="mt-6 flex justify-end gap-3">
                <button
                  onClick={() => setDeleteTarget(null)}
                  className="rounded-xl border border-gray-200 px-4 py-2.5 text-sm font-semibold hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={() =>
                    deleteProducts(
                      deleteTarget === "selected" ? selected : [deleteTarget],
                    )
                  }
                  className="rounded-xl bg-red-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-red-700"
                >
                  Confirm delete
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
