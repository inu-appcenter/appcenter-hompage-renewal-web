import { queryOptions } from '@tanstack/react-query';
import { roleApi } from '.';

export const roleKeys = {
  all: ['roles'] as const,
  lists: () => [...roleKeys.all, 'list'] as const
};

export const roleOptions = {
  all: () =>
    queryOptions({
      queryKey: roleKeys.lists(),
      queryFn: roleApi.getAll
    })
};
