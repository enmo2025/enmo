export const purchaseQueryKeys = {
  all: ['purchase'] as const,
  list: (page: number, limit: number) => [...purchaseQueryKeys.all, 'list', page, limit] as const,
};
