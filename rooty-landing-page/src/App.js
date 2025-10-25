import Header from "./components/Header";
import Hero from "./components/Hero";
import Features from "./components/Features";
import Pricing from "./components/Pricing";
import HowItWorks from "./components/HowItWorks";
import CTA from "./components/CTA";
import Footer from "./components/Footer";
import Intro from "./components/Intro";
import DemoShowcase from "./components/DemoShowcase";
import DemoRail from "./components/DemoRail";

export default function App() {
  return (
    <>
      <Header />
      <Hero />
      <Intro />
      <HowItWorks />
      <DemoRail />
      <Features />
      <CTA />
      <Footer />
    </>
  );
}
