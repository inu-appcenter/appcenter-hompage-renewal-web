import { useMutation, useQueryClient, useSuspenseQuery } from '@tanstack/react-query';
import { Part } from 'shared/types/part';
import { generationOptions } from '../api/queries';
import { generationApi } from '../api';
import { http } from 'shared/utils/http';

export const useGeneration = () => {
  return useSuspenseQuery({
    ...generationOptions.all()
  });
};

// 파트 불러오기
export const usePart = () => {
  return useSuspenseQuery<{ parts: Part[] }>({
    queryKey: ['parts'],
    queryFn: async () => {
      return http.get<{ parts: Part[] }>('/groups/public/all-parts');
    },
    staleTime: Infinity
  });
};

// 기수 불러오기
export const useGroupYear = () => {
  return useSuspenseQuery<{ yearList: number[] }>({
    queryKey: ['groupYears'],
    queryFn: async () => {
      return http.get<{ yearList: number[] }>('/groups/public/all-groups-years');
    },
    staleTime: Infinity
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
