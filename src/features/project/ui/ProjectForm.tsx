'use client';
import { Suspense, useState } from 'react';
import { Project } from 'entities/project';
import { ProjectFormType, StepType } from '../types/form';
import { MainSectionForm } from './MainSectionForm';
import { IntroduceSectionForm } from './IntroduceSectionForm';
import { GridSectionForm } from './GridSectionForm';
import { StepIndicator } from './StepIndicator';
import { ArrowRight, Loader2 } from 'lucide-react';
import { useProjectSubmit } from '../hooks/useProjectSubmit';

export const ProjectForm = ({ initialData }: { initialData?: Project }) => {
  const [step, setStep] = useState<StepType>('main');
  const [form, setForm] = useState<ProjectFormType>({
    title: initialData?.title || '',
    subTitle: initialData?.subTitle || '',
    isActive: initialData?.isActive ?? true,
    androidStoreLink: initialData?.androidStoreLink || '',
    appleStoreLink: initialData?.appleStoreLink || '',
    webSiteLink: initialData?.webSiteLink || '',
    body: initialData?.body || '',
    stacks: initialData?.stacks.map((stack) => stack.id) || [],
    groups: initialData?.groups.map((group) => group.group_id) || [],
    images: Object.entries(initialData?.images || [null, null]).map(([id, url]) => ({
      id: Number(id),
      url: url as string
    }))
  });
  console.log(form);
  const isFormValid = form.title.trim().length > 0 && form.subTitle.trim().length > 0 && Boolean(form.images[0]) && Boolean(form.images[1]);

  const { submit, isPending } = useProjectSubmit(
    initialData?.id
      ? {
          mode: 'edit',
          projectId: initialData.id,
          onSuccess: () => setStep('introduce')
        }
      : {
          mode: 'create',
          onSuccess: () => setStep('introduce')
        }
  );

  const renderStepContent = () => {
    switch (step) {
      case 'main':
        return <MainSectionForm form={form} setForm={setForm} setStep={setStep} />;
      case 'introduce':
        return (
          <Suspense>
            <IntroduceSectionForm form={form} setForm={setForm} setStep={setStep} />
          </Suspense>
        );
      case 'grid':
        return (
          <Suspense>
            <GridSectionForm />
          </Suspense>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex h-full w-full flex-col p-6">
      <div className="mx-auto mb-12 w-full max-w-3xl">
        <StepIndicator currentStep={step} />
      </div>
      <section className="bg-background w-full flex-1 rounded-2xl border p-4 shadow-sm">
        {renderStepContent()}
        <div className="fixed right-24 bottom-10 z-50 flex items-center gap-4">
          <button
            onClick={() => submit(form)}
            disabled={!isFormValid || isPending}
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
    </div>
  );
};
