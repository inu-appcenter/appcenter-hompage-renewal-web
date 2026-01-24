import { useMutation, useQueryClient, useSuspenseQuery } from '@tanstack/react-query';
import { generationOptions } from '../api/queries';
import { generationApi } from '../api';

export const useGeneration = () => {
  return useSuspenseQuery({
    ...generationOptions.all()
  });
};

export const usePart = () => {
  return useSuspenseQuery({
    ...generationOptions.parts()
  });
};

export const useGroupYear = () => {
  return useSuspenseQuery({
    ...generationOptions.groupYears()
  });
};

export const useGenerationActions = () => {
  const queryClient = useQueryClient();

  const invalidateGenerations = () => {
    queryClient.invalidateQueries({ queryKey: ['generations'] });
  };

  const addMutation = useMutation({
    mutationFn: generationApi.create,
    onSuccess: invalidateGenerations
  });

  const editMutation = useMutation({
    mutationFn: generationApi.update,
    onSuccess: invalidateGenerations
  });

  const deleteMutation = useMutation({
    mutationFn: generationApi.delete,
    onSuccess: invalidateGenerations
  });

  return { addMutation, editMutation, deleteMutation };
};
