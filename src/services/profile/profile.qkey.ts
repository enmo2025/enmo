export const profileQueryKeys = {
  all: ['profile'] as const,
  update: () => [...profileQueryKeys.all, 'update'] as const,
};
