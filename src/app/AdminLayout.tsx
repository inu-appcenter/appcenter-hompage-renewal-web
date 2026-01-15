import { AdminSidebar } from 'widgets/sidebar';
import { Breadcrumbs } from 'shared/ui/breadcrumbs';

export function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="group flex min-h-screen bg-[#F8F9FA]">
      <AdminSidebar />
      <main className="ml-64 flex-1 overflow-y-auto px-10 py-12 transition-all duration-300 ease-in-out group-has-[aside.w-20]:ml-20">
        <div className="mx-auto max-w-7xl">
          <Breadcrumbs />
          {children}
        </div>
      </main>
    </div>
  );
}
