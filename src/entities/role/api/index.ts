import { http } from 'shared/utils/http';
import type { Role, RoleForm } from '../types/role';

export const roleApi = {
  getAll: () => {
    return http.get<Role[]>('/api/roles/all-roles');
  },

  create: (newRole: RoleForm) => {
    return http.post<Role>('/api/roles', newRole);
  },

  update: ({ id, data }: { id: number; data: RoleForm }) => {
    return http.patch<Role>(`/api/roles?id=${id}`, data);
  },

  delete: (id: number) => {
    return http.delete<{ success: boolean }>(`/api/roles/${id}`);
  }
};
