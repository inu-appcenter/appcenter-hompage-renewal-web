import { useMutation, useQueryClient, useSuspenseQuery } from '@tanstack/react-query';
import { Part } from 'shared/types/part';
import { generationOptions } from '../api/queries';
import { generationApi } from '../api';

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
      const res = await fetch('/api/groups/public/all-parts');
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.msg || '데이터를 불러오는 중 에러가 발생했습니다.');
      }
      return res.json();
    },
    staleTime: Infinity
  });
};

// 기수 불러오기
export const useGroupYear = () => {
  return useSuspenseQuery<{ yearList: number[] }>({
    queryKey: ['groupYears'],
    queryFn: async () => {
      const res = await fetch('/api/groups/public/all-groups-years');
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.msg || '데이터를 불러오는 중 에러가 발생했습니다.');
      }
      return res.json();
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
