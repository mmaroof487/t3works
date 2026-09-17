import Hero from '../components/Hero';
import IntroEcosystem from '../components/IntroEcosystem';
import JobSeekerFunnel from '../components/JobSeekerFunnel';
import HiringSideEntry from '../components/HiringSideEntry';
import TalentFunnel from '../components/TalentFunnel';
import HowItWorks from '../components/HowItWorks';

export default function LandingPage() {
  return (
    <div className="bg-transparent">
      <Hero />
      <div id="about-us">
        <IntroEcosystem />
      </div>
      <JobSeekerFunnel />
      <div id="clients">
        <HiringSideEntry />
      </div>
      <TalentFunnel />
      <HowItWorks />
    </div>
  );
}
