
import Hero from '../sections/Hero';
import About from '../sections/About';
import Services from '../sections/Services';
import MonthlyCamp from '../sections/MonthlyCamp';
import Impact from '../sections/Impact';
import Gallery from '../sections/Gallery';
import Testimonials from '../sections/Testimonials';
import VolunteerCTA from '../sections/VolunteerCTA';
import Donate from '../sections/Donate';
import SEO from '../components/SEO';

export default function Home() {
  return (
    <>
      <SEO
        title="Sri Satya Sai Aarogya Pradayini | Free Medical Camp — Kalwakurthy"
        description="Free monthly medical camps in Kalwakurthy. Specialist consultations, blood pressure screening, eye screening, and free cataract surgeries — open to all."
      />
      <Hero />
      <About />
      <Services />
      <MonthlyCamp />
      <Impact />
      <Gallery />
      <Testimonials />
      <VolunteerCTA />
      <Donate />
    </>
  );
}
