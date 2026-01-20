import { http } from 'shared/utils/http';
import type { Member, MemberForm } from '../types/member';

export const memberApi = {
  getAll: () => {
    return http.get<Member[]>('/api/members/all-members');
  },

  getByName: (name: string) => {
    return http.get<Member[]>(`/api/members/id/${encodeURIComponent(name.trim())}`);
  },

  create: (newMember: MemberForm) => {
    return http.post<Member>('/api/members', newMember);
  },

  update: ({ id, data }: { id: number; data: MemberForm }) => {
    return http.patch<Member>(`/api/members?id=${id}`, data);
  },

  delete: (id: number) => {
    return http.delete<{ success: boolean }>(`/api/members/${id}`);
  }
};
