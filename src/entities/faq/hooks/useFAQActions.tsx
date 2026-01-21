import { useMutation, useQueryClient, useSuspenseQuery } from '@tanstack/react-query';
import { faqApi } from '../api';
import { faqOptions, faqKeys } from '../api/queries';

export const useFAQs = () => {
  return useSuspenseQuery({
    ...faqOptions.all()
  });
};

export const useFAQActions = () => {
  const queryClient = useQueryClient();

  const invalidateFaqs = () => {
    return queryClient.invalidateQueries({ queryKey: faqKeys.lists() });
  };

  const addMutation = useMutation({
    mutationFn: faqApi.create,
    onSuccess: invalidateFaqs
  });

  const editMutation = useMutation({
    mutationFn: faqApi.update,
    onSuccess: invalidateFaqs
  });

  const deleteMutation = useMutation({
    mutationFn: faqApi.delete,
    onSuccess: invalidateFaqs
  });

  return { addMutation, editMutation, deleteMutation };
};
