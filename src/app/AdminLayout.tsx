'use client';
import { Users, Layout as ProjectIcon, ImageIcon, MessageCircle, LogOut, ChevronRight, Activity, Loader2 } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { useLogout } from 'features/login';
import Link from 'next/link';

const menuGroups = [
  {
    group: '동아리 관리',
    items: [
      { name: '동아리원 관리', href: '/admin/members', icon: <Users size={18} /> },
      { name: '기수 관리', href: '/admin/generations', icon: <Activity size={18} /> },
      { name: '역할 관리', href: '/admin/roles', icon: <ChevronRight size={18} /> }
    ]
  },
  {
    group: '콘텐츠 관리',
    items: [
      { name: '프로젝트 관리', href: '/admin/projects', icon: <ProjectIcon size={18} /> },
      { name: '사진게시판 관리', href: '/admin/gallery', icon: <ImageIcon size={18} /> },
      { name: '질문 관리 (FAQ)', href: '/admin/faq', icon: <MessageCircle size={18} /> }
    ]
  }
];

export function AdminLayout({ children }: { children: React.ReactNode }) {
  const { handleLogout, isLoggingOut } = useLogout();
  const pathname = usePathname();

  return (
    <div className="flex min-h-screen bg-[#F8F9FA]">
      <aside className="fixed inset-y-0 left-0 w-64 border-r border-slate-200 bg-white px-4 py-8">
        <div className="mb-10 flex items-center gap-2 px-4 text-xl font-bold tracking-tight">
          <div className="h-7 w-7 rounded-lg bg-slate-900" />
          <span>AppCenter</span>
        </div>
        <nav className="space-y-8">
          {menuGroups.map((group) => (
            <div key={group.group}>
              <p className="mb-3 px-4 text-[11px] font-bold tracking-wider text-slate-400 uppercase">{group.group}</p>
              <div className="space-y-1">
                {group.items.map((item) => {
                  const isActive = pathname === item.href;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all ${
                        isActive ? 'bg-slate-900 text-white shadow-lg shadow-slate-200' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
                      }`}
                    >
                      {item.icon}
                      {item.name}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>
        <div className="absolute right-4 bottom-8 left-4">
          <button
            onClick={handleLogout}
            disabled={isLoggingOut}
            className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-red-500 transition-colors hover:bg-red-50 disabled:opacity-50"
          >
            {isLoggingOut ? <Loader2 size={18} className="animate-spin" /> : <LogOut size={18} />}
            {isLoggingOut ? 'Logging out...' : 'Logout'}
          </button>
        </div>
      </aside>

      <main className="ml-64 flex-1 overflow-y-auto px-10 py-12">
        <div className="mx-auto max-w-5xl">{children}</div>
      </main>
    </div>
  );
}
