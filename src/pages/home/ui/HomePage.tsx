import { LandingSection } from './LandingSection';
import { AboutSection } from './AboutSection';
import { ProjectSection } from './ProjectSection';
import { OurTeamSection } from './OurTeamScetion';
import { WorkshopSection } from './WorkshopSection';
import { ActivitiesSection } from './ActivitiesSection';
import { FAQSection } from './FAQSection';
import { LocationSection } from './LocationSection';
import { Suspense } from 'react';

export const HomePage = () => {
  return (
    <>
      <LandingSection />
      <AboutSection />
      <Suspense>
        <ProjectSection />
      </Suspense>
      <OurTeamSection />
      <Suspense>
        <ActivitiesSection />
      </Suspense>
      <Suspense>
        <WorkshopSection />
      </Suspense>
      <Suspense>
        <FAQSection />
      </Suspense>
      <LocationSection />
    </>
  );
};
