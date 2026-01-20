import { Generation, GenerationForm, useGenerationActions } from 'entities/generation';
import { Loader2, Pencil, Save } from 'lucide-react';
import { useState } from 'react';
import { Modal } from 'shared/ui/modal';
import { CommonFields } from './CommonField';
import { useRoles } from 'entities/role';

export const EditGenerationForm = ({ data }: { data: Generation }) => {
  const { editMutation } = useGenerationActions();
  const { data: roleData } = useRoles();

  const initialValues: GenerationForm = {
    id: data.group_id,
    role_id: roleData?.find((r) => r.roleName === data.role)?.roleId ?? 0,
    year: data.year,
    part: data.part
  };

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
        <EditFormContent
          initialData={initialValues}
          memberName={data.member}
          isPending={editMutation.isPending}
          onSubmit={async (formData) => {
            await editMutation.mutateAsync(formData);
            close();
          }}
        />
      )}
    </Modal>
  );
};

const EditFormContent = ({ initialData, memberName, onSubmit, isPending }: { initialData: GenerationForm; memberName: string; onSubmit: (data: GenerationForm) => void; isPending: boolean }) => {
  const [formData, setFormData] = useState<GenerationForm>(initialData);
  const isValid = formData.role_id !== null && formData.year && formData.part;

  return (
    <div className="space-y-7 py-2">
      <p className="mb-1 text-xs font-bold text-slate-400">수정 대상</p>
      <div className="rounded-xl border border-slate-100 bg-slate-50 p-4">
        <p className="text-sm font-bold text-slate-700">
          {memberName}{' '}
          <span className="font-normal text-slate-400">
            ({formData.year}기 {formData.part}) #{formData.id}
          </span>
        </p>
      </div>

      <CommonFields formData={formData} setFormData={setFormData} />

      <div className="pt-2">
        <button
          disabled={isPending || !isValid}
          onClick={() => onSubmit(formData)}
          className="flex w-full items-center justify-center gap-2 rounded-2xl bg-indigo-600 py-4 font-bold text-white shadow-xl shadow-indigo-100 transition-all hover:bg-indigo-700 active:scale-[0.98] disabled:bg-slate-200 disabled:shadow-none"
        >
          {isPending ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
          {isPending ? '처리 중...' : '변경사항 저장'}
        </button>
      </div>
    </div>
  );
};
