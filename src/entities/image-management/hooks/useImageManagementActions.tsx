import { useMutation, useQueryClient, useSuspenseQuery } from '@tanstack/react-query';
import { ImageManagement } from '../types/image-management';

export const useImageManagement = () => {
  return useSuspenseQuery<ImageManagement[]>({
    queryKey: ['imageManagement'],
    queryFn: async () => {
      const res = await fetch('/api/photo-board/public/all-boards-contents');
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.msg || '데이터를 불러오는 중 에러가 발생했습니다.');
      }
      return res.json();
    }
  });
};

export const useImageManagementActions = () => {
  const queryClient = useQueryClient();

  const addMutation = useMutation({
    mutationFn: (data: FormData) => fetch('/api/photo-board', { method: 'POST', body: data }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['imageManagement'] })
  });

  const editMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: FormData }) => fetch(`/api/photo-board/${id}`, { method: 'PATCH', body: data }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['imageManagement'] })
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => fetch(`/api/photo-board/${id}`, { method: 'DELETE' }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['imageManagement'] })
  });

  return { addMutation, editMutation, deleteMutation };
};
