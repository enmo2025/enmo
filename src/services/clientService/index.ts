import { HTTP_STATUS } from '~/constants/status-code';

const defaultApiEndpoint = `${process.env.NEXT_PUBLIC_APP_URL}/api`;

interface ApiClientConfig {
  baseURL?: string;
  headers?: Record<string, string>;
}

interface ApiRequestOptions extends Omit<RequestInit, 'headers'> {
  params?: Record<string, string>;
  headers?: Record<string, string>;
}

class ApiClient {
  private baseURL: string;
  private defaultHeaders: Record<string, string>;

  constructor(config: ApiClientConfig = {}) {
    this.baseURL = config.baseURL || defaultApiEndpoint;
    this.defaultHeaders = {
      'Content-Type': 'application/json',
      ...config.headers,
    };
  }

  private buildHeaders(customHeaders?: Record<string, string>): Record<string, string> {
    return { ...this.defaultHeaders, ...customHeaders };
  }

  private buildURL(endpoint: string, params?: Record<string, string>): string {
    const normalizedBaseURL = this.baseURL.endsWith('/') ? this.baseURL : `${this.baseURL}/`;
    const cleanEndpoint = endpoint.startsWith('/') ? endpoint.slice(1) : endpoint;
    const url = new URL(cleanEndpoint, normalizedBaseURL);

    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        url.searchParams.append(key, value);
      });
    }

    return url.toString();
  }

  private async handleResponse<T>(response: Response): Promise<T> {
    if (!response.ok) {
      if (response.status === HTTP_STATUS.UNAUTHORIZED) {
        if (typeof window !== 'undefined') {
          window.location.href = '/login';
        }
        throw new Error('Unauthorized');
      }

      let errorMessage = `HTTP ${response.status}: ${response.statusText}`;

      try {
        const errorData = await response.json();
        errorMessage = errorData.message || errorMessage;
      } catch {
        // If response is not JSON, use default error message
      }

      throw new Error(errorMessage);
    }

    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      return response.json();
    }

    return response.text() as unknown as T;
  }

  async get<T>(endpoint: string, options: ApiRequestOptions = {}): Promise<T> {
    const { params, headers, ...requestOptions } = options;
    const url = this.buildURL(endpoint, params);
    const requestHeaders = this.buildHeaders(headers);

    const response = await fetch(url, {
      method: 'GET',
      headers: requestHeaders,
      credentials: 'include',
      ...requestOptions,
    });

    return this.handleResponse<T>(response);
  }

  async post<T>(endpoint: string, data?: unknown, options: ApiRequestOptions = {}): Promise<T> {
    const { params, headers, ...requestOptions } = options;
    const url = this.buildURL(endpoint, params);
    const requestHeaders = this.buildHeaders(headers);

    const response = await fetch(url, {
      method: 'POST',
      headers: requestHeaders,
      body: data ? JSON.stringify(data) : undefined,
      credentials: 'include',
      ...requestOptions,
    });

    return this.handleResponse<T>(response);
  }

  async put<T>(endpoint: string, data?: unknown, options: ApiRequestOptions = {}): Promise<T> {
    const { params, headers, ...requestOptions } = options;
    const url = this.buildURL(endpoint, params);
    const requestHeaders = this.buildHeaders(headers);

    const response = await fetch(url, {
      method: 'PUT',
      headers: requestHeaders,
      body: data ? JSON.stringify(data) : undefined,
      credentials: 'include',
      ...requestOptions,
    });

    return this.handleResponse<T>(response);
  }

  async delete<T>(endpoint: string, options: ApiRequestOptions = {}): Promise<T> {
    const { params, headers, ...requestOptions } = options;
    const url = this.buildURL(endpoint, params);
    const requestHeaders = this.buildHeaders(headers);

    const response = await fetch(url, {
      method: 'DELETE',
      headers: requestHeaders,
      credentials: 'include',
      ...requestOptions,
    });

    return this.handleResponse<T>(response);
  }
}

export const apiClient = new ApiClient();
