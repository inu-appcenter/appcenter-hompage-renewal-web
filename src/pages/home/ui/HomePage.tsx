import { Header } from 'widgets/header';
import { Footer } from 'widgets/footer';
import { LandingSection } from './LandingSection';
import { AboutSection } from './AboutSection';
import { ProjectSection } from './ProjectSection';
import { ActivitySection } from './ActivitySection';
import { OurTeamSection } from './OurTeamScetion';
import { WorkshopSection } from './WorkshopSection';
import { ActivitiesSection } from './ActivitiesSection';

export const HomePage = () => {
  return (
    <>
      <Header />
      <main className="mx-30">
        <LandingSection />
        <AboutSection />
        <ProjectSection />
        <ActivitySection />
        <OurTeamSection />
        <WorkshopSection />
        <ActivitiesSection />
      </main>
      <Footer />
    </>
  );
};
