import { http } from 'shared/utils/http';
import type { Project } from '../types/project';

export const projectApi = {
  getAll: () => {
    return http.get<Project[]>('/introduction-board/public/all-boards-contents');
  },

  create: (newProject: FormData) => {
    return http.post<Project>('/introduction-board', newProject);
  },

  update: ({ data, id }: { data: FormData; id: number }) => {
    return http.patch<Project>(`/introduction-board?board_id=${id}`, data);
  },

  delete: (id: number) => {
    return http.delete<void>(`/introduction-board/${id}`);
  },

  toggleActive: ({ id, isActive }: { id: number; isActive: boolean }) => {
    return http.patch<Project>(`/introduction-board/${id}/activation?isActive=${isActive}`, {});
  }
};
