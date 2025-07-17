export const purchaseQueryKeys = {
  all: ['purchase'] as const,
  list: (page: number, limit: number) => [...purchaseQueryKeys.all, 'list', page, limit] as const,
  detail: (id: string) => ['detail', id] as const,
  stripeSession: (sessionId: string) => ['stripeSession', sessionId] as const,
};
