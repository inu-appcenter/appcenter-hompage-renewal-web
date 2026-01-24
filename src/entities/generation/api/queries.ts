import { queryOptions } from '@tanstack/react-query';
import { generationApi } from '.';

export const generationKeys = {
  all: ['generations'] as const,
  lists: () => [...generationKeys.all, 'list'] as const,
  groupYears: () => [...generationKeys.all, 'groupYears'] as const,
  parts: () => [...generationKeys.all, 'parts'] as const
};

export const generationOptions = {
  all: () =>
    queryOptions({
      queryKey: generationKeys.lists(),
      queryFn: () => generationApi.getAll()
    }),
  groupYears: () =>
    queryOptions({
      queryKey: generationKeys.groupYears(),
      queryFn: () => generationApi.getGroupYears()
    }),
  parts: () =>
    queryOptions({
      queryKey: generationKeys.parts(),
      queryFn: () => generationApi.getParts()
    })
};
