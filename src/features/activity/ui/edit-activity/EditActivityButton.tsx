import { Pencil } from 'lucide-react';
import Link from 'next/link';

export const EditActivityButton = ({ id }: { id: number }) => {
  return (
    <Link href={`/admin/activity/editor/${id}`} className="rounded-lg p-2 text-slate-400 hover:bg-emerald-50 hover:text-emerald-500">
      <Pencil size={16} />
    </Link>
  );
};
