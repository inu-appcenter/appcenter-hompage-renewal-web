import { queryOptions } from '@tanstack/react-query';
import { generationApi } from '.';

export const generationKeys = {
  all: ['generations'] as const,
  lists: () => [...generationKeys.all, 'list'] as const
};

export const generationOptions = {
  all: () =>
    queryOptions({
      queryKey: generationKeys.lists(),
      queryFn: () => generationApi.getAll()
    })
};
