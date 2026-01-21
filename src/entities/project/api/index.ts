import { http } from 'shared/utils/http';
import type { Project, ProjectForm } from '../types/project';

export const projectApi = {
  getAll: () => {
    return http.get<Project[]>('/introduction-board/public/all-boards-contents');
  },

  create: (newProject: ProjectForm) => {
    return http.post<Project>('/introduction-board', newProject);
  },

  update: ({ data, id }: { data: ProjectForm; id: number }) => {
    return http.patch<Project>(`/introduction-board/${id}`, data);
  },

  delete: (id: number) => {
    return http.delete<void>(`/introduction-board/${id}`);
  },

  toggleActive: ({ id, isActive }: { id: number; isActive: boolean }) => {
    return http.patch<Project>(`/introduction-board/${id}/activation?isActive=${isActive}`, {});
  }
};
