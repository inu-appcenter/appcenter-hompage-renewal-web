import { Plus } from 'lucide-react';
import Link from 'next/link';

export const AddActivityButton = () => {
  return (
    <Link href="/admin/activity/editor" className="flex items-center gap-2 rounded-2xl bg-slate-900 px-6 py-3 font-bold text-white transition-all hover:bg-blue-600">
      <Plus size={18} /> 새 활동 추가
    </Link>
  );
};
