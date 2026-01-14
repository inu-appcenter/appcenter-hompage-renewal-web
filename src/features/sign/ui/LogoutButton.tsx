import { Loader2, LogOut } from 'lucide-react';
import { useAdminLogout } from '../hooks/useAdminLogout';

export const AdminLogoutButton = () => {
  const { handleLogout, isLoggingOut } = useAdminLogout();

  return (
    <button
      onClick={handleLogout}
      disabled={isLoggingOut}
      className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-red-500 transition-colors hover:bg-red-50 disabled:opacity-50"
    >
      {isLoggingOut ? <Loader2 size={18} className="animate-spin" /> : <LogOut size={18} />}
      {isLoggingOut ? '로그아웃 중' : '로그아웃'}
    </button>
  );
};
