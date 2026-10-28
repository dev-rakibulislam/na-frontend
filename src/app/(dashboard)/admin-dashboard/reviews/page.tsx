
"use client";

import { useMemo, useState } from "react";
import {
  Search,
  Star,
  MessageSquare,
  CheckCircle2,
  Clock3,
  XCircle,
  Trash2,
  ChevronLeft,
  ChevronRight,
  Eye,
  Filter,
} from "lucide-react";

type ReviewStatus = "Approved" | "Pending" | "Rejected";

type Review = {
  id: string;
  product: string;
  productImage: string;
  customer: string;
  email: string;
  rating: number;
  title: string;
  comment: string;
  date: string;
  status: ReviewStatus;
};

const initialReviews: Review[] = [
  {
    id: "REV-1001",
    product: "Premium Cotton T-Shirt",
    productImage:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=100",
    customer: "Tanvir Ahmed",
    email: "tanvir@example.com",
    rating: 5,
    title: "Excellent quality",
    comment:
      "Fabric quality is excellent. The fitting is perfect and delivery was quick.",
    date: "Oct 27, 2026",
    status: "Approved",
  },
  {
    id: "REV-1002",
    product: "Classic Sneakers",
    productImage:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=100",
    customer: "Nusrat Jahan",
    email: "nusrat@example.com",
    rating: 4,
    title: "Good product",
    comment: "Comfortable shoes and looks good. Packaging could be better.",
    date: "Oct 26, 2026",
    status: "Pending",
  },
  {
    id: "REV-1003",
    product: "Minimal Leather Watch",
    productImage:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=100",
    customer: "Sabbir Hossain",
    email: "sabbir@example.com",
    rating: 2,
    title: "Not as expected",
    comment:
      "The product looks different from the pictures. The strap quality is average.",
    date: "Oct 25, 2026",
    status: "Pending",
  },
  {
    id: "REV-1004",
    product: "Everyday Backpack",
    productImage:
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=100",
    customer: "Farhana Islam",
    email: "farhana@example.com",
    rating: 5,
    title: "Worth the money",
    comment: "Spacious, durable and perfect for everyday use.",
    date: "Oct 24, 2026",
    status: "Approved",
  },
  {
    id: "REV-1005",
    product: "Wireless Headphones",
    productImage:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=100",
    customer: "Rafi Hasan",
    email: "rafi@example.com",
    rating: 1,
    title: "Poor experience",
    comment:
      "Sound quality is disappointing and the battery does not last long.",
    date: "Oct 23, 2026",
    status: "Rejected",
  },
  {
    id: "REV-1006",
    product: "Classic Sneakers",
    productImage:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=100",
    customer: "Mehedi Hasan",
    email: "mehedi@example.com",
    rating: 4,
    title: "Nice for the price",
    comment: "Looks great and feels comfortable. Overall a good purchase.",
    date: "Oct 22, 2026",
    status: "Approved",
  },
];

const primary = "#92003A";

const statusStyles: Record<ReviewStatus, string> = {
  Approved: "bg-emerald-50 text-emerald-700",
  Pending: "bg-amber-50 text-amber-700",
  Rejected: "bg-red-50 text-red-700",
};

function Stars({ rating }: { rating: number }) {
  return (
    <div
      className="flex items-center gap-0.5"
      aria-label={`${rating} out of 5 stars`}
    >
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          size={14}
          fill={star <= rating ? "#F59E0B" : "none"}
          className={star <= rating ? "text-amber-500" : "text-gray-300"}
        />
      ))}
    </div>
  );
}

