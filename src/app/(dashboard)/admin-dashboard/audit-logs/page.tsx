
"use client";

import { useMemo, useState } from "react";
import {
  Search,
  Download,
  ShieldCheck,
  Activity,
  AlertTriangle,
  CircleX,
  Eye,
  X,
  ChevronLeft,
  ChevronRight,
  Clock,
  UserRound,
  FileText,
  Filter,
  RefreshCw,
  CheckCircle2,
} from "lucide-react";

const PRIMARY = "#92003A";
const PAGE_SIZE = 8;

type ActionType =
  | "CREATE"
  | "UPDATE"
  | "DELETE"
  | "LOGIN"
  | "LOGOUT"
  | "REFUND"
  | "SETTINGS_UPDATE";

type Severity = "Info" | "Warning" | "Critical";

type AuditLog = {
  id: string;
  actor: string;
  email: string;
  role: string;
  action: ActionType;
  resource: string;
  resourceId: string;
  description: string;
  severity: Severity;
  ipAddress: string;
  userAgent: string;
  createdAt: string;
  metadata: Record<string, string>;
};

const initialLogs: AuditLog[] = [
  {
    id: "LOG-1001",
    actor: "Rakibul Islam",
    email: "admin@example.com",
    role: "Super Admin",
    action: "LOGIN",
    resource: "Authentication",
    resourceId: "AUTH-801",
    description: "Successfully signed in to the admin dashboard.",
    severity: "Info",
    ipAddress: "192.0.2.14",
    userAgent: "Chrome / Windows",
    createdAt: "2026-10-28T14:32:00",
    metadata: { method: "Email and password", result: "Success" },
  },
  {
    id: "LOG-1002",
    actor: "Rakibul Islam",
    email: "admin@example.com",
    role: "Super Admin",
    action: "CREATE",
    resource: "Product",
    resourceId: "PRD-2041",
    description: "Created a new product.",
    severity: "Info",
    ipAddress: "192.0.2.14",
    userAgent: "Chrome / Windows",
    createdAt: "2026-10-28T14:18:00",
    metadata: { productName: "Classic Cotton Shirt", status: "Draft" },
  },
  {
    id: "LOG-1003",
    actor: "Nusrat Jahan",
    email: "nusrat@example.com",
    role: "Manager",
    action: "UPDATE",
    resource: "Order",
    resourceId: "ORD-1058",
    description: "Updated the order fulfillment status.",
    severity: "Info",
    ipAddress: "198.51.100.22",
    userAgent: "Firefox / Windows",
    createdAt: "2026-10-28T13:55:00",
    metadata: { previousStatus: "Processing", newStatus: "Shipped" },
  },
  {
    id: "LOG-1004",
    actor: "Tanvir Ahmed",
    email: "tanvir@example.com",
    role: "Staff",
    action: "DELETE",
    resource: "Category",
    resourceId: "CAT-008",
    description: "Deleted a product category.",
    severity: "Warning",
    ipAddress: "203.0.113.8",
    userAgent: "Chrome / Android",
    createdAt: "2026-10-28T13:21:00",
    metadata: { categoryName: "Old Collection", result: "Deleted" },
  },
  {
    id: "LOG-1005",
    actor: "System",
    email: "system@internal",
    role: "System",
    action: "REFUND",
    resource: "Payment",
    resourceId: "PAY-3092",
    description: "A refund was marked as completed.",
    severity: "Warning",
    ipAddress: "127.0.0.1",
    userAgent: "Internal service",
    createdAt: "2026-10-28T12:40:00",
    metadata: { orderId: "ORD-1039", amount: "৳2,450", status: "Demo event" },
  },
  {
    id: "LOG-1006",
    actor: "Nusrat Jahan",
    email: "nusrat@example.com",
    role: "Manager",
    action: "SETTINGS_UPDATE",
    resource: "Store Settings",
    resourceId: "SET-GEN",
    description: "Updated general store settings.",
    severity: "Warning",
    ipAddress: "198.51.100.22",
    userAgent: "Firefox / Windows",
    createdAt: "2026-10-28T12:08:00",
    metadata: { changedFields: "Store email, timezone", result: "Updated" },
  },
  {
    id: "LOG-1007",
    actor: "Arif Hossain",
    email: "arif@example.com",
    role: "Staff",
    action: "LOGIN",
    resource: "Authentication",
    resourceId: "AUTH-802",
    description: "Failed login attempt.",
    severity: "Critical",
    ipAddress: "203.0.113.51",
    userAgent: "Unknown browser",
    createdAt: "2026-10-28T11:49:00",
    metadata: { method: "Email and password", result: "Invalid credentials" },
  },
  {
    id: "LOG-1008",
    actor: "Rakibul Islam",
    email: "admin@example.com",
    role: "Super Admin",
    action: "UPDATE",
    resource: "Customer",
    resourceId: "CUS-1004",
    description: "Updated a customer profile.",
    severity: "Info",
    ipAddress: "192.0.2.14",
    userAgent: "Chrome / Windows",
    createdAt: "2026-10-28T11:20:00",
    metadata: { customerId: "CUS-1004", changedFields: "Address" },
  },
  {
    id: "LOG-1009",
    actor: "System",
    email: "system@internal",
    role: "System",
    action: "DELETE",
    resource: "Session",
    resourceId: "SES-221",
    description: "An expired session was removed.",
    severity: "Info",
    ipAddress: "127.0.0.1",
    userAgent: "Scheduled job",
    createdAt: "2026-10-28T10:40:00",
    metadata: { reason: "Session expiration", result: "Cleaned up" },
  },
  {
    id: "LOG-1010",
    actor: "Tanvir Ahmed",
    email: "tanvir@example.com",
    role: "Staff",
    action: "LOGOUT",
    resource: "Authentication",
    resourceId: "AUTH-799",
    description: "Signed out of the dashboard.",
    severity: "Info",
    ipAddress: "203.0.113.8",
    userAgent: "Chrome / Android",
    createdAt: "2026-10-28T10:15:00",
    metadata: { result: "Success" },
  },
  {
    id: "LOG-1011",
    actor: "Rakibul Islam",
    email: "admin@example.com",
    role: "Super Admin",
    action: "UPDATE",
    resource: "Product",
    resourceId: "PRD-2012",
    description: "Changed product price and stock.",
    severity: "Info",
    ipAddress: "192.0.2.14",
    userAgent: "Chrome / Windows",
    createdAt: "2026-10-27T18:12:00",
    metadata: { previousPrice: "৳1,200", newPrice: "৳1,050", stock: "25" },
  },
  {
    id: "LOG-1012",
    actor: "Nusrat Jahan",
    email: "nusrat@example.com",
    role: "Manager",
    action: "CREATE",
    resource: "Coupon",
    resourceId: "CPN-017",
    description: "Created a discount coupon.",
    severity: "Info",
    ipAddress: "198.51.100.22",
    userAgent: "Firefox / Windows",
    createdAt: "2026-10-27T16:45:00",
    metadata: { code: "OCT10", discount: "10%" },
  },
];

