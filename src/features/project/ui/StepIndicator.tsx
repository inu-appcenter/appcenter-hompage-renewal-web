import { CheckIcon } from 'lucide-react';

export type StepType = 'main' | 'introduce' | 'grid';

const STEPS: Array<{ id: StepType; label: string }> = [
  { id: 'main', label: '메인 정보' },
  { id: 'introduce', label: '기술스택 / 팀원정보' },
  { id: 'grid', label: '소개글' }
];
export const StepIndicator = ({ currentStep }: { currentStep: StepType }) => {
  return (
    <div className="relative flex w-full items-start justify-between">
      <div className="absolute top-5 left-0 h-0.5 w-full -translate-y-1/2 bg-gray-200" />

      <div
        className="absolute top-5 left-0 h-0.5 -translate-y-1/2 bg-emerald-400 transition-all duration-300"
        style={{
          width: currentStep === 'main' ? '0%' : currentStep === 'introduce' ? '50%' : '100%'
        }}
      />

      {STEPS.map((step, index) => {
        const stepIndex = STEPS.findIndex((s) => s.id === step.id);
        const currentIndex = STEPS.findIndex((s) => s.id === currentStep);

        const isCompleted = stepIndex < currentIndex;
        const isActive = step.id === currentStep;

        return (
          <div key={step.id} className="relative z-10 flex flex-col items-center">
            <div className="relative flex items-center justify-center">
              {isActive && <span className="absolute h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />}

              <div
                className={`relative flex h-10 w-10 items-center justify-center rounded-full border-2 transition-all duration-300 ${
                  isCompleted ? 'border-emerald-400 bg-emerald-400 text-white' : isActive ? 'border-emerald-400 bg-white text-emerald-400' : 'border-gray-200 bg-white text-gray-400'
                }`}
              >
                {isCompleted ? <CheckIcon className="h-5 w-5" /> : <span className="text-sm font-bold">{index + 1}</span>}
              </div>
            </div>

            <span className={`absolute top-12 text-sm font-medium whitespace-nowrap transition-colors ${isActive || isCompleted ? 'text-emerald-400' : 'text-gray-400'}`}>{step.label}</span>
          </div>
        );
      })}
    </div>
  );
};
