import { useMutation, useQueryClient, useSuspenseQuery } from '@tanstack/react-query';
import type { Role, RoleForm } from 'entities/role';

export const useRoles = () => {
  return useSuspenseQuery<Role[]>({
    queryKey: ['roles'],
    queryFn: async () => {
      const res = await fetch('/api/roles/all-roles');
      if (!res.ok) throw new Error('불러오기 실패');
      return res.json();
    }
  });
};

export const useRoleActions = () => {
  const queryClient = useQueryClient();

  const addMutation = useMutation({
    mutationFn: (newRole: RoleForm) => fetch('/api/roles', { method: 'POST', body: JSON.stringify(newRole) }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['roles'] })
  });

  const editMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: RoleForm }) => fetch(`/api/roles?id=${id}`, { method: 'PATCH', body: JSON.stringify(data) }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['roles'] })
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => fetch(`/api/roles/${id}`, { method: 'DELETE' }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['roles'] })
  });

  return { addMutation, editMutation, deleteMutation };
};
