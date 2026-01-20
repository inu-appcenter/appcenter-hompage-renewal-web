import { http } from 'shared/utils/http';
import type { Faq, FAQForm } from 'entities/faq';

export const faqApi = {
  getAll: () => {
    return http.get<Faq[]>('/api/faqs/public/all-faq-boards');
  },

  create: (newFaq: FAQForm) => {
    return http.post<Faq>('/api/faqs', newFaq);
  },

  update: ({ id, data }: { id: number; data: FAQForm }) => {
    return http.patch<Faq>(`/api/faqs?id=${id}`, data);
  },

  delete: (id: number) => {
    return http.delete<{ success: boolean }>(`/api/faqs/${id}`);
  }
};
