import type { DefaultError } from "@tanstack/react-query";

export interface CustomHookMutationParams<
  TData = unknown,
  TError = DefaultError,
  TVariables = void,
  TContext = unknown,
> {
  meta?: Record<string, unknown>;
  onSuccess?: (data: TData) => void;
  onError?: (error: TError) => void;
  onSettled?: (
    data: TData | undefined,
    error: TError | null,
    variables: TVariables,
    context: TContext
  ) => void;
}
export interface CustomHookQueryOptionParams {
  enabled?: boolean;
  refetchInterval?: number | false;
  refetchOnWindowFocus?: boolean;
}
