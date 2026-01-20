import { http } from 'shared/utils/http';
import { Generation, GenerationForm } from '../types/generation';

export const generationApi = {
  getAll: () => {
    return http.get<Generation[]>('/api/groups');
  },

  create: (newGeneration: GenerationForm) => {
    return http.post<Generation>(`/api/groups?member_id=${newGeneration.id}&role_id=${newGeneration.role_id}`, { part: newGeneration.part, year: newGeneration.year });
  },

  update: (data: GenerationForm) => {
    return http.patch<Generation>(`/api/groups?groupId=${data.id}&roleId=${data.role_id}`, { part: data.part, year: data.year });
  },

  delete: (id: number) => {
    return http.delete<void>(`/api/groups/${id}`);
  }
};
