'use client';
import { useActivityActions } from 'entities/activity';
import { Loader2, Trash2 } from 'lucide-react';

export const DeleteActivityButton = ({ imageId }: { imageId: number }) => {
  const { deleteMutation } = useActivityActions();

  const handleDelete = () => {
    if (confirm('정말 삭제하시겠습니까?')) {
      deleteMutation.mutate(imageId);
    }
  };

  return (
    <button disabled={deleteMutation.isPending} className="rounded-lg p-2 text-slate-400 hover:bg-red-50 hover:text-red-500 disabled:opacity-50" onClick={handleDelete}>
      {deleteMutation.isPending ? <Loader2 size={16} className="animate-spin" /> : <Trash2 size={16} />}
    </button>
  );
};
