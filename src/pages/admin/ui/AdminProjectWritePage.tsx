'use client';
import { Suspense, useState } from 'react';
import { IntroduceSectionForm, MainSectionForm, StepIndicator, type StepType } from 'features/project';

export const AdminProjectWritePage = () => {
  const [step, setStep] = useState<StepType>('introduce');

  const renderStepContent = () => {
    switch (step) {
      case 'main':
        return <MainSectionForm setStep={setStep} />;
      case 'introduce':
        return (
          <Suspense>
            <IntroduceSectionForm setStep={setStep} />;
          </Suspense>
        );
      case 'grid':
        return <div>그리드 폼 컴포넌트 (준비중)</div>;
      default:
        return null;
    }
  };

  return (
    <div className="flex h-full w-full flex-col p-6">
      <div className="mx-auto mb-12 w-full max-w-3xl">
        <StepIndicator currentStep={step} />
      </div>
      <section className="bg-background w-full flex-1 rounded-2xl border p-4 shadow-sm">{renderStepContent()}</section>
    </div>
  );
};
