import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query';
import type { Faq, FAQForm } from 'entities/faq';

export const useFAQs = (initialData: Faq[]) => {
  return useQuery<Faq[]>({
    queryKey: ['faqs'],
    queryFn: async () => {
      const res = await fetch('/api/faqs/public/all-faq-boards');
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.msg || '데이터를 불러오는 중 에러가 발생했습니다.');
      }
      return res.json();
    },
    initialData: initialData
  });
};

export const useFAQActions = () => {
  const queryClient = useQueryClient();

  const addMutation = useMutation({
    mutationFn: (newFaq: FAQForm) => fetch('/api/faqs', { method: 'POST', body: JSON.stringify(newFaq) }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['faqs'] })
  });

  const editMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: FAQForm }) => fetch(`/api/faqs?id=${id}`, { method: 'PATCH', body: JSON.stringify(data) }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['faqs'] })
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => fetch(`/api/faqs/${id}`, { method: 'DELETE' }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['faqs'] })
  });

  return { addMutation, editMutation, deleteMutation };
};
