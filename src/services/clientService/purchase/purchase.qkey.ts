export const purchaseQueryKeys = {
  all: ['purchase'] as const,
  list: (page: number, limit: number) => [...purchaseQueryKeys.all, 'list', page, limit] as const,
  confirm: (id: string) => [...purchaseQueryKeys.all, 'confirm', id] as const,
  detail: (id: string) => [...purchaseQueryKeys.all, 'detail', id] as const,
  stripeSession: (sessionId: string) => [...purchaseQueryKeys.all, 'stripeSession', sessionId] as const,
};
