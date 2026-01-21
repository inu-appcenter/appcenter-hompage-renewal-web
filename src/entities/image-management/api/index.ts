import { http } from 'shared/utils/http';
import { ImageManagement } from '../types/image-management';

export const imageManagementApi = {
  getAll: () => {
    return http.get<ImageManagement[]>('/photo-board/public/all-boards-contents');
  },

  create: (newFormData: FormData) => {
    return http.post<ImageManagement>('/photo-board', newFormData);
  },

  update: ({ id, data }: { id: number; data: FormData }) => {
    return http.patch<ImageManagement>(`/photo-board?id=${id}`, data);
  },

  delete: (id: number) => {
    return http.delete<{ success: boolean }>(`/photo-board/${id}`);
  }
};
