import { useMutation, useQueryClient, useSuspenseQuery } from '@tanstack/react-query';
import { activityApi } from '../api';
import { activityOptions, activityKeys } from '../api/queries';

export const useActivities = () => {
  return useSuspenseQuery({
    ...activityOptions.all()
  });
};

export const useActivitiesById = (activityId: number) => {
  return useSuspenseQuery({
    ...activityOptions.getById(activityId)
  });
};

export const useActivityActions = (activityId?: number) => {
  const queryClient = useQueryClient();

  const invalidateActivities = () => {
    return queryClient.invalidateQueries({ queryKey: activityKeys.lists() });
  };
  const invalidateDetail = () => {
    if (activityId) {
      return queryClient.invalidateQueries({ queryKey: activityKeys.detail(activityId) });
    }
  };

  const addMutation = useMutation({
    mutationFn: activityApi.create,
    onSuccess: invalidateActivities
  });

  const deleteMutation = useMutation({
    mutationFn: activityApi.delete,
    onSuccess: invalidateActivities
  });

  const editThumbnailMutation = useMutation({
    mutationFn: activityApi.editThumbnail,
    onSuccess: invalidateDetail
  });

  const editMetadataMutation = useMutation({
    mutationFn: activityApi.editMetadata,
    onSuccess: invalidateDetail
  });

  const editImageMutation = useMutation({
    mutationFn: activityApi.editImage,
    onSuccess: invalidateDetail
  });

  const deleteImageMutation = useMutation({
    mutationFn: activityApi.deleteImage,
    onSuccess: invalidateDetail
  });

  return { addMutation, editThumbnailMutation, editMetadataMutation, editImageMutation, deleteImageMutation, deleteMutation };
};
