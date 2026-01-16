import { useMutation, useQueryClient, useSuspenseQuery } from '@tanstack/react-query';
import { Generation } from 'entities/generation';
import { Part } from 'shared/types/part';
import { AddGeneration, EditGeneration } from '../types/generation';

export const useGeneration = () => {
  return useSuspenseQuery<Generation[]>({
    queryKey: ['generations'],
    queryFn: async () => {
      const res = await fetch('/api/groups/public/all-groups-members');
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.msg || '데이터를 불러오는 중 에러가 발생했습니다.');
      }
      return res.json();
    }
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

  const addMutation = useMutation({
    mutationFn: (newGeneration: AddGeneration) =>
      fetch(`/api/groups?member_id=${newGeneration.member_id}&role_id=${newGeneration.role_id}`, { method: 'POST', body: JSON.stringify({ part: newGeneration.part, year: newGeneration.year }) }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['generations'] })
  });

  const editMutation = useMutation({
    mutationFn: ({ data }: { data: EditGeneration }) =>
      fetch(`/api/groups?groupId=${data.group_id}&roleId=${data.role_id}`, { method: 'PATCH', body: JSON.stringify({ part: data.part, year: data.year }) }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['generations'] })
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => fetch(`/api/groups/${id}`, { method: 'DELETE' }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['generations'] })
  });

  return { addMutation, editMutation, deleteMutation };
};
