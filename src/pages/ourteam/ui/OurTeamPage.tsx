import { MainSection } from './MainSection';
import { PartDescriptionSection } from './Components';
import { OurTeamData } from '../data/OurTeamData';
import { FloatingButton } from './FloatingButton';
import { IntroduceSection } from './IntroduceSection';

export const OurTeamPage = () => {
  return (
    <>
      <MainSection />
      <IntroduceSection />
      <FloatingButton />
      {OurTeamData.map((part) => (
        <PartDescriptionSection key={part.title} {...part} />
      ))}
    </>
  );
};
