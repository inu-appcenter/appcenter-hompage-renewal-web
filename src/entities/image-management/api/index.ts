import { http } from 'shared/utils/http';
import { ImageManagement } from '../types/image-management';

export const imageManagementApi = {
  getAll: () => {
    return http.get<ImageManagement[]>('/api/photo-board/public/all-boards-contents');
  },

  create: (newFormData: FormData) => {
    return http.post<ImageManagement>('/api/photo-board', newFormData);
  },

  update: ({ id, data }: { id: number; data: FormData }) => {
    return http.patch<ImageManagement>(`/api/photo-board?id=${id}`, data);
  },

  delete: (id: number) => {
    return http.delete<{ success: boolean }>(`/api/photo-board/${id}`);
  }
};
