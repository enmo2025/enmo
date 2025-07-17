export const eventQueryKeys = {
  all: ['event'] as const,
  list: (page?: number, limit?: number) => [...eventQueryKeys.all, 'list', page, limit] as const,
  detail: (id: string) => ['detail', id] as const,
  create: () => [...eventQueryKeys.all, 'create'] as const,
};
