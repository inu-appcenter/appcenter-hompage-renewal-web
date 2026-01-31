import { LandingSection } from './LandingSection';
import { AboutSection } from './AboutSection';
import { ProjectSection } from './ProjectSection';
import { OurTeamSection } from './OurTeamScetion';
import { WorkshopSection } from './WorkshopSection';
import { ActivitiesSection } from './ActivitiesSection';
import { FAQSection } from './FAQSection';
import { LocationSection } from './LocationSection';

export const HomePage = () => {
  return (
    <>
      <LandingSection />
      <AboutSection />
      <ProjectSection />
      <OurTeamSection />
      <ActivitiesSection />
      <WorkshopSection />
      <FAQSection />
      <LocationSection />
    </>
  );
};
