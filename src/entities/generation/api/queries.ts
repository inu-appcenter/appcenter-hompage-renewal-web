import { queryOptions } from '@tanstack/react-query';

export const generationKeys = {
  all: ['generations'] as const,
  lists: () => [...generationKeys.all, 'list'] as const
};

export const generationOptions = {
  all: () =>
    queryOptions({
      queryKey: generationKeys.lists(),
      queryFn: () => fetch('/api/groups/public/all-groups-members').then((res) => res.json())
    })
};
