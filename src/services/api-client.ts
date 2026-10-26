import type { ApiError, ApiResponse } from "@/types";

// ────────────────────────────────────────────────
//  Base API Client
//  Thin wrapper around fetch() that every service
//  calls.  Swap the BASE_URL to point at your backend.
// ────────────────────────────────────────────────

const BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000/api";

/** Custom error class that carries the structured API error */
export class ApiRequestError extends Error {
  statusCode: number;
  errors?: Record<string, string[]>;

  constructor(apiError: ApiError) {
    super(apiError.message);
    this.name = "ApiRequestError";
    this.statusCode = apiError.statusCode;
    this.errors = apiError.errors;
  }
}

// ─── helpers ──────────────────────────────────

function getAuthHeaders(): HeadersInit {
  if (typeof window === "undefined") return {};
  const token = localStorage.getItem("accessToken");
  return token ? { Authorization: `Bearer ${token}` } : {};
}

async function handleResponse<T>(res: Response): Promise<T> {
  if (!res.ok) {
    const body = (await res.json().catch(() => null)) as ApiError | null;
    throw new ApiRequestError(
      body ?? { statusCode: res.status, message: res.statusText }
    );
  }

  // 204 No Content
  if (res.status === 204) return undefined as T;

  const json = (await res.json()) as ApiResponse<T>;
  return json.data;
}

// ─── public api ───────────────────────────────

export async function apiGet<T>(path: string, params?: Record<string, string>): Promise<T> {
  const url = new URL(`${BASE_URL}${path}`);
  if (params) {
    for (const [k, v] of Object.entries(params)) {
      if (v !== undefined && v !== "") url.searchParams.set(k, v);
    }
  }

  const res = await fetch(url.toString(), {
    method: "GET",
    headers: { ...getAuthHeaders(), "Content-Type": "application/json" },
  });
  return handleResponse<T>(res);
}

export async function apiPost<T>(path: string, body?: unknown): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, {
    method: "POST",
    headers: { ...getAuthHeaders(), "Content-Type": "application/json" },
    body: body ? JSON.stringify(body) : undefined,
  });
  return handleResponse<T>(res);
}

export async function apiPut<T>(path: string, body?: unknown): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, {
    method: "PUT",
    headers: { ...getAuthHeaders(), "Content-Type": "application/json" },
    body: body ? JSON.stringify(body) : undefined,
  });
  return handleResponse<T>(res);
}

export async function apiPatch<T>(path: string, body?: unknown): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, {
    method: "PATCH",
    headers: { ...getAuthHeaders(), "Content-Type": "application/json" },
    body: body ? JSON.stringify(body) : undefined,
  });
  return handleResponse<T>(res);
}

export async function apiDelete<T = void>(path: string): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, {
    method: "DELETE",
    headers: { ...getAuthHeaders(), "Content-Type": "application/json" },
  });
  return handleResponse<T>(res);
}
