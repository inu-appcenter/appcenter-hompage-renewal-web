import { RandomShuffleNumber } from '../animation/RandomShuffleNumber';
import { SectionTitle } from './Components';

export const AboutSection = () => {
  const aboutData = [
    { title: '창립 연도', subNumber: 2008 },
    { title: '누적 멤버 수', subNumber: 205, smallSubtitle: '+' },
    { title: '출시한 서비스 수', subNumber: 15, smallSubtitle: '+' },
    { title: '취업동아리 수상', subNumber: 3, smallSubtitle: '년 연속' }
  ];

  return (
    <section className="relative flex h-[40vh] flex-col justify-center gap-8 sm:h-screen">
      <SectionTitle title="about" description="앱센터에 대한 간단한 설명이 있었으면 좋겠어요" />
      <ul className="flex flex-row justify-between gap-4 sm:mt-17 sm:gap-20">
        {aboutData.map((data, index) => (
          <Item key={index} title={data.title} subNumber={data.subNumber} smallSubtitle={data.smallSubtitle} />
        ))}
      </ul>
    </section>
  );
};

const Item = ({ title, subNumber, smallSubtitle }: { title: string; subNumber: number; smallSubtitle?: string }) => {
  return (
    <li className="bg-surface-elevated group border-text-primary hover:border-brand-primary-cta flex flex-1 cursor-default flex-col items-center gap-1 rounded-sm border py-4 drop-shadow-[0_0_16px_#EDEDED66] transition-colors duration-500 hover:drop-shadow-[0_0_16px_#57ff8566] sm:gap-6 sm:rounded-2xl sm:py-11.75">
      <span className="text-primary-gradient group-hover:text-brand-primary-cta line-clamp-1 text-[8px] font-normal duration-500 sm:text-2xl">{title}</span>
      <span className="text-primary-gradient group-hover:text-brand-primary-cta line-clamp-1 text-[18px] leading-none font-medium duration-500 sm:text-[88px]">
        <RandomShuffleNumber value={subNumber} />
        {smallSubtitle && <small className="ml-0.5 text-[8px] sm:ml-1 sm:text-[40px]">{smallSubtitle}</small>}
      </span>
    </li>
  );
};
