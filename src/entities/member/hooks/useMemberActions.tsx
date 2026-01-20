import { useMutation, useQuery, useQueryClient, useSuspenseQuery } from '@tanstack/react-query';
import { memberKeys, memberOptions } from '../api/queries';
import { memberApi } from '../api';

export const useMember = () => {
  return useSuspenseQuery({
    ...memberOptions.all()
  });
};

export const useSearchMember = (query: string, enabled = false) => {
  return useQuery({
    ...memberOptions.search(query),
    enabled: enabled,
    retry: false
  });
};

export const useMemberActions = () => {
  const queryClient = useQueryClient();

  const invalidateMembers = () => {
    return queryClient.invalidateQueries({ queryKey: memberKeys.lists() });
  };

  const addMutation = useMutation({
    mutationFn: memberApi.create,
    onSuccess: invalidateMembers
  });

  const editMutation = useMutation({
    mutationFn: memberApi.update,
    onSuccess: invalidateMembers
  });

  const deleteMutation = useMutation({
    mutationFn: memberApi.delete,
    onSuccess: invalidateMembers
  });

  return { addMutation, editMutation, deleteMutation };
};
