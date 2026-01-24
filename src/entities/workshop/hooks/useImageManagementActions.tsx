import { useMutation, useQueryClient, useSuspenseQuery } from '@tanstack/react-query';
import { imageManagementKeys, imageManagementOptions } from '../api/queries';
import { imageManagementApi } from '../api';

export const useImageManagement = () => {
  return useSuspenseQuery({
    ...imageManagementOptions.all()
  });
};

export const useImageManagementActions = () => {
  const queryClient = useQueryClient();

  const invalidateImageManagement = () => {
    queryClient.invalidateQueries({ queryKey: imageManagementKeys.lists() });
  };

  const addMutation = useMutation({
    mutationFn: imageManagementApi.create,
    onSuccess: invalidateImageManagement
  });

  const editMutation = useMutation({
    mutationFn: imageManagementApi.update,
    onSuccess: invalidateImageManagement
  });

  const deleteMutation = useMutation({
    mutationFn: imageManagementApi.delete,
    onSuccess: invalidateImageManagement
  });

  return { addMutation, editMutation, deleteMutation };
};
