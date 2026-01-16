'use client';
import { useGenerationActions } from 'entities/generation';
import { Trash2, Loader2 } from 'lucide-react';

export const DeleteGenerationButton = ({ generationId }: { generationId: number }) => {
  const { deleteMutation } = useGenerationActions();

  const handleDelete = () => {
    if (confirm('정말 삭제하시겠습니까?')) {
      deleteMutation.mutate(generationId);
    }
  };

  return (
    <button disabled={deleteMutation.isPending} className="rounded-lg p-2 text-slate-400 hover:bg-red-50 hover:text-red-500 disabled:opacity-50" onClick={handleDelete}>
      {deleteMutation.isPending ? <Loader2 size={16} className="animate-spin" /> : <Trash2 size={16} />}
    </button>
  );
};
