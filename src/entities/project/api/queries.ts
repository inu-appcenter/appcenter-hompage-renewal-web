import { queryOptions } from '@tanstack/react-query';
import { projectApi } from '.';

export const projectKeys = {
  all: ['projects'] as const,
  lists: () => [...projectKeys.all, 'list'] as const
};

export const projectOptions = {
  all: () =>
    queryOptions({
      queryKey: projectKeys.lists(),
      queryFn: () => projectApi.getAll()
    })
};
