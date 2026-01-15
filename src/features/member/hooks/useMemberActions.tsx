import { useMutation, useQueryClient, useSuspenseQuery } from '@tanstack/react-query';
import type { Member, MemberForm } from 'entities/member';

export const useMember = () => {
  return useSuspenseQuery<Member[]>({
    queryKey: ['members'],
    queryFn: async () => {
      const res = await fetch('/api/members/all-members');
      if (!res.ok) throw new Error('불러오기 실패');
      return res.json();
    }
  });
};

export const useMemberActions = () => {
  const queryClient = useQueryClient();

  const addMutation = useMutation({
    mutationFn: (newMember: MemberForm) => fetch('/api/members', { method: 'POST', body: JSON.stringify(newMember) }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['members'] })
  });

  const editMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: MemberForm }) => fetch(`/api/members?id=${id}`, { method: 'PATCH', body: JSON.stringify(data) }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['members'] })
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => fetch(`/api/members/${id}`, { method: 'DELETE' }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['members'] })
  });

  return { addMutation, editMutation, deleteMutation };
};
