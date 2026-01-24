import { useMutation, useQueryClient, useSuspenseQuery } from '@tanstack/react-query';
import { skillStackKeys, skillStackOptions } from '../api/queries';
import { skillStackApi } from '../api';

export const useSkillStack = () => {
  return useSuspenseQuery({
    ...skillStackOptions.all()
  });
};

export const useSkillStackActions = () => {
  const queryClient = useQueryClient();

  const invalidateSkillStack = () => {
    queryClient.invalidateQueries({ queryKey: skillStackKeys.lists() });
  };

  const addMutation = useMutation({
    mutationFn: skillStackApi.create,
    onSuccess: invalidateSkillStack
  });

  const editMutation = useMutation({
    mutationFn: skillStackApi.update,
    onSuccess: invalidateSkillStack
  });

  const deleteMutation = useMutation({
    mutationFn: skillStackApi.delete,
    onSuccess: invalidateSkillStack
  });

  return { addMutation, editMutation, deleteMutation };
};
