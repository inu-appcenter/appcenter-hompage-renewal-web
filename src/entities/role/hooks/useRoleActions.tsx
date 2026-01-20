import { useMutation, useQueryClient, useSuspenseQuery } from '@tanstack/react-query';
import { roleKeys, roleOptions } from '../api/queries';
import { roleApi } from '../api';

export const useRoles = () => {
  return useSuspenseQuery({ ...roleOptions.all() });
};

export const useRoleActions = () => {
  const queryClient = useQueryClient();

  const invalidateRoles = () => {
    return queryClient.invalidateQueries({ queryKey: roleKeys.lists() });
  };

  const addMutation = useMutation({
    mutationFn: roleApi.create,
    onSuccess: invalidateRoles
  });

  const editMutation = useMutation({
    mutationFn: roleApi.update,
    onSuccess: invalidateRoles
  });

  const deleteMutation = useMutation({
    mutationFn: roleApi.delete,
    onSuccess: invalidateRoles
  });

  return { addMutation, editMutation, deleteMutation };
};
