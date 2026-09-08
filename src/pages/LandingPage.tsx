import Hero from '../components/Hero';
import IntroEcosystem from '../components/IntroEcosystem';
import JobSeekerFunnel from '../components/JobSeekerFunnel';
import CareerAcceleration from '../components/CareerAcceleration';
import HiringSideEntry from '../components/HiringSideEntry';
import ModelDeepDive from '../components/ModelDeepDive';
import CapabilityCoverage from '../components/CapabilityCoverage';
import IndustryStorytelling from '../components/IndustryStorytelling';
import DifferentiatorsStats from '../components/DifferentiatorsStats';
import MethodologyExplainer from '../components/MethodologyExplainer';
import NicheSegmentCallout from '../components/NicheSegmentCallout';
import IndustryVerticalList from '../components/IndustryVerticalList';
import Testimonials from '../components/Testimonials';
import BlogTeasers from '../components/BlogTeasers';
import ClientLogoStrip from '../components/ClientLogoStrip';

export default function LandingPage() {
  return (
    <div className="bg-transparent">
      <Hero />
      <div id="about-us">
        <IntroEcosystem />
      </div>
      <JobSeekerFunnel />
      <CareerAcceleration />
      <HiringSideEntry />
      <ModelDeepDive />
      <CapabilityCoverage />
      <IndustryStorytelling />
      <DifferentiatorsStats />
      <MethodologyExplainer />
      <NicheSegmentCallout />
      <div id="clients">
        <IndustryVerticalList />
        <Testimonials />
        <ClientLogoStrip />
      </div>
      <div id="blogs">
        <BlogTeasers />
      </div>
    </div>
  );
}
