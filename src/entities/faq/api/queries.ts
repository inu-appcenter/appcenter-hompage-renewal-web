import { queryOptions } from '@tanstack/react-query';
import { faqApi } from '.';

export const faqKeys = {
  all: ['faqs'] as const,
  lists: () => [...faqKeys.all, 'list'] as const
};

export const faqOptions = {
  all: () =>
    queryOptions({
      queryKey: faqKeys.lists(),
      queryFn: faqApi.getAll
    })
};
