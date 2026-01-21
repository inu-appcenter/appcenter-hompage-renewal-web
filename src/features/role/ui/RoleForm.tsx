'use client';
import { useState } from 'react';
import { Pencil, Plus, Save, Trash2, Loader2 } from 'lucide-react';
import type { Role, RoleForm } from 'entities/role';
import { useRoleActions } from 'entities/role';
import { Modal } from 'shared/ui/modal';

export const AddRoleForm = () => {
  const { addMutation } = useRoleActions();

  return (
    <Modal
      title="역할 등록"
      trigger={
        <button className="flex items-center gap-2 rounded-2xl bg-slate-900 px-6 py-3 font-bold text-white transition-all hover:bg-blue-600">
          <Plus size={18} /> 새 역할 등록
        </button>
      }
    >
      {(close) => (
        <RoleForm
          isPending={addMutation.isPending}
          onSubmit={async (data) => {
            await addMutation.mutateAsync({ roleName: data.roleName });
            close();
          }}
        />
      )}
    </Modal>
  );
};

export const EditRoleForm = ({ data }: { data: Role }) => {
  const { editMutation } = useRoleActions();

  return (
    <Modal
      title="역할 수정"
      trigger={
        <button className="rounded-lg p-2 text-slate-400 hover:bg-emerald-50 hover:text-emerald-500">
          <Pencil size={16} />
        </button>
      }
    >
      {(close) => (
        <RoleForm
          initialData={data}
          isPending={editMutation.isPending}
          onSubmit={async (formData) => {
            await editMutation.mutateAsync({ id: data.roleId, data: formData });
            close();
          }}
        />
      )}
    </Modal>
  );
};

export const DeleteRoleButton = ({ roleId }: { roleId: number }) => {
  const { deleteMutation } = useRoleActions();

  const handleDelete = () => {
    if (confirm('정말 삭제하시겠습니까?')) {
      deleteMutation.mutate(roleId);
    }
  };

  return (
    <button disabled={deleteMutation.isPending} className="rounded-lg p-2 text-slate-400 hover:bg-red-50 hover:text-red-500 disabled:opacity-50" onClick={handleDelete}>
      {deleteMutation.isPending ? <Loader2 size={16} className="animate-spin" /> : <Trash2 size={16} />}
    </button>
  );
};

const RoleForm = ({ initialData, onSubmit, isPending }: { initialData?: Role; onSubmit: (data: RoleForm) => void; isPending: boolean }) => {
  const [formData, setFormData] = useState<RoleForm>({
    roleName: initialData?.roleName || ''
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(formData);
      }}
      className="space-y-6"
    >
      <input
        disabled={isPending}
        className="w-full rounded-2xl bg-slate-50 p-4 text-sm font-semibold outline-none focus:ring-2 focus:ring-emerald-500/20 disabled:opacity-60"
        placeholder="역할 이름"
        autoFocus
        value={formData.roleName}
        onChange={(e) => setFormData({ ...formData, roleName: e.target.value })}
      />
      <button
        type="submit"
        disabled={isPending || !formData.roleName}
        className="flex w-full items-center justify-center gap-2 rounded-2xl bg-emerald-500 py-4 font-bold text-white transition-all hover:bg-emerald-600 disabled:bg-slate-300"
      >
        {isPending ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
        {isPending ? '처리 중...' : initialData ? '변경사항 저장' : '데이터베이스에 저장'}
      </button>
    </form>
  );
};