export default function ProductReviewsPage() {
  const [reviews, setReviews] = useState(initialReviews);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [ratingFilter, setRatingFilter] = useState("All");
  const [page, setPage] = useState(1);
  const [selectedReview, setSelectedReview] = useState<Review | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<string | null>(null);

  const pageSize = 5;

  const stats = useMemo(() => {
    const total = reviews.length;
    const approved = reviews.filter((r) => r.status === "Approved").length;
    const pending = reviews.filter((r) => r.status === "Pending").length;
    const rejected = reviews.filter((r) => r.status === "Rejected").length;
    const average = total
      ? reviews.reduce((sum, review) => sum + review.rating, 0) / total
      : 0;

    return { total, approved, pending, rejected, average };
  }, [reviews]);

  const filteredReviews = useMemo(() => {
    const query = search.trim().toLowerCase();

    return reviews.filter((review) => {
      const matchesSearch =
        !query ||
        review.product.toLowerCase().includes(query) ||
        review.customer.toLowerCase().includes(query) ||
        review.email.toLowerCase().includes(query) ||
        review.title.toLowerCase().includes(query) ||
        review.id.toLowerCase().includes(query);

      const matchesStatus =
        statusFilter === "All" || review.status === statusFilter;

      const matchesRating =
        ratingFilter === "All" || review.rating === Number(ratingFilter);

      return matchesSearch && matchesStatus && matchesRating;
    });
  }, [reviews, search, statusFilter, ratingFilter]);

  const totalPages = Math.max(1, Math.ceil(filteredReviews.length / pageSize));
  const currentPage = Math.min(page, totalPages);
  const paginatedReviews = filteredReviews.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize,
  );

  function updateStatus(id: string, status: ReviewStatus) {
    setReviews((current) =>
      current.map((review) =>
        review.id === id ? { ...review, status } : review,
      ),
    );

    setSelectedReview((current) =>
      current?.id === id ? { ...current, status } : current,
    );
  }

  function deleteReview(id: string) {
    setReviews((current) => current.filter((review) => review.id !== id));
    setDeleteTarget(null);

    if (selectedReview?.id === id) {
      setSelectedReview(null);
    }
  }

  function exportReviews() {
    const headers = [
      "Review ID",
      "Product",
      "Customer",
      "Email",
      "Rating",
      "Title",
      "Comment",
      "Date",
      "Status",
    ];

    const escapeCsv = (value: string | number) =>
      `"${String(value).replace(/"/g, '""')}"`;

    const rows = filteredReviews.map((review) =>
      [
        review.id,
        review.product,
        review.customer,
        review.email,
        review.rating,
        review.title,
        review.comment,
        review.date,
        review.status,
      ]
        .map(escapeCsv)
        .join(","),
    );

    const csv = [headers.map(escapeCsv).join(","), ...rows].join("\n");
    const blob = new Blob(["\uFEFF", csv], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "product-reviews.csv";
    link.click();
    URL.revokeObjectURL(url);
  }

  return (
    <main className="min-h-screen bg-[#F8F8FA] p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-[1500px] space-y-7">
        {/* Page heading */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="mb-2 flex items-center gap-2 text-sm text-gray-500">
              <span>Dashboard</span>
              <span>/</span>
              <span className="text-gray-800">Product Reviews</span>
            </div>

            <h1 className="text-2xl font-bold tracking-tight text-gray-950 sm:text-3xl">
              Product Reviews
            </h1>

            <p className="mt-2 text-sm text-gray-500">
              Review customer feedback and manage product ratings.
            </p>
          </div>

          <button
            onClick={exportReviews}
            className="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
          >
            Export CSV
          </button>
        </div>

        {/* Summary cards */}
        <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {[
            {
              label: "Total Reviews",
              value: stats.total,
              icon: MessageSquare,
              detail: "All customer feedback",
              iconClass: "bg-[#F8E8EF] text-[#92003A]",
            },
            {
              label: "Average Rating",
              value: stats.average.toFixed(1),
              icon: Star,
              detail: "Out of 5 stars",
              iconClass: "bg-amber-50 text-amber-600",
            },
            {
              label: "Pending Reviews",
              value: stats.pending,
              icon: Clock3,
              detail: "Awaiting moderation",
              iconClass: "bg-blue-50 text-blue-600",
            },
            {
              label: "Approved Reviews",
              value: stats.approved,
              icon: CheckCircle2,
              detail: `${stats.rejected} rejected`,
              iconClass: "bg-emerald-50 text-emerald-600",
            },
          ].map((item) => {
            const Icon = item.icon;

            return (
              <article
                key={item.label}
                className="rounded-xl border border-gray-200/80 bg-white p-5"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-gray-500">{item.label}</p>
                    <p className="mt-3 text-3xl font-bold tracking-tight text-gray-950">
                      {item.value}
                    </p>
                  </div>

                  <div
                    className={`flex h-11 w-11 items-center justify-center rounded-xl ${item.iconClass}`}
                  >
                    <Icon size={20} />
                  </div>
                </div>

                <p className="mt-4 text-xs text-gray-500">{item.detail}</p>
              </article>
            );
          })}
        </section>

        {/* Reviews table */}
        <section className="overflow-hidden rounded-xl border border-gray-200/80 bg-white">
          <div className="flex flex-col gap-4 border-b border-gray-100 p-5 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h2 className="font-semibold text-gray-950">Customer feedback</h2>
              <p className="mt-1 text-sm text-gray-500">
                {filteredReviews.length} reviews found
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <div className="relative min-w-0 sm:w-64">
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
                  placeholder="Search reviews..."
                  className="w-full rounded-lg border border-gray-200 bg-white py-2.5 pl-9 pr-3 text-sm outline-none transition focus:border-[#92003A] focus:ring-2 focus:ring-[#92003A]/10"
                />
              </div>

              <div className="relative">
                <Filter
                  size={15}
                  className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />
                <select
                  value={statusFilter}
                  onChange={(event) => {
                    setStatusFilter(event.target.value);
                    setPage(1);
                  }}
                  className="w-full appearance-none rounded-lg border border-gray-200 bg-white py-2.5 pl-9 pr-8 text-sm outline-none focus:border-[#92003A] sm:w-40"
                >
                  <option value="All">All statuses</option>
                  <option value="Pending">Pending</option>
                  <option value="Approved">Approved</option>
                  <option value="Rejected">Rejected</option>
                </select>
              </div>

              <select
                value={ratingFilter}
                onChange={(event) => {
                  setRatingFilter(event.target.value);
                  setPage(1);
                }}
                className="rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-[#92003A]"
              >
                <option value="All">All ratings</option>
                {[5, 4, 3, 2, 1].map((rating) => (
                  <option key={rating} value={rating}>
                    {rating} stars
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[900px] border-collapse text-left">
              <thead className="bg-gray-50/80">
                <tr className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                  <th className="px-5 py-4">Product / Review</th>
                  <th className="px-5 py-4">Customer</th>
                  <th className="px-5 py-4">Rating</th>
                  <th className="px-5 py-4">Date</th>
                  <th className="px-5 py-4">Status</th>
                  <th className="px-5 py-4 text-right">Actions</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100">
                {paginatedReviews.map((review) => (
                  <tr
                    key={review.id}
                    className="align-top transition hover:bg-gray-50/60"
                  >
                    <td className="max-w-sm px-5 py-4">
                      <div className="flex gap-3">
                        <img
                          src={review.productImage}
                          alt={review.product}
                          className="h-12 w-12 shrink-0 rounded-lg border border-gray-100 bg-gray-50 object-cover"
                        />

                        <div className="min-w-0">
                          <p className="font-medium text-gray-900">
                            {review.product}
                          </p>
                          <p className="mt-1 text-xs text-gray-400">
                            {review.id}
                          </p>
                          <p className="mt-2 font-medium text-gray-700">
                            {review.title}
                          </p>
                          <p className="mt-1 line-clamp-2 text-sm leading-5 text-gray-500">
                            {review.comment}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="px-5 py-4">
                      <p className="whitespace-nowrap text-sm font-medium text-gray-800">
                        {review.customer}
                      </p>
                      <p className="mt-1 text-xs text-gray-500">
                        {review.email}
                      </p>
                    </td>

                    <td className="px-5 py-4">
                      <div className="space-y-1.5">
                        <Stars rating={review.rating} />
                        <p className="text-xs text-gray-500">
                          {review.rating}.0 / 5
                        </p>
                      </div>
                    </td>

                    <td className="whitespace-nowrap px-5 py-4 text-sm text-gray-500">
                      {review.date}
                    </td>

                    <td className="px-5 py-4">
                      <span
                        className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${statusStyles[review.status]}`}
                      >
                        {review.status}
                      </span>
                    </td>

                    <td className="px-5 py-4">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => setSelectedReview(review)}
                          title="View review"
                          aria-label="View review"
                          className="rounded-lg p-2 text-gray-500 transition hover:bg-gray-100 hover:text-gray-900"
                        >
                          <Eye size={17} />
                        </button>

                        {review.status !== "Approved" && (
                          <button
                            onClick={() => updateStatus(review.id, "Approved")}
                            title="Approve review"
                            aria-label="Approve review"
                            className="rounded-lg p-2 text-emerald-600 transition hover:bg-emerald-50"
                          >
                            <CheckCircle2 size={17} />
                          </button>
                        )}

                        {review.status !== "Rejected" && (
                          <button
                            onClick={() => updateStatus(review.id, "Rejected")}
                            title="Reject review"
                            aria-label="Reject review"
                            className="rounded-lg p-2 text-amber-600 transition hover:bg-amber-50"
                          >
                            <XCircle size={17} />
                          </button>
                        )}

                        <button
                          onClick={() => setDeleteTarget(review.id)}
                          title="Delete review"
                          aria-label="Delete review"
                          className="rounded-lg p-2 text-red-500 transition hover:bg-red-50"
                        >
                          <Trash2 size={17} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}

                {paginatedReviews.length === 0 && (
                  <tr>
                    <td colSpan={6} className="px-5 py-16 text-center">
                      <MessageSquare
                        className="mx-auto text-gray-300"
                        size={30}
                      />
                      <p className="mt-3 font-medium text-gray-700">
                        No reviews found
                      </p>
                      <p className="mt-1 text-sm text-gray-500">
                        Try changing your search or filters.
                      </p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="flex flex-col gap-3 border-t border-gray-100 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-gray-500">
              Showing{" "}
              {filteredReviews.length === 0
                ? 0
                : (currentPage - 1) * pageSize + 1}{" "}
              – {Math.min(currentPage * pageSize, filteredReviews.length)} of{" "}
              {filteredReviews.length} reviews
            </p>

            <div className="flex items-center gap-2">
              <button
                disabled={currentPage <= 1}
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                className="rounded-lg border border-gray-200 p-2 text-gray-600 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
                aria-label="Previous page"
              >
                <ChevronLeft size={17} />
              </button>

              <span className="min-w-20 text-center text-sm font-medium text-gray-700">
                Page {currentPage} of {totalPages}
              </span>

              <button
                disabled={currentPage >= totalPages}
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                className="rounded-lg border border-gray-200 p-2 text-gray-600 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
                aria-label="Next page"
              >
                <ChevronRight size={17} />
              </button>
            </div>
          </div>
        </section>
      </div>

      {/* Review details modal */}
      {selectedReview && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
          onClick={() => setSelectedReview(null)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="review-dialog-title"
            className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                  {selectedReview.id}
                </p>
                <h2
                  id="review-dialog-title"
                  className="mt-1 text-xl font-bold text-gray-950"
                >
                  Review details
                </h2>
              </div>

              <button
                onClick={() => setSelectedReview(null)}
                className="rounded-lg p-2 text-gray-500 hover:bg-gray-100"
                aria-label="Close review details"
              >
                <XCircle size={20} />
              </button>
            </div>

            <div className="mt-6 flex items-center gap-3">
              <img
                src={selectedReview.productImage}
                alt={selectedReview.product}
                className="h-14 w-14 rounded-lg border border-gray-100 object-cover"
              />
              <div>
                <p className="font-semibold text-gray-900">
                  {selectedReview.product}
                </p>
                <p className="mt-1 text-sm text-gray-500">
                  {selectedReview.customer}
                </p>
              </div>
            </div>

            <div className="mt-5 flex flex-wrap items-center gap-3">
              <Stars rating={selectedReview.rating} />
              <span className="text-sm text-gray-500">
                {selectedReview.rating} out of 5
              </span>
              <span
                className={`rounded-full px-2.5 py-1 text-xs font-semibold ${statusStyles[selectedReview.status]}`}
              >
                {selectedReview.status}
              </span>
            </div>

            <h3 className="mt-5 font-semibold text-gray-900">
              {selectedReview.title}
            </h3>
            <p className="mt-2 text-sm leading-6 text-gray-600">
              {selectedReview.comment}
            </p>

            <div className="mt-4 border-t border-gray-100 pt-4 text-sm text-gray-500">
              <p>{selectedReview.email}</p>
              <p className="mt-1">{selectedReview.date}</p>
            </div>

            <div className="mt-6 flex flex-wrap justify-end gap-2">
              <button
                onClick={() => setSelectedReview(null)}
                className="rounded-lg border border-gray-200 px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Close
              </button>

              {selectedReview.status !== "Rejected" && (
                <button
                  onClick={() => updateStatus(selectedReview.id, "Rejected")}
                  className="rounded-lg border border-red-200 px-4 py-2.5 text-sm font-semibold text-red-600 hover:bg-red-50"
                >
                  Reject
                </button>
              )}

              {selectedReview.status !== "Approved" && (
                <button
                  onClick={() => updateStatus(selectedReview.id, "Approved")}
                  style={{ backgroundColor: primary }}
                  className="rounded-lg px-4 py-2.5 text-sm font-semibold text-white hover:opacity-90"
                >
                  Approve Review
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Delete confirmation */}
      {deleteTarget && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40 p-4">
          <div
            role="alertdialog"
            aria-modal="true"
            className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-xl"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-50 text-red-600">
              <Trash2 size={22} />
            </div>

            <h2 className="mt-4 text-lg font-bold text-gray-950">
              Delete this review?
            </h2>
            <p className="mt-2 text-sm leading-6 text-gray-500">
              This review will be removed from the current list. This demo
              action does not delete anything from your database.
            </p>

            <div className="mt-6 flex justify-end gap-2">
              <button
                onClick={() => setDeleteTarget(null)}
                className="rounded-lg border border-gray-200 px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>

              <button
                onClick={() => deleteReview(deleteTarget)}
                className="rounded-lg bg-red-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-red-700"
              >
                Delete Review
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
