import { LandingSection } from './LandingSection';
import { AboutSection } from './AboutSection';
import { ProjectSection } from './ProjectSection';
import { ActivitySection } from './ActivitySection';
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
      <ActivitySection />
      <OurTeamSection />
      <WorkshopSection />
      <ActivitiesSection />
      <FAQSection />
      <LocationSection />
    </>
  );
};
