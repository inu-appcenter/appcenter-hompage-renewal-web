'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AdminLogoutButton } from 'features/sign';

import { Logo } from 'shared/icon/Logo';
import { ADMIN_MENU } from 'shared/constants/adminMenu';

export function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="flex min-h-screen bg-[#F8F9FA]">
      <aside className="fixed inset-y-0 left-0 w-64 border-r border-slate-200 bg-white px-4 py-8">
        <div className="mb-10 flex items-center gap-2 px-4 text-xl font-bold tracking-tight">
          <Link href="/admin/home">
            <Logo className="h-7 w-7" />
          </Link>
        </div>

        <nav className="space-y-6">
          {ADMIN_MENU.map((item) => (
            <div key={item.group}>
              <p className="mb-3 px-4 text-[11px] font-bold tracking-wider text-slate-400 uppercase">{item.group}</p>

              <div className="space-y-1">
                {item.subMenu
                  ? // 서브메뉴가 있는 경우 (동아리 관리 등)
                    item.subMenu.map((sub) => {
                      const isActive = pathname === sub.href;
                      return (
                        <Link
                          key={sub.href}
                          href={sub.href}
                          className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all ${
                            isActive ? 'bg-slate-900 text-white shadow-lg shadow-slate-200' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
                          }`}
                        >
                          <sub.icon size={18} />
                          {sub.name}
                        </Link>
                      );
                    })
                  : // 서브메뉴가 없는 단일 항목인 경우
                    (() => {
                      const isActive = pathname === item.path;
                      return (
                        <Link
                          href={item.path}
                          className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all ${
                            isActive ? 'bg-slate-900 text-white shadow-lg shadow-slate-200' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
                          }`}
                        >
                          <item.icon size={18} />
                          {item.group}
                        </Link>
                      );
                    })()}
              </div>
            </div>
          ))}
        </nav>

        <div className="absolute right-4 bottom-8 left-4">
          <AdminLogoutButton />
        </div>
      </aside>

      <main className="ml-64 flex-1 overflow-y-auto px-10 py-12">
        <div className="mx-auto max-w-5xl">{children}</div>
      </main>
    </div>
  );
}