function formatDate(value: string) {
  return new Date(value).toLocaleString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
}

function ActionBadge({ action }: { action: ActionType }) {
  const styles: Record<ActionType, string> = {
    CREATE: "bg-green-50 text-green-700",
    UPDATE: "bg-blue-50 text-blue-700",
    DELETE: "bg-red-50 text-red-700",
    LOGIN: "bg-violet-50 text-violet-700",
    LOGOUT: "bg-gray-100 text-gray-700",
    REFUND: "bg-amber-50 text-amber-700",
    SETTINGS_UPDATE: "bg-pink-50 text-pink-700",
  };

  return (
    <span
      className={`inline-flex whitespace-nowrap rounded-md px-2 py-1 text-[11px] font-bold ${styles[action]}`}
    >
      {action.replace("_", " ")}
    </span>
  );
}

function SeverityBadge({ severity }: { severity: Severity }) {
  const styles: Record<Severity, string> = {
    Info: "bg-gray-100 text-gray-600",
    Warning: "bg-amber-50 text-amber-700",
    Critical: "bg-red-50 text-red-700",
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ${styles[severity]}`}
    >
      {severity === "Critical" ? (
        <CircleX size={12} />
      ) : severity === "Warning" ? (
        <AlertTriangle size={12} />
      ) : (
        <span className="h-1.5 w-1.5 rounded-full bg-current" />
      )}
      {severity}
    </span>
  );
}

function exportLogs(logs: AuditLog[]) {
  const columns: (keyof AuditLog)[] = [
    "id",
    "actor",
    "email",
    "role",
    "action",
    "resource",
    "resourceId",
    "description",
    "severity",
    "ipAddress",
    "createdAt",
  ];

  const escapeCSV = (value: unknown) =>
    `"${String(value ?? "").replace(/"/g, '""')}"`;

  const csv = [
    columns.join(","),
    ...logs.map((log) => columns.map((key) => escapeCSV(log[key])).join(",")),
  ].join("\r\n");

  const blob = new Blob(["\uFEFF" + csv], {
    type: "text/csv;charset=utf-8;",
  });

  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "audit-logs.csv";
  link.click();
  URL.revokeObjectURL(url);
}

