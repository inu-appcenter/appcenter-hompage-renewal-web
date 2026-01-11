import Link from 'next/link';
import { Arrow } from 'shared/icon/Arrow';

const steps = [
  { step: '1', description: '3월, 9월에 에브리타임 게시판에서 공고를 확인합니다.' },
  { step: '2', description: '공고에 올라온 지원 링크에서 원하는 파트를 지원합니다!' },
  { step: '3', description: '서류 합격 시 적합성 면접을 진행합니다!' },
  { step: '4', description: '최종 합격 시 활동을 시작합니다.' }
];

export const ApplySection = () => {
  return (
    <section className="mb-32 flex h-screen flex-col items-center justify-center gap-40 py-40">
      <h2 className="text-primary-gradient w-full text-[72px]/23 font-bold">앱센터 지원방법</h2>
      <div className="grid w-full grid-cols-2 gap-18">
        {steps.map(({ step, description }) => (
          <Item key={step} step={step} description={description} />
        ))}
      </div>
      <Link
        href="/apply"
        className="text-brand-primary-cta border-brand-primary-cta bg-surface-elevated flex items-center gap-3 rounded-[60px] border py-2.5 pr-11 pl-13 text-[44px]/23 font-bold transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(87,255,133,0.4)]"
      >
        지원하러 가기
        <Arrow />
      </Link>
    </section>
  );
};

const Item = ({ step, description }: { step: string; description: string }) => {
  return (
    <div className="space-y-5">
      <div className="border-brand-secondary-light text-brand-secondary-light bg-surface-elevated flex w-34 justify-center rounded-[40px] border py-2.5 text-[28px]">Step {step}</div>
      <div className="text-primary-gradient pl-3 text-[28px]/10.75">{description}</div>
    </div>
  );
};
