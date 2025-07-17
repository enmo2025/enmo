export const prefectureQueryKeys = {
  all: ['prefecture'] as const,
  list: (page?: number, limit?: number) => [...prefectureQueryKeys.all, 'list', page, limit] as const,
};
