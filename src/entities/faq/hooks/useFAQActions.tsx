import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query';
import type { Faq, FAQForm } from 'entities/faq';

export const useFAQs = (initialData: Faq[]) => {
  return useQuery<Faq[]>({
    queryKey: ['faqs'],
    queryFn: async () => {
      const res = await fetch('/api/faqs/public/all-faq-boards');
      if (!res.ok) throw new Error('불러오기 실패');
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
