import { queryOptions } from '@tanstack/react-query';
import { imageManagementApi } from '.';

export const imageManagementKeys = {
  all: ['imageManagement'] as const,
  lists: () => [...imageManagementKeys.all, 'list'] as const
};

export const imageManagementOptions = {
  all: () =>
    queryOptions({
      queryKey: imageManagementKeys.lists(),
      queryFn: imageManagementApi.getAll
    })
};
