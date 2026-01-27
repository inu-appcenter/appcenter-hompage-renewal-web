import Link from 'next/link';
import { MoveRight } from 'lucide-react';
import { SectionTitle, SectionDetailTitle } from './Components';

export const OurTeamSection = () => {
  return (
    <section className="flex h-[40vh] snap-start flex-col sm:h-screen">
      <section className="relative flex h-96 flex-col justify-center gap-17">
        <SectionTitle title="activities" description="앱센터에서 진행하는 다양한 활동들에 대한 설명이 있었으면 좋겠어요" />
      </section>
      <div className="flex flex-row justify-between">
        <SectionDetailTitle title="파트별 소개" subtitle="Our Team" />
        <Link href="/ourteam" className="text-text-primary animate-wiggle-right" aria-label="파트별 소개로 이동">
          <MoveRight className="sm:h-18 sm:w-18" />
        </Link>
      </div>
    </section>
  );
};
