
"use client";

import { useMemo, useState } from "react";
import {
  Search,
  Plus,
  Download,
  Users,
  UserCheck,
  UserX,
  Wallet,
  Eye,
  Pencil,
  X,
  ChevronLeft,
  ChevronRight,
  Mail,
  Phone,
  MapPin,
  ShoppingBag,
  CalendarDays,
  SlidersHorizontal,
} from "lucide-react";

const PRIMARY = "#92003A";
const PAGE_SIZE = 8;

type CustomerStatus = "Active" | "Inactive" | "Blocked";

type Customer = {
  id: string;
  name: string;
  email: string;
  phone: string;
  city: string;
  address: string;
  orders: number;
  totalSpent: number;
  status: CustomerStatus;
  joinedAt: string;
  lastOrder: string;
};

const initialCustomers: Customer[] = [
  {
    id: "CUS-1001",
    name: "Nusrat Jahan",
    email: "nusrat@example.com",
    phone: "01712345678",
    city: "Dhaka",
    address: "Uttara, Dhaka",
    orders: 12,
    totalSpent: 18450,
    status: "Active",
    joinedAt: "2026-01-12",
    lastOrder: "2026-10-25",
  },
  {
    id: "CUS-1002",
    name: "Tanvir Ahmed",
    email: "tanvir@example.com",
    phone: "01812345678",
    city: "Gazipur",
    address: "Tongi, Gazipur",
    orders: 8,
    totalSpent: 12300,
    status: "Active",
    joinedAt: "2026-02-03",
    lastOrder: "2026-10-22",
  },
  {
    id: "CUS-1003",
    name: "Sadman Rahman",
    email: "sadman@example.com",
    phone: "01912345678",
    city: "Chattogram",
    address: "Agrabad, Chattogram",
    orders: 0,
    totalSpent: 0,
    status: "Inactive",
    joinedAt: "2026-04-18",
    lastOrder: "—",
  },
  {
    id: "CUS-1004",
    name: "Mim Akter",
    email: "mim@example.com",
    phone: "01612345678",
    city: "Dhaka",
    address: "Mirpur, Dhaka",
    orders: 15,
    totalSpent: 26700,
    status: "Active",
    joinedAt: "2025-12-09",
    lastOrder: "2026-10-26",
  },
  {
    id: "CUS-1005",
    name: "Arif Hossain",
    email: "arif@example.com",
    phone: "01512345678",
    city: "Sylhet",
    address: "Zindabazar, Sylhet",
    orders: 3,
    totalSpent: 4250,
    status: "Blocked",
    joinedAt: "2026-05-21",
    lastOrder: "2026-08-14",
  },
  {
    id: "CUS-1006",
    name: "Sadia Islam",
    email: "sadia@example.com",
    phone: "01722334455",
    city: "Dhaka",
    address: "Dhanmondi, Dhaka",
    orders: 6,
    totalSpent: 9800,
    status: "Active",
    joinedAt: "2026-03-11",
    lastOrder: "2026-10-19",
  },
  {
    id: "CUS-1007",
    name: "Fahim Chowdhury",
    email: "fahim@example.com",
    phone: "01822334455",
    city: "Rajshahi",
    address: "Shaheb Bazar, Rajshahi",
    orders: 2,
    totalSpent: 2100,
    status: "Inactive",
    joinedAt: "2026-06-15",
    lastOrder: "2026-07-10",
  },
  {
    id: "CUS-1008",
    name: "Jannatul Ferdous",
    email: "jannatul@example.com",
    phone: "01922334455",
    city: "Khulna",
    address: "Sonadanga, Khulna",
    orders: 10,
    totalSpent: 15600,
    status: "Active",
    joinedAt: "2026-01-27",
    lastOrder: "2026-10-24",
  },
  {
    id: "CUS-1009",
    name: "Rafiul Karim",
    email: "rafiul@example.com",
    phone: "01622334455",
    city: "Barishal",
    address: "Nathullabad, Barishal",
    orders: 1,
    totalSpent: 1250,
    status: "Active",
    joinedAt: "2026-07-02",
    lastOrder: "2026-09-08",
  },
  {
    id: "CUS-1010",
    name: "Samia Sultana",
    email: "samia@example.com",
    phone: "01522334455",
    city: "Dhaka",
    address: "Bashundhara, Dhaka",
    orders: 0,
    totalSpent: 0,
    status: "Inactive",
    joinedAt: "2026-08-20",
    lastOrder: "—",
  },
];

