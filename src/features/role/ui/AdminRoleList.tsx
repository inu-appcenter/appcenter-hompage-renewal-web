'use client';
import { Role } from 'entities/role';
import { Calendar, Search, ShieldCheck } from 'lucide-react';
import { useRoles } from '../hooks/useRoleActions';
import { AddRoleForm, DeleteRoleButton, EditRoleForm } from './RoleForm';

const INITIAL_ROLES: Role[] = [
  { roleId: 1, roleName: '센터장', createdDate: '2024-02-13T23:53:03', lastModifiedDate: '2024-02-13T23:53:03' },
  { roleId: 2, roleName: '파트장', createdDate: '2024-02-13T23:53:07', lastModifiedDate: '2024-02-13T23:53:07' },
  { roleId: 3, roleName: '파트원', createdDate: '2024-02-13T23:53:10', lastModifiedDate: '2024-02-13T23:53:10' },
  { roleId: 7, roleName: '앱센터리뉴얼', createdDate: '2024-12-18T05:13:39', lastModifiedDate: '2024-12-18T05:13:39' }
];
export const AdminRoleList = () => {
  const { data } = useRoles(INITIAL_ROLES);

  return (
    <div className="flex flex-col items-end gap-6">
      <AddRoleForm />
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <table className="w-full table-fixed border-collapse text-left text-sm">
          <thead className="border-b border-slate-100 bg-slate-50/80">
            <tr>
              <th className="w-25 px-8 py-5 font-bold text-slate-400 uppercase">ID</th>

              <th className="px-6 py-5 font-bold text-slate-400 uppercase">역할명</th>
              <th className="w-80 px-6 py-5 font-bold text-slate-400 uppercase">업데이트 일자</th>

              <th className="w-35 px-6 py-5 text-right font-bold text-slate-400 uppercase">작업</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {data.map((role) => (
              <tr key={role.roleId} className="group transition-colors hover:bg-slate-50/50">
                <td className="px-8 py-5">
                  <span className="font-mono text-xs text-slate-400">#{role.roleId}</span>
                </td>
                <td className="px-6 py-5">
                  <div className="flex items-center gap-3">
                    <div className="rounded-lg bg-slate-100 p-2 text-slate-500 transition-all group-hover:bg-white group-hover:shadow-sm">
                      <ShieldCheck size={16} />
                    </div>
                    <span className="font-bold tracking-tight text-slate-800">{role.roleName}</span>
                  </div>
                </td>
                <td className="px-6 py-5">
                  <div className="flex items-center gap-2 text-slate-500">
                    <Calendar size={14} className="text-slate-300" />
                    <span className="text-xs font-medium">{role.lastModifiedDate}</span>
                  </div>
                </td>
                <td className="px-8 py-5 text-right">
                  <div className="flex justify-end gap-1 opacity-0 transition-opacity group-hover:opacity-100">
                    <EditRoleForm data={role} />
                    <DeleteRoleButton roleId={role.roleId} />
                  </div>
                </td>
              </tr>
            ))}

            {data.length === 0 && (
              <tr>
                <td colSpan={4} className="px-6 py-24 text-center">
                  <div className="flex flex-col items-center justify-center">
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-slate-50">
                      <Search className="text-slate-300" size={24} />
                    </div>
                    <p className="font-medium text-slate-500">역할이 없습니다. 추가해보세요.</p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
