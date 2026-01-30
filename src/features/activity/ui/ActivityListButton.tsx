import { Loader2, Pencil, Plus, Trash2 } from 'lucide-react';
import { useActivityActions } from 'entities/activity';
import Link from 'next/link';

export const AddActivityButton = () => {
  return (
    <Link href="/admin/activity/editor" className="flex items-center gap-2 rounded-2xl bg-slate-900 px-6 py-3 font-bold text-white transition-all hover:bg-blue-600">
      <Plus size={18} /> 새 활동 추가
    </Link>
  );
};

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

export const EditActivityButton = ({ id }: { id: number }) => {
  return (
    <Link href={`/admin/activity/editor/${id}`} className="rounded-lg p-2 text-slate-400 hover:bg-emerald-50 hover:text-emerald-500">
      <Pencil size={16} />
    </Link>
  );
};