function LogDetails({ log, onClose }: { log: AuditLog; onClose: () => void }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-gray-950/40 p-4 backdrop-blur-[2px]"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="audit-detail-title"
        className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white shadow-2xl"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4 sm:px-6">
          <div>
            <h2
              id="audit-detail-title"
              className="text-lg font-bold text-gray-900"
            >
              Audit Log Details
            </h2>
            <p className="mt-1 text-sm text-gray-500">{log.id}</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close details"
            className="rounded-lg p-2 text-gray-500 hover:bg-gray-100"
          >
            <X size={19} />
          </button>
        </div>

        <div className="space-y-6 p-5 sm:p-6">
          <div className="flex flex-wrap items-center gap-2">
            <ActionBadge action={log.action} />
            <SeverityBadge severity={log.severity} />
          </div>

          <div className="rounded-xl border border-gray-100 bg-gray-50 p-4">
            <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
              Event Description
            </p>
            <p className="mt-2 text-sm leading-6 text-gray-800">
              {log.description}
            </p>
          </div>

          <div>
            <h3 className="mb-3 text-sm font-semibold text-gray-900">
              Actor Information
            </h3>
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                ["Name", log.actor],
                ["Email", log.email],
                ["Role", log.role],
                ["IP Address", log.ipAddress],
              ].map(([label, value]) => (
                <div
                  key={label}
                  className="rounded-lg border border-gray-100 p-3"
                >
                  <p className="text-xs text-gray-400">{label}</p>
                  <p className="mt-1 break-words text-sm font-medium text-gray-800">
                    {value}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="mb-3 text-sm font-semibold text-gray-900">
              Resource Information
            </h3>
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                ["Resource", log.resource],
                ["Resource ID", log.resourceId],
                ["Timestamp", formatDate(log.createdAt)],
                ["User Agent", log.userAgent],
              ].map(([label, value]) => (
                <div
                  key={label}
                  className="rounded-lg border border-gray-100 p-3"
                >
                  <p className="text-xs text-gray-400">{label}</p>
                  <p className="mt-1 break-words text-sm font-medium text-gray-800">
                    {value}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="mb-3 text-sm font-semibold text-gray-900">
              Event Metadata
            </h3>
            <div className="overflow-hidden rounded-xl border border-gray-200">
              {Object.entries(log.metadata).map(([key, value]) => (
                <div
                  key={key}
                  className="grid grid-cols-[minmax(100px,0.8fr)_minmax(0,1.2fr)] gap-4 border-b border-gray-100 px-4 py-3 last:border-0"
                >
                  <span className="break-words text-sm text-gray-500">
                    {key}
                  </span>
                  <span className="break-words text-right text-sm font-medium text-gray-800">
                    {value}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <p className="text-xs leading-5 text-gray-400">
            Demo data only. Production audit events should be written and
            retained by the backend.
          </p>
        </div>
      </div>
    </div>
  );
}

export default function AuditLogsPage() {
  const [logs] = useState(initialLogs);
  const [search, setSearch] = useState("");
  const [action, setAction] = useState("All");
  const [severity, setSeverity] = useState("All");
  const [dateRange, setDateRange] = useState("all");
  const [page, setPage] = useState(1);
  const [selectedLog, setSelectedLog] = useState<AuditLog | null>(null);

  const filteredLogs = useMemo(() => {
    const query = search.trim().toLowerCase();
    const now = new Date("2026-10-28T23:59:59");
    const start = new Date(now);

    if (dateRange === "today") start.setHours(0, 0, 0, 0);
    if (dateRange === "7days") start.setDate(start.getDate() - 7);
    if (dateRange === "30days") start.setDate(start.getDate() - 30);

    return logs
      .filter((log) => {
        const matchesSearch = [
          log.id,
          log.actor,
          log.email,
          log.action,
          log.resource,
          log.resourceId,
          log.description,
          log.ipAddress,
        ].some((value) => value.toLowerCase().includes(query));

        const matchesAction = action === "All" || log.action === action;
        const matchesSeverity = severity === "All" || log.severity === severity;
        const createdAt = new Date(log.createdAt);
        const matchesDate =
          dateRange === "all" || (createdAt >= start && createdAt <= now);

        return matchesSearch && matchesAction && matchesSeverity && matchesDate;
      })
      .sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      );
  }, [logs, search, action, severity, dateRange]);

  const totalPages = Math.max(1, Math.ceil(filteredLogs.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const visibleLogs = filteredLogs.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE,
  );

  const criticalCount = logs.filter(
    (log) => log.severity === "Critical",
  ).length;
  const warningCount = logs.filter((log) => log.severity === "Warning").length;

  function resetFilters() {
    setSearch("");
    setAction("All");
    setSeverity("All");
    setDateRange("all");
    setPage(1);
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
              Dashboard / Security / Audit Logs
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-gray-950 sm:text-3xl">
              Audit Logs
            </h1>
            <p className="mt-2 text-sm text-gray-500">
              Track user activity and review important system events.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={resetFilters}
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-50"
            >
              <RefreshCw size={16} />
              Reset Filters
            </button>
            <button
              type="button"
              onClick={() => exportLogs(filteredLogs)}
              className="inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold text-white hover:opacity-90"
              style={{ backgroundColor: PRIMARY }}
            >
              <Download size={16} />
              Export CSV
            </button>
          </div>
        </div>

        {/* Summary */}
        <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {[
            {
              label: "Total Events",
              value: logs.length,
              description: "Recorded demo events",
              icon: Activity,
            },
            {
              label: "Critical Events",
              value: criticalCount,
              description: "Require investigation",
              icon: CircleX,
            },
            {
              label: "Warnings",
              value: warningCount,
              description: "Events to review",
              icon: AlertTriangle,
            },
            {
              label: "Audit Protection",
              value: "Enabled*",
              description: "UI preview only",
              icon: ShieldCheck,
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
                    style={{
                      backgroundColor: `${PRIMARY}10`,
                      color: PRIMARY,
                    }}
                  >
                    <Icon size={21} />
                  </div>
                </div>
                <p className="mt-3 text-xs text-gray-400">{item.description}</p>
              </div>
            );
          })}
        </div>

        {/* Filters and table */}
        <section className="overflow-hidden rounded-xl border border-gray-200 bg-white">
          <div className="border-b border-gray-100 p-4 sm:p-5">
            <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
              <div>
                <h2 className="font-semibold text-gray-900">
                  Activity History
                </h2>
                <p className="mt-1 text-sm text-gray-500">
                  {filteredLogs.length} event
                  {filteredLogs.length !== 1 ? "s" : ""} found
                </p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <div className="relative sm:min-w-64">
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
                    placeholder="Search activity..."
                    className="w-full rounded-lg border border-gray-200 py-2.5 pl-9 pr-3 text-sm outline-none focus:border-[#92003A]"
                  />
                </div>

                <select
                  value={action}
                  onChange={(e) => {
                    setAction(e.target.value);
                    setPage(1);
                  }}
                  className={selectClass}
                  aria-label="Filter by action"
                >
                  <option value="All">All Actions</option>
                  <option value="CREATE">Create</option>
                  <option value="UPDATE">Update</option>
                  <option value="DELETE">Delete</option>
                  <option value="LOGIN">Login</option>
                  <option value="LOGOUT">Logout</option>
                  <option value="REFUND">Refund</option>
                  <option value="SETTINGS_UPDATE">Settings Update</option>
                </select>

                <select
                  value={severity}
                  onChange={(e) => {
                    setSeverity(e.target.value);
                    setPage(1);
                  }}
                  className={selectClass}
                  aria-label="Filter by severity"
                >
                  <option value="All">All Severities</option>
                  <option value="Info">Info</option>
                  <option value="Warning">Warning</option>
                  <option value="Critical">Critical</option>
                </select>

                <select
                  value={dateRange}
                  onChange={(e) => {
                    setDateRange(e.target.value);
                    setPage(1);
                  }}
                  className={selectClass}
                  aria-label="Filter by date"
                >
                  <option value="all">All Dates</option>
                  <option value="today">Today</option>
                  <option value="7days">Last 7 Days</option>
                  <option value="30days">Last 30 Days</option>
                </select>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[1050px] text-left">
              <thead className="bg-gray-50/80">
                <tr className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                  <th className="px-5 py-3.5">Event</th>
                  <th className="px-4 py-3.5">Actor</th>
                  <th className="px-4 py-3.5">Action</th>
                  <th className="px-4 py-3.5">Resource</th>
                  <th className="px-4 py-3.5">Severity</th>
                  <th className="px-4 py-3.5">Timestamp</th>
                  <th className="px-5 py-3.5 text-right">Details</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {visibleLogs.map((log) => (
                  <tr key={log.id} className="transition hover:bg-gray-50/70">
                    <td className="px-5 py-4">
                      <div className="flex items-start gap-3">
                        <div
                          className="mt-0.5 rounded-lg p-2"
                          style={{
                            backgroundColor: `${PRIMARY}10`,
                            color: PRIMARY,
                          }}
                        >
                          <FileText size={16} />
                        </div>
                        <div className="max-w-64">
                          <p className="text-sm font-semibold text-gray-900">
                            {log.id}
                          </p>
                          <p className="mt-1 line-clamp-2 text-xs leading-5 text-gray-500">
                            {log.description}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-2.5">
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gray-100 text-gray-600">
                          <UserRound size={15} />
                        </div>
                        <div>
                          <p className="whitespace-nowrap text-sm font-medium text-gray-800">
                            {log.actor}
                          </p>
                          <p className="mt-1 text-xs text-gray-400">
                            {log.role}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <ActionBadge action={log.action} />
                    </td>
                    <td className="px-4 py-4">
                      <p className="text-sm font-medium text-gray-800">
                        {log.resource}
                      </p>
                      <p className="mt-1 text-xs text-gray-400">
                        {log.resourceId}
                      </p>
                    </td>
                    <td className="px-4 py-4">
                      <SeverityBadge severity={log.severity} />
                    </td>
                    <td className="whitespace-nowrap px-4 py-4 text-sm text-gray-600">
                      {formatDate(log.createdAt)}
                    </td>
                    <td className="px-5 py-4 text-right">
                      <button
                        type="button"
                        onClick={() => setSelectedLog(log)}
                        className="inline-flex items-center gap-2 rounded-lg border border-gray-200 px-3 py-2 text-xs font-semibold text-gray-700 hover:border-gray-300 hover:bg-gray-50"
                      >
                        <Eye size={15} />
                        View
                      </button>
                    </td>
                  </tr>
                ))}

                {visibleLogs.length === 0 && (
                  <tr>
                    <td colSpan={7} className="px-5 py-16 text-center">
                      <Filter size={30} className="mx-auto text-gray-300" />
                      <p className="mt-3 text-sm font-semibold text-gray-700">
                        No audit events found
                      </p>
                      <p className="mt-1 text-sm text-gray-500">
                        Try changing your search or filters.
                      </p>
                      <button
                        type="button"
                        onClick={resetFilters}
                        className="mt-4 text-sm font-semibold hover:underline"
                        style={{ color: PRIMARY }}
                      >
                        Clear filters
                      </button>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="flex flex-col gap-3 border-t border-gray-100 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-5">
            <p className="text-sm text-gray-500">
              Showing{" "}
              <span className="font-semibold text-gray-800">
                {filteredLogs.length === 0
                  ? 0
                  : (currentPage - 1) * PAGE_SIZE + 1}
                {"–"}
                {Math.min(currentPage * PAGE_SIZE, filteredLogs.length)}
              </span>{" "}
              of{" "}
              <span className="font-semibold text-gray-800">
                {filteredLogs.length}
              </span>{" "}
              events
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

              {Array.from({ length: totalPages }, (_, index) => index + 1).map(
                (number) => (
                  <button
                    key={number}
                    type="button"
                    onClick={() => setPage(number)}
                    className={`h-9 min-w-9 rounded-lg px-2 text-sm font-semibold ${
                      currentPage === number
                        ? "text-white"
                        : "border border-gray-200 text-gray-600 hover:bg-gray-50"
                    }`}
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

        <div className="mt-4 flex items-start gap-2 text-xs leading-5 text-gray-400">
          <Clock size={14} className="mt-0.5 shrink-0" />
          <p>
            This page currently uses sample records. Production audit logs
            should be generated by the server, timestamped in UTC,
            access-controlled, and protected against unauthorized modification
            or deletion.
          </p>
        </div>
      </div>

      {selectedLog && (
        <LogDetails log={selectedLog} onClose={() => setSelectedLog(null)} />
      )}
    </main>
  );
}
