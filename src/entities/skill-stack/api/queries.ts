import { queryOptions } from '@tanstack/react-query';
import { skillStackApi } from '.';

export const skillStackKeys = {
  all: ['skillStacks'] as const,
  lists: () => [...skillStackKeys.all, 'list'] as const
};

export const skillStackOptions = {
  all: () =>
    queryOptions({
      queryKey: skillStackKeys.lists(),
      queryFn: () => skillStackApi.getAll()
    })
};
