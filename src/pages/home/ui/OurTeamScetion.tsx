import { MoveRight } from 'lucide-react';
import Link from 'next/link';
import { SectionDetailTitle } from './Components';

export const OurTeamSection = () => {
  return (
    <section className="my-20 flex h-screen flex-row justify-between">
      <SectionDetailTitle title="파트별 소개" subtitle="Our Team" />
      <Link href="/ourteam" className="text-text-primary animate-wiggle-right" aria-label="파트별 소개로 이동">
        <MoveRight size={70} />
      </Link>
    </section>
  );
};
