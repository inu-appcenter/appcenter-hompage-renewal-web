import { http } from 'shared/utils/http';
import type { SkillStack } from '../types/stack';

export const skillStackApi = {
  getAll: () => {
    return http.get<SkillStack[]>('/stacks/public/all');
  },

  create: (newSkill: FormData) => {
    return http.post<SkillStack>('/stacks', newSkill);
  },

  update: ({ id, data }: { id: number; data: FormData }) => {
    return http.patch<SkillStack>(`/stacks/${id}`, data);
  },

  delete: (id: number) => {
    return http.delete<{ success: boolean }>(`/stacks/${id}`);
  }
};
