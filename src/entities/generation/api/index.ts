import { http } from 'shared/utils/http';
import { AddGeneration, EditGeneration, Generation } from '../types/generation';

export const generationApi = {
  getAll: () => {
    http.get<Generation[]>('/api/groups');
  },

  create: (newGeneration: AddGeneration) => {
    return http.post<Generation>(`/api/groups?member_id=${newGeneration.member_id}&role_id=${newGeneration.role_id}`, { part: newGeneration.part, year: newGeneration.year });
  },

  update: (data: EditGeneration) => {
    return http.patch<Generation>(`/api/groups?groupId=${data.group_id}&roleId=${data.role_id}`, { part: data.part, year: data.year });
  },

  delete: (id: number) => {
    return http.delete<void>(`/api/groups/${id}`);
  }
};
