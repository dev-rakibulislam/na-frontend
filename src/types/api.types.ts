// ────────────────────────────────────────────────
//  Generic API Types
// ────────────────────────────────────────────────

/** Standard envelope the backend wraps every response in */
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

/** Standard paginated list from the backend */
export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  totalPages: number;
  hasMore: boolean;
}

/** Generic API error shape */
export interface ApiError {
  statusCode: number;
  message: string;
  errors?: Record<string, string[]>;
}
