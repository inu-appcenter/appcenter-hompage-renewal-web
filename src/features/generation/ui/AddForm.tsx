import { useState } from 'react';
import { Loader2, Plus, Save } from 'lucide-react';
import { GenerationForm, useGenerationActions } from 'entities/generation';
import { Modal } from 'shared/ui/modal';
import { SearchMember } from './SearchMember';
import { CommonFields } from './CommonField';

export const AddGenerationForm = () => {
  const { addMutation } = useGenerationActions();

  return (
    <Modal
      title="기수 등록"
      trigger={
        <button className="flex items-center gap-2 rounded-2xl bg-slate-900 px-6 py-3 font-bold text-white transition-all hover:bg-blue-600">
          <Plus size={18} /> 새 기수 등록
        </button>
      }
    >
      {(close) => (
        <AddFormContent
          isPending={addMutation.isPending}
          onSubmit={async (data) => {
            await addMutation.mutateAsync(data);
            close();
          }}
        />
      )}
    </Modal>
  );
};

const DEFAULT_FORM: GenerationForm = {
  id: 0,
  role_id: 3, // 기본값을 파트원으로 설정
  year: new Date().getFullYear() - 2008, // 2026년인 경우 18기, 2027년인 경우 19기...
  part: 'Common'
};
const AddFormContent = ({ onSubmit, isPending }: { onSubmit: (data: GenerationForm) => void; isPending: boolean }) => {
  const [formData, setFormData] = useState<GenerationForm>(DEFAULT_FORM);
  const [selectedName, setSelectedName] = useState('');

  const isValid = formData.id !== 0 && formData.year && formData.role_id && formData.part;

  return (
    <div className="space-y-7 py-2">
      <div className="relative space-y-3">
        <SearchMember
          initialName={selectedName}
          isPending={isPending}
          onSelect={(member) => {
            setFormData((prev) => ({ ...prev, member_id: member.member_id }));
            setSelectedName(member.name);
          }}
        />
      </div>

      <CommonFields formData={formData} setFormData={setFormData} />
      <div className="pt-2">
        <button
          disabled={isPending || !isValid}
          onClick={() => onSubmit(formData)}
          className="flex w-full items-center justify-center gap-2 rounded-2xl bg-indigo-600 py-4 font-bold text-white shadow-xl shadow-indigo-100 transition-all hover:bg-indigo-700 active:scale-[0.98] disabled:bg-slate-200 disabled:shadow-none"
        >
          {isPending ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
          {isPending ? '처리 중...' : '데이터베이스에 저장'}
        </button>
      </div>
    </div>
  );
};
