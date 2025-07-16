import type { DefaultError } from '@tanstack/react-query';

export interface CustomHookMutationParams<
  TData = unknown,
  TError = DefaultError,
  TVariables = void,
  TContext = unknown,
> {
  meta?: Record<string, unknown>;
  onSuccess?: (data: TData) => void;
  onError?: (error: TError) => void;
  onSettled?: (data: TData | undefined, error: TError | null, variables: TVariables, context: TContext) => void;
}
export interface CustomHookQueryOptionParams {
  enabled?: boolean;
  refetchInterval?: number | false;
  refetchOnWindowFocus?: boolean;
}

export interface SuccessResponse<T> {
  success: true;
  status: number;
  message: string;
  pagination?: Pagination;
  data: T;
}

export interface ErrorResponse {
  success: false;
  status: number;
  message: string;
}

export interface Pagination {
  page: number;
  limit: number;
  total: number;
}
