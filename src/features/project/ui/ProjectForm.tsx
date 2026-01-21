'use client';
import Link from 'next/link';
import { Pencil, Plus, Trash2, Loader2 } from 'lucide-react';

import { Project, useProjectActions } from 'entities/project';

export const AddProjectForm = () => {
  return (
    <Link href="/admin/project/new">
      <button className="flex items-center gap-2 rounded-2xl bg-slate-900 px-6 py-3 font-bold text-white transition-all hover:bg-blue-600">
        <Plus size={18} /> 새 프로젝트 추가
      </button>
    </Link>
  );
};

export const EditProjectForm = ({ project }: { project: Project }) => {
  return (
    <Link href={`/admin/project/edit/${project.id}`}>
      <button className="rounded-lg p-2 text-slate-400 hover:bg-emerald-50 hover:text-emerald-500">
        <Pencil size={16} />
      </button>
    </Link>
  );
};

export const DeleteProjectButton = ({ projectId }: { projectId: number }) => {
  const { deleteMutation } = useProjectActions();

  const handleDelete = () => {
    if (confirm('정말 삭제하시겠습니까?')) {
      deleteMutation.mutate(projectId);
    }
  };

  return (
    <button disabled={deleteMutation.isPending} className="rounded-lg p-2 text-slate-400 hover:bg-red-50 hover:text-red-500 disabled:opacity-50" onClick={handleDelete}>
      {deleteMutation.isPending ? <Loader2 size={16} className="animate-spin" /> : <Trash2 size={16} />}
    </button>
  );
};
