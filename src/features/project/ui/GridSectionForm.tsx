'use client';
import { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';

import { GridItem, ProjectFormType } from '../types/form';
import { GridEditor } from './grid-section/GridEditor';

interface GridSectionFormProps {
  form: ProjectFormType;
  setForm: React.Dispatch<React.SetStateAction<ProjectFormType>>;
  projectId: number | null;
}
export const GridSectionForm = ({ form, setForm, projectId }: GridSectionFormProps) => {
  const [sections, setSections] = useState<GridItem[][]>(() => {
    if (!form.body) return [[]];
    try {
      return JSON.parse(form.body);
    } catch {
      return [
        [
          {
            i: '1',
            x: 0,
            y: 0,
            w: 12,
            h: 10,
            type: 'text',
            content: form.body
          }
        ]
      ];
    }
  });

  useEffect(() => {
    setForm((prev) => ({
      ...prev,
      body: JSON.stringify(sections)
    }));
  }, [sections, setForm]);

  const addSection = () => {
    setSections((prev) => [...prev, []]);
  };

  const removeSection = (index: number) => {
    if (sections.length === 1) return alert('최소 하나의 섹션은 필요합니다.');
    setSections((prev) => prev.filter((_, i) => i !== index));
  };

  const updateSectionItems = (index: number, newItems: GridItem[]) => {
    setSections((prev) => {
      const newSections = [...prev];
      newSections[index] = newItems;
      return newSections;
    });
  };

  return (
    <section className="relative flex w-full flex-col px-8 pt-8 text-white">
      <div className="mb-8 flex flex-col gap-2">
        <h2 className="text-3xl font-bold text-gray-200">소개 글 작성</h2>
        <p className="text-sm text-gray-500">각 섹션은 JSON 문자열로 직렬화되어 저장됩니다.</p>
      </div>

      <div className="flex flex-col gap-10">
        {sections.map((items, index) => (
          <GridEditor
            key={`section-${index}`}
            projectId={projectId}
            index={index}
            initialItems={items}
            onUpdate={(newItems) => updateSectionItems(index, newItems)}
            onRemoveSection={() => removeSection(index)}
            currentForm={form}
          />
        ))}
      </div>

      <div className="mt-12 mb-32 flex justify-center">
        <button
          onClick={addSection}
          className="hover:border-brand-primary flex items-center gap-2 rounded-xl border border-gray-700 bg-gray-900/50 px-10 py-4 font-bold text-gray-400 transition-all hover:text-white"
        >
          <Plus size={20} />
          <span>새로운 레이아웃 섹션 추가</span>
        </button>
      </div>
    </section>
  );
};
