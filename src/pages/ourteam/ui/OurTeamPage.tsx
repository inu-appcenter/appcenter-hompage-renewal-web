import { MainSection } from './MainSection';
import { PartDescriptionSection } from './Components';
import { OurTeamData } from '../data/OurTeamData';
import { FloatingButton } from './FloatingButton';

export const OurTeamPage = () => {
  return (
    <>
      <MainSection />
      <FloatingButton />
      {OurTeamData.map((part) => (
        <PartDescriptionSection key={part.title} {...part} />
      ))}
    </>
  );
};
