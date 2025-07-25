export const userQueryKeys = {
  all: ['user'] as const,
  detail: (id?: string) => [...userQueryKeys.all, 'detail', id] as const,
};
