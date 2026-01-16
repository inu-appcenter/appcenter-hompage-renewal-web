import { useMutation, useQueryClient, useSuspenseQuery } from '@tanstack/react-query';
import { Generation, GenerationForm } from 'entities/generation';

export const useGeneration = () => {
  return useSuspenseQuery<Generation[]>({
    queryKey: ['generations'],
    queryFn: async () => {
      const res = await fetch('/api/groups/public/all-groups-members');
      if (!res.ok) throw new Error('불러오기 실패');
      return res.json();
    }
  });
};

export const usePart = () => {
  return useSuspenseQuery<{ yearList: number[] }>({
    queryKey: ['groupYears'],
    queryFn: async () => {
      const res = await fetch('/api/groups/public/all-groups-years');
      if (!res.ok) throw new Error('불러오기 실패');
      return res.json();
    },
    staleTime: Infinity
  });
};

export const useGroupYear = () => {
  return useSuspenseQuery<{ yearList: number[] }>({
    queryKey: ['groupYears'],
    queryFn: async () => {
      const res = await fetch('/api/groups/public/all-groups-years');
      if (!res.ok) throw new Error('불러오기 실패');
      return res.json();
    },
    staleTime: Infinity
  });
};

export const useGenerationActions = () => {
  const queryClient = useQueryClient();

  const addMutation = useMutation({
    mutationFn: (newGeneration: GenerationForm) => fetch('/api/generations', { method: 'POST', body: JSON.stringify(newGeneration) }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['generations'] })
  });

  const editMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: GenerationForm }) => fetch(`/api/generations?id=${id}`, { method: 'PATCH', body: JSON.stringify(data) }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['generations'] })
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => fetch(`/api/generations/${id}`, { method: 'DELETE' }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['generations'] })
  });

  return { addMutation, editMutation, deleteMutation };
};
