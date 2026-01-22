'use client';
import { useState } from 'react';
import { ArrowRight, Loader2, Plus } from 'lucide-react';
import { useProject } from 'entities/project';
import { useProjectSubmit } from '../hooks/useProjectSubmit';
import { StackForm } from './StackForm';
import { TeamForm } from './TeamForm';
import { IntroduceForm } from '../types/form';

const TABS_PLACEHOLDERS = ['사용 스택', '팀원 정보', '이용 현황'];

export const IntroduceSectionForm = ({ setStep }: { setStep: React.Dispatch<React.SetStateAction<'main' | 'introduce' | 'grid'>> }) => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [form, setForm] = useState<IntroduceForm>({ stack: [], groups: [] });

  const { data: projects } = useProject();
  const project = projects[projects.length - 1];
  const { submit, isPending } = useProjectSubmit({
    mode: 'edit',
    projectId: project.id,
    onSuccess: () => setStep('grid')
  });

  const handleSubmit = async () => {
    const currentImages = project.images ? Object.values(project.images) : [];
    await submit({
      title: project.title,
      subTitle: project.subTitle,
      isActive: project.isActive,
      androidStoreLink: project.androidStoreLink,
      appleStoreLink: project.appleStoreLink,
      webSiteLink: project.websiteLink,
      body: project.body || '',
      stackIds: form.stack,
      groupIds: form.groups,
      images: currentImages
    });
  };

  return (
    <section className="mx-20 flex h-screen flex-col items-center justify-center gap-10">
      <div className="relative flex flex-row gap-30">
        {TABS_PLACEHOLDERS.map((tab, index) => (
          <SelectButton key={index} text={tab} isSelected={selectedTab === index} onClick={() => setSelectedTab(index)} />
        ))}
      </div>
      <div className="bg-custom-black h-118.5 w-full overflow-hidden rounded-2xl p-8 text-5xl whitespace-pre-line text-white">
        {selectedTab === 0 && <StackForm form={form} setForm={setForm} />}
        {selectedTab === 1 && <TeamForm form={form} setForm={setForm} />}
        {selectedTab === 2 && '아직 미구현'}
      </div>
      <div className="fixed right-24 bottom-10 z-50 flex items-center gap-4">
        <button
          onClick={handleSubmit}
          disabled={isPending}
          className="group bg-brand-primary-cta text-custom-black flex items-center gap-2 rounded-full px-6 py-4 text-xl font-semibold shadow-lg transition-all hover:-translate-y-0.5 hover:shadow-xl hover:brightness-110 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0 disabled:hover:shadow-lg"
        >
          {isPending ? (
            <>
              <Loader2 className="animate-spin" size={20} />
              <span className="font-medium">저장 중...</span>
            </>
          ) : (
            <>
              <span className="font-medium">다음 (저장)</span>
              <ArrowRight className="transition-transform duration-300 group-hover:translate-x-1" size={20} />
            </>
          )}
        </button>
      </div>
    </section>
  );
};

const SelectButton = ({ text, onClick, isSelected }: { text: string; onClick: () => void; isSelected: boolean }) => {
  return (
    <button
      onClick={onClick}
      className={`group relative flex cursor-pointer items-center gap-2.5 rounded-[40px] px-6 py-3 text-2xl transition-colors duration-300 ${
        isSelected ? 'text-brand-primary-cta border-brand-primary-cta border shadow-[0px_0px_16px_0px_#57FF8566]' : 'text-text-primary border-text-primary border'
      }`}
    >
      <div>
        <Plus fill={'currentColor'} strokeWidth={0.5} size={28} />
      </div>

      <span className="relative z-10">{text}</span>
    </button>
  );
};
