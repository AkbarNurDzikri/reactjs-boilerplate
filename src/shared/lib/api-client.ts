import axios, {
  type AxiosInstance,
  AxiosError,
  type InternalAxiosRequestConfig,
  type AxiosResponse,
} from "axios";
import { redirect } from "react-router";
import type {
  ApiResponse,
  LoginResponse,
} from "../interfaces/api-client.interface";
import { showErrorAlert } from "./alert";

class ApiClient {
  private client: AxiosInstance;
  private isRefreshing = false;
  private refreshQueue: Array<{
    resolve: (value: string) => void;
    reject: (reason: Error) => void;
  }> = [];

  constructor(baseURL: string) {
    this.client = axios.create({
      baseURL,
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true, // Penting untuk mengirim cookies
    });

    this.setupInterceptors();
  }

  private isPublicEndpoint(url?: string): boolean {
    if (!url) return false;

    const publicPatterns = [
      /^\/auth\//,
      /^\/public\//,
      // Tambahkan pattern lain untuk endpoint public
    ];

    return publicPatterns.some((pattern) => pattern.test(url));
  }

  private async refreshAccessToken(): Promise<string> {
    try {
      const response = await this.client.post<ApiResponse<LoginResponse>>(
        "/auth/refresh"
      );
      return response.data.data.access_token;
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      throw new Error("Refresh token expired");
    }
  }

  private async handleRefreshToken(): Promise<string> {
    if (this.isRefreshing) {
      return new Promise<string>((resolve, reject) => {
        this.refreshQueue.push({ resolve, reject });
      });
    }

    this.isRefreshing = true;

    try {
      const newAccessToken = await this.refreshAccessToken();

      // Resolve semua request yang menunggu
      this.refreshQueue.forEach(({ resolve }) => {
        resolve(newAccessToken);
      });
      this.refreshQueue = [];

      return newAccessToken;
    } catch (error) {
      // Reject semua request yang menunggu
      this.refreshQueue.forEach(({ reject }) => {
        reject(error instanceof Error ? error : new Error("Unknown error"));
      });
      this.refreshQueue = [];

      // Redirect ke signin jika refresh token expired
      throw redirect("/signin");
    } finally {
      this.isRefreshing = false;
    }
  }

  private setupInterceptors(): void {
    // Response interceptor untuk handle refresh token
    this.client.interceptors.response.use(
      (response: AxiosResponse) => response,
      async (error: AxiosError<ApiResponse>) => {
        const originalRequest = error.config as InternalAxiosRequestConfig & {
          _retry?: boolean;
        };

        // Jika error bukan 401 atau tidak ada config, langsung reject
        if (!originalRequest || error.response?.status !== 401) {
          return Promise.reject(this.handleError(error));
        }

        // Jika endpoint public atau sudah retry, langsung reject
        if (
          this.isPublicEndpoint(originalRequest.url) ||
          originalRequest._retry
        ) {
          return Promise.reject(this.handleError(error));
        }

        // Tandai request sudah di-retry
        originalRequest._retry = true;

        try {
          await this.handleRefreshToken();

          // Retry original request
          return this.client(originalRequest);
        } catch (refreshError) {
          // handleRefreshToken akan throw redirect jika refresh gagal
          return Promise.reject(refreshError);
        }
      }
    );
  }

  private handleError(error: AxiosError<ApiResponse>) {
    const message = error?.response?.data?.message || error.message;
    showErrorAlert(message);
  }

  // Generic request methods
  async get<T>(
    url: string,
    params?: Record<string, string | number | boolean>
  ): Promise<T> {
    const response = await this.client.get<ApiResponse<T>>(url, { params });
    return response.data.data;
  }

  async post<T, D = unknown>(url: string, data: D): Promise<ApiResponse<T>> {
    const response = await this.client.post<ApiResponse<T>>(url, data);
    return response.data;
  }

  async put<T, D = unknown>(url: string, data: D): Promise<ApiResponse<T>> {
    const response = await this.client.put<ApiResponse<T>>(url, data);
    return response.data;
  }

  async patch<T, D = unknown>(url: string, data: D): Promise<ApiResponse<T>> {
    const response = await this.client.patch<ApiResponse<T>>(url, data);
    return response.data;
  }

  async delete<T>(url: string): Promise<ApiResponse<T>> {
    const response = await this.client.delete<ApiResponse<T>>(url);
    return response.data;
  }
}

const apiClient = new ApiClient(
  import.meta.env.VITE_API_BASE_URL || "http://localhost:3000"
);

export default apiClient;
