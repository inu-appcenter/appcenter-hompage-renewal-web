import { Loader2 } from 'lucide-react';
import { useProjectActions } from 'entities/project';

interface ProjectStatusToggleProps {
  projectId: number;
  isActive: boolean;
}
export const ProjectStatusToggle = ({ projectId, isActive }: ProjectStatusToggleProps) => {
  const { toggleMutation } = useProjectActions();

  const isPending = toggleMutation.isPending;

  const handleToggle = () => {
    if (isPending) return;

    toggleMutation.mutate({
      id: projectId,
      isActive: !isActive
    });
  };

  return (
    <button
      onClick={handleToggle}
      disabled={isPending}
      title={isActive ? '비활성화하기' : '활성화하기'}
      className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2 focus:outline-none ${
        isActive ? 'bg-emerald-500' : 'bg-slate-200'
      } ${isPending ? 'cursor-not-allowed opacity-50' : ''}`}
    >
      <span className="sr-only">상태 변경</span>
      <span
        aria-hidden="true"
        className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${isActive ? 'translate-x-5' : 'translate-x-0'}`}
      >
        {isPending && (
          <span className="absolute inset-0 flex items-center justify-center">
            <Loader2 size={10} className="animate-spin text-slate-400" />
          </span>
        )}
      </span>
    </button>
  );
};
