import { useState } from 'react';
import { Pencil, Plus, Save, Trash2 } from 'lucide-react';
import { Faq } from 'entities/faq';

import { PART, PART_COLORS } from 'shared/constants/part';
import type { Part } from 'shared/types/part';
import { Modal } from 'shared/ui/modal';

export const AddFAQForm = () => {
  return (
    <Modal
      title="FAQ 질문 등록"
      trigger={
        <button className="flex items-center gap-2 rounded-2xl bg-slate-900 px-6 py-4 text-sm font-bold text-white transition-all hover:bg-emerald-600">
          <Plus size={18} /> 새 질문 등록
        </button>
      }
    >
      {(close) => (
        <FAQForm
          initialPart="Common"
          onSubmit={(data) => {
            console.log(data);
            close();
          }}
        />
      )}
    </Modal>
  );
};

export const EditFAQForm = ({ data }: { data: Faq }) => {
  return (
    <Modal
      title="FAQ 질문 수정"
      trigger={
        <button className="rounded-lg p-2 text-slate-400 hover:bg-emerald-50 hover:text-emerald-500">
          <Pencil size={16} />
        </button>
      }
    >
      {(close) => (
        <FAQForm
          initialData={data}
          onSubmit={(data) => {
            console.log(data);
            close();
          }}
        />
      )}
    </Modal>
  );
};

export const DeleteFAQButton = ({ faqId }: { faqId: number }) => {
  return (
    <button className="rounded-lg p-2 text-slate-400 hover:bg-red-50 hover:text-red-500" onClick={() => console.log(`Delete FAQ with ID: ${faqId}`)}>
      <Trash2 size={16} />
    </button>
  );
};

interface FAQForm {
  part: Part;
  question: string;
  answer: string;
}
const FAQForm = ({ initialData, initialPart, onSubmit }: { initialData?: Faq; initialPart?: Part; onSubmit: (data: FAQForm) => void }) => {
  const [formData, setFormData] = useState({
    part: initialData?.part || initialPart || 'Common',
    question: initialData?.question || '',
    answer: initialData?.answer || ''
  });

  return (
    <div className="space-y-6">
      <div>
        <label className="mb-2 block text-xs font-bold text-slate-400 uppercase">Part</label>
        <div className="flex flex-wrap gap-2">
          {PART.map((p) => (
            <button
              key={p}
              onClick={() => setFormData({ ...formData, part: p })}
              className={`rounded-xl px-4 py-2 text-xs font-bold transition-all ${formData.part === p ? `${PART_COLORS[p]?.bg} ${PART_COLORS[p]?.text}` : 'bg-slate-50 text-slate-400'}`}
            >
              {p}
            </button>
          ))}
        </div>
      </div>
      <input
        className="w-full rounded-2xl bg-slate-50 p-4 text-sm font-semibold outline-none focus:ring-2 focus:ring-emerald-500/20"
        placeholder="질문 내용"
        value={formData.question}
        onChange={(e) => setFormData({ ...formData, question: e.target.value })}
      />
      <textarea
        className="min-h-35 w-full rounded-2xl bg-slate-50 p-4 text-sm outline-none focus:ring-2 focus:ring-emerald-500/20"
        placeholder="답변 내용"
        value={formData.answer}
        onChange={(e) => setFormData({ ...formData, answer: e.target.value })}
      />
      <button onClick={() => onSubmit(formData)} className="flex w-full items-center justify-center gap-2 rounded-2xl bg-emerald-500 py-4 font-bold text-white transition-all hover:bg-emerald-600">
        <Save size={18} /> {initialData ? '변경사항 저장' : '데이터베이스에 저장'}
      </button>
    </div>
  );
};
