export const partnerQueryKeys = {
  all: ['partner'] as const,
  create: () => [...partnerQueryKeys.all, 'create'] as const,
};
