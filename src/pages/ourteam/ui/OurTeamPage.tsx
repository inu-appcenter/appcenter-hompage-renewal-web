import { MainSection } from './MainSection';
import { PartDescriptionSection } from './Components';
import { OurTeamData } from '../data/OurTeamData';

export const OurTeamPage = () => {
  return (
    <>
      <MainSection />
      {OurTeamData.map((part) => (
        <PartDescriptionSection key={part.title} {...part} />
      ))}
    </>
  );
};
