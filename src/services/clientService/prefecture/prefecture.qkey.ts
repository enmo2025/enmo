export const prefectureQueryKeys = {
  all: ['prefecture'] as const,
  list: () => [...prefectureQueryKeys.all, 'list'] as const,
};