const money = (amount: number) =>
  new Intl.NumberFormat("en-BD", {
    style: "currency",
    currency: "BDT",
    maximumFractionDigits: 0,
  }).format(amount);

const date = (value: string) => {
  if (value === "—") return value;
  return new Date(`${value}T00:00:00`).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

function getInitials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

function exportCSV(customers: Customer[]) {
  const columns: (keyof Customer)[] = [
    "id",
    "name",
    "email",
    "phone",
    "city",
    "orders",
    "totalSpent",
    "status",
    "joinedAt",
    "lastOrder",
  ];

  const escapeCSV = (value: unknown) =>
    `"${String(value ?? "").replace(/"/g, '""')}"`;

  const csv = [
    columns.join(","),
    ...customers.map((customer) =>
      columns.map((key) => escapeCSV(customer[key])).join(","),
    ),
  ].join("\r\n");

  const blob = new Blob(["\uFEFF" + csv], {
    type: "text/csv;charset=utf-8;",
  });

  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "customers.csv";
  link.click();
  URL.revokeObjectURL(url);
}

function StatusBadge({ status }: { status: CustomerStatus }) {
  const styles: Record<CustomerStatus, string> = {
    Active: "bg-green-50 text-green-700 ring-green-600/20",
    Inactive: "bg-gray-100 text-gray-600 ring-gray-500/20",
    Blocked: "bg-red-50 text-red-700 ring-red-600/20",
  };

  return (
    <span
      className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ring-inset ${styles[status]}`}
    >
      {status}
    </span>
  );
}

function CustomerModal({
  customer,
  onClose,
  onSave,
}: {
  customer: Customer | null;
  onClose: () => void;
  onSave: (customer: Customer) => void;
}) {
  const [form, setForm] = useState<Customer>(
    customer ?? {
      id: `CUS-${Date.now().toString().slice(-6)}`,
      name: "",
      email: "",
      phone: "",
      city: "",
      address: "",
      orders: 0,
      totalSpent: 0,
      status: "Active",
      joinedAt: new Date().toISOString().slice(0, 10),
      lastOrder: "—",
    },
  );

  const [mode, setMode] = useState<"details" | "edit">(
    customer ? "details" : "edit",
  );

  const fieldClass =
    "mt-1.5 w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-[#92003A] focus:ring-2 focus:ring-[#92003A]/10";

  function set<K extends keyof Customer>(key: K, value: Customer[K]) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-gray-950/40 p-4 backdrop-blur-[2px]"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="customer-modal-title"
        className="max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-2xl bg-white shadow-2xl"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4 sm:px-6">
          <div>
            <h2
              id="customer-modal-title"
              className="text-lg font-bold text-gray-900"
            >
              {customer
                ? mode === "edit"
                  ? "Edit Customer"
                  : "Customer Details"
                : "Add Customer"}
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              {customer?.id ?? "Create a new customer record"}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-gray-500 hover:bg-gray-100"
            aria-label="Close"
          >
            <X size={19} />
          </button>
        </div>

        <div className="space-y-5 p-5 sm:p-6">
          {mode === "details" ? (
            <>
              <div className="flex items-center gap-4">
                <div
                  className="flex h-14 w-14 items-center justify-center rounded-2xl text-lg font-bold"
                  style={{ backgroundColor: `${PRIMARY}12`, color: PRIMARY }}
                >
                  {getInitials(form.name)}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900">
                    {form.name}
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">{form.email}</p>
                  <div className="mt-2">
                    <StatusBadge status={form.status} />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-xl bg-gray-50 p-4">
                  <p className="text-xs text-gray-500">Total Orders</p>
                  <p className="mt-2 text-xl font-bold text-gray-900">
                    {form.orders}
                  </p>
                </div>
                <div className="rounded-xl bg-gray-50 p-4">
                  <p className="text-xs text-gray-500">Total Spent</p>
                  <p className="mt-2 text-xl font-bold text-gray-900">
                    {money(form.totalSpent)}
                  </p>
                </div>
              </div>

              <div className="space-y-4 text-sm">
                <p className="flex items-center gap-3 text-gray-600">
                  <Mail size={17} />
                  {form.email}
                </p>
                <p className="flex items-center gap-3 text-gray-600">
                  <Phone size={17} />
                  {form.phone || "No phone number"}
                </p>
                <p className="flex items-center gap-3 text-gray-600">
                  <MapPin size={17} />
                  {form.address || form.city || "No address"}
                </p>
                <p className="flex items-center gap-3 text-gray-600">
                  <CalendarDays size={17} />
                  Joined {date(form.joinedAt)}
                </p>
                <p className="flex items-center gap-3 text-gray-600">
                  <ShoppingBag size={17} />
                  Last order: {date(form.lastOrder)}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setMode("edit")}
                className="w-full rounded-lg px-4 py-2.5 text-sm font-semibold text-white"
                style={{ backgroundColor: PRIMARY }}
              >
                Edit Customer
              </button>
            </>
          ) : (
            <form
              onSubmit={(event) => {
                event.preventDefault();
                onSave(form);
              }}
              className="space-y-4"
            >
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="text-sm font-medium text-gray-700">
                  Full Name *
                  <input
                    required
                    value={form.name}
                    onChange={(e) => set("name", e.target.value)}
                    className={fieldClass}
                  />
                </label>
                <label className="text-sm font-medium text-gray-700">
                  Email *
                  <input
                    required
                    type="email"
                    value={form.email}
                    onChange={(e) => set("email", e.target.value)}
                    className={fieldClass}
                  />
                </label>
                <label className="text-sm font-medium text-gray-700">
                  Phone
                  <input
                    value={form.phone}
                    onChange={(e) => set("phone", e.target.value)}
                    className={fieldClass}
                  />
                </label>
                <label className="text-sm font-medium text-gray-700">
                  City
                  <input
                    value={form.city}
                    onChange={(e) => set("city", e.target.value)}
                    className={fieldClass}
                  />
                </label>
                <label className="text-sm font-medium text-gray-700 sm:col-span-2">
                  Address
                  <textarea
                    rows={2}
                    value={form.address}
                    onChange={(e) => set("address", e.target.value)}
                    className={fieldClass}
                  />
                </label>
                <label className="text-sm font-medium text-gray-700">
                  Status
                  <select
                    value={form.status}
                    onChange={(e) =>
                      set("status", e.target.value as CustomerStatus)
                    }
                    className={fieldClass}
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                    <option value="Blocked">Blocked</option>
                  </select>
                </label>
              </div>

              <div className="flex gap-3 border-t border-gray-100 pt-4">
                <button
                  type="button"
                  onClick={() => (customer ? setMode("details") : onClose())}
                  className="flex-1 rounded-lg border border-gray-200 px-4 py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 rounded-lg px-4 py-2.5 text-sm font-semibold text-white"
                  style={{ backgroundColor: PRIMARY }}
                >
                  Save Customer
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default function CustomersPage() {
  const [customers, setCustomers] = useState(initialCustomers);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");
  const [sortBy, setSortBy] = useState("newest");
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState<Customer | null>(null);
  const [showAdd, setShowAdd] = useState(false);

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();

    const result = customers.filter((customer) => {
      const matchesSearch = [
        customer.id,
        customer.name,
        customer.email,
        customer.phone,
        customer.city,
      ].some((value) => value.toLowerCase().includes(query));

      const matchesStatus = status === "All" || customer.status === status;
      return matchesSearch && matchesStatus;
    });

    return result.sort((a, b) => {
      if (sortBy === "name") return a.name.localeCompare(b.name);
      if (sortBy === "spent") return b.totalSpent - a.totalSpent;
      return b.joinedAt.localeCompare(a.joinedAt);
    });
  }, [customers, search, status, sortBy]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const visibleCustomers = filtered.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE,
  );

  const activeCount = customers.filter((c) => c.status === "Active").length;
  const inactiveCount = customers.filter((c) => c.status === "Inactive").length;
  const totalSpent = customers.reduce((sum, c) => sum + c.totalSpent, 0);

  function saveCustomer(customer: Customer) {
    setCustomers((current) => {
      const exists = current.some((item) => item.id === customer.id);
      return exists
        ? current.map((item) => (item.id === customer.id ? customer : item))
        : [customer, ...current];
    });
    setSelected(null);
    setShowAdd(false);
  }

  const selectClass =
    "rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-700 outline-none focus:border-[#92003A]";

  return (
    <main className="min-h-screen bg-gray-50/70 p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-7 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <div className="mb-2 text-sm text-gray-500">
              Dashboard / Customers
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-gray-950 sm:text-3xl">
              Customers
            </h1>
            <p className="mt-2 text-sm text-gray-500">
              Manage customer profiles, activity and purchase history.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => exportCSV(filtered)}
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-50"
            >
              <Download size={16} /> Export CSV
            </button>
            <button
              type="button"
              onClick={() => setShowAdd(true)}
              className="inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:opacity-90"
              style={{ backgroundColor: PRIMARY }}
            >
              <Plus size={17} /> Add Customer
            </button>
          </div>
        </div>

        {/* Summary cards */}
        <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {[
            {
              label: "Total Customers",
              value: customers.length.toLocaleString(),
              note: "All registered customers",
              icon: Users,
            },
            {
              label: "Active Customers",
              value: activeCount.toLocaleString(),
              note: "Currently active",
              icon: UserCheck,
            },
            {
              label: "Inactive Customers",
              value: inactiveCount.toLocaleString(),
              note: "No recent activity",
              icon: UserX,
            },
            {
              label: "Customer Revenue",
              value: money(totalSpent),
              note: "Total demo purchase value",
              icon: Wallet,
            },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.label}
                className="rounded-xl border border-gray-200 bg-white p-5"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-500">
                      {item.label}
                    </p>
                    <p className="mt-3 text-2xl font-bold tracking-tight text-gray-950">
                      {item.value}
                    </p>
                  </div>
                  <div
                    className="rounded-xl p-3"
                    style={{ backgroundColor: `${PRIMARY}10`, color: PRIMARY }}
                  >
                    <Icon size={21} />
                  </div>
                </div>
                <p className="mt-3 text-xs text-gray-400">{item.note}</p>
              </div>
            );
          })}
        </div>

        {/* Table */}
        <section className="overflow-hidden rounded-xl border border-gray-200 bg-white">
          <div className="flex flex-col gap-4 border-b border-gray-100 p-4 sm:p-5 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h2 className="font-semibold text-gray-900">All Customers</h2>
              <p className="mt-1 text-sm text-gray-500">
                {filtered.length} customer{filtered.length !== 1 ? "s" : ""}{" "}
                found
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <div className="relative flex-1 sm:min-w-64">
                <Search
                  size={17}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />
                <input
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                    setPage(1);
                  }}
                  placeholder="Search name, email, phone..."
                  className="w-full rounded-lg border border-gray-200 py-2.5 pl-9 pr-3 text-sm outline-none focus:border-[#92003A]"
                />
              </div>

              <div className="flex items-center gap-2">
                <SlidersHorizontal size={16} className="text-gray-400" />
                <select
                  value={status}
                  onChange={(e) => {
                    setStatus(e.target.value);
                    setPage(1);
                  }}
                  className={selectClass}
                  aria-label="Filter by status"
                >
                  <option value="All">All Status</option>
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                  <option value="Blocked">Blocked</option>
                </select>
              </div>

              <select
                value={sortBy}
                onChange={(e) => {
                  setSortBy(e.target.value);
                  setPage(1);
                }}
                className={selectClass}
                aria-label="Sort customers"
              >
                <option value="newest">Newest First</option>
                <option value="name">Name A–Z</option>
                <option value="spent">Highest Spent</option>
              </select>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[900px] text-left">
              <thead className="bg-gray-50/80">
                <tr className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                  <th className="px-5 py-3.5">Customer</th>
                  <th className="px-4 py-3.5">Phone</th>
                  <th className="px-4 py-3.5">Orders</th>
                  <th className="px-4 py-3.5">Total Spent</th>
                  <th className="px-4 py-3.5">Joined</th>
                  <th className="px-4 py-3.5">Status</th>
                  <th className="px-5 py-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {visibleCustomers.map((customer) => (
                  <tr
                    key={customer.id}
                    className="transition hover:bg-gray-50/70"
                  >
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div
                          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-bold"
                          style={{
                            backgroundColor: `${PRIMARY}10`,
                            color: PRIMARY,
                          }}
                        >
                          {getInitials(customer.name)}
                        </div>
                        <div className="min-w-0">
                          <p className="truncate text-sm font-semibold text-gray-900">
                            {customer.name}
                          </p>
                          <p className="mt-1 truncate text-xs text-gray-500">
                            {customer.email}
                          </p>
                          <p className="mt-1 text-[11px] text-gray-400">
                            {customer.id}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-600">
                      {customer.phone || "—"}
                    </td>
                    <td className="px-4 py-4 text-sm font-medium text-gray-800">
                      {customer.orders}
                    </td>
                    <td className="px-4 py-4 text-sm font-semibold text-gray-900">
                      {money(customer.totalSpent)}
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-600">
                      {date(customer.joinedAt)}
                    </td>
                    <td className="px-4 py-4">
                      <StatusBadge status={customer.status} />
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex justify-end gap-1">
                        <button
                          type="button"
                          title="View customer"
                          onClick={() => setSelected(customer)}
                          className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-900"
                        >
                          <Eye size={17} />
                        </button>
                        <button
                          type="button"
                          title="Edit customer"
                          onClick={() => {
                            setSelected(customer);
                          }}
                          className="rounded-lg p-2 hover:bg-gray-100"
                          style={{ color: PRIMARY }}
                        >
                          <Pencil size={17} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}

                {visibleCustomers.length === 0 && (
                  <tr>
                    <td colSpan={7} className="px-5 py-16 text-center">
                      <Users size={30} className="mx-auto text-gray-300" />
                      <p className="mt-3 text-sm font-semibold text-gray-700">
                        No customers found
                      </p>
                      <p className="mt-1 text-sm text-gray-500">
                        Try a different search or filter.
                      </p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex flex-col gap-3 border-t border-gray-100 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-5">
            <p className="text-sm text-gray-500">
              Showing{" "}
              <span className="font-semibold text-gray-800">
                {filtered.length === 0 ? 0 : (currentPage - 1) * PAGE_SIZE + 1}
                {"–"}
                {Math.min(currentPage * PAGE_SIZE, filtered.length)}
              </span>{" "}
              of{" "}
              <span className="font-semibold text-gray-800">
                {filtered.length}
              </span>{" "}
              customers
            </p>

            <div className="flex items-center gap-2">
              <button
                type="button"
                disabled={currentPage <= 1}
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                className="rounded-lg border border-gray-200 p-2 text-gray-600 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
                aria-label="Previous page"
              >
                <ChevronLeft size={17} />
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (number) => (
                  <button
                    key={number}
                    type="button"
                    onClick={() => setPage(number)}
                    className={`h-9 min-w-9 rounded-lg px-2 text-sm font-semibold ${currentPage === number ? "text-white" : "border border-gray-200 text-gray-600 hover:bg-gray-50"}`}
                    style={
                      currentPage === number
                        ? { backgroundColor: PRIMARY }
                        : undefined
                    }
                  >
                    {number}
                  </button>
                ),
              )}
              <button
                type="button"
                disabled={currentPage >= totalPages}
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                className="rounded-lg border border-gray-200 p-2 text-gray-600 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
                aria-label="Next page"
              >
                <ChevronRight size={17} />
              </button>
            </div>
          </div>
        </section>
      </div>

      {(selected || showAdd) && (
        <CustomerModal
          key={selected?.id ?? (showAdd ? "new-customer" : "closed")}
          customer={selected}
          onClose={() => {
            setSelected(null);
            setShowAdd(false);
          }}
          onSave={saveCustomer}
        />
      )}
    </main>
  );
}
