import type {
  User,
  AuthResponse,
  LoginCredentials,
  RegisterPayload,
} from "@/types";
import { apiGet, apiPost, apiPut } from "./api-client";
import { mockAuthService } from "./mock.service";

const USE_MOCK = process.env.NEXT_PUBLIC_USE_MOCK !== "false";

const realAuthService = {
  async register(payload: RegisterPayload): Promise<AuthResponse> {
    return apiPost<AuthResponse>("/auth/register", payload);
  },
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    return apiPost<AuthResponse>("/auth/login", credentials);
  },
  async logout(): Promise<void> {
    return apiPost("/auth/logout");
  },
  async refreshToken(refreshToken: string): Promise<AuthResponse> {
    return apiPost<AuthResponse>("/auth/refresh", { refreshToken });
  },
  async getProfile(): Promise<User> {
    return apiGet<User>("/auth/me");
  },
  async updateProfile(data: Partial<User>): Promise<User> {
    return apiPut<User>("/auth/me", data);
  },
};

export const authService = USE_MOCK ? (mockAuthService as unknown as typeof realAuthService) : realAuthService;
